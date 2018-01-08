/*
 * File: controller.js
 * Created on Mon Feb 09 11:24:50 PST 2015 by java2js
 * --------------------------------------------------
 * This file was generated mechanically by the java2js utility.
 * Permanent edits must be made in the Java file.
 */

define([ "jslib",
         "edu/stanford/cs/java2js",
         "java/awt",
         "java/lang",
         "java/util",
         "javax/swing" ],

function(jslib,
         edu_stanford_cs_java2js,
         java_awt,
         java_lang,
         java_util,
         javax_swing) {

/* Imports */

var inheritPrototype = jslib.inheritPrototype;
var newArray = jslib.newArray;
var toInt = jslib.toInt;
var toStr = jslib.toStr;
var JSElementList = edu_stanford_cs_java2js.JSElementList;
var Adjustable = java_awt.Adjustable;
var ActionEvent = java_awt.ActionEvent;
var ActionListener = java_awt.ActionListener;
var AdjustmentEvent = java_awt.AdjustmentEvent;
var AdjustmentListener = java_awt.AdjustmentListener;
var Class = java_lang.Class;
var RuntimeException = java_lang.RuntimeException;
var ArrayList = java_util.ArrayList;
var HashMap = java_util.HashMap;
var SwingUtilities = javax_swing.SwingUtilities;
var Timer = javax_swing.Timer;
var ChangeEvent = javax_swing.ChangeEvent;
var ChangeListener = javax_swing.ChangeListener;

/* Controller.js */

var Controller = function() {
   this.listeners = new ArrayList();
   this.controlTable = new HashMap();
   this.speedControl = null;
   this.target = null;
   this.controllerState = Controller.INITIAL;
};

Controller.prototype.setTarget = function(obj) {
   this.target = obj;
   this.timerListener = new TimerListener(this);
   this.timer = new Timer(0, this.timerListener);
   this.timer.setRepeats(false);
   this.speedListener = new SpeedListener(this);
   this.setSpeed(50);
};

Controller.prototype.getTarget = function() {
   return this.target;
};

Controller.prototype.addControl = function(control) {
   this.controlTable.put(control.getName(), control);
   control.setController(this);
   this.addChangeListener(control);
   if (jslib.equals(control.getName(), "Speed")) {
      this.speedControl = control;
      this.speedControl.addAdjustmentListener(this.speedListener);
      this.setSpeed(this.speedControl.getValue());
   }
};

Controller.prototype.getControl = function(name) {
   return this.controlTable.get(name);
};

Controller.prototype.setControllerState = function(state) {
   this.controllerState = state;
   this.fireChangeListeners();
};

Controller.prototype.getControllerState = function() {
   return this.controllerState;
};

Controller.getStateName = function(state) {
   switch (state) {
      case Controller.INITIAL: return "INITIAL";
      case Controller.RUNNING: return "RUNNING";
      case Controller.STEPPING: return "STEPPING";
      case Controller.CALLING: return "CALLING";
      case Controller.STOPPED: return "STOPPED";
      case Controller.FINISHED: return "FINISHED";
      case Controller.WAITING: return "WAITING";
      case Controller.ERROR: return "ERROR";
      default: return "???";
   }
};

Controller.prototype.startAction = function() {
   this.start(Controller.RUNNING);
};

Controller.prototype.stopAction = function() {
   this.stop(Controller.STOPPED);
};

Controller.prototype.stepAction = function() {
   this.start(Controller.STEPPING);
};

Controller.prototype.callAction = function() {
   if (this.target.isCallable()) {
      this.callDepth = this.target.getStackDepth();
      this.start(Controller.CALLING);
   } else {
      this.start(Controller.STEPPING);
   }
};

Controller.prototype.speedToDelay = function(speed) {
   return toInt((Controller.SLOW_DELAY + (Controller.FAST_DELAY - Controller.SLOW_DELAY) * speed / 100.0));
};

Controller.prototype.setSpeed = function(speed) {
   if (this.speedControl === null) {
      this.setSpeedCallback(speed);
   } else {
      this.speedControl.setValue(speed);
   }
};

Controller.prototype.setSpeedCallback = function(speed) {
   this.speed = speed;
   this.timer.setInitialDelay(this.speedToDelay(speed));
};

Controller.prototype.getSpeed = function() {
   return this.speed;
};

Controller.prototype.addChangeListener = function(listener) {
   this.listeners.add(listener);
};

Controller.prototype.removeChangeListener = function(listener) {
   var index = this.listeners.indexOf(listener);
   if (index >= 0) this.listeners.remove(index);
};

Controller.prototype.update = function() {
   this.fireChangeListeners();
};

Controller.prototype.getErrorMessage = function() {
   return this.errorMessage;
};

Controller.prototype.executeOneCycle = function() {
   try {
      switch (this.controllerState) {
       case Controller.RUNNING:
         this.stepTarget();
         if (this.controllerState === Controller.RUNNING) this.timer.restart();
         break;
       case Controller.STEPPING:
         this.stepTarget();
         this.stopAction();
         break;
       case Controller.CALLING:
         this.stepTarget();
         if (this.target.getStackDepth() <= this.callDepth) {
            this.stopAction();
         } else {
            if (this.controllerState === Controller.CALLING) this.timer.restart();
         }
         break;
      }
   } catch (ex) {
      var msg = (ex instanceof RuntimeException) ? RuntimeException.patchMessage(ex) : ex.toString();
      this.setErrorMessage(msg);
      this.setControllerState(Controller.ERROR);
   }
};

Controller.prototype.setErrorMessage = function(msg) {
   this.errorMessage = msg;
};

Controller.prototype.stop = function(state) {
   this.setControllerState(state);
};

Controller.prototype.start = function(state) {
   this.setControllerState(state);
   this.timer.restart();
};

Controller.prototype.fireChangeListeners = function() {
   var e = new ChangeEvent(this);
   var el = new JSElementList(this.listeners);
   for (var ei = 0; ei < el.size(); ei++) {
      var listener = el.get(ei);
      listener.stateChanged(e);
   }
};

Controller.prototype.stepTarget = function() {
   SwingUtilities.invokeLater(new ControllerStepper(this.target));
};

Controller.INITIAL = 0;
Controller.RUNNING = 1;
Controller.STEPPING = 2;
Controller.CALLING = 3;
Controller.STOPPED = 4;
Controller.FINISHED = 5;
Controller.WAITING = 6;
Controller.ERROR = 7;
Controller.SLOW_DELAY = 500;
Controller.FAST_DELAY = 5;
var SpeedListener = function(controller) {
   this.controller = controller;
};

SpeedListener.prototype.adjustmentValueChanged = function(e) {
   this.controller.setSpeedCallback((e.getSource()).getValue());
};

var TimerListener = function(controller) {
   this.controller = controller;
};

TimerListener.prototype.actionPerformed = function(e) {
   this.controller.executeOneCycle();
};

var ControllerStepper = function(target) {
   this.target = target;
};

ControllerStepper.prototype.run = function() {
   this.target.step();
};


/* Exports */

return {
   Controller : Controller
};

});
