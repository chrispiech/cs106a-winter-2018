/*
 * File: jslexicontest.js
 * Created on Mon Jan 19 08:26:37 PST 2015 by java2js
 * --------------------------------------------------
 * This file was generated mechanically by the java2js utility.
 * Permanent edits must be made in the Java file.
 */

define([ "jslib",
         "edu/stanford/cs/java2js",
         "edu/stanford/cs/jsconsole",
         "edu/stanford/cs/lexicon",
         "java/awt",
         "java/lang" ],

function(jslib,
         edu_stanford_cs_java2js,
         edu_stanford_cs_jsconsole,
         edu_stanford_cs_lexicon,
         java_awt,
         java_lang) {

/* Imports */

var inheritPrototype = jslib.inheritPrototype;
var newArray = jslib.newArray;
var toInt = jslib.toInt;
var toStr = jslib.toStr;
var JSElementList = edu_stanford_cs_java2js.JSElementList;
var JSProgram = edu_stanford_cs_java2js.JSProgram;
var JSConsole = edu_stanford_cs_jsconsole.JSConsole;
var Lexicon = edu_stanford_cs_lexicon.Lexicon;
var Dimension = java_awt.Dimension;
var Font = java_awt.Font;
var Class = java_lang.Class;

/* JSLexiconTest.js */

var JSLexiconTest = function() {
   JSProgram.call(this);
   this.setTitle("JSLexiconTest");
   this.console = new JSConsole();
   this.console.setFont(Font.decode("Courier New-Bold-16"));
   this.add(this.console, "console");
   this.setPreferredSize(new Dimension(800, 600));
   this.pack();
   this.setVisible(true);
};

JSLexiconTest.prototype = 
   jslib.inheritPrototype(JSProgram, "JSLexiconTest extends JSProgram");
JSLexiconTest.prototype.constructor = JSLexiconTest;
JSLexiconTest.prototype.$class = 
   new Class("JSLexiconTest", JSLexiconTest);

JSLexiconTest.prototype.run = function() {
   var english = new Lexicon("EnglishWords.txt");
   var el = new JSElementList(english);
   for (var ei = 0; ei < el.size(); ei++) {
      var word = el.get(ei);
      if (english.contains("s" + word) && english.contains(word + "s")) {
         this.console.println(word);
      }
   }
};

JSLexiconTest.main = function(args) {
   new JSLexiconTest().run();
};


/* Exports */

return {
   JSLexiconTest : JSLexiconTest
};

});
