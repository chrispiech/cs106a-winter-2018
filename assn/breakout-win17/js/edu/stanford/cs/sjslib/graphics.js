/*
 * File: graphics.js
 * Created on Mon Feb 08 21:55:12 PST 2016 by java2js
 * --------------------------------------------------
 * This file was generated mechanically by the java2js utility.
 * Permanent edits must be made in the Java file.
 */

define([ "jslib",
         "edu/stanford/cs/exp",
         "edu/stanford/cs/graphics",
         "edu/stanford/cs/java2js",
         "edu/stanford/cs/sjslib/core",
         "edu/stanford/cs/svm",
         "java/awt",
         "java/lang",
         "javax/swing" ],

function(jslib,
         edu_stanford_cs_exp,
         edu_stanford_cs_graphics,
         edu_stanford_cs_java2js,
         edu_stanford_cs_sjslib_core,
         edu_stanford_cs_svm,
         java_awt,
         java_lang,
         javax_swing) {

/* Imports */

var inheritPrototype = jslib.inheritPrototype;
var newArray = jslib.newArray;
var toInt = jslib.toInt;
var toStr = jslib.toStr;
var Value = edu_stanford_cs_exp.Value;
var GArc = edu_stanford_cs_graphics.GArc;
var GCanvas = edu_stanford_cs_graphics.GCanvas;
var GCompound = edu_stanford_cs_graphics.GCompound;
var GDimension = edu_stanford_cs_graphics.GDimension;
var GImage = edu_stanford_cs_graphics.GImage;
var GLabel = edu_stanford_cs_graphics.GLabel;
var GLine = edu_stanford_cs_graphics.GLine;
var GObject = edu_stanford_cs_graphics.GObject;
var GOval = edu_stanford_cs_graphics.GOval;
var GPoint = edu_stanford_cs_graphics.GPoint;
var GPolygon = edu_stanford_cs_graphics.GPolygon;
var GRect = edu_stanford_cs_graphics.GRect;
var GRectangle = edu_stanford_cs_graphics.GRectangle;
var GTransform = edu_stanford_cs_graphics.GTransform;
var JSImage = edu_stanford_cs_java2js.JSImage;
var SJSEventClass = edu_stanford_cs_sjslib_core.SJSEventClass;
var SVM = edu_stanford_cs_svm.SVM;
var SVMArray = edu_stanford_cs_svm.SVMArray;
var SVMC = edu_stanford_cs_svm.SVMC;
var SVMClass = edu_stanford_cs_svm.SVMClass;
var SVMConstant = edu_stanford_cs_svm.SVMConstant;
var SVMMethod = edu_stanford_cs_svm.SVMMethod;
var SVMPackage = edu_stanford_cs_svm.SVMPackage;
var SVMProgram = edu_stanford_cs_svm.SVMProgram;
var BorderLayout = java_awt.BorderLayout;
var Color = java_awt.Color;
var ActionEvent = java_awt.ActionEvent;
var ActionListener = java_awt.ActionListener;
var KeyEvent = java_awt.KeyEvent;
var KeyListener = java_awt.KeyListener;
var MouseEvent = java_awt.MouseEvent;
var MouseListener = java_awt.MouseListener;
var MouseMotionListener = java_awt.MouseMotionListener;
var Class = java_lang.Class;
var Integer = java_lang.Integer;
var RuntimeException = java_lang.RuntimeException;
var JFrame = javax_swing.JFrame;

/* SJSColorClass.js */

var SJSColorClass = function() {
   SVMClass.call(this);
   this.defineMethod("new", new Color_new());
   this.defineMethod("getRed", new Color_getRed());
   this.defineMethod("getGreen", new Color_getGreen());
   this.defineMethod("getBlue", new Color_getBlue());
   this.defineMethod("getAlpha", new Color_getAlpha());
   this.defineMethod("BLACK", new Color_BLACK());
   this.defineMethod("BLUE", new Color_BLUE());
   this.defineMethod("CYAN", new Color_CYAN());
   this.defineMethod("DARK_GRAY", new Color_DARK_GRAY());
   this.defineMethod("GRAY", new Color_GRAY());
   this.defineMethod("GREEN", new Color_GREEN());
   this.defineMethod("LIGHT_GRAY", new Color_LIGHT_GRAY());
   this.defineMethod("MAGENTA", new Color_MAGENTA());
   this.defineMethod("ORANGE", new Color_ORANGE());
   this.defineMethod("PINK", new Color_PINK());
   this.defineMethod("RED", new Color_RED());
   this.defineMethod("WHITE", new Color_WHITE());
   this.defineMethod("YELLOW", new Color_YELLOW());
};

SJSColorClass.prototype = 
   jslib.inheritPrototype(SVMClass, "SJSColorClass extends SVMClass");
SJSColorClass.prototype.constructor = SJSColorClass;
SJSColorClass.prototype.$class = 
   new Class("SJSColorClass", SJSColorClass);

var Color_new = function() {
   SVMMethod.call(this);
};

Color_new.prototype =
   jslib.inheritPrototype(SVMMethod, "Color_new extends SVMMethod");
Color_new.prototype.constructor = Color_new;
Color_new.prototype.$class = 
   new Class("Color_new", Color_new);

Color_new.prototype.execute = function(svm, receiver) {
   var v = null;
   var nArgs = svm.getArgumentCount();
   if (nArgs === 1) {
      v = svm.pop();
      var type = v.getType();
      var rgb = 0;
      if (type === Value.INTEGER) {
         rgb = v.getIntegerValue();
      } else if (type === Value.STRING) {
         rgb = Integer.parseInt(v.getStringValue(), 16);
      } else {
         throw new RuntimeException("Illegal color specification");
      }
      v = Value.createObject(new Color(rgb), "Color");
   } else if (nArgs === 4) {
      svm.checkSignature("Color.new", "IIII");
      var aa = svm.popInteger();
      var bb = svm.popInteger();
      var gg = svm.popInteger();
      var rr = svm.popInteger();
      v = Value.createObject(new Color(rr, gg, bb, aa), "Color");
   } else {
      svm.checkSignature("Color.new", "III");
      var bb = svm.popInteger();
      var gg = svm.popInteger();
      var rr = svm.popInteger();
      v = Value.createObject(new Color(rr, gg, bb), "Color");
   }
   svm.push(v);
};

var ColorMethod = function() {
   SVMMethod.call(this);
};

ColorMethod.prototype =
   jslib.inheritPrototype(SVMMethod, "ColorMethod extends SVMMethod");
ColorMethod.prototype.constructor = ColorMethod;
ColorMethod.prototype.$class = 
   new Class("ColorMethod", ColorMethod);

ColorMethod.prototype.getColor = function(svm, receiver) {
   if (receiver === null) {
      return svm.pop().getValue();
   } else {
      return receiver.getValue();
   }
};

var Color_getRed = function() {
   ColorMethod.call(this);
};

Color_getRed.prototype =
   jslib.inheritPrototype(ColorMethod, "Color_getRed extends ColorMethod");
Color_getRed.prototype.constructor = Color_getRed;
Color_getRed.prototype.$class = 
   new Class("Color_getRed", Color_getRed);

Color_getRed.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Color.getRed", "");
   svm.pushInteger(this.getColor(svm, receiver).getRed());
};

var Color_getGreen = function() {
   ColorMethod.call(this);
};

Color_getGreen.prototype =
   jslib.inheritPrototype(ColorMethod, "Color_getGreen extends ColorMethod");
Color_getGreen.prototype.constructor = Color_getGreen;
Color_getGreen.prototype.$class = 
   new Class("Color_getGreen", Color_getGreen);

Color_getGreen.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Color.getGreen", "");
   svm.pushInteger(this.getColor(svm, receiver).getGreen());
};

var Color_getBlue = function() {
   ColorMethod.call(this);
};

Color_getBlue.prototype =
   jslib.inheritPrototype(ColorMethod, "Color_getBlue extends ColorMethod");
Color_getBlue.prototype.constructor = Color_getBlue;
Color_getBlue.prototype.$class = 
   new Class("Color_getBlue", Color_getBlue);

Color_getBlue.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Color.getBlue", "");
   svm.pushInteger(this.getColor(svm, receiver).getBlue());
};

var Color_getAlpha = function() {
   ColorMethod.call(this);
};

Color_getAlpha.prototype =
   jslib.inheritPrototype(ColorMethod, "Color_getAlpha extends ColorMethod");
Color_getAlpha.prototype.constructor = Color_getAlpha;
Color_getAlpha.prototype.$class = 
   new Class("Color_getAlpha", Color_getAlpha);

Color_getAlpha.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Color.getAlpha", "");
   svm.pushInteger(this.getColor(svm, receiver).getAlpha());
};

var Color_BLACK = function() {
   SVMConstant.call(this);
};

Color_BLACK.prototype =
   jslib.inheritPrototype(SVMConstant, "Color_BLACK extends SVMConstant");
Color_BLACK.prototype.constructor = Color_BLACK;
Color_BLACK.prototype.$class = 
   new Class("Color_BLACK", Color_BLACK);

Color_BLACK.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Color.BLACK", "");
   svm.push(Value.createObject(Color.BLACK, "Color"));
};

var Color_BLUE = function() {
   SVMConstant.call(this);
};

Color_BLUE.prototype =
   jslib.inheritPrototype(SVMConstant, "Color_BLUE extends SVMConstant");
Color_BLUE.prototype.constructor = Color_BLUE;
Color_BLUE.prototype.$class = 
   new Class("Color_BLUE", Color_BLUE);

Color_BLUE.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Color.BLUE", "");
   svm.push(Value.createObject(Color.BLUE, "Color"));
};

var Color_CYAN = function() {
   SVMConstant.call(this);
};

Color_CYAN.prototype =
   jslib.inheritPrototype(SVMConstant, "Color_CYAN extends SVMConstant");
Color_CYAN.prototype.constructor = Color_CYAN;
Color_CYAN.prototype.$class = 
   new Class("Color_CYAN", Color_CYAN);

Color_CYAN.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Color.CYAN", "");
   svm.push(Value.createObject(Color.CYAN, "Color"));
};

var Color_DARK_GRAY = function() {
   SVMConstant.call(this);
};

Color_DARK_GRAY.prototype =
   jslib.inheritPrototype(SVMConstant, "Color_DARK_GRAY extends SVMConstant");
Color_DARK_GRAY.prototype.constructor = Color_DARK_GRAY;
Color_DARK_GRAY.prototype.$class = 
   new Class("Color_DARK_GRAY", Color_DARK_GRAY);

Color_DARK_GRAY.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Color.DARK_GRAY", "");
   svm.push(Value.createObject(Color.DARK_GRAY, "Color"));
};

var Color_GRAY = function() {
   SVMConstant.call(this);
};

Color_GRAY.prototype =
   jslib.inheritPrototype(SVMConstant, "Color_GRAY extends SVMConstant");
Color_GRAY.prototype.constructor = Color_GRAY;
Color_GRAY.prototype.$class = 
   new Class("Color_GRAY", Color_GRAY);

Color_GRAY.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Color.GRAY", "");
   svm.push(Value.createObject(Color.GRAY, "Color"));
};

var Color_GREEN = function() {
   SVMConstant.call(this);
};

Color_GREEN.prototype =
   jslib.inheritPrototype(SVMConstant, "Color_GREEN extends SVMConstant");
Color_GREEN.prototype.constructor = Color_GREEN;
Color_GREEN.prototype.$class = 
   new Class("Color_GREEN", Color_GREEN);

Color_GREEN.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Color.GREEN", "");
   svm.push(Value.createObject(Color.GREEN, "Color"));
};

var Color_LIGHT_GRAY = function() {
   SVMConstant.call(this);
};

Color_LIGHT_GRAY.prototype =
   jslib.inheritPrototype(SVMConstant, "Color_LIGHT_GRAY extends SVMConstant");
Color_LIGHT_GRAY.prototype.constructor = Color_LIGHT_GRAY;
Color_LIGHT_GRAY.prototype.$class = 
   new Class("Color_LIGHT_GRAY", Color_LIGHT_GRAY);

Color_LIGHT_GRAY.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Color.LIGHT_GRAY", "");
   svm.push(Value.createObject(Color.LIGHT_GRAY, "Color"));
};

var Color_MAGENTA = function() {
   SVMConstant.call(this);
};

Color_MAGENTA.prototype =
   jslib.inheritPrototype(SVMConstant, "Color_MAGENTA extends SVMConstant");
Color_MAGENTA.prototype.constructor = Color_MAGENTA;
Color_MAGENTA.prototype.$class = 
   new Class("Color_MAGENTA", Color_MAGENTA);

Color_MAGENTA.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Color.MAGENTA", "");
   svm.push(Value.createObject(Color.MAGENTA, "Color"));
};

var Color_ORANGE = function() {
   SVMConstant.call(this);
};

Color_ORANGE.prototype =
   jslib.inheritPrototype(SVMConstant, "Color_ORANGE extends SVMConstant");
Color_ORANGE.prototype.constructor = Color_ORANGE;
Color_ORANGE.prototype.$class = 
   new Class("Color_ORANGE", Color_ORANGE);

Color_ORANGE.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Color.ORANGE", "");
   svm.push(Value.createObject(Color.ORANGE, "Color"));
};

var Color_PINK = function() {
   SVMConstant.call(this);
};

Color_PINK.prototype =
   jslib.inheritPrototype(SVMConstant, "Color_PINK extends SVMConstant");
Color_PINK.prototype.constructor = Color_PINK;
Color_PINK.prototype.$class = 
   new Class("Color_PINK", Color_PINK);

Color_PINK.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Color.PINK", "");
   svm.push(Value.createObject(Color.PINK, "Color"));
};

var Color_RED = function() {
   SVMConstant.call(this);
};

Color_RED.prototype =
   jslib.inheritPrototype(SVMConstant, "Color_RED extends SVMConstant");
Color_RED.prototype.constructor = Color_RED;
Color_RED.prototype.$class = 
   new Class("Color_RED", Color_RED);

Color_RED.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Color.RED", "");
   svm.push(Value.createObject(Color.RED, "Color"));
};

var Color_WHITE = function() {
   SVMConstant.call(this);
};

Color_WHITE.prototype =
   jslib.inheritPrototype(SVMConstant, "Color_WHITE extends SVMConstant");
Color_WHITE.prototype.constructor = Color_WHITE;
Color_WHITE.prototype.$class = 
   new Class("Color_WHITE", Color_WHITE);

Color_WHITE.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Color.WHITE", "");
   svm.push(Value.createObject(Color.WHITE, "Color"));
};

var Color_YELLOW = function() {
   SVMConstant.call(this);
};

Color_YELLOW.prototype =
   jslib.inheritPrototype(SVMConstant, "Color_YELLOW extends SVMConstant");
Color_YELLOW.prototype.constructor = Color_YELLOW;
Color_YELLOW.prototype.$class = 
   new Class("Color_YELLOW", Color_YELLOW);

Color_YELLOW.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Color.YELLOW", "");
   svm.push(Value.createObject(Color.YELLOW, "Color"));
};


/* SJSGObjectClass.js */

var SJSGObjectClass = function() {
   SVMClass.call(this);
   this.defineMethod("getBounds", new GObject_getBounds());
   this.defineMethod("setLocation", new GObject_setLocation());
   this.defineMethod("getLocation", new GObject_getLocation());
   this.defineMethod("getX", new GObject_getX());
   this.defineMethod("getY", new GObject_getY());
   this.defineMethod("move", new GObject_move());
   this.defineMethod("movePolar", new GObject_movePolar());
   this.defineMethod("getSize", new GObject_getSize());
   this.defineMethod("getWidth", new GObject_getWidth());
   this.defineMethod("getHeight", new GObject_getHeight());
   this.defineMethod("contains", new GObject_contains());
   this.defineMethod("setColor", new GObject_setColor());
   this.defineMethod("getColor", new GObject_getColor());
   this.defineMethod("setLineWidth", new GObject_setLineWidth());
   this.defineMethod("getLineWidth", new GObject_getLineWidth());
   this.defineMethod("rotate", new GObject_rotate());
   this.defineMethod("scale", new GObject_scale());
   this.defineMethod("shear", new GObject_shear());
   this.defineMethod("translate", new GObject_translate());
   this.defineMethod("setVisible", new GObject_setVisible());
   this.defineMethod("isVisible", new GObject_isVisible());
};

SJSGObjectClass.prototype = 
   jslib.inheritPrototype(SVMClass, "SJSGObjectClass extends SVMClass");
SJSGObjectClass.prototype.constructor = SJSGObjectClass;
SJSGObjectClass.prototype.$class = 
   new Class("SJSGObjectClass", SJSGObjectClass);

var GObjectMethod = function() {
   SVMMethod.call(this);
};

GObjectMethod.prototype =
   jslib.inheritPrototype(SVMMethod, "GObjectMethod extends SVMMethod");
GObjectMethod.prototype.constructor = GObjectMethod;
GObjectMethod.prototype.$class = 
   new Class("GObjectMethod", GObjectMethod);

GObjectMethod.prototype.getGObject = function(svm, receiver) {
   if (receiver === null) {
      return svm.pop().getValue();
   } else {
      return receiver.getValue();
   }
};

var GObject_getBounds = function() {
   GObjectMethod.call(this);
};

GObject_getBounds.prototype =
   jslib.inheritPrototype(GObjectMethod, "GObject_getBounds extends GObjectMethod");
GObject_getBounds.prototype.constructor = GObject_getBounds;
GObject_getBounds.prototype.$class = 
   new Class("GObject_getBounds", GObject_getBounds);

GObject_getBounds.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GObject.getBounds", "");
   var bounds = this.getGObject(svm, receiver).getBounds();
   svm.push(Value.createObject(bounds, "GRectangle"));
};

var GObject_setLocation = function() {
   GObjectMethod.call(this);
};

GObject_setLocation.prototype =
   jslib.inheritPrototype(GObjectMethod, "GObject_setLocation extends GObjectMethod");
GObject_setLocation.prototype.constructor = GObject_setLocation;
GObject_setLocation.prototype.$class = 
   new Class("GObject_setLocation", GObject_setLocation);

GObject_setLocation.prototype.execute = function(svm, receiver) {
   if (svm.getArgumentCount() === 1) {
      svm.checkSignature("GObject.setLocation", "O");
      var pt = svm.pop().getValue();
      this.getGObject(svm, receiver).setLocation(pt.getX(), pt.getY());
   } else {
      svm.checkSignature("GObject.setLocation", "DD");
      var y = svm.popDouble();
      var x = svm.popDouble();
      this.getGObject(svm, receiver).setLocation(x, y);
   }
};

var GObject_getLocation = function() {
   GObjectMethod.call(this);
};

GObject_getLocation.prototype =
   jslib.inheritPrototype(GObjectMethod, "GObject_getLocation extends GObjectMethod");
GObject_getLocation.prototype.constructor = GObject_getLocation;
GObject_getLocation.prototype.$class = 
   new Class("GObject_getLocation", GObject_getLocation);

GObject_getLocation.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GObject.getLocation", "");
   var pt = this.getGObject(svm, receiver).getLocation();
   svm.push(Value.createObject(pt, "GPoint"));
};

var GObject_getX = function() {
   GObjectMethod.call(this);
};

GObject_getX.prototype =
   jslib.inheritPrototype(GObjectMethod, "GObject_getX extends GObjectMethod");
GObject_getX.prototype.constructor = GObject_getX;
GObject_getX.prototype.$class = 
   new Class("GObject_getX", GObject_getX);

GObject_getX.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GObject.getX", "");
   svm.pushDouble(this.getGObject(svm, receiver).getX());
};

var GObject_getY = function() {
   GObjectMethod.call(this);
};

GObject_getY.prototype =
   jslib.inheritPrototype(GObjectMethod, "GObject_getY extends GObjectMethod");
GObject_getY.prototype.constructor = GObject_getY;
GObject_getY.prototype.$class = 
   new Class("GObject_getY", GObject_getY);

GObject_getY.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GObject.getY", "");
   svm.pushDouble(this.getGObject(svm, receiver).getY());
};

var GObject_move = function() {
   GObjectMethod.call(this);
};

GObject_move.prototype =
   jslib.inheritPrototype(GObjectMethod, "GObject_move extends GObjectMethod");
GObject_move.prototype.constructor = GObject_move;
GObject_move.prototype.$class = 
   new Class("GObject_move", GObject_move);

GObject_move.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GObject.move", "DD");
   var dy = svm.popDouble();
   var dx = svm.popDouble();
   this.getGObject(svm, receiver).move(dx, dy);
};

var GObject_movePolar = function() {
   GObjectMethod.call(this);
};

GObject_movePolar.prototype =
   jslib.inheritPrototype(GObjectMethod, "GObject_movePolar extends GObjectMethod");
GObject_movePolar.prototype.constructor = GObject_movePolar;
GObject_movePolar.prototype.$class = 
   new Class("GObject_movePolar", GObject_movePolar);

GObject_movePolar.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GObject.movePolar", "DD");
   var theta = svm.popDouble();
   var r = svm.popDouble();
   this.getGObject(svm, receiver).movePolar(r, theta);
};

var GObject_getSize = function() {
   GObjectMethod.call(this);
};

GObject_getSize.prototype =
   jslib.inheritPrototype(GObjectMethod, "GObject_getSize extends GObjectMethod");
GObject_getSize.prototype.constructor = GObject_getSize;
GObject_getSize.prototype.$class = 
   new Class("GObject_getSize", GObject_getSize);

GObject_getSize.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GObject.getSize", "");
   var size = this.getGObject(svm, receiver).getSize();
   svm.push(Value.createObject(size, "GDimension"));
};

var GObject_getWidth = function() {
   GObjectMethod.call(this);
};

GObject_getWidth.prototype =
   jslib.inheritPrototype(GObjectMethod, "GObject_getWidth extends GObjectMethod");
GObject_getWidth.prototype.constructor = GObject_getWidth;
GObject_getWidth.prototype.$class = 
   new Class("GObject_getWidth", GObject_getWidth);

GObject_getWidth.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GObject.getWidth", "");
   svm.pushDouble(this.getGObject(svm, receiver).getWidth());
};

var GObject_getHeight = function() {
   GObjectMethod.call(this);
};

GObject_getHeight.prototype =
   jslib.inheritPrototype(GObjectMethod, "GObject_getHeight extends GObjectMethod");
GObject_getHeight.prototype.constructor = GObject_getHeight;
GObject_getHeight.prototype.$class = 
   new Class("GObject_getHeight", GObject_getHeight);

GObject_getHeight.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GObject.getHeight", "");
   svm.pushDouble(this.getGObject(svm, receiver).getHeight());
};

var GObject_contains = function() {
   GObjectMethod.call(this);
};

GObject_contains.prototype =
   jslib.inheritPrototype(GObjectMethod, "GObject_contains extends GObjectMethod");
GObject_contains.prototype.constructor = GObject_contains;
GObject_contains.prototype.$class = 
   new Class("GObject_contains", GObject_contains);

GObject_contains.prototype.execute = function(svm, receiver) {
   if (svm.getArgumentCount() === 1) {
      svm.checkSignature("GObject.contains", "O");
      var pt = svm.pop().getValue();
      svm.pushBoolean(this.getGObject(svm, receiver).contains(pt.getX(), pt.getY()));
   } else {
      svm.checkSignature("GObject.contains", "DD");
      var y = svm.popDouble();
      var x = svm.popDouble();
      svm.pushBoolean(this.getGObject(svm, receiver).contains(x, y));
   }
};

var GObject_setColor = function() {
   GObjectMethod.call(this);
};

GObject_setColor.prototype =
   jslib.inheritPrototype(GObjectMethod, "GObject_setColor extends GObjectMethod");
GObject_setColor.prototype.constructor = GObject_setColor;
GObject_setColor.prototype.$class = 
   new Class("GObject_setColor", GObject_setColor);

GObject_setColor.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GObject.setColor", "O");
   var color = svm.pop().getValue();
   this.getGObject(svm, receiver).setColor(color);
};

var GObject_getColor = function() {
   GObjectMethod.call(this);
};

GObject_getColor.prototype =
   jslib.inheritPrototype(GObjectMethod, "GObject_getColor extends GObjectMethod");
GObject_getColor.prototype.constructor = GObject_getColor;
GObject_getColor.prototype.$class = 
   new Class("GObject_getColor", GObject_getColor);

GObject_getColor.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GObject.getColor", "");
   var color = this.getGObject(svm, receiver).getColor();
   svm.push(Value.createObject(color, "Color"));
};

var GObject_setLineWidth = function() {
   GObjectMethod.call(this);
};

GObject_setLineWidth.prototype =
   jslib.inheritPrototype(GObjectMethod, "GObject_setLineWidth extends GObjectMethod");
GObject_setLineWidth.prototype.constructor = GObject_setLineWidth;
GObject_setLineWidth.prototype.$class = 
   new Class("GObject_setLineWidth", GObject_setLineWidth);

GObject_setLineWidth.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GObject.setLineWidth", "D");
   var width = svm.popDouble();
   this.getGObject(svm, receiver).setLineWidth(width);
};

var GObject_getLineWidth = function() {
   GObjectMethod.call(this);
};

GObject_getLineWidth.prototype =
   jslib.inheritPrototype(GObjectMethod, "GObject_getLineWidth extends GObjectMethod");
GObject_getLineWidth.prototype.constructor = GObject_getLineWidth;
GObject_getLineWidth.prototype.$class = 
   new Class("GObject_getLineWidth", GObject_getLineWidth);

GObject_getLineWidth.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GObject.getLineWidth", "");
   svm.pushDouble(this.getGObject(svm, receiver).getLineWidth());
};

var GObject_rotate = function() {
   GObjectMethod.call(this);
};

GObject_rotate.prototype =
   jslib.inheritPrototype(GObjectMethod, "GObject_rotate extends GObjectMethod");
GObject_rotate.prototype.constructor = GObject_rotate;
GObject_rotate.prototype.$class = 
   new Class("GObject_rotate", GObject_rotate);

GObject_rotate.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GObject.rotate", "D");
   var theta = svm.popDouble();
   this.getGObject(svm, receiver).rotate(theta);
};

var GObject_scale = function() {
   GObjectMethod.call(this);
};

GObject_scale.prototype =
   jslib.inheritPrototype(GObjectMethod, "GObject_scale extends GObjectMethod");
GObject_scale.prototype.constructor = GObject_scale;
GObject_scale.prototype.$class = 
   new Class("GObject_scale", GObject_scale);

GObject_scale.prototype.execute = function(svm, receiver) {
   if (svm.getArgumentCount() === 2) {
      svm.checkSignature("GObject.scale", "DD");
      var sy = svm.popDouble();
      var sx = svm.popDouble();
      this.getGObject(svm, receiver).scale(sx, sy);
   } else {
      svm.checkSignature("GObject.scale", "D");
      var sf = svm.popDouble();
      this.getGObject(svm, receiver).scale(sf);
   }
};

var GObject_shear = function() {
   GObjectMethod.call(this);
};

GObject_shear.prototype =
   jslib.inheritPrototype(GObjectMethod, "GObject_shear extends GObjectMethod");
GObject_shear.prototype.constructor = GObject_shear;
GObject_shear.prototype.$class = 
   new Class("GObject_shear", GObject_shear);

GObject_shear.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GObject.shear", "DD");
   var sy = svm.popDouble();
   var sx = svm.popDouble();
   this.getGObject(svm, receiver).shear(sx, sy);
};

var GObject_translate = function() {
   GObjectMethod.call(this);
};

GObject_translate.prototype =
   jslib.inheritPrototype(GObjectMethod, "GObject_translate extends GObjectMethod");
GObject_translate.prototype.constructor = GObject_translate;
GObject_translate.prototype.$class = 
   new Class("GObject_translate", GObject_translate);

GObject_translate.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GObject.translate", "DD");
   var ty = svm.popDouble();
   var tx = svm.popDouble();
   this.getGObject(svm, receiver).translate(tx, ty);
};

var GObject_setVisible = function() {
   GObjectMethod.call(this);
};

GObject_setVisible.prototype =
   jslib.inheritPrototype(GObjectMethod, "GObject_setVisible extends GObjectMethod");
GObject_setVisible.prototype.constructor = GObject_setVisible;
GObject_setVisible.prototype.$class = 
   new Class("GObject_setVisible", GObject_setVisible);

GObject_setVisible.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GObject.setVisible", "B");
   var flag = svm.popBoolean();
   this.getGObject(svm, receiver).setVisible(flag);
};

var GObject_isVisible = function() {
   GObjectMethod.call(this);
};

GObject_isVisible.prototype =
   jslib.inheritPrototype(GObjectMethod, "GObject_isVisible extends GObjectMethod");
GObject_isVisible.prototype.constructor = GObject_isVisible;
GObject_isVisible.prototype.$class = 
   new Class("GObject_isVisible", GObject_isVisible);

GObject_isVisible.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GObject.isVisible", "");
   svm.pushBoolean(this.getGObject(svm, receiver).isVisible());
};


/* SJSGArcClass.js */

var SJSGArcClass = function() {
   SJSGObjectClass.call(this);
   this.defineMethod("new", new GArc_new());
   this.defineMethod("setFilled", new GArc_setFilled());
   this.defineMethod("setFillColor", new GArc_setFillColor());
   this.defineMethod("isFilled", new GArc_isFilled());
   this.defineMethod("setStartAngle", new GArc_setStartAngle());
   this.defineMethod("setSweepAngle", new GArc_setSweepAngle());
   this.defineMethod("getStartAngle", new GArc_getStartAngle());
   this.defineMethod("getSweepAngle", new GArc_getSweepAngle());
   this.defineMethod("getStartPoint", new GArc_getStartPoint());
   this.defineMethod("getEndPoint", new GArc_getEndPoint());
};

SJSGArcClass.prototype = 
   jslib.inheritPrototype(SJSGObjectClass, "SJSGArcClass extends SJSGObjectClass");
SJSGArcClass.prototype.constructor = SJSGArcClass;
SJSGArcClass.prototype.$class = 
   new Class("SJSGArcClass", SJSGArcClass);

var GArc_new = function() {
   SVMMethod.call(this);
};

GArc_new.prototype =
   jslib.inheritPrototype(SVMMethod, "GArc_new extends SVMMethod");
GArc_new.prototype.constructor = GArc_new;
GArc_new.prototype.$class = 
   new Class("GArc_new", GArc_new);

GArc_new.prototype.execute = function(svm, receiver) {
   if (svm.getArgumentCount() === 4) {
      svm.checkSignature("GArc.new", "DDDD");
      var sweep = svm.popDouble();
      var start = svm.popDouble();
      var height = svm.popDouble();
      var width = svm.popDouble();
      var arc = new GArc(0, 0, width, height, start, sweep);
      svm.push(Value.createObject(arc, "GArc"));
   } else {
      svm.checkSignature("GArc.new", "DDDDDD");
      var sweep = svm.popDouble();
      var start = svm.popDouble();
      var height = svm.popDouble();
      var width = svm.popDouble();
      var y = svm.popDouble();
      var x = svm.popDouble();
      var arc = new GArc(x, y, width, height, start, sweep);
      svm.push(Value.createObject(arc, "GArc"));
   }
};

var GArcMethod = function() {
   SVMMethod.call(this);
};

GArcMethod.prototype =
   jslib.inheritPrototype(SVMMethod, "GArcMethod extends SVMMethod");
GArcMethod.prototype.constructor = GArcMethod;
GArcMethod.prototype.$class = 
   new Class("GArcMethod", GArcMethod);

GArcMethod.prototype.getGArc = function(svm, receiver) {
   if (receiver === null) {
      return svm.pop().getValue();
   } else {
      return receiver.getValue();
   }
};

var GArc_setFilled = function() {
   GArcMethod.call(this);
};

GArc_setFilled.prototype =
   jslib.inheritPrototype(GArcMethod, "GArc_setFilled extends GArcMethod");
GArc_setFilled.prototype.constructor = GArc_setFilled;
GArc_setFilled.prototype.$class = 
   new Class("GArc_setFilled", GArc_setFilled);

GArc_setFilled.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GArc.setFilled", "B");
   var flag = svm.popBoolean();
   this.getGArc(svm, receiver).setFilled(flag);
};

var GArc_isFilled = function() {
   GArcMethod.call(this);
};

GArc_isFilled.prototype =
   jslib.inheritPrototype(GArcMethod, "GArc_isFilled extends GArcMethod");
GArc_isFilled.prototype.constructor = GArc_isFilled;
GArc_isFilled.prototype.$class = 
   new Class("GArc_isFilled", GArc_isFilled);

GArc_isFilled.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GArc.isFilled", "");
   svm.pushBoolean(this.getGArc(svm, receiver).isFilled());
};

var GArc_setFillColor = function() {
   GArcMethod.call(this);
};

GArc_setFillColor.prototype =
   jslib.inheritPrototype(GArcMethod, "GArc_setFillColor extends GArcMethod");
GArc_setFillColor.prototype.constructor = GArc_setFillColor;
GArc_setFillColor.prototype.$class = 
   new Class("GArc_setFillColor", GArc_setFillColor);

GArc_setFillColor.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GArc.setFillColor", "O");
   var color = svm.pop().getValue();
   this.getGArc(svm, receiver).setFillColor(color);
};

var GArc_getEndPoint = function() {
   GArcMethod.call(this);
};

GArc_getEndPoint.prototype =
   jslib.inheritPrototype(GArcMethod, "GArc_getEndPoint extends GArcMethod");
GArc_getEndPoint.prototype.constructor = GArc_getEndPoint;
GArc_getEndPoint.prototype.$class = 
   new Class("GArc_getEndPoint", GArc_getEndPoint);

GArc_getEndPoint.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GArc.getEndPoint", "");
   var pt = this.getGArc(svm, receiver).getEndPoint();
   svm.push(Value.createObject(pt, "GPoint"));
};

var GArc_getStartPoint = function() {
   GArcMethod.call(this);
};

GArc_getStartPoint.prototype =
   jslib.inheritPrototype(GArcMethod, "GArc_getStartPoint extends GArcMethod");
GArc_getStartPoint.prototype.constructor = GArc_getStartPoint;
GArc_getStartPoint.prototype.$class = 
   new Class("GArc_getStartPoint", GArc_getStartPoint);

GArc_getStartPoint.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GArc.getStartPoint", "");
   var pt = this.getGArc(svm, receiver).getStartPoint();
   svm.push(Value.createObject(pt, "GPoint"));
};

var GArc_getStartAngle = function() {
   GArcMethod.call(this);
};

GArc_getStartAngle.prototype =
   jslib.inheritPrototype(GArcMethod, "GArc_getStartAngle extends GArcMethod");
GArc_getStartAngle.prototype.constructor = GArc_getStartAngle;
GArc_getStartAngle.prototype.$class = 
   new Class("GArc_getStartAngle", GArc_getStartAngle);

GArc_getStartAngle.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GArc.getStartAngle", "");
   svm.pushDouble(this.getGArc(svm, receiver).getStartAngle());
};

var GArc_getSweepAngle = function() {
   GArcMethod.call(this);
};

GArc_getSweepAngle.prototype =
   jslib.inheritPrototype(GArcMethod, "GArc_getSweepAngle extends GArcMethod");
GArc_getSweepAngle.prototype.constructor = GArc_getSweepAngle;
GArc_getSweepAngle.prototype.$class = 
   new Class("GArc_getSweepAngle", GArc_getSweepAngle);

GArc_getSweepAngle.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GArc.getSweepAngle", "");
   svm.pushDouble(this.getGArc(svm, receiver).getSweepAngle());
};

var GArc_setStartAngle = function() {
   GArcMethod.call(this);
};

GArc_setStartAngle.prototype =
   jslib.inheritPrototype(GArcMethod, "GArc_setStartAngle extends GArcMethod");
GArc_setStartAngle.prototype.constructor = GArc_setStartAngle;
GArc_setStartAngle.prototype.$class = 
   new Class("GArc_setStartAngle", GArc_setStartAngle);

GArc_setStartAngle.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GArc.setStartAngle", "D");
   var angle = svm.popDouble();
   this.getGArc(svm, receiver).setStartAngle(angle);
};

var GArc_setSweepAngle = function() {
   GArcMethod.call(this);
};

GArc_setSweepAngle.prototype =
   jslib.inheritPrototype(GArcMethod, "GArc_setSweepAngle extends GArcMethod");
GArc_setSweepAngle.prototype.constructor = GArc_setSweepAngle;
GArc_setSweepAngle.prototype.$class = 
   new Class("GArc_setSweepAngle", GArc_setSweepAngle);

GArc_setSweepAngle.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GArc.setSweepAngle", "D");
   var angle = svm.popDouble();
   this.getGArc(svm, receiver).setSweepAngle(angle);
};


/* SJSGCanvas.js */

var SJSGCanvas = function(svm) {
   GCanvas.call(this);
   this.svm = svm;
   this.hasMouseListener = false;
   this.hasMouseMotionListener = false;
   this.state = SJSGCanvas.NORMAL;
   this.setAutoRepaintFlag(false);
};

SJSGCanvas.prototype = 
   jslib.inheritPrototype(GCanvas, "SJSGCanvas extends GCanvas");
SJSGCanvas.prototype.constructor = SJSGCanvas;
SJSGCanvas.prototype.$class = 
   new Class("SJSGCanvas", SJSGCanvas);

SJSGCanvas.prototype.setState = function(state) {
   this.state = state;
};

SJSGCanvas.prototype.enableKeyListener = function() {
   if (!this.hasKeyListener) {
      this.addKeyListener(this);
      this.hasKeyListener = true;
   }
};

SJSGCanvas.prototype.enableMouseListener = function() {
   if (!this.hasMouseListener) {
      this.addMouseListener(this);
      this.hasMouseListener = true;
   }
};

SJSGCanvas.prototype.enableMouseMotionListener = function() {
   if (!this.hasMouseMotionListener) {
      this.addMouseMotionListener(this);
      this.hasMouseMotionListener = true;
   }
};

SJSGCanvas.prototype.actionPerformed = function(e) {
   if (this.state === SJSGCanvas.WAITING_FOR_EVENT) {
      this.state = SJSGCanvas.NORMAL;
      this.svm.push(Value.createObject(e, "ActionEvent"));
      this.svm.run();
      this.repaint();
   }
};

SJSGCanvas.prototype.keyPressed = function(e) {
   this.fireKeyEvent(e);
};

SJSGCanvas.prototype.keyReleased = function(e) {
   this.fireKeyEvent(e);
};

SJSGCanvas.prototype.keyTyped = function(e) {
   this.fireKeyEvent(e);
};

SJSGCanvas.prototype.mouseClicked = function(e) {
   if (this.state === SJSGCanvas.WAITING_FOR_CLICK) {
      this.state = SJSGCanvas.NORMAL;
      this.svm.run();
      this.repaint();
   } else {
      this.fireMouseEvent(e);
   }
};

SJSGCanvas.prototype.mouseEntered = function(e) {
   /* Empty */
};

SJSGCanvas.prototype.mouseExited = function(e) {
   /* Empty */
};

SJSGCanvas.prototype.mousePressed = function(e) {
   this.fireMouseEvent(e);
};

SJSGCanvas.prototype.mouseReleased = function(e) {
   this.fireMouseEvent(e);
};

SJSGCanvas.prototype.mouseMoved = function(e) {
   this.fireMouseEvent(e);
};

SJSGCanvas.prototype.mouseDragged = function(e) {
   this.fireMouseEvent(e);
};

SJSGCanvas.prototype.fireMouseEvent = function(e) {
   if (this.state === SJSGCanvas.WAITING_FOR_EVENT) {
      this.state = SJSGCanvas.NORMAL;
      this.svm.push(Value.createObject(e, "MouseEvent"));
      this.svm.run();
      this.repaint();
   }
};

SJSGCanvas.prototype.fireKeyEvent = function(e) {
   if (this.state === SJSGCanvas.WAITING_FOR_EVENT) {
      this.state = SJSGCanvas.NORMAL;
      this.svm.push(Value.createObject(e, "KeyEvent"));
      this.svm.run();
      this.repaint();
   }
};

SJSGCanvas.NORMAL = 0;
SJSGCanvas.WAITING_FOR_CLICK = 1;
SJSGCanvas.WAITING_FOR_EVENT = 2;

/* SJSGCompoundClass.js */

var SJSGCompoundClass = function() {
   SJSGObjectClass.call(this);
   this.defineMethod("new", new GCompound_new());
   this.defineMethod("add", new GCompound_add());
   this.defineMethod("remove", new GCompound_remove());
};

SJSGCompoundClass.prototype = 
   jslib.inheritPrototype(SJSGObjectClass, "SJSGCompoundClass extends SJSGObjectClass");
SJSGCompoundClass.prototype.constructor = SJSGCompoundClass;
SJSGCompoundClass.prototype.$class = 
   new Class("SJSGCompoundClass", SJSGCompoundClass);

var GCompound_new = function() {
   SVMMethod.call(this);
};

GCompound_new.prototype =
   jslib.inheritPrototype(SVMMethod, "GCompound_new extends SVMMethod");
GCompound_new.prototype.constructor = GCompound_new;
GCompound_new.prototype.$class = 
   new Class("GCompound_new", GCompound_new);

GCompound_new.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GCompound.new", "");
   svm.push(Value.createObject(new GCompound(), "GCompound"));
};

var GCompoundMethod = function() {
   SVMMethod.call(this);
};

GCompoundMethod.prototype =
   jslib.inheritPrototype(SVMMethod, "GCompoundMethod extends SVMMethod");
GCompoundMethod.prototype.constructor = GCompoundMethod;
GCompoundMethod.prototype.$class = 
   new Class("GCompoundMethod", GCompoundMethod);

GCompoundMethod.prototype.getGCompound = function(svm, receiver) {
   if (receiver === null) {
      return svm.pop().getValue();
   } else {
      return receiver.getValue();
   }
};

var GCompound_add = function() {
   GCompoundMethod.call(this);
};

GCompound_add.prototype =
   jslib.inheritPrototype(GCompoundMethod, "GCompound_add extends GCompoundMethod");
GCompound_add.prototype.constructor = GCompound_add;
GCompound_add.prototype.$class = 
   new Class("GCompound_add", GCompound_add);

GCompound_add.prototype.execute = function(svm, receiver) {
   if (svm.getArgumentCount() === 3) {
      svm.checkSignature("GCompound.add", "ODD");
      var y = svm.popDouble();
      var x = svm.popDouble();
      var gobj = svm.pop().getValue();
      this.getGCompound(svm, receiver).add(gobj, x, y);
   } else {
      svm.checkSignature("GCompound.add", "O");
      var gobj = svm.pop().getValue();
      this.getGCompound(svm, receiver).add(gobj);
   }
};

var GCompound_remove = function() {
   GCompoundMethod.call(this);
};

GCompound_remove.prototype =
   jslib.inheritPrototype(GCompoundMethod, "GCompound_remove extends GCompoundMethod");
GCompound_remove.prototype.constructor = GCompound_remove;
GCompound_remove.prototype.$class = 
   new Class("GCompound_remove", GCompound_remove);

GCompound_remove.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GCompound.remove", "O");
   var gobj = svm.pop().getValue();
   this.getGCompound(svm, receiver).remove(gobj);
};


/* SJSGDimensionClass.js */

var SJSGDimensionClass = function() {
   SVMClass.call(this);
   this.defineMethod("new", new GDimension_new());
   this.defineMethod("getWidth", new GDimension_getWidth());
   this.defineMethod("getHeight", new GDimension_getHeight());
};

SJSGDimensionClass.prototype = 
   jslib.inheritPrototype(SVMClass, "SJSGDimensionClass extends SVMClass");
SJSGDimensionClass.prototype.constructor = SJSGDimensionClass;
SJSGDimensionClass.prototype.$class = 
   new Class("SJSGDimensionClass", SJSGDimensionClass);

var GDimension_new = function() {
   SVMMethod.call(this);
};

GDimension_new.prototype =
   jslib.inheritPrototype(SVMMethod, "GDimension_new extends SVMMethod");
GDimension_new.prototype.constructor = GDimension_new;
GDimension_new.prototype.$class = 
   new Class("GDimension_new", GDimension_new);

GDimension_new.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GDimension.new", "DD");
   var height = svm.popDouble();
   var width = svm.popDouble();
   var size = new GDimension(width, height);
   svm.push(Value.createObject(size, "GDimension"));
};

var GDimension_getWidth = function() {
   SVMMethod.call(this);
};

GDimension_getWidth.prototype =
   jslib.inheritPrototype(SVMMethod, "GDimension_getWidth extends SVMMethod");
GDimension_getWidth.prototype.constructor = GDimension_getWidth;
GDimension_getWidth.prototype.$class = 
   new Class("GDimension_getWidth", GDimension_getWidth);

GDimension_getWidth.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GDimension.getWidth", "");
   var r = svm.pop().getValue();
   svm.pushDouble(r.getWidth());
};

var GDimension_getHeight = function() {
   SVMMethod.call(this);
};

GDimension_getHeight.prototype =
   jslib.inheritPrototype(SVMMethod, "GDimension_getHeight extends SVMMethod");
GDimension_getHeight.prototype.constructor = GDimension_getHeight;
GDimension_getHeight.prototype.$class = 
   new Class("GDimension_getHeight", GDimension_getHeight);

GDimension_getHeight.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GDimension.getHeight", "");
   var r = svm.pop().getValue();
   svm.pushDouble(r.getHeight());
};


/* SJSGImageClass.js */

var SJSGImageClass = function() {
   SJSGObjectClass.call(this);
   this.defineMethod("new", new GImage_new());
   this.defineMethod("getPixelArray", new GImage_getPixelArray());
};

SJSGImageClass.prototype = 
   jslib.inheritPrototype(SJSGObjectClass, "SJSGImageClass extends SJSGObjectClass");
SJSGImageClass.prototype.constructor = SJSGImageClass;
SJSGImageClass.prototype.$class = 
   new Class("SJSGImageClass", SJSGImageClass);

var GImage_new = function() {
   SVMMethod.call(this);
};

GImage_new.prototype =
   jslib.inheritPrototype(SVMMethod, "GImage_new extends SVMMethod");
GImage_new.prototype.constructor = GImage_new;
GImage_new.prototype.$class = 
   new Class("GImage_new", GImage_new);

GImage_new.prototype.execute = function(svm, receiver) {
   var x = 0;
   var y = 0;
   if (svm.getArgumentCount() === 3) {
      svm.checkSignature("GImage.new", "SDD");
      y = svm.popDouble();
      x = svm.popDouble();
   } else {
      svm.checkSignature("GImage.new", "*");
   }
   var v = svm.pop();
   if (v.getType() === Value.STRING) {
      var url = v.getStringValue();
      var image = new JSImage(url);
      svm.push(Value.createObject(new GImage(image, x, y), "GImage"));
   } else {
      if (v.getValue() instanceof SVMArray) {
         var array = v.getValue();
         var height = array.size();
         var width = (array.get(0).getValue()).size();
         var pixels = JSImage.createPixelArray(height, width);
         for (var i = 0; i < height; i++) {
            var row = array.get(i).getValue();
            for (var j = 0; j < height; j++) {
               pixels[i][j] = row.get(j).getIntegerValue();
            }
         }
         svm.push(Value.createObject(new GImage(pixels), "GImage"));
      } else {
         throw new RuntimeException("Illegal type in GImage constructor");
      }
   }
};

var GImageMethod = function() {
   SVMMethod.call(this);
};

GImageMethod.prototype =
   jslib.inheritPrototype(SVMMethod, "GImageMethod extends SVMMethod");
GImageMethod.prototype.constructor = GImageMethod;
GImageMethod.prototype.$class = 
   new Class("GImageMethod", GImageMethod);

GImageMethod.prototype.getGImage = function(svm, receiver) {
   if (receiver === null) {
      return svm.pop().getValue();
   } else {
      return receiver.getValue();
   }
};

var GImage_getPixelArray = function() {
   GImageMethod.call(this);
};

GImage_getPixelArray.prototype =
   jslib.inheritPrototype(GImageMethod, "GImage_getPixelArray extends GImageMethod");
GImage_getPixelArray.prototype.constructor = GImage_getPixelArray;
GImage_getPixelArray.prototype.$class = 
   new Class("GImage_getPixelArray", GImage_getPixelArray);

GImage_getPixelArray.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GImage.getPixelArray", "");
   var pixels = this.getGImage(svm, receiver).getPixelArray();
   var height = pixels.length;
   var width = pixels[0].length;
   var array = new SVMArray();
   for (var i = 0; i < height; i++) {
      var row = new SVMArray();
      for (var j = 0; j < width; j++) {
         row.add(Value.createInteger(pixels[i][j]));
      }
      array.add(Value.createObject(row, "Array"));
   }
   svm.push(Value.createObject(array, "Array"));
};


/* SJSGLabelClass.js */

var SJSGLabelClass = function() {
   SJSGObjectClass.call(this);
   this.defineMethod("new", new GLabel_new());
   this.defineMethod("setLabel", new GLabel_setLabel());
   this.defineMethod("setFont", new GLabel_setFont());
   this.defineMethod("getAscent", new GLabel_getAscent());
   this.defineMethod("getDescent", new GLabel_getDescent());
};

SJSGLabelClass.prototype = 
   jslib.inheritPrototype(SJSGObjectClass, "SJSGLabelClass extends SJSGObjectClass");
SJSGLabelClass.prototype.constructor = SJSGLabelClass;
SJSGLabelClass.prototype.$class = 
   new Class("SJSGLabelClass", SJSGLabelClass);

var GLabel_new = function() {
   SVMMethod.call(this);
};

GLabel_new.prototype =
   jslib.inheritPrototype(SVMMethod, "GLabel_new extends SVMMethod");
GLabel_new.prototype.constructor = GLabel_new;
GLabel_new.prototype.$class = 
   new Class("GLabel_new", GLabel_new);

GLabel_new.prototype.execute = function(svm, receiver) {
   if (svm.getArgumentCount() === 3) {
      svm.checkSignature("GLabel.new", "SDD");
      var y = svm.popDouble();
      var x = svm.popDouble();
      var str = svm.popString();
      svm.push(Value.createObject(new GLabel(str, x, y), "GLabel"));
   } else {
      svm.checkSignature("GLabel.new", "S");
      var str = svm.popString();
      svm.push(Value.createObject(new GLabel(str), "GLabel"));
   }
};

var GLabelMethod = function() {
   SVMMethod.call(this);
};

GLabelMethod.prototype =
   jslib.inheritPrototype(SVMMethod, "GLabelMethod extends SVMMethod");
GLabelMethod.prototype.constructor = GLabelMethod;
GLabelMethod.prototype.$class = 
   new Class("GLabelMethod", GLabelMethod);

GLabelMethod.prototype.getGLabel = function(svm, receiver) {
   if (receiver === null) {
      return svm.pop().getValue();
   } else {
      return receiver.getValue();
   }
};

var GLabel_setLabel = function() {
   GLabelMethod.call(this);
};

GLabel_setLabel.prototype =
   jslib.inheritPrototype(GLabelMethod, "GLabel_setLabel extends GLabelMethod");
GLabel_setLabel.prototype.constructor = GLabel_setLabel;
GLabel_setLabel.prototype.$class = 
   new Class("GLabel_setLabel", GLabel_setLabel);

GLabel_setLabel.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GLabel.setLabel", "S");
   var str = svm.popString();
   this.getGLabel(svm, receiver).setLabel(str);
};

var GLabel_setFont = function() {
   GLabelMethod.call(this);
};

GLabel_setFont.prototype =
   jslib.inheritPrototype(GLabelMethod, "GLabel_setFont extends GLabelMethod");
GLabel_setFont.prototype.constructor = GLabel_setFont;
GLabel_setFont.prototype.$class = 
   new Class("GLabel_setFont", GLabel_setFont);

GLabel_setFont.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GLabel.setFont", "S");
   var str = svm.popString();
   this.getGLabel(svm, receiver).setFont(str);
};

var GLabel_getAscent = function() {
   GLabelMethod.call(this);
};

GLabel_getAscent.prototype =
   jslib.inheritPrototype(GLabelMethod, "GLabel_getAscent extends GLabelMethod");
GLabel_getAscent.prototype.constructor = GLabel_getAscent;
GLabel_getAscent.prototype.$class = 
   new Class("GLabel_getAscent", GLabel_getAscent);

GLabel_getAscent.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GLabel.getAscent", "");
   svm.pushDouble(this.getGLabel(svm, receiver).getAscent());
};

var GLabel_getDescent = function() {
   GLabelMethod.call(this);
};

GLabel_getDescent.prototype =
   jslib.inheritPrototype(GLabelMethod, "GLabel_getDescent extends GLabelMethod");
GLabel_getDescent.prototype.constructor = GLabel_getDescent;
GLabel_getDescent.prototype.$class = 
   new Class("GLabel_getDescent", GLabel_getDescent);

GLabel_getDescent.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GLabel.getDescent", "");
   svm.pushDouble(this.getGLabel(svm, receiver).getDescent());
};


/* SJSGLineClass.js */

var SJSGLineClass = function() {
   SJSGObjectClass.call(this);
   this.defineMethod("new", new GLine_new());
   this.defineMethod("getEndPoint", new GLine_getEndPoint());
   this.defineMethod("getStartPoint", new GLine_getStartPoint());
   this.defineMethod("setEndPoint", new GLine_setEndPoint());
   this.defineMethod("setStartPoint", new GLine_setStartPoint());
};

SJSGLineClass.prototype = 
   jslib.inheritPrototype(SJSGObjectClass, "SJSGLineClass extends SJSGObjectClass");
SJSGLineClass.prototype.constructor = SJSGLineClass;
SJSGLineClass.prototype.$class = 
   new Class("SJSGLineClass", SJSGLineClass);

var GLine_new = function() {
   SVMMethod.call(this);
};

GLine_new.prototype =
   jslib.inheritPrototype(SVMMethod, "GLine_new extends SVMMethod");
GLine_new.prototype.constructor = GLine_new;
GLine_new.prototype.$class = 
   new Class("GLine_new", GLine_new);

GLine_new.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GLine.new", "DDDD");
   var y2 = svm.popDouble();
   var x2 = svm.popDouble();
   var y1 = svm.popDouble();
   var x1 = svm.popDouble();
   svm.push(Value.createObject(new GLine(x1, y1, x2, y2), "GLine"));
};

var GLineMethod = function() {
   SVMMethod.call(this);
};

GLineMethod.prototype =
   jslib.inheritPrototype(SVMMethod, "GLineMethod extends SVMMethod");
GLineMethod.prototype.constructor = GLineMethod;
GLineMethod.prototype.$class = 
   new Class("GLineMethod", GLineMethod);

GLineMethod.prototype.getGLine = function(svm, receiver) {
   if (receiver === null) {
      return svm.pop().getValue();
   } else {
      return receiver.getValue();
   }
};

var GLine_setEndPoint = function() {
   GLineMethod.call(this);
};

GLine_setEndPoint.prototype =
   jslib.inheritPrototype(GLineMethod, "GLine_setEndPoint extends GLineMethod");
GLine_setEndPoint.prototype.constructor = GLine_setEndPoint;
GLine_setEndPoint.prototype.$class = 
   new Class("GLine_setEndPoint", GLine_setEndPoint);

GLine_setEndPoint.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GLine.setEndPoint", "DD");
   var y = svm.popDouble();
   var x = svm.popDouble();
   this.getGLine(svm, receiver).setEndPoint(x, y);
};

var GLine_getEndPoint = function() {
   GLineMethod.call(this);
};

GLine_getEndPoint.prototype =
   jslib.inheritPrototype(GLineMethod, "GLine_getEndPoint extends GLineMethod");
GLine_getEndPoint.prototype.constructor = GLine_getEndPoint;
GLine_getEndPoint.prototype.$class = 
   new Class("GLine_getEndPoint", GLine_getEndPoint);

GLine_getEndPoint.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GLine.getEndPoint", "");
   var pt = this.getGLine(svm, receiver).getEndPoint();
   svm.push(Value.createObject(pt, "GPoint"));
};

var GLine_setStartPoint = function() {
   GLineMethod.call(this);
};

GLine_setStartPoint.prototype =
   jslib.inheritPrototype(GLineMethod, "GLine_setStartPoint extends GLineMethod");
GLine_setStartPoint.prototype.constructor = GLine_setStartPoint;
GLine_setStartPoint.prototype.$class = 
   new Class("GLine_setStartPoint", GLine_setStartPoint);

GLine_setStartPoint.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GLine.setStartPoint", "DD");
   var y = svm.popDouble();
   var x = svm.popDouble();
   this.getGLine(svm, receiver).setStartPoint(x, y);
};

var GLine_getStartPoint = function() {
   GLineMethod.call(this);
};

GLine_getStartPoint.prototype =
   jslib.inheritPrototype(GLineMethod, "GLine_getStartPoint extends GLineMethod");
GLine_getStartPoint.prototype.constructor = GLine_getStartPoint;
GLine_getStartPoint.prototype.$class = 
   new Class("GLine_getStartPoint", GLine_getStartPoint);

GLine_getStartPoint.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GLine.getStartPoint", "");
   var pt = this.getGLine(svm, receiver).getStartPoint();
   svm.push(Value.createObject(pt, "GPoint"));
};


/* SJSGOvalClass.js */

var SJSGOvalClass = function() {
   SJSGObjectClass.call(this);
   this.defineMethod("new", new GOval_new());
   this.defineMethod("setFilled", new GOval_setFilled());
   this.defineMethod("setFillColor", new GOval_setFillColor());
   this.defineMethod("isFilled", new GOval_isFilled());
};

SJSGOvalClass.prototype = 
   jslib.inheritPrototype(SJSGObjectClass, "SJSGOvalClass extends SJSGObjectClass");
SJSGOvalClass.prototype.constructor = SJSGOvalClass;
SJSGOvalClass.prototype.$class = 
   new Class("SJSGOvalClass", SJSGOvalClass);

var GOval_new = function() {
   SVMMethod.call(this);
};

GOval_new.prototype =
   jslib.inheritPrototype(SVMMethod, "GOval_new extends SVMMethod");
GOval_new.prototype.constructor = GOval_new;
GOval_new.prototype.$class = 
   new Class("GOval_new", GOval_new);

GOval_new.prototype.execute = function(svm, receiver) {
   if (svm.getArgumentCount() === 2) {
      svm.checkSignature("GOval.new", "DD");
      var height = svm.popDouble();
      var width = svm.popDouble();
      svm.push(Value.createObject(new GOval(0, 0, width, height), "GOval"));
   } else {
      svm.checkSignature("GOval.new", "DDDD");
      var height = svm.popDouble();
      var width = svm.popDouble();
      var y = svm.popDouble();
      var x = svm.popDouble();
      svm.push(Value.createObject(new GOval(x, y, width, height), "GOval"));
   }
};

var GOvalMethod = function() {
   SVMMethod.call(this);
};

GOvalMethod.prototype =
   jslib.inheritPrototype(SVMMethod, "GOvalMethod extends SVMMethod");
GOvalMethod.prototype.constructor = GOvalMethod;
GOvalMethod.prototype.$class = 
   new Class("GOvalMethod", GOvalMethod);

GOvalMethod.prototype.getGOval = function(svm, receiver) {
   if (receiver === null) {
      return svm.pop().getValue();
   } else {
      return receiver.getValue();
   }
};

var GOval_setFilled = function() {
   GOvalMethod.call(this);
};

GOval_setFilled.prototype =
   jslib.inheritPrototype(GOvalMethod, "GOval_setFilled extends GOvalMethod");
GOval_setFilled.prototype.constructor = GOval_setFilled;
GOval_setFilled.prototype.$class = 
   new Class("GOval_setFilled", GOval_setFilled);

GOval_setFilled.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GOval.setFilled", "B");
   var flag = svm.popBoolean();
   this.getGOval(svm, receiver).setFilled(flag);
};

var GOval_isFilled = function() {
   GOvalMethod.call(this);
};

GOval_isFilled.prototype =
   jslib.inheritPrototype(GOvalMethod, "GOval_isFilled extends GOvalMethod");
GOval_isFilled.prototype.constructor = GOval_isFilled;
GOval_isFilled.prototype.$class = 
   new Class("GOval_isFilled", GOval_isFilled);

GOval_isFilled.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GOval.isFilled", "");
   svm.pushBoolean(this.getGOval(svm, receiver).isFilled());
};

var GOval_setFillColor = function() {
   GOvalMethod.call(this);
};

GOval_setFillColor.prototype =
   jslib.inheritPrototype(GOvalMethod, "GOval_setFillColor extends GOvalMethod");
GOval_setFillColor.prototype.constructor = GOval_setFillColor;
GOval_setFillColor.prototype.$class = 
   new Class("GOval_setFillColor", GOval_setFillColor);

GOval_setFillColor.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GOval.setFillColor", "O");
   var color = svm.pop().getValue();
   this.getGOval(svm, receiver).setFillColor(color);
};


/* SJSGPointClass.js */

var SJSGPointClass = function() {
   SVMClass.call(this);
   this.defineMethod("new", new GPoint_new());
   this.defineMethod("getX", new GPoint_getX());
   this.defineMethod("getY", new GPoint_getY());
};

SJSGPointClass.prototype = 
   jslib.inheritPrototype(SVMClass, "SJSGPointClass extends SVMClass");
SJSGPointClass.prototype.constructor = SJSGPointClass;
SJSGPointClass.prototype.$class = 
   new Class("SJSGPointClass", SJSGPointClass);

var GPoint_new = function() {
   SVMMethod.call(this);
};

GPoint_new.prototype =
   jslib.inheritPrototype(SVMMethod, "GPoint_new extends SVMMethod");
GPoint_new.prototype.constructor = GPoint_new;
GPoint_new.prototype.$class = 
   new Class("GPoint_new", GPoint_new);

GPoint_new.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GPoint.new", "DD");
   var y = svm.popDouble();
   var x = svm.popDouble();
   svm.push(Value.createObject(new GPoint(x, y), "GPoint"));
};

var GPointMethod = function() {
   SVMMethod.call(this);
};

GPointMethod.prototype =
   jslib.inheritPrototype(SVMMethod, "GPointMethod extends SVMMethod");
GPointMethod.prototype.constructor = GPointMethod;
GPointMethod.prototype.$class = 
   new Class("GPointMethod", GPointMethod);

GPointMethod.prototype.getGPoint = function(svm, receiver) {
   if (receiver === null) {
      return svm.pop().getValue();
   } else {
      return receiver.getValue();
   }
};

var GPoint_getX = function() {
   GPointMethod.call(this);
};

GPoint_getX.prototype =
   jslib.inheritPrototype(GPointMethod, "GPoint_getX extends GPointMethod");
GPoint_getX.prototype.constructor = GPoint_getX;
GPoint_getX.prototype.$class = 
   new Class("GPoint_getX", GPoint_getX);

GPoint_getX.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GPoint.getX", "");
   svm.pushDouble(this.getGPoint(svm, receiver).getX());
};

var GPoint_getY = function() {
   GPointMethod.call(this);
};

GPoint_getY.prototype =
   jslib.inheritPrototype(GPointMethod, "GPoint_getY extends GPointMethod");
GPoint_getY.prototype.constructor = GPoint_getY;
GPoint_getY.prototype.$class = 
   new Class("GPoint_getY", GPoint_getY);

GPoint_getY.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GPoint.getY", "");
   svm.pushDouble(this.getGPoint(svm, receiver).getY());
};


/* SJSGPolygonClass.js */

var SJSGPolygonClass = function() {
   SJSGObjectClass.call(this);
   this.defineMethod("new", new GPolygon_new());
   this.defineMethod("addVertex", new GPolygon_addVertex());
   this.defineMethod("addEdge", new GPolygon_addEdge());
   this.defineMethod("addPolarEdge", new GPolygon_addPolarEdge());
   this.defineMethod("setFilled", new GPolygon_setFilled());
   this.defineMethod("setFillColor", new GPolygon_setFillColor());
   this.defineMethod("isFilled", new GPolygon_isFilled());
};

SJSGPolygonClass.prototype = 
   jslib.inheritPrototype(SJSGObjectClass, "SJSGPolygonClass extends SJSGObjectClass");
SJSGPolygonClass.prototype.constructor = SJSGPolygonClass;
SJSGPolygonClass.prototype.$class = 
   new Class("SJSGPolygonClass", SJSGPolygonClass);

var GPolygon_new = function() {
   SVMMethod.call(this);
};

GPolygon_new.prototype =
   jslib.inheritPrototype(SVMMethod, "GPolygon_new extends SVMMethod");
GPolygon_new.prototype.constructor = GPolygon_new;
GPolygon_new.prototype.$class = 
   new Class("GPolygon_new", GPolygon_new);

GPolygon_new.prototype.execute = function(svm, receiver) {
   if (svm.getArgumentCount() === 2) {
      svm.checkSignature("GPolygon.new", "DD");
      var y = svm.popDouble();
      var x = svm.popDouble();
      svm.push(Value.createObject(new GPolygon(x, y), "GPolygon"));
   } else {
      svm.checkSignature("GPolygon.new", "");
      svm.push(Value.createObject(new GPolygon(), "GPolygon"));
   }
};

var GPolygonMethod = function() {
   SVMMethod.call(this);
};

GPolygonMethod.prototype =
   jslib.inheritPrototype(SVMMethod, "GPolygonMethod extends SVMMethod");
GPolygonMethod.prototype.constructor = GPolygonMethod;
GPolygonMethod.prototype.$class = 
   new Class("GPolygonMethod", GPolygonMethod);

GPolygonMethod.prototype.getGPolygon = function(svm, receiver) {
   if (receiver === null) {
      return svm.pop().getValue();
   } else {
      return receiver.getValue();
   }
};

var GPolygon_addVertex = function() {
   GPolygonMethod.call(this);
};

GPolygon_addVertex.prototype =
   jslib.inheritPrototype(GPolygonMethod, "GPolygon_addVertex extends GPolygonMethod");
GPolygon_addVertex.prototype.constructor = GPolygon_addVertex;
GPolygon_addVertex.prototype.$class = 
   new Class("GPolygon_addVertex", GPolygon_addVertex);

GPolygon_addVertex.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GPolygon.addVertex", "DD");
   var y = svm.popDouble();
   var x = svm.popDouble();
   this.getGPolygon(svm, receiver).addVertex(x, y);
};

var GPolygon_addEdge = function() {
   GPolygonMethod.call(this);
};

GPolygon_addEdge.prototype =
   jslib.inheritPrototype(GPolygonMethod, "GPolygon_addEdge extends GPolygonMethod");
GPolygon_addEdge.prototype.constructor = GPolygon_addEdge;
GPolygon_addEdge.prototype.$class = 
   new Class("GPolygon_addEdge", GPolygon_addEdge);

GPolygon_addEdge.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GPolygon.addEdge", "DD");
   var dy = svm.popDouble();
   var dx = svm.popDouble();
   this.getGPolygon(svm, receiver).addEdge(dx, dy);
};

var GPolygon_addPolarEdge = function() {
   GPolygonMethod.call(this);
};

GPolygon_addPolarEdge.prototype =
   jslib.inheritPrototype(GPolygonMethod, "GPolygon_addPolarEdge extends GPolygonMethod");
GPolygon_addPolarEdge.prototype.constructor = GPolygon_addPolarEdge;
GPolygon_addPolarEdge.prototype.$class = 
   new Class("GPolygon_addPolarEdge", GPolygon_addPolarEdge);

GPolygon_addPolarEdge.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GPolygon.addPolarEdge", "DD");
   var theta = svm.popDouble();
   var r = svm.popDouble();
   this.getGPolygon(svm, receiver).addPolarEdge(r, theta);
};

var GPolygon_setFilled = function() {
   GPolygonMethod.call(this);
};

GPolygon_setFilled.prototype =
   jslib.inheritPrototype(GPolygonMethod, "GPolygon_setFilled extends GPolygonMethod");
GPolygon_setFilled.prototype.constructor = GPolygon_setFilled;
GPolygon_setFilled.prototype.$class = 
   new Class("GPolygon_setFilled", GPolygon_setFilled);

GPolygon_setFilled.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GPolygon.setFilled", "B");
   var flag = svm.popBoolean();
   this.getGPolygon(svm, receiver).setFilled(flag);
};

var GPolygon_isFilled = function() {
   GPolygonMethod.call(this);
};

GPolygon_isFilled.prototype =
   jslib.inheritPrototype(GPolygonMethod, "GPolygon_isFilled extends GPolygonMethod");
GPolygon_isFilled.prototype.constructor = GPolygon_isFilled;
GPolygon_isFilled.prototype.$class = 
   new Class("GPolygon_isFilled", GPolygon_isFilled);

GPolygon_isFilled.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GPolygon.isFilled", "");
   svm.pushBoolean(this.getGPolygon(svm, receiver).isFilled());
};

var GPolygon_setFillColor = function() {
   GPolygonMethod.call(this);
};

GPolygon_setFillColor.prototype =
   jslib.inheritPrototype(GPolygonMethod, "GPolygon_setFillColor extends GPolygonMethod");
GPolygon_setFillColor.prototype.constructor = GPolygon_setFillColor;
GPolygon_setFillColor.prototype.$class = 
   new Class("GPolygon_setFillColor", GPolygon_setFillColor);

GPolygon_setFillColor.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GPolygon.setFillColor", "O");
   var color = svm.pop().getValue();
   this.getGPolygon(svm, receiver).setFillColor(color);
};


/* SJSGRectangleClass.js */

var SJSGRectangleClass = function() {
   SVMClass.call(this);
   this.defineMethod("new", new GRectangle_new());
   this.defineMethod("getX", new GRectangle_getX());
   this.defineMethod("getY", new GRectangle_getY());
   this.defineMethod("getWidth", new GRectangle_getWidth());
   this.defineMethod("getHeight", new GRectangle_getHeight());
};

SJSGRectangleClass.prototype = 
   jslib.inheritPrototype(SVMClass, "SJSGRectangleClass extends SVMClass");
SJSGRectangleClass.prototype.constructor = SJSGRectangleClass;
SJSGRectangleClass.prototype.$class = 
   new Class("SJSGRectangleClass", SJSGRectangleClass);

var GRectangle_new = function() {
   SVMMethod.call(this);
};

GRectangle_new.prototype =
   jslib.inheritPrototype(SVMMethod, "GRectangle_new extends SVMMethod");
GRectangle_new.prototype.constructor = GRectangle_new;
GRectangle_new.prototype.$class = 
   new Class("GRectangle_new", GRectangle_new);

GRectangle_new.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GRectangle.new", "DDDD");
   var height = svm.popDouble();
   var width = svm.popDouble();
   var y = svm.popDouble();
   var x = svm.popDouble();
   svm.push(Value.createObject(new GRectangle(x, y, width, height), "GRectangle"));
};

var GRectangleMethod = function() {
   SVMMethod.call(this);
};

GRectangleMethod.prototype =
   jslib.inheritPrototype(SVMMethod, "GRectangleMethod extends SVMMethod");
GRectangleMethod.prototype.constructor = GRectangleMethod;
GRectangleMethod.prototype.$class = 
   new Class("GRectangleMethod", GRectangleMethod);

GRectangleMethod.prototype.getGRectangle = function(svm, receiver) {
   if (receiver === null) {
      return svm.pop().getValue();
   } else {
      return receiver.getValue();
   }
};

var GRectangle_getX = function() {
   GRectangleMethod.call(this);
};

GRectangle_getX.prototype =
   jslib.inheritPrototype(GRectangleMethod, "GRectangle_getX extends GRectangleMethod");
GRectangle_getX.prototype.constructor = GRectangle_getX;
GRectangle_getX.prototype.$class = 
   new Class("GRectangle_getX", GRectangle_getX);

GRectangle_getX.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GRectangle.getX", "");
   svm.pushDouble(this.getGRectangle(svm, receiver).getX());
};

var GRectangle_getY = function() {
   GRectangleMethod.call(this);
};

GRectangle_getY.prototype =
   jslib.inheritPrototype(GRectangleMethod, "GRectangle_getY extends GRectangleMethod");
GRectangle_getY.prototype.constructor = GRectangle_getY;
GRectangle_getY.prototype.$class = 
   new Class("GRectangle_getY", GRectangle_getY);

GRectangle_getY.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GRectangle.getY", "");
   svm.pushDouble(this.getGRectangle(svm, receiver).getY());
};

var GRectangle_getWidth = function() {
   GRectangleMethod.call(this);
};

GRectangle_getWidth.prototype =
   jslib.inheritPrototype(GRectangleMethod, "GRectangle_getWidth extends GRectangleMethod");
GRectangle_getWidth.prototype.constructor = GRectangle_getWidth;
GRectangle_getWidth.prototype.$class = 
   new Class("GRectangle_getWidth", GRectangle_getWidth);

GRectangle_getWidth.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GRectangle.getWidth", "");
   svm.pushDouble(this.getGRectangle(svm, receiver).getWidth());
};

var GRectangle_getHeight = function() {
   GRectangleMethod.call(this);
};

GRectangle_getHeight.prototype =
   jslib.inheritPrototype(GRectangleMethod, "GRectangle_getHeight extends GRectangleMethod");
GRectangle_getHeight.prototype.constructor = GRectangle_getHeight;
GRectangle_getHeight.prototype.$class = 
   new Class("GRectangle_getHeight", GRectangle_getHeight);

GRectangle_getHeight.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GRectangle.getHeight", "");
   svm.pushDouble(this.getGRectangle(svm, receiver).getHeight());
};


/* SJSGRectClass.js */

var SJSGRectClass = function() {
   SJSGObjectClass.call(this);
   this.defineMethod("new", new GRect_new());
   this.defineMethod("setFilled", new GRect_setFilled());
   this.defineMethod("setFillColor", new GRect_setFillColor());
   this.defineMethod("isFilled", new GRect_isFilled());
   this.defineMethod("setBounds", new GRect_setBounds());
};

SJSGRectClass.prototype = 
   jslib.inheritPrototype(SJSGObjectClass, "SJSGRectClass extends SJSGObjectClass");
SJSGRectClass.prototype.constructor = SJSGRectClass;
SJSGRectClass.prototype.$class = 
   new Class("SJSGRectClass", SJSGRectClass);

var GRect_new = function() {
   SVMMethod.call(this);
};

GRect_new.prototype =
   jslib.inheritPrototype(SVMMethod, "GRect_new extends SVMMethod");
GRect_new.prototype.constructor = GRect_new;
GRect_new.prototype.$class = 
   new Class("GRect_new", GRect_new);

GRect_new.prototype.execute = function(svm, receiver) {
   if (svm.getArgumentCount() === 2) {
      svm.checkSignature("GRect.new", "DD");
      var height = svm.popDouble();
      var width = svm.popDouble();
      svm.push(Value.createObject(new GRect(0, 0, width, height), "GRect"));
   } else {
      svm.checkSignature("GRect.new", "DDDD");
      var height = svm.popDouble();
      var width = svm.popDouble();
      var y = svm.popDouble();
      var x = svm.popDouble();
      svm.push(Value.createObject(new GRect(x, y, width, height), "GRect"));
   }
};

var GRectMethod = function() {
   SVMMethod.call(this);
};

GRectMethod.prototype =
   jslib.inheritPrototype(SVMMethod, "GRectMethod extends SVMMethod");
GRectMethod.prototype.constructor = GRectMethod;
GRectMethod.prototype.$class = 
   new Class("GRectMethod", GRectMethod);

GRectMethod.prototype.getGRect = function(svm, receiver) {
   if (receiver === null) {
      return svm.pop().getValue();
   } else {
      return receiver.getValue();
   }
};

var GRect_setFilled = function() {
   GRectMethod.call(this);
};

GRect_setFilled.prototype =
   jslib.inheritPrototype(GRectMethod, "GRect_setFilled extends GRectMethod");
GRect_setFilled.prototype.constructor = GRect_setFilled;
GRect_setFilled.prototype.$class = 
   new Class("GRect_setFilled", GRect_setFilled);

GRect_setFilled.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GRect.setFilled", "B");
   var flag = svm.popBoolean();
   this.getGRect(svm, receiver).setFilled(flag);
};

var GRect_isFilled = function() {
   GRectMethod.call(this);
};

GRect_isFilled.prototype =
   jslib.inheritPrototype(GRectMethod, "GRect_isFilled extends GRectMethod");
GRect_isFilled.prototype.constructor = GRect_isFilled;
GRect_isFilled.prototype.$class = 
   new Class("GRect_isFilled", GRect_isFilled);

GRect_isFilled.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GRect.isFilled", "");
   svm.pushBoolean(this.getGRect(svm, receiver).isFilled());
};

var GRect_setFillColor = function() {
   GRectMethod.call(this);
};

GRect_setFillColor.prototype =
   jslib.inheritPrototype(GRectMethod, "GRect_setFillColor extends GRectMethod");
GRect_setFillColor.prototype.constructor = GRect_setFillColor;
GRect_setFillColor.prototype.$class = 
   new Class("GRect_setFillColor", GRect_setFillColor);

GRect_setFillColor.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GRect.setFillColor", "O");
   var color = svm.pop().getValue();
   this.getGRect(svm, receiver).setFillColor(color);
};

var GRect_setBounds = function() {
   GRectMethod.call(this);
};

GRect_setBounds.prototype =
   jslib.inheritPrototype(GRectMethod, "GRect_setBounds extends GRectMethod");
GRect_setBounds.prototype.constructor = GRect_setBounds;
GRect_setBounds.prototype.$class = 
   new Class("GRect_setBounds", GRect_setBounds);

GRect_setBounds.prototype.execute = function(svm, receiver) {
   if (svm.getArgumentCount() === 1) {
      svm.checkSignature("GRect.setBounds", "O");
      var r = svm.pop().getValue();
      this.getGRect(svm, receiver).setBounds(r.getX(), r.getY(), r.getWidth(), r.getHeight());
   } else {
      svm.checkSignature("GRect.setBounds", "DDDD");
      var height = svm.popDouble();
      var width = svm.popDouble();
      var y = svm.popDouble();
      var x = svm.popDouble();
      this.getGRect(svm, receiver).setBounds(x, y, width, height);
   }
};


/* SJSGTransformClass.js */

var SJSGTransformClass = function() {
   SVMClass.call(this);
   this.defineMethod("new", new GTransform_new());
   this.defineMethod("concatenate", new GTransform_concatenate());
   this.defineMethod("createInverse", new GTransform_createInverse());
   this.defineMethod("getDeterminant", new GTransform_getDeterminant());
   this.defineMethod("getScaleX", new GTransform_getScaleX());
   this.defineMethod("getScaleY", new GTransform_getScaleY());
   this.defineMethod("getShearX", new GTransform_getShearX());
   this.defineMethod("getShearY", new GTransform_getShearY());
   this.defineMethod("getTranslateX", new GTransform_getTranslateX());
   this.defineMethod("getTranslateY", new GTransform_getTranslateY());
   this.defineMethod("inverseTransform", new GTransform_inverseTransform());
   this.defineMethod("rotate", new GTransform_rotate());
   this.defineMethod("scale", new GTransform_scale());
   this.defineMethod("setTransform", new GTransform_setTransform());
   this.defineMethod("shear", new GTransform_shear());
   this.defineMethod("transform", new GTransform_transform());
   this.defineMethod("translate", new GTransform_translate());
};

SJSGTransformClass.prototype = 
   jslib.inheritPrototype(SVMClass, "SJSGTransformClass extends SVMClass");
SJSGTransformClass.prototype.constructor = SJSGTransformClass;
SJSGTransformClass.prototype.$class = 
   new Class("SJSGTransformClass", SJSGTransformClass);

var GTransform_new = function() {
   SVMMethod.call(this);
};

GTransform_new.prototype =
   jslib.inheritPrototype(SVMMethod, "GTransform_new extends SVMMethod");
GTransform_new.prototype.constructor = GTransform_new;
GTransform_new.prototype.$class = 
   new Class("GTransform_new", GTransform_new);

GTransform_new.prototype.execute = function(svm, receiver) {
   var nArgs = svm.getArgumentCount();
   if (nArgs === 0) {
      svm.checkSignature("GTransform.new", "");
      svm.push(Value.createObject(new GTransform(), "GTransform"));
   } else if (nArgs === 1) {
      svm.checkSignature("GTransform.new", "O");
      var t = svm.pop().getValue();
      svm.push(Value.createObject(new GTransform(t), "GTransform"));
   } else if (nArgs === 4) {
      svm.checkSignature("GTransform.new", "DDDD");
      var d = svm.popDouble();
      var c = svm.popDouble();
      var b = svm.popDouble();
      var a = svm.popDouble();
      svm.push(Value.createObject(new GTransform(a, b, c, d), "GTransform"));
   } else {
      svm.checkSignature("GTransform.new", "DDDDDD");
      var ty = svm.popDouble();
      var tx = svm.popDouble();
      var d = svm.popDouble();
      var c = svm.popDouble();
      var b = svm.popDouble();
      var a = svm.popDouble();
      svm.push(Value.createObject(new GTransform(a, b, c, d, tx, ty), "GTransform"));
   }
};

var GTransformMethod = function() {
   SVMMethod.call(this);
};

GTransformMethod.prototype =
   jslib.inheritPrototype(SVMMethod, "GTransformMethod extends SVMMethod");
GTransformMethod.prototype.constructor = GTransformMethod;
GTransformMethod.prototype.$class = 
   new Class("GTransformMethod", GTransformMethod);

GTransformMethod.prototype.getGTransform = function(svm, receiver) {
   if (receiver === null) {
      return svm.pop().getValue();
   } else {
      return receiver.getValue();
   }
};

var GTransform_concatenate = function() {
   GTransformMethod.call(this);
};

GTransform_concatenate.prototype =
   jslib.inheritPrototype(GTransformMethod, "GTransform_concatenate extends GTransformMethod");
GTransform_concatenate.prototype.constructor = GTransform_concatenate;
GTransform_concatenate.prototype.$class = 
   new Class("GTransform_concatenate", GTransform_concatenate);

GTransform_concatenate.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GTransform.concatenate", "O");
   var t = svm.pop().getValue();
   this.getGTransform(svm, receiver).concatenate(t);
};

var GTransform_createInverse = function() {
   GTransformMethod.call(this);
};

GTransform_createInverse.prototype =
   jslib.inheritPrototype(GTransformMethod, "GTransform_createInverse extends GTransformMethod");
GTransform_createInverse.prototype.constructor = GTransform_createInverse;
GTransform_createInverse.prototype.$class = 
   new Class("GTransform_createInverse", GTransform_createInverse);

GTransform_createInverse.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GTransform.createInverse", "");
   var t = this.getGTransform(svm, receiver).createInverse();
   svm.push(Value.createObject(t, "GTransform"));
};

var GTransform_getDeterminant = function() {
   GTransformMethod.call(this);
};

GTransform_getDeterminant.prototype =
   jslib.inheritPrototype(GTransformMethod, "GTransform_getDeterminant extends GTransformMethod");
GTransform_getDeterminant.prototype.constructor = GTransform_getDeterminant;
GTransform_getDeterminant.prototype.$class = 
   new Class("GTransform_getDeterminant", GTransform_getDeterminant);

GTransform_getDeterminant.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GTransform.getDeterminant", "");
   svm.pushDouble(this.getGTransform(svm, receiver).getDeterminant());
};

var GTransform_getScaleX = function() {
   GTransformMethod.call(this);
};

GTransform_getScaleX.prototype =
   jslib.inheritPrototype(GTransformMethod, "GTransform_getScaleX extends GTransformMethod");
GTransform_getScaleX.prototype.constructor = GTransform_getScaleX;
GTransform_getScaleX.prototype.$class = 
   new Class("GTransform_getScaleX", GTransform_getScaleX);

GTransform_getScaleX.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GTransform.getScaleX", "");
   svm.pushDouble(this.getGTransform(svm, receiver).getScaleX());
};

var GTransform_getScaleY = function() {
   GTransformMethod.call(this);
};

GTransform_getScaleY.prototype =
   jslib.inheritPrototype(GTransformMethod, "GTransform_getScaleY extends GTransformMethod");
GTransform_getScaleY.prototype.constructor = GTransform_getScaleY;
GTransform_getScaleY.prototype.$class = 
   new Class("GTransform_getScaleY", GTransform_getScaleY);

GTransform_getScaleY.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GTransform.getScaleY", "");
   svm.pushDouble(this.getGTransform(svm, receiver).getScaleY());
};

var GTransform_getShearX = function() {
   GTransformMethod.call(this);
};

GTransform_getShearX.prototype =
   jslib.inheritPrototype(GTransformMethod, "GTransform_getShearX extends GTransformMethod");
GTransform_getShearX.prototype.constructor = GTransform_getShearX;
GTransform_getShearX.prototype.$class = 
   new Class("GTransform_getShearX", GTransform_getShearX);

GTransform_getShearX.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GTransform.getShearX", "");
   svm.pushDouble(this.getGTransform(svm, receiver).getShearX());
};

var GTransform_getShearY = function() {
   GTransformMethod.call(this);
};

GTransform_getShearY.prototype =
   jslib.inheritPrototype(GTransformMethod, "GTransform_getShearY extends GTransformMethod");
GTransform_getShearY.prototype.constructor = GTransform_getShearY;
GTransform_getShearY.prototype.$class = 
   new Class("GTransform_getShearY", GTransform_getShearY);

GTransform_getShearY.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GTransform.getShearY", "");
   svm.pushDouble(this.getGTransform(svm, receiver).getShearY());
};

var GTransform_getTranslateX = function() {
   GTransformMethod.call(this);
};

GTransform_getTranslateX.prototype =
   jslib.inheritPrototype(GTransformMethod, "GTransform_getTranslateX extends GTransformMethod");
GTransform_getTranslateX.prototype.constructor = GTransform_getTranslateX;
GTransform_getTranslateX.prototype.$class = 
   new Class("GTransform_getTranslateX", GTransform_getTranslateX);

GTransform_getTranslateX.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GTransform.getTranslateX", "");
   svm.pushDouble(this.getGTransform(svm, receiver).getTranslateX());
};

var GTransform_getTranslateY = function() {
   GTransformMethod.call(this);
};

GTransform_getTranslateY.prototype =
   jslib.inheritPrototype(GTransformMethod, "GTransform_getTranslateY extends GTransformMethod");
GTransform_getTranslateY.prototype.constructor = GTransform_getTranslateY;
GTransform_getTranslateY.prototype.$class = 
   new Class("GTransform_getTranslateY", GTransform_getTranslateY);

GTransform_getTranslateY.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GTransform.getTranslateY", "");
   svm.pushDouble(this.getGTransform(svm, receiver).getTranslateY());
};

var GTransform_inverseTransform = function() {
   GTransformMethod.call(this);
};

GTransform_inverseTransform.prototype =
   jslib.inheritPrototype(GTransformMethod, "GTransform_inverseTransform extends GTransformMethod");
GTransform_inverseTransform.prototype.constructor = GTransform_inverseTransform;
GTransform_inverseTransform.prototype.$class = 
   new Class("GTransform_inverseTransform", GTransform_inverseTransform);

GTransform_inverseTransform.prototype.execute = function(svm, receiver) {
   if (svm.getArgumentCount() === 1) {
      svm.checkSignature("GTransform.inverseTransform", "O");
      var pt = svm.pop().getValue();
      var t = this.getGTransform(svm, receiver);
      svm.push(Value.createObject(t.inverseTransform(pt), "GPoint"));
   } else {
      svm.checkSignature("GTransform.inverseTransform", "DD");
      var y = svm.popDouble();
      var x = svm.popDouble();
      var t = this.getGTransform(svm, receiver);
      svm.push(Value.createObject(t.inverseTransform(x, y), "GPoint"));
   }
};

var GTransform_rotate = function() {
   GTransformMethod.call(this);
};

GTransform_rotate.prototype =
   jslib.inheritPrototype(GTransformMethod, "GTransform_rotate extends GTransformMethod");
GTransform_rotate.prototype.constructor = GTransform_rotate;
GTransform_rotate.prototype.$class = 
   new Class("GTransform_rotate", GTransform_rotate);

GTransform_rotate.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GTransform.rotate", "D");
   var theta = svm.popDouble();
   this.getGTransform(svm, receiver).rotate(theta);
};

var GTransform_scale = function() {
   GTransformMethod.call(this);
};

GTransform_scale.prototype =
   jslib.inheritPrototype(GTransformMethod, "GTransform_scale extends GTransformMethod");
GTransform_scale.prototype.constructor = GTransform_scale;
GTransform_scale.prototype.$class = 
   new Class("GTransform_scale", GTransform_scale);

GTransform_scale.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GTransform.scale", "DD");
   var sy = svm.popDouble();
   var sx = svm.popDouble();
   this.getGTransform(svm, receiver).scale(sx, sy);
};

var GTransform_setTransform = function() {
   GTransformMethod.call(this);
};

GTransform_setTransform.prototype =
   jslib.inheritPrototype(GTransformMethod, "GTransform_setTransform extends GTransformMethod");
GTransform_setTransform.prototype.constructor = GTransform_setTransform;
GTransform_setTransform.prototype.$class = 
   new Class("GTransform_setTransform", GTransform_setTransform);

GTransform_setTransform.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GTransform.setTransform", "DDDDDD");
   var ty = svm.popDouble();
   var tx = svm.popDouble();
   var d = svm.popDouble();
   var c = svm.popDouble();
   var b = svm.popDouble();
   var a = svm.popDouble();
   this.getGTransform(svm, receiver).setTransform(a, b, c, d, tx, ty);
};

var GTransform_shear = function() {
   GTransformMethod.call(this);
};

GTransform_shear.prototype =
   jslib.inheritPrototype(GTransformMethod, "GTransform_shear extends GTransformMethod");
GTransform_shear.prototype.constructor = GTransform_shear;
GTransform_shear.prototype.$class = 
   new Class("GTransform_shear", GTransform_shear);

GTransform_shear.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GTransform.shear", "DD");
   var sy = svm.popDouble();
   var sx = svm.popDouble();
   this.getGTransform(svm, receiver).shear(sx, sy);
};

var GTransform_transform = function() {
   GTransformMethod.call(this);
};

GTransform_transform.prototype =
   jslib.inheritPrototype(GTransformMethod, "GTransform_transform extends GTransformMethod");
GTransform_transform.prototype.constructor = GTransform_transform;
GTransform_transform.prototype.$class = 
   new Class("GTransform_transform", GTransform_transform);

GTransform_transform.prototype.execute = function(svm, receiver) {
   if (svm.getArgumentCount() === 1) {
      svm.checkSignature("GTransform.transform", "O");
      var pt = svm.pop().getValue();
      var t = this.getGTransform(svm, receiver);
      svm.push(Value.createObject(t.transform(pt), "GPoint"));
   } else {
      svm.checkSignature("GTransform.transform", "DD");
      var y = svm.popDouble();
      var x = svm.popDouble();
      var t = this.getGTransform(svm, receiver);
      svm.push(Value.createObject(t.transform(x, y), "GPoint"));
   }
};

var GTransform_translate = function() {
   GTransformMethod.call(this);
};

GTransform_translate.prototype =
   jslib.inheritPrototype(GTransformMethod, "GTransform_translate extends GTransformMethod");
GTransform_translate.prototype.constructor = GTransform_translate;
GTransform_translate.prototype.$class = 
   new Class("GTransform_translate", GTransform_translate);

GTransform_translate.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GTransform.translate", "DD");
   var ty = svm.popDouble();
   var tx = svm.popDouble();
   this.getGTransform(svm, receiver).translate(tx, ty);
};


/* SJSGWindowClass.js */

var SJSGWindowClass = function() {
   SVMClass.call(this);
   this.defineMethod("_init", new GWindow_init());
   this.defineMethod("new", new GWindow_new());
   this.defineMethod("add", new GWindow_add());
   this.defineMethod("clear", new GWindow_clear());
   this.defineMethod("remove", new GWindow_remove());
   this.defineMethod("removeAll", new GWindow_removeAll());
   this.defineMethod("repaint", new GWindow_repaint());
   this.defineMethod("getWidth", new GWindow_getWidth());
   this.defineMethod("getHeight", new GWindow_getHeight());
   this.defineMethod("getCanvasWidth", new GWindow_getCanvasWidth());
   this.defineMethod("getCanvasHeight", new GWindow_getCanvasHeight());
   this.defineMethod("setBackground", new GWindow_setBackground());
   this.defineMethod("getElementAt", new GWindow_getElementAt());
   this.defineMethod("waitForClick", new GWindow_waitForClick());
   this.defineMethod("waitForEvent", new GWindow_waitForEvent());
   this.defineMethod("requestFocus", new GWindow_requestFocus());
};

SJSGWindowClass.prototype = 
   jslib.inheritPrototype(SVMClass, "SJSGWindowClass extends SVMClass");
SJSGWindowClass.prototype.constructor = SJSGWindowClass;
SJSGWindowClass.prototype.$class = 
   new Class("SJSGWindowClass", SJSGWindowClass);

SJSGWindowClass.createGCanvas = function(svm) {
   var canvas = new SJSGCanvas(svm);
   svm.setGlobal("canvas", Value.createObject(canvas, "GWindow"));
   return canvas;
};

var GWindow_init = function() {
   SVMMethod.call(this);
};

GWindow_init.prototype =
   jslib.inheritPrototype(SVMMethod, "GWindow_init extends SVMMethod");
GWindow_init.prototype.constructor = GWindow_init;
GWindow_init.prototype.$class = 
   new Class("GWindow_init", GWindow_init);

GWindow_init.prototype.execute = function(svm, receiver) {
   var width = svm.getGlobalInteger("GWINDOW_WIDTH", SVMC.DEFAULT_WINDOW_WIDTH);
   var height = svm.getGlobalInteger("GWINDOW_HEIGHT", SVMC.DEFAULT_WINDOW_HEIGHT);
   if (width === 0 || height === 0) return;
   var gc = SJSGWindowClass.createGCanvas(svm);
   gc.setPreferredSize(width, height);
   var pgm = svm.getProgram();
   if (pgm === null || pgm.isCompiler()) {
      var frame = new JFrame();
      frame.setTitle(svm.getGlobalString("TITLE", "Console"));
      frame.setLayout(new BorderLayout());
      frame.add(gc, BorderLayout.NORTH);
      frame.pack();
      frame.getFontMetrics(frame.getFont());
      frame.setVisible(true);
   } else {
      pgm.add(gc, "canvas");
   }
};

var GWindow_new = function() {
   SVMMethod.call(this);
};

GWindow_new.prototype =
   jslib.inheritPrototype(SVMMethod, "GWindow_new extends SVMMethod");
GWindow_new.prototype.constructor = GWindow_new;
GWindow_new.prototype.$class = 
   new Class("GWindow_new", GWindow_new);

GWindow_new.prototype.execute = function(svm, receiver) {
   var gc = SJSGWindowClass.createGCanvas(svm);
   svm.push(Value.createObject(gc, "GWindow"));
};

var GWindowMethod = function() {
   SVMMethod.call(this);
};

GWindowMethod.prototype =
   jslib.inheritPrototype(SVMMethod, "GWindowMethod extends SVMMethod");
GWindowMethod.prototype.constructor = GWindowMethod;
GWindowMethod.prototype.$class = 
   new Class("GWindowMethod", GWindowMethod);

GWindowMethod.prototype.getGCanvas = function(svm, receiver) {
   if (receiver === null) {
      var value = svm.getGlobal("canvas");
      return (value === null) ? null : value.getValue();
   } else {
      return receiver.getValue();
   }
};

var GWindow_clear = function() {
   GWindowMethod.call(this);
};

GWindow_clear.prototype =
   jslib.inheritPrototype(GWindowMethod, "GWindow_clear extends GWindowMethod");
GWindow_clear.prototype.constructor = GWindow_clear;
GWindow_clear.prototype.$class = 
   new Class("GWindow_clear", GWindow_clear);

GWindow_clear.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GWindow.clear", "");
   this.getGCanvas(svm, receiver).clear();
};

var GWindow_add = function() {
   GWindowMethod.call(this);
};

GWindow_add.prototype =
   jslib.inheritPrototype(GWindowMethod, "GWindow_add extends GWindowMethod");
GWindow_add.prototype.constructor = GWindow_add;
GWindow_add.prototype.$class = 
   new Class("GWindow_add", GWindow_add);

GWindow_add.prototype.execute = function(svm, receiver) {
   if (svm.getArgumentCount() === 3) {
      svm.checkSignature("GWindow.add", "ODD");
      var y = svm.popDouble();
      var x = svm.popDouble();
      var v = svm.pop();
      this.getGCanvas(svm, receiver).add(v.getValue(), x, y);
   } else {
      svm.checkSignature("GWindow.add", "O");
      var v = svm.pop();
      this.getGCanvas(svm, receiver).add(v.getValue());
   }
};

var GWindow_remove = function() {
   GWindowMethod.call(this);
};

GWindow_remove.prototype =
   jslib.inheritPrototype(GWindowMethod, "GWindow_remove extends GWindowMethod");
GWindow_remove.prototype.constructor = GWindow_remove;
GWindow_remove.prototype.$class = 
   new Class("GWindow_remove", GWindow_remove);

GWindow_remove.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GWindow.remove", "O");
   var v = svm.pop();
   this.getGCanvas(svm, receiver).remove(v.getValue());
};

var GWindow_removeAll = function() {
   GWindowMethod.call(this);
};

GWindow_removeAll.prototype =
   jslib.inheritPrototype(GWindowMethod, "GWindow_removeAll extends GWindowMethod");
GWindow_removeAll.prototype.constructor = GWindow_removeAll;
GWindow_removeAll.prototype.$class = 
   new Class("GWindow_removeAll", GWindow_removeAll);

GWindow_removeAll.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GWindow.removeAll", "");
   this.getGCanvas(svm, receiver).removeAll();
};

var GWindow_repaint = function() {
   GWindowMethod.call(this);
};

GWindow_repaint.prototype =
   jslib.inheritPrototype(GWindowMethod, "GWindow_repaint extends GWindowMethod");
GWindow_repaint.prototype.constructor = GWindow_repaint;
GWindow_repaint.prototype.$class = 
   new Class("GWindow_repaint", GWindow_repaint);

GWindow_repaint.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GWindow.repaint", "");
   var gc = this.getGCanvas(svm, receiver);
   if (gc !== null) gc.repaint();
};

var GWindow_getWidth = function() {
   GWindowMethod.call(this);
};

GWindow_getWidth.prototype =
   jslib.inheritPrototype(GWindowMethod, "GWindow_getWidth extends GWindowMethod");
GWindow_getWidth.prototype.constructor = GWindow_getWidth;
GWindow_getWidth.prototype.$class = 
   new Class("GWindow_getWidth", GWindow_getWidth);

GWindow_getWidth.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GWindow.getWidth", "");
   var gc = this.getGCanvas(svm, receiver);
   svm.pushDouble(gc.getWidth());
};

var GWindow_getHeight = function() {
   GWindowMethod.call(this);
};

GWindow_getHeight.prototype =
   jslib.inheritPrototype(GWindowMethod, "GWindow_getHeight extends GWindowMethod");
GWindow_getHeight.prototype.constructor = GWindow_getHeight;
GWindow_getHeight.prototype.$class = 
   new Class("GWindow_getHeight", GWindow_getHeight);

GWindow_getHeight.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GWindow.getHeight", "");
   var gc = this.getGCanvas(svm, receiver);
   svm.pushDouble(gc.getHeight());
};

var GWindow_getCanvasWidth = function() {
   GWindowMethod.call(this);
};

GWindow_getCanvasWidth.prototype =
   jslib.inheritPrototype(GWindowMethod, "GWindow_getCanvasWidth extends GWindowMethod");
GWindow_getCanvasWidth.prototype.constructor = GWindow_getCanvasWidth;
GWindow_getCanvasWidth.prototype.$class = 
   new Class("GWindow_getCanvasWidth", GWindow_getCanvasWidth);

GWindow_getCanvasWidth.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GWindow.getCanvasWidth", "");
   svm.pushDouble(this.getGCanvas(svm, receiver).getWidth());
};

var GWindow_getCanvasHeight = function() {
   GWindowMethod.call(this);
};

GWindow_getCanvasHeight.prototype =
   jslib.inheritPrototype(GWindowMethod, "GWindow_getCanvasHeight extends GWindowMethod");
GWindow_getCanvasHeight.prototype.constructor = GWindow_getCanvasHeight;
GWindow_getCanvasHeight.prototype.$class = 
   new Class("GWindow_getCanvasHeight", GWindow_getCanvasHeight);

GWindow_getCanvasHeight.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GWindow.getCanvasHeight", "");
   svm.pushDouble(this.getGCanvas(svm, receiver).getHeight());
};

var GWindow_setBackground = function() {
   GWindowMethod.call(this);
};

GWindow_setBackground.prototype =
   jslib.inheritPrototype(GWindowMethod, "GWindow_setBackground extends GWindowMethod");
GWindow_setBackground.prototype.constructor = GWindow_setBackground;
GWindow_setBackground.prototype.$class = 
   new Class("GWindow_setBackground", GWindow_setBackground);

GWindow_setBackground.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GWindow.setBackground", "O");
   var bg = svm.pop().getValue();
   this.getGCanvas(svm, receiver).setBackground(bg);
};

var GWindow_getElementAt = function() {
   GWindowMethod.call(this);
};

GWindow_getElementAt.prototype =
   jslib.inheritPrototype(GWindowMethod, "GWindow_getElementAt extends GWindowMethod");
GWindow_getElementAt.prototype.constructor = GWindow_getElementAt;
GWindow_getElementAt.prototype.$class = 
   new Class("GWindow_getElementAt", GWindow_getElementAt);

GWindow_getElementAt.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GWindow.remove", "DD");
   var y = svm.popDouble();
   var x = svm.popDouble();
   var gobj = this.getGCanvas(svm, receiver).getElementAt(x, y);
   if (gobj === null) {
      svm.push(Value.NULL);
   } else {
      var v = new Value(Value.OBJECT, gobj);
      var gobjClass = gobj.$class.getName();
      gobjClass = gobjClass.substring(gobjClass.lastIndexOf(".") + 1);
      v.setClassName(gobjClass);
      svm.push(v);
   }
};

var GWindow_waitForClick = function() {
   GWindowMethod.call(this);
};

GWindow_waitForClick.prototype =
   jslib.inheritPrototype(GWindowMethod, "GWindow_waitForClick extends GWindowMethod");
GWindow_waitForClick.prototype.constructor = GWindow_waitForClick;
GWindow_waitForClick.prototype.$class = 
   new Class("GWindow_waitForClick", GWindow_waitForClick);

GWindow_waitForClick.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GWindow.waitForClick", "");
   var gc = this.getGCanvas(svm, receiver);
   gc.enableMouseListener();
   gc.repaint();
   gc.setState(SJSGCanvas.WAITING_FOR_CLICK);
   svm.setState(SVM.WAITING);
};

var GWindow_waitForEvent = function() {
   GWindowMethod.call(this);
};

GWindow_waitForEvent.prototype =
   jslib.inheritPrototype(GWindowMethod, "GWindow_waitForEvent extends GWindowMethod");
GWindow_waitForEvent.prototype.constructor = GWindow_waitForEvent;
GWindow_waitForEvent.prototype.$class = 
   new Class("GWindow_waitForEvent", GWindow_waitForEvent);

GWindow_waitForEvent.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GWindow.waitForEvent", "");
   var gc = this.getGCanvas(svm, receiver);
   gc.enableMouseListener();
   gc.enableMouseMotionListener();  // Don't always do this
   gc.enableKeyListener();
   gc.repaint();
   gc.setState(SJSGCanvas.WAITING_FOR_EVENT);
   svm.setState(SVM.WAITING);
};

var GWindow_requestFocus = function() {
   GWindowMethod.call(this);
};

GWindow_requestFocus.prototype =
   jslib.inheritPrototype(GWindowMethod, "GWindow_requestFocus extends GWindowMethod");
GWindow_requestFocus.prototype.constructor = GWindow_requestFocus;
GWindow_requestFocus.prototype.$class = 
   new Class("GWindow_requestFocus", GWindow_requestFocus);

GWindow_requestFocus.prototype.execute = function(svm, receiver) {
   svm.checkSignature("GWindow.requestFocus", "");
   var gc = this.getGCanvas(svm, receiver);
   gc.requestFocus();
};


/* SJSKeyEventClass.js */

var SJSKeyEventClass = function() {
   SJSEventClass.call(this);
   this.defineMethod("getEventType", new KeyEvent_getEventType());
   this.defineMethod("getID", new KeyEvent_getID());
   this.defineMethod("getSource", new KeyEvent_getSource());
   this.defineMethod("getKeyChar", new KeyEvent_getKeyChar());
   this.defineMethod("getKeyCode", new KeyEvent_getKeyCode());
   this.defineMethod("TYPE", new KeyEvent_TYPE());
   this.defineMethod("KEY_TYPED", new KeyEvent_KEY_TYPED());
   this.defineMethod("KEY_PRESSED", new KeyEvent_KEY_PRESSED());
   this.defineMethod("KEY_RELEASED", new KeyEvent_KEY_RELEASED());
};

SJSKeyEventClass.prototype = 
   jslib.inheritPrototype(SJSEventClass, "SJSKeyEventClass extends SJSEventClass");
SJSKeyEventClass.prototype.constructor = SJSKeyEventClass;
SJSKeyEventClass.prototype.$class = 
   new Class("SJSKeyEventClass", SJSKeyEventClass);

SJSKeyEventClass.KEY_TYPED = SJSEventClass.KEY_EVENT + 1;
SJSKeyEventClass.KEY_PRESSED = SJSEventClass.KEY_EVENT + 2;
SJSKeyEventClass.KEY_RELEASED = SJSEventClass.KEY_EVENT + 3;
var KeyEventMethod = function() {
   SVMMethod.call(this);
};

KeyEventMethod.prototype =
   jslib.inheritPrototype(SVMMethod, "KeyEventMethod extends SVMMethod");
KeyEventMethod.prototype.constructor = KeyEventMethod;
KeyEventMethod.prototype.$class = 
   new Class("KeyEventMethod", KeyEventMethod);

KeyEventMethod.prototype.getKeyEvent = function(svm, receiver) {
   if (receiver === null) {
      return svm.pop().getValue();
   } else {
      return receiver.getValue();
   }
};

var KeyEvent_getEventType = function() {
   KeyEventMethod.call(this);
};

KeyEvent_getEventType.prototype =
   jslib.inheritPrototype(KeyEventMethod, "KeyEvent_getEventType extends KeyEventMethod");
KeyEvent_getEventType.prototype.constructor = KeyEvent_getEventType;
KeyEvent_getEventType.prototype.$class = 
   new Class("KeyEvent_getEventType", KeyEvent_getEventType);

KeyEvent_getEventType.prototype.execute = function(svm, receiver) {
   svm.checkSignature("KeyEvent.getEventType", "");
   this.getKeyEvent(svm, receiver);
   svm.pushInteger(SJSEventClass.KEY_EVENT);
};

var KeyEvent_getID = function() {
   KeyEventMethod.call(this);
};

KeyEvent_getID.prototype =
   jslib.inheritPrototype(KeyEventMethod, "KeyEvent_getID extends KeyEventMethod");
KeyEvent_getID.prototype.constructor = KeyEvent_getID;
KeyEvent_getID.prototype.$class = 
   new Class("KeyEvent_getID", KeyEvent_getID);

KeyEvent_getID.prototype.execute = function(svm, receiver) {
   svm.checkSignature("KeyEvent.getID", "");
   var id = this.getKeyEvent(svm, receiver).getID();
   switch (id) {
    case KeyEvent.KEY_TYPED:
      svm.pushInteger(SJSKeyEventClass.KEY_TYPED);
      break;
    case KeyEvent.KEY_PRESSED:
      svm.pushInteger(SJSKeyEventClass.KEY_PRESSED);
      break;
    case KeyEvent.KEY_RELEASED:
      svm.pushInteger(SJSKeyEventClass.KEY_RELEASED);
      break;
    default:
      throw new RuntimeException("Illegal event type");
   }
};

var KeyEvent_getSource = function() {
   KeyEventMethod.call(this);
};

KeyEvent_getSource.prototype =
   jslib.inheritPrototype(KeyEventMethod, "KeyEvent_getSource extends KeyEventMethod");
KeyEvent_getSource.prototype.constructor = KeyEvent_getSource;
KeyEvent_getSource.prototype.$class = 
   new Class("KeyEvent_getSource", KeyEvent_getSource);

KeyEvent_getSource.prototype.execute = function(svm, receiver) {
   svm.checkSignature("KeyEvent.getSource", "");
   var source = this.getKeyEvent(svm, receiver).getSource();
   var v = new Value(Value.OBJECT, source);
   var className = source.$class.getName();
   className = className.substring(className.lastIndexOf(".") + 1);
   v.setClassName(className);
   svm.push(v);
};

var KeyEvent_getKeyCode = function() {
   KeyEventMethod.call(this);
};

KeyEvent_getKeyCode.prototype =
   jslib.inheritPrototype(KeyEventMethod, "KeyEvent_getKeyCode extends KeyEventMethod");
KeyEvent_getKeyCode.prototype.constructor = KeyEvent_getKeyCode;
KeyEvent_getKeyCode.prototype.$class = 
   new Class("KeyEvent_getKeyCode", KeyEvent_getKeyCode);

KeyEvent_getKeyCode.prototype.execute = function(svm, receiver) {
   svm.checkSignature("KeyEvent.getKeyCode", "");
   svm.pushInteger(this.getKeyEvent(svm, receiver).getKeyCode());
};

var KeyEvent_getKeyChar = function() {
   KeyEventMethod.call(this);
};

KeyEvent_getKeyChar.prototype =
   jslib.inheritPrototype(KeyEventMethod, "KeyEvent_getKeyChar extends KeyEventMethod");
KeyEvent_getKeyChar.prototype.constructor = KeyEvent_getKeyChar;
KeyEvent_getKeyChar.prototype.$class = 
   new Class("KeyEvent_getKeyChar", KeyEvent_getKeyChar);

KeyEvent_getKeyChar.prototype.execute = function(svm, receiver) {
   svm.checkSignature("KeyEvent.getKeyChar", "");
   svm.pushInteger(this.getKeyEvent(svm, receiver).getKeyChar());
};

var KeyEvent_KEY_TYPED = function() {
   SVMConstant.call(this);
};

KeyEvent_KEY_TYPED.prototype =
   jslib.inheritPrototype(SVMConstant, "KeyEvent_KEY_TYPED extends SVMConstant");
KeyEvent_KEY_TYPED.prototype.constructor = KeyEvent_KEY_TYPED;
KeyEvent_KEY_TYPED.prototype.$class = 
   new Class("KeyEvent_KEY_TYPED", KeyEvent_KEY_TYPED);

KeyEvent_KEY_TYPED.prototype.execute = function(svm, receiver) {
   svm.checkSignature("KeyEvent.KEY_TYPED", "");
   svm.pushInteger(SJSKeyEventClass.KEY_TYPED);
};

var KeyEvent_KEY_PRESSED = function() {
   SVMConstant.call(this);
};

KeyEvent_KEY_PRESSED.prototype =
   jslib.inheritPrototype(SVMConstant, "KeyEvent_KEY_PRESSED extends SVMConstant");
KeyEvent_KEY_PRESSED.prototype.constructor = KeyEvent_KEY_PRESSED;
KeyEvent_KEY_PRESSED.prototype.$class = 
   new Class("KeyEvent_KEY_PRESSED", KeyEvent_KEY_PRESSED);

KeyEvent_KEY_PRESSED.prototype.execute = function(svm, receiver) {
   svm.checkSignature("KeyEvent.KEY_PRESSED", "");
   svm.pushInteger(SJSKeyEventClass.KEY_PRESSED);
};

var KeyEvent_KEY_RELEASED = function() {
   SVMConstant.call(this);
};

KeyEvent_KEY_RELEASED.prototype =
   jslib.inheritPrototype(SVMConstant, "KeyEvent_KEY_RELEASED extends SVMConstant");
KeyEvent_KEY_RELEASED.prototype.constructor = KeyEvent_KEY_RELEASED;
KeyEvent_KEY_RELEASED.prototype.$class = 
   new Class("KeyEvent_KEY_RELEASED", KeyEvent_KEY_RELEASED);

KeyEvent_KEY_RELEASED.prototype.execute = function(svm, receiver) {
   svm.checkSignature("KeyEvent.KEY_RELEASED", "");
   svm.pushInteger(SJSKeyEventClass.KEY_RELEASED);
};

var KeyEvent_TYPE = function() {
   SVMConstant.call(this);
};

KeyEvent_TYPE.prototype =
   jslib.inheritPrototype(SVMConstant, "KeyEvent_TYPE extends SVMConstant");
KeyEvent_TYPE.prototype.constructor = KeyEvent_TYPE;
KeyEvent_TYPE.prototype.$class = 
   new Class("KeyEvent_TYPE", KeyEvent_TYPE);

KeyEvent_TYPE.prototype.execute = function(svm, receiver) {
   svm.checkSignature("KeyEvent.TYPE", "");
   svm.pushInteger(SJSEventClass.KEY_EVENT);
};


/* SJSMouseEventClass.js */

var SJSMouseEventClass = function() {
   SJSEventClass.call(this);
   this.defineMethod("getEventType", new MouseEvent_getEventType());
   this.defineMethod("getID", new MouseEvent_getID());
   this.defineMethod("getSource", new MouseEvent_getSource());
   this.defineMethod("getX", new MouseEvent_getX());
   this.defineMethod("getY", new MouseEvent_getY());
   this.defineMethod("TYPE", new MouseEvent_TYPE());
   this.defineMethod("MOUSE_CLICKED", new MouseEvent_MOUSE_CLICKED());
   this.defineMethod("MOUSE_DRAGGED", new MouseEvent_MOUSE_DRAGGED());
   this.defineMethod("MOUSE_MOVED", new MouseEvent_MOUSE_MOVED());
   this.defineMethod("MOUSE_PRESSED", new MouseEvent_MOUSE_PRESSED());
   this.defineMethod("MOUSE_RELEASED", new MouseEvent_MOUSE_RELEASED());
};

SJSMouseEventClass.prototype = 
   jslib.inheritPrototype(SJSEventClass, "SJSMouseEventClass extends SJSEventClass");
SJSMouseEventClass.prototype.constructor = SJSMouseEventClass;
SJSMouseEventClass.prototype.$class = 
   new Class("SJSMouseEventClass", SJSMouseEventClass);

SJSMouseEventClass.MOUSE_CLICKED = SJSEventClass.MOUSE_EVENT + 1;
SJSMouseEventClass.MOUSE_DRAGGED = SJSEventClass.MOUSE_EVENT + 2;
SJSMouseEventClass.MOUSE_MOVED = SJSEventClass.MOUSE_EVENT + 3;
SJSMouseEventClass.MOUSE_PRESSED = SJSEventClass.MOUSE_EVENT + 4;
SJSMouseEventClass.MOUSE_RELEASED = SJSEventClass.MOUSE_EVENT + 5;
var MouseEventMethod = function() {
   SVMMethod.call(this);
};

MouseEventMethod.prototype =
   jslib.inheritPrototype(SVMMethod, "MouseEventMethod extends SVMMethod");
MouseEventMethod.prototype.constructor = MouseEventMethod;
MouseEventMethod.prototype.$class = 
   new Class("MouseEventMethod", MouseEventMethod);

MouseEventMethod.prototype.getMouseEvent = function(svm, receiver) {
   if (receiver === null) {
      return svm.pop().getValue();
   } else {
      return receiver.getValue();
   }
};

var MouseEvent_getEventType = function() {
   MouseEventMethod.call(this);
};

MouseEvent_getEventType.prototype =
   jslib.inheritPrototype(MouseEventMethod, "MouseEvent_getEventType extends MouseEventMethod");
MouseEvent_getEventType.prototype.constructor = MouseEvent_getEventType;
MouseEvent_getEventType.prototype.$class = 
   new Class("MouseEvent_getEventType", MouseEvent_getEventType);

MouseEvent_getEventType.prototype.execute = function(svm, receiver) {
   svm.checkSignature("MouseEvent.getEventType", "");
   this.getMouseEvent(svm, receiver);
   svm.pushInteger(SJSEventClass.MOUSE_EVENT);
};

var MouseEvent_getID = function() {
   MouseEventMethod.call(this);
};

MouseEvent_getID.prototype =
   jslib.inheritPrototype(MouseEventMethod, "MouseEvent_getID extends MouseEventMethod");
MouseEvent_getID.prototype.constructor = MouseEvent_getID;
MouseEvent_getID.prototype.$class = 
   new Class("MouseEvent_getID", MouseEvent_getID);

MouseEvent_getID.prototype.execute = function(svm, receiver) {
   svm.checkSignature("MouseEvent.getID", "");
   var id = this.getMouseEvent(svm, receiver).getID();
   switch (id) {
    case MouseEvent.MOUSE_CLICKED:
      svm.pushInteger(SJSMouseEventClass.MOUSE_CLICKED);
      break;
    case MouseEvent.MOUSE_DRAGGED:
      svm.pushInteger(SJSMouseEventClass.MOUSE_DRAGGED);
      break;
    case MouseEvent.MOUSE_MOVED:
      svm.pushInteger(SJSMouseEventClass.MOUSE_MOVED);
      break;
    case MouseEvent.MOUSE_PRESSED:
      svm.pushInteger(SJSMouseEventClass.MOUSE_PRESSED);
      break;
    case MouseEvent.MOUSE_RELEASED:
      svm.pushInteger(SJSMouseEventClass.MOUSE_RELEASED);
      break;
    default:
      throw new RuntimeException("Illegal event type");
   }
};

var MouseEvent_getSource = function() {
   MouseEventMethod.call(this);
};

MouseEvent_getSource.prototype =
   jslib.inheritPrototype(MouseEventMethod, "MouseEvent_getSource extends MouseEventMethod");
MouseEvent_getSource.prototype.constructor = MouseEvent_getSource;
MouseEvent_getSource.prototype.$class = 
   new Class("MouseEvent_getSource", MouseEvent_getSource);

MouseEvent_getSource.prototype.execute = function(svm, receiver) {
   svm.checkSignature("MouseEvent.getSource", "");
   var source = this.getMouseEvent(svm, receiver).getSource();
   var v = new Value(Value.OBJECT, source);
   var className = source.$class.getName();
   className = className.substring(className.lastIndexOf(".") + 1);
   v.setClassName(className);
   svm.push(v);
};

var MouseEvent_getX = function() {
   MouseEventMethod.call(this);
};

MouseEvent_getX.prototype =
   jslib.inheritPrototype(MouseEventMethod, "MouseEvent_getX extends MouseEventMethod");
MouseEvent_getX.prototype.constructor = MouseEvent_getX;
MouseEvent_getX.prototype.$class = 
   new Class("MouseEvent_getX", MouseEvent_getX);

MouseEvent_getX.prototype.execute = function(svm, receiver) {
   svm.checkSignature("MouseEvent.getX", "");
   svm.pushDouble(this.getMouseEvent(svm, receiver).getX());
};

var MouseEvent_getY = function() {
   MouseEventMethod.call(this);
};

MouseEvent_getY.prototype =
   jslib.inheritPrototype(MouseEventMethod, "MouseEvent_getY extends MouseEventMethod");
MouseEvent_getY.prototype.constructor = MouseEvent_getY;
MouseEvent_getY.prototype.$class = 
   new Class("MouseEvent_getY", MouseEvent_getY);

MouseEvent_getY.prototype.execute = function(svm, receiver) {
   svm.checkSignature("MouseEvent.getY", "");
   svm.pushDouble(this.getMouseEvent(svm, receiver).getY());
};

var MouseEvent_MOUSE_CLICKED = function() {
   SVMConstant.call(this);
};

MouseEvent_MOUSE_CLICKED.prototype =
   jslib.inheritPrototype(SVMConstant, "MouseEvent_MOUSE_CLICKED extends SVMConstant");
MouseEvent_MOUSE_CLICKED.prototype.constructor = MouseEvent_MOUSE_CLICKED;
MouseEvent_MOUSE_CLICKED.prototype.$class = 
   new Class("MouseEvent_MOUSE_CLICKED", MouseEvent_MOUSE_CLICKED);

MouseEvent_MOUSE_CLICKED.prototype.execute = function(svm, receiver) {
   svm.checkSignature("MouseEvent.MOUSE_CLICKED", "");
   svm.pushInteger(SJSMouseEventClass.MOUSE_CLICKED);
};

var MouseEvent_MOUSE_DRAGGED = function() {
   SVMConstant.call(this);
};

MouseEvent_MOUSE_DRAGGED.prototype =
   jslib.inheritPrototype(SVMConstant, "MouseEvent_MOUSE_DRAGGED extends SVMConstant");
MouseEvent_MOUSE_DRAGGED.prototype.constructor = MouseEvent_MOUSE_DRAGGED;
MouseEvent_MOUSE_DRAGGED.prototype.$class = 
   new Class("MouseEvent_MOUSE_DRAGGED", MouseEvent_MOUSE_DRAGGED);

MouseEvent_MOUSE_DRAGGED.prototype.execute = function(svm, receiver) {
   svm.checkSignature("MouseEvent.MOUSE_DRAGGED", "");
   svm.pushInteger(SJSMouseEventClass.MOUSE_DRAGGED);
};

var MouseEvent_MOUSE_MOVED = function() {
   SVMConstant.call(this);
};

MouseEvent_MOUSE_MOVED.prototype =
   jslib.inheritPrototype(SVMConstant, "MouseEvent_MOUSE_MOVED extends SVMConstant");
MouseEvent_MOUSE_MOVED.prototype.constructor = MouseEvent_MOUSE_MOVED;
MouseEvent_MOUSE_MOVED.prototype.$class = 
   new Class("MouseEvent_MOUSE_MOVED", MouseEvent_MOUSE_MOVED);

MouseEvent_MOUSE_MOVED.prototype.execute = function(svm, receiver) {
   svm.checkSignature("MouseEvent.MOUSE_MOVED", "");
   svm.pushInteger(SJSMouseEventClass.MOUSE_MOVED);
};

var MouseEvent_MOUSE_PRESSED = function() {
   SVMConstant.call(this);
};

MouseEvent_MOUSE_PRESSED.prototype =
   jslib.inheritPrototype(SVMConstant, "MouseEvent_MOUSE_PRESSED extends SVMConstant");
MouseEvent_MOUSE_PRESSED.prototype.constructor = MouseEvent_MOUSE_PRESSED;
MouseEvent_MOUSE_PRESSED.prototype.$class = 
   new Class("MouseEvent_MOUSE_PRESSED", MouseEvent_MOUSE_PRESSED);

MouseEvent_MOUSE_PRESSED.prototype.execute = function(svm, receiver) {
   svm.checkSignature("MouseEvent.MOUSE_PRESSED", "");
   svm.pushInteger(SJSMouseEventClass.MOUSE_PRESSED);
};

var MouseEvent_MOUSE_RELEASED = function() {
   SVMConstant.call(this);
};

MouseEvent_MOUSE_RELEASED.prototype =
   jslib.inheritPrototype(SVMConstant, "MouseEvent_MOUSE_RELEASED extends SVMConstant");
MouseEvent_MOUSE_RELEASED.prototype.constructor = MouseEvent_MOUSE_RELEASED;
MouseEvent_MOUSE_RELEASED.prototype.$class = 
   new Class("MouseEvent_MOUSE_RELEASED", MouseEvent_MOUSE_RELEASED);

MouseEvent_MOUSE_RELEASED.prototype.execute = function(svm, receiver) {
   svm.checkSignature("MouseEvent.MOUSE_RELEASED", "");
   svm.pushInteger(SJSMouseEventClass.MOUSE_RELEASED);
};

var MouseEvent_TYPE = function() {
   SVMConstant.call(this);
};

MouseEvent_TYPE.prototype =
   jslib.inheritPrototype(SVMConstant, "MouseEvent_TYPE extends SVMConstant");
MouseEvent_TYPE.prototype.constructor = MouseEvent_TYPE;
MouseEvent_TYPE.prototype.$class = 
   new Class("MouseEvent_TYPE", MouseEvent_TYPE);

MouseEvent_TYPE.prototype.execute = function(svm, receiver) {
   svm.checkSignature("MouseEvent.TYPE", "");
   svm.pushInteger(SJSEventClass.MOUSE_EVENT);
};


/* SJSPackage_graphics.js */

var SJSPackage_graphics = function() {
   SVMPackage.call(this);
};

SJSPackage_graphics.prototype =
   jslib.inheritPrototype(SVMPackage, "SJSPackage_graphics extends SVMPackage");
SJSPackage_graphics.prototype.constructor = SJSPackage_graphics;
SJSPackage_graphics.prototype.$class = 
   new Class("SJSPackage_graphics", SJSPackage_graphics);

SJSPackage_graphics.prototype.defineClasses = function(svm) {
   SVMClass.defineClass(svm, "Color", new SJSColorClass());
   SVMClass.defineClass(svm, "GArc", new SJSGArcClass());
   SVMClass.defineClass(svm, "GCompound", new SJSGCompoundClass());
   SVMClass.defineClass(svm, "GDimension", new SJSGDimensionClass());
   SVMClass.defineClass(svm, "GImage", new SJSGImageClass());
   SVMClass.defineClass(svm, "GLabel", new SJSGLabelClass());
   SVMClass.defineClass(svm, "GLine", new SJSGLineClass());
   SVMClass.defineClass(svm, "GObject", new SJSGObjectClass());
   SVMClass.defineClass(svm, "GOval", new SJSGOvalClass());
   SVMClass.defineClass(svm, "GPoint", new SJSGPointClass());
   SVMClass.defineClass(svm, "GPolygon", new SJSGPolygonClass());
   SVMClass.defineClass(svm, "GRect", new SJSGRectClass());
   SVMClass.defineClass(svm, "GRectangle", new SJSGRectangleClass());
   SVMClass.defineClass(svm, "GTransform", new SJSGTransformClass());
   SVMClass.defineClass(svm, "GWindow", new SJSGWindowClass());
   SVMClass.defineClass(svm, "KeyEvent", new SJSKeyEventClass());
   SVMClass.defineClass(svm, "MouseEvent", new SJSMouseEventClass());
};


/* Exports */

return {
   SJSColorClass : SJSColorClass,
   SJSGArcClass : SJSGArcClass,
   SJSGCanvas : SJSGCanvas,
   SJSGCompoundClass : SJSGCompoundClass,
   SJSGDimensionClass : SJSGDimensionClass,
   SJSGImageClass : SJSGImageClass,
   SJSGLabelClass : SJSGLabelClass,
   SJSGLineClass : SJSGLineClass,
   SJSGObjectClass : SJSGObjectClass,
   SJSGOvalClass : SJSGOvalClass,
   SJSGPointClass : SJSGPointClass,
   SJSGPolygonClass : SJSGPolygonClass,
   SJSGRectClass : SJSGRectClass,
   SJSGRectangleClass : SJSGRectangleClass,
   SJSGTransformClass : SJSGTransformClass,
   SJSGWindowClass : SJSGWindowClass,
   SJSKeyEventClass : SJSKeyEventClass,
   SJSMouseEventClass : SJSMouseEventClass,
   SJSPackage_graphics : SJSPackage_graphics
};

});
