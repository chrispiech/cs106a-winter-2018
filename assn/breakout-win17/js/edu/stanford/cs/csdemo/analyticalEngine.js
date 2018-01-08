/*
 * File: analyticalEngine.js
 * Created on Sun Jan 10 12:29:16 PST 2016 by java2js
 * --------------------------------------------------
 * This file was generated mechanically by the java2js utility.
 * Permanent edits must be made in the Java file.
 */

define([ "jslib",
         "edu/stanford/cs/controller",
         "edu/stanford/cs/java2js",
         "edu/stanford/cs/jsconsole",
         "edu/stanford/cs/jscontrols/JSControl",
         "edu/stanford/cs/jscontrols/LoadControl",
         "edu/stanford/cs/jscontrols/ResetControl",
         "edu/stanford/cs/jscontrols/RunControl",
         "edu/stanford/cs/jscontrols/SaveControl",
         "edu/stanford/cs/jscontrols/SpeedControl",
         "edu/stanford/cs/jscontrols/StepControl",
         "edu/stanford/cs/programeditor",
         "edu/stanford/cs/tokenscanner",
         "java/awt",
         "java/lang",
         "java/math",
         "java/util",
         "javax/swing" ],

function(jslib,
         edu_stanford_cs_controller,
         edu_stanford_cs_java2js,
         edu_stanford_cs_jsconsole,
         edu_stanford_cs_jscontrols_JSControl,
         edu_stanford_cs_jscontrols_LoadControl,
         edu_stanford_cs_jscontrols_ResetControl,
         edu_stanford_cs_jscontrols_RunControl,
         edu_stanford_cs_jscontrols_SaveControl,
         edu_stanford_cs_jscontrols_SpeedControl,
         edu_stanford_cs_jscontrols_StepControl,
         edu_stanford_cs_programeditor,
         edu_stanford_cs_tokenscanner,
         java_awt,
         java_lang,
         java_math,
         java_util,
         javax_swing) {

/* Imports */

var inheritPrototype = jslib.inheritPrototype;
var newArray = jslib.newArray;
var toInt = jslib.toInt;
var toStr = jslib.toStr;
var Controller = edu_stanford_cs_controller.Controller;
var Steppable = edu_stanford_cs_controller.Steppable;
var JSCanvas = edu_stanford_cs_java2js.JSCanvas;
var JSErrorEvent = edu_stanford_cs_java2js.JSErrorEvent;
var JSFile = edu_stanford_cs_java2js.JSFile;
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
var SpeedControl = edu_stanford_cs_jscontrols_SpeedControl.SpeedControl;
var StepControl = edu_stanford_cs_jscontrols_StepControl.StepControl;
var CommentHighlightMode = edu_stanford_cs_programeditor.CommentHighlightMode;
var ProgramEditor = edu_stanford_cs_programeditor.ProgramEditor;
var TokenScanner = edu_stanford_cs_tokenscanner.TokenScanner;
var BasicStroke = java_awt.BasicStroke;
var Color = java_awt.Color;
var Component = java_awt.Component;
var Container = java_awt.Container;
var Dimension = java_awt.Dimension;
var Font = java_awt.Font;
var FontMetrics = java_awt.FontMetrics;
var Graphics = java_awt.Graphics;
var Graphics2D = java_awt.Graphics2D;
var Insets = java_awt.Insets;
var LayoutManager = java_awt.LayoutManager;
var Rectangle = java_awt.Rectangle;
var ActionEvent = java_awt.ActionEvent;
var ActionListener = java_awt.ActionListener;
var Character = java_lang.Character;
var Class = java_lang.Class;
var Integer = java_lang.Integer;
var RuntimeException = java_lang.RuntimeException;
var BigInteger = java_math.BigInteger;
var TreeMap = java_util.TreeMap;
var JComponent = javax_swing.JComponent;
var ChangeEvent = javax_swing.ChangeEvent;
var ChangeListener = javax_swing.ChangeListener;

/* AEC.js */

var AEC = function() {
   /* Empty */
};

AEC.APPLICATION_BACKGROUND = new Color(0xCCFFFF);
AEC.CANVAS_BACKGROUND = new Color(0xCCFFFF);
AEC.COLUMN_BGCOLOR = AEC.CANVAS_BACKGROUND;
AEC.SHADE_COLOR = new Color(0x996633);
AEC.EDITOR_FONT = Font.decode("Courier New-Bold-18");
AEC.PRINTER_FONT = Font.decode("Courier New-Bold-18");
AEC.BOTTOM_MARGIN = 10;
AEC.DEFAULT_NCOLUMNS = 20;
AEC.DEFAULT_NDIGITS = 8;
AEC.EDITOR_HEIGHT = 350;
AEC.EDITOR_WIDTH = 450;
AEC.LEFT_MARGIN = 15;
AEC.MILL_COLUMN_SEP = 10;
AEC.MILL_PRINTER_SEP = 20;
AEC.MILL_STORE_SEP = 30;
AEC.OP_BOX_SIZE = 32;
AEC.PRIME_SEP = 6;
AEC.PRINTER_EDITOR_SEP = 30;
AEC.PRINTER_HEIGHT = 350;
AEC.PRINTER_WIDTH = 252;
AEC.RUNUP_BOX_SIZE = 32;
AEC.SHADE_MARGIN = 6;
AEC.SIDE_MARGIN = 10;
AEC.STORE_X = 200;
AEC.TOP_MARGIN = 10;
AEC.VIEW_HEIGHT = 260;
AEC.VIEW_WIDTH = 920;

/* AEEditor.js */

var AEEditor = function() {
   ProgramEditor.call(this);
   this.scanner = new TokenScanner();
   this.scanner.ignoreWhitespace();
   this.scanner.ignoreComments();
   this.scanner.scanNumbers();
   this.scanner.addWordCharacters("?+-");
   this.setFont(AEC.EDITOR_FONT);
   this.setLineWrap(false);
   this.setEditorMode(new CommentHighlightMode());
};

AEEditor.prototype = 
   jslib.inheritPrototype(ProgramEditor, "AEEditor extends ProgramEditor");
AEEditor.prototype.constructor = AEEditor;
AEEditor.prototype.$class = 
   new Class("AEEditor", AEEditor);

AEEditor.prototype.getPreferredSize = function() {
   return new Dimension(AEC.EDITOR_WIDTH, AEC.EDITOR_HEIGHT);
};

AEEditor.prototype.isBreakpointLegal = function(k) {
   this.updateLineTable();
   return this.lineTable.containsValue(k);
};

AEEditor.prototype.getSourceLineIndex = function(addr) {
   var k = this.lineTable.get(addr);
   return (k === null) ? 0 : k;
};

AEEditor.prototype.updateLineTable = function() {
   this.lineTable = new TreeMap();
   var lc = 0;
   var prevLine = -1;
   this.scanner.setInput(this.getText());
   while (this.scanner.hasMoreTokens()) {
      this.scanner.nextToken();
      var line = this.getLineNumber(this.scanner.getPosition());
      if (line !== prevLine) {
         this.lineTable.put(++lc, line);
         prevLine = line;
      }
   }
};

AEEditor.prototype.paint = function(g) {
   if (g.getFont().getSize() >= 22) return;
   ProgramEditor.prototype.paint.call(this, g);
};


/* AELayout.js */

var AELayout = function() {
   /* Empty */
};

AELayout.prototype.addLayoutComponent = function(name, comp) {
   if (jslib.equals(name, "controls")) {
      this.controls = comp;
   } else if (jslib.equals(name, "view")) {
      this.view = comp;
   } else if (jslib.equals(name, "printer")) {
      this.printer = comp;
   } else if (jslib.equals(name, "editor")) {
      this.editor = comp;
   } else {
      throw new RuntimeException("Illegal component name: " + name);
   }
};

AELayout.prototype.removeLayoutComponent = function(comp) {
   /* Empty */
};

AELayout.prototype.preferredLayoutSize = function(target) {
   if (target.getTreeLock()) {
      var vSize = this.view.getPreferredSize();
      var pSize = this.printer.getPreferredSize();
      var cSize = this.controls.getPreferredSize();
      var width = 2 * AEC.SIDE_MARGIN + vSize.width;
      var height = AEC.TOP_MARGIN + vSize.height + AEC.MILL_PRINTER_SEP +
      pSize.height + AEC.BOTTOM_MARGIN + cSize.height;
      var insets = target.getInsets();
      width += insets.left + insets.right;
      height += insets.top + insets.bottom;
      return new Dimension(width, height);
   }
};

AELayout.prototype.minimumLayoutSize = function(target) {
   return this.preferredLayoutSize(target);
};

AELayout.prototype.layoutContainer = function(target) {
   if (target.getTreeLock()) {
      var insets = target.getInsets();
      var vSize = this.view.getPreferredSize();
      var cSize = this.controls.getPreferredSize();
      var bounds = target.getBounds();
      var x = bounds.x + insets.left;
      var y = bounds.y + insets.top;
      var width = bounds.width - insets.left - insets.right;
      var height = bounds.height - insets.top - insets.bottom;
      var vx = x + AEC.SIDE_MARGIN;
      var vy = y + AEC.TOP_MARGIN;
      this.view.setBounds(vx, vy, vSize.width, vSize.height);
      var px = x + AEC.SIDE_MARGIN;
      var py = vy + vSize.height + AEC.MILL_PRINTER_SEP;
      var pw = AEC.PRINTER_WIDTH;
      var ph = y + height - py - AEC.BOTTOM_MARGIN - cSize.height;
      this.printer.setBounds(px, py, pw, ph);
      var ex = px + pw + AEC.PRINTER_EDITOR_SEP;
      var ew = x + width - ex - AEC.SIDE_MARGIN;
      this.editor.setBounds(ex, py, ew, ph);
      this.controls.setBounds(0, height - cSize.height, width, cSize.height);
   }
};


/* AEModel.js */

var AEModel = function() {
   Controller.call(this);
   this.setTarget(this);
   this.resize(AEC.DEFAULT_NCOLUMNS, AEC.DEFAULT_NDIGITS);
   this.scanner = new TokenScanner();
   this.scanner.ignoreWhitespace();
   this.scanner.ignoreComments();
   this.scanner.scanNumbers();
   this.scanner.addWordCharacters("?+-");
   this.editor = new AEEditor();
   this.printer = new AEPrinter();
   this.clear();
};

AEModel.prototype = 
   jslib.inheritPrototype(Controller, "AEModel extends Controller");
AEModel.prototype.constructor = AEModel;
AEModel.prototype.$class = 
   new Class("AEModel", AEModel);

AEModel.prototype.resize = function(columns, digits) {
   this.nColumns = columns;
   this.nDigits = digits;
   this.ingress1p = AEModel.ZERO;
   this.ingress1 = AEModel.ZERO;
   this.ingress2 = AEModel.ZERO;
   this.egressp = AEModel.ZERO;
   this.egress = AEModel.ZERO;
   this.store = jslib.newArray(columns);
   for (var i = 0; i < columns; i++) {
      this.store[i] = AEModel.ZERO;
   }
   this.modulus = AEModel.TEN.pow(digits);
};

AEModel.prototype.getEditor = function() {
   return this.editor;
};

AEModel.prototype.getPrinter = function() {
   return this.printer;
};

AEModel.prototype.clear = function() {
   this.clearMill();
   this.clearStore();
   this.editor.setCurrentLine(0);
   this.update();
};

AEModel.prototype.clearMill = function() {
   this.ingress1p = AEModel.ZERO;
   this.ingress1 = AEModel.ZERO;
   this.ingress2 = AEModel.ZERO;
   this.egressp = AEModel.ZERO;
   this.egress = AEModel.ZERO;
   this.ingress1Loaded = false;
   this.runup = false;
   this.operator = "";
   this.pc = 0;
};

AEModel.prototype.clearStore = function() {
   for (var i = 0; i < this.nColumns; i++) {
      this.store[i] = AEModel.ZERO;
   }
};

AEModel.prototype.getNColumns = function() {
   return this.nColumns;
};

AEModel.prototype.getNDigits = function() {
   return this.nDigits;
};

AEModel.prototype.getIngress1 = function() {
   return this.ingress1;
};

AEModel.prototype.getIngress2 = function() {
   return this.ingress2;
};

AEModel.prototype.getPrimedIngress1 = function() {
   return this.ingress1p;
};

AEModel.prototype.getEgress = function() {
   return this.egress;
};

AEModel.prototype.getPrimedEgress = function() {
   return this.egressp;
};

AEModel.prototype.getStore = function(address) {
   return this.store[address];
};

AEModel.prototype.getOp = function() {
   return this.operator;
};

AEModel.prototype.getRunup = function() {
   return this.runup;
};

AEModel.prototype.getPC = function() {
   return this.pc;
};

AEModel.prototype.reset = function() {
   this.pc = 0;
};

AEModel.prototype.startAction = function() {
   this.editor.updateLineTable();
   this.start(Controller.RUNNING);
};

AEModel.prototype.stepAction = function() {
   this.editor.updateLineTable();
   this.start(Controller.STEPPING);
};

AEModel.prototype.step = function() {
   if (this.pc === 0) {
      this.clearMill();
      this.printer.clear();
      this.pc = 1;
   } else {
      var k = this.editor.getSourceLineIndex(this.pc);
      var line = (k === 0) ? null : this.editor.getLine(k);
      if (line === null) {
         this.pc = 0;
         this.setControllerState(Controller.FINISHED);
      } else {
         try {
            this.pc++;
            this.execute(line);
         } catch (ex) {
            this.editor.showErrorMessage(k, "<html>" + RuntimeException.patchMessage(ex) +
            "</html>");
            this.pc = 0;
            this.editor.setCurrentLine(0);
            this.setControllerState(Controller.ERROR);
            this.update();
            return;
         }
      }
   }
   var k = this.editor.getSourceLineIndex(this.pc);
   var line = (k === 0) ? null : this.editor.getLine(k);
   if (line === null) {
      this.pc = 0;
      this.setControllerState(Controller.FINISHED);
   }
   if (this.pc > 0 && this.getSpeed() < 95) {
      this.editor.setCurrentLine(this.editor.getSourceLineIndex(this.pc));
   } else {
      this.editor.setCurrentLine(0);
   }
   if (this.editor.isBreakpoint(this.editor.getSourceLineIndex(this.pc))) {
      this.editor.setCurrentLine(this.editor.getSourceLineIndex(this.pc));
      this.setControllerState(Controller.STOPPED);
   }
   this.update();
};

AEModel.prototype.isCallable = function() {
   return false;
};

AEModel.prototype.getStackDepth = function() {
   return 0;
};

AEModel.prototype.execute = function(line) {
   this.scanner.setInput(line);
   var op = this.scanner.nextToken();
   var dpos = AEModel.findNumber(op);
   if (dpos > 0) {
      var start = (op.charCodeAt(dpos) === toInt('+')) ? dpos + 1 : dpos;
      this.scanner.saveToken(op.substring(start));
      op = op.substring(0, dpos);
   }
   if (jslib.equals(op, "N")) {
      this.executeNumberInstruction();
   } else if (jslib.equals(op, "L")) {
      this.executeLoadInstruction();
   } else if (jslib.equals(op, "L'")) {
      this.executeLoadPrimedInstruction();
   } else if (jslib.equals(op, "Z") || jslib.equals(op, "LZ")) {
      this.executeLoadZeroInstruction();
   } else if (jslib.equals(op, "Z'") || jslib.equals(op, "LZ'")) {
      this.executeLoadZeroPrimedInstruction();
   } else if (jslib.equals(op, "S")) {
      this.executeStoreInstruction();
   } else if (jslib.equals(op, "S'")) {
      this.executeStorePrimedInstruction();
   } else if (jslib.equals(op, "P")) {
      this.executePrintInstruction();
   } else if (jslib.equals(op, "B") || jslib.equals(op, "CB+")) {
      this.executeBackInstruction();
   } else if (jslib.equals(op, "F") || jslib.equals(op, "CF+")) {
      this.executeForwardInstruction();
   } else if (jslib.equals(op, "CB") || jslib.equals(op, "?B") || jslib.equals(op, "CB?")) {
      this.executeConditionalBackInstruction();
   } else if (jslib.equals(op, "CF") || jslib.equals(op, "?F") || jslib.equals(op, "CF?")) {
      this.executeConditionalForwardInstruction();
   } else if (op.length === 1 && "+-*/".indexOf(op) !== -1) {
      this.operator = op;
   } else {
      throw new RuntimeException("Unrecognized operation code " +
      AEModel.quoteCode(op));
   }
};

AEModel.quoteCode = function(code) {
   return "<code><b>" + code + "</b></code>";
};

AEModel.findNumber = function(s) {
   for (var i = 1; i < s.length; i++) {
      switch (s.charCodeAt(i)) {
       case toInt('0'): case toInt('1'): case toInt('2'): case toInt('3'): case toInt('4'):
       case toInt('5'): case toInt('6'): case toInt('7'): case toInt('8'): case toInt('9'):
       case toInt('+'): case toInt('-'):
         return i;
      }
   }
   return -1;
};

AEModel.prototype.executeNumberInstruction = function() {
   var address = this.parseAddress();
   this.store[address] = this.parseValue();
};

AEModel.prototype.executeLoadInstruction = function() {
   var address = this.parseAddress();
   if (this.ingress1Loaded) {
      this.ingress2 = this.store[address];
      this.performOperation();
      this.ingress1Loaded = false;
   } else {
      this.ingress1 = this.store[address];
      this.ingress1p = AEModel.ZERO;
      this.ingress1Loaded = true;
   }
};

AEModel.prototype.executeLoadPrimedInstruction = function() {
   this.ingress1p = this.store[this.parseAddress()];
};

AEModel.prototype.executeLoadZeroInstruction = function() {
   var address = this.parseAddress();
   if (this.ingress1Loaded) {
      this.ingress2 = this.store[address];
      this.performOperation();
      this.ingress1Loaded = false;
   } else {
      this.ingress1 = this.store[address];
      this.ingress1p = AEModel.ZERO;
      this.ingress1Loaded = true;
   }
   this.store[address] = AEModel.ZERO;
};

AEModel.prototype.executeLoadZeroPrimedInstruction = function() {
   var address = this.parseAddress();
   this.ingress1p = this.store[address];
   this.store[address] = AEModel.ZERO;
};

AEModel.prototype.executeStoreInstruction = function() {
   this.store[this.parseAddress()] = this.egress;
};

AEModel.prototype.executeStorePrimedInstruction = function() {
   this.store[this.parseAddress()] = this.egressp;
};

AEModel.prototype.executeBackInstruction = function() {
   this.pc = Math.max(0, this.pc - this.parseAddress());
};

AEModel.prototype.executeConditionalBackInstruction = function() {
   if (this.runup) this.executeBackInstruction();
};

AEModel.prototype.executeForwardInstruction = function() {
   this.pc = this.pc + this.parseAddress();
};

AEModel.prototype.executeConditionalForwardInstruction = function() {
   if (this.runup) this.executeForwardInstruction();
};

AEModel.prototype.executePrintInstruction = function() {
   this.printer.println("" + this.store[this.parseAddress()]);
};

AEModel.prototype.performOperation = function() {
   var v1 = this.ingress1;
   var v2 = this.ingress2;
   var result = null;
   this.runup = false;
   if (jslib.equals("+", this.operator)) {
      result = v1.add(v2);
      this.runup = toInt(((v1.signum() + 2) / 2))!=
      toInt(((result.signum() + 2) / 2));
      if (result.abs().compareTo /* BigInteger */ (this.modulus) >= 0) {
         this.runup = true;
         result = this.reduceByModulus(result);
      }
      this.egress = result;
   } else if (jslib.equals("-", this.operator)) {
      result = v1.subtract(v2);
      this.runup = toInt(((v1.signum() + 2) / 2))!=
      toInt(((result.signum() + 2) / 2));
      if (result.abs().compareTo /* BigInteger */ (this.modulus) >= 0) {
         this.runup = true;
         result = this.reduceByModulus(result);
      }
      this.egress = result;
   } else if (jslib.equals("*", this.operator)) {
      result = v1.multiply(v2);
      this.egress = this.reduceByModulus(result);
      this.egressp = result.divide(this.modulus);
   } else if (jslib.equals("/", this.operator)) {
      if (v2.signum() === 0) {
         this.runup = true;
         result = AEModel.ZERO;
      } else {
         result = v1.divide(v2);
         this.runup = (result.abs().compareTo /* BigInteger */ (this.modulus) >= 0);
         if (this.runup) result = this.reduceByModulus(result);
      }
      this.egress = result;
   } else {
      this.egress = AEModel.ZERO;
      this.egressp = AEModel.ZERO;
   }
};

AEModel.prototype.parseAddress = function() {
   var token = this.scanner.nextToken();
   if (this.scanner.getTokenType(token) !== TokenScanner.NUMBER) {
      throw new RuntimeException("Illegal address: " + AEModel.quoteCode(token));
   }
   return Integer.parseInt(token);
};

AEModel.prototype.parseValue = function() {
   var token = this.scanner.nextToken();
   if (this.scanner.getTokenType(token) !== TokenScanner.NUMBER) {
      throw new RuntimeException("Illegal value: " + AEModel.quoteCode(token));
   }
   return new BigInteger(token, 10);
};

AEModel.prototype.reduceByModulus = function(n) {
   if (n.signum() < 0) {
      return n.negate().mod(this.modulus).negate();
   } else {
      return n.mod(this.modulus);
   }
};

AEModel.ZERO = new BigInteger("0");
AEModel.TEN = new BigInteger("10");

/* AEPrinter.js */

var AEPrinter = function() {
   JSConsole.call(this);
   this.setFont(AEC.PRINTER_FONT);
};

AEPrinter.prototype = 
   jslib.inheritPrototype(JSConsole, "AEPrinter extends JSConsole");
AEPrinter.prototype.constructor = AEPrinter;
AEPrinter.prototype.$class = 
   new Class("AEPrinter", AEPrinter);

AEPrinter.prototype.getPreferredSize = function() {
   return new Dimension(AEC.PRINTER_WIDTH, AEC.PRINTER_HEIGHT);
};


/* AEView.js */

var AEView = function(model) {
   JSCanvas.call(this);
   this.engine = model;
   this.engine.addChangeListener(this);
   this.setBackground(AEC.CANVAS_BACKGROUND);
   this.setSize(AEC.VIEW_WIDTH, AEC.VIEW_HEIGHT);
};

AEView.prototype = 
   jslib.inheritPrototype(JSCanvas, "AEView extends JSCanvas");
AEView.prototype.constructor = AEView;
AEView.prototype.$class = 
   new Class("AEView", AEView);

AEView.prototype.stateChanged = function(e) {
   this.repaint();
};

AEView.prototype.getPreferredSize = function() {
   return new Dimension(AEC.VIEW_WIDTH, AEC.VIEW_HEIGHT);
};

AEView.prototype.paintComponent = function(g) {
   this.setGraphicsValues();
   g.setColor(this.getBackground());
   g.fillRect(0, 0, this.getWidth(), this.getHeight());
   g.setColor(this.getForeground());
   var x = AEC.LEFT_MARGIN;
   var y = AEC.TOP_MARGIN;
   this.paintOpBox(g, x, y);
   this.paintRunupBox(g, x, y + this.columnHeight / 2);
   x += Math.max(AEC.OP_BOX_SIZE, AEC.RUNUP_BOX_SIZE) + AEC.MILL_COLUMN_SEP;
   this.paintColumn(g, x, y, "I1'", this.engine.getPrimedIngress1());
   x += this.columnWidth + AEC.MILL_COLUMN_SEP;
   this.paintColumn(g, x, y, "I1", this.engine.getIngress1());
   x += this.columnWidth + AEC.MILL_COLUMN_SEP;
   this.paintColumn(g, x, y, "I2", this.engine.getIngress2());
   x += this.columnWidth + AEC.MILL_COLUMN_SEP;
   this.paintColumn(g, x, y, "E'", this.engine.getPrimedEgress());
   x += this.columnWidth + AEC.MILL_COLUMN_SEP;
   this.paintColumn(g, x, y, "E", this.engine.getEgress());
   x += this.columnWidth + AEC.MILL_STORE_SEP;
   for (var address = 0; address < this.engine.getNColumns(); address++) {
      var label = "v" + address;
      var value = this.engine.getStore(address);
      this.paintColumn(g, x, y, label, value);
      x += this.columnWidth - 1;
   }
};

AEView.prototype.paintOpBox = function(g, x0, y0) {
   g.setColor(Color.WHITE);
   g.fillRect(x0, y0, AEC.OP_BOX_SIZE, AEC.OP_BOX_SIZE);
   g.setColor(Color.BLACK);
   g.drawRect(x0, y0, AEC.OP_BOX_SIZE, AEC.OP_BOX_SIZE);
   g.setFont(this.labelFont);
   var label = "op";
   var x = x0 +
   (AEC.OP_BOX_SIZE - g.getFontMetrics().stringWidth(label)) / 2;
   var y = y0 + AEC.OP_BOX_SIZE + g.getFontMetrics().getHeight();
   g.drawString(label, x, y);
   var op = this.engine.getOp();
   if (op === null) return;
   x = x0 + AEC.OP_BOX_SIZE / 2;
   y = y0 + AEC.OP_BOX_SIZE / 2;
   var size = toInt(Math.round(0.55 * AEC.OP_BOX_SIZE));
   if (jslib.equals(op, "+")) {
      this.paintPlus(g, x, y, size);
   } else if (jslib.equals(op, "-")) {
      this.paintMinus(g, x, y, size);
   } else if (jslib.equals(op, "*")) {
      this.paintTimes(g, x, y, size);
   } else if (jslib.equals(op, "/")) {
      this.paintDivide(g, x, y, size);
   }
};

AEView.prototype.paintPlus = function(g2d, x, y, size) {
   g2d.setStroke(new BasicStroke(3));
   g2d.drawLine(x - size / 2, y, x + size / 2, y);
   g2d.drawLine(x, y - size / 2, x, y + size / 2);
   g2d.setStroke(new BasicStroke(1));
};

AEView.prototype.paintMinus = function(g2d, x, y, size) {
   g2d.setStroke(new BasicStroke(3));
   g2d.drawLine(x - size / 2, y, x + size / 2, y);
   g2d.setStroke(new BasicStroke(1));
};

AEView.prototype.paintTimes = function(g2d, x, y, size) {
   g2d.setStroke(new BasicStroke(3));
   g2d.drawLine(x - size / 2, y - size / 2, x + size / 2, y + size / 2);
   g2d.drawLine(x - size / 2, y + size / 2, x + size / 2, y - size / 2);
   g2d.setStroke(new BasicStroke(1));
};

AEView.prototype.paintDivide = function(g2d, x, y, size) {
   g2d.setStroke(new BasicStroke(3));
   g2d.drawLine(x - size / 2, y, x + size / 2, y);
   if (JSProgram.isJavaScript()) {
      g2d.fillOval(x - 2, y - 9, 5, 5);
      g2d.fillOval(x - 2, y + 4, 5, 5);
   } else {
      g2d.fillRect(x - 2, y - 8, 5, 5);
      g2d.fillRect(x - 2, y + 4, 5, 5);
   }
   g2d.setStroke(new BasicStroke(1));
};

AEView.prototype.paintRunupBox = function(g, x0, y0) {
   g.setColor(Color.WHITE);
   g.fillRect(x0, y0, AEC.RUNUP_BOX_SIZE, AEC.RUNUP_BOX_SIZE);
   g.setColor(Color.BLACK);
   g.drawRect(x0, y0, AEC.RUNUP_BOX_SIZE, AEC.RUNUP_BOX_SIZE);
   g.setFont(this.labelFont);
   var label = "runup";
   var x = x0 +
   (AEC.RUNUP_BOX_SIZE - g.getFontMetrics().stringWidth(label)) / 2;
   var y = y0 + AEC.RUNUP_BOX_SIZE + g.getFontMetrics().getHeight();
   g.drawString(label, x, y);
   if (!this.engine.getRunup()) return;
   var size = toInt(Math.round(0.55 * AEC.RUNUP_BOX_SIZE));
   x = x0 + AEC.RUNUP_BOX_SIZE / 2;
   y = y0 + AEC.RUNUP_BOX_SIZE / 2 - size / 6;
   var g2d = g;
   g2d.setStroke(new BasicStroke(3));
   g2d.drawLine(x - size / 2, y + size / 4, x - size / 4, y + size / 2);
   g2d.drawLine(x - size / 4, y + size / 2, x + size / 2, y - size / 4);
   g2d.setStroke(new BasicStroke(1));
};

AEView.prototype.paintColumn = function(g, x0, y0, label, value) {
   g.setColor(AEC.SHADE_COLOR);
   g.fillRect(x0, y0, this.columnWidth, this.columnHeight);
   var x = x0 + (this.columnWidth - this.digitWidth) / 2;
   var y = y0;
   g.setColor(Color.WHITE);
   g.fillRect(x, y0, this.digitWidth, this.columnHeight - this.labelHeight);
   g.setColor(AEC.COLUMN_BGCOLOR);
   g.fillRect(x0, y0 + this.columnHeight - this.labelHeight, this.columnWidth, this.labelHeight + 2);
   g.setColor(Color.BLACK);
   this.repaintLabel(g, x0, y0, label);
   var str = "" + value;
   var sign = "+";
   if (jslib.startsWith(str, "-")) {
      sign = "-";
      str = str.substring(1);
   }
   var len = str.length;
   g.setFont(this.digitFont);
   y = y0 + this.signHeight;
   x = x0 + (this.columnWidth - g.getFontMetrics().stringWidth(sign)) / 2;
   g.drawString(sign, x, y - this.signOffset);
   x = x0 + (this.columnWidth - this.digitWidth) / 2;
   g.drawLine(x, y, x + this.digitWidth, y);
   y += this.digitHeight;
   for (var i = this.nDigits - 1; i >= 0; i--) {
      var digit = (i >= len) ? "0" : str.substring(len - i - 1, len - i);
      x = x0 + (this.columnWidth - g.getFontMetrics().stringWidth(digit)) / 2;
      g.drawString(digit, x, y - this.digitOffset);
      x = x0 + (this.columnWidth - this.digitWidth) / 2;
      g.drawLine(x, y, x + this.digitWidth, y);
      y += this.digitHeight;
   }
   g.drawRect(x0, y0, this.columnWidth - 1, this.nDigits * this.digitHeight + this.signHeight);
};

AEView.prototype.repaintLabel = function(g, x0, y0, label) {
   var labelWidth = 0;
   for (var pass = 1; pass <= 2; pass++) {
      var digitFlag = false;
      var x = x0 + (this.columnWidth - labelWidth) / 2;
      var y = y0;
      for (var i = 0; i < label.length; i++) {
         var ch = label.charCodeAt(i);
         if (Character.isDigit(ch)) {
            g.setFont(this.subFont);
            y = y0 + this.columnHeight;
            digitFlag = true;
         } else if (ch === toInt('\'')) {
            g.setFont(this.labelFont);
            ch = toInt('\u2032');
            y = y0 + this.columnHeight - 2;
            if (digitFlag) {
               if (pass === 1) {
                  labelWidth -= 3;
               } else {
                  x -= 3;
               }
            }
         } else {
            g.setFont(this.labelFont);
            y = y0 + this.columnHeight - ((ch === toInt('v')) ? 2 : 1);
         }
         var fm = g.getFontMetrics();
         if (pass === 1) {
            labelWidth += fm.stringWidth("" + toStr(ch));
         } else {
            g.drawString("" + toStr(ch), x, y);
            x += fm.stringWidth("" + toStr(ch));
         }
      }
   }
};

AEView.prototype.setGraphicsValues = function() {
   this.nDigits = this.engine.getNDigits();
   var style = Font.PLAIN;
   if (this.nDigits <= 10) {
      this.fontSize = 24;
      this.digitWidth = 18;
      this.digitHeight = 26;
      this.digitOffset = 4;
      this.signHeight = 20;
      this.signOffset = 2;
   } else if (this.nDigits <= 15) {
      this.fontSize = 18;
      this.digitWidth = 14;
      this.digitHeight = 18;
      this.digitOffset = 2;
      this.signHeight = 14;
      this.signOffset = 1;
   } else if (this.nDigits <= 20) {
      this.fontSize = 12;
      style = Font.BOLD;
      this.digitWidth = 10;
      this.digitHeight = 12;
      this.digitOffset = 1;
      this.signHeight = 8;
      this.signOffset = 0;
   } else {
      this.fontSize = 9;
      this.digitWidth = 8;
      this.digitHeight = 10;
      this.digitOffset = 1;
      this.signHeight = 8;
      this.signOffset = 1;
   }
   this.labelHeight = Math.min(12, this.fontSize) + 1;
   this.columnWidth = this.digitWidth + 2 * AEC.SHADE_MARGIN + 2;
   this.columnHeight = this.nDigits * this.digitHeight + this.labelHeight + this.signHeight + 1;
   this.digitFont = new Font("SansSerif", style, this.fontSize);
   this.labelFont = new Font("Serif", Font.PLAIN, this.labelHeight);
   this.subFont = new Font("Serif", Font.PLAIN, 9);
};


/* AnalyticalEngine.js */

var AnalyticalEngine = function() {
   JSProgram.call(this);
   this.createProgramFrame();
   JSFile.setCGIServer("http://web.stanford.edu/class/cs54n/cgi-bin");
   this.setTitle("Analytical Engine");
   this.setLayout(new AELayout());
   this.model = new AEModel();
   this.view = new AEView(this.model);
   this.printer = this.model.getPrinter();
   this.editor = this.model.getEditor();
   this.loadDialog = new JSLoadDialog(this.view);
   this.loadDialog.addActionListener(new AELoadDialogListener(this, this.loadDialog));
   this.saveDialog = new JSSaveDialog(this.view);
   this.saveDialog.addActionListener(new AESaveDialogListener(this, this.saveDialog));
   var printerFrame = this.createFrame(this.printer, "Printer");
   var editorFrame = this.createFrame(this.editor, "Untitled");
   this.editor.setFrame(editorFrame);
   this.add(this.view, "view");
   this.add(printerFrame, "printer");
   this.add(editorFrame, "editor");
   this.setBackground(AEC.APPLICATION_BACKGROUND);
   this.createControlStrip();
   this.pack();
   this.setVisible(true);
};

AnalyticalEngine.prototype = 
   jslib.inheritPrototype(JSProgram, "AnalyticalEngine extends JSProgram");
AnalyticalEngine.prototype.constructor = AnalyticalEngine;
AnalyticalEngine.prototype.$class = 
   new Class("AnalyticalEngine", AnalyticalEngine);

AnalyticalEngine.prototype.run = function() {
   var home = new JSFile("cgi:" + this.getUID() + "/AnalyticalEngine");
   this.loadDialog.setDirectory(home);
   this.saveDialog.setDirectory(home);
   this.editor.requestFocus();
   this.printer.repaint();
   this.view.repaint();
};

AnalyticalEngine.prototype.getEditor = function() {
   return this.editor;
};

AnalyticalEngine.prototype.actionPerformed = function(e) {
   var cmd = e.getActionCommand();
   if (jslib.equals(cmd, "Load")) {
      this.loadDialog.centerOnParent();
      this.loadDialog.setVisible(true);
   } else if (jslib.equals(cmd, "Save")) {
      this.saveDialog.centerOnParent();
      this.saveDialog.setVisible(true);
   } else if (jslib.equals(cmd, "Reset")) {
      this.model.stopAction();
      this.model.clear();
      this.printer.clear();
   }
};

AnalyticalEngine.prototype.createControlStrip = function() {
   var loadControl = new LoadControl();
   loadControl.addActionListener(this);
   this.model.addControl(loadControl);
   this.addControl(loadControl);
   var saveControl = new SaveControl();
   saveControl.addActionListener(this);
   this.model.addControl(saveControl);
   this.addControl(saveControl);
   var resetControl = new ResetControl();
   resetControl.addActionListener(this);
   this.model.addControl(resetControl);
   this.addControl(resetControl);
   var runControl = new RunControl();
   this.model.addControl(runControl);
   this.addControl(runControl);
   var stepControl = new StepControl();
   this.model.addControl(stepControl);
   this.addControl(stepControl);
   var speedControl = new SpeedControl();
   this.model.addControl(speedControl);
   this.addControl(speedControl);
};

AnalyticalEngine.prototype.createFrame = function(component, title) {
   return new JSFrame(component, title);
};

AnalyticalEngine.main = function(args) {
   var pgm = new AnalyticalEngine();
   pgm.startAfterLogin(pgm.getFrame());
};

var AELoadDialogListener = function(pgm, dialog) {
   this.pgm = pgm;
   this.dialog = dialog;
};

AELoadDialogListener.prototype.actionPerformed = function(e) {
   if (e instanceof JSErrorEvent) {
      // Fill in
   } else {
      var path = e.getActionCommand();
      if (path === null || path.length === 0) {
         this.dialog.setVisible(false);
      } else {
         new JSFile(path).read(new AELoadFileListener(this.pgm, path));
      }
   }
};

var AELoadFileListener = function(pgm, path) {
   this.pgm = pgm;
   this.path = path;
};

AELoadFileListener.prototype.actionPerformed = function(e) {
   var editor = this.pgm.getEditor();
   editor.removeAllBreakpoints();
   editor.setText(e.getActionCommand());
   editor.setCursorPosition(0);
   var frame = editor.getFrame();
   if (frame !== null) frame.setTitle(JSFile.getTail(this.path));
};

var AESaveDialogListener = function(pgm, dialog) {
   this.pgm = pgm;
   this.dialog = dialog;
};

AESaveDialogListener.prototype.actionPerformed = function(e) {
   if (e instanceof JSErrorEvent) {
      this.dialog.setVisible(false); // Fill in
   } else {
      var path = e.getActionCommand();
      if (path !== null && path.length > 0) {
         var editor = this.pgm.getEditor();
         var text = editor.getText();
         new JSFile(path).write(text, new AESaveFileListener(this.pgm, path));
      }
   }
};

var AESaveFileListener = function(pgm, path) {
   this.pgm = pgm;
   this.path = path;
};

AESaveFileListener.prototype.actionPerformed = function(e) {
   var editor = this.pgm.getEditor();
   var frame = editor.getFrame();
   if (frame !== null) frame.setTitle(JSFile.getTail(this.path));
};


/* Exports */

return {
   AEC : AEC,
   AEEditor : AEEditor,
   AELayout : AELayout,
   AEModel : AEModel,
   AEPrinter : AEPrinter,
   AEView : AEView,
   AnalyticalEngine : AnalyticalEngine
};

});
