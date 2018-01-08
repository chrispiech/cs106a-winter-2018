/*
 * File: JSControl.js
 * ------------------
 * This file implements the abstract superclass for all controls.
 */

define([ "jslib",
         "java/awt",
         "java/lang",
         "javax/swing" ],

function(jslib,
         java_awt,
         java_lang,
         javax_swing) {

/* Imports */

var inheritPrototype = jslib.inheritPrototype;
var addListener = jslib.addListener;
var quoteHTML = jslib.quoteHTML;
var ActionEvent = java_awt.ActionEvent;
var MouseEvent = java_awt.MouseEvent;
var Class = java_lang.Class;
var JComponent = javax_swing.JComponent;

/* JSControl */

var JSControl = function() {
   JComponent.call(this);
   this.actionListeners = [];
   var img = document.createElement("img");
   this.element.appendChild(img);
   img.alt = "JSControl";
   img.title = "JSControl";
   img.width = JSControl.SIZE;
   img.className = "imageButton";
   this.img = img;
   this.enabled = true;
   this.pressed = false;
   this.controller = null;
   this.triggerEvent = null;
   this.actionCommand = null;
   var control = this;
   var mouseOver = function(e) {
      if (control.enabled) {
         img.src = control.rolloverIcon;
      }
   };
   var mouseOut = function(e) {
      if (control.enabled) {
         img.src = control.normalIcon;
         control.pressed = false;
      }
   };
   var mouseDown = function(e) {
      if (control.enabled) {
         img.src = control.pressedIcon;
         control.pressed = true;
      }
   };
   var mouseUp = function(e) {
      if (control.enabled) {
         if (control.pressed) {
            control.triggerEvent = new MouseEvent(control, e);
            control.execute();
         }
         img.src = control.rolloverIcon;
         control.pressed = false;
      }
   };
   addListener(img, "mouseover", mouseOver);
   addListener(img, "mouseout", mouseOut);
   addListener(img, "mousedown", mouseDown);
   addListener(img, "mouseup", mouseUp);
   img.ondragstart = function() { return false; };
};

JSControl.prototype =
   jslib.inheritPrototype(JComponent, "JSControl extends JComponent");
JSControl.prototype.constructor = JSControl;
JSControl.prototype.$class = new Class("JSControl", JSControl);

JSControl.prototype.setName = function(name) {
   this.name = name;
   this.img.alt = name;
   this.img.title = name;
};

JSControl.prototype.getName = function() {
   return this.name;
};

JSControl.prototype.setActionCommand = function(cmd) {
   this.actionCommand = cmd;
};

JSControl.prototype.getActionCommand = function() {
   var cmd = this.actionCommand;
   return (cmd === null) ? this.getName() : cmd;
};

JSControl.prototype.execute = function() {
   this.fireActionListeners();
};

JSControl.prototype.getTriggerEvent = function() {
   return this.triggerEvent;
};

JSControl.prototype.addActionListener = function(listener) {
   this.actionListeners.push(listener);
};

JSControl.prototype.fireActionListeners = function() {
   var e = null;
   for (var i in this.actionListeners) {
      var listener = this.actionListeners[i];
      if (typeof(listener) === "function") {
         listener(this.name);
      } else {
         if (!e) e = new ActionEvent(this, ActionEvent.ACTION_PERFORMED,
                                     this.getActionCommand());
         listener.actionPerformed(e);
      }
   }
};

JSControl.prototype.setController = function(controller) {
   var control = this;
   var img = control.img;
   this.controller = controller;
};

JSControl.prototype.getController = function() {
   return this.controller;
};

JSControl.prototype.stateChanged = function(e) {
   /* Empty */
};

JSControl.prototype.setIcon = function(src) {
   this.normalIcon = src;
   this.img.src = src;
};

JSControl.prototype.setDisabledIcon = function(src) {
   this.disabledIcon = src;
};

JSControl.prototype.setRolloverIcon = function(src) {
   this.rolloverIcon = src;
};

JSControl.prototype.setPressedIcon = function(src) {
   this.pressedIcon = src;
};

JSControl.prototype.createImageIcon = function(url) {
   return url;
};

JSControl.prototype.setEnabled = function(flag) {
   this.enabled = flag;
   this.img.src = (flag) ? this.normalIcon : this.disabledIcon;
};

JSControl.prototype.isEnabled = function() {
   return this.enabled;
};

JSControl.prototype.repaint = function() {
   /* Empty */
};

JSControl.SIZE = 48;

return {
   JSControl : JSControl
};

});
