/*
 * File: js.js
 * Created on Mon Dec 15 10:09:38 PST 2014 by java2js
 * --------------------------------------------------
 * This file was generated mechanically by the java2js utility.
 * Permanent edits must be made in the Java file.
 */

define([ "jslib",
         "edu/stanford/cs/exp",
         "edu/stanford/cs/parser",
         "edu/stanford/cs/vm",
         "edu/stanford/cs/xparser",
         "java/lang" ],

function(jslib,
         edu_stanford_cs_exp,
         edu_stanford_cs_parser,
         edu_stanford_cs_vm,
         edu_stanford_cs_xparser,
         java_lang) {

/* Imports */

var inheritPrototype = jslib.inheritPrototype;
var newArray = jslib.newArray;
var toInt = jslib.toInt;
var toStr = jslib.toStr;
var Expression = edu_stanford_cs_exp.Expression;
var Identifier = edu_stanford_cs_exp.Identifier;
var Value = edu_stanford_cs_exp.Value;
var Parser = edu_stanford_cs_parser.Parser;
var VM = edu_stanford_cs_vm.VM;
var VMCode = edu_stanford_cs_vm.VMCode;
var VMFunction = edu_stanford_cs_vm.VMFunction;
var VMInstruction = edu_stanford_cs_vm.VMInstruction;
var Statement = edu_stanford_cs_xparser.Statement;
var XParser = edu_stanford_cs_xparser.XParser;
var Class = java_lang.Class;
var RuntimeException = java_lang.RuntimeException;

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

JSParser.prototype.readModule = function(vm) {
   var jsvm = vm;
   while (this.hasMoreTokens()) {
      jsvm.defineFunction(this.readFunction(jsvm));
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
   JSParser : JSParser,
   JSVM : JSVM
};

});
