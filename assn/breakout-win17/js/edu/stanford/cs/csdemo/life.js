/*
 * File: life.js
 * Created on Sat Oct 17 21:39:43 PDT 2015 by java2js
 * --------------------------------------------------
 * This file was generated mechanically by the java2js utility.
 * Permanent edits must be made in the Java file.
 */

define([ "jslib",
         "edu/stanford/cs/controller",
         "edu/stanford/cs/java2js",
         "edu/stanford/cs/jscontrols/JSControl",
         "edu/stanford/cs/jscontrols/LoadControl",
         "edu/stanford/cs/jscontrols/ResetControl",
         "edu/stanford/cs/jscontrols/RunControl",
         "edu/stanford/cs/jscontrols/SpeedControl",
         "edu/stanford/cs/jscontrols/StepControl",
         "java/awt",
         "java/lang",
         "java/util",
         "javax/swing" ],

function(jslib,
         edu_stanford_cs_controller,
         edu_stanford_cs_java2js,
         edu_stanford_cs_jscontrols_JSControl,
         edu_stanford_cs_jscontrols_LoadControl,
         edu_stanford_cs_jscontrols_ResetControl,
         edu_stanford_cs_jscontrols_RunControl,
         edu_stanford_cs_jscontrols_SpeedControl,
         edu_stanford_cs_jscontrols_StepControl,
         java_awt,
         java_lang,
         java_util,
         javax_swing) {

/* Imports */

var inheritPrototype = jslib.inheritPrototype;
var newArray = jslib.newArray;
var toInt = jslib.toInt;
var toStr = jslib.toStr;
var Controller = edu_stanford_cs_controller.Controller;
var Steppable = edu_stanford_cs_controller.Steppable;
var JSCanvas = edu_stanford_cs_java2js.JSCanvas;
var JSElementList = edu_stanford_cs_java2js.JSElementList;
var JSErrorEvent = edu_stanford_cs_java2js.JSErrorEvent;
var JSFile = edu_stanford_cs_java2js.JSFile;
var JSLoadDialog = edu_stanford_cs_java2js.JSLoadDialog;
var JSPlatform = edu_stanford_cs_java2js.JSPlatform;
var JSProgram = edu_stanford_cs_java2js.JSProgram;
var JSControl = edu_stanford_cs_jscontrols_JSControl.JSControl;
var LoadControl = edu_stanford_cs_jscontrols_LoadControl.LoadControl;
var ResetControl = edu_stanford_cs_jscontrols_ResetControl.ResetControl;
var RunControl = edu_stanford_cs_jscontrols_RunControl.RunControl;
var SpeedControl = edu_stanford_cs_jscontrols_SpeedControl.SpeedControl;
var StepControl = edu_stanford_cs_jscontrols_StepControl.StepControl;
var Color = java_awt.Color;
var Dimension = java_awt.Dimension;
var Graphics = java_awt.Graphics;
var Point = java_awt.Point;
var ActionEvent = java_awt.ActionEvent;
var ActionListener = java_awt.ActionListener;
var MouseEvent = java_awt.MouseEvent;
var MouseListener = java_awt.MouseListener;
var Class = java_lang.Class;
var ArrayList = java_util.ArrayList;
var Collection = java_util.Collection;
var HashSet = java_util.HashSet;
var ChangeEvent = javax_swing.ChangeEvent;
var ChangeListener = javax_swing.ChangeListener;

/* LC.js */

var LC = function() {
   /* Empty */
};

LC.DOT_COLOR = Color.GREEN;
LC.CANVAS_BACKGROUND = Color.DARK_GRAY;
LC.CANVAS_WIDTH = 800;
LC.CANVAS_HEIGHT = 600;
LC.DEFAULT_SQUARE_SIZE = 10;
LC.DEFAULT_DOT_SIZE = 8;

/* Life.js */

var Life = function() {
   JSProgram.call(this);
   this.createProgramFrame();
   JSFile.setCGIServer("http://web.stanford.edu/class/cs54n/cgi-bin");
   this.setTitle("Life");
   this.model = new LifeModel();
   this.view = new LifeView(this.model);
   this.loadDialog = new JSLoadDialog(this.view);
   this.loadDialog.addActionListener(new LoadDialogListener(this));
   this.add(this.view, "view");
   this.createControlStrip();
   this.pack();
   this.setVisible(true);
};

Life.prototype = 
   jslib.inheritPrototype(JSProgram, "Life extends JSProgram");
Life.prototype.constructor = Life;
Life.prototype.$class = 
   new Class("Life", Life);

Life.prototype.run = function() {
   this.loadDialog.setDirectory(new JSFile("cgi:library/Life/examples"));
};

Life.prototype.actionPerformed = function(e) {
   var cmd = e.getActionCommand();
   if (jslib.equals(cmd, "Load")) {
      this.loadDialog.centerOnParent();
      this.loadDialog.setVisible(true);
   } else if (jslib.equals(cmd, "Reset")) {
      this.model.stopAction();
      this.model.clear();
   }
};

Life.prototype.createControlStrip = function() {
   var loadControl = new LoadControl();
   loadControl.addActionListener(this);
   this.model.addControl(loadControl);
   this.addControl(loadControl);
   var resetControl = new ResetControl();
   resetControl.addActionListener(this);
   this.model.addControl(resetControl);
   this.addControl(resetControl);
   var runControl = new RunControl();
   this.model.addControl(runControl);
   this.addControl(runControl);
   var stepControl = new StepControl();
   this.model.addControl(stepControl);
   this.addControl(stepControl);
   var speedControl = new SpeedControl();
   this.model.addControl(speedControl);
   this.addControl(speedControl);
};

Life.prototype.load = function(text) {
   this.model.clear();
   var lines = JSPlatform.splitLines(text);
   var maxLine = 0;
   var el0 = new JSElementList(lines);
   for (var ei0 = 0; ei0 < el0.size(); ei0++) {
      var line = el0.get(ei0);
      maxLine = Math.max(maxLine, line.length);
   }
   var size = this.view.getVisibleAreaSize();
   var x0 = toInt(((size.width - maxLine) / 2));
   var y0 = toInt(((size.height - lines.length) / 2));
   for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      for (var j = 0; j < line.length; j++) {
         if (line.charCodeAt(j) !== toInt(' ')) {
            this.model.add(x0 + j, y0 + i);
         }
      }
   }
   this.model.update();
};

Life.main = function(args) {
   var pgm = new Life();
   pgm.setUID("library");
   pgm.start();
};

var LoadDialogListener = function(pgm) {
   this.pgm = pgm;
};

LoadDialogListener.prototype.actionPerformed = function(e) {
   if (e instanceof JSErrorEvent) {
      // Fill in
   } else {
      new JSFile(e.getActionCommand()).read(new LifeFileLoader(this.pgm));
   }
};

var LifeFileLoader = function(pgm) {
   this.pgm = pgm;
};

LifeFileLoader.prototype.actionPerformed = function(e) {
   this.pgm.load(e.getActionCommand());
};


/* LifeModel.js */

var LifeModel = function() {
   Controller.call(this);
   this.births = new ArrayList();
   this.deaths = new ArrayList();
   this.liveCells = new HashSet();
   this.setTarget(this);
   this.clear();
};

LifeModel.prototype = 
   jslib.inheritPrototype(Controller, "LifeModel extends Controller");
LifeModel.prototype.constructor = LifeModel;
LifeModel.prototype.$class = 
   new Class("LifeModel", LifeModel);

LifeModel.prototype.clear = function() {
   this.births.clear();
   this.deaths.clear();
   this.liveCells.clear();
   this.update();
};

LifeModel.prototype.getBirths = function() {
   return this.births;
};

LifeModel.prototype.getDeaths = function() {
   return this.deaths;
};

LifeModel.prototype.getLiveCells = function() {
   return this.liveCells;
};

LifeModel.prototype.setPattern = function(pattern) {
   this.clear();
   for (var y = 0; y < pattern.length; y++) {
      var line = pattern[y];
      for (var x = 0; x < line.length; x++) {
         if (line.charCodeAt(x) !== toInt(' ')) {
            var pt = new Point(x, y);
            this.births.add(pt);
            this.liveCells.add(pt);
         }
      }
   }
   this.update();
};

LifeModel.prototype.get = function(x, y) {
   return this.liveCells.contains(new Point(x, y));
};

LifeModel.prototype.set = function(x, y, state) {
   if (state) {
      this.add(x, y);
   } else {
      this.remove(x, y);
   }
   this.update();
};

LifeModel.prototype.add = function(x, y) {
   this.liveCells.add(new Point(x, y));
};

LifeModel.prototype.remove = function(x, y) {
   this.liveCells.remove(new Point(x, y));
};

LifeModel.prototype.step = function() {
   var periphery = new HashSet();
   this.births.clear();
   this.deaths.clear();
   for (var pass = 1; pass <= 2; pass++) {
      var list = (pass === 1) ? this.liveCells : periphery;
      var el0 = new JSElementList(list);
      for (var ei0 = 0; ei0 < el0.size(); ei0++) {
         var p0 = el0.get(ei0);
         var neighbors = 0;
         for (var dx = -1; dx <= +1; dx++) {
            for (var dy = -1; dy <= +1; dy++) {
               if ((dx | dy) !== 0) {
                  var p1 = new Point(p0.x + dx, p0.y + dy);
                  if (this.liveCells.contains(p1)) {
                     neighbors++;
                  } else if (pass === 1) {
                     periphery.add(p1);
                  }
               }
            }
         }
         if (pass === 1) {
            if (neighbors < 2 || neighbors > 3) this.deaths.add(p0);
         } else {
            if (neighbors === 3) this.births.add(p0);
         }
      }
   }
   var el1 = new JSElementList(this.births);
   for (var ei1 = 0; ei1 < el1.size(); ei1++) {
      var p = el1.get(ei1);
      this.liveCells.add(p);
   }
   var el2 = new JSElementList(this.deaths);
   for (var ei2 = 0; ei2 < el2.size(); ei2++) {
      var p = el2.get(ei2);
      this.liveCells.remove(p);
   }
   this.update();
};

LifeModel.prototype.isCallable = function() {
   return false;
};

LifeModel.prototype.getStackDepth = function() {
   return 0;
};

LifeModel.prototype.resetAction = function() {
   this.stopAction();
   this.clear();
};


/* LifeView.js */

var LifeView = function(model) {
   JSCanvas.call(this);
   this.model = model;
   this.squareSize = LC.DEFAULT_SQUARE_SIZE;
   this.dotSize = LC.DEFAULT_DOT_SIZE;
   this.setPreferredSize(new Dimension(LC.CANVAS_WIDTH, LC.CANVAS_HEIGHT));
   this.setBackground(LC.CANVAS_BACKGROUND);
   model.addChangeListener(this);
   this.addMouseListener(this);
};

LifeView.prototype = 
   jslib.inheritPrototype(JSCanvas, "LifeView extends JSCanvas");
LifeView.prototype.constructor = LifeView;
LifeView.prototype.$class = 
   new Class("LifeView", LifeView);

LifeView.prototype.getVisibleAreaSize = function() {
   var size = this.getSize();
   var width = toInt((size.width / this.squareSize));
   var height = toInt((size.height / this.squareSize));
   return new Dimension(width, height);
};

LifeView.prototype.stateChanged = function(e) {
   this.repaint();
};

LifeView.prototype.paintComponent = function(g) {
   g.setColor(this.getBackground());
   g.fillRect(0, 0, this.getWidth(), this.getHeight());
   g.setColor(LC.DOT_COLOR);
   var el0 = new JSElementList(this.model.getLiveCells());
   for (var ei0 = 0; ei0 < el0.size(); ei0++) {
      var pt = el0.get(ei0);
      var x = pt.x * this.squareSize + (this.squareSize - this.dotSize) / 2;
      var y = pt.y * this.squareSize + (this.squareSize - this.dotSize) / 2;
      g.fillOval(x, y, this.dotSize, this.dotSize);
   }
};

LifeView.prototype.mouseClicked = function(e) {
   var x = toInt((e.getX() / this.squareSize));
   var y = toInt((e.getY() / this.squareSize));
   this.model.set(x, y, !this.model.get(x, y));
};

LifeView.prototype.mouseEntered = function(e) {
   /* Empty */
};

LifeView.prototype.mouseExited = function(e) {
   /* Empty */
};

LifeView.prototype.mousePressed = function(e) {
   /* Empty */
};

LifeView.prototype.mouseReleased = function(e) {
   /* Empty */
};


/* Exports */

return {
   LC : LC,
   Life : Life,
   LifeModel : LifeModel,
   LifeView : LifeView
};

});
