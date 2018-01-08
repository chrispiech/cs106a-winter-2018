/*
 * File: jslayout.js
 * Created on Sat Aug 02 08:37:49 PDT 2014 by java2js
 * --------------------------------------------------
 * This file was generated mechanically by the java2js utility.
 * Permanent edits must be made in the Java file.
 */

define([ "jslib",
         "edu/stanford/cs/java2js",
         "java/awt" ],

function(jslib,
         edu_stanford_cs_java2js,
         java_awt) {

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
var JSCanvas = edu_stanford_cs_java2js.JSCanvas;
var JSPanel = edu_stanford_cs_java2js.JSPanel;
var JSProgram = edu_stanford_cs_java2js.JSProgram;
var BorderLayout = java_awt.BorderLayout;
var Color = java_awt.Color;
var Dimension = java_awt.Dimension;

/* JSLayoutTest.js */

var JSLayoutTest = function() {
   JSProgram.call(this);
   this.setTitle("JSLayoutTest");
   var panel = new JSPanel();
   panel.setLayout(new BorderLayout());
   panel.add(new ColorCanvas(Color.RED), BorderLayout.NORTH);
   panel.add(new ColorCanvas(Color.BLUE), BorderLayout.EAST);
   panel.add(new ColorCanvas(Color.MAGENTA), BorderLayout.SOUTH);
   panel.add(new ColorCanvas(Color.CYAN), BorderLayout.WEST);
   var center = new ColorCanvas(Color.YELLOW);
   center.setPreferredSize(new Dimension(500, 250));
   panel.add(center, BorderLayout.CENTER);
   this.add(panel, "BorderLayout");
   this.pack();
   this.setVisible(true);
};

JSLayoutTest.prototype =
   jslib.inheritPrototype(JSProgram, "JSLayoutTest extends JSProgram");
JSLayoutTest.prototype.constructor = JSLayoutTest;

JSLayoutTest.prototype.run = function() {
   this.repaint();
};

JSLayoutTest.main = function(args) {
   new JSLayoutTest().run();
};

var ColorCanvas = function(color) {
   JSCanvas.call(this);
   this.setBackground(color);
   this.setPreferredSize(new Dimension(10, 10));
};

ColorCanvas.prototype =
   jslib.inheritPrototype(JSCanvas, "ColorCanvas extends JSCanvas");
ColorCanvas.prototype.constructor = ColorCanvas;


/* Exports */

return {
   JSLayoutTest : JSLayoutTest
};

});
