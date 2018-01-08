/*
 * File: exptrace.js
 * Created on Sat Dec 27 10:19:26 PST 2014 by java2js
 * --------------------------------------------------
 * This file was generated mechanically by the java2js utility.
 * Permanent edits must be made in the Java file.
 */

define([ "jslib",
         "edu/stanford/cs/animation",
         "edu/stanford/cs/exp",
         "edu/stanford/cs/graphics",
         "edu/stanford/cs/java2js",
         "edu/stanford/cs/jsconsole",
         "edu/stanford/cs/languages/js",
         "edu/stanford/cs/parser",
         "edu/stanford/cs/vm",
         "edu/stanford/cs/xparser",
         "java/awt",
         "java/lang",
         "java/util" ],

function(jslib,
         edu_stanford_cs_animation,
         edu_stanford_cs_exp,
         edu_stanford_cs_graphics,
         edu_stanford_cs_java2js,
         edu_stanford_cs_jsconsole,
         edu_stanford_cs_languages_js,
         edu_stanford_cs_parser,
         edu_stanford_cs_vm,
         edu_stanford_cs_xparser,
         java_awt,
         java_lang,
         java_util) {

/* Imports */

var inheritPrototype = jslib.inheritPrototype;
var newArray = jslib.newArray;
var toInt = jslib.toInt;
var toStr = jslib.toStr;
var Appear = edu_stanford_cs_animation.Appear;
var Timeline = edu_stanford_cs_animation.Timeline;
var Constant = edu_stanford_cs_exp.Constant;
var EvalContext = edu_stanford_cs_exp.EvalContext;
var Expression = edu_stanford_cs_exp.Expression;
var Value = edu_stanford_cs_exp.Value;
var GCanvas = edu_stanford_cs_graphics.GCanvas;
var GLabel = edu_stanford_cs_graphics.GLabel;
var GLine = edu_stanford_cs_graphics.GLine;
var JSElementList = edu_stanford_cs_java2js.JSElementList;
var JSProgram = edu_stanford_cs_java2js.JSProgram;
var JSConsole = edu_stanford_cs_jsconsole.JSConsole;
var JSParser = edu_stanford_cs_languages_js.JSParser;
var JSVM = edu_stanford_cs_languages_js.JSVM;
var Operator = edu_stanford_cs_parser.Operator;
var VM = edu_stanford_cs_vm.VM;
var XParser = edu_stanford_cs_xparser.XParser;
var Color = java_awt.Color;
var Dimension = java_awt.Dimension;
var Font = java_awt.Font;
var Class = java_lang.Class;
var RuntimeException = java_lang.RuntimeException;
var System = java_lang.System;
var ArrayList = java_util.ArrayList;

/* ETC.js */

var ETC = function() {
   /* Empty */
};

ETC.TRACE_FONT = Font.decode("Monospaced-bold-24");
ETC.TERM_SEP = 25;
ETC.TRACE_SEP = 70;
ETC.TOP_DY = 22;
ETC.BOTTOM_DY = 9;

/* ETCanvas.js */

var ETCanvas = function() {
   GCanvas.call(this);
   this.setBackground(Color.WHITE);
   this.parser = new JSParser();
   this.vm = new JSVM();
   this.tl = new Timeline(this);
};

ETCanvas.prototype = 
   jslib.inheritPrototype(GCanvas, "ETCanvas extends GCanvas");
ETCanvas.prototype.constructor = ETCanvas;
ETCanvas.prototype.$class = 
   new Class("ETCanvas", ETCanvas);

ETCanvas.prototype.getTimeline = function() {
   return this.tl;
};

ETCanvas.prototype.traceExpression = function(str) {
   this.parser.setInput(str);
   var exp = this.parser.readE(0);
   var t = new ETParseTree(exp);
   t.eval(this.vm);
   t.embed(this);
   this.repaint();
   this.tl.start();
};


/* ETParseTree.js */

var ETParseTree = function(exp) {
   GLabel.call(this, "");
   this.setFont(ETC.TRACE_FONT);
   this.exp = exp;
   this.children = new ArrayList();
   if (exp.getType() === Expression.COMPOUND) {
      var fn = exp.getFunction();
      var args = exp.getArgs();
      if (fn.isOperator()) {
         this.children.add(new ETParseTree(args[0]));
         this.children.add(new ETParseTree(fn));
         this.children.add(new ETParseTree(args[1]));
      } else {
         throw new RuntimeException("Only operators are implemented");
      }
   } else if (exp.isOperator()) {
      this.setLabel(exp.getName());
   }
};

ETParseTree.prototype = 
   jslib.inheritPrototype(GLabel, "ETParseTree extends GLabel");
ETParseTree.prototype.constructor = ETParseTree;
ETParseTree.prototype.$class = 
   new Class("ETParseTree", ETParseTree);

ETParseTree.prototype.eval = function(ec) {
   var value = null;
   if (this.exp.getType() === Expression.COMPOUND) {
      var fn = this.children.get(1).exp;
      var values = jslib.newArray(2);
      values[0] = new Constant(this.children.get(0).eval(ec));
      values[1] = new Constant(this.children.get(2).eval(ec));
      value = (fn).apply(ec, values);
   } else {
      value = this.exp.eval(ec);
   }
   this.setLabel(value.toString());
   return value;
};

ETParseTree.prototype.embed = function(canvas) {
   var canvasWidth = canvas.getWidth();
   var canvasHeight = canvas.getHeight();
   var treeWidth = this.getTreeWidth();
   var treeHeight = ETC.TRACE_SEP * this.countLevels();
   var nextT = new NodePosition((canvasWidth - treeWidth) / 2, (canvasHeight + treeHeight) / 2);
   this.layoutTree(nextT, canvas);
};

ETParseTree.prototype.layoutTree = function(nextT, canvas) {
   if (this.children.isEmpty()) {
      this.setLocation(nextT.x, nextT.y);
      canvas.add(this);
      var x = nextT.x;
      var w = this.getWidth();
      nextT.x += w;
      return new NodePosition(x + w / 2, nextT.y);
   } else {
      var p0 = this.children.get(0).layoutTree(nextT, canvas);
      nextT.x += ETC.TERM_SEP;
      var p1 = this.children.get(1).layoutTree(nextT, canvas);
      nextT.x += ETC.TERM_SEP;
      var p2 = this.children.get(2).layoutTree(nextT, canvas);
      var x = p1.x;
      var y = Math.min(p0.y, p2.y) - ETC.TRACE_SEP;
      this.setLocation(x - this.getWidth() / 2, y);
      this.setVisible(false);
      canvas.add(this);
      canvas.getTimeline().add(new Appear(this, "onClick"));
      this.addConnector(canvas, x, y, p0.x, p0.y);
      this.addConnector(canvas, x, y, p1.x, p1.y);
      this.addConnector(canvas, x, y, p2.x, p2.y);
      return new NodePosition(x, y);
   }
};

ETParseTree.prototype.addConnector = function(canvas, x0, y0, x1, y1) {
   var dx = x1 - x0;
   var dy = y1 - y0;
   var xStart = x0 + dx * ETC.BOTTOM_DY / dy;
   var yStart = y0 + ETC.BOTTOM_DY;
   var xFinish = x1 - dx * ETC.TOP_DY / dy;
   var yFinish = y1 - ETC.TOP_DY;
   var connector = new GLine(xStart, yStart, xFinish, yFinish);
   connector.setVisible(false);
   canvas.add(connector);
   canvas.getTimeline().add(new Appear(connector, "withPrevious"));
};

ETParseTree.prototype.getTreeWidth = function() {
   var width = this.getWidth();
   if (!this.children.isEmpty()) {
      var w = -ETC.TERM_SEP;
      var el = new JSElementList(this.children);
      for (var ei = 0; ei < el.size(); ei++) {
         var t = el.get(ei);
         w += t.getTreeWidth() + ETC.TERM_SEP;
      }
      if (w > width) width = w;
   }
   return width;
};

ETParseTree.prototype.countLevels = function() {
   if (this.children.isEmpty()) return 1;
   var h = 0;
   var el = new JSElementList(this.children);
   for (var ei = 0; ei < el.size(); ei++) {
      var t = el.get(ei);
      h = Math.max(h, t.countLevels());
   }
   return h + 1;
};

ETParseTree.prototype.debugPrint = function() {
   this.debugPrintWithPrefix("  ");
};

ETParseTree.prototype.debugPrintWithPrefix = function(prefix) {
   println(prefix + this.getLabel());
   var el = new JSElementList(this.children);
   for (var ei = 0; ei < el.size(); ei++) {
      var t = el.get(ei);
      t.debugPrintWithPrefix(prefix + "  ");
   }
};

var NodePosition = function(x, y) {
   this.x = x;
   this.y = y;
};


/* ExpTrace.js */

var ExpTrace = function() {
   JSProgram.call(this);
   this.setTitle("ExpTrace");
   this.canvas = new ETCanvas();
   this.add(this.canvas, "canvas");
   this.setPreferredSize(new Dimension(800, 600));
   this.pack();
   this.setVisible(true);
};

ExpTrace.prototype = 
   jslib.inheritPrototype(JSProgram, "ExpTrace extends JSProgram");
ExpTrace.prototype.constructor = ExpTrace;
ExpTrace.prototype.$class = 
   new Class("ExpTrace", ExpTrace);

ExpTrace.prototype.run = function() {
   this.canvas.traceExpression("9 + 7 * 5 - 3 + 1");
};

ExpTrace.main = function(args) {
   new ExpTrace().start();
};


/* Exports */

return {
   ETC : ETC,
   ETCanvas : ETCanvas,
   ETParseTree : ETParseTree,
   ExpTrace : ExpTrace
};

});
