/*
 * File: jshttp.js
 * Created on Thu Sep 04 10:51:21 BST 2014 by java2js
 * --------------------------------------------------
 * This file was generated mechanically by the java2js utility.
 * Permanent edits must be made in the Java file.
 */

define([ "jslib",
         "edu/stanford/cs/command",
         "edu/stanford/cs/java2js",
         "edu/stanford/cs/jsconsole",
         "edu/stanford/cs/tokenscanner",
         "java/awt",
         "java/lang" ],

function(jslib,
         edu_stanford_cs_command,
         edu_stanford_cs_java2js,
         edu_stanford_cs_jsconsole,
         edu_stanford_cs_tokenscanner,
         java_awt,
         java_lang) {

/* Imports */

var inheritPrototype = jslib.inheritPrototype;
var newArray = jslib.newArray;
var toInt = jslib.toInt;
var toStr = jslib.toStr;
var Command = edu_stanford_cs_command.Command;
var CommandLoop = edu_stanford_cs_command.CommandLoop;
var HelpCommand = edu_stanford_cs_command.HelpCommand;
var QuitCommand = edu_stanford_cs_command.QuitCommand;
var ScriptCommand = edu_stanford_cs_command.ScriptCommand;
var JSElementList = edu_stanford_cs_java2js.JSElementList;
var JSErrorEvent = edu_stanford_cs_java2js.JSErrorEvent;
var JSFile = edu_stanford_cs_java2js.JSFile;
var JSProgram = edu_stanford_cs_java2js.JSProgram;
var JSConsole = edu_stanford_cs_jsconsole.JSConsole;
var TokenScanner = edu_stanford_cs_tokenscanner.TokenScanner;
var Dimension = java_awt.Dimension;
var Font = java_awt.Font;
var ActionEvent = java_awt.ActionEvent;
var ActionListener = java_awt.ActionListener;
var Class = java_lang.Class;

/* JSHttpTest.js */

var JSHttpTest = function() {
   JSProgram.call(this);
   this.setTitle("JSHttpTest");
   this.console = new JSConsole();
   this.console.setFont(Font.decode("Courier New-Bold-16"));
   this.add(this.console, "console");
   this.commandLoop = new JSHttpCommandLoop(this, this.console);
   this.setPreferredSize(new Dimension(800, 600));
   this.pack();
   this.setVisible(true);
};

JSHttpTest.prototype = 
   jslib.inheritPrototype(JSProgram, "JSHttpTest extends JSProgram");
JSHttpTest.prototype.constructor = JSHttpTest;
JSHttpTest.prototype.$class = 
   new Class("JSHttpTest", JSHttpTest);

JSHttpTest.prototype.run = function() {
   this.commandLoop.start();
};

JSHttpTest.prototype.getConsole = function() {
   return this.console;
};

JSHttpTest.main = function(args) {
   new JSHttpTest().run();
};

var JSHttpCommandLoop = function(app, console) {
   CommandLoop.call(this, console);
   this.app = app;
   this.addCommand("quit", new QuitCommand());
   this.addCommand("get", new GetCommand());
   this.addCommand("ls", new LSCommand());
   this.addCommand("help", new HelpCommand());
   this.addCommand("script", new ScriptCommand());
};

JSHttpCommandLoop.prototype = 
   jslib.inheritPrototype(CommandLoop, "JSHttpCommandLoop extends CommandLoop");
JSHttpCommandLoop.prototype.constructor = JSHttpCommandLoop;
JSHttpCommandLoop.prototype.$class = 
   new Class("JSHttpCommandLoop", JSHttpCommandLoop);

JSHttpCommandLoop.prototype.getApplication = function() {
   return this.app;
};

var LSCommand = function() {
   Command.call(this);
};

LSCommand.prototype =
   jslib.inheritPrototype(Command, "LSCommand extends Command");
LSCommand.prototype.constructor = LSCommand;
LSCommand.prototype.$class = 
   new Class("LSCommand", LSCommand);

LSCommand.prototype.getHelp = function() {
   return "ls dir -- Loads and prints the contents of the remote directory";
};

LSCommand.prototype.execute = function(cl, scanner) {
   var console = cl.getConsole();
   var filename = this.scanFilename(scanner);
   new JSFile(LSCommand.ROOT + filename).read(new HttpReader(cl, true));
   return false;
};

LSCommand.ROOT = "http://cs.stanford.edu/~eroberts/demos/";
var GetCommand = function() {
   Command.call(this);
};

GetCommand.prototype =
   jslib.inheritPrototype(Command, "GetCommand extends Command");
GetCommand.prototype.constructor = GetCommand;
GetCommand.prototype.$class = 
   new Class("GetCommand", GetCommand);

GetCommand.prototype.getHelp = function() {
   return "get file -- Loads and prints the contents of the remote file";
};

GetCommand.prototype.execute = function(cl, scanner) {
   var console = cl.getConsole();
   var filename = this.scanFilename(scanner);
   new JSFile(GetCommand.ROOT + filename).read(new HttpReader(cl, false));
   return false;
};

GetCommand.ROOT = "http://cs.stanford.edu/~eroberts/demos/";
var HttpReader = function(cl, lsFlag) {
   this.cl = cl;
   this.lsFlag = lsFlag;
};

HttpReader.prototype.actionPerformed = function(e) {
   var console = this.cl.getConsole();
   if (e instanceof JSErrorEvent) {
      console.showErrorMessage(e.getActionCommand());
   } else if (this.lsFlag) {
      var el = new JSElementList(JSFile.parseHTMLDirectory(e.getActionCommand()));
      for (var ei = 0; ei < el.size(); ei++) {
         var line = el.get(ei);
         console.println(line);
      }
   } else {
      console.print(e.getActionCommand());
   }
   this.cl.resume();
};


/* Exports */

return {
   JSHttpTest : JSHttpTest
};

});
