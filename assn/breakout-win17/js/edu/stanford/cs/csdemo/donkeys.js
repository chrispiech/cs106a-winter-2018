/*
 * File: donkeys.js
 * Created on Sat Oct 17 18:47:26 PDT 2015 by java2js
 * --------------------------------------------------
 * This file was generated mechanically by the java2js utility.
 * Permanent edits must be made in the Java file.
 */

define([ "jslib",
         "edu/stanford/cs/graphics",
         "edu/stanford/cs/java2js",
         "java/awt",
         "java/lang" ],

function(jslib,
         edu_stanford_cs_graphics,
         edu_stanford_cs_java2js,
         java_awt,
         java_lang) {

/* Imports */

var inheritPrototype = jslib.inheritPrototype;
var newArray = jslib.newArray;
var toInt = jslib.toInt;
var toStr = jslib.toStr;
var GCanvas = edu_stanford_cs_graphics.GCanvas;
var GCompound = edu_stanford_cs_graphics.GCompound;
var GImage = edu_stanford_cs_graphics.GImage;
var GMath = edu_stanford_cs_graphics.GMath;
var GObject = edu_stanford_cs_graphics.GObject;
var GPoint = edu_stanford_cs_graphics.GPoint;
var JSProgram = edu_stanford_cs_java2js.JSProgram;
var Dimension = java_awt.Dimension;
var MouseEvent = java_awt.MouseEvent;
var MouseListener = java_awt.MouseListener;
var MouseMotionListener = java_awt.MouseMotionListener;
var Class = java_lang.Class;

/* SamLoydDonkeys.js */

var SamLoydDonkeys = function() {
   JSProgram.call(this);
   this.createProgramFrame();
   this.setTitle("SamLoydDonkeys");
   var canvas = new PuzzleCanvas();
   this.add(canvas, "canvas");
   this.pack();
   this.setVisible(true);
};

SamLoydDonkeys.prototype = 
   jslib.inheritPrototype(JSProgram, "SamLoydDonkeys extends JSProgram");
SamLoydDonkeys.prototype.constructor = SamLoydDonkeys;
SamLoydDonkeys.prototype.$class = 
   new Class("SamLoydDonkeys", SamLoydDonkeys);

SamLoydDonkeys.main = function(args) {
   new SamLoydDonkeys().start();
};

var PuzzleCanvas = function() {
   GCanvas.call(this);
   this.addMouseListener(this);
   this.addMouseMotionListener(this);
   this.setPreferredSize(new Dimension(PuzzleCanvas.CANVAS_WIDTH, PuzzleCanvas.CANVAS_HEIGHT));
   this.initPuzzle();
   this.repaint();
};

PuzzleCanvas.prototype = 
   jslib.inheritPrototype(GCanvas, "PuzzleCanvas extends GCanvas");
PuzzleCanvas.prototype.constructor = PuzzleCanvas;
PuzzleCanvas.prototype.$class = 
   new Class("PuzzleCanvas", PuzzleCanvas);

PuzzleCanvas.prototype.initPuzzle = function() {
   this.background = new GImage(PuzzleCanvas.IMAGE_BASE + "MapleBackground.png");
   this.add(this.background);
   this.donkey1 = new PuzzlePiece(PuzzleCanvas.IMAGE_BASE + "Donkey1.png", PuzzleCanvas.DONKEY_WIDTH, PuzzleCanvas.DONKEY_HEIGHT);
   this.donkey2 = new PuzzlePiece(PuzzleCanvas.IMAGE_BASE + "Donkey2.png", PuzzleCanvas.DONKEY_WIDTH, PuzzleCanvas.DONKEY_HEIGHT);
   this.riders = new PuzzlePiece(PuzzleCanvas.IMAGE_BASE + "Riders.png", PuzzleCanvas.RIDERS_WIDTH, PuzzleCanvas.RIDERS_HEIGHT);
   this.riders.rotateTo(90);
   var xreq = PuzzleCanvas.DONKEY_WIDTH + PuzzleCanvas.RIDERS_HEIGHT;
   var xsp = (PuzzleCanvas.CANVAS_WIDTH - xreq) / 3;
   var yreq = 2 * PuzzleCanvas.DONKEY_HEIGHT;
   var ysp = (PuzzleCanvas.CANVAS_HEIGHT - yreq) / 3;
   var x = xsp + PuzzleCanvas.DONKEY_WIDTH / 2;
   this.add(this.donkey1, x, ysp + PuzzleCanvas.DONKEY_HEIGHT / 2);
   this.add(this.donkey2, x, PuzzleCanvas.CANVAS_HEIGHT - ysp - PuzzleCanvas.DONKEY_HEIGHT / 2);
   x = PuzzleCanvas.CANVAS_WIDTH - xsp - PuzzleCanvas.RIDERS_HEIGHT / 2;
   this.add(this.riders, x, PuzzleCanvas.CANVAS_HEIGHT / 2);
   this.selectedPiece = null;
};

PuzzleCanvas.prototype.mousePressed = function(e) {
   if (this.selectedPiece !== null) this.selectedPiece.deselect();
   this.selectedPiece = null;
   var obj = this.getElementAt(e.getX(), e.getY());
   if (obj !== null && obj !== this.background) {
      this.selectedPiece = obj;
      this.selectedPiece.select();
      this.last = new GPoint(e.getX(), e.getY());
      this.rotating = this.selectedPiece.isRotationControl(e.getX(), e.getY());
   }
   this.repaint();
};

PuzzleCanvas.prototype.mouseClicked = function(e) {
   /* Empty */
};

PuzzleCanvas.prototype.mouseEntered = function(e) {
   /* Empty */
};

PuzzleCanvas.prototype.mouseExited = function(e) {
   /* Empty */
};

PuzzleCanvas.prototype.mouseReleased = function(e) {
   /* Empty */
};

PuzzleCanvas.prototype.mouseMoved = function(e) {
   /* Empty */
};

PuzzleCanvas.prototype.mouseDragged = function(e) {
   if (this.selectedPiece !== null) {
      if (this.rotating) {
         var dx = e.getX() - this.selectedPiece.getX();
         var dy = e.getY() - this.selectedPiece.getY();
         this.selectedPiece.rotateTo(Math.round(GMath.angle(dx, dy)));
      } else {
         var dx = e.getX() - this.last.getX();
         var dy = e.getY() - this.last.getY();
         this.selectedPiece.move(dx, dy);
         this.last = new GPoint(e.getX(), e.getY());
      }
      this.repaint();
   }
};

PuzzleCanvas.HOME_URL = "http://cs.stanford.edu/~eroberts";
PuzzleCanvas.IMAGE_BASE = "images/";
PuzzleCanvas.CANVAS_HEIGHT = 680;
PuzzleCanvas.CANVAS_WIDTH = 900;
PuzzleCanvas.DONKEY_HEIGHT = 286;
PuzzleCanvas.DONKEY_WIDTH = 520;
PuzzleCanvas.RIDERS_HEIGHT = 111;
PuzzleCanvas.RIDERS_WIDTH = 559;
var PuzzlePiece = function(url, width, height) {
   GCompound.call(this);
   this.width = width;
   this.height = height;
   this.image = new GImage(url);
   this.add(this.image, -width / 2, -height / 2);
   var slash = url.lastIndexOf(toInt('/'));
   var root = url.substring(0, slash + 1);
   if (!jslib.endsWith(root, "images/")) root += "images/";
   this.rotateControl = new GImage(root + "FreeRotate.png");
   this.rotateControl.scale(PuzzlePiece.ROTATE_SCALE);
   this.r2 = PuzzlePiece.ROTATE_SIZE / 2 * PuzzlePiece.ROTATE_SCALE;
   this.r1 = width / 2 - this.r2 - PuzzlePiece.ROTATE_DX;
   this.add(this.rotateControl, this.r1 - this.r2, -this.r2);
   this.rotateControl.setVisible(false);
   this.theta = 0;
};

PuzzlePiece.prototype = 
   jslib.inheritPrototype(GCompound, "PuzzlePiece extends GCompound");
PuzzlePiece.prototype.constructor = PuzzlePiece;
PuzzlePiece.prototype.$class = 
   new Class("PuzzlePiece", PuzzlePiece);

PuzzlePiece.prototype.rotateTo = function(angle) {
   this.rotate(angle - this.theta);
   this.theta = angle;
};

PuzzlePiece.prototype.contains = function(x, y) {
   var dx = x - this.getX();
   var dy = y - this.getY();
   var tx = dx * GMath.cosDegrees(this.theta) - dy * GMath.sinDegrees(this.theta);
   var ty = dx * GMath.sinDegrees(this.theta) + dy * GMath.cosDegrees(this.theta);
   return Math.abs(tx) < this.width / 2 && Math.abs(ty) < this.height / 2;
};

PuzzlePiece.prototype.isRotationControl = function(x, y) {
   var dx = x - (this.getX() + this.r1 * GMath.cosDegrees(this.theta));
   var dy = y - (this.getY() - this.r1 * GMath.sinDegrees(this.theta));
   return dx * dx + dy * dy <= this.r2 * this.r2;
};

PuzzlePiece.prototype.deselect = function() {
   this.rotateControl.setVisible(false);
};

PuzzlePiece.prototype.select = function() {
   this.rotateControl.setVisible(true);
};

PuzzlePiece.ROTATE_SIZE = 144;
PuzzlePiece.ROTATE_SCALE = 0.4;
PuzzlePiece.ROTATE_DX = 4;

/* Exports */

return {
   SamLoydDonkeys : SamLoydDonkeys
};

});
