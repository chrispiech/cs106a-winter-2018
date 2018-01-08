/*
 * File: interpreter.js
 * Created on Mon Dec 15 08:57:13 PST 2014 by java2js
 * --------------------------------------------------
 * This file was generated mechanically by the java2js utility.
 * Permanent edits must be made in the Java file.
 */

define([ "jslib",
         "edu/stanford/cs/command",
         "edu/stanford/cs/exp",
         "edu/stanford/cs/java2js",
         "edu/stanford/cs/jsconsole",
         "edu/stanford/cs/tokenscanner",
         "edu/stanford/cs/vm",
         "java/awt",
         "java/lang" ],

function(jslib,
         edu_stanford_cs_command,
         edu_stanford_cs_exp,
         edu_stanford_cs_java2js,
         edu_stanford_cs_jsconsole,
         edu_stanford_cs_tokenscanner,
         edu_stanford_cs_vm,
         java_awt,
         java_lang) {

/* Imports */

var inheritPrototype = jslib.inheritPrototype;
var newArray = jslib.newArray;
var toInt = jslib.toInt;
var toStr = jslib.toStr;
var Command = edu_stanford_cs_command.Command;
var CommandLoop = edu_stanford_cs_command.CommandLoop;
var DebugCommand = edu_stanford_cs_command.DebugCommand;
var HelpCommand = edu_stanford_cs_command.HelpCommand;
var QuitCommand = edu_stanford_cs_command.QuitCommand;
var ScriptCommand = edu_stanford_cs_command.ScriptCommand;
var StackTraceCommand = edu_stanford_cs_command.StackTraceCommand;
var Expression = edu_stanford_cs_exp.Expression;
var JSElementList = edu_stanford_cs_java2js.JSElementList;
var JSErrorEvent = edu_stanford_cs_java2js.JSErrorEvent;
var JSFile = edu_stanford_cs_java2js.JSFile;
var JSProgram = edu_stanford_cs_java2js.JSProgram;
var JSConsole = edu_stanford_cs_jsconsole.JSConsole;
var TokenScanner = edu_stanford_cs_tokenscanner.TokenScanner;
var VM = edu_stanford_cs_vm.VM;
var VMCode = edu_stanford_cs_vm.VMCode;
var VMFrame = edu_stanford_cs_vm.VMFrame;
var VMFunction = edu_stanford_cs_vm.VMFunction;
var Dimension = java_awt.Dimension;
var Font = java_awt.Font;
var ActionEvent = java_awt.ActionEvent;
var ActionListener = java_awt.ActionListener;
var Class = java_lang.Class;

/* Interpreter.js */

var Interpreter = function(parser, vm, console) {
   JSProgram.call(this);
   this.parser = parser;
   this.vm = vm;
   this.console = console;
   this.cl = new InterpreterCommandLoop(this, console);
   vm.setConsole(console);
   this.vmFlag = true;
};

Interpreter.prototype = 
   jslib.inheritPrototype(JSProgram, "Interpreter extends JSProgram");
Interpreter.prototype.constructor = Interpreter;
Interpreter.prototype.$class = 
   new Class("Interpreter", Interpreter);

Interpreter.prototype.run = function() {
   this.cl.start();
};

Interpreter.prototype.getParser = function() {
   return this.parser;
};

Interpreter.prototype.getVM = function() {
   return this.vm;
};

Interpreter.prototype.getConsole = function() {
   return this.console;
};

Interpreter.prototype.getCommandLoop = function() {
   return this.cl;
};

Interpreter.prototype.evaluate = function(str) {
   this.parser.setInput(str);
   var exp = this.parser.parse();
   if (this.vmFlag) {
      var code = new VMCode();
      this.vm.compileExpression(exp, code);
      var frame = this.vm.createFrame();
      frame.setCode(code);
      this.vm.pushFrame(frame);
      while (this.vm.getStackDepth() > 0) {
         this.vm.step();
      }
      this.console.println(this.vm.pop().toString());
   } else {
      this.console.println(exp.eval(this.vm).toString());
   }
};

Interpreter.prototype.setVMFlag = function(flag) {
   this.vmFlag = flag;
};

Interpreter.prototype.getVMFlag = function() {
   return this.vmFlag;
};

Interpreter.prototype.setTraceFlag = function(flag) {
   this.vm.setTraceFlag(flag);
};

Interpreter.prototype.getTraceFlag = function() {
   return this.vm.getTraceFlag();
};

Interpreter.prototype.showCode = function(fnName) {
   var fn = this.vm.getFunction(fnName);
   if (fn === null) {
      this.console.showErrorMessage("No function named " + fnName);
      return;
   }
   var args = "";
   var el = new JSElementList(fn.getParameterList());
   for (var ei = 0; ei < el.size(); ei++) {
      var arg = el.get(ei);
      if (!jslib.equals(args, "")) args += ", ";
      args += arg;
   }
   this.console.println(fn.getName() + "(" + args + ")");
   var code = fn.getCode();
   var n = code.size();
   for (var i = 0; i < n; i++) {
      var label = "" + i;
      while (label.length < 5) {
         label = " " + label;
      }
      this.console.println(label + "  " + code.get(i));
   }
};

Interpreter.prototype.load = function(filename, text) {
   try {
      this.parser.setInput(text);
      this.parser.readModule(this.vm);
   } catch (ex) {
      var msg = RuntimeException.patchMessage(ex);
      if (msg === null) msg = ex.toString();
      this.console.showErrorMessage(msg);
   }
   this.cl.resume();
};

var InterpreterCommandLoop = function(app, console) {
   CommandLoop.call(this, console);
   this.app = app;
   this.addCommand("code", new CodeCommand());
   this.addCommand("debug", new DebugCommand());
   this.addCommand("help", new HelpCommand());
   this.addCommand("load", new LoadCommand());
   this.addCommand("quit", new QuitCommand());
   this.addCommand("script", new ScriptCommand());
   this.addCommand("stacktrace", new StackTraceCommand());
   this.addCommand("trace", new TraceCommand());
   this.addCommand("vm", new VMCommand());
};

InterpreterCommandLoop.prototype = 
   jslib.inheritPrototype(CommandLoop, "InterpreterCommandLoop extends CommandLoop");
InterpreterCommandLoop.prototype.constructor = InterpreterCommandLoop;
InterpreterCommandLoop.prototype.$class = 
   new Class("InterpreterCommandLoop", InterpreterCommandLoop);

InterpreterCommandLoop.prototype.unrecognizedCommand = function(line) {
   this.app.evaluate(line);
   return true;
};

InterpreterCommandLoop.prototype.getInterpreter = function() {
   return this.app;
};

var VMCommand = function() {
   Command.call(this);
};

VMCommand.prototype =
   jslib.inheritPrototype(Command, "VMCommand extends Command");
VMCommand.prototype.constructor = VMCommand;
VMCommand.prototype.$class = 
   new Class("VMCommand", VMCommand);

VMCommand.prototype.getHelp = function() {
   return "vm on/off -- Sets the virtual machine mode";
};

VMCommand.prototype.execute = function(cl, scanner) {
   var app = (cl).getInterpreter();
   app.setVMFlag(this.scanOnOffToggle(scanner, app.getVMFlag()));
   return true;
};

var TraceCommand = function() {
   Command.call(this);
};

TraceCommand.prototype =
   jslib.inheritPrototype(Command, "TraceCommand extends Command");
TraceCommand.prototype.constructor = TraceCommand;
TraceCommand.prototype.$class = 
   new Class("TraceCommand", TraceCommand);

TraceCommand.prototype.getHelp = function() {
   return "trace on/off -- Turns tracing on or off";
};

TraceCommand.prototype.execute = function(cl, scanner) {
   var app = (cl).getInterpreter();
   app.setTraceFlag(this.scanOnOffToggle(scanner, app.getTraceFlag()));
   return true;
};

var LoadCommand = function() {
   Command.call(this);
};

LoadCommand.prototype =
   jslib.inheritPrototype(Command, "LoadCommand extends Command");
LoadCommand.prototype.constructor = LoadCommand;
LoadCommand.prototype.$class = 
   new Class("LoadCommand", LoadCommand);

LoadCommand.prototype.getHelp = function() {
   return "load filename -- Loads the specified file";
};

LoadCommand.prototype.execute = function(cl, scanner) {
   var app = (cl).getInterpreter();
   var filename = this.scanFilename(scanner);
   scanner.verifyToken("");
   new JSFile(filename).read(new LoadListener(filename, app));
   return false;
};

var CodeCommand = function() {
   Command.call(this);
};

CodeCommand.prototype =
   jslib.inheritPrototype(Command, "CodeCommand extends Command");
CodeCommand.prototype.constructor = CodeCommand;
CodeCommand.prototype.$class = 
   new Class("CodeCommand", CodeCommand);

CodeCommand.prototype.getHelp = function() {
   return "code fn -- Show the code for the named function";
};

CodeCommand.prototype.execute = function(cl, scanner) {
   var app = (cl).getInterpreter();
   var fnName = scanner.nextToken();
   scanner.verifyToken("");
   app.showCode(fnName);
   return true;
};

var LoadListener = function(filename, app) {
   this.filename = filename;
   this.app = app;
};

LoadListener.prototype.actionPerformed = function(e) {
   var cl = this.app.getCommandLoop();
   if (e instanceof JSErrorEvent) {
      cl.getConsole().showErrorMessage(e.getActionCommand());
   } else {
      this.app.load(this.filename, e.getActionCommand());
   }
};


/* Exports */

return {
   Interpreter : Interpreter
};

});
