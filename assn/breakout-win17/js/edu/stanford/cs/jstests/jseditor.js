/*
 * File: jseditor.js
 * Created on Fri Aug 15 23:42:12 BST 2014 by java2js
 * --------------------------------------------------
 * This file was generated mechanically by the java2js utility.
 * Permanent edits must be made in the Java file.
 */

define([ "jslib",
         "edu/stanford/cs/command",
         "edu/stanford/cs/java2js",
         "edu/stanford/cs/jseditor",
         "edu/stanford/cs/tokenscanner",
         "java/awt" ],

function(jslib,
         edu_stanford_cs_command,
         edu_stanford_cs_java2js,
         edu_stanford_cs_jseditor,
         edu_stanford_cs_tokenscanner,
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
var Command = edu_stanford_cs_command.Command;
var CommandLoop = edu_stanford_cs_command.CommandLoop;
var DebugCommand = edu_stanford_cs_command.DebugCommand;
var HelpCommand = edu_stanford_cs_command.HelpCommand;
var QuitCommand = edu_stanford_cs_command.QuitCommand;
var ScriptCommand = edu_stanford_cs_command.ScriptCommand;
var ActionError = edu_stanford_cs_java2js.ActionError;
var JSConsole = edu_stanford_cs_java2js.JSConsole;
var JSFile = edu_stanford_cs_java2js.JSFile;
var JSProgram = edu_stanford_cs_java2js.JSProgram;
var JSERange = edu_stanford_cs_jseditor.JSERange;
var JSEditor = edu_stanford_cs_jseditor.JSEditor;
var TokenScanner = edu_stanford_cs_tokenscanner.TokenScanner;
var Dimension = java_awt.Dimension;
var Font = java_awt.Font;
var Point = java_awt.Point;
var ActionEvent = java_awt.ActionEvent;
var ActionListener = java_awt.ActionListener;

/* JSEditorTest.js */

var JSEditorTest = function() {
   JSProgram.call(this);
   this.setTitle("JSEditorTest");
   this.console = new JSConsole();
   this.editor = new JSEditor();
   this.console.setFont(Font.decode("Courier New-Bold-16"));
   this.editor.setFont(Font.decode("Courier New-Bold-16"));
   this.add(this.console, "console");
   this.add(this.editor, "editor");
   this.commandLoop = new JSEditorTestCommandLoop(this, this.console);
   this.setPreferredSize(new Dimension(1200, 600));
   this.pack();
   this.setVisible(true);
};

JSEditorTest.prototype =
   jslib.inheritPrototype(JSProgram, "JSEditorTest extends JSProgram");
JSEditorTest.prototype.constructor = JSEditorTest;

JSEditorTest.prototype.run = function() {
   this.commandLoop.start();
};

JSEditorTest.prototype.getEditor = function() {
   return this.editor;
};

JSEditorTest.prototype.getConsole = function() {
   return this.console;
};

JSEditorTest.main = function(args) {
   new JSEditorTest().run();
};

var JSEditorTestCommandLoop = function(app, console) {
   CommandLoop.call(this, console);
   this.app = app;
   this.addCommand("load", new LoadCommand());
   this.addCommand("getLine", new GetLineCommand());
   this.addCommand("getText", new GetTextCommand());
   this.addCommand("jump", new JumpCommand());
   this.addCommand("where", new WhereCommand());
   this.addCommand("find", new FindCommand());
   this.addCommand("offsetToPoint", new OffsetToPointCommand());
   this.addCommand("pointToOffset", new PointToOffsetCommand());
   this.addCommand("quit", new QuitCommand());
   this.addCommand("help", new HelpCommand());
   this.addCommand("debug", new DebugCommand());
   this.addCommand("script", new ScriptCommand());
};

JSEditorTestCommandLoop.prototype =
   jslib.inheritPrototype(CommandLoop, "JSEditorTestCommandLoop extends CommandLoop");
JSEditorTestCommandLoop.prototype.constructor = JSEditorTestCommandLoop;

JSEditorTestCommandLoop.prototype.getApplication = function() {
   return this.app;
};

JSEditorTestCommandLoop.prototype.getEditor = function() {
   return this.app.getEditor();
};

var GetTextCommand = function() {
   Command.call(this);
};

GetTextCommand.prototype.getHelp = function() {
   return "getText -- Prints the text in the editor buffer";
};

GetTextCommand.prototype =
   jslib.inheritPrototype(Command, "GetTextCommand extends Command");
GetTextCommand.prototype.constructor = GetTextCommand;

GetTextCommand.prototype.execute = function(cl, scanner) {
   var console = cl.getConsole();
   var editor = (cl).getEditor();
   console.print(editor.getText());
   return true;
};

var GetLineCommand = function() {
   Command.call(this);
};

GetLineCommand.prototype.getHelp = function() {
   return "getLine k -- Prints the text of line k";
};

GetLineCommand.prototype =
   jslib.inheritPrototype(Command, "GetLineCommand extends Command");
GetLineCommand.prototype.constructor = GetLineCommand;

GetLineCommand.prototype.execute = function(cl, scanner) {
   var console = cl.getConsole();
   var editor = (cl).getEditor();
   var k = Integer.parseInt(scanner.nextToken());
   console.println(editor.getLine(k));
   return true;
};

var WhereCommand = function() {
   Command.call(this);
};

WhereCommand.prototype.getHelp = function() {
   return "where -- Prints location information";
};

WhereCommand.prototype =
   jslib.inheritPrototype(Command, "WhereCommand extends Command");
WhereCommand.prototype.constructor = WhereCommand;

WhereCommand.prototype.execute = function(cl, scanner) {
   var console = cl.getConsole();
   var editor = (cl).getEditor();
   var offset = editor.getCursorPosition();
   var lineNumber = editor.getLineNumber(offset);
   var range = editor.getLineRange(lineNumber);
   console.println("cursor = " + offset + ":" + lineNumber +
   " [" +  range.getStart() + "-" + range.getEnd() + "]");
   return true;
};

var FindCommand = function() {
   Command.call(this);
};

FindCommand.prototype.getHelp = function() {
   return "find \"str\" -- Find next occurrence of str";
};

FindCommand.prototype =
   jslib.inheritPrototype(Command, "FindCommand extends Command");
FindCommand.prototype.constructor = FindCommand;

FindCommand.prototype.execute = function(cl, scanner) {
   var console = cl.getConsole();
   var editor = (cl).getEditor();
   var str = scanner.nextToken();
   if (jslib.startsWith(str, "\"")) str = scanner.getStringValue(str);
   var text = editor.getText();
   var index = text.indexOf(str, editor.getCursorPosition());
   if (index === -1) {
      console.println("Not found");
   } else {
      if (!JSProgram.isJavaScript()) editor.requestFocus();
      editor.select(index, index + str.length);
      if (!JSProgram.isJavaScript()) console.requestFocus();
   }
   return true;
};

var JumpCommand = function() {
   Command.call(this);
};

JumpCommand.prototype.getHelp = function() {
   return "jump n -- Jumps to offset position n";
};

JumpCommand.prototype =
   jslib.inheritPrototype(Command, "JumpCommand extends Command");
JumpCommand.prototype.constructor = JumpCommand;

JumpCommand.prototype.execute = function(cl, scanner) {
   var editor = (cl).getEditor();
   var token = scanner.nextToken();
   var offset = (token.length === 0) ? 0 : Integer.parseInt(token);
   editor.setCursorPosition(offset);
   return true;
};

var OffsetToPointCommand = function() {
   Command.call(this);
};

OffsetToPointCommand.prototype.getHelp = function() {
   return "offsetToPoint x y -- Converts to an offset";
};

OffsetToPointCommand.prototype =
   jslib.inheritPrototype(Command, "OffsetToPointCommand extends Command");
OffsetToPointCommand.prototype.constructor = OffsetToPointCommand;

OffsetToPointCommand.prototype.execute = function(cl, scanner) {
   var console = cl.getConsole();
   var editor = (cl).getEditor();
   var offset = Integer.parseInt(scanner.nextToken());
   console.println(editor.offsetToPoint(offset));
   return true;
};

var PointToOffsetCommand = function() {
   Command.call(this);
};

PointToOffsetCommand.prototype.getHelp = function() {
   return "pointToOffset x y -- Converts to an offset";
};

PointToOffsetCommand.prototype =
   jslib.inheritPrototype(Command, "PointToOffsetCommand extends Command");
PointToOffsetCommand.prototype.constructor = PointToOffsetCommand;

PointToOffsetCommand.prototype.execute = function(cl, scanner) {
   var console = cl.getConsole();
   var editor = (cl).getEditor();
   var x = Integer.parseInt(scanner.nextToken());
   var y = Integer.parseInt(scanner.nextToken());
   console.println(editor.pointToOffset(new Point(x, y)));
   return true;
};

var LoadCommand = function() {
   Command.call(this);
};

LoadCommand.prototype.getHelp = function() {
   return "load file -- Loads the specified file";
};

LoadCommand.prototype =
   jslib.inheritPrototype(Command, "LoadCommand extends Command");
LoadCommand.prototype.constructor = LoadCommand;

LoadCommand.prototype.execute = function(cl, scanner) {
   var cmdLoop = cl;
   var path = this.scanFilename(scanner);
   scanner.verifyToken("");
   var slash = path.lastIndexOf("/");
   var filename = path.substring(slash + 1);
   var dot = path.indexOf(".", slash + 1);
   if (dot === -1) path += ".txt";
   new JSFile(path).read(new LoadListener(filename, cmdLoop));
   return false;
};

var LoadListener = function(filename, cl) {
   this.filename = filename;
   this.cl = cl;
};

LoadListener.prototype.actionPerformed = function(e) {
   if (e instanceof ActionError) {
      this.cl.getConsole().showErrorMessage(e.getActionCommand());
   } else {
      this.cl.getEditor().setText(e.getActionCommand());
      this.cl.getEditor().setCursorPosition(0);
      this.cl.resume();
   }
};


/* Exports */

return {
   JSEditorTest : JSEditorTest
};

});
