/*
 * File: LoadFileControl.js
 * Last modified on Fri Sep  5 17:32:15 2014 by eroberts
 * -----------------------------------------------------
 * Implements the LoadFile control.
 */

define([ "jslib",
         "edu/stanford/cs/java2js",
         "edu/stanford/cs/jscontrols/JSControl",
         "java/awt",
         "java/lang",
         "javax/swing" ],

function(jslib,
         edu_stanford_cs_java2js,
         edu_stanford_cs_jscontrols_JSControl,
         java_awt,
         java_lang,
         javax_swing) {

/* Imports */

var inheritPrototype = jslib.inheritPrototype;
var addListener = jslib.addListener;
var newArray = jslib.newArray;
var toInt = jslib.toInt;
var toStr = jslib.toStr;
var Integer = jslib.Integer;
var Double = jslib.Double;
var Character = jslib.Character;
var JSElementList = jslib.JSElementList;
var RuntimeException = jslib.RuntimeException;
var JSFile = edu_stanford_cs_java2js.JSFile;
var JSControl = edu_stanford_cs_jscontrols_JSControl.JSControl;
var InputEvent = java_awt.InputEvent;
var MouseEvent = java_awt.MouseEvent;
var Class = java_lang.Class;
var ChangeEvent = javax_swing.ChangeEvent;

/* LoadFileControl.js */

var LoadFileControl = function() {
   LoadControl.call(this);
   this.addInputControls();
};

LoadFileControl.prototype =
   jslib.inheritPrototype(LoadControl, "LoadFileControl extends LoadControl");
LoadFileControl.prototype.constructor = LoadFileControl;
LoadFileControl.prototype.$class = new Class("LoadFileControl", LoadFileControl);

LoadFileControl.prototype.setDirectoryName = function(dir) {
   this.dir = dir;
};

LoadFileControl.prototype.getDirectoryName = function() {
   return this.dir;
};

LoadFileControl.prototype.getSelectedFile = function() {
   return this.selectedFile;
};

LoadFileControl.prototype.addInputControls = function() {
   this.element.style.width = JSControl.SIZE + "px";
   this.element.style.height = JSControl.SIZE + "px";
   this.element.style.overflow = "hidden";
   this.element.style.position = "relative";
   this.element.appendChild(this.createInputControl(-8, -4));
   this.element.appendChild(this.createInputControl(-8, 13));
   this.element.appendChild(this.createInputControl(-8, 29));
};

LoadFileControl.prototype.createInputControl = function(dx, dy) {
   var control = this;
   var input = document.createElement("input");
   input.type = "file";
   input.style.position = "absolute";
   input.style.left = dx + "px";
   input.style.top = dy + "px";
   input.style.opacity = "0";
   var onChange = function(e) {
      if (e.target.files[0]) {
         control.selectedFile = new JSFile(control.dir, e.target.files[0]);
         control.fireActionListeners();
      }
   };
   var mouseOver = function(e) {
      if (control.enabled) {
         control.img.src = control.rolloverIcon;
      }
   };
   var mouseOut = function(e) {
      if (control.enabled) {
         control.img.src = control.normalIcon;
         control.pressed = false;
      }
   };
   var mouseDown = function(e) {
      if (control.enabled) {
         control.triggerEvent = new MouseEvent(e, control);
         var modifiers = 0;
         if (e.shiftKey) modifiers |= InputEvent.SHIFT_DOWN_MASK;
         if (e.ctrlKey) modifiers |= InputEvent.CTRL_DOWN_MASK;
         if (e.altKey) modifiers |= InputEvent.ALT_DOWN_MASK;
         if (e.metaKey) modifiers |= InputEvent.META_DOWN_MASK;
         control.triggerEvent.modifiers = modifiers;
         control.img.src = control.pressedIcon;
         control.pressed = true;
      }
   };
   var mouseUp = function(e) {
      if (control.enabled) {
         control.img.src = (control.pressed) ? control.normalIcon
                                             : control.rolloverIcon;
         control.pressed = false;
      }
   };
   addListener(input, "change", onChange);
   addListener(input, "mouseover", mouseOver);
   addListener(input, "mouseout", mouseOut);
   addListener(input, "mousedown", mouseDown);
   addListener(input, "mouseup", mouseUp);
   return input;
};

LoadFileControl.prototype.execute = function() {
   /* Empty */
};

/* Exports */

return {
   LoadFileControl : LoadFileControl
};

});
