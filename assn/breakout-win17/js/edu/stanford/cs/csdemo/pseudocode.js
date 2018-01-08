/*
 * File: pseudocode.js
 * Created on Sun Mar 01 22:40:31 EST 2015 by java2js
 * --------------------------------------------------
 * This file was generated mechanically by the java2js utility.
 * Permanent edits must be made in the Java file.
 */

define([ "jslib",
         "edu/stanford/cs/controller",
         "edu/stanford/cs/exp",
         "edu/stanford/cs/java2js",
         "edu/stanford/cs/jsconsole",
         "edu/stanford/cs/jscontrols/JSControl",
         "edu/stanford/cs/jscontrols/LoadControl",
         "edu/stanford/cs/jscontrols/ResetControl",
         "edu/stanford/cs/jscontrols/RunControl",
         "edu/stanford/cs/jscontrols/SaveControl",
         "edu/stanford/cs/jscontrols/SpeedControl",
         "edu/stanford/cs/jscontrols/StepControl",
         "edu/stanford/cs/jsdialog",
         "edu/stanford/cs/parser",
         "edu/stanford/cs/programeditor",
         "edu/stanford/cs/svm/core",
         "edu/stanford/cs/svm/parser",
         "edu/stanford/cs/tokenscanner",
         "java/awt",
         "java/lang",
         "java/util",
         "javax/swing" ],

function(jslib,
         edu_stanford_cs_controller,
         edu_stanford_cs_exp,
         edu_stanford_cs_java2js,
         edu_stanford_cs_jsconsole,
         edu_stanford_cs_jscontrols_JSControl,
         edu_stanford_cs_jscontrols_LoadControl,
         edu_stanford_cs_jscontrols_ResetControl,
         edu_stanford_cs_jscontrols_RunControl,
         edu_stanford_cs_jscontrols_SaveControl,
         edu_stanford_cs_jscontrols_SpeedControl,
         edu_stanford_cs_jscontrols_StepControl,
         edu_stanford_cs_jsdialog,
         edu_stanford_cs_parser,
         edu_stanford_cs_programeditor,
         edu_stanford_cs_svm_core,
         edu_stanford_cs_svm_parser,
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
var Controller = edu_stanford_cs_controller.Controller;
var Steppable = edu_stanford_cs_controller.Steppable;
var Compound = edu_stanford_cs_exp.Compound;
var Constant = edu_stanford_cs_exp.Constant;
var EvalContext = edu_stanford_cs_exp.EvalContext;
var Expression = edu_stanford_cs_exp.Expression;
var Function = edu_stanford_cs_exp.Function;
var LValue = edu_stanford_cs_exp.LValue;
var Value = edu_stanford_cs_exp.Value;
var JSElementList = edu_stanford_cs_java2js.JSElementList;
var JSFrame = edu_stanford_cs_java2js.JSFrame;
var JSProgram = edu_stanford_cs_java2js.JSProgram;
var JSConsole = edu_stanford_cs_jsconsole.JSConsole;
var JSControl = edu_stanford_cs_jscontrols_JSControl.JSControl;
var LoadControl = edu_stanford_cs_jscontrols_LoadControl.LoadControl;
var ResetControl = edu_stanford_cs_jscontrols_ResetControl.ResetControl;
var RunControl = edu_stanford_cs_jscontrols_RunControl.RunControl;
var SaveControl = edu_stanford_cs_jscontrols_SaveControl.SaveControl;
var SpeedControl = edu_stanford_cs_jscontrols_SpeedControl.SpeedControl;
var StepControl = edu_stanford_cs_jscontrols_StepControl.StepControl;
var JSLoadDialog = edu_stanford_cs_jsdialog.JSLoadDialog;
var JSSaveDialog = edu_stanford_cs_jsdialog.JSSaveDialog;
var CodeVector = edu_stanford_cs_parser.CodeVector;
var InfixForm = edu_stanford_cs_parser.InfixForm;
var NofixOperator = edu_stanford_cs_parser.NofixOperator;
var Operator = edu_stanford_cs_parser.Operator;
var Parser = edu_stanford_cs_parser.Parser;
var PrefixOperator = edu_stanford_cs_parser.PrefixOperator;
var Statement = edu_stanford_cs_parser.Statement;
var CommentHighlightMode = edu_stanford_cs_programeditor.CommentHighlightMode;
var ProgramEditor = edu_stanford_cs_programeditor.ProgramEditor;
var SVM = edu_stanford_cs_svm_core.SVM;
var SVMC = edu_stanford_cs_svm_core.SVMC;
var SVMParser = edu_stanford_cs_svm_parser.SVMParser;
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
var RuntimeException = java_lang.RuntimeException;
var ArrayList = java_util.ArrayList;
var HashSet = java_util.HashSet;
var TreeMap = java_util.TreeMap;
var JComponent = javax_swing.JComponent;
var ChangeEvent = javax_swing.ChangeEvent;
var ChangeListener = javax_swing.ChangeListener;

/* PCC.js */

var PCC = function() {
   /* Empty */
};

PCC.APPLICATION_BACKGROUND = new Color(0xCCFFFF);
PCC.EDITOR_FONT = Font.decode("Courier New-Bold-18");
PCC.CONSOLE_FONT = Font.decode("Courier New-Bold-18");
PCC.HOME = "http://cs.stanford.edu/~eroberts/demos";
PCC.ROOT = PCC.HOME + "/Pseudocode";
PCC.EXAMPLES = PCC.ROOT + "/examples";
PCC.EDITOR_HEIGHT = 600;
PCC.EDITOR_WIDTH = 700;
PCC.CONSOLE_EDITOR_SEP = 30;
PCC.CONSOLE_HEIGHT = 600;
PCC.CONSOLE_WIDTH = 350;
PCC.SIDE_MARGIN = 20;
PCC.TOP_MARGIN = 20;
PCC.BOTTOM_MARGIN = 20;

/* PCCPU.js */

var PCCPU = function() {
   Controller.call(this);
   this.setTarget(this);
   this.editor = new PCEditor();
   this.editor.addChangeListener(this);
   this.console = new JSConsole();
   this.parser = new PCParser();
   this.svm = new SVM();
   this.svm.setConsole(this.console);
   this.valid = false;
   this.clear();
};

PCCPU.prototype = 
   jslib.inheritPrototype(Controller, "PCCPU extends Controller");
PCCPU.prototype.constructor = PCCPU;
PCCPU.prototype.$class = 
   new Class("PCCPU", PCCPU);

PCCPU.prototype.getEditor = function() {
   return this.editor;
};

PCCPU.prototype.getConsole = function() {
   return this.console;
};

PCCPU.prototype.clear = function() {
   this.console.clear();
};

PCCPU.prototype.validateProgram = function() {
   if (!this.valid) {
      var cv = new CodeVector();
      this.parser.setInput(this.editor.getText());
      this.parser.compilePCModule(cv);
      this.svm.setProgram(cv.getCode());
      this.valid = true;
   }
};

PCCPU.prototype.startAction = function() {
   this.validateProgram();
   this.start(Controller.RUNNING);
};

PCCPU.prototype.stepAction = function() {
   this.start(Controller.STEPPING);
};

PCCPU.prototype.step = function() {
   this.svm.run();
   this.stopAction();
   this.svm.setPC(0);
};

PCCPU.prototype.isCallable = function() {
   return false;
};

PCCPU.prototype.getStackDepth = function() {
   return 0;
};

PCCPU.prototype.stateChanged = function(e) {
   this.valid = false;
};


/* PCEditor.js */

var PCEditor = function() {
   ProgramEditor.call(this);
   this.scanner = new TokenScanner();
   this.scanner.ignoreWhitespace();
   this.scanner.ignoreComments();
   this.scanner.scanNumbers();
   this.scanner.addWordCharacters("_");
   this.setFont(PCC.EDITOR_FONT);
   this.setLineWrap(false);
   this.setEditorMode(new CommentHighlightMode());
};

PCEditor.prototype = 
   jslib.inheritPrototype(ProgramEditor, "PCEditor extends ProgramEditor");
PCEditor.prototype.constructor = PCEditor;
PCEditor.prototype.$class = 
   new Class("PCEditor", PCEditor);

PCEditor.prototype.getPreferredSize = function() {
   return new Dimension(PCC.EDITOR_WIDTH, PCC.EDITOR_HEIGHT);
};

PCEditor.prototype.isBreakpointLegal = function(k) {
   this.updateLineTable();
   return this.lineTable.containsValue(k);
};

PCEditor.prototype.getSourceLineIndex = function(addr) {
   var k = this.lineTable.get(addr);
   return (k === null) ? 0 : k;
};

PCEditor.prototype.updateLineTable = function() {
   // Fill in
};

PCEditor.prototype.paint = function(g) {
   if (g.getFont().getSize() >= 22) return;
   ProgramEditor.prototype.paint.call(this, g);
};


/* PCLayout.js */

var PCLayout = function() {
   /* Empty */
};

PCLayout.prototype.addLayoutComponent = function(name, comp) {
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

PCLayout.prototype.removeLayoutComponent = function(comp) {
   /* Empty */
};

PCLayout.prototype.preferredLayoutSize = function(target) {
   if (target.getTreeLock()) {
      var eSize = this.editor.getPreferredSize();
      var cSize = this.console.getPreferredSize();
      var ctlSize = this.controls.getPreferredSize();
      var width = 2 * PCC.SIDE_MARGIN + eSize.width + cSize.width +
      PCC.CONSOLE_EDITOR_SEP;
      var height = PCC.TOP_MARGIN + cSize.height + PCC.BOTTOM_MARGIN +
      ctlSize.height;
      var insets = target.getInsets();
      width += insets.left + insets.right;
      height += insets.top + insets.bottom;
      return new Dimension(width, height);
   }
};

PCLayout.prototype.minimumLayoutSize = function(target) {
   return this.preferredLayoutSize(target);
};

PCLayout.prototype.layoutContainer = function(target) {
   if (target.getTreeLock()) {
      var insets = target.getInsets();
      var ctlSize = this.controls.getPreferredSize();
      var bounds = target.getBounds();
      var x = bounds.x + insets.left;
      var y = bounds.y + insets.top;
      var width = bounds.width - insets.left - insets.right;
      var height = bounds.height - insets.top - insets.bottom;
      var cx = x + PCC.SIDE_MARGIN;
      var cy = y + PCC.TOP_MARGIN;
      var cw = PCC.CONSOLE_WIDTH;
      var ch = y + height - cy - PCC.BOTTOM_MARGIN - ctlSize.height;
      this.console.setBounds(cx, cy, cw, ch);
      var ex = cx + cw + PCC.CONSOLE_EDITOR_SEP;
      var ew = x + width - ex - PCC.SIDE_MARGIN;
      this.editor.setBounds(ex, cy, ew, ch);
      this.controls.setBounds(0, height - ctlSize.height, width, ctlSize.height);
   }
};


/* PCParser.js */

var PCParser = function() {
   SVMParser.call(this);
   this.definePCOperators();
};

PCParser.prototype = 
   jslib.inheritPrototype(SVMParser, "PCParser extends SVMParser");
PCParser.prototype.constructor = PCParser;
PCParser.prototype.$class = 
   new Class("PCParser", PCParser);

PCParser.prototype.createTokenScanner = function() {
   var scanner = new TokenScanner();
   scanner.ignoreWhitespace();
   scanner.ignoreComments();
   scanner.scanStrings();
   scanner.scanNumbers();
   scanner.addWordCharacters("_");
   scanner.addOperator("\n");
   this.addOperatorTokens(scanner);
   return scanner;
};

PCParser.prototype.addOperatorTokens = function(scanner) {
   scanner.addOperator("<-");
};

PCParser.prototype.defineStatementForms = function() {
   this.defineStatementForm("IF", new IfStatement());
   this.defineStatementForm("REPEAT", new RepeatStatement());
   this.defineStatementForm("WHILE", new WhileStatement());
   //      this.defineStatementForm("FOR", new ForStatement());
};

PCParser.prototype.compilePCModule = function(cv) {
   var statements = new ArrayList();
   while (true) {
      this.flushNewline();
      if (!this.hasMoreTokens()) break;
      statements.add(this.readStatement());
   }
   var el0 = new JSElementList(statements);
   for (var ei0 = 0; ei0 < el0.size(); ei0++) {
      var stmt = el0.get(ei0);
      this.compile(stmt, cv);
   }
   cv.addInstruction(SVMC.HALT, 0);
   this.addPCFunctions(cv);
   cv.addInstruction(SVMC.END, 0);
};

PCParser.prototype.compile = function(exp, cv) {
   var type = exp.getType();
   switch (type) {
    case Expression.CONSTANT:
      this.compileConstant(exp.getValue(), cv);
      break;
    case Expression.IDENTIFIER:
      cv.addInstruction(SVMC.PUSHSTR, cv.stringRef(exp.getName()));
      cv.addInstruction(SVMC.CALLM, cv.stringRef("Global.get"));
      break;
    case Expression.COMPOUND:
      this.compileCompound(exp, cv);
      break;
   }
};

PCParser.prototype.readStatement = function() {
   this.flushNewline();
   var token = this.nextToken();
   if (jslib.equals(token, "{")) {
      this.saveToken(token);
      return this.readCompoundStatement();
   }
   var op = this.lookupOperator(token);
   if (op === null || !op.isStatement()) {
      var t2 = this.nextToken();
      if (jslib.equals(t2, "<-")) {
         var lhs = this.createIdentifier(token);
         var rhs = this.readE(0);
         this.flushNewline();
         return this.createCompound2(this.assignmentOperator, lhs, rhs);
      }
      this.saveToken(t2);
      this.saveToken(token);
      var exp = this.readE(0);
      this.flushNewline();
      return exp;
   }
   var stmt = op.prefixAction(this);
   this.flushNewline();
   return stmt;
};

PCParser.prototype.flushNewline = function() {
   var token = this.nextToken();
   while (jslib.equals(token, "\n")) {
      token = this.nextToken();
      if (jslib.equals(token, "")) return;
   }
   this.saveToken(token);
};

PCParser.prototype.addPCFunctions = function(cv) {
   cv.defineLabel("display");
   cv.addInstruction(SVMC.CALLM, cv.stringRef("Console.println"));
   cv.addInstruction(SVMC.RETURN, 0);
   cv.defineLabel("random");
   cv.addInstruction(SVMC.FRAME, 2);
   cv.addInstruction(SVMC.POPLOC, 1);
   cv.addInstruction(SVMC.POPLOC, 0);
   cv.addInstruction(SVMC.CALLM, cv.stringRef("Math.random"));
   cv.addInstruction(SVMC.PUSHLOC, 1);
   cv.addInstruction(SVMC.PUSHLOC, 0);
   cv.addInstruction(SVMC.SUB, 0);
   cv.addInstruction(SVMC.PUSHINT, cv.intRef(1));
   cv.addInstruction(SVMC.ADD, 0);
   cv.addInstruction(SVMC.MUL, 0);
   cv.addInstruction(SVMC.CALLM, cv.stringRef("Math.floor"));
   cv.addInstruction(SVMC.PUSHLOC, 0);
   cv.addInstruction(SVMC.ADD, 0);
   cv.addInstruction(SVMC.RETURN, 0);
};

PCParser.prototype.definePCOperators = function() {
   var LEFT = Operator.LEFT;
   var RIGHT = Operator.RIGHT;
   this.assignmentOperator = new PCAssignmentOperator();
   this.defineInfixOperator("=", this.getOperator("=="), 50, LEFT);
   this.defineInfixOperator("AND", this.getOperator("&&"), 30, LEFT);
   this.defineInfixOperator("OR", this.getOperator("||"), 20, LEFT);
   this.definePrefixOperator("NOT", this.getOperator("!"), 100);
   this.removeOperator("!");
   this.removeOperator("&&");
   this.removeOperator("||");
   this.removeOperator("==");
   this.removeOperator("%=");
   this.removeOperator("*=");
   this.removeOperator("++");
   this.removeOperator("+=");
   this.removeOperator("--");
   this.removeOperator("-=");
   this.removeOperator(".");
   this.removeOperator("/=");
   this.removeOperator("?");
   this.removeOperator("new");
   this.removeOperator("var");
   this.removeOperator("x++");
   this.removeOperator("x--");
};

var PCAssignmentOperator = function() {
   InfixForm.call(this);
};

PCAssignmentOperator.prototype =
   jslib.inheritPrototype(InfixForm, "PCAssignmentOperator extends InfixForm");
PCAssignmentOperator.prototype.constructor = PCAssignmentOperator;
PCAssignmentOperator.prototype.$class = 
   new Class("PCAssignmentOperator", PCAssignmentOperator);

PCAssignmentOperator.prototype.apply = function(ec, args) {
   var lhs = args[0].getLValue(ec);
   var rhs = args[1].eval(ec);
   lhs.set(ec, rhs);
   return rhs;
};

PCAssignmentOperator.prototype.compile = function(p, args, cv) {
   cv.addInstruction(SVMC.PUSHSTR, cv.stringRef(args[0].getName()));
   p.compile(args[1], cv);
   cv.addInstruction(SVMC.CALLM, cv.stringRef("Global.set"));
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
   var s1 = cp.readStatement();
   var token = cp.nextToken();
   if (jslib.equals(token, "ELSE")) {
      var s2 = cp.readStatement();
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
   var exp = cp.readE(0);
   cp.verifyToken("TIMES");
   var s = cp.readStatement();
   return cp.createCompound2(this, exp, s);
};

RepeatStatement.prototype.compile = function(p, args, cv) {
   var tag1 = cv.newLabel();
   var tag2 = cv.newLabel();
   p.compile(args[0], cv);
   cv.defineLabel(tag1);
   cv.addInstruction(SVMC.DUP, 0);
   cv.addInstruction(SVMC.PUSHINT, cv.intRef(0));
   cv.addInstruction(SVMC.GT, 0);
   cv.addInstruction(SVMC.JUMPF, cv.labelRef(tag2));
   p.compile(args[1], cv);
   cv.addInstruction(SVMC.PUSHINT, cv.intRef(1));
   cv.addInstruction(SVMC.SUB, 0);
   cv.addInstruction(SVMC.JUMP, cv.labelRef(tag1));
   cv.defineLabel(tag2);
   cv.addInstruction(SVMC.FLUSH, 1);
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
   var cp = p;
   cp.verifyToken("(");
   var exp = cp.readE(0);
   cp.verifyToken(")");
   var s = cp.readStatement();
   return cp.createCompound2(this, exp, s);
};

WhileStatement.prototype.compile = function(p, args, cv) {
   var tag1 = cv.newLabel();
   var tag2 = cv.newLabel();
   cv.defineLabel(tag1);
   p.compile(args[0], cv);
   cv.addInstruction(SVMC.JUMPF, cv.labelRef(tag2));
   p.compile(args[1], cv);
   cv.addInstruction(SVMC.JUMP, cv.labelRef(tag1));
   cv.defineLabel(tag2);
};


/* Pseudocode.js */

var Pseudocode = function() {
   JSProgram.call(this);
   this.setTitle("Pseudocode Interpreter");
   this.setLayout(new PCLayout());
   this.cpu = new PCCPU();
   this.editor = this.cpu.getEditor();
   this.editor.setPreferredSize(new Dimension(PCC.EDITOR_WIDTH, PCC.EDITOR_HEIGHT));
   this.console = this.cpu.getConsole();
   this.console.setPreferredSize(new Dimension(PCC.CONSOLE_WIDTH, PCC.CONSOLE_HEIGHT));
   this.loadDialog = new JSLoadDialog(this, PCC.EXAMPLES);
   this.loadDialog.addActionListener(new PCFileLoader(this.editor, this.loadDialog));
   this.loadDialog.setTitle("Examples");
   this.saveDialog = new JSSaveDialog(this);
   var consoleFrame = this.createFrame(this.console, "Console");
   var editorFrame = this.createFrame(this.editor, "Untitled");
   this.editor.setFrame(editorFrame);
   this.add(consoleFrame, "console");
   this.add(editorFrame, "editor");
   this.setBackground(PCC.APPLICATION_BACKGROUND);
   this.createControlStrip();
   this.pack();
   this.setVisible(true);
};

Pseudocode.prototype = 
   jslib.inheritPrototype(JSProgram, "Pseudocode extends JSProgram");
Pseudocode.prototype.constructor = Pseudocode;
Pseudocode.prototype.$class = 
   new Class("Pseudocode", Pseudocode);

Pseudocode.prototype.run = function() {
   this.editor.requestFocus();
};

Pseudocode.prototype.actionPerformed = function(e) {
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
      this.saveDialog.setText(this.editor.getText());
      this.saveDialog.setVisible(true);
   } else if (jslib.equals(cmd, "Reset")) {
      this.cpu.stopAction();
      this.cpu.clear();
   }
};

Pseudocode.prototype.createControlStrip = function() {
   var loadControl = new LoadControl();
   loadControl.addActionListener(this);
   this.cpu.addControl(loadControl);
   this.addControl(loadControl);
   var saveControl = new SaveControl();
   saveControl.addActionListener(this);
   this.cpu.addControl(saveControl);
   this.addControl(saveControl);
   var resetControl = new ResetControl();
   resetControl.addActionListener(this);
   this.cpu.addControl(resetControl);
   this.addControl(resetControl);
   var runControl = new RunControl();
   this.cpu.addControl(runControl);
   this.addControl(runControl);
   var stepControl = new StepControl();
   this.cpu.addControl(stepControl);
   //      this.addControl(stepControl);
   var speedControl = new SpeedControl();
   this.cpu.addControl(speedControl);
   //      this.addControl(speedControl);
};

Pseudocode.prototype.createFrame = function(component, title) {
   return new JSFrame(component, title);
};

Pseudocode.main = function(args) {
   new Pseudocode().start();
};

var PCFileLoader = function(editor, dialog) {
   this.editor = editor;
   this.dialog = dialog;
};

PCFileLoader.prototype.actionPerformed = function(e) {
   this.editor.removeAllBreakpoints();
   this.editor.setText(e.getActionCommand());
   this.editor.setCursorPosition(0);
   var frame = this.editor.getFrame();
   if (frame !== null) frame.setTitle(this.dialog.getSelectedFile().getTail());
};


/* Exports */

return {
   PCC : PCC,
   PCCPU : PCCPU,
   PCEditor : PCEditor,
   PCLayout : PCLayout,
   PCParser : PCParser,
   Pseudocode : Pseudocode
};

});
