/*
 * File: animation.js
 * Created on Thu Sep 24 19:04:50 PDT 2015 by java2js
 * --------------------------------------------------
 * This file was generated mechanically by the java2js utility.
 * Permanent edits must be made in the Java file.
 */

define([ "jslib",
         "edu/stanford/cs/animation",
         "edu/stanford/cs/graphics",
         "edu/stanford/cs/java2js",
         "java/awt",
         "java/lang" ],

function(jslib,
         edu_stanford_cs_animation,
         edu_stanford_cs_graphics,
         edu_stanford_cs_java2js,
         java_awt,
         java_lang) {

/* Imports */

var inheritPrototype = jslib.inheritPrototype;
var newArray = jslib.newArray;
var toInt = jslib.toInt;
var toStr = jslib.toStr;
var Appear = edu_stanford_cs_animation.Appear;
var Disappear = edu_stanford_cs_animation.Disappear;
var Move = edu_stanford_cs_animation.Move;
var Rotate = edu_stanford_cs_animation.Rotate;
var SetColor = edu_stanford_cs_animation.SetColor;
var Timeline = edu_stanford_cs_animation.Timeline;
var GCanvas = edu_stanford_cs_graphics.GCanvas;
var GCompound = edu_stanford_cs_graphics.GCompound;
var GRect = edu_stanford_cs_graphics.GRect;
var JSProgram = edu_stanford_cs_java2js.JSProgram;
var Color = java_awt.Color;
var Class = java_lang.Class;

/* AnimationTest.js */

var AnimationTest = function() {
   JSProgram.call(this);
   this.setTitle("AnimationTest");
   this.gc = new GCanvas(500, 300);
   this.add(this.gc, "view");
   this.pack();
   this.setVisible(true);
};

AnimationTest.prototype = 
   jslib.inheritPrototype(JSProgram, "AnimationTest extends JSProgram");
AnimationTest.prototype.constructor = AnimationTest;
AnimationTest.prototype.$class = 
   new Class("AnimationTest", AnimationTest);

AnimationTest.prototype.run = function() {
   var tl = new Timeline(this.gc);
   var sq1 = new GSquare(100);
   var sq2 = new GSquare(100);
   sq1.setColor(Color.RED);
   sq1.setVisible(false);
   sq2.setColor(Color.BLUE);
   sq2.setVisible(false);
   this.gc.add(sq1, 150, 150);
   this.gc.add(sq2, 350, 150);
   tl.add(new Appear(sq1, "onClick"));
   tl.add(new Appear(sq2, "onClick"));
   tl.add(new SetColor(sq1, Color.BLUE, "onClick"));
   tl.add(new SetColor(sq2, Color.RED, "withPrevious"));
   tl.add(new Rotate(sq1, 180, 1000, "onClick"));
   tl.add(new Rotate(sq2, -360, 1000, "withPrevious"));
   tl.add(new Move(sq2, -100, 100, 2000, "onClick"));
   tl.add(new Move(sq1, 100, -100, 2000, "withPrevious"));
   tl.add(new Disappear(sq1, "onClick"));
   tl.add(new Disappear(sq2, "withPrevious"));
   tl.start();
   this.gc.repaint();
};

AnimationTest.main = function(args) {
   new AnimationTest().start();
};


/* GSquare.js */

var GSquare = function(size) {
   GCompound.call(this);
   this.rect = new GRect(-size / 2, -size / 2, size, size);
   this.rect.setFilled(true);
   this.add(this.rect);
};

GSquare.prototype = 
   jslib.inheritPrototype(GCompound, "GSquare extends GCompound");
GSquare.prototype.constructor = GSquare;
GSquare.prototype.$class = 
   new Class("GSquare", GSquare);

GSquare.prototype.setColor = function(color) {
   this.rect.setColor(color);
};


/* Exports */

return {
   AnimationTest : AnimationTest,
   GSquare : GSquare
};

});
