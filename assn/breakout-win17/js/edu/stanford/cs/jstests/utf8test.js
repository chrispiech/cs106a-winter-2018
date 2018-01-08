/*
 * File: utf8test.js
 * Created on Tue Jan 20 15:47:30 PST 2015 by java2js
 * --------------------------------------------------
 * This file was generated mechanically by the java2js utility.
 * Permanent edits must be made in the Java file.
 */

define([ "jslib",
         "edu/stanford/cs/java2js",
         "edu/stanford/cs/jsconsole",
         "edu/stanford/cs/utf8",
         "java/awt",
         "java/lang" ],

function(jslib,
         edu_stanford_cs_java2js,
         edu_stanford_cs_jsconsole,
         edu_stanford_cs_utf8,
         java_awt,
         java_lang) {

/* Imports */

var inheritPrototype = jslib.inheritPrototype;
var newArray = jslib.newArray;
var toInt = jslib.toInt;
var toStr = jslib.toStr;
var JSProgram = edu_stanford_cs_java2js.JSProgram;
var JSConsole = edu_stanford_cs_jsconsole.JSConsole;
var UTF8 = edu_stanford_cs_utf8.UTF8;
var Dimension = java_awt.Dimension;
var Font = java_awt.Font;
var Class = java_lang.Class;

/* JSUTF8Test.js */

var JSUTF8Test = function() {
   JSProgram.call(this);
   this.setTitle("JSUTF8Test");
   this.console = new JSConsole();
   this.console.setFont(Font.decode("Courier New-Bold-16"));
   this.add(this.console, "console");
   this.setPreferredSize(new Dimension(800, 600));
   this.pack();
   this.setVisible(true);
};

JSUTF8Test.prototype = 
   jslib.inheritPrototype(JSProgram, "JSUTF8Test extends JSProgram");
JSUTF8Test.prototype.constructor = JSUTF8Test;
JSUTF8Test.prototype.$class = 
   new Class("JSUTF8Test", JSUTF8Test);

JSUTF8Test.prototype.run = function() {
   var swedish = "r\u00e4ksm\u00f6rg\u00e5s";
   var array = UTF8.encode(swedish);
   for (var i = 0; i < array.length; i++) {
      this.console.println("array[" + i + "] = " + array[i]);
   }
   var str = UTF8.decode(array);
   this.console.println(swedish + "(" + swedish.length + ") -> " +
   str + "(" + str.length + ")");
};

JSUTF8Test.main = function(args) {
   new JSUTF8Test().run();
};


/* Exports */

return {
   JSUTF8Test : JSUTF8Test
};

});
