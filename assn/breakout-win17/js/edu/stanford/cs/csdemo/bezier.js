/*
 * File: bezier.js
 * Created on Mon Aug 18 21:52:47 BST 2014 by java2js
 * --------------------------------------------------
 * This file was generated mechanically by the java2js utility.
 * Permanent edits must be made in the Java file.
 */

define([ "jslib",
         "edu/stanford/cs/java2js",
         "edu/stanford/cs/jscontrols/JSControl",
         "edu/stanford/cs/jscontrols/LoadControl",
         "edu/stanford/cs/jscontrols/ResetControl",
         "edu/stanford/cs/jscontrols/SaveControl",
         "java/awt",
         "java/util",
         "javax/swing" ],

function(jslib,
         edu_stanford_cs_java2js,
         edu_stanford_cs_jscontrols_JSControl,
         edu_stanford_cs_jscontrols_LoadControl,
         edu_stanford_cs_jscontrols_ResetControl,
         edu_stanford_cs_jscontrols_SaveControl,
         java_awt,
         java_util,
         javax_swing) {

/* Imports */

var inheritPrototype = jslib.inheritPrototype;
var newArray = jslib.newArray;
var toInt = jslib.toInt;
var toStr = jslib.toStr;
var Integer = jslib.Integer;
var Double = jslib.Double;
var Character = jslib.Character;
var ElementList = jslib.ElementList;
var RuntimeException = jslib.RuntimeException;
var ElementList = edu_stanford_cs_java2js.ElementList;
var JSCanvas = edu_stanford_cs_java2js.JSCanvas;
var JSConsole = edu_stanford_cs_java2js.JSConsole;
var JSFileChooser = edu_stanford_cs_java2js.JSFileChooser;
var JSImage = edu_stanford_cs_java2js.JSImage;
var JSProgram = edu_stanford_cs_java2js.JSProgram;
var JSControl = edu_stanford_cs_jscontrols_JSControl.JSControl;
var LoadControl = edu_stanford_cs_jscontrols_LoadControl.LoadControl;
var ResetControl = edu_stanford_cs_jscontrols_ResetControl.ResetControl;
var SaveControl = edu_stanford_cs_jscontrols_SaveControl.SaveControl;
var Color = java_awt.Color;
var Graphics = java_awt.Graphics;
var Graphics2D = java_awt.Graphics2D;
var Point = java_awt.Point;
var ActionEvent = java_awt.ActionEvent;
var ActionListener = java_awt.ActionListener;
var MouseEvent = java_awt.MouseEvent;
var MouseListener = java_awt.MouseListener;
var MouseMotionListener = java_awt.MouseMotionListener;
var Path2D = java_awt.Path2D;
var ArrayList = java_util.ArrayList;
var Collection = java_util.Collection;
var ChangeEvent = javax_swing.ChangeEvent;
var ChangeListener = javax_swing.ChangeListener;

/* Bezier.js */

var Bezier = function() {
   JSProgram.call(this);
   this.setTitle("Bezier");
   this.console = new JSConsole();
   this.model = new BZModel(this.console);
   this.view = new BZView(this.model);
   this.controller = new BZController(this.model, this.view);
   this.controller.init(this);
   this.add(this.view, "view");
   this.add(this.console, "console");
   this.setSize(BZC.APPLICATION_WIDTH, BZC.APPLICATION_HEIGHT);
   this.setBackground(BZC.APPLICATION_BACKGROUND);
};

Bezier.prototype =
   jslib.inheritPrototype(JSProgram, "Bezier extends JSProgram");
Bezier.prototype.constructor = Bezier;

Bezier.prototype.run = function(args) {
   this.setVisible(true);
   this.view.repaint();
};

Bezier.main = function(args) {
   new Bezier().run(args);
};


/* BZC.js */

var BZC = function() {};

BZC.APPLICATION_WIDTH = 1260;
BZC.APPLICATION_HEIGHT = 700;
BZC.APPLICATION_BACKGROUND = new Color(0xCCFFFF);
BZC.CANVAS_BACKGROUND = Color.WHITE;
BZC.CANVAS_WIDTH = 890;
BZC.CANVAS_HEIGHT = 600;

/* BZController.js */

var BZController = function(model, view) {
   JSCanvas.call(this);
   this.model = model;
   this.view = view;
};

BZController.prototype =
   jslib.inheritPrototype(JSCanvas, "BZController extends JSCanvas");
BZController.prototype.constructor = BZController;

BZController.prototype.init = function(pgm) {
   var resetButton = new ResetControl();
   resetButton.addActionListener(this);
   pgm.addControl(resetButton);
   var loadButton = new LoadControl();
   loadButton.addActionListener(this);
   pgm.addControl(loadButton);
   var saveButton = new SaveControl();
   saveButton.addActionListener(this);
   pgm.addControl(saveButton);
};

BZController.prototype.actionPerformed = function(e) {
   var cmd = e.getActionCommand();
   if (jslib.equals(cmd, "Reset")) {
      this.model.clear();
   } else if (jslib.equals(cmd, "Load")) {
      if (this.fileChooser === null) {
         this.fileChooser = new JSFileChooser("images");
         this.fileChooser.addActionListener(this);
      }
      this.fileChooser.showOpenDialog(this);
   } else if (jslib.equals(cmd, "Save")) {
      this.model.save();
   } else if (jslib.equals(cmd, "ApproveSelection")) {
      var path = this.fileChooser.getPath();
      var name = path.substring(path.lastIndexOf("/") + 1);
      this.view.setBackgroundImage(new JSImage(name));
   }
};


/* BZModel.js */

var BZModel = function(console) {
   this.console = console;
   this.listeners = new ArrayList();
   this.clear();
};

BZModel.prototype.clear = function() {
   this.segments = new ArrayList();
   this.previous = null;
   this.fireChangeListeners();
};

BZModel.prototype.save = function() {
   this.console.println("newpath");
   var n = this.segments.size();
   for (var i = 0; i < n; i++) {
      var bs = this.segments.get(i);
      if (i === 0) {
         this.console.println("  " + bs.p0.x + " " + bs.p0.y + " moveto");
      }
      this.console.print("  " + bs.p1.x + " " + bs.p1.y);
      this.console.print(" " + bs.p2.x + " " + bs.p2.y);
      this.console.println(" " + bs.p3.x + " " + bs.p3.y + " curveto");
   }
   this.console.println("closepath fill");
};

BZModel.prototype.mousePressed = function(pt) {
   this.current = this.findPoint(pt);
};

BZModel.prototype.mouseDragged = function(pt) {
   if (this.current !== null) {
      this.current.x = pt.x;
      this.current.y = pt.y;
      this.fireChangeListeners();
   }
};

BZModel.prototype.mouseClicked = function(pt) {
   if (this.previous === null) {
      this.previous = pt;
   } else {
      var bs = new BZSegment();
      bs.p0 = this.previous;
      this.previous = this.findPoint(pt);
      if (this.previous === null) this.previous = pt;
      bs.p3 = this.previous;
      var dx = toInt(((bs.p3.x - bs.p0.x) / 3));
      var dy = toInt(((bs.p3.y - bs.p0.y) / 3));
      bs.p1 = new Point(bs.p0.x + dx, bs.p0.y + dy);
      bs.p2 = new Point(bs.p3.x - dx, bs.p3.y - dy);
      this.segments.add(bs);
      this.fireChangeListeners();
   }
};

BZModel.prototype.getSegments = function() {
   return this.segments;
};

BZModel.prototype.addChangeListener = function(listener) {
   this.listeners.add(listener);
};

BZModel.prototype.fireChangeListeners = function() {
   var el = new ElementList(this.listeners);
   for (var ei = 0; ei < el.size(); ei++) {
      var listener = el.get(ei);
      listener.stateChanged(new ChangeEvent(this));
   }
};

BZModel.prototype.findPoint = function(pt) {
   var n = this.segments.size();
   for (var i = 0; i < n; i++) {
      var bs = this.segments.get(i);
      if (this.isClose(pt, bs.p0)) return bs.p0;
      if (this.isClose(pt, bs.p1)) return bs.p1;
      if (this.isClose(pt, bs.p2)) return bs.p2;
      if (this.isClose(pt, bs.p3)) return bs.p3;
   }
   return null;
};

BZModel.prototype.isClose = function(p1, p2) {
   return (Math.abs(p2.x - p1.x) < 3 && Math.abs(p2.y - p1.y) < 3);
};


/* BZSegment.js */

var BZSegment = function() {};


/* BZView.js */

var BZView = function(model) {
   JSCanvas.call(this);
   this.bzm = model;
   this.setBackground(BZC.CANVAS_BACKGROUND);
   this.setSize(BZC.CANVAS_WIDTH, BZC.CANVAS_HEIGHT);
   model.addChangeListener(this);
   this.addMouseListener(this);
   this.addMouseMotionListener(this);
   this.background = null;
};

BZView.prototype =
   jslib.inheritPrototype(JSCanvas, "BZView extends JSCanvas");
BZView.prototype.constructor = BZView;

BZView.prototype.stateChanged = function(e) {
   this.repaint();
};

BZView.prototype.setBackgroundImage = function(image) {
   this.background = image;
   this.repaint();
};

BZView.prototype.paintComponent = function(g) {
   var g2d = g;
   g.setColor(this.getBackground());
   g.fillRect(0, 0, this.getWidth(), this.getHeight());
   if (this.background !== null) {
      g.drawImage(this.background, 0, 0, this);
   }
   var segments = this.bzm.getSegments();
   var n = segments.size();
   for (var i = 0; i < n; i++) {
      var bs = segments.get(i);
      if (i === 0) this.drawDot(g, bs.p0);
      this.drawBox(g, bs.p1);
      this.drawBox(g, bs.p2);
      this.drawDot(g, bs.p3);
      g.setColor(Color.RED);
      var path = new Path2D.Double();
      path.moveTo(bs.p0.x, bs.p0.y);
      path.curveTo(bs.p1.x, bs.p1.y, bs.p2.x, bs.p2.y, bs.p3.x, bs.p3.y);
      g2d.draw(path);
   }
};

BZView.prototype.mouseClicked = function(e) {
   this.bzm.mouseClicked(new Point(e.getX(), e.getY()));
};

BZView.prototype.mouseEntered = function(e) {
   /* Empty */
};

BZView.prototype.mouseExited = function(e) {
   /* Empty */
};

BZView.prototype.mousePressed = function(e) {
   this.bzm.mousePressed(new Point(e.getX(), e.getY()));
};

BZView.prototype.mouseReleased = function(e) {
   /* Empty */
};

BZView.prototype.mouseMoved = function(e) {
   /* Empty */
};

BZView.prototype.mouseDragged = function(e) {
   this.bzm.mouseDragged(new Point(e.getX(), e.getY()));
};

BZView.prototype.drawDot = function(g, pt) {
   var r = BZView.DOT_RADIUS;
   g.setColor(Color.RED);
   g.fillOval(pt.x - r, pt.y - r, 2 * r, 2 * r);
};

BZView.prototype.drawBox = function(g, pt) {
   var r = BZView.DOT_RADIUS;
   g.setColor(Color.MAGENTA);
   g.fillRect(pt.x - r, pt.y - r, 2 * r, 2 * r);
};

BZView.DOT_RADIUS = 3;

/* Exports */

return {
   BZC : BZC,
   BZController : BZController,
   BZModel : BZModel,
   BZSegment : BZSegment,
   BZView : BZView,
   Bezier : Bezier
};

});
