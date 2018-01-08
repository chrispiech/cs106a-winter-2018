/*
 * File: csp.js
 * Created on Sat May 30 11:48:30 PDT 2015 by java2js
 * --------------------------------------------------
 * This file was generated mechanically by the java2js utility.
 * Permanent edits must be made in the Java file.
 */

define([ "jslib",
         "edu/stanford/cs/exp",
         "edu/stanford/cs/java2js",
         "edu/stanford/cs/jsconsole",
         "edu/stanford/cs/parser",
         "edu/stanford/cs/programeditor",
         "edu/stanford/cs/sjs",
         "edu/stanford/cs/svm",
         "edu/stanford/cs/tokenscanner",
         "java/awt",
         "java/lang",
         "java/util",
         "javax/swing" ],

function(jslib,
         edu_stanford_cs_exp,
         edu_stanford_cs_java2js,
         edu_stanford_cs_jsconsole,
         edu_stanford_cs_parser,
         edu_stanford_cs_programeditor,
         edu_stanford_cs_sjs,
         edu_stanford_cs_svm,
         edu_stanford_cs_tokenscanner,
         java_awt,
         java_lang,
         java_util,
         javax_swing) {

/* Imports */

var inheritPrototype = jslib.inheritPrototype;
var newArray = jslib.newArray;
var toInt = jslib.toInt;
var toStr = jslib.toStr;
var Compound = edu_stanford_cs_exp.Compound;
var Constant = edu_stanford_cs_exp.Constant;
var Expression = edu_stanford_cs_exp.Expression;
var LValue = edu_stanford_cs_exp.LValue;
var Value = edu_stanford_cs_exp.Value;
var JSElementList = edu_stanford_cs_java2js.JSElementList;
var JSConsole = edu_stanford_cs_jsconsole.JSConsole;
var CodeVector = edu_stanford_cs_parser.CodeVector;
var InfixForm = edu_stanford_cs_parser.InfixForm;
var NofixOperator = edu_stanford_cs_parser.NofixOperator;
var Operator = edu_stanford_cs_parser.Operator;
var Parser = edu_stanford_cs_parser.Parser;
var PrefixOperator = edu_stanford_cs_parser.PrefixOperator;
var Statement = edu_stanford_cs_parser.Statement;
var SyntaxError = edu_stanford_cs_parser.SyntaxError;
var CommentHighlightMode = edu_stanford_cs_programeditor.CommentHighlightMode;
var ProgramEditor = edu_stanford_cs_programeditor.ProgramEditor;
var SJSANDOperator = edu_stanford_cs_sjs.SJSANDOperator;
var SJSAssignmentOperator = edu_stanford_cs_sjs.SJSAssignmentOperator;
var SJSBracketOperator = edu_stanford_cs_sjs.SJSBracketOperator;
var SJSEqualOperator = edu_stanford_cs_sjs.SJSEqualOperator;
var SJSGreaterEqualOperator = edu_stanford_cs_sjs.SJSGreaterEqualOperator;
var SJSGreaterThanOperator = edu_stanford_cs_sjs.SJSGreaterThanOperator;
var SJSLessEqualOperator = edu_stanford_cs_sjs.SJSLessEqualOperator;
var SJSLessThanOperator = edu_stanford_cs_sjs.SJSLessThanOperator;
var SJSListOperator = edu_stanford_cs_sjs.SJSListOperator;
var SJSMinusOperator = edu_stanford_cs_sjs.SJSMinusOperator;
var SJSNOTOperator = edu_stanford_cs_sjs.SJSNOTOperator;
var SJSNotEqualOperator = edu_stanford_cs_sjs.SJSNotEqualOperator;
var SJSOROperator = edu_stanford_cs_sjs.SJSOROperator;
var SJSParenOperator = edu_stanford_cs_sjs.SJSParenOperator;
var SJSParser = edu_stanford_cs_sjs.SJSParser;
var SJSPercentOperator = edu_stanford_cs_sjs.SJSPercentOperator;
var SJSPlusOperator = edu_stanford_cs_sjs.SJSPlusOperator;
var SJSSlashOperator = edu_stanford_cs_sjs.SJSSlashOperator;
var SJSStarOperator = edu_stanford_cs_sjs.SJSStarOperator;
var SJSUnaryMinusOperator = edu_stanford_cs_sjs.SJSUnaryMinusOperator;
var SJSUnaryPlusOperator = edu_stanford_cs_sjs.SJSUnaryPlusOperator;
var SVM = edu_stanford_cs_svm.SVM;
var SVMArray = edu_stanford_cs_svm.SVMArray;
var SVMC = edu_stanford_cs_svm.SVMC;
var SVMClass = edu_stanford_cs_svm.SVMClass;
var SVMMethod = edu_stanford_cs_svm.SVMMethod;
var TokenScanner = edu_stanford_cs_tokenscanner.TokenScanner;
var Color = java_awt.Color;
var Component = java_awt.Component;
var Container = java_awt.Container;
var Dimension = java_awt.Dimension;
var Font = java_awt.Font;
var Graphics = java_awt.Graphics;
var Insets = java_awt.Insets;
var LayoutManager = java_awt.LayoutManager;
var Rectangle = java_awt.Rectangle;
var Class = java_lang.Class;
var RuntimeException = java_lang.RuntimeException;
var ArrayList = java_util.ArrayList;
var HashSet = java_util.HashSet;
var TreeMap = java_util.TreeMap;
var ChangeEvent = javax_swing.ChangeEvent;
var ChangeListener = javax_swing.ChangeListener;

/* CSPC.js */

var CSPC = function() {
   /* Empty */
};

CSPC.APPLICATION_BACKGROUND = new Color(0xCCFFFF);
CSPC.EDITOR_FONT = Font.decode("Courier New-Bold-18");
CSPC.CONSOLE_FONT = Font.decode("Courier New-Bold-18");
CSPC.HOME = "http://cs.stanford.edu/~eroberts/demos";
CSPC.ROOT = CSPC.HOME + "/CSP";
CSPC.EXAMPLES = CSPC.ROOT + "/examples";
CSPC.EDITOR_HEIGHT = 600;
CSPC.EDITOR_WIDTH = 700;
CSPC.CONSOLE_EDITOR_SEP = 30;
CSPC.CONSOLE_HEIGHT = 600;
CSPC.CONSOLE_WIDTH = 350;
CSPC.SIDE_MARGIN = 20;
CSPC.TOP_MARGIN = 20;
CSPC.BOTTOM_MARGIN = 20;

/* CSPEditor.js */

var CSPEditor = function() {
   ProgramEditor.call(this);
   this.scanner = new TokenScanner();
   this.scanner.ignoreWhitespace();
   this.scanner.ignoreComments();
   this.scanner.scanNumbers();
   this.scanner.addWordCharacters("_");
   this.setFont(CSPC.EDITOR_FONT);
   this.setLineWrap(false);
   this.setEditorMode(new CommentHighlightMode());
};

CSPEditor.prototype = 
   jslib.inheritPrototype(ProgramEditor, "CSPEditor extends ProgramEditor");
CSPEditor.prototype.constructor = CSPEditor;
CSPEditor.prototype.$class = 
   new Class("CSPEditor", CSPEditor);

CSPEditor.prototype.getPreferredSize = function() {
   return new Dimension(CSPC.EDITOR_WIDTH, CSPC.EDITOR_HEIGHT);
};

CSPEditor.prototype.isBreakpointLegal = function(k) {
   this.updateLineTable();
   return this.lineTable.containsValue(k);
};

CSPEditor.prototype.getSourceLineIndex = function(addr) {
   var k = this.lineTable.get(addr);
   return (k === null) ? 0 : k;
};

CSPEditor.prototype.updateLineTable = function() {
   // Fill in
};

CSPEditor.prototype.paint = function(g) {
   if (g.getFont().getSize() >= 22) return;
   ProgramEditor.prototype.paint.call(this, g);
};


/* CSPFunction.js */

var CSPFunction = function(name, flag) {
   this.name = name;
   this.functionFlag = flag;
   this.formals = new ArrayList();
   this.locals = new ArrayList();
   this.localVars = new HashSet();
};

CSPFunction.prototype.getName = function() {
   return this.name;
};

CSPFunction.prototype.isValueReturning = function() {
   return this.functionFlag;
};

CSPFunction.prototype.addFormal = function(name) {
   this.formals.add(name);
   this.localVars.add(name);
};

CSPFunction.prototype.getFormals = function() {
   return this.formals;
};

CSPFunction.prototype.addLocal = function(name) {
   this.locals.add(name);
   this.localVars.add(name);
};

CSPFunction.prototype.getLocals = function() {
   return this.locals;
};

CSPFunction.prototype.isLocal = function(name) {
   return this.localVars.contains(name);
};

CSPFunction.prototype.setBody = function(exp) {
   this.body = exp;
};

CSPFunction.prototype.getBody = function() {
   return this.body;
};


/* CSPLayout.js */

var CSPLayout = function() {
   /* Empty */
};

CSPLayout.prototype.addLayoutComponent = function(name, comp) {
   if (jslib.equals(name, "controls")) {
      this.controls = comp;
   } else if (jslib.equals(name, "console")) {
      this.console = comp;
   } else if (jslib.equals(name, "editor")) {
      this.editor = comp;
   } else {
      throw new RuntimeException("Illegal component name: " + name);
   }
};

CSPLayout.prototype.removeLayoutComponent = function(comp) {
   /* Empty */
};

CSPLayout.prototype.preferredLayoutSize = function(target) {
   if (target.getTreeLock()) {
      var eSize = this.editor.getPreferredSize();
      var cSize = this.console.getPreferredSize();
      var ctlSize = this.controls.getPreferredSize();
      var width = 2 * CSPC.SIDE_MARGIN + eSize.width + cSize.width +
      CSPC.CONSOLE_EDITOR_SEP;
      var height = CSPC.TOP_MARGIN + cSize.height + CSPC.BOTTOM_MARGIN +
      ctlSize.height;
      var insets = target.getInsets();
      width += insets.left + insets.right;
      height += insets.top + insets.bottom;
      return new Dimension(width, height);
   }
};

CSPLayout.prototype.minimumLayoutSize = function(target) {
   return this.preferredLayoutSize(target);
};

CSPLayout.prototype.layoutContainer = function(target) {
   if (target.getTreeLock()) {
      var insets = target.getInsets();
      var ctlSize = this.controls.getPreferredSize();
      var bounds = target.getBounds();
      var x = bounds.x + insets.left;
      var y = bounds.y + insets.top;
      var width = bounds.width - insets.left - insets.right;
      var height = bounds.height - insets.top - insets.bottom;
      var cx = x + CSPC.SIDE_MARGIN;
      var cy = y + CSPC.TOP_MARGIN;
      var cw = CSPC.CONSOLE_WIDTH;
      var ch = y + height - cy - CSPC.BOTTOM_MARGIN - ctlSize.height;
      this.console.setBounds(cx, cy, cw, ch);
      var ex = cx + cw + CSPC.CONSOLE_EDITOR_SEP;
      var ew = x + width - ex - CSPC.SIDE_MARGIN;
      this.editor.setBounds(ex, cy, ew, ch);
      this.controls.setBounds(0, height - ctlSize.height, width, ctlSize.height);
   }
};


/* CSPParser.js */

var CSPParser = function() {
   SJSParser.call(this);
   /* Empty */
};

CSPParser.prototype = 
   jslib.inheritPrototype(SJSParser, "CSPParser extends SJSParser");
CSPParser.prototype.constructor = CSPParser;
CSPParser.prototype.$class = 
   new Class("CSPParser", CSPParser);

CSPParser.prototype.createTokenScanner = function() {
   var scanner = new TokenScanner();
   scanner.ignoreWhitespace();
   scanner.ignoreComments();
   scanner.scanStrings();
   scanner.scanNumbers();
   scanner.addWordCharacters("_");
   this.addOperatorTokens(scanner);
   return scanner;
};

CSPParser.prototype.addOperatorTokens = function(scanner) {
   scanner.addOperator("<-");
   scanner.addOperator("<=");
   scanner.addOperator(">=");
   scanner.addOperator("<>");
};

CSPParser.prototype.defineStatementForms = function() {
   this.defineStatementForm("IF", new IfStatement());
   this.defineStatementForm("REPEAT", new RepeatStatement());
   this.defineStatementForm("REPEAT-WHILE", new RepeatWhileStatement());
   this.defineStatementForm("REPEAT-UNTIL", new RepeatUntilStatement());
   this.defineStatementForm("RETURN", new ReturnStatement());
};

CSPParser.prototype.defineOperators = function() {
   var LEFT = Operator.LEFT;
   var RIGHT = Operator.RIGHT;
   this.assignmentOperator = new CSPAssignmentOperator();
   this.defineOperator("(", new SJSParenOperator(), 0, 110, RIGHT);
   this.defineOperator("[", new SJSBracketOperator(), 0, 110, RIGHT);
   this.defineOperator("+", new SJSPlusOperator(), 100, 80, LEFT);
   this.defineOperator("-", new SJSMinusOperator(), 100, 80, LEFT);
   this.defineInfixOperator("*", new SJSStarOperator(), 90, LEFT);
   this.defineInfixOperator("/", new SJSSlashOperator(), 90, LEFT);
   this.defineInfixOperator("%", new SJSPercentOperator(), 90, LEFT);
   this.defineInfixOperator("<", new SJSLessThanOperator(), 60, LEFT);
   this.defineInfixOperator("<=", new SJSLessEqualOperator(), 60, LEFT);
   this.defineInfixOperator(">", new SJSGreaterThanOperator(), 60, LEFT);
   this.defineInfixOperator(">=", new SJSGreaterEqualOperator(), 60, LEFT);
   this.defineInfixOperator("=", new SJSEqualOperator(), 50, LEFT);
   this.defineInfixOperator("<>", new SJSNotEqualOperator(), 50, LEFT);
   this.definePrefixOperator("NOT", new SJSNOTOperator(), 40);
   this.defineInfixOperator("AND", new SJSANDOperator(), 30, LEFT);
   this.defineInfixOperator("OR", new SJSOROperator(), 20, LEFT);
   this.defineInfixOperator("<-", this.assignmentOperator, 10, RIGHT);
   this.definePrefixOperator("+x", new SJSUnaryPlusOperator(), 100);
   this.definePrefixOperator("-x", new SJSUnaryMinusOperator(), 100);
   this.definePrefixOperator("[...]", new SJSListOperator(), 100);
};

CSPParser.prototype.compileCSPModule = function(cv) {
   var statements = new ArrayList();
   var functions = new ArrayList();
   while (this.hasMoreTokens()) {
      var token = this.nextToken();
      if (jslib.equals(token, "PROCEDURE")) {
         functions.add(this.readCSPFunction(false));
      } else if (jslib.equals(token, "FUNCTION")) {
         functions.add(this.readCSPFunction(true));
      } else {
         this.saveToken(token);
         statements.add(this.readStatement());
      }
   }
   this.currentFunction = null;
   var el0 = new JSElementList(statements);
   for (var ei0 = 0; ei0 < el0.size(); ei0++) {
      var stmt = el0.get(ei0);
      this.compile(stmt, cv);
   }
   cv.addInstruction(SVMC.HALT, 0);
   var el1 = new JSElementList(functions);
   for (var ei1 = 0; ei1 < el1.size(); ei1++) {
      var fn = el1.get(ei1);
      this.currentFunction = fn;
      this.compileFunction(fn, cv);
   }
   this.addBuiltinFunctions(cv);
   cv.addInstruction(SVMC.END, 0);
};

CSPParser.prototype.compileIdentifier = function(name, cv) {
   if (this.currentFunction !== null && this.currentFunction.isLocal(name)) {
      cv.addInstruction(SVMC.PUSHVAR, cv.stringRef(name));
   } else {
      cv.addInstruction(SVMC.PUSHSTR, cv.stringRef(name));
      cv.addInstruction(SVMC.CALLM, cv.stringRef("Global.get"));
   }
};

CSPParser.prototype.compileCompound = function(exp, cv) {
   var fn = exp.getFunction();
   var type = fn.getType();
   if (type === Expression.OPERATOR) {
      (fn).compile(this, exp.getArgs(), cv);
   } else if (type === Expression.IDENTIFIER) {
      this.compileArgs(exp.getArgs(), cv);
      cv.addInstruction(SVMC.CALL, cv.labelRef(fn.getName()));
      cv.addInstruction(SVMC.NARGS, exp.getArgs().length);
   } else {
      throw new SyntaxError("Illegal function call");
   }
};

CSPParser.prototype.readStatement = function() {
   var token = this.nextToken();
   if (jslib.equals(token, "{")) {
      this.saveToken(token);
      return this.readBlock();
   }
   var op = this.lookupOperator(token);
   if (op === null || !op.isStatement()) {
      var t2 = this.nextToken();
      if (jslib.equals(t2, "<-")) {
         var lhs = this.createIdentifier(token);
         var rhs = this.readE(0);
         return this.createCompound2(this.assignmentOperator, lhs, rhs);
      } else if (jslib.equals(t2, "(")) {
         this.saveToken(t2);
         this.saveToken(token);
         var exp = this.readE(0);
         return exp;
      } else {
         throw new RuntimeException("Illegal statement at " + token);
      }
   }
   var stmt = op.prefixAction(this);
   return stmt;
};

CSPParser.prototype.readCSPFunction = function(functionFlag) {
   var name = this.nextToken();
   if (this.getTokenType(name) !== TokenScanner.WORD) {
      throw new RuntimeException("Missing function name");
   }
   this.currentFunction = new CSPFunction(name, functionFlag);
   this.verifyToken("(");
   var token = this.nextToken();
   while (!jslib.equals(token, ")")) {
      if (this.getTokenType(token) !== TokenScanner.WORD) {
         throw new RuntimeException("Illegal parameter name");
      }
      this.currentFunction.addFormal(token);
      token = this.nextToken();
      if (jslib.equals(token, ",")) {
         token = this.nextToken();
      } else if (!jslib.equals(token, ")")) {
         throw new RuntimeException("Illegal parameter list");
      }
   }
   this.currentFunction.setBody(this.readCompoundStatement());
   return this.currentFunction;
};

CSPParser.prototype.getCurrentFunction = function() {
   return this.currentFunction;
};

CSPParser.prototype.compileFunction = function(fn, cv) {
   // Check parameter count
   cv.defineLabel(fn.getName());
   var formals = fn.getFormals();
   for (var i = formals.size() - 1; i >= 0; i--) {
      cv.addInstruction(SVMC.ARG, cv.stringRef(formals.get(i)));
   }
   var el0 = new JSElementList(fn.getLocals());
   for (var ei0 = 0; ei0 < el0.size(); ei0++) {
      var name = el0.get(ei0);
      cv.addInstruction(SVMC.VAR, cv.stringRef(name));
   }
   this.currentFunction = fn;
   this.compile(fn.getBody(), cv);
   cv.addInstruction(SVMC.RETURN, 0);
};

CSPParser.prototype.readBlock = function() {
   return this.readCompoundStatement();
};

CSPParser.prototype.addBuiltinFunctions = function(cv) {
   this.defineBuiltinFunction(cv, "display");
   this.defineBuiltinFunction(cv, "firstIndex");
   this.defineBuiltinFunction(cv, "int");
   this.defineBuiltinFunction(cv, "lastIndex");
   this.defineBuiltinFunction(cv, "length");
   this.defineBuiltinFunction(cv, "random");
};

CSPParser.prototype.defineBuiltinFunction = function(cv, name) {
   cv.defineLabel(name);
   cv.addInstruction(SVMC.CALLM, cv.stringRef("CSPFunctionClass." + name));
   cv.addInstruction(SVMC.RETURN, 0);
};

var CSPAssignmentOperator = function() {
   SJSAssignmentOperator.call(this);
};

CSPAssignmentOperator.prototype =
   jslib.inheritPrototype(SJSAssignmentOperator, "CSPAssignmentOperator extends SJSAssignmentOperator");
CSPAssignmentOperator.prototype.constructor = CSPAssignmentOperator;
CSPAssignmentOperator.prototype.$class = 
   new Class("CSPAssignmentOperator", CSPAssignmentOperator);

CSPAssignmentOperator.prototype.compile = function(p, args, cv) {
   cv.addInstruction(SVMC.PUSHSTR, cv.stringRef(args[0].getName()));
   p.compile(args[1], cv);
   cv.addInstruction(SVMC.CALLM, cv.stringRef("Global.set"));
};

var CSPBracketOperator = function() {
   SJSBracketOperator.call(this);
};

CSPBracketOperator.prototype =
   jslib.inheritPrototype(SJSBracketOperator, "CSPBracketOperator extends SJSBracketOperator");
CSPBracketOperator.prototype.constructor = CSPBracketOperator;
CSPBracketOperator.prototype.$class = 
   new Class("CSPBracketOperator", CSPBracketOperator);

CSPBracketOperator.prototype.compile = function(p, args, cv) {
   p.compile(args[0], cv);
   p.compile(args[1], cv);
   cv.addInstruction(SVMC.CALLM, cv.stringRef("CSP.select"));
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
   var cp = p;
   cp.verifyToken("(");
   var exp = cp.readE(0);
   cp.verifyToken(")");
   var s1 = cp.readBlock();
   var token = cp.nextToken();
   if (jslib.equals(token, "ELSE")) {
      var s2 = cp.readBlock();
      return cp.createCompound3(this, exp, s1, s2);
   }
   cp.saveToken(token);
   return cp.createCompound2(this, exp, s1);
};

IfStatement.prototype.compile = function(p, args, cv) {
   var tag = cv.newLabel();
   p.compile(args[0], cv);
   cv.addInstruction(SVMC.JUMPF, cv.labelRef(tag));
   p.compile(args[1], cv);
   if (args.length === 3) {
      var tag2 = cv.newLabel();
      cv.addInstruction(SVMC.JUMP, cv.labelRef(tag2));
      cv.defineLabel(tag);
      p.compile(args[2], cv);
      cv.defineLabel(tag2);
   } else {
      cv.defineLabel(tag);
   }
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
   var cp = p;
   if (cp.getCurrentFunction().isValueReturning()) {
      return cp.createCompound1(this, cp.readE(0));
   } else {
      return cp.createCompound0(this);
   }
};

ReturnStatement.prototype.compile = function(p, args, cv) {
   if (args.length > 0) p.compile(args[0], cv);
   cv.addInstruction(SVMC.RETURN, 0);
};

var RepeatStatement = function() {
   Statement.call(this);
};

RepeatStatement.prototype =
   jslib.inheritPrototype(Statement, "RepeatStatement extends Statement");
RepeatStatement.prototype.constructor = RepeatStatement;
RepeatStatement.prototype.$class = 
   new Class("RepeatStatement", RepeatStatement);

RepeatStatement.prototype.prefixAction = function(p) {
   var cp = p;
   var token = cp.nextToken();
   if (jslib.equalsIgnoreCase(token, "WHILE")) {
      return cp.lookupOperator("REPEAT-WHILE").prefixAction(cp);
   } else if (jslib.equalsIgnoreCase(token, "UNTIL")) {
      return cp.lookupOperator("REPEAT-UNTIL").prefixAction(cp);
   } else {
      cp.saveToken(token);
      var exp = cp.readE(0);
      token = cp.nextToken();
      if (!jslib.equalsIgnoreCase(token, "TIMES")) {
         throw new RuntimeException("Missing keyword TIMES");
      }
      var s = cp.readBlock();
      return cp.createCompound2(this, exp, s);
   }
};

RepeatStatement.prototype.compile = function(p, args, cv) {
   var tag1 = cv.newLabel();
   var tag2 = cv.newLabel();
   var var = cv.newLabel();
   cv.addInstruction(SVMC.VAR, cv.stringRef(var));
   p.compile(args[0], cv);
   cv.defineLabel(tag1);
   cv.addInstruction(SVMC.POPVAR, cv.stringRef(var));
   cv.addInstruction(SVMC.PUSHVAR, cv.stringRef(var));
   cv.addInstruction(SVMC.PUSHINT, 0);
   cv.addInstruction(SVMC.GT, 0);
   cv.addInstruction(SVMC.JUMPF, cv.labelRef(tag2));
   p.compile(args[1], cv);
   cv.addInstruction(SVMC.PUSHVAR, cv.stringRef(var));
   cv.addInstruction(SVMC.PUSHINT, 1);
   cv.addInstruction(SVMC.SUB, 0);
   cv.addInstruction(SVMC.JUMP, cv.labelRef(tag1));
   cv.defineLabel(tag2);
};

var RepeatWhileStatement = function() {
   Statement.call(this);
};

RepeatWhileStatement.prototype =
   jslib.inheritPrototype(Statement, "RepeatWhileStatement extends Statement");
RepeatWhileStatement.prototype.constructor = RepeatWhileStatement;
RepeatWhileStatement.prototype.$class = 
   new Class("RepeatWhileStatement", RepeatWhileStatement);

RepeatWhileStatement.prototype.prefixAction = function(p) {
   var cp = p;
   var exp = cp.readE(0);
   var s = cp.readBlock();
   return cp.createCompound2(this, exp, s);
};

RepeatWhileStatement.prototype.compile = function(p, args, cv) {
   var tag1 = cv.newLabel();
   var tag2 = cv.newLabel();
   cv.defineLabel(tag1);
   p.compile(args[0], cv);
   cv.addInstruction(SVMC.JUMPF, cv.labelRef(tag2));
   p.compile(args[1], cv);
   cv.addInstruction(SVMC.JUMP, cv.labelRef(tag1));
   cv.defineLabel(tag2);
};

var RepeatUntilStatement = function() {
   Statement.call(this);
};

RepeatUntilStatement.prototype =
   jslib.inheritPrototype(Statement, "RepeatUntilStatement extends Statement");
RepeatUntilStatement.prototype.constructor = RepeatUntilStatement;
RepeatUntilStatement.prototype.$class = 
   new Class("RepeatUntilStatement", RepeatUntilStatement);

RepeatUntilStatement.prototype.prefixAction = function(p) {
   var cp = p;
   var exp = cp.readE(0);
   var s = cp.readBlock();
   return cp.createCompound2(this, exp, s);
};

RepeatUntilStatement.prototype.compile = function(p, args, cv) {
   var tag1 = cv.newLabel();
   var tag2 = cv.newLabel();
   cv.defineLabel(tag1);
   p.compile(args[0], cv);
   cv.addInstruction(SVMC.JUMPT, cv.labelRef(tag2));
   p.compile(args[1], cv);
   cv.addInstruction(SVMC.JUMP, cv.labelRef(tag1));
   cv.defineLabel(tag2);
};


/* CSPVM.js */

var CSPVM = function() {
   SVM.call(this);
   //      this.setTarget(this);
   this.parser = new CSPParser();
   SVMClass.defineClass("CSPFunctionClass", new CSPFunctionClass());
};

CSPVM.prototype = 
   jslib.inheritPrototype(SVM, "CSPVM extends SVM");
CSPVM.prototype.constructor = CSPVM;
CSPVM.prototype.$class = 
   new Class("CSPVM", CSPVM);

CSPVM.prototype.getParser = function() {
   return this.parser;
};

var CSPFunctionClass = function() {
   SVMClass.call(this);
   this.defineMethod("display", new CSP_display());
   this.defineMethod("firstIndex", new CSP_firstIndex());
   this.defineMethod("int", new CSP_int());
   this.defineMethod("lastIndex", new CSP_lastIndex());
   this.defineMethod("length", new CSP_length());
   this.defineMethod("random", new CSP_random());
   this.defineMethod("select", new CSP_select());
};

CSPFunctionClass.prototype = 
   jslib.inheritPrototype(SVMClass, "CSPFunctionClass extends SVMClass");
CSPFunctionClass.prototype.constructor = CSPFunctionClass;
CSPFunctionClass.prototype.$class = 
   new Class("CSPFunctionClass", CSPFunctionClass);

var CSP_display = function() {
   SVMMethod.call(this);
};

CSP_display.prototype =
   jslib.inheritPrototype(SVMMethod, "CSP_display extends SVMMethod");
CSP_display.prototype.constructor = CSP_display;
CSP_display.prototype.$class = 
   new Class("CSP_display", CSP_display);

CSP_display.prototype.execute = function(svm) {
   var console = svm.getConsole();
   if (console === null) {
      alert(svm.pop());
   } else {
      console.println(svm.pop());
   }
};

var CSP_firstIndex = function() {
   SVMMethod.call(this);
};

CSP_firstIndex.prototype =
   jslib.inheritPrototype(SVMMethod, "CSP_firstIndex extends SVMMethod");
CSP_firstIndex.prototype.constructor = CSP_firstIndex;
CSP_firstIndex.prototype.$class = 
   new Class("CSP_firstIndex", CSP_firstIndex);

CSP_firstIndex.prototype.execute = function(svm) {
   var v = svm.pop();
   switch (v.getType()) {
    case Value.STRING:
      svm.pushInteger(0);
      break;
    case Value.OBJECT:
      svm.pushInteger(0);
      break;
    default:
      throw new RuntimeException("Illegal argument to firstIndex");
   }
};

var CSP_int = function() {
   SVMMethod.call(this);
};

CSP_int.prototype =
   jslib.inheritPrototype(SVMMethod, "CSP_int extends SVMMethod");
CSP_int.prototype.constructor = CSP_int;
CSP_int.prototype.$class = 
   new Class("CSP_int", CSP_int);

CSP_int.prototype.execute = function(svm) {
   svm.pushInteger(toInt(svm.popDouble()));
};

var CSP_lastIndex = function() {
   SVMMethod.call(this);
};

CSP_lastIndex.prototype =
   jslib.inheritPrototype(SVMMethod, "CSP_lastIndex extends SVMMethod");
CSP_lastIndex.prototype.constructor = CSP_lastIndex;
CSP_lastIndex.prototype.$class = 
   new Class("CSP_lastIndex", CSP_lastIndex);

CSP_lastIndex.prototype.execute = function(svm) {
   var v = svm.pop();
   switch (v.getType()) {
    case Value.STRING:
      svm.pushInteger(v.getStringValue().length - 1);
      break;
    case Value.OBJECT:
      svm.pushInteger((v.getValue()).size() - 1);
      break;
    default:
      throw new RuntimeException("Illegal argument to lastIndex");
   }
};

var CSP_length = function() {
   SVMMethod.call(this);
};

CSP_length.prototype =
   jslib.inheritPrototype(SVMMethod, "CSP_length extends SVMMethod");
CSP_length.prototype.constructor = CSP_length;
CSP_length.prototype.$class = 
   new Class("CSP_length", CSP_length);

CSP_length.prototype.execute = function(svm) {
   var v = svm.pop();
   switch (v.getType()) {
    case Value.STRING:
      svm.pushInteger(v.getStringValue().length);
      break;
    case Value.OBJECT:
      svm.pushInteger((v.getValue()).size());
      break;
    default:
      throw new RuntimeException("Illegal argument to length");
   }
};

var CSP_random = function() {
   SVMMethod.call(this);
};

CSP_random.prototype =
   jslib.inheritPrototype(SVMMethod, "CSP_random extends SVMMethod");
CSP_random.prototype.constructor = CSP_random;
CSP_random.prototype.$class = 
   new Class("CSP_random", CSP_random);

CSP_random.prototype.execute = function(svm) {
   var high = svm.popInteger();
   var low = svm.popInteger();
   var value = low + toInt(Math.floor((Math.random() * (1 + high - low))));
   svm.pushInteger(value);
};

var CSP_select = function() {
   SVMMethod.call(this);
};

CSP_select.prototype =
   jslib.inheritPrototype(SVMMethod, "CSP_select extends SVMMethod");
CSP_select.prototype.constructor = CSP_select;
CSP_select.prototype.$class = 
   new Class("CSP_select", CSP_select);

CSP_select.prototype.execute = function(svm) {
   var k = svm.popInteger();
   var v = svm.pop();
   switch (v.getType()) {
    case Value.STRING:
      svm.pushString(v.getStringValue().substring(k, k + 1));
      break;
    case Value.OBJECT:
      svm.push((v.getValue()).get(k));
      break;
    default:
      throw new RuntimeException("Illegal argument to select");
   }
};


/* Exports */

return {
   CSPC : CSPC,
   CSPEditor : CSPEditor,
   CSPFunction : CSPFunction,
   CSPLayout : CSPLayout,
   CSPParser : CSPParser,
   CSPVM : CSPVM
};

});
