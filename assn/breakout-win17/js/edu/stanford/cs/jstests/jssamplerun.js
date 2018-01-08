/*
 * File: jssamplerun.js
 * Created on Sun Jan 18 08:47:08 PST 2015 by java2js
 * --------------------------------------------------
 * This file was generated mechanically by the java2js utility.
 * Permanent edits must be made in the Java file.
 */

define([ "jslib",
         "edu/stanford/cs/java2js",
         "edu/stanford/cs/jsconsole",
         "java/awt",
         "java/lang" ],

function(jslib,
         edu_stanford_cs_java2js,
         edu_stanford_cs_jsconsole,
         java_awt,
         java_lang) {

/* Imports */

var inheritPrototype = jslib.inheritPrototype;
var newArray = jslib.newArray;
var toInt = jslib.toInt;
var toStr = jslib.toStr;
var JSProgram = edu_stanford_cs_java2js.JSProgram;
var JSConsole = edu_stanford_cs_jsconsole.JSConsole;
var Dimension = java_awt.Dimension;
var Font = java_awt.Font;
var ActionEvent = java_awt.ActionEvent;
var ActionListener = java_awt.ActionListener;
var Class = java_lang.Class;

/* JSSampleRunTest.js */

var JSSampleRunTest = function() {
   JSProgram.call(this);
   this.setTitle("JSSampleRunTest");
   this.console = new JSConsole();
   this.console.setFont(Font.decode("Courier New-Bold-16"));
   this.add(this.console, "console");
   this.setPreferredSize(new Dimension(800, 600));
   this.pack();
   this.setVisible(true);
};

JSSampleRunTest.prototype = 
   jslib.inheritPrototype(JSProgram, "JSSampleRunTest extends JSProgram");
JSSampleRunTest.prototype.constructor = JSSampleRunTest;
JSSampleRunTest.prototype.$class = 
   new Class("JSSampleRunTest", JSSampleRunTest);

JSSampleRunTest.prototype.run = function() {
   this.console.println("test");
};

JSSampleRunTest.prototype.getConsole = function() {
   return this.console;
};

JSSampleRunTest.main = function(args) {
   new JSSampleRunTest().run();
};


/* Exports */

return {
   JSSampleRunTest : JSSampleRunTest
};

});
