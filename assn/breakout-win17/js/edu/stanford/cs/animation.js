/*
 * File: animation.js
 * Created on Wed Dec 31 11:50:44 PST 2014 by java2js
 * --------------------------------------------------
 * This file was generated mechanically by the java2js utility.
 * Permanent edits must be made in the Java file.
 */

define([ "jslib",
         "java/awt",
         "java/lang",
         "java/util",
         "javax/swing" ],

function(jslib,
         java_awt,
         java_lang,
         java_util,
         javax_swing) {

/* Imports */

var inheritPrototype = jslib.inheritPrototype;
var newArray = jslib.newArray;
var toInt = jslib.toInt;
var toStr = jslib.toStr;
var Color = java_awt.Color;
var ActionEvent = java_awt.ActionEvent;
var ActionListener = java_awt.ActionListener;
var MouseEvent = java_awt.MouseEvent;
var MouseListener = java_awt.MouseListener;
var Class = java_lang.Class;
var LinkedList = java_util.LinkedList;
var Queue = java_util.Queue;
var Timer = javax_swing.Timer;

/* Animation.js */

var Animation = function() {
   this.finalFlag = true;
};

Animation.prototype.setTimeline = function(tl) {
   this.tl = tl;
};

Animation.prototype.getTimeline = function() {
   return this.tl;
};

Animation.prototype.setTrigger = function(trigger) {
   this.trigger = trigger;
};

Animation.prototype.getTrigger = function() {
   return this.trigger;
};

Animation.prototype.setFinal = function(flag) {
   this.finalFlag = flag;
};

Animation.prototype.isFinal = function() {
   return this.finalFlag;
};

Animation.prototype.toString = function() {
   var className = this.$class().getName();
   className = className.substring(className.lastIndexOf(".") + 1);
   return className + "/" + this.trigger;
};

Animation.DELAY = 30;

/* Appear.js */

var Appear = function(obj, trigger) {
   Animation.call(this);
   this.proxy = obj;
   this.setTrigger(trigger);
   this.complete = false;
};

Appear.prototype = 
   jslib.inheritPrototype(Animation, "Appear extends Animation");
Appear.prototype.constructor = Appear;
Appear.prototype.$class = 
   new Class("Appear", Appear);

Appear.prototype.step = function() {
   this.proxy.setVisible(true);
   this.complete = true;
};

Appear.prototype.isComplete = function() {
   return this.complete;
};


/* Disappear.js */

var Disappear = function(obj, trigger) {
   Animation.call(this);
   this.proxy = obj;
   this.setTrigger(trigger);
   this.complete = false;
};

Disappear.prototype = 
   jslib.inheritPrototype(Animation, "Disappear extends Animation");
Disappear.prototype.constructor = Disappear;
Disappear.prototype.$class = 
   new Class("Disappear", Disappear);

Disappear.prototype.step = function() {
   this.proxy.setVisible(false);
   this.complete = true;
};

Disappear.prototype.isComplete = function() {
   return this.complete;
};


/* MoveAnimation.js */

var MoveAnimation = function(obj, x, y, duration, isRelative, trigger) {
   Animation.call(this);
   this.proxy = obj;
   this.x = this.proxy.getX();
   this.y = this.proxy.getY();
   this.nSteps = toInt((duration / Animation.DELAY));
   this.dx = ((isRelative) ? x : x - this.x) / this.nSteps;
   this.dy = ((isRelative) ? y : y - this.y) / this.nSteps;
   this.setTrigger(trigger);
   this.listener = new StepAnimationListener(this);
   this.complete = false;
};

MoveAnimation.prototype = 
   jslib.inheritPrototype(Animation, "MoveAnimation extends Animation");
MoveAnimation.prototype.constructor = MoveAnimation;
MoveAnimation.prototype.$class = 
   new Class("MoveAnimation", MoveAnimation);

MoveAnimation.prototype.step = function() {
   this.x += this.dx;
   this.y += this.dy;
   this.proxy.setLocation(this.x, this.y);
   this.nSteps--;
   if (this.nSteps === 0) {
      this.complete = true;
   } else {
      var timer = new Timer(Animation.DELAY, this.listener);
      timer.setRepeats(false);
      timer.start();
   }
};

MoveAnimation.prototype.isComplete = function() {
   return this.complete;
};


/* Move.js */

var Move = function(obj, dx, dy, duration, trigger) {
   MoveAnimation.call(this, obj, dx, dy, duration, true, trigger);
};

Move.prototype = 
   jslib.inheritPrototype(MoveAnimation, "Move extends MoveAnimation");
Move.prototype.constructor = Move;
Move.prototype.$class = 
   new Class("Move", Move);


/* MoveTo.js */

var MoveTo = function(obj, x, y, duration, trigger) {
   MoveAnimation.call(this, obj, x, y, duration, false, trigger);
};

MoveTo.prototype = 
   jslib.inheritPrototype(MoveAnimation, "MoveTo extends MoveAnimation");
MoveTo.prototype.constructor = MoveTo;
MoveTo.prototype.$class = 
   new Class("MoveTo", MoveTo);


/* Rotate.js */

var Rotate = function(obj, theta, duration, trigger) {
   Animation.call(this);
   this.proxy = obj;
   this.nSteps = toInt((duration / Animation.DELAY));
   this.dTheta = theta / this.nSteps;
   this.setTrigger(trigger);
   this.listener = new StepAnimationListener(this);
   this.complete = false;
};

Rotate.prototype = 
   jslib.inheritPrototype(Animation, "Rotate extends Animation");
Rotate.prototype.constructor = Rotate;
Rotate.prototype.$class = 
   new Class("Rotate", Rotate);

Rotate.prototype.step = function() {
   this.proxy.rotate(this.dTheta);
   this.nSteps--;
   if (this.nSteps === 0) {
      this.complete = true;
   } else {
      var timer = new Timer(Animation.DELAY, this.listener);
      timer.setRepeats(false);
      timer.start();
   }
};

Rotate.prototype.isComplete = function() {
   return this.complete;
};


/* SetColor.js */

var SetColor = function(obj, color, trigger) {
   Animation.call(this);
   this.proxy = obj;
   this.newColor = color;
   this.setTrigger(trigger);
   this.complete = false;
};

SetColor.prototype = 
   jslib.inheritPrototype(Animation, "SetColor extends Animation");
SetColor.prototype.constructor = SetColor;
SetColor.prototype.$class = 
   new Class("SetColor", SetColor);

SetColor.prototype.step = function() {
   this.proxy.setColor(this.newColor);
   this.complete = true;
};

SetColor.prototype.isComplete = function() {
   return this.complete;
};


/* StepAnimationListener.js */

var StepAnimationListener = function(target) {
   this.target = target;
};

StepAnimationListener.prototype.actionPerformed = function(e) {
   this.target.getTimeline().stepAnimation(this.target);
};


/* Timeline.js */

var Timeline = function(obj) {
   this.canvas = obj;
   this.canvas.addMouseListener(new TimelineListener(this));
   this.queue = new LinkedList();
   this.clickAnimation = null;
};

Timeline.prototype.getCanvas = function() {
   return this.canvas;
};

Timeline.prototype.add = function(animation) {
   this.queue.add(animation);
   animation.setTimeline(this);
};

Timeline.prototype.start = function() {
   this.armNextAnimation();
};

Timeline.prototype.armNextAnimation = function() {
   if (this.queue.isEmpty()) return;
   var animation = this.queue.remove();
   if (jslib.equalsIgnoreCase(animation.getTrigger(), "onClick")) {
      this.clickAnimation = animation;
   } else {
      this.fireAnimation(animation);
   }
};

Timeline.prototype.fireAnimation = function(animation) {
   while (!this.queue.isEmpty() && this.isWithPrevious(this.queue.element())) {
      animation.setFinal(false);
      this.stepAnimation(animation);
      animation = this.queue.remove();
   }
   this.stepAnimation(animation);
};

Timeline.prototype.stepAnimation = function(animation) {
   animation.step();
   this.canvas.repaint();
   if (animation.isFinal() && animation.isComplete()) {
      this.armNextAnimation();
   }
};

Timeline.prototype.mouseClicked = function(e) {
   if (this.clickAnimation !== null) {
      var animation = this.clickAnimation;
      this.clickAnimation = null;
      this.fireAnimation(animation);
   }
};

Timeline.prototype.isWithPrevious = function(animation) {
   return jslib.equalsIgnoreCase(animation.getTrigger(), "withPrevious");
};

var TimelineListener = function(tl) {
   this.tl = tl;
};

TimelineListener.prototype.mouseClicked = function(e) {
   this.tl.mouseClicked(e);
};

TimelineListener.prototype.mouseEntered = function(e) {
   /* Empty */
};

TimelineListener.prototype.mouseExited = function(e) {
   /* Empty */
};

TimelineListener.prototype.mousePressed = function(e) {
   /* Empty */
};

TimelineListener.prototype.mouseReleased = function(e) {
   /* Empty */
};


/* Exports */

return {
   Animation : Animation,
   Appear : Appear,
   Disappear : Disappear,
   Move : Move,
   MoveTo : MoveTo,
   Rotate : Rotate,
   SetColor : SetColor,
   Timeline : Timeline
};

});
