/*
 * File: interpreter.js
 * Created on Sat Sep 27 15:20:19 PDT 2014 by java2js
 * --------------------------------------------------
 * This file was generated mechanically by the java2js utility.
 * Permanent edits must be made in the Java file.
 */

define([ "jslib",
         "edu/stanford/cs/command",
         "edu/stanford/cs/exp",
         "edu/stanford/cs/java2js",
         "edu/stanford/cs/jsconsole",
         "edu/stanford/cs/parser",
         "edu/stanford/cs/tokenscanner",
         "edu/stanford/cs/vm",
         "edu/stanford/cs/xparser",
         "java/awt",
         "java/lang" ],

function(jslib,
         edu_stanford_cs_command,
         edu_stanford_cs_exp,
         edu_stanford_cs_java2js,
         edu_stanford_cs_jsconsole,
         edu_stanford_cs_parser,
         edu_stanford_cs_tokenscanner,
         edu_stanford_cs_vm,
         edu_stanford_cs_xparser,
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
var Identifier = edu_stanford_cs_exp.Identifier;
var Value = edu_stanford_cs_exp.Value;
var JSElementList = edu_stanford_cs_java2js.JSElementList;
var JSErrorEvent = edu_stanford_cs_java2js.JSErrorEvent;
var JSFile = edu_stanford_cs_java2js.JSFile;
var JSProgram = edu_stanford_cs_java2js.JSProgram;
var JSConsole = edu_stanford_cs_jsconsole.JSConsole;
var Parser = edu_stanford_cs_parser.Parser;
var TokenScanner = edu_stanford_cs_tokenscanner.TokenScanner;
var VM = edu_stanford_cs_vm.VM;
var VMCode = edu_stanford_cs_vm.VMCode;
var VMFrame = edu_stanford_cs_vm.VMFrame;
var VMFunction = edu_stanford_cs_vm.VMFunction;
var VMInstruction = edu_stanford_cs_vm.VMInstruction;
var Statement = edu_stanford_cs_xparser.Statement;
var XParser = edu_stanford_cs_xparser.XParser;
var Dimension = java_awt.Dimension;
var Font = java_awt.Font;
var ActionEvent = java_awt.ActionEvent;
var ActionListener = java_awt.ActionListener;
var Class = java_lang.Class;
var RuntimeException = java_lang.RuntimeException;

/* Interpreter.js */

var Interpreter = function(args) {
   JSProgram.call(this);
   this.setTitle("Interpreter");
   this.console = new JSConsole();
   this.console.setFont(Font.decode("Courier New-Bold-18"));
   this.cl = new InterpreterCommandLoop(this, this.console);
   this.add(this.console, "console");
   this.setPreferredSize(new Dimension(800, 500));
   this.pack();
   this.setVisible(true);
};

Interpreter.prototype = 
   jslib.inheritPrototype(JSProgram, "Interpreter extends JSProgram");
Interpreter.prototype.constructor = Interpreter;
Interpreter.prototype.$class = 
   new Class("Interpreter", Interpreter);

Interpreter.prototype.run = function() {
   this.parser = new JSParser();
   this.vm = new JSVM();
   this.vm.setConsole(this.console);
   this.vmFlag = true;
   this.cl.start();
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
      this.parser.parseFile(this.vm);
   } catch (ex) {
      var msg = RuntimeException.patchMessage(ex);
      if (msg === null) msg = ex.toString();
      this.console.showErrorMessage(msg);
   }
   this.cl.resume();
};

Interpreter.main = function(args) {
   new Interpreter(args).start();
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


/* JSParser.js */

var JSParser = function() {
   XParser.call(this);
   this.defineStatementForm("if", new IfStatement());
   this.defineStatementForm("switch", new SwitchStatement());
   this.defineStatementForm("while", new WhileStatement());
   this.defineStatementForm("for", new ForStatement());
   this.defineStatementForm("return", new ReturnStatement());
   this.defineStatementForm("break", new BreakStatement());
   this.defineStatementForm("continue", new ContinueStatement());
};

JSParser.prototype = 
   jslib.inheritPrototype(XParser, "JSParser extends XParser");
JSParser.prototype.constructor = JSParser;
JSParser.prototype.$class = 
   new Class("JSParser", JSParser);

JSParser.prototype.parseFile = function(vm) {
   while (this.hasMoreTokens()) {
      vm.defineFunction(this.readFunction(vm));
   }
};

JSParser.prototype.readFunction = function(vm) {
   this.verifyToken("function");
   var name = this.nextToken();
   var fn = new VMFunction(name);
   this.verifyToken("(");
   var token = this.nextToken();
   while (!jslib.equals(token, ")")) {
      fn.addParameter(token);
      token = this.nextToken();
      if (!jslib.equals(token, ")")) {
         if (jslib.equals(token, ",")) {
            token = this.nextToken();
         } else {
            throw new RuntimeException("Illegal parameter syntax");
         }
      }
   }
   var body = this.readCompoundStatement();
   var params = fn.getParameterList();
   var n = params.length;
   var code = fn.getCode();
   for (var i = n - 1; i >= 0; i--) {
      var id = this.createIdentifier(params[i]);
      vm.compileDecl(id, code);
      vm.compilePopVariable(id, code);
   }
   vm.compileExpression(body, code);
   vm.compilePushConstant(Value.UNDEFINED, code);
   vm.compileReturn(code);
   return fn;
};

var IfStatement = function() {
   Statement.call(this);
};

IfStatement.prototype =
   jslib.inheritPrototype(Statement, "IfStatement extends Statement");
IfStatement.prototype.constructor = IfStatement;
IfStatement.prototype.$class = 
   new Class("IfStatement", IfStatement);

IfStatement.prototype.prefixAction = function(p) {
   var jsp = p;
   jsp.verifyToken("(");
   var exp = jsp.readE(0);
   jsp.verifyToken(")");
   var s1 = jsp.readStatement();
   var token = jsp.nextToken();
   if (jslib.equals(token, "else")) {
      return jsp.createCompound3(this, exp, s1, jsp.readStatement());
   }
   jsp.saveToken(token);
   return jsp.createCompound2(this, exp, s1);
};

IfStatement.prototype.compile = function(vm, args, code) {
   vm.compileExpression(args[0], code);
   var j1 = vm.compileJumpF(code);
   vm.compileExpression(args[1], code);
   if (args.length === 3) {
      var j2 = vm.compileJump(code);
      j1.setTarget(code.size());
      vm.compileExpression(args[2], code);
      j2.setTarget(code.size());
   } else {
      j1.setTarget(code.size());
   }
   vm.compilePop(code);
};

var SwitchStatement = function() {
   Statement.call(this);
};

SwitchStatement.prototype =
   jslib.inheritPrototype(Statement, "SwitchStatement extends Statement");
SwitchStatement.prototype.constructor = SwitchStatement;
SwitchStatement.prototype.$class = 
   new Class("SwitchStatement", SwitchStatement);

SwitchStatement.prototype.prefixAction = function(p) {
   throw new RuntimeException("Not yet implemented");
};

SwitchStatement.prototype.compile = function(vm, args, code) {
   throw new RuntimeException("Not yet implemented");
};

var WhileStatement = function() {
   Statement.call(this);
};

WhileStatement.prototype =
   jslib.inheritPrototype(Statement, "WhileStatement extends Statement");
WhileStatement.prototype.constructor = WhileStatement;
WhileStatement.prototype.$class = 
   new Class("WhileStatement", WhileStatement);

WhileStatement.prototype.prefixAction = function(p) {
   var jsp = p;
   jsp.verifyToken("(");
   var exp = jsp.readE(0);
   jsp.verifyToken(")");
   var s = jsp.readStatement();
   return jsp.createCompound2(this, exp, s);
};

WhileStatement.prototype.compile = function(vm, args, code) {
   var top = code.size();
   vm.compileExpression(args[0], code);
   var j1 = vm.compileJumpF(code);
   vm.compileExpression(args[1], code);
   var j2 = vm.compileJumpT(code);
   j1.setTarget(code.size());
   j2.setTarget(top);
};

var ForStatement = function() {
   Statement.call(this);
};

ForStatement.prototype =
   jslib.inheritPrototype(Statement, "ForStatement extends Statement");
ForStatement.prototype.constructor = ForStatement;
ForStatement.prototype.$class = 
   new Class("ForStatement", ForStatement);

ForStatement.prototype.prefixAction = function(p) {
   throw new RuntimeException("Not yet implemented");
};

ForStatement.prototype.compile = function(vm, args, code) {
   throw new RuntimeException("Not yet implemented");
};

var ReturnStatement = function() {
   Statement.call(this);
};

ReturnStatement.prototype =
   jslib.inheritPrototype(Statement, "ReturnStatement extends Statement");
ReturnStatement.prototype.constructor = ReturnStatement;
ReturnStatement.prototype.$class = 
   new Class("ReturnStatement", ReturnStatement);

ReturnStatement.prototype.prefixAction = function(p) {
   var token = p.nextToken();
   if (jslib.equals(token, ";")) return p.createCompound0(this);
   p.saveToken(token);
   var exp = p.readE(0);
   p.verifyToken(";");
   return p.createCompound1(this, exp);
};

ReturnStatement.prototype.compile = function(vm, args, code) {
   if (args.length === 0) {
      vm.compilePushConstant(Value.UNDEFINED, code);
   } else {
      vm.compileExpression(args[0], code);
   }
   vm.compileReturn(code);
};

var BreakStatement = function() {
   Statement.call(this);
};

BreakStatement.prototype =
   jslib.inheritPrototype(Statement, "BreakStatement extends Statement");
BreakStatement.prototype.constructor = BreakStatement;
BreakStatement.prototype.$class = 
   new Class("BreakStatement", BreakStatement);

BreakStatement.prototype.prefixAction = function(p) {
   throw new RuntimeException("Not yet implemented");
};

BreakStatement.prototype.compile = function(vm, args, code) {
   throw new RuntimeException("Not yet implemented");
};

var ContinueStatement = function() {
   Statement.call(this);
};

ContinueStatement.prototype =
   jslib.inheritPrototype(Statement, "ContinueStatement extends Statement");
ContinueStatement.prototype.constructor = ContinueStatement;
ContinueStatement.prototype.$class = 
   new Class("ContinueStatement", ContinueStatement);

ContinueStatement.prototype.prefixAction = function(p) {
   throw new RuntimeException("Not yet implemented");
};

ContinueStatement.prototype.compile = function(vm, args, code) {
   throw new RuntimeException("Not yet implemented");
};


/* JSVM.js */

var JSVM = function() {
   VM.call(this);
};

JSVM.prototype =
   jslib.inheritPrototype(VM, "JSVM extends VM");
JSVM.prototype.constructor = JSVM;
JSVM.prototype.$class = 
   new Class("JSVM", JSVM);


/* Exports */

return {
   Interpreter : Interpreter,
   JSParser : JSParser,
   JSVM : JSVM
};

});
