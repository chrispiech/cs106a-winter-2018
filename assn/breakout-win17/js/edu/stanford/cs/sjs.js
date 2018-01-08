/*
 * File: sjs.js
 * Created on Mon Feb 08 21:55:10 PST 2016 by java2js
 * --------------------------------------------------
 * This file was generated mechanically by the java2js utility.
 * Permanent edits must be made in the Java file.
 */

define([ "jslib",
         "edu/stanford/cs/exp",
         "edu/stanford/cs/java2js",
         "edu/stanford/cs/jsconsole",
         "edu/stanford/cs/jscontrols/JSControl",
         "edu/stanford/cs/jscontrols/LoadControl",
         "edu/stanford/cs/jscontrols/ResetControl",
         "edu/stanford/cs/jscontrols/RunControl",
         "edu/stanford/cs/jscontrols/SaveControl",
         "edu/stanford/cs/jscontrols/StepControl",
         "edu/stanford/cs/parser",
         "edu/stanford/cs/programeditor",
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
         edu_stanford_cs_jscontrols_JSControl,
         edu_stanford_cs_jscontrols_LoadControl,
         edu_stanford_cs_jscontrols_ResetControl,
         edu_stanford_cs_jscontrols_RunControl,
         edu_stanford_cs_jscontrols_SaveControl,
         edu_stanford_cs_jscontrols_StepControl,
         edu_stanford_cs_parser,
         edu_stanford_cs_programeditor,
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
var Value = edu_stanford_cs_exp.Value;
var JSElementList = edu_stanford_cs_java2js.JSElementList;
var JSFrame = edu_stanford_cs_java2js.JSFrame;
var JSLoadDialog = edu_stanford_cs_java2js.JSLoadDialog;
var JSProgram = edu_stanford_cs_java2js.JSProgram;
var JSSaveDialog = edu_stanford_cs_java2js.JSSaveDialog;
var JSConsole = edu_stanford_cs_jsconsole.JSConsole;
var JSControl = edu_stanford_cs_jscontrols_JSControl.JSControl;
var LoadControl = edu_stanford_cs_jscontrols_LoadControl.LoadControl;
var ResetControl = edu_stanford_cs_jscontrols_ResetControl.ResetControl;
var RunControl = edu_stanford_cs_jscontrols_RunControl.RunControl;
var SaveControl = edu_stanford_cs_jscontrols_SaveControl.SaveControl;
var StepControl = edu_stanford_cs_jscontrols_StepControl.StepControl;
var CodeVector = edu_stanford_cs_parser.CodeVector;
var InfixForm = edu_stanford_cs_parser.InfixForm;
var InfixOperator = edu_stanford_cs_parser.InfixOperator;
var NofixOperator = edu_stanford_cs_parser.NofixOperator;
var Operator = edu_stanford_cs_parser.Operator;
var Parser = edu_stanford_cs_parser.Parser;
var PrefixOperator = edu_stanford_cs_parser.PrefixOperator;
var Statement = edu_stanford_cs_parser.Statement;
var SyntaxError = edu_stanford_cs_parser.SyntaxError;
var CommentHighlightMode = edu_stanford_cs_programeditor.CommentHighlightMode;
var ProgramEditor = edu_stanford_cs_programeditor.ProgramEditor;
var SVM = edu_stanford_cs_svm.SVM;
var SVMC = edu_stanford_cs_svm.SVMC;
var SVMClass = edu_stanford_cs_svm.SVMClass;
var SVMMethodClosure = edu_stanford_cs_svm.SVMMethodClosure;
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
var ActionEvent = java_awt.ActionEvent;
var ActionListener = java_awt.ActionListener;
var Class = java_lang.Class;
var Double = java_lang.Double;
var Integer = java_lang.Integer;
var RuntimeException = java_lang.RuntimeException;
var ArrayList = java_util.ArrayList;
var Stack = java_util.Stack;
var TreeMap = java_util.TreeMap;
var TreeSet = java_util.TreeSet;
var JComponent = javax_swing.JComponent;

/* SJS.js */

var SJS = function() {
   JSProgram.call(this);
   this.createProgramFrame();
   this.setTitle("SJS");
   this.svm = new SVM();
   this.svm.setTarget(this.svm);
   this.editor = new SJSEditor();
   this.editor.setPreferredSize(new Dimension(SJSC.EDITOR_WIDTH, SJSC.EDITOR_HEIGHT));
   this.console = new JSConsole();
   this.console.setPreferredSize(new Dimension(SJSC.CONSOLE_WIDTH, SJSC.CONSOLE_HEIGHT));
   this.svm.setConsole(this.console);
   this.loadDialog = new JSLoadDialog(this.getFrame());
   this.loadDialog.addActionListener(new SJSFileLoader(this.editor, this.loadDialog));
   this.loadDialog.setTitle("Examples");
   this.saveDialog = new JSSaveDialog(this.getFrame());
   var consoleFrame = this.createFrame(this.console, "Console");
   var editorFrame = this.createFrame(this.editor, "Untitled");
   this.editor.setFrame(editorFrame);
   this.add(consoleFrame, "console");
   this.add(editorFrame, "editor");
   this.setBackground(SJSC.APPLICATION_BACKGROUND);
   this.createControlStrip();
   this.pack();
   this.setVisible(true);
};

SJS.prototype = 
   jslib.inheritPrototype(JSProgram, "SJS extends JSProgram");
SJS.prototype.constructor = SJS;
SJS.prototype.$class = 
   new Class("SJS", SJS);

SJS.prototype.run = function() {
   this.editor.requestFocus();
};

SJS.prototype.actionPerformed = function(e) {
   var cmd = e.getActionCommand();
   if (jslib.equals(cmd, "Load")) {
      var asize = this.loadDialog.getTarget().getSize();
      var dsize = this.loadDialog.getSize();
      var x = (asize.width - dsize.width) / 2;
      var y = (asize.height - dsize.height) / 2;
      this.loadDialog.setBounds(x, y, dsize.width, dsize.height);
      this.loadDialog.setVisible(true);
   } else if (jslib.equals(cmd, "Save")) {
      var asize = this.saveDialog.getTarget().getSize();
      var dsize = this.saveDialog.getSize();
      var x = (asize.width - dsize.width) / 2;
      var y = (asize.height - dsize.height) / 2;
      this.saveDialog.setBounds(x, y, dsize.width, dsize.height);
      //         this.saveDialog.setText(this.editor.getText());
      this.saveDialog.setVisible(true);
   } else if (jslib.equals(cmd, "Reset")) {
      this.svm.stopAction();
      // this.svm.clear();
   }
};

SJS.prototype.createControlStrip = function() {
   var loadControl = new LoadControl();
   loadControl.addActionListener(this);
   this.svm.addControl(loadControl);
   this.addControl(loadControl);
   var saveControl = new SaveControl();
   saveControl.addActionListener(this);
   this.svm.addControl(saveControl);
   this.addControl(saveControl);
   var resetControl = new ResetControl();
   resetControl.addActionListener(this);
   this.svm.addControl(resetControl);
   this.addControl(resetControl);
   var runControl = new RunControl();
   this.svm.addControl(runControl);
   this.addControl(runControl);
   var stepControl = new StepControl();
   this.svm.addControl(stepControl);
   //      this.addControl(stepControl);
   //      JSControl speedControl = new SpeedControl();
   //      this.svm.addControl(speedControl);
   //      this.addControl(speedControl);
};

SJS.prototype.createFrame = function(component, title) {
   return new JSFrame(component, title);
};

SJS.main = function(args) {
   if (args.length > 1) {
      new SJSCompiler().start(args);
   } else {
      new SJS().run();
   }
};

var SJSFileLoader = function(editor, dialog) {
   this.editor = editor;
   this.dialog = dialog;
};

SJSFileLoader.prototype.actionPerformed = function(e) {
   this.editor.removeAllBreakpoints();
   this.editor.setText(e.getActionCommand());
   this.editor.setCursorPosition(0);
   var frame = this.editor.getFrame();
   //      if (frame !== null) frame.setTitle(this.dialog.getSelectedFile().getTail());
};


/* SJSANDOperator.js */

var SJSANDOperator = function() {
   InfixForm.call(this);
};

SJSANDOperator.prototype =
   jslib.inheritPrototype(InfixForm, "SJSANDOperator extends InfixForm");
SJSANDOperator.prototype.constructor = SJSANDOperator;
SJSANDOperator.prototype.$class = 
   new Class("SJSANDOperator", SJSANDOperator);

SJSANDOperator.prototype.compile = function(p, args, cv) {
   var tag1 = cv.newLabel();
   var tag2 = cv.newLabel();
   p.compile(args[0], cv);
   cv.addInstruction(SVMC.JUMPF, cv.labelRef(tag1));
   p.compile(args[1], cv);
   cv.addInstruction(SVMC.JUMP, cv.labelRef(tag2));
   cv.defineLabel(tag1);
   cv.addInstruction(SVMC.CALLM, cv.stringRef("Core.FALSE"));
   cv.defineLabel(tag2);
};


/* SJSArithmeticOperator.js */

var SJSArithmeticOperator = function() {
   InfixOperator.call(this);
};

SJSArithmeticOperator.prototype =
   jslib.inheritPrototype(InfixOperator, "SJSArithmeticOperator extends InfixOperator");
SJSArithmeticOperator.prototype.constructor = SJSArithmeticOperator;
SJSArithmeticOperator.prototype.$class = 
   new Class("SJSArithmeticOperator", SJSArithmeticOperator);

SJSArithmeticOperator.prototype.compile = function(parser, args, cv) {
   parser.compile(args[0], cv);
   parser.compile(args[1], cv);
   cv.addInstruction(this.getInstructionCode(), 0);
};

SJSArithmeticOperator.prototype.getInstructionCode = function() {
   throw new RuntimeException("Undefined instruction");
};


/* SJSASHRightOperator.js */

var SJSASHRightOperator = function() {
   InfixOperator.call(this);
};

SJSASHRightOperator.prototype =
   jslib.inheritPrototype(InfixOperator, "SJSASHRightOperator extends InfixOperator");
SJSASHRightOperator.prototype.constructor = SJSASHRightOperator;
SJSASHRightOperator.prototype.$class = 
   new Class("SJSASHRightOperator", SJSASHRightOperator);

SJSASHRightOperator.prototype.compile = function(p, args, cv) {
   p.compile(args[0], cv);
   p.compile(args[1], cv);
   cv.addInstruction(SVMC.NEG, 0);
   cv.addInstruction(SVMC.ASH, 0);
};


/* SJSAssignmentOperator.js */

var SJSAssignmentOperator = function() {
   InfixForm.call(this);
};

SJSAssignmentOperator.prototype =
   jslib.inheritPrototype(InfixForm, "SJSAssignmentOperator extends InfixForm");
SJSAssignmentOperator.prototype.constructor = SJSAssignmentOperator;
SJSAssignmentOperator.prototype.$class = 
   new Class("SJSAssignmentOperator", SJSAssignmentOperator);

SJSAssignmentOperator.prototype.compile = function(p, args, cv) {
   SJSAssignmentOperator.compileLHS(p, args[0], cv);
   p.compile(args[1], cv);
   cv.addInstruction(SVMC.DUP, 0);
   var type = args[0].getType();
   if (type === Expression.COMPOUND) {
      cv.addInstruction(SVMC.ROLL, 4);
      cv.addInstruction(SVMC.CALLM, cv.stringRef("Core.assign"));
   } else if (type === Expression.IDENTIFIER) {
      cv.addInstruction(SVMC.POPVAR, cv.stringRef(args[0].getName()));
   }
};

SJSAssignmentOperator.prototype.isAssignmentOperator = function() {
   return true;
};

SJSAssignmentOperator.compileLHS = function(p, exp, cv) {
   var type = exp.getType();
   if (type === Expression.COMPOUND) {
      var op = exp.getFunction();
      var lhs = exp.getArgs()[0];
      var rhs = exp.getArgs()[1];
      if (op.getType() === Expression.OPERATOR) {
         var name = op.getName();
         if (jslib.equals(name, ".") && rhs.getType() === Expression.IDENTIFIER) {
            p.compile(lhs, cv);
            cv.addInstruction(SVMC.PUSHSTR, cv.stringRef(rhs.getName()));
         } else if (jslib.equals(name, "[")) {
            p.compile(lhs, cv);
            p.compile(rhs, cv);
         } else {
            throw new SyntaxError("Illegal assignment");
         }
      }
   } else if (type !== Expression.IDENTIFIER) {
      throw new SyntaxError("Illegal assignment");
   }
};

SJSAssignmentOperator.compileLHV = function(p, exp, cv) {
   var type = exp.getType();
   if (type === Expression.COMPOUND) {
      var op = exp.getFunction();
      var lhs = exp.getArgs()[0];
      var rhs = exp.getArgs()[1];
      if (op.getType() === Expression.OPERATOR) {
         var name = op.getName();
         if (jslib.equals(name, ".") && rhs.getType() === Expression.IDENTIFIER) {
            p.compile(lhs, cv);
            cv.addInstruction(SVMC.DUP, 0);
            cv.addInstruction(SVMC.PUSHSTR, cv.stringRef(rhs.getName()));
         } else if (jslib.equals(name, "[")) {
            p.compile(lhs, cv);
            cv.addInstruction(SVMC.DUP, 0);
            p.compile(rhs, cv);
         } else {
            throw new SyntaxError("Illegal assignment");
         }
         cv.addInstruction(SVMC.DUP, 0);
         cv.addInstruction(SVMC.ROLL, 4);
         cv.addInstruction(SVMC.CALLM, cv.stringRef("Core.select"));
      }
   } else if (type === Expression.IDENTIFIER) {
      cv.addInstruction(SVMC.PUSHVAR, cv.stringRef(exp.getName()));
   } else {
      throw new SyntaxError("Illegal assignment");
   }
};


/* SJSBitwiseANDOperator.js */

var SJSBitwiseANDOperator = function() {
   InfixOperator.call(this);
};

SJSBitwiseANDOperator.prototype =
   jslib.inheritPrototype(InfixOperator, "SJSBitwiseANDOperator extends InfixOperator");
SJSBitwiseANDOperator.prototype.constructor = SJSBitwiseANDOperator;
SJSBitwiseANDOperator.prototype.$class = 
   new Class("SJSBitwiseANDOperator", SJSBitwiseANDOperator);

SJSBitwiseANDOperator.prototype.compile = function(p, args, cv) {
   p.compile(args[0], cv);
   p.compile(args[1], cv);
   cv.addInstruction(SVMC.AND, 0);
};


/* SJSBitwiseNOTOperator.js */

var SJSBitwiseNOTOperator = function() {
   PrefixOperator.call(this);
};

SJSBitwiseNOTOperator.prototype =
   jslib.inheritPrototype(PrefixOperator, "SJSBitwiseNOTOperator extends PrefixOperator");
SJSBitwiseNOTOperator.prototype.constructor = SJSBitwiseNOTOperator;
SJSBitwiseNOTOperator.prototype.$class = 
   new Class("SJSBitwiseNOTOperator", SJSBitwiseNOTOperator);

SJSBitwiseNOTOperator.prototype.compile = function(p, args, cv) {
   p.compile(args[0], cv);
   cv.addInstruction(SVMC.NOT, 0);
};


/* SJSBitwiseOROperator.js */

var SJSBitwiseOROperator = function() {
   InfixOperator.call(this);
};

SJSBitwiseOROperator.prototype =
   jslib.inheritPrototype(InfixOperator, "SJSBitwiseOROperator extends InfixOperator");
SJSBitwiseOROperator.prototype.constructor = SJSBitwiseOROperator;
SJSBitwiseOROperator.prototype.$class = 
   new Class("SJSBitwiseOROperator", SJSBitwiseOROperator);

SJSBitwiseOROperator.prototype.compile = function(p, args, cv) {
   p.compile(args[0], cv);
   p.compile(args[1], cv);
   cv.addInstruction(SVMC.OR, 0);
};


/* SJSBitwiseXOROperator.js */

var SJSBitwiseXOROperator = function() {
   InfixOperator.call(this);
};

SJSBitwiseXOROperator.prototype =
   jslib.inheritPrototype(InfixOperator, "SJSBitwiseXOROperator extends InfixOperator");
SJSBitwiseXOROperator.prototype.constructor = SJSBitwiseXOROperator;
SJSBitwiseXOROperator.prototype.$class = 
   new Class("SJSBitwiseXOROperator", SJSBitwiseXOROperator);

SJSBitwiseXOROperator.prototype.compile = function(p, args, cv) {
   p.compile(args[0], cv);
   p.compile(args[1], cv);
   cv.addInstruction(SVMC.XOR, 0);
};


/* SJSBlockOperator.js */

var SJSBlockOperator = function() {
   Operator.call(this);
   this.setName("BLOCK");
};

SJSBlockOperator.prototype = 
   jslib.inheritPrototype(Operator, "SJSBlockOperator extends Operator");
SJSBlockOperator.prototype.constructor = SJSBlockOperator;
SJSBlockOperator.prototype.$class = 
   new Class("SJSBlockOperator", SJSBlockOperator);

SJSBlockOperator.prototype.compile = function(p, args, cv) {
   for (var i = 0; i < args.length; i++) {
      p.compile(args[i], cv);
   }
};


/* SJSBraceOperator.js */

var SJSBraceOperator = function() {
   Operator.call(this);
};

SJSBraceOperator.prototype =
   jslib.inheritPrototype(Operator, "SJSBraceOperator extends Operator");
SJSBraceOperator.prototype.constructor = SJSBraceOperator;
SJSBraceOperator.prototype.$class = 
   new Class("SJSBraceOperator", SJSBraceOperator);

SJSBraceOperator.prototype.prefixAction = function(p) {
   var list = new ArrayList();
   var name = p.nextToken();
   if (!jslib.equals(name, "}")) {
      while (true) {
         switch (p.getTokenType(name)) {
          case TokenScanner.STRING:
            name = p.getTokenScanner().getStringValue(name);
            break;
          case TokenScanner.WORD:
            break;
          default:
            throw new SyntaxError("Illegal field name");
         }
         p.verifyToken(":");
         var exp = p.readE(0);
         list.add(new Constant(Value.createString(name)));
         list.add(exp);
         var token = p.nextToken();
         if (jslib.equals(token, "}")) break;
         if (!jslib.equals(token, ",")) {
            throw new SyntaxError("Found '" + token +
            "' when expecting ',' or '}'");
         }
         name = p.nextToken();
      }
   }
   var args = jslib.newArray(list.size());
   for (var i = 0; i < args.length; i++) {
      args[i] = list.get(i);
   }
   return p.createCompound(this, args);
};

SJSBraceOperator.prototype.compile = function(p, args, cv) {
   for (var i = 0; i < args.length; i++) {
      p.compile(args[i], cv);
   }
   cv.addInstruction(SVMC.CALLM, cv.stringRef("Object.create"));
   cv.addInstruction(SVMC.NARGS, args.length);
};

SJSBraceOperator.prototype.unparse = function(p, args) {
   return "{" + p.unparse(args[0]) + "}";
};


/* SJSBracketOperator.js */

var SJSBracketOperator = function() {
   Operator.call(this);
};

SJSBracketOperator.prototype =
   jslib.inheritPrototype(Operator, "SJSBracketOperator extends Operator");
SJSBracketOperator.prototype.constructor = SJSBracketOperator;
SJSBracketOperator.prototype.$class = 
   new Class("SJSBracketOperator", SJSBracketOperator);

SJSBracketOperator.prototype.prefixAction = function(p) {
   var list = new ArrayList();
   var token = p.nextToken();
   if (!jslib.equals(token, "]")) {
      p.saveToken(token);
      while (true) {
         var exp = p.readE(0);
         list.add(exp);
         token = p.nextToken();
         if (jslib.equals(token, "]")) break;
         if (!jslib.equals(token, ",")) {
            throw new SyntaxError("Found '" + token +
            "' when expecting ',' or ']'");
         }
      }
   }
   var args = jslib.newArray(list.size());
   for (var i = 0; i < args.length; i++) {
      args[i] = list.get(i);
   }
   return p.createCompound(p.lookupOperator("[...]"), args);
};

SJSBracketOperator.prototype.infixAction = function(p, lhs) {
   var exp = p.readE(0);
   p.verifyToken("]");
   return p.createCompound2(this, lhs, exp);
};

SJSBracketOperator.prototype.compile = function(p, args, cv) {
   p.compile(args[0], cv);
   p.compile(args[1], cv);
   cv.addInstruction(SVMC.CALLM, cv.stringRef("Core.select"));
};

SJSBracketOperator.prototype.unparse = function(p, args) {
   return p.unparse(args[0]) + "[" + p.unparse(args[1]) + "]";
};


/* SJSBreakStatement.js */

var SJSBreakStatement = function() {
   Statement.call(this);
};

SJSBreakStatement.prototype =
   jslib.inheritPrototype(Statement, "SJSBreakStatement extends Statement");
SJSBreakStatement.prototype.constructor = SJSBreakStatement;
SJSBreakStatement.prototype.$class = 
   new Class("SJSBreakStatement", SJSBreakStatement);

SJSBreakStatement.prototype.prefixAction = function(p) {
   p.verifyToken(";");
   return p.createCompound0(this);
};

SJSBreakStatement.prototype.compile = function(p, args, cv) {
   var jsp = p;
   var tag = jsp.getBreakLabel();
   if (tag === null) {
      throw new SyntaxError("Illegal use of break statement");
   }
   cv.addInstruction(SVMC.JUMP, cv.labelRef(tag));
};


/* SJSC.js */

var SJSC = function() {
   /* Empty */
};

SJSC.APPLICATION_BACKGROUND = new Color(0xCCFFFF);
SJSC.EDITOR_FONT = Font.decode("Courier New-Bold-18");
SJSC.CONSOLE_FONT = Font.decode("Courier New-Bold-18");
SJSC.HOME = "http://cs.stanford.edu/~eroberts/demos";
SJSC.ROOT = SJSC.HOME + "/SJS";
SJSC.EXAMPLES = SJSC.ROOT + "/examples";
SJSC.EDITOR_HEIGHT = 600;
SJSC.EDITOR_WIDTH = 700;
SJSC.CONSOLE_EDITOR_SEP = 30;
SJSC.CONSOLE_HEIGHT = 600;
SJSC.CONSOLE_WIDTH = 350;
SJSC.SIDE_MARGIN = 20;
SJSC.TOP_MARGIN = 20;
SJSC.BOTTOM_MARGIN = 20;

/* SJSCaseStatement.js */

var SJSCaseStatement = function() {
   Statement.call(this);
};

SJSCaseStatement.prototype =
   jslib.inheritPrototype(Statement, "SJSCaseStatement extends Statement");
SJSCaseStatement.prototype.constructor = SJSCaseStatement;
SJSCaseStatement.prototype.$class = 
   new Class("SJSCaseStatement", SJSCaseStatement);

SJSCaseStatement.prototype.prefixAction = function(p) {
   throw new SyntaxError("A case statement must be inside a switch");
};

SJSCaseStatement.prototype.compile = function(p, args, cv) {
   var jsp = p;
   var tag = jsp.getNextLabel();
   if (tag !== null) cv.defineLabel(tag);
   tag = cv.newLabel();
   jsp.setNextLabel(tag);
   var temp = "v_" + jsp.getStatementDepth();
   cv.addInstruction(SVMC.PUSHVAR, cv.stringRef(temp));
   jsp.compile(args[0], cv);
   cv.addInstruction(SVMC.EQ, 0);
   cv.addInstruction(SVMC.JUMPF, cv.labelRef(tag));
};


/* SJSContinueStatement.js */

var SJSContinueStatement = function() {
   Statement.call(this);
};

SJSContinueStatement.prototype =
   jslib.inheritPrototype(Statement, "SJSContinueStatement extends Statement");
SJSContinueStatement.prototype.constructor = SJSContinueStatement;
SJSContinueStatement.prototype.$class = 
   new Class("SJSContinueStatement", SJSContinueStatement);

SJSContinueStatement.prototype.prefixAction = function(p) {
   p.verifyToken(";");
   return p.createCompound0(this);
};

SJSContinueStatement.prototype.compile = function(p, args, cv) {
   var jsp = p;
   var tag = jsp.getContinueLabel();
   if (tag === null) {
      throw new SyntaxError("Illegal use of continue statement");
   }
   cv.addInstruction(SVMC.JUMP, cv.labelRef(tag));
};


/* SJSPrefixIncDecOperator.js */

var SJSPrefixIncDecOperator = function() {
   Operator.call(this);
};

SJSPrefixIncDecOperator.prototype =
   jslib.inheritPrototype(Operator, "SJSPrefixIncDecOperator extends Operator");
SJSPrefixIncDecOperator.prototype.constructor = SJSPrefixIncDecOperator;
SJSPrefixIncDecOperator.prototype.$class = 
   new Class("SJSPrefixIncDecOperator", SJSPrefixIncDecOperator);

SJSPrefixIncDecOperator.prototype.prefixAction = function(p) {
   return p.createCompound1(this, p.readE(this.getPrefixPrecedence()));
};

SJSPrefixIncDecOperator.prototype.infixAction = function(p, lhs) {
   return p.createCompound1(p.getOperator("x" + this.getName()), lhs);
};

SJSPrefixIncDecOperator.prototype.unparse = function(p, args) {
   return this.toString() + p.unparse(args[0]);
};

SJSPrefixIncDecOperator.prototype.compile = function(p, args, cv) {
   SJSAssignmentOperator.compileLHV(p, args[0], cv);
   cv.addInstruction(SVMC.PUSHINT, 1);
   cv.addInstruction(this.getInstructionCode(), 0);
   cv.addInstruction(SVMC.DUP, 0);
   var type = args[0].getType();
   if (type === Expression.COMPOUND) {
      cv.addInstruction(SVMC.ROLL, 3);
      cv.addInstruction(SVMC.CALLM, cv.stringRef("Core.assign"));
   } else if (type === Expression.IDENTIFIER) {
      cv.addInstruction(SVMC.POPVAR, cv.stringRef(args[0].getName()));
   }
};


/* SJSDecrementOperator.js */

var SJSDecrementOperator = function() {
   SJSPrefixIncDecOperator.call(this);
};

SJSDecrementOperator.prototype =
   jslib.inheritPrototype(SJSPrefixIncDecOperator, "SJSDecrementOperator extends SJSPrefixIncDecOperator");
SJSDecrementOperator.prototype.constructor = SJSDecrementOperator;
SJSDecrementOperator.prototype.$class = 
   new Class("SJSDecrementOperator", SJSDecrementOperator);

SJSDecrementOperator.prototype.getInstructionCode = function() {
   return SVMC.SUB;
};

SJSDecrementOperator.prototype.getSign = function() {
   return -1;
};


/* SJSDefaultStatement.js */

var SJSDefaultStatement = function() {
   Statement.call(this);
};

SJSDefaultStatement.prototype =
   jslib.inheritPrototype(Statement, "SJSDefaultStatement extends Statement");
SJSDefaultStatement.prototype.constructor = SJSDefaultStatement;
SJSDefaultStatement.prototype.$class = 
   new Class("SJSDefaultStatement", SJSDefaultStatement);

SJSDefaultStatement.prototype.prefixAction = function(p) {
   throw new SyntaxError("A default statement must be inside a switch");
};

SJSDefaultStatement.prototype.compile = function(p, args, cv) {
   var jsp = p;
   var tag = jsp.getNextLabel();
   if (tag !== null) cv.defineLabel(tag);
   jsp.setNextLabel(null);
};


/* SJSDirective.js */

var SJSDirective = function() {
   /* Empty */
};

SJSDirective.init = function() {
   SJSDirective.directives = new TreeMap();
   SJSDirective.directives.put("IMPORT", new SVMImportDirective());
};

SJSDirective.lookup = function(name) {
   return SJSDirective.directives.get(name);
};

var SVMImportDirective = function() {
   SJSDirective.call(this);
};

SVMImportDirective.prototype =
   jslib.inheritPrototype(SJSDirective, "SVMImportDirective extends SJSDirective");
SVMImportDirective.prototype.constructor = SVMImportDirective;
SVMImportDirective.prototype.$class = 
   new Class("SVMImportDirective", SVMImportDirective);

SVMImportDirective.prototype.execute = function(parser) {
   var pkg = parser.nextToken();
   var token = parser.nextToken();
   if (jslib.equals(token, "\n") || jslib.equals(token, ";")) {
      parser.addImport(pkg);
   } else {
      throw new RuntimeException("Illegal import declaration");
   }
};

SVMImportDirective.prototype = 
   jslib.inheritPrototype(SJSDirective, "SVMImportDirective extends SJSDirective");
SVMImportDirective.prototype.constructor = SVMImportDirective;
SVMImportDirective.prototype.$class = 
   new Class("SVMImportDirective", SVMImportDirective);


/* SJSDotOperator.js */

var SJSDotOperator = function() {
   Operator.call(this);
};

SJSDotOperator.prototype =
   jslib.inheritPrototype(Operator, "SJSDotOperator extends Operator");
SJSDotOperator.prototype.constructor = SJSDotOperator;
SJSDotOperator.prototype.$class = 
   new Class("SJSDotOperator", SJSDotOperator);

SJSDotOperator.prototype.infixAction = function(p, lhs) {
   var token = p.nextToken();
   if (p.getTokenType(token) !== TokenScanner.WORD) {
      throw new SyntaxError("Illegal field name");
   }
   return p.createCompound2(this, lhs, p.createIdentifier(token));
};

SJSDotOperator.prototype.compile = function(p, args, cv) {
   var lhs = args[0];
   var rhs = args[1];
   p.compile(lhs, cv);
   cv.addInstruction(SVMC.PUSHSTR, cv.stringRef(rhs.getName()));
   cv.addInstruction(SVMC.CALLM, cv.stringRef("Core.select"));
};

SJSDotOperator.prototype.unparse = function(p, args) {
   return p.unparse(args[0]) + "." + p.unparse(args[1]);
};


/* SJSEditor.js */

var SJSEditor = function() {
   ProgramEditor.call(this);
   this.scanner = new TokenScanner();
   this.scanner.ignoreWhitespace();
   this.scanner.ignoreComments();
   this.scanner.scanNumbers();
   this.scanner.addWordCharacters("_");
   this.setFont(SJSC.EDITOR_FONT);
   this.setLineWrap(false);
   this.setEditorMode(new CommentHighlightMode());
};

SJSEditor.prototype = 
   jslib.inheritPrototype(ProgramEditor, "SJSEditor extends ProgramEditor");
SJSEditor.prototype.constructor = SJSEditor;
SJSEditor.prototype.$class = 
   new Class("SJSEditor", SJSEditor);

SJSEditor.prototype.getPreferredSize = function() {
   return new Dimension(SJSC.EDITOR_WIDTH, SJSC.EDITOR_HEIGHT);
};

SJSEditor.prototype.isBreakpointLegal = function(k) {
   this.updateLineTable();
   return this.lineTable.containsValue(k);
};

SJSEditor.prototype.getSourceLineIndex = function(addr) {
   var k = this.lineTable.get(addr);
   return (k === null) ? 0 : k;
};

SJSEditor.prototype.updateLineTable = function() {
   // Fill in
};

SJSEditor.prototype.paint = function(g) {
   if (g.getFont().getSize() >= 22) return;
   ProgramEditor.prototype.paint.call(this, g);
};


/* SJSEqualOperator.js */

var SJSEqualOperator = function() {
   InfixOperator.call(this);
};

SJSEqualOperator.prototype =
   jslib.inheritPrototype(InfixOperator, "SJSEqualOperator extends InfixOperator");
SJSEqualOperator.prototype.constructor = SJSEqualOperator;
SJSEqualOperator.prototype.$class = 
   new Class("SJSEqualOperator", SJSEqualOperator);

SJSEqualOperator.prototype.compile = function(parser, args, cv) {
   parser.compile(args[0], cv);
   parser.compile(args[1], cv);
   cv.addInstruction(SVMC.EQ, 0);
};


/* SJSFalseOperator.js */

var SJSFalseOperator = function() {
   NofixOperator.call(this);
};

SJSFalseOperator.prototype =
   jslib.inheritPrototype(NofixOperator, "SJSFalseOperator extends NofixOperator");
SJSFalseOperator.prototype.constructor = SJSFalseOperator;
SJSFalseOperator.prototype.$class = 
   new Class("SJSFalseOperator", SJSFalseOperator);

SJSFalseOperator.prototype.compile = function(p, args, cv) {
   cv.addInstruction(SVMC.CALLM, cv.stringRef("Core.FALSE"));
};


/* SJSForStatement.js */

var SJSForStatement = function() {
   Statement.call(this);
};

SJSForStatement.prototype =
   jslib.inheritPrototype(Statement, "SJSForStatement extends Statement");
SJSForStatement.prototype.constructor = SJSForStatement;
SJSForStatement.prototype.$class = 
   new Class("SJSForStatement", SJSForStatement);

SJSForStatement.prototype.prefixAction = function(p) {
   var init = null;
   var test = null;
   var step = null;
   p.verifyToken("(");
   var token = p.nextToken();
   if (!jslib.equals(token, ";")) {
      p.saveToken(token);
      init = p.readE(0);
      token = p.nextToken();
      if (jslib.equals(token, "in")) {
         var exp = p.readE(0);
         p.verifyToken(")");
         var stmt = (p).readCompoundStatement();
         return p.createCompound3(this, init, exp, stmt);
      } else {
         p.saveToken(token);
         p.verifyToken(";");
      }
   }
   token = p.nextToken();
   if (!jslib.equals(token, ";")) {
      p.saveToken(token);
      test = p.readE(0);
      p.verifyToken(";");
   }
   token = p.nextToken();
   if (!jslib.equals(token, ")")) {
      p.saveToken(token);
      step = p.readE(0);
      p.verifyToken(")");
   }
   var stmt = (p).readCompoundStatement();
   return p.createCompound4(this, init, test, step, stmt);
};

SJSForStatement.prototype.compile = function(p, args, cv) {
   if (args.length === 3) {
      this.compileForeach(p, args, cv);
   } else {
      this.compileFor(p, args, cv);
   }
};

SJSForStatement.prototype.compileFor = function(p, args, cv) {
   var jsp = p;
   var init = args[0];
   var test = args[1];
   var step = args[2];
   var stmt = args[3];
   var tag1 = cv.newLabel();
   var tag2 = cv.newLabel();
   var tag3 = cv.newLabel();
   jsp.pushStatementContext(tag3, tag2);
   if (init !== null) {
      jsp.compile(init, cv);
   }
   cv.defineLabel(tag1);
   if (test !== null) {
      jsp.compile(test, cv);
      cv.addInstruction(SVMC.JUMPF, cv.labelRef(tag3));
   }
   jsp.compile(stmt, cv);
   cv.defineLabel(tag2);
   if (step !== null) {
      jsp.compile(step, cv);
   }
   cv.addInstruction(SVMC.JUMP, cv.labelRef(tag1));
   cv.defineLabel(tag3);
   jsp.popStatementContext();
};

SJSForStatement.prototype.compileForeach = function(p, args, cv) {
   var jsp = p;
   var id = args[0];
   var exp = args[1];
   var stmt = args[2];
   var tag1 = cv.newLabel();
   var tag2 = cv.newLabel();
   var tag3 = cv.newLabel();
   var index = "i_" + jsp.getStatementDepth();
   var max = "n_" + jsp.getStatementDepth();
   var array = "a_" + jsp.getStatementDepth();
   jsp.pushStatementContext(tag3, tag2);
   jsp.compile(exp, cv);
   cv.addInstruction(SVMC.VAR, cv.stringRef(index));
   cv.addInstruction(SVMC.VAR, cv.stringRef(max));
   cv.addInstruction(SVMC.VAR, cv.stringRef(array));
   cv.addInstruction(SVMC.CALLM, cv.stringRef("keyArray"));
   cv.addInstruction(SVMC.NARGS, 0);
   cv.addInstruction(SVMC.DUP, 0);
   cv.addInstruction(SVMC.PUSHSTR, cv.stringRef("length"));
   cv.addInstruction(SVMC.CALLM, cv.stringRef("Core.select"));
   cv.addInstruction(SVMC.NARGS, 2);
   cv.addInstruction(SVMC.POPVAR, cv.stringRef(max));
   cv.addInstruction(SVMC.POPVAR, cv.stringRef(array));
   cv.addInstruction(SVMC.PUSHINT, 0);
   cv.addInstruction(SVMC.POPVAR, cv.stringRef(index));
   cv.defineLabel(tag1);
   cv.addInstruction(SVMC.PUSHVAR, cv.stringRef(index));
   cv.addInstruction(SVMC.PUSHVAR, cv.stringRef(max));
   cv.addInstruction(SVMC.LT, 0);
   cv.addInstruction(SVMC.JUMPF, cv.labelRef(tag3));
   cv.addInstruction(SVMC.PUSHVAR, cv.stringRef(array));
   cv.addInstruction(SVMC.PUSHVAR, cv.stringRef(index));
   cv.addInstruction(SVMC.CALLM, cv.stringRef("Core.select"));
   cv.addInstruction(SVMC.NARGS, 2);
   cv.addInstruction(SVMC.POPVAR, cv.stringRef(id.getName()));
   jsp.compile(stmt, cv);
   cv.defineLabel(tag2);
   cv.addInstruction(SVMC.PUSHVAR, cv.stringRef(index));
   cv.addInstruction(SVMC.PUSHINT, 1);
   cv.addInstruction(SVMC.ADD, 0);
   cv.addInstruction(SVMC.POPVAR, cv.stringRef(index));
   cv.addInstruction(SVMC.JUMP, cv.labelRef(tag1));
   cv.defineLabel(tag3);
   jsp.popStatementContext();
};


/* SJSFunctionKeyword.js */

var SJSFunctionKeyword = function() {
   PrefixOperator.call(this);
};

SJSFunctionKeyword.prototype =
   jslib.inheritPrototype(PrefixOperator, "SJSFunctionKeyword extends PrefixOperator");
SJSFunctionKeyword.prototype.constructor = SJSFunctionKeyword;
SJSFunctionKeyword.prototype.$class = 
   new Class("SJSFunctionKeyword", SJSFunctionKeyword);

SJSFunctionKeyword.prototype.prefixAction = function(p) {
   var jsp = p;
   var locals = jsp.getLocals();
   var fn = jsp.readFunction();
   jsp.setLocals(locals);
   return fn;
};

SJSFunctionKeyword.prototype.compile = function(p, args, cv) {
   cv.addInstruction(SVMC.PUSHFN, cv.labelRef(args[0].getName()));
};


/* SJSGlobals.js */

var SJSGlobals = function() {
   /* Empty */
};

SJSGlobals.defineGlobalObjects = function(svm) {
   SJSGlobals.defineMethod(svm, "alert", "Console", "showErrorMessage");
   SJSGlobals.defineMethod(svm, "getFloat", "Console", "getNumber");
   SJSGlobals.defineMethod(svm, "getInt", "Console", "getInt");
   SJSGlobals.defineMethod(svm, "getLine", "Console", "getLine");
   SJSGlobals.defineMethod(svm, "getNumber", "Console", "getNumber");
   SJSGlobals.defineMethod(svm, "print", "Console", "print");
   SJSGlobals.defineMethod(svm, "println", "Console", "println");
   SJSGlobals.defineMethod(svm, "isFinite", "Number", "isFinite");
   SJSGlobals.defineMethod(svm, "isNaN", "Number", "isNaN");
   SJSGlobals.defineMethod(svm, "parseFloat", "Number", "parseFloat");
   SJSGlobals.defineMethod(svm, "parseInt", "Number", "parseInt");
};

SJSGlobals.defineMethod = function(svm, name, className, methodName) {
   var obj = new SVMMethodClosure(null, className, methodName);
   svm.setGlobal(name, Value.createObject(obj, "MethodClosure"));
};


/* SJSRelationalOperator.js */

var SJSRelationalOperator = function() {
   InfixOperator.call(this);
};

SJSRelationalOperator.prototype =
   jslib.inheritPrototype(InfixOperator, "SJSRelationalOperator extends InfixOperator");
SJSRelationalOperator.prototype.constructor = SJSRelationalOperator;
SJSRelationalOperator.prototype.$class = 
   new Class("SJSRelationalOperator", SJSRelationalOperator);

SJSRelationalOperator.prototype.compile = function(parser, args, cv) {
   parser.compile(args[0], cv);
   parser.compile(args[1], cv);
   cv.addInstruction(this.getInstructionCode(), 0);
};

SJSRelationalOperator.prototype.applyInteger = function(lhs, rhs) {
   throw new RuntimeException("Illegal types for " + this);
};

SJSRelationalOperator.prototype.applyDouble = function(lhs, rhs) {
   throw new RuntimeException("Illegal types for " + this);
};

SJSRelationalOperator.prototype.getInstructionCode = function() {
   throw new RuntimeException("Undefined instruction");
};


/* SJSGreaterEqualOperator.js */

var SJSGreaterEqualOperator = function() {
   SJSRelationalOperator.call(this);
};

SJSGreaterEqualOperator.prototype =
   jslib.inheritPrototype(SJSRelationalOperator, "SJSGreaterEqualOperator extends SJSRelationalOperator");
SJSGreaterEqualOperator.prototype.constructor = SJSGreaterEqualOperator;
SJSGreaterEqualOperator.prototype.$class = 
   new Class("SJSGreaterEqualOperator", SJSGreaterEqualOperator);

SJSGreaterEqualOperator.prototype.applyInteger = function(x, y) {
   return x >= y;
};

SJSGreaterEqualOperator.prototype.applyDouble = function(x, y) {
   return x >= y;
};

SJSGreaterEqualOperator.prototype.getInstructionCode = function() {
   return SVMC.GE;
};


/* SJSGreaterThanOperator.js */

var SJSGreaterThanOperator = function() {
   SJSRelationalOperator.call(this);
};

SJSGreaterThanOperator.prototype =
   jslib.inheritPrototype(SJSRelationalOperator, "SJSGreaterThanOperator extends SJSRelationalOperator");
SJSGreaterThanOperator.prototype.constructor = SJSGreaterThanOperator;
SJSGreaterThanOperator.prototype.$class = 
   new Class("SJSGreaterThanOperator", SJSGreaterThanOperator);

SJSGreaterThanOperator.prototype.applyInteger = function(x, y) {
   return x > y;
};

SJSGreaterThanOperator.prototype.applyDouble = function(x, y) {
   return x > y;
};

SJSGreaterThanOperator.prototype.getInstructionCode = function() {
   return SVMC.GT;
};


/* SJSIfStatement.js */

var SJSIfStatement = function() {
   Statement.call(this);
};

SJSIfStatement.prototype =
   jslib.inheritPrototype(Statement, "SJSIfStatement extends Statement");
SJSIfStatement.prototype.constructor = SJSIfStatement;
SJSIfStatement.prototype.$class = 
   new Class("SJSIfStatement", SJSIfStatement);

SJSIfStatement.prototype.prefixAction = function(p) {
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

SJSIfStatement.prototype.compile = function(p, args, cv) {
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


/* SJSIncrementOperator.js */

var SJSIncrementOperator = function() {
   SJSPrefixIncDecOperator.call(this);
};

SJSIncrementOperator.prototype =
   jslib.inheritPrototype(SJSPrefixIncDecOperator, "SJSIncrementOperator extends SJSPrefixIncDecOperator");
SJSIncrementOperator.prototype.constructor = SJSIncrementOperator;
SJSIncrementOperator.prototype.$class = 
   new Class("SJSIncrementOperator", SJSIncrementOperator);

SJSIncrementOperator.prototype.getInstructionCode = function() {
   return SVMC.ADD;
};

SJSIncrementOperator.prototype.getSign = function() {
   return 1;
};


/* SJSLayout.js */

var SJSLayout = function() {
   /* Empty */
};

SJSLayout.prototype.addLayoutComponent = function(name, comp) {
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

SJSLayout.prototype.removeLayoutComponent = function(comp) {
   /* Empty */
};

SJSLayout.prototype.preferredLayoutSize = function(target) {
   if (target.getTreeLock()) {
      var eSize = this.editor.getPreferredSize();
      var cSize = this.console.getPreferredSize();
      var ctlSize = this.controls.getPreferredSize();
      var width = 2 * SJSC.SIDE_MARGIN + eSize.width + cSize.width +
      SJSC.CONSOLE_EDITOR_SEP;
      var height = SJSC.TOP_MARGIN + cSize.height + SJSC.BOTTOM_MARGIN +
      ctlSize.height;
      var insets = target.getInsets();
      width += insets.left + insets.right;
      height += insets.top + insets.bottom;
      return new Dimension(width, height);
   }
};

SJSLayout.prototype.minimumLayoutSize = function(target) {
   return this.preferredLayoutSize(target);
};

SJSLayout.prototype.layoutContainer = function(target) {
   if (target.getTreeLock()) {
      var insets = target.getInsets();
      var ctlSize = this.controls.getPreferredSize();
      var bounds = target.getBounds();
      var x = bounds.x + insets.left;
      var y = bounds.y + insets.top;
      var width = bounds.width - insets.left - insets.right;
      var height = bounds.height - insets.top - insets.bottom;
      var cx = x + SJSC.SIDE_MARGIN;
      var cy = y + SJSC.TOP_MARGIN;
      var cw = SJSC.CONSOLE_WIDTH;
      var ch = y + height - cy - SJSC.BOTTOM_MARGIN - ctlSize.height;
      this.console.setBounds(cx, cy, cw, ch);
      var ex = cx + cw + SJSC.CONSOLE_EDITOR_SEP;
      var ew = x + width - ex - SJSC.SIDE_MARGIN;
      this.editor.setBounds(ex, cy, ew, ch);
      this.controls.setBounds(0, height - ctlSize.height, width, ctlSize.height);
   }
};


/* SJSLessEqualOperator.js */

var SJSLessEqualOperator = function() {
   SJSRelationalOperator.call(this);
};

SJSLessEqualOperator.prototype =
   jslib.inheritPrototype(SJSRelationalOperator, "SJSLessEqualOperator extends SJSRelationalOperator");
SJSLessEqualOperator.prototype.constructor = SJSLessEqualOperator;
SJSLessEqualOperator.prototype.$class = 
   new Class("SJSLessEqualOperator", SJSLessEqualOperator);

SJSLessEqualOperator.prototype.applyInteger = function(x, y) {
   return x <= y;
};

SJSLessEqualOperator.prototype.applyDouble = function(x, y) {
   return x <= y;
};

SJSLessEqualOperator.prototype.getInstructionCode = function() {
   return SVMC.LE;
};


/* SJSLessThanOperator.js */

var SJSLessThanOperator = function() {
   SJSRelationalOperator.call(this);
};

SJSLessThanOperator.prototype =
   jslib.inheritPrototype(SJSRelationalOperator, "SJSLessThanOperator extends SJSRelationalOperator");
SJSLessThanOperator.prototype.constructor = SJSLessThanOperator;
SJSLessThanOperator.prototype.$class = 
   new Class("SJSLessThanOperator", SJSLessThanOperator);

SJSLessThanOperator.prototype.applyInteger = function(x, y) {
   return x < y;
};

SJSLessThanOperator.prototype.applyDouble = function(x, y) {
   return x < y;
};

SJSLessThanOperator.prototype.getInstructionCode = function() {
   return SVMC.LT;
};


/* SJSListOperator.js */

var SJSListOperator = function() {
   Operator.call(this);
};

SJSListOperator.prototype =
   jslib.inheritPrototype(Operator, "SJSListOperator extends Operator");
SJSListOperator.prototype.constructor = SJSListOperator;
SJSListOperator.prototype.$class = 
   new Class("SJSListOperator", SJSListOperator);

SJSListOperator.prototype.compile = function(p, args, cv) {
   for (var i = 0; i < args.length; i++) {
      p.compile(args[i], cv);
   }
   cv.addInstruction(SVMC.CALLM, cv.stringRef("Array.create"));
   cv.addInstruction(SVMC.NARGS, args.length);
};

SJSListOperator.prototype.unparse = function(p, args) {
   return "(" + p.unparse(args[0]) + ")";
};


/* SJSLSHLeftOperator.js */

var SJSLSHLeftOperator = function() {
   InfixOperator.call(this);
};

SJSLSHLeftOperator.prototype =
   jslib.inheritPrototype(InfixOperator, "SJSLSHLeftOperator extends InfixOperator");
SJSLSHLeftOperator.prototype.constructor = SJSLSHLeftOperator;
SJSLSHLeftOperator.prototype.$class = 
   new Class("SJSLSHLeftOperator", SJSLSHLeftOperator);

SJSLSHLeftOperator.prototype.compile = function(p, args, cv) {
   p.compile(args[0], cv);
   p.compile(args[1], cv);
   cv.addInstruction(SVMC.LSH, 0);
};


/* SJSLSHRightOperator.js */

var SJSLSHRightOperator = function() {
   InfixOperator.call(this);
};

SJSLSHRightOperator.prototype =
   jslib.inheritPrototype(InfixOperator, "SJSLSHRightOperator extends InfixOperator");
SJSLSHRightOperator.prototype.constructor = SJSLSHRightOperator;
SJSLSHRightOperator.prototype.$class = 
   new Class("SJSLSHRightOperator", SJSLSHRightOperator);

SJSLSHRightOperator.prototype.compile = function(p, args, cv) {
   p.compile(args[0], cv);
   p.compile(args[1], cv);
   cv.addInstruction(SVMC.NEG, 0);
   cv.addInstruction(SVMC.LSH, 0);
};


/* SJSOpEqualOperator.js */

var SJSOpEqualOperator = function() {
   SJSArithmeticOperator.call(this);
};

SJSOpEqualOperator.prototype =
   jslib.inheritPrototype(SJSArithmeticOperator, "SJSOpEqualOperator extends SJSArithmeticOperator");
SJSOpEqualOperator.prototype.constructor = SJSOpEqualOperator;
SJSOpEqualOperator.prototype.$class = 
   new Class("SJSOpEqualOperator", SJSOpEqualOperator);

SJSOpEqualOperator.prototype.isAssignmentOperator = function() {
   return true;
};

SJSOpEqualOperator.prototype.compile = function(p, args, cv) {
   SJSAssignmentOperator.compileLHV(p, args[0], cv);
   p.compile(args[1], cv);
   cv.addInstruction(this.getInstructionCode(), 0);
   cv.addInstruction(SVMC.DUP, 0);
   var type = args[0].getType();
   if (type === Expression.COMPOUND) {
      cv.addInstruction(SVMC.ROLL, 3);
      cv.addInstruction(SVMC.CALLM, cv.stringRef("Core.assign"));
   } else if (type === Expression.IDENTIFIER) {
      cv.addInstruction(SVMC.POPVAR, cv.stringRef(args[0].getName()));
   }
};


/* SJSMinusEqualOperator.js */

var SJSMinusEqualOperator = function() {
   SJSOpEqualOperator.call(this);
};

SJSMinusEqualOperator.prototype =
   jslib.inheritPrototype(SJSOpEqualOperator, "SJSMinusEqualOperator extends SJSOpEqualOperator");
SJSMinusEqualOperator.prototype.constructor = SJSMinusEqualOperator;
SJSMinusEqualOperator.prototype.$class = 
   new Class("SJSMinusEqualOperator", SJSMinusEqualOperator);

SJSMinusEqualOperator.prototype.getInstructionCode = function() {
   return SVMC.SUB;
};


/* SJSMinusOperator.js */

var SJSMinusOperator = function() {
   SJSArithmeticOperator.call(this);
};

SJSMinusOperator.prototype =
   jslib.inheritPrototype(SJSArithmeticOperator, "SJSMinusOperator extends SJSArithmeticOperator");
SJSMinusOperator.prototype.constructor = SJSMinusOperator;
SJSMinusOperator.prototype.$class = 
   new Class("SJSMinusOperator", SJSMinusOperator);

SJSMinusOperator.prototype.prefixAction = function(p) {
   return p.createCompound1(p.getOperator("-x"), p.readE(this.getPrefixPrecedence()));
};

SJSMinusOperator.prototype.getInstructionCode = function() {
   return SVMC.SUB;
};


/* SJSNewKeyword.js */

var SJSNewKeyword = function() {
   PrefixOperator.call(this);
};

SJSNewKeyword.prototype =
   jslib.inheritPrototype(PrefixOperator, "SJSNewKeyword extends PrefixOperator");
SJSNewKeyword.prototype.constructor = SJSNewKeyword;
SJSNewKeyword.prototype.$class = 
   new Class("SJSNewKeyword", SJSNewKeyword);

SJSNewKeyword.prototype.prefixAction = function(p) {
   var exp = p.readE(this.getPrefixPrecedence());
   return p.createCompound1(this, exp);
};

SJSNewKeyword.prototype.compile = function(p, args, cv) {
   var exp = args[0];
   var fn = exp.getFunction();
   var actuals = exp.getArgs();
   var n = actuals.length;
   for (var i = 0; i < n; i++) {
      p.compile(actuals[i], cv);
   }
   cv.addInstruction(SVMC.CALLM, cv.stringRef(fn.toString() + ".new"));
   cv.addInstruction(SVMC.NARGS, n);
};


/* SJSNotEqualOperator.js */

var SJSNotEqualOperator = function() {
   InfixOperator.call(this);
};

SJSNotEqualOperator.prototype =
   jslib.inheritPrototype(InfixOperator, "SJSNotEqualOperator extends InfixOperator");
SJSNotEqualOperator.prototype.constructor = SJSNotEqualOperator;
SJSNotEqualOperator.prototype.$class = 
   new Class("SJSNotEqualOperator", SJSNotEqualOperator);

SJSNotEqualOperator.prototype.compile = function(parser, args, cv) {
   parser.compile(args[0], cv);
   parser.compile(args[1], cv);
   cv.addInstruction(SVMC.NE, 0);
};


/* SJSNOTOperator.js */

var SJSNOTOperator = function() {
   PrefixOperator.call(this);
};

SJSNOTOperator.prototype =
   jslib.inheritPrototype(PrefixOperator, "SJSNOTOperator extends PrefixOperator");
SJSNOTOperator.prototype.constructor = SJSNOTOperator;
SJSNOTOperator.prototype.$class = 
   new Class("SJSNOTOperator", SJSNOTOperator);

SJSNOTOperator.prototype.compile = function(p, args, cv) {
   p.compile(args[0], cv);
   cv.addInstruction(SVMC.NOT, 0);
};


/* SJSNullOperator.js */

var SJSNullOperator = function() {
   NofixOperator.call(this);
};

SJSNullOperator.prototype =
   jslib.inheritPrototype(NofixOperator, "SJSNullOperator extends NofixOperator");
SJSNullOperator.prototype.constructor = SJSNullOperator;
SJSNullOperator.prototype.$class = 
   new Class("SJSNullOperator", SJSNullOperator);

SJSNullOperator.prototype.compile = function(p, args, cv) {
   cv.addInstruction(SVMC.CALLM, cv.stringRef("Core.NULL"));
};


/* SJSOROperator.js */

var SJSOROperator = function() {
   InfixForm.call(this);
};

SJSOROperator.prototype =
   jslib.inheritPrototype(InfixForm, "SJSOROperator extends InfixForm");
SJSOROperator.prototype.constructor = SJSOROperator;
SJSOROperator.prototype.$class = 
   new Class("SJSOROperator", SJSOROperator);

SJSOROperator.prototype.compile = function(p, args, cv) {
   var tag1 = cv.newLabel();
   var tag2 = cv.newLabel();
   p.compile(args[0], cv);
   cv.addInstruction(SVMC.JUMPT, cv.labelRef(tag1));
   p.compile(args[1], cv);
   cv.addInstruction(SVMC.JUMP, cv.labelRef(tag2));
   cv.defineLabel(tag1);
   cv.addInstruction(SVMC.CALLM, cv.stringRef("Core.TRUE"));
   cv.defineLabel(tag2);
};


/* SJSParenOperator.js */

var SJSParenOperator = function() {
   Operator.call(this);
};

SJSParenOperator.prototype =
   jslib.inheritPrototype(Operator, "SJSParenOperator extends Operator");
SJSParenOperator.prototype.constructor = SJSParenOperator;
SJSParenOperator.prototype.$class = 
   new Class("SJSParenOperator", SJSParenOperator);

SJSParenOperator.prototype.prefixAction = function(p) {
   var exp = p.readE(0);
   p.verifyToken(")");
   return p.createCompound1(this, exp);
};

SJSParenOperator.prototype.infixAction = function(p, lhs) {
   var list = new ArrayList();
   var token = p.nextToken();
   if (!jslib.equals(token, ")")) {
      p.saveToken(token);
      while (true) {
         var exp = p.readE(0);
         list.add(exp);
         token = p.nextToken();
         if (jslib.equals(token, ")")) break;
         if (!jslib.equals(token, ",")) {
            throw new SyntaxError("Found '" + token +
            "' when expecting ',' or ')'");
         }
      }
   }
   var args = jslib.newArray(list.size());
   for (var i = 0; i < args.length; i++) {
      args[i] = list.get(i);
   }
   return p.createCompound(lhs, args);
};

SJSParenOperator.prototype.compile = function(p, args, cv) {
   p.compile(args[0], cv);
};

SJSParenOperator.prototype.unparse = function(p, args) {
   return "(" + p.unparse(args[0]) + ")";
};


/* SJSParser.js */

var SJSParser = function() {
   Parser.call(this);
   this.functions = new ArrayList();
   this.globals = new ArrayList();
   this.imports = new TreeSet();
   this.classes = new TreeSet();
   this.blockOperator = new SJSBlockOperator();
   this.statementOperator = new SJSStatementOperator();
   this.functionKeyword = new SJSFunctionKeyword();
   this.defineOperators();
   this.defineConstants();
   this.defineStatementForms();
   this.anonymousFunctionCount = 0;
};

SJSParser.prototype = 
   jslib.inheritPrototype(Parser, "SJSParser extends Parser");
SJSParser.prototype.constructor = SJSParser;
SJSParser.prototype.$class = 
   new Class("SJSParser", SJSParser);

SJSParser.prototype.createTokenScanner = function() {
   var scanner = new TokenScanner();
   scanner.ignoreWhitespace();
   scanner.ignoreComments();
   scanner.scanStrings();
   scanner.scanNumbers();
   scanner.addWordCharacters("_");
   this.addOperatorTokens(scanner);
   return scanner;
};

SJSParser.prototype.addImport = function(name) {
   this.imports.add(name);
};

SJSParser.prototype.hasImport = function(name) {
   return this.imports.contains(name);
};

SJSParser.prototype.getGlobals = function() {
   return this.globals;
};

SJSParser.prototype.getImports = function() {
   return this.imports;
};

SJSParser.prototype.addOperatorTokens = function(scanner) {
   scanner.addOperator("++");
   scanner.addOperator("--");
   scanner.addOperator("==");
   scanner.addOperator("!=");
   scanner.addOperator("<=");
   scanner.addOperator(">=");
   scanner.addOperator("&&");
   scanner.addOperator("||");
   scanner.addOperator("+=");
   scanner.addOperator("-=");
   scanner.addOperator("*=");
   scanner.addOperator("/=");
   scanner.addOperator("%=");
   scanner.addOperator("===");
   scanner.addOperator("!==");
   scanner.addOperator("<<");
   scanner.addOperator(">>");
   scanner.addOperator(">>>");
};

SJSParser.prototype.defineOperators = function() {
   var LEFT = Operator.LEFT;
   var RIGHT = Operator.RIGHT;
   this.defineOperator(".", new SJSDotOperator(), 0, 110, LEFT);
   this.defineOperator("(", new SJSParenOperator(), 0, 110, RIGHT);
   this.defineOperator("[", new SJSBracketOperator(), 0, 110, RIGHT);
   this.defineOperator("{", new SJSBraceOperator(), 0, 110, RIGHT);
   this.defineOperator("+", new SJSPlusOperator(), 100, 80, LEFT);
   this.defineOperator("-", new SJSMinusOperator(), 100, 80, LEFT);
   this.defineOperator("++", new SJSIncrementOperator(), 100, 100, RIGHT);
   this.defineOperator("--", new SJSDecrementOperator(), 100, 100, RIGHT);
   this.definePrefixOperator("!", new SJSNOTOperator(), 100);
   this.definePrefixOperator("~", new SJSBitwiseNOTOperator(), 100);
   this.defineInfixOperator("*", new SJSStarOperator(), 90, LEFT);
   this.defineInfixOperator("/", new SJSSlashOperator(), 90, LEFT);
   this.defineInfixOperator("%", new SJSPercentOperator(), 90, LEFT);
   this.defineInfixOperator("<<", new SJSLSHLeftOperator(), 70, LEFT);
   this.defineInfixOperator(">>", new SJSASHRightOperator(), 70, LEFT);
   this.defineInfixOperator(">>>", new SJSLSHRightOperator(), 70, LEFT);
   this.defineInfixOperator("<", new SJSLessThanOperator(), 60, LEFT);
   this.defineInfixOperator("<=", new SJSLessEqualOperator(), 60, LEFT);
   this.defineInfixOperator(">", new SJSGreaterThanOperator(), 60, LEFT);
   this.defineInfixOperator(">=", new SJSGreaterEqualOperator(), 60, LEFT);
   this.defineInfixOperator("===", new SJSEqualOperator(), 50, LEFT);
   this.defineInfixOperator("!==", new SJSNotEqualOperator(), 50, LEFT);
   this.defineInfixOperator("&", new SJSBitwiseANDOperator(), 45, LEFT);
   this.defineInfixOperator("^", new SJSBitwiseXOROperator(), 40, LEFT);
   this.defineInfixOperator("|", new SJSBitwiseOROperator(), 35, LEFT);
   this.defineInfixOperator("&&", new SJSANDOperator(), 30, LEFT);
   this.defineInfixOperator("||", new SJSOROperator(), 20, LEFT);
   this.defineInfixOperator("?", new SJSQuestionMarkColonOperator(), 15, RIGHT);
   this.defineInfixOperator("=", new SJSAssignmentOperator(), 10, RIGHT);
   this.defineInfixOperator("+=", new SJSPlusEqualOperator(), 10, RIGHT);
   this.defineInfixOperator("-=", new SJSMinusEqualOperator(), 10, RIGHT);
   this.defineInfixOperator("*=", new SJSStarEqualOperator(), 10, RIGHT);
   this.defineInfixOperator("/=", new SJSSlashEqualOperator(), 10, RIGHT);
   this.defineInfixOperator("%=", new SJSPercentEqualOperator(), 10, RIGHT);
   this.definePrefixOperator("+x", new SJSUnaryPlusOperator(), 100);
   this.definePrefixOperator("-x", new SJSUnaryMinusOperator(), 100);
   this.definePrefixOperator("x++", new SJSSuffixIncrementOperator(), 100);
   this.definePrefixOperator("x--", new SJSSuffixDecrementOperator(), 100);
   this.definePrefixOperator("[...]", new SJSListOperator(), 100);
   this.definePrefixOperator("var", new SJSVarKeyword(), 100);
   this.definePrefixOperator("new", new SJSNewKeyword(), 100);
   this.definePrefixOperator("function", new SJSFunctionKeyword(), 100);
};

SJSParser.prototype.scanModule = function() {
   while (this.hasMoreTokens()) {
      var token = this.nextToken();
      this.saveToken(token);
      this.readEntry();
   }
};

SJSParser.prototype.dumpCode = function(cv) {
   cv.addInstruction(SVMC.CALL, cv.labelRef("_init"));
   cv.addInstruction(SVMC.CALL, cv.labelRef("main"));
   if (this.hasImport("graphics")) {
      cv.addInstruction(SVMC.CALLM, cv.stringRef("GWindow.repaint"));
   }
   cv.addInstruction(SVMC.HALT, 0);
   this.statementStack = new Stack();
   var el0 = new JSElementList(this.functions);
   for (var ei0 = 0; ei0 < el0.size(); ei0++) {
      var fn = el0.get(ei0);
      var args = fn.getArgs();
      this.pushStatementContext(null, null);
      var name = args[0].getName();
      this.formals = args[1].getArgs();
      this.locals = args[2].getArgs();
      var body = args[3];
      cv.defineLabel(name);
      var n = this.formals.length;
      cv.addInstruction(SVMC.PARAMS, n);
      for (var i = n - 1; i >= 0; i--) {
         cv.addInstruction(SVMC.ARG, cv.stringRef(this.formals[i].getName()));
      }
      n = this.locals.length;
      for (var i = 0; i < n; i++) {
         cv.addInstruction(SVMC.VAR, cv.stringRef(this.locals[i].getName()));
      }
      this.compile(body, cv);
      cv.addInstruction(SVMC.CALLM, cv.stringRef("Core.UNDEFINED"));
      cv.addInstruction(SVMC.RETURN, 0);
      this.popStatementContext();
   }
   cv.defineLabel("_init");
   var el1 = new JSElementList(this.globals);
   for (var ei1 = 0; ei1 < el1.size(); ei1++) {
      var exp = el1.get(ei1);
      var args = exp.getArgs();
      cv.addInstruction(SVMC.PUSHSTR, cv.stringRef(args[0].getName()));
      this.compile(args[1], cv);
      cv.addInstruction(SVMC.CALLM, cv.stringRef("Global.set"));
   }
   var el2 = new JSElementList(this.functions);
   for (var ei2 = 0; ei2 < el2.size(); ei2++) {
      var fn = el2.get(ei2);
      var name = fn.getArgs()[0].getName();
      cv.addInstruction(SVMC.PUSHSTR, cv.stringRef(name));
      cv.addInstruction(SVMC.PUSHFN, cv.labelRef(name));
      cv.addInstruction(SVMC.CALLM, cv.stringRef("Global.set"));
   }
   if (this.hasImport("graphics")) {
      cv.addInstruction(SVMC.CALLM, cv.stringRef("GWindow._init"));
   }
   cv.addInstruction(SVMC.CALLM, cv.stringRef("Console._init"));
   cv.addInstruction(SVMC.RETURN, 0);
};

SJSParser.prototype.readEntry = function() {
   var token = this.nextToken();
   if (jslib.equals(token, "function")) {
      if (this.readFunction().getArgs()[0].getName().contains("#")) {
         throw new SyntaxError("Top-level functions must have names");
      }
   } else if (jslib.equals(token, "var")) {
      this.readGlobal();
   } else if (jslib.equals(token, "import")) {
      if (this.globals.isEmpty() && this.functions.isEmpty()) {
         this.readImport();
      } else {
         throw new SyntaxError("Imports must precede other definitions");
      }
   } else {
      throw new SyntaxError("Illegal top-level definition");
   }
};

SJSParser.prototype.readFunction = function() {
   var oldFormals = this.formals;
   var oldLocals = this.formals;
   this.formals = new ArrayList();
   this.locals = new ArrayList();
   var name = this.nextToken();
   if (jslib.equals(name, "(")) {
      name = "fn#" + this.anonymousFunctionCount++;
   } else if (this.getTokenType(name) !== TokenScanner.WORD) {
      throw new SyntaxError("Illegal function name");
   } else {
      this.verifyToken("(");
   }
   var token = this.nextToken();
   while (!jslib.equals(token, ")")) {
      this.formals.add(token);
      token = this.nextToken();
      if (!jslib.equals(token, ")")) {
         if (jslib.equals(token, ",")) {
            token = this.nextToken();
         } else {
            throw new SyntaxError("Illegal parameter syntax");
         }
      }
   }
   var body = this.readCompoundStatement();
   var fn = this.createCompound4(this.functionKeyword, this.createIdentifier(name), this.createList("formals", this.formals), this.createList("locals", this.locals), body);
   this.functions.add(fn);
   this.formals = oldFormals;
   this.locals = oldLocals;
   return fn;
};

SJSParser.prototype.readGlobal = function() {
   var name = this.nextToken();
   var token = this.nextToken();
   this.saveToken(token);
   if (!jslib.equals(token, "=")) {
      this.saveToken("undefined");
      this.saveToken("=");
   }
   this.saveToken(name);
   var exp = this.readE(0);
   this.globals.add(exp);
   this.verifyToken(";");
};

SJSParser.prototype.readImport = function() {
   var name = this.nextToken();
   this.verifyToken(";");
   this.addImport(name);
};

SJSParser.prototype.declareLocal = function(name) {
   if (this.formals.contains(name)) {
      throw new SyntaxError(name + " is both a local and a parameter");
   }
   this.locals.add(name);
};

SJSParser.prototype.setLocals = function(locals) {
   this.locals = locals;
};

SJSParser.prototype.getLocals = function() {
   return this.locals;
};

SJSParser.prototype.defineStatementForms = function() {
   this.defineStatementForm("if", new SJSIfStatement());
   this.defineStatementForm("switch", new SJSSwitchStatement());
   this.defineStatementForm("while", new SJSWhileStatement());
   this.defineStatementForm("for", new SJSForStatement());
   this.defineStatementForm("return", new SJSReturnStatement());
   this.defineStatementForm("break", new SJSBreakStatement());
   this.defineStatementForm("continue", new SJSContinueStatement());
   this.defineStatementForm("case", new SJSCaseStatement());
   this.defineStatementForm("default", new SJSDefaultStatement());
   this.defineStatementForm("try", new SJSTryStatement());
   this.defineStatementForm("throw", new SJSThrowStatement());
};

SJSParser.prototype.defineConstants = function() {
   this.definePrefixOperator("false", new SJSFalseOperator(), 100);
   this.definePrefixOperator("true", new SJSTrueOperator(), 100);
   this.definePrefixOperator("null", new SJSNullOperator(), 100);
   this.definePrefixOperator("undefined", new SJSUndefinedOperator(), 100);
};

SJSParser.prototype.compile = function(exp, cv) {
   var type = exp.getType();
   switch (type) {
    case Expression.CONSTANT:
      this.compileConstant(exp.getValue(), cv);
      break;
    case Expression.IDENTIFIER:
      this.compileIdentifier(exp.getName(), cv);
      break;
    case Expression.COMPOUND:
      this.compileCompound(exp, cv);
      break;
   }
};

SJSParser.prototype.compileConstant = function(value, cv) {
   var type = value.getType();
   switch (type) {
    case Value.BOOLEAN:
      var fn = "Boolean." + value.getValue();
      cv.addInstruction(SVMC.CALLM, cv.stringRef(fn));
      break;
    case Value.CHARACTER:
      var ch = value.getValue();
      cv.addInstruction(SVMC.PUSHINT, ch);
      break;
    case Value.DOUBLE:
      cv.addInstruction(SVMC.PUSHNUM, cv.stringRef("" + value.getValue()));
      break;
    case Value.INTEGER:
      var n = value.getValue();
      if ((n & 0xFFFFFF) === n) {
         cv.addInstruction(SVMC.PUSHINT, n);
      } else {
         cv.addInstruction(SVMC.PUSHNUM, cv.stringRef("" + n));
      }
      break;
    case Value.STRING:
      var str = value.getValue();
      cv.addInstruction(SVMC.PUSHSTR, cv.stringRef(str));
      break;
    default:
      throw new SyntaxError("Illegal value: " + value);
   }
};

SJSParser.prototype.compileIdentifier = function(name, cv) {
   cv.addInstruction(SVMC.PUSHVAR, cv.stringRef(name));
};

SJSParser.prototype.compileCompound = function(exp, cv) {
   var fn = exp.getFunction();
   var type = fn.getType();
   if (type === Expression.OPERATOR) {
      (fn).compile(this, exp.getArgs(), cv);
   } else {
      if (type === Expression.COMPOUND) {
         var op = fn.getFunction();
         if (op.getType() === Expression.OPERATOR) {
            if (jslib.equals(op.getName(), ".")) {
               var lhs = fn.getArgs()[0];
               if (lhs.getType() === Expression.IDENTIFIER) {
                  var className = lhs.getName();
                  if (SVMClass.isDefined(className)) {
                     this.classes.add(className);
                  }
               }
            }
         }
      }
      this.compileArgs(exp.getArgs(), cv);
      this.compile(fn, cv);
      cv.addInstruction(SVMC.CALLFN, 0);
      cv.addInstruction(SVMC.NARGS, exp.getArgs().length);
   }
};

SJSParser.prototype.compileLHS = function(exp, cv) {
   var type = exp.getType();
   if (type === Expression.COMPOUND) {
      var op = exp.getFunction();
      var lhs = exp.getArgs()[0];
      var rhs = exp.getArgs()[1];
      if (op.getType() === Expression.OPERATOR) {
         var name = op.getName();
         if (jslib.equals(name, ".") && rhs.getType() === Expression.IDENTIFIER) {
            this.compile(lhs, cv);
            cv.addInstruction(SVMC.PUSHSTR, cv.stringRef(rhs.getName()));
            return;
         } else if (jslib.equals(name, "[")) {
            this.compile(lhs, cv);
            this.compile(rhs, cv);
            return;
         }
      }
   } else if (type === Expression.IDENTIFIER) {
      return;
   }
   throw new SyntaxError("Illegal assignment");
};

SJSParser.prototype.compileSetLHS = function(exp, cv) {
   var type = exp.getType();
   if (type === Expression.COMPOUND) {
      cv.addInstruction(SVMC.CALLM, cv.stringRef("Core.set"));
   } else if (type === Expression.IDENTIFIER) {
      cv.addInstruction(SVMC.POPVAR, cv.stringRef(exp.getName()));
   }
};

SJSParser.prototype.compileArgs = function(args, cv) {
   var n = args.length;
   for (var i = 0; i < n; i++) {
      this.compile(args[i], cv);
   }
};

SJSParser.prototype.createList = function(key, list) {
   var n = list.size();
   var args = jslib.newArray(n);
   for (var i = 0; i < n; i++) {
      args[i] = this.createIdentifier(list.get(i));
   }
   return this.createCompound(this.createIdentifier(key), args);
};

SJSParser.prototype.readStatement = function() {
   var token = this.nextToken();
   if (token === null) {
      throw new SyntaxError("Unexpected end of line");
   }
   this.saveToken(token);
   if (jslib.equals(token, "{")) return this.readCompoundStatement();
   var pos = new Constant(Value.createInteger(this.getPosition()));
   var op = this.lookupOperator(token);
   if (op === null || !op.isStatement()) {
      var exp = this.readE(0);
      this.verifyToken(";");
      return this.createCompound2(this.statementOperator, pos, exp);
   }
   this.nextToken();
   return this.createCompound2(this.statementOperator, pos, op.prefixAction(this));
};

SJSParser.prototype.readCompoundStatement = function() {
   this.verifyToken("{");
   var statements = new ArrayList();
   var token = this.nextToken();
   if (!jslib.equals(token, "}")) {
      this.saveToken(token);
      while (true) {
         statements.add(this.readStatement());
         token = this.nextToken();
         if (jslib.equals(token, "}")) break;
         this.saveToken(token);
      }
   }
   var n = statements.size();
   var array = jslib.newArray(n);
   for (var i = 0; i < n; i++) {
      array[i] = statements.get(i);
   }
   return this.createCompound(this.blockOperator, array);
};

SJSParser.prototype.defineStatementForm = function(name, op) {
   this.defineOperator(name, op, 0, 0, Operator.LEFT);
};

SJSParser.prototype.pushStatementContext = function(breakLabel, continueLabel) {
   var sc = new StatementContext();
   sc.breakLabel = breakLabel;
   sc.continueLabel = continueLabel;
   sc.nextLabel = null;
   this.statementStack.push(sc);
};

SJSParser.prototype.popStatementContext = function() {
   this.statementStack.pop();
};

SJSParser.prototype.getStatementDepth = function() {
   return this.statementStack.size();
};

SJSParser.prototype.setNextLabel = function(str) {
   this.statementStack.peek().nextLabel = str;
};

SJSParser.prototype.getNextLabel = function() {
   return this.statementStack.peek().nextLabel;
};

SJSParser.prototype.getBreakLabel = function() {
   return this.statementStack.peek().breakLabel;
};

SJSParser.prototype.getContinueLabel = function() {
   return this.statementStack.peek().continueLabel;
};

SJSParser.prototype.usesConsole = function() {
   return this.classes.contains("Console") || this.classes.contains("UnitTest");
};

SJSParser.prototype.createConstant = function(token) {
   var type = this.getTokenType(token);
   if (type === TokenScanner.NUMBER) {
      if (token.indexOf(".") >= 0) {
         return new Constant(Value.createDouble(Double.parseDouble(token)));
      } else if (jslib.startsWith(token, "0x") || jslib.startsWith(token, "0X")) {
         var n = Integer.parseInt(token.substring(2), 16);
         return new Constant(Value.createInteger(n));
      } else if (jslib.startsWith(token, "0")) {
         var n = Integer.parseInt(token, 8);
         return new Constant(Value.createInteger(n));
      } else {
         return new Constant(Value.createInteger(Integer.parseInt(token)));
      }
   } else if (type === TokenScanner.STRING) {
      var s = this.getStringValue(token);
      return new Constant(Value.createString(s));
   } else {
      throw new SyntaxError("Illegal constant: " + token );
   }
};

var StatementContext = function() {
   /* Empty */
};


/* SJSPercentEqualOperator.js */

var SJSPercentEqualOperator = function() {
   SJSOpEqualOperator.call(this);
};

SJSPercentEqualOperator.prototype =
   jslib.inheritPrototype(SJSOpEqualOperator, "SJSPercentEqualOperator extends SJSOpEqualOperator");
SJSPercentEqualOperator.prototype.constructor = SJSPercentEqualOperator;
SJSPercentEqualOperator.prototype.$class = 
   new Class("SJSPercentEqualOperator", SJSPercentEqualOperator);

SJSPercentEqualOperator.prototype.getInstructionCode = function() {
   return SVMC.REM;
};


/* SJSPercentOperator.js */

var SJSPercentOperator = function() {
   SJSArithmeticOperator.call(this);
};

SJSPercentOperator.prototype =
   jslib.inheritPrototype(SJSArithmeticOperator, "SJSPercentOperator extends SJSArithmeticOperator");
SJSPercentOperator.prototype.constructor = SJSPercentOperator;
SJSPercentOperator.prototype.$class = 
   new Class("SJSPercentOperator", SJSPercentOperator);

SJSPercentOperator.prototype.getInstructionCode = function() {
   return SVMC.REM;
};


/* SJSPlusEqualOperator.js */

var SJSPlusEqualOperator = function() {
   SJSOpEqualOperator.call(this);
};

SJSPlusEqualOperator.prototype =
   jslib.inheritPrototype(SJSOpEqualOperator, "SJSPlusEqualOperator extends SJSOpEqualOperator");
SJSPlusEqualOperator.prototype.constructor = SJSPlusEqualOperator;
SJSPlusEqualOperator.prototype.$class = 
   new Class("SJSPlusEqualOperator", SJSPlusEqualOperator);

SJSPlusEqualOperator.prototype.getInstructionCode = function() {
   return SVMC.ADD;
};


/* SJSPlusOperator.js */

var SJSPlusOperator = function() {
   SJSArithmeticOperator.call(this);
};

SJSPlusOperator.prototype =
   jslib.inheritPrototype(SJSArithmeticOperator, "SJSPlusOperator extends SJSArithmeticOperator");
SJSPlusOperator.prototype.constructor = SJSPlusOperator;
SJSPlusOperator.prototype.$class = 
   new Class("SJSPlusOperator", SJSPlusOperator);

SJSPlusOperator.prototype.prefixAction = function(p) {
   return p.createCompound1(p.getOperator("+x"), p.readE(this.getPrefixPrecedence()));
};

SJSPlusOperator.prototype.getInstructionCode = function() {
   return SVMC.ADD;
};


/* SJSQuestionMarkColonOperator.js */

var SJSQuestionMarkColonOperator = function() {
   Operator.call(this);
};

SJSQuestionMarkColonOperator.prototype =
   jslib.inheritPrototype(Operator, "SJSQuestionMarkColonOperator extends Operator");
SJSQuestionMarkColonOperator.prototype.constructor = SJSQuestionMarkColonOperator;
SJSQuestionMarkColonOperator.prototype.$class = 
   new Class("SJSQuestionMarkColonOperator", SJSQuestionMarkColonOperator);

SJSQuestionMarkColonOperator.prototype.infixAction = function(p, lhs) {
   var e1 = p.readE(0);
   p.verifyToken(":");
   var e2 = p.readE(this.getInfixPrecedence());
   return p.createCompound3(this, lhs, e1, e2);
};

SJSQuestionMarkColonOperator.prototype.compile = function(p, args, cv) {
   var tag1 = cv.newLabel();
   var tag2 = cv.newLabel();
   p.compile(args[0], cv);
   cv.addInstruction(SVMC.JUMPF, cv.labelRef(tag1));
   p.compile(args[1], cv);
   cv.addInstruction(SVMC.JUMP, cv.labelRef(tag2));
   cv.defineLabel(tag1);
   p.compile(args[2], cv);
   cv.defineLabel(tag2);
};


/* SJSReturnStatement.js */

var SJSReturnStatement = function() {
   Statement.call(this);
};

SJSReturnStatement.prototype =
   jslib.inheritPrototype(Statement, "SJSReturnStatement extends Statement");
SJSReturnStatement.prototype.constructor = SJSReturnStatement;
SJSReturnStatement.prototype.$class = 
   new Class("SJSReturnStatement", SJSReturnStatement);

SJSReturnStatement.prototype.prefixAction = function(p) {
   var token = p.nextToken();
   if (jslib.equals(token, ";")) return p.createCompound0(this);
   p.saveToken(token);
   var exp = p.readE(0);
   p.verifyToken(";");
   return p.createCompound1(this, exp);
};

SJSReturnStatement.prototype.compile = function(p, args, cv) {
   if (args.length === 0) {
      cv.addInstruction(SVMC.CALLM, cv.stringRef("Core.UNDEFINED"));
   } else {
      p.compile(args[0], cv);
   }
   cv.addInstruction(SVMC.RETURN, 0);
};


/* SJSSlashEqualOperator.js */

var SJSSlashEqualOperator = function() {
   SJSOpEqualOperator.call(this);
};

SJSSlashEqualOperator.prototype =
   jslib.inheritPrototype(SJSOpEqualOperator, "SJSSlashEqualOperator extends SJSOpEqualOperator");
SJSSlashEqualOperator.prototype.constructor = SJSSlashEqualOperator;
SJSSlashEqualOperator.prototype.$class = 
   new Class("SJSSlashEqualOperator", SJSSlashEqualOperator);

SJSSlashEqualOperator.prototype.getInstructionCode = function() {
   return SVMC.DIV;
};


/* SJSSlashOperator.js */

var SJSSlashOperator = function() {
   SJSArithmeticOperator.call(this);
};

SJSSlashOperator.prototype =
   jslib.inheritPrototype(SJSArithmeticOperator, "SJSSlashOperator extends SJSArithmeticOperator");
SJSSlashOperator.prototype.constructor = SJSSlashOperator;
SJSSlashOperator.prototype.$class = 
   new Class("SJSSlashOperator", SJSSlashOperator);

SJSSlashOperator.prototype.getInstructionCode = function() {
   return SVMC.DIV;
};


/* SJSStarEqualOperator.js */

var SJSStarEqualOperator = function() {
   SJSOpEqualOperator.call(this);
};

SJSStarEqualOperator.prototype =
   jslib.inheritPrototype(SJSOpEqualOperator, "SJSStarEqualOperator extends SJSOpEqualOperator");
SJSStarEqualOperator.prototype.constructor = SJSStarEqualOperator;
SJSStarEqualOperator.prototype.$class = 
   new Class("SJSStarEqualOperator", SJSStarEqualOperator);

SJSStarEqualOperator.prototype.getInstructionCode = function() {
   return SVMC.MUL;
};


/* SJSStarOperator.js */

var SJSStarOperator = function() {
   SJSArithmeticOperator.call(this);
};

SJSStarOperator.prototype =
   jslib.inheritPrototype(SJSArithmeticOperator, "SJSStarOperator extends SJSArithmeticOperator");
SJSStarOperator.prototype.constructor = SJSStarOperator;
SJSStarOperator.prototype.$class = 
   new Class("SJSStarOperator", SJSStarOperator);

SJSStarOperator.prototype.getInstructionCode = function() {
   return SVMC.MUL;
};


/* SJSStatementOperator.js */

var SJSStatementOperator = function() {
   Operator.call(this);
   this.setName("STMT");
};

SJSStatementOperator.prototype = 
   jslib.inheritPrototype(Operator, "SJSStatementOperator extends Operator");
SJSStatementOperator.prototype.constructor = SJSStatementOperator;
SJSStatementOperator.prototype.$class = 
   new Class("SJSStatementOperator", SJSStatementOperator);

SJSStatementOperator.prototype.compile = function(p, args, cv) {
   cv.addInstruction(SVMC.STMT, args[0].getValue().getIntegerValue());
   p.compile(args[1], cv);
};


/* SJSSuffixIncDecOperator.js */

var SJSSuffixIncDecOperator = function() {
   Operator.call(this);
};

SJSSuffixIncDecOperator.prototype =
   jslib.inheritPrototype(Operator, "SJSSuffixIncDecOperator extends Operator");
SJSSuffixIncDecOperator.prototype.constructor = SJSSuffixIncDecOperator;
SJSSuffixIncDecOperator.prototype.$class = 
   new Class("SJSSuffixIncDecOperator", SJSSuffixIncDecOperator);

SJSSuffixIncDecOperator.prototype.unparse = function(p, args) {
   return p.unparse(args[0]) + this.toString();
};

SJSSuffixIncDecOperator.prototype.compile = function(p, args, cv) {
   SJSAssignmentOperator.compileLHV(p, args[0], cv);
   cv.addInstruction(SVMC.DUP, 0);
   var type = args[0].getType();
   if (type === Expression.COMPOUND) {
      cv.addInstruction(SVMC.ROLL, 4);
   } else {
      cv.addInstruction(SVMC.ROLL, 2);
   }
   cv.addInstruction(SVMC.PUSHINT, 1);
   cv.addInstruction(this.getInstructionCode(), 0);
   if (type === Expression.COMPOUND) {
      cv.addInstruction(SVMC.CALLM, cv.stringRef("Core.assign"));
   } else if (type === Expression.IDENTIFIER) {
      cv.addInstruction(SVMC.POPVAR, cv.stringRef(args[0].getName()));
   }
};


/* SJSSuffixDecrementOperator.js */

var SJSSuffixDecrementOperator = function() {
   SJSSuffixIncDecOperator.call(this);
};

SJSSuffixDecrementOperator.prototype =
   jslib.inheritPrototype(SJSSuffixIncDecOperator, "SJSSuffixDecrementOperator extends SJSSuffixIncDecOperator");
SJSSuffixDecrementOperator.prototype.constructor = SJSSuffixDecrementOperator;
SJSSuffixDecrementOperator.prototype.$class = 
   new Class("SJSSuffixDecrementOperator", SJSSuffixDecrementOperator);

SJSSuffixDecrementOperator.prototype.getInstructionCode = function() {
   return SVMC.SUB;
};

SJSSuffixDecrementOperator.prototype.getSign = function() {
   return -1;
};


/* SJSSuffixIncrementOperator.js */

var SJSSuffixIncrementOperator = function() {
   SJSSuffixIncDecOperator.call(this);
};

SJSSuffixIncrementOperator.prototype =
   jslib.inheritPrototype(SJSSuffixIncDecOperator, "SJSSuffixIncrementOperator extends SJSSuffixIncDecOperator");
SJSSuffixIncrementOperator.prototype.constructor = SJSSuffixIncrementOperator;
SJSSuffixIncrementOperator.prototype.$class = 
   new Class("SJSSuffixIncrementOperator", SJSSuffixIncrementOperator);

SJSSuffixIncrementOperator.prototype.getInstructionCode = function() {
   return SVMC.ADD;
};

SJSSuffixIncrementOperator.prototype.getSign = function() {
   return 1;
};


/* SJSSwitchStatement.js */

var SJSSwitchStatement = function() {
   Statement.call(this);
};

SJSSwitchStatement.prototype =
   jslib.inheritPrototype(Statement, "SJSSwitchStatement extends Statement");
SJSSwitchStatement.prototype.constructor = SJSSwitchStatement;
SJSSwitchStatement.prototype.$class = 
   new Class("SJSSwitchStatement", SJSSwitchStatement);

SJSSwitchStatement.prototype.prefixAction = function(p) {
   var jsp = p;
   var body = new ArrayList();
   jsp.verifyToken("(");
   body.add(jsp.readE(0));
   jsp.verifyToken(")");
   jsp.verifyToken("{");
   var token = jsp.nextToken();
   if (!jslib.equals(token, "}")) {
      var started = false;
      while (true) {
         if (jslib.equals(token, "case")) {
            body.add(this.readCaseClause(jsp));
            started = true;
         } else if (jslib.equals(token, "default")) {
            body.add(this.readDefaultClause(jsp));
            started = true;
         } else {
            if (!started) {
               throw new SyntaxError("Missing case clause");
            }
            jsp.saveToken(token);
            body.add(jsp.readStatement());
         }
         token = jsp.nextToken();
         if (jslib.equals(token, "}")) break;
      }
   }
   var n = body.size();
   var array = jslib.newArray(n);
   for (var i = 0; i < n; i++) {
      array[i] = body.get(i);
   }
   return jsp.createCompound(this, array);
};

SJSSwitchStatement.prototype.compile = function(p, args, cv) {
   var jsp = p;
   var exit = cv.newLabel();
   jsp.pushStatementContext(exit, null);
   jsp.compile(args[0], cv);
   var temp = "v_" + jsp.getStatementDepth();
   cv.addInstruction(SVMC.VAR, cv.stringRef(temp));
   cv.addInstruction(SVMC.POPVAR, cv.stringRef(temp));
   for (var i = 1; i < args.length; i++) {
      jsp.compile(args[i], cv);
   }
   var tag = jsp.getNextLabel();
   if (tag !== null) cv.defineLabel(tag);
   cv.defineLabel(exit);
   jsp.popStatementContext();
};

SJSSwitchStatement.prototype.readCaseClause = function(p) {
   var exp = p.readE(0);
   p.verifyToken(":");
   return p.createCompound1(p.getOperator("case"), exp);
};

SJSSwitchStatement.prototype.readDefaultClause = function(p) {
   p.verifyToken(":");
   return p.createCompound0(p.getOperator("default"));
};


/* SJSThrowStatement.js */

var SJSThrowStatement = function() {
   Statement.call(this);
};

SJSThrowStatement.prototype =
   jslib.inheritPrototype(Statement, "SJSThrowStatement extends Statement");
SJSThrowStatement.prototype.constructor = SJSThrowStatement;
SJSThrowStatement.prototype.$class = 
   new Class("SJSThrowStatement", SJSThrowStatement);

SJSThrowStatement.prototype.prefixAction = function(p) {
   var exp = p.readE(0);
   p.verifyToken(";");
   return p.createCompound1(this, exp);
};

SJSThrowStatement.prototype.compile = function(p, args, cv) {
   p.compile(args[0], cv);
   cv.addInstruction(SVMC.THROW, 0);
};


/* SJSTrueOperator.js */

var SJSTrueOperator = function() {
   NofixOperator.call(this);
};

SJSTrueOperator.prototype =
   jslib.inheritPrototype(NofixOperator, "SJSTrueOperator extends NofixOperator");
SJSTrueOperator.prototype.constructor = SJSTrueOperator;
SJSTrueOperator.prototype.$class = 
   new Class("SJSTrueOperator", SJSTrueOperator);

SJSTrueOperator.prototype.compile = function(p, args, cv) {
   cv.addInstruction(SVMC.CALLM, cv.stringRef("Core.TRUE"));
};


/* SJSTryStatement.js */

var SJSTryStatement = function() {
   Statement.call(this);
};

SJSTryStatement.prototype =
   jslib.inheritPrototype(Statement, "SJSTryStatement extends Statement");
SJSTryStatement.prototype.constructor = SJSTryStatement;
SJSTryStatement.prototype.$class = 
   new Class("SJSTryStatement", SJSTryStatement);

SJSTryStatement.prototype.prefixAction = function(p) {
   var jsp = p;
   var body = jsp.readCompoundStatement();
   jsp.verifyToken("catch");
   jsp.verifyToken("(");
   var name = jsp.createIdentifier(jsp.nextToken());
   jsp.verifyToken(")");
   var handler = jsp.readCompoundStatement();
   jsp.declareLocal(name.getName());
   return jsp.createCompound3(this, body, name, handler);
};

SJSTryStatement.prototype.compile = function(p, args, cv) {
   var jsp = p;
   var tag1 = cv.newLabel();
   var tag2 = cv.newLabel();
   jsp.pushStatementContext(null, null);
   cv.addInstruction(SVMC.TRY, cv.labelRef(tag1));
   jsp.compile(args[0], cv);
   cv.addInstruction(SVMC.ENDTRY, 0);
   cv.addInstruction(SVMC.JUMP, cv.labelRef(tag2));
   cv.defineLabel(tag1);
   cv.addInstruction(SVMC.POPVAR, cv.stringRef(args[1].getName()));
   jsp.compile(args[2], cv);
   cv.defineLabel(tag2);
   jsp.popStatementContext();
};


/* SJSUnaryMinusOperator.js */

var SJSUnaryMinusOperator = function() {
   Operator.call(this);
};

SJSUnaryMinusOperator.prototype =
   jslib.inheritPrototype(Operator, "SJSUnaryMinusOperator extends Operator");
SJSUnaryMinusOperator.prototype.constructor = SJSUnaryMinusOperator;
SJSUnaryMinusOperator.prototype.$class = 
   new Class("SJSUnaryMinusOperator", SJSUnaryMinusOperator);

SJSUnaryMinusOperator.prototype.compile = function(p, args, cv) {
   p.compile(args[0], cv);
   cv.addInstruction(SVMC.NEG, 0);
};


/* SJSUnaryPlusOperator.js */

var SJSUnaryPlusOperator = function() {
   Operator.call(this);
};

SJSUnaryPlusOperator.prototype =
   jslib.inheritPrototype(Operator, "SJSUnaryPlusOperator extends Operator");
SJSUnaryPlusOperator.prototype.constructor = SJSUnaryPlusOperator;
SJSUnaryPlusOperator.prototype.$class = 
   new Class("SJSUnaryPlusOperator", SJSUnaryPlusOperator);

SJSUnaryPlusOperator.prototype.compile = function(p, args, cv) {
   p.compile(args[0], cv);
};


/* SJSUndefinedOperator.js */

var SJSUndefinedOperator = function() {
   NofixOperator.call(this);
};

SJSUndefinedOperator.prototype =
   jslib.inheritPrototype(NofixOperator, "SJSUndefinedOperator extends NofixOperator");
SJSUndefinedOperator.prototype.constructor = SJSUndefinedOperator;
SJSUndefinedOperator.prototype.$class = 
   new Class("SJSUndefinedOperator", SJSUndefinedOperator);

SJSUndefinedOperator.prototype.compile = function(p, args, cv) {
   cv.addInstruction(SVMC.CALLM, cv.stringRef("Core.UNDEFINED"));
};


/* SJSVarKeyword.js */

var SJSVarKeyword = function() {
   PrefixOperator.call(this);
};

SJSVarKeyword.prototype =
   jslib.inheritPrototype(PrefixOperator, "SJSVarKeyword extends PrefixOperator");
SJSVarKeyword.prototype.constructor = SJSVarKeyword;
SJSVarKeyword.prototype.$class = 
   new Class("SJSVarKeyword", SJSVarKeyword);

SJSVarKeyword.prototype.prefixAction = function(p) {
   var jsp = p;
   var v = jsp.nextToken();
   jsp.declareLocal(v);
   jsp.saveToken(v);
   return jsp.readE(0);
};


/* SJSWhileStatement.js */

var SJSWhileStatement = function() {
   Statement.call(this);
};

SJSWhileStatement.prototype =
   jslib.inheritPrototype(Statement, "SJSWhileStatement extends Statement");
SJSWhileStatement.prototype.constructor = SJSWhileStatement;
SJSWhileStatement.prototype.$class = 
   new Class("SJSWhileStatement", SJSWhileStatement);

SJSWhileStatement.prototype.prefixAction = function(p) {
   var jsp = p;
   jsp.verifyToken("(");
   var exp = jsp.readE(0);
   jsp.verifyToken(")");
   var s = jsp.readStatement();
   return jsp.createCompound2(this, exp, s);
};

SJSWhileStatement.prototype.compile = function(p, args, cv) {
   var jsp = p;
   var tag1 = cv.newLabel();
   var tag2 = cv.newLabel();
   jsp.pushStatementContext(tag2, tag1);
   cv.defineLabel(tag1);
   jsp.compile(args[0], cv);
   cv.addInstruction(SVMC.JUMPF, cv.labelRef(tag2));
   jsp.compile(args[1], cv);
   cv.addInstruction(SVMC.JUMP, cv.labelRef(tag1));
   cv.defineLabel(tag2);
   jsp.popStatementContext();
};


/* Exports */

return {
   SJS : SJS,
   SJSANDOperator : SJSANDOperator,
   SJSASHRightOperator : SJSASHRightOperator,
   SJSArithmeticOperator : SJSArithmeticOperator,
   SJSAssignmentOperator : SJSAssignmentOperator,
   SJSBitwiseANDOperator : SJSBitwiseANDOperator,
   SJSBitwiseNOTOperator : SJSBitwiseNOTOperator,
   SJSBitwiseOROperator : SJSBitwiseOROperator,
   SJSBitwiseXOROperator : SJSBitwiseXOROperator,
   SJSBlockOperator : SJSBlockOperator,
   SJSBraceOperator : SJSBraceOperator,
   SJSBracketOperator : SJSBracketOperator,
   SJSBreakStatement : SJSBreakStatement,
   SJSC : SJSC,
   SJSCaseStatement : SJSCaseStatement,
   SJSContinueStatement : SJSContinueStatement,
   SJSDecrementOperator : SJSDecrementOperator,
   SJSDefaultStatement : SJSDefaultStatement,
   SJSDirective : SJSDirective,
   SJSDotOperator : SJSDotOperator,
   SJSEditor : SJSEditor,
   SJSEqualOperator : SJSEqualOperator,
   SJSFalseOperator : SJSFalseOperator,
   SJSForStatement : SJSForStatement,
   SJSFunctionKeyword : SJSFunctionKeyword,
   SJSGlobals : SJSGlobals,
   SJSGreaterEqualOperator : SJSGreaterEqualOperator,
   SJSGreaterThanOperator : SJSGreaterThanOperator,
   SJSIfStatement : SJSIfStatement,
   SJSIncrementOperator : SJSIncrementOperator,
   SJSLSHLeftOperator : SJSLSHLeftOperator,
   SJSLSHRightOperator : SJSLSHRightOperator,
   SJSLayout : SJSLayout,
   SJSLessEqualOperator : SJSLessEqualOperator,
   SJSLessThanOperator : SJSLessThanOperator,
   SJSListOperator : SJSListOperator,
   SJSMinusEqualOperator : SJSMinusEqualOperator,
   SJSMinusOperator : SJSMinusOperator,
   SJSNOTOperator : SJSNOTOperator,
   SJSNewKeyword : SJSNewKeyword,
   SJSNotEqualOperator : SJSNotEqualOperator,
   SJSNullOperator : SJSNullOperator,
   SJSOROperator : SJSOROperator,
   SJSOpEqualOperator : SJSOpEqualOperator,
   SJSParenOperator : SJSParenOperator,
   SJSParser : SJSParser,
   SJSPercentEqualOperator : SJSPercentEqualOperator,
   SJSPercentOperator : SJSPercentOperator,
   SJSPlusEqualOperator : SJSPlusEqualOperator,
   SJSPlusOperator : SJSPlusOperator,
   SJSPrefixIncDecOperator : SJSPrefixIncDecOperator,
   SJSQuestionMarkColonOperator : SJSQuestionMarkColonOperator,
   SJSRelationalOperator : SJSRelationalOperator,
   SJSReturnStatement : SJSReturnStatement,
   SJSSlashEqualOperator : SJSSlashEqualOperator,
   SJSSlashOperator : SJSSlashOperator,
   SJSStarEqualOperator : SJSStarEqualOperator,
   SJSStarOperator : SJSStarOperator,
   SJSStatementOperator : SJSStatementOperator,
   SJSSuffixDecrementOperator : SJSSuffixDecrementOperator,
   SJSSuffixIncDecOperator : SJSSuffixIncDecOperator,
   SJSSuffixIncrementOperator : SJSSuffixIncrementOperator,
   SJSSwitchStatement : SJSSwitchStatement,
   SJSThrowStatement : SJSThrowStatement,
   SJSTrueOperator : SJSTrueOperator,
   SJSTryStatement : SJSTryStatement,
   SJSUnaryMinusOperator : SJSUnaryMinusOperator,
   SJSUnaryPlusOperator : SJSUnaryPlusOperator,
   SJSUndefinedOperator : SJSUndefinedOperator,
   SJSVarKeyword : SJSVarKeyword,
   SJSWhileStatement : SJSWhileStatement
};

});
