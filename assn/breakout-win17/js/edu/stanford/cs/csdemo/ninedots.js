/*
 * File: ninedots.js
 * Created on Sat Oct 17 18:43:20 PDT 2015 by java2js
 * --------------------------------------------------
 * This file was generated mechanically by the java2js utility.
 * Permanent edits must be made in the Java file.
 */

define([ "jslib",
         "edu/stanford/cs/graphics",
         "edu/stanford/cs/java2js",
         "edu/stanford/cs/jscontrols/JSControl",
         "edu/stanford/cs/jscontrols/ResetControl",
         "java/awt",
         "java/lang",
         "java/util" ],

function(jslib,
         edu_stanford_cs_graphics,
         edu_stanford_cs_java2js,
         edu_stanford_cs_jscontrols_JSControl,
         edu_stanford_cs_jscontrols_ResetControl,
         java_awt,
         java_lang,
         java_util) {

/* Imports */

var inheritPrototype = jslib.inheritPrototype;
var newArray = jslib.newArray;
var toInt = jslib.toInt;
var toStr = jslib.toStr;
var GCanvas = edu_stanford_cs_graphics.GCanvas;
var GLine = edu_stanford_cs_graphics.GLine;
var GOval = edu_stanford_cs_graphics.GOval;
var GPoint = edu_stanford_cs_graphics.GPoint;
var JSElementList = edu_stanford_cs_java2js.JSElementList;
var JSProgram = edu_stanford_cs_java2js.JSProgram;
var JSControl = edu_stanford_cs_jscontrols_JSControl.JSControl;
var ResetControl = edu_stanford_cs_jscontrols_ResetControl.ResetControl;
var Color = java_awt.Color;
var Dimension = java_awt.Dimension;
var Graphics = java_awt.Graphics;
var Graphics2D = java_awt.Graphics2D;
var ActionEvent = java_awt.ActionEvent;
var ActionListener = java_awt.ActionListener;
var MouseEvent = java_awt.MouseEvent;
var MouseListener = java_awt.MouseListener;
var MouseMotionListener = java_awt.MouseMotionListener;
var Class = java_lang.Class;
var ArrayList = java_util.ArrayList;

/* NineDotsPuzzle.js */

var NineDotsPuzzle = function() {
   JSProgram.call(this);
   this.createProgramFrame();
   this.setTitle("NineDotsPuzzle");
   this.canvas = new NineDotsCanvas();
   this.add(this.canvas, "canvas");
   var resetControl = new ResetControl();
   resetControl.addActionListener(this);
   this.addControl(resetControl);
   this.pack();
   this.setVisible(true);
};

NineDotsPuzzle.prototype = 
   jslib.inheritPrototype(JSProgram, "NineDotsPuzzle extends JSProgram");
NineDotsPuzzle.prototype.constructor = NineDotsPuzzle;
NineDotsPuzzle.prototype.$class = 
   new Class("NineDotsPuzzle", NineDotsPuzzle);

NineDotsPuzzle.prototype.actionPerformed = function(e) {
   if (jslib.equals(e.getActionCommand(), "Reset")) {
      this.canvas.reset();
   }
};

NineDotsPuzzle.main = function(args) {
   new NineDotsPuzzle().start();
};

var NineDotsCanvas = function() {
   GCanvas.call(this);
   this.addMouseListener(this);
   this.addMouseMotionListener(this);
   this.setPreferredSize(new Dimension(NineDotsCanvas.CANVAS_WIDTH, NineDotsCanvas.CANVAS_HEIGHT));
   this.initPuzzle();
   this.repaint();
};

NineDotsCanvas.prototype = 
   jslib.inheritPrototype(GCanvas, "NineDotsCanvas extends GCanvas");
NineDotsCanvas.prototype.constructor = NineDotsCanvas;
NineDotsCanvas.prototype.$class = 
   new Class("NineDotsCanvas", NineDotsCanvas);

NineDotsCanvas.prototype.paintComponent = function(g) {
   this.paint2D(g);
};

NineDotsCanvas.prototype.paint2D = function(g) {
   var dotList = new JSElementList(this.dots);
   var lineList = new JSElementList(this.lines);
   for (var i = 0; i < dotList.size(); i++) {
      var dot = dotList.get(i);
      dot.setColor(Color.BLACK);
      for (var j = 0; j < lineList.size(); j++) {
         var line = lineList.get(j);
         if (this.lineHitsDot(line, dot)) dot.setColor(Color.BLUE);
      }
      dot.paint(g);
   }
   for (var i = 0; i < lineList.size(); i++) {
      lineList.get(i).paint(g);
   }
};

NineDotsCanvas.prototype.initPuzzle = function() {
   this.dots = new ArrayList();
   this.lines = new ArrayList();
   for (var i = 0; i < 3; i++) {
      var y = NineDotsCanvas.CANVAS_HEIGHT / 2 - (i - 1) * NineDotsCanvas.DOT_SEP;
      for (var j = 0; j < 3; j++) {
         var x = NineDotsCanvas.CANVAS_WIDTH / 2 + (j - 1) * NineDotsCanvas.DOT_SEP;
         var dot = new GOval(NineDotsCanvas.DOT_SIZE, NineDotsCanvas.DOT_SIZE);
         dot.setLocation(x - NineDotsCanvas.DOT_SIZE / 2, y - NineDotsCanvas.DOT_SIZE / 2);
         dot.setFilled(true);
         this.dots.add(dot);
      }
   }
};

NineDotsCanvas.prototype.reset = function() {
   this.lines.clear();
   this.repaint();
};

NineDotsCanvas.prototype.lineHitsDot = function(line, dot) {
   var r = NineDotsCanvas.DOT_SIZE / 2;
   var x = dot.getX() + r;
   var y = dot.getY() + r;
   var x1 = line.getStartPoint().getX();
   var y1 = line.getStartPoint().getY();
   var x2 = line.getEndPoint().getX();
   var y2 = line.getEndPoint().getY();
   var u = 0;
   var dsq = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
   if (dsq !== 0) {
      u = ((x - x1) * (x2 - x1) + (y - y1) * (y2 - y1)) / dsq;
      u = Math.max(0, Math.min(1, u));
   }
   var x3 = x1 + u * (x2 - x1);
   var y3 = y1 + u * (y2 - y1);
   return (x - x3) * (x - x3) + (y - y3) * (y - y3) < r * r;
};

NineDotsCanvas.prototype.mousePressed = function(e) {
   if (this.lines.size() === 4) this.lines.clear();
   var x1 = e.getX();
   var y1 = e.getY();
   if (!this.lines.isEmpty()) {
      var ep = this.lines.get(this.lines.size() - 1).getEndPoint();
      x1 = ep.getX();
      y1 = ep.getY();
   }
   var line = new GLine(x1, y1, e.getX(), e.getY());
   line.setColor(Color.BLUE);
   this.lines.add(line);
   this.repaint();
};

NineDotsCanvas.prototype.mouseClicked = function(e) {
   /* Empty */
};

NineDotsCanvas.prototype.mouseEntered = function(e) {
   /* Empty */
};

NineDotsCanvas.prototype.mouseExited = function(e) {
   /* Empty */
};

NineDotsCanvas.prototype.mouseReleased = function(e) {
   /* Empty */
};

NineDotsCanvas.prototype.mouseMoved = function(e) {
   /* Empty */
};

NineDotsCanvas.prototype.mouseDragged = function(e) {
   this.lines.get(this.lines.size() - 1).setEndPoint(e.getX(), e.getY());
   this.repaint();
};

NineDotsCanvas.CANVAS_WIDTH = 800;
NineDotsCanvas.CANVAS_HEIGHT = 500;
NineDotsCanvas.DOT_SIZE = 30;
NineDotsCanvas.DOT_SEP = 80;

/* Exports */

return {
   NineDotsPuzzle : NineDotsPuzzle
};

});
