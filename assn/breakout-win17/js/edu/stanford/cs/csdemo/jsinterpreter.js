/*
 * File: jsinterpreter.js
 * Created on Sat Jan 31 20:57:09 PST 2015 by java2js
 * --------------------------------------------------
 * This file was generated mechanically by the java2js utility.
 * Permanent edits must be made in the Java file.
 */

define([ "jslib",
         "edu/stanford/cs/interpreter",
         "edu/stanford/cs/jsconsole",
         "edu/stanford/cs/languages/js",
         "java/awt",
         "java/lang" ],

function(jslib,
         edu_stanford_cs_interpreter,
         edu_stanford_cs_jsconsole,
         edu_stanford_cs_languages_js,
         java_awt,
         java_lang) {

/* Imports */

var inheritPrototype = jslib.inheritPrototype;
var newArray = jslib.newArray;
var toInt = jslib.toInt;
var toStr = jslib.toStr;
var Interpreter = edu_stanford_cs_interpreter.Interpreter;
var JSConsole = edu_stanford_cs_jsconsole.JSConsole;
var JSParser = edu_stanford_cs_languages_js.JSParser;
var JSVM = edu_stanford_cs_languages_js.JSVM;
var Dimension = java_awt.Dimension;
var Font = java_awt.Font;
var Class = java_lang.Class;

/* JSInterpreter.js */

var JSInterpreter = function() {
   Interpreter.call(this, new JSParser(), new JSVM(), new JSConsole());
   var console = this.getConsole();
   console.setFont(Font.decode("Courier New-Bold-18"));
   this.add(console, "console");
   this.setPreferredSize(new Dimension(800, 500));
   this.pack();
   this.setVisible(true);
};

JSInterpreter.prototype = 
   jslib.inheritPrototype(Interpreter, "JSInterpreter extends Interpreter");
JSInterpreter.prototype.constructor = JSInterpreter;
JSInterpreter.prototype.$class = 
   new Class("JSInterpreter", JSInterpreter);

JSInterpreter.main = function(args) {
   new JSInterpreter().start();
};


/* Exports */

return {
   JSInterpreter : JSInterpreter
};

});
