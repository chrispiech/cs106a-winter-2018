/*
 * File: turing.js
 * Created on Sun Oct 18 14:05:29 PDT 2015 by java2js
 * --------------------------------------------------
 * This file was generated mechanically by the java2js utility.
 * Permanent edits must be made in the Java file.
 */

define([ "jslib",
         "edu/stanford/cs/controller",
         "edu/stanford/cs/java2js",
         "edu/stanford/cs/jscontrols/JSControl",
         "edu/stanford/cs/jscontrols/LoadControl",
         "edu/stanford/cs/jscontrols/RunControl",
         "edu/stanford/cs/jscontrols/SaveControl",
         "edu/stanford/cs/jscontrols/SpeedControl",
         "edu/stanford/cs/jscontrols/StepControl",
         "edu/stanford/cs/tokenscanner",
         "java/awt",
         "java/lang",
         "java/util",
         "javax/swing" ],

function(jslib,
         edu_stanford_cs_controller,
         edu_stanford_cs_java2js,
         edu_stanford_cs_jscontrols_JSControl,
         edu_stanford_cs_jscontrols_LoadControl,
         edu_stanford_cs_jscontrols_RunControl,
         edu_stanford_cs_jscontrols_SaveControl,
         edu_stanford_cs_jscontrols_SpeedControl,
         edu_stanford_cs_jscontrols_StepControl,
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
var JSCanvas = edu_stanford_cs_java2js.JSCanvas;
var JSElementList = edu_stanford_cs_java2js.JSElementList;
var JSErrorEvent = edu_stanford_cs_java2js.JSErrorEvent;
var JSFile = edu_stanford_cs_java2js.JSFile;
var JSLoadDialog = edu_stanford_cs_java2js.JSLoadDialog;
var JSPanel = edu_stanford_cs_java2js.JSPanel;
var JSPlatform = edu_stanford_cs_java2js.JSPlatform;
var JSProgram = edu_stanford_cs_java2js.JSProgram;
var JSSaveDialog = edu_stanford_cs_java2js.JSSaveDialog;
var JSScrollPane = edu_stanford_cs_java2js.JSScrollPane;
var JSControl = edu_stanford_cs_jscontrols_JSControl.JSControl;
var LoadControl = edu_stanford_cs_jscontrols_LoadControl.LoadControl;
var RunControl = edu_stanford_cs_jscontrols_RunControl.RunControl;
var SaveControl = edu_stanford_cs_jscontrols_SaveControl.SaveControl;
var SpeedControl = edu_stanford_cs_jscontrols_SpeedControl.SpeedControl;
var StepControl = edu_stanford_cs_jscontrols_StepControl.StepControl;
var TokenScanner = edu_stanford_cs_tokenscanner.TokenScanner;
var Color = java_awt.Color;
var Component = java_awt.Component;
var Container = java_awt.Container;
var Dimension = java_awt.Dimension;
var FlowLayout = java_awt.FlowLayout;
var Font = java_awt.Font;
var FontMetrics = java_awt.FontMetrics;
var Graphics = java_awt.Graphics;
var Insets = java_awt.Insets;
var LayoutManager = java_awt.LayoutManager;
var Rectangle = java_awt.Rectangle;
var ActionEvent = java_awt.ActionEvent;
var ActionListener = java_awt.ActionListener;
var AdjustmentEvent = java_awt.AdjustmentEvent;
var AdjustmentListener = java_awt.AdjustmentListener;
var ComponentEvent = java_awt.ComponentEvent;
var ComponentListener = java_awt.ComponentListener;
var FocusEvent = java_awt.FocusEvent;
var FocusListener = java_awt.FocusListener;
var KeyEvent = java_awt.KeyEvent;
var KeyListener = java_awt.KeyListener;
var MouseEvent = java_awt.MouseEvent;
var MouseListener = java_awt.MouseListener;
var MouseMotionListener = java_awt.MouseMotionListener;
var Character = java_lang.Character;
var Class = java_lang.Class;
var Integer = java_lang.Integer;
var RuntimeException = java_lang.RuntimeException;
var HashMap = java_util.HashMap;
var BorderFactory = javax_swing.BorderFactory;
var JButton = javax_swing.JButton;
var JCheckBox = javax_swing.JCheckBox;
var JScrollPane = javax_swing.JScrollPane;
var Timer = javax_swing.Timer;
var ChangeEvent = javax_swing.ChangeEvent;
var ChangeListener = javax_swing.ChangeListener;

/* TMC.js */

var TMC = function() {
   /* Empty */
};

TMC.APPLICATION_BACKGROUND = new Color(0xCCFFFF);
TMC.CELL_COLOR = Color.WHITE;
TMC.END_BACKGROUND = Color.LIGHT_GRAY;
TMC.HEAD_COLOR = Color.MAGENTA;
TMC.LINE_COLOR = Color.BLACK;
TMC.PROGRAM_BORDER_COLOR = new Color(0x666666);
TMC.SELECTED_COLOR = Color.GREEN;
TMC.TEXT_COLOR = Color.BLACK;
TMC.LABEL_FONT = Font.decode("SansSerif-Bold-18");
TMC.TEXT_FONT = Font.decode("SansSerif-Bold-24");
TMC.ASCENT_FACTOR = 0.9;
TMC.APPLICATION_HEIGHT = 600;
TMC.APPLICATION_WIDTH = 800;
TMC.BOTTOM_MARGIN = 10;
TMC.CELL_EXTRA = 6;
TMC.CELL_WIDTH = 90;
TMC.INITIAL_SCROLL_DELAY = 500;
TMC.LABEL_DX = -3;
TMC.LABEL_EXTRA = 5;
TMC.MIN_VISIBLE = 4;
TMC.PREFERRED_VISIBLE = 10;
TMC.SCROLL_DELAY = 100;
TMC.SIDE_MARGIN = 15;
TMC.TAPE_HEIGHT = 40;
TMC.TAPE_PROGRAM_SEP = 15;
TMC.TAPE_WIDTH = 750;
TMC.TOP_MARGIN = 15;

/* TMClearProgramControl.js */

var TMClearProgramControl = function() {
   JSControl.call(this);
   this.setName("Clear Program");
   this.setIcon(this.createImageIcon(TMClearProgramControl.CONTROL));
   this.setDisabledIcon(this.createImageIcon(TMClearProgramControl.DISABLED));
   this.setRolloverIcon(this.createImageIcon(TMClearProgramControl.ROLLOVER));
   this.setPressedIcon(this.createImageIcon(TMClearProgramControl.PRESSED));
};

TMClearProgramControl.prototype = 
   jslib.inheritPrototype(JSControl, "TMClearProgramControl extends JSControl");
TMClearProgramControl.prototype.constructor = TMClearProgramControl;
TMClearProgramControl.prototype.$class = 
   new Class("TMClearProgramControl", TMClearProgramControl);

TMClearProgramControl.CONTROL =
"data:image/png;base64," +
"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" +
"/w9fU5EDiZNKHAAAAABJRU5ErkJggg==";
TMClearProgramControl.DISABLED =
"data:image/png;base64," +
"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";
TMClearProgramControl.PRESSED =
"data:image/png;base64," +
"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" +
"8jb/kitY6LnMyh9YDnD5d87l/wuPjoSuT6+xy1MZwKW4uFDo+dV5AiY3sLzc" +
"H69y5wEXHhb/sqUzdP0wjIBLsXGhv+UJmFzAsrsMy9C1SoZn1VJdL2p9dpmh" +
"WUFEy18Tb7d2+UNN/EZTd2QkUDb9jbfsye5Z9WPBROZYCcOWG/G+w45V2DKH" +
"QnARvY9YYfZB9D601CuZY1PO/rP5AMZ6WLZ3JavwecCF8s8hd1qjHgyBQqH/" +
"85b5t3JPZijOsQAuucSFQl+4tgNj9UVyG9s9r+eqG7iENRyZUM8HuLiFSx6A" +
"sbbXwoOlyLjQMts/U79B9/ZPJyIrOHApLi6Uje32nqK29iK57yYrz+E9y2aW" +
"iej1OLkqyKy5vPjtlPdPEo8WoWUOlnsstesOMkm83yaOf4J9OhgyNxVrGyl+" +
"ptrC+Ty6rnheQ8nO3ouV8yz0rBeCxUVcqtlW7pH8x4v93j/UN99pRPR/+hu9" +
"xlsHuLiHC/39+4t2Do+sm2d5qe8uLC7jEud9Fh0XnceqSLhQDg/ZB4xd8yxt" +
"ntd5GbgAF+AS5/PY1WPX/Is1sCxp8rxvJz1v4CqTK/7Qs51rwy4ven1Awzr9" +
"gsTZhmqZ/RoifJ9XghEtk8XnEWf9pJ+5zOehenyTfsYd5S/mVRbNv1gzz0IP" +
"i+J+CMAFuAAX6dAXtC3DIyvmWV7si/gwgAtwAS5KOWTJ/EvmvZaH2yrdOdtw" +
"mf8Qgsjlqza7cKHstGD+JfN5lm/K3bjeq3O5Ik4fk15DueceBJHL6x+YqYNJ" +
"6nrbTPbzL5kOh94eqYEFuCDARWtd/ybj+ZfMei07uhlYgAsCXLTX9T2DBceF" +
"Nxw6PQVcEOCSRl3PaniUCS6k6e03DlwQ4GK8rn86ns0NvlOHZUOb53VfroR+" +
"dFWb6t99ueIPu07X5eiw5XVdEW+X1gurSA0NbuUPf+AfB/q7a8fi97/nH4v9" +
"78vVPV498y3P1PXuy8lTLfup7vR7L6lP4p4ayzcurv2jRhWGrGv//vSn/OLy" +
"94uV6Yg0gUm11/J8X3RDBy7ABbiYwYXy2kBBcOFN4pYuARfgAlyywqUr5d8e" +
"pfb41TfOel7HjCCXxemc8UdYxow4gTKBC3BRwGXPe5J1VVQ349Tdy/6Iyvh4" +
"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" +
"AAAAAElFTkSuQmCC";
TMClearProgramControl.ROLLOVER =
"data:image/png;base64," +
"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" +
"gg==";

/* TMClearTapeControl.js */

var TMClearTapeControl = function() {
   JSControl.call(this);
   this.setName("Clear Tape");
   this.setIcon(this.createImageIcon(TMClearTapeControl.CONTROL));
   this.setDisabledIcon(this.createImageIcon(TMClearTapeControl.DISABLED));
   this.setRolloverIcon(this.createImageIcon(TMClearTapeControl.ROLLOVER));
   this.setPressedIcon(this.createImageIcon(TMClearTapeControl.PRESSED));
};

TMClearTapeControl.prototype = 
   jslib.inheritPrototype(JSControl, "TMClearTapeControl extends JSControl");
TMClearTapeControl.prototype.constructor = TMClearTapeControl;
TMClearTapeControl.prototype.$class = 
   new Class("TMClearTapeControl", TMClearTapeControl);

TMClearTapeControl.CONTROL =
"data:image/png;base64," +
"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" +
"BEGEEQQhjv8D3eI+zSMyEJ4AAAAASUVORK5CYII=";
TMClearTapeControl.DISABLED =
"data:image/png;base64," +
"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";
TMClearTapeControl.PRESSED =
"data:image/png;base64," +
"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" +
"8P8Emyu7y5DZwAAAAABJRU5ErkJggg==";
TMClearTapeControl.ROLLOVER =
"data:image/png;base64," +
"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";

/* TMLayout.js */

var TMLayout = function(model) {
   this.model = model;
};

TMLayout.prototype.addLayoutComponent = function(name, comp) {
   if (jslib.equals(name, "tape")) {
      this.tapeView = comp;
   } else if (jslib.equals(name, "program")) {
      this.programView = comp;
   } else if (jslib.equals(name, "controls")) {
      this.controls = comp;
   } else if (jslib.equals(name, "background")) {
      this.bg = comp;
   } else {
      throw new RuntimeException("Illegal component name: " + name);
   }
};

TMLayout.prototype.removeLayoutComponent = function(comp) {
   /* Empty */
};

TMLayout.prototype.preferredLayoutSize = function(target) {
   if (target.getTreeLock()) {
      var insets = target.getInsets();
      var tSize = this.tapeView.getPreferredSize();
      var cSize = this.controls.getPreferredSize();
      var width = 2 * TMC.SIDE_MARGIN + tSize.width +
      insets.left + insets.right;
      var height = TMC.TOP_MARGIN + tSize.height + TMC.TAPE_PROGRAM_SEP +
      this.programView.getColumnHeaderHeight() +
      TMC.PREFERRED_VISIBLE * this.programView.getCellHeight() +
      TMC.BOTTOM_MARGIN + cSize.height +
      insets.top + insets.bottom;
      return new Dimension(width, height);
   }
};

TMLayout.prototype.minimumLayoutSize = function(target) {
   if (target.getTreeLock()) {
      var insets = target.getInsets();
      var tSize = this.tapeView.getMinimumSize();
      var pSize = this.programView.getMinimumSize();
      var cSize = this.controls.getMinimumSize();
      var width = 2 * TMC.SIDE_MARGIN + tSize.width +
      insets.left + insets.right;
      var height = TMC.TOP_MARGIN + tSize.height + TMC.TAPE_PROGRAM_SEP +
      pSize.height + TMC.BOTTOM_MARGIN + cSize.height +
      insets.top + insets.bottom;
      return new Dimension(width, height);
   }
};

TMLayout.prototype.layoutContainer = function(target) {
   if (target.getTreeLock()) {
      var insets = target.getInsets();
      var cSize = this.controls.getPreferredSize();
      var pSize = this.programView.getPreferredSize();
      var bounds = target.getBounds();
      var x = bounds.x + insets.left;
      var y = bounds.y + insets.top;
      var width = bounds.width - insets.left - insets.right;
      var height = bounds.height - insets.top - insets.bottom;
      if (this.bg !== null) this.bg.setBounds(x, y, width, height);
      var tx = x + TMC.SIDE_MARGIN;
      var ty = y + TMC.TOP_MARGIN;
      var tw = width - 2 * TMC.SIDE_MARGIN;
      var th = TMC.TAPE_HEIGHT;
      this.tapeView.setBounds(tx, ty, tw, th);
      var ns = this.model.getAlphabet().length;
      var px = x + (width - ns * TMC.CELL_WIDTH) / 2 -
      this.programView.getRowHeaderWidth();
      var py = y + TMC.TOP_MARGIN + TMC.TAPE_HEIGHT + TMC.TAPE_PROGRAM_SEP;
      var pw = pSize.width;
      var ph = y + height - py - TMC.BOTTOM_MARGIN - cSize.height - 1;
      this.programView.setBounds(px, py, pw, ph);
      var cy = y + height - cSize.height;
      this.controls.setBounds(0, cy, width, cSize.height);
   }
};


/* TMModel.js */

var TMModel = function() {
   Controller.call(this);
   this.pgm = new HashMap();
   this.tape = new HashMap();
   this.setTarget(this);
   this.clearProgram();
   this.setAlphabet("01");
};

TMModel.prototype = 
   jslib.inheritPrototype(Controller, "TMModel extends Controller");
TMModel.prototype.constructor = TMModel;
TMModel.prototype.$class = 
   new Class("TMModel", TMModel);

TMModel.prototype.clear = function() {
   this.clearProgram();
   this.clearTape();
};

TMModel.prototype.clearProgram = function() {
   this.pgm.clear();
   this.currentState = 0;
   this.stateMax = 0;
};

TMModel.prototype.clearTape = function() {
   this.tape.clear();
   this.headPosition = 0;
   this.tapeMin = 0;
   this.tapeMax = -1;
};

TMModel.prototype.setAlphabet = function(str) {
   this.alphabet = str;
   this.blank = this.alphabet.substring(0, 1);
   this.clearTape();
};

TMModel.prototype.getAlphabet = function() {
   return this.alphabet;
};

TMModel.prototype.setState = function(state) {
   this.currentState = state;
};

TMModel.prototype.getState = function() {
   return this.currentState;
};

TMModel.prototype.getStateMax = function() {
   return this.stateMax;
};

TMModel.prototype.moveLeft = function() {
   this.headPosition--;
};

TMModel.prototype.moveRight = function() {
   this.headPosition++;
};

TMModel.prototype.setHead = function(head) {
   this.headPosition = head;
};

TMModel.prototype.getHead = function() {
   return this.headPosition;
};

TMModel.prototype.setTape = function(str) {
   this.clearTape();
   for (var i = 0; i < str.length; i++) {
      var symbol = str.substring(i, i + 1);
      if (jslib.equals(symbol, "^")) {
         this.headPosition = i;
      } else if (this.alphabet.indexOf(symbol) === -1) {
         throw new RuntimeException("Illegal character " + symbol +
         " in tape");
      } else {
         this.setTapeSquare(i, symbol);
      }
   }
};

TMModel.prototype.getTape = function() {
   var str = "";
   for (var i = this.tapeMin; i <= this.tapeMax; i++) {
      str += this.getTapeSquare(i);
   }
   return str;
};

TMModel.prototype.getTapeMin = function() {
   return this.tapeMin;
};

TMModel.prototype.getTapeMax = function() {
   return this.tapeMax;
};

TMModel.prototype.getTapeSquare = function(index) {
   this.tapeMin = Math.min(this.tapeMin, index);
   this.tapeMax = Math.max(this.tapeMax, index);
   return (this.tape.containsKey(index)) ? this.tape.get(index) : this.blank;
};

TMModel.prototype.setTapeSquare = function(index, symbol) {
   this.tapeMin = Math.min(this.tapeMin, index);
   this.tapeMax = Math.max(this.tapeMax, index);
   this.tape.put(index, symbol);
};

TMModel.prototype.getSymbol = function() {
   return this.getTapeSquare(this.headPosition);
};

TMModel.prototype.setSymbol = function(symbol) {
   this.setTapeSquare(this.headPosition, symbol);
};

TMModel.prototype.getInstruction = function(state, symbol) {
   var key = state + "/" + symbol;
   return (this.pgm.containsKey(key)) ? this.pgm.get(key) : null;
};

TMModel.prototype.setInstruction = function(state, symbol, str) {
   this.pgm.put(state + "/" + symbol, str);
   if (state > this.stateMax) {
      this.stateMax = state;
      this.update();
   }
};

TMModel.prototype.step = function() {
   if (this.currentState <= 0) {
      this.currentState = 1;
   } else {
      var instruction = this.getInstruction(this.currentState, this.getSymbol());
      if (instruction === null) {
         throw new RuntimeException("Missing instruction");
      }
      this.setSymbol(instruction.substring(0, 1));
      switch (instruction.charCodeAt(1)) {
         case toInt('L'): case toInt('l'): this.moveLeft(); break;
         case toInt('R'): case toInt('r'): this.moveRight(); break;
         case toInt('N'): case toInt('n'): break;
         default: throw new RuntimeException("Illegal direction");
      }
      this.setState(Integer.parseInt(instruction.substring(2)));
      if (this.currentState === 0) {
         this.setControllerState(Controller.FINISHED);
      }
   }
   this.update();
};

TMModel.prototype.isCallable = function() {
   return false;
};

TMModel.prototype.getStackDepth = function() {
   return 0;
};

TMModel.prototype.getNStates = function() {
   return this.stateMax;
};

TMModel.prototype.getProgramText = function() {
   this.pgm = "@    ";
   for (var i = 0; i < this.alphabet.length; i++) {
      var symbol = this.alphabet.substring(i, i + 1);
      if (i > 0) this.pgm += "|";
      this.pgm += "   " + symbol + "   ";
   }
   this.pgm = this.pgm.trim() + "\n";
   this.pgm += "    ";
   for (var i = 0; i < this.alphabet.length; i++) {
      if (i > 0) this.pgm += "+";
      this.pgm += "-------";
   }
   this.pgm = this.pgm.trim() + "\n";
   for (var state = 1; state <= this.stateMax; state++) {
      var str = "    " + state;
      str = str.substring(str.length - 3);
      this.pgm += str + " ";
      for (var i = 0; i < this.alphabet.length; i++) {
         var symbol = this.alphabet.substring(i, i + 1);
         if (i > 0) this.pgm += "|";
         str = this.getInstruction(state, symbol);
         if (str === null) str = "";
         str = ("  " + str + "       ").substring(0, 7);
         this.pgm += str;
      }
      this.pgm = this.pgm.trim() + "\n";
   }
   return this.pgm.substring(1);
};

TMModel.prototype.parseProgram = function(text, base) {
   var scanner = new TokenScanner();
   scanner.ignoreWhitespace();
   var state = TMModel.FSM_INITIAL;
   var el0 = new JSElementList(JSPlatform.splitLines(text));
   for (var ei0 = 0; ei0 < el0.size(); ei0++) {
      var line = el0.get(ei0);
      scanner.setInput(line);
      if (state === TMModel.FSM_INITIAL) {
         if (this.parseAlphabetLine(scanner)) {
            state = TMModel.FSM_SEP;
            continue;
         } else {
            state = TMModel.FSM_PGM;
            scanner.setInput(line);
         }
      }
      if (state === TMModel.FSM_SEP) {
         state = TMModel.FSM_PGM;
         if (jslib.startsWith(line.trim(), "-")) continue;
      }
      if (state === TMModel.FSM_PGM) {
         if (jslib.startsWith(line.trim(), "(")) {
            state = TMModel.FSM_QUINT;
         } else {
            state = TMModel.FSM_INS;
         }
      }
      if (state === TMModel.FSM_QUINT) {
         this.parseQuintuple(scanner, base);
      } else {
         this.parseInstructionLine(scanner, base);
      }
   }
   for (var i = 1; i <= base; i++) {
      for (var j = 0; j < this.alphabet.length; j++) {
         var symbol = this.alphabet.substring(j, j + 1);
         var ins = this.getInstruction(i, symbol);
         if (ins !== null && ins.length > 2 && jslib.equals(ins.substring(2), "0")) {
            this.setInstruction(i, symbol, ins.substring(0, 2) + (base + 1));
         }
      }
   }
};

TMModel.prototype.parseAlphabetLine = function(scanner) {
   var newAlphabet = "";
   while (true) {
      var token = scanner.nextToken();
      if (token.length === 0) break;
      if (token.length > 1) return false;
      if (!jslib.equals(token, "|")) {
         newAlphabet += token;
      }
   }
   if (!jslib.equals(this.alphabet, newAlphabet)) this.setAlphabet(newAlphabet);
   return true;
};

TMModel.prototype.parseInstructionLine = function(scanner, base) {
   var token = scanner.nextToken();
   if (!this.isInt(token)) {
      throw new RuntimeException("Missing state number");
   }
   var oldState = Integer.parseInt(token) + base;
   var alphaIndex = 0;
   var advanceOnSep = true;
   while (true) {
      token = scanner.nextToken();
      if (token.length === 0) break;
      if (jslib.equals(token, "|")) {
         if (advanceOnSep) alphaIndex++;
         advanceOnSep = true;
      } else if (this.isOp(token)) {
         var oldChar = this.alphabet.substring(alphaIndex, alphaIndex + 1);
         this.parseOp(token, oldState, oldChar, base);
         advanceOnSep = false;
         alphaIndex++;
      } else {
         throw new RuntimeException("Illegal token " + token);
      }
   }
};

TMModel.prototype.parseQuintuple = function(scanner, base) {
   var token = scanner.nextToken();
   if (token.length === 0) return;
   this.verify(token, "(");
   token = scanner.nextToken();
   var oldState = Integer.parseInt(token) + base;
   scanner.verifyToken(",");
   token = scanner.nextToken();
   if (jslib.equals(token, "'")) token = scanner.nextToken();
   if (token.length !== 1 || this.alphabet.indexOf(token) === -1) {
      throw new RuntimeException("Illegal character " + token);
   }
   var oldChar = token.substring(0, 1);
   token = scanner.nextToken();
   if (jslib.equals(token, "'")) token = scanner.nextToken();
   this.verify(token, ",");
   token = scanner.nextToken();
   if (jslib.equals(token, "'")) token = scanner.nextToken();
   if (token.length !== 1 || this.alphabet.indexOf(token) === -1) {
      throw new RuntimeException("Illegal character " + token);
   }
   var newChar = token.substring(0, 1);
   token = scanner.nextToken();
   if (jslib.equals(token, "'")) token = scanner.nextToken();
   this.verify(token, ",");
   token = scanner.nextToken().toUpperCase();
   if (token.length !== 1 || "LRN".indexOf(token) === -1) {
      throw new RuntimeException("Illegal direction " + token);
   }
   var dir = token.substring(0, 1);
   this.verify(token, ",");
   token = scanner.nextToken();
   var newState = Integer.parseInt(token);
   if (newState > 0) newState += base;
   scanner.verifyToken(")");
   this.setInstruction(oldState, oldChar, newChar + dir + newState);
};

TMModel.prototype.verify = function(token, expected) {
   if (token === null || !jslib.equals(token, expected)) {
      throw new RuntimeException("Found " + token +
      " when expecting " + expected);
   }
};

TMModel.prototype.isInt = function(token) {
   for (var i = 0; i < token.length; i++) {
      if (!Character.isDigit(token.charCodeAt(i))) return false;
   }
   return true;
};

TMModel.prototype.isOp = function(token) {
   if (token.length < 3) return false;
   if (this.alphabet.indexOf(token.substring(0, 1)) === -1) return false;
   if ("LRNlrn".indexOf(token.substring(1, 2)) === -1) return false;
   return this.isInt(token.substring(2));
};

TMModel.prototype.parseOp = function(token, oldState, oldChar, base) {
   if (!this.isOp(token)) {
      throw new RuntimeException("Illegal operation " + token);
   }
   var newChar = token.substring(0, 1);
   var dir = token.substring(1, 2).toUpperCase();
   var newState = Integer.parseInt(token.substring(2));
   if (newState > 0) newState += base;
   this.setInstruction(oldState, oldChar, newChar + dir + newState);
};

TMModel.FSM_INITIAL = 0;
TMModel.FSM_SEP = 1;
TMModel.FSM_PGM = 2;
TMModel.FSM_INS = 3;
TMModel.FSM_QUINT = 4;

/* TMProgramView.js */

var TMProgramView = function(tm) {
   JSPanel.call(this);
   this.tm = tm;
   this.setLayout(new TMProgramLayout(this));
   this.setBackground(TMC.APPLICATION_BACKGROUND);
   this.setCellColor(TMC.CELL_COLOR);
   this.setLineColor(TMC.LINE_COLOR);
   this.setHeadColor(TMC.HEAD_COLOR);
   this.setTextColor(TMC.TEXT_COLOR);
   this.setSelectedColor(TMC.SELECTED_COLOR);
   this.setLabelFont(TMC.LABEL_FONT);
   this.setFont(TMC.TEXT_FONT);
   this.programCanvas = new TMProgramCanvas(this);
   this.columnHeader = new TMColumnHeader(this);
   this.rowHeader = new TMRowHeader(this);
   this.scrollPane = new TMProgramScrollPane(this.programCanvas);
   this.add(this.scrollPane, "Program");
   this.add(this.columnHeader, "ColumnHeader");
   this.add(this.rowHeader, "RowHeader");
   this.scrollPane.getVerticalScrollBar().addAdjustmentListener(this.rowHeader);
   this.addComponentListener(this);
};

TMProgramView.prototype = 
   jslib.inheritPrototype(JSPanel, "TMProgramView extends JSPanel");
TMProgramView.prototype.constructor = TMProgramView;
TMProgramView.prototype.$class = 
   new Class("TMProgramView", TMProgramView);

TMProgramView.prototype.getTuringMachine = function() {
   return this.tm;
};

TMProgramView.prototype.getProgramCanvas = function() {
   return this.programCanvas;
};

TMProgramView.prototype.getScrollTop = function() {
   return this.scrollPane.getViewPosition().y;
};

TMProgramView.prototype.clearSelection = function() {
   this.programCanvas.setSelectedState(TMProgramCanvas.NONE_SELECTED, "");
};

TMProgramView.prototype.getTopState = function() {
   return this.programCanvas.getTopState();
};

TMProgramView.prototype.setTopState = function(state) {
   this.programCanvas.setTopState(state);
};

TMProgramView.prototype.setSelectedColor = function(color) {
   this.selectedColor = color;
};

TMProgramView.prototype.getSelectedColor = function() {
   return this.selectedColor;
};

TMProgramView.prototype.setTextColor = function(color) {
   this.textColor = color;
};

TMProgramView.prototype.getTextColor = function() {
   return this.textColor;
};

TMProgramView.prototype.setHeadColor = function(color) {
   this.headColor = color;
};

TMProgramView.prototype.getHeadColor = function() {
   return this.headColor;
};

TMProgramView.prototype.setCellColor = function(color) {
   this.cellColor = color;
};

TMProgramView.prototype.getCellColor = function() {
   return this.cellColor;
};

TMProgramView.prototype.setLineColor = function(color) {
   this.lineColor = color;
};

TMProgramView.prototype.getLineColor = function() {
   return this.lineColor;
};

TMProgramView.prototype.setLabelFont = function(font) {
   this.labelFont = font;
};

TMProgramView.prototype.getLabelFont = function() {
   return this.labelFont;
};

TMProgramView.prototype.getCellWidth = function() {
   return TMC.CELL_WIDTH;
};

TMProgramView.prototype.getCellHeight = function() {
   var fm = this.getFontMetrics(this.getFont());
   return fm.getHeight() + TMC.CELL_EXTRA;
};

TMProgramView.prototype.getRowHeaderWidth = function() {
   var fm = this.getFontMetrics(this.getFont());
   return fm.stringWidth("999") + 4;
};

TMProgramView.prototype.getColumnHeaderHeight = function() {
   var fm = this.getFontMetrics(this.getFont());
   return fm.getHeight();
};

TMProgramView.prototype.getContentWidth = function() {
   return this.tm.getAlphabet().length * this.getCellWidth();
};

TMProgramView.prototype.getContentHeight = function() {
   var ns = Math.max(this.getNVisibleStates() + 1, this.tm.getNStates());
   return ns * this.getCellHeight();
};

TMProgramView.prototype.getNVisibleStates = function() {
   return toInt(((this.getSize().height - this.getColumnHeaderHeight()) / this.getCellHeight()));
};

TMProgramView.prototype.getPreferredSize = function() {
   var pSize = this.programCanvas.getPreferredSize();
   var width = this.getRowHeaderWidth() + pSize.width;
   var height = this.getColumnHeaderHeight() + pSize.height;
   return new Dimension(width, height);
};

TMProgramView.prototype.ensureVisible = function(state) {
   var cellWidth = this.getCellWidth();
   var cellHeight = this.getCellHeight();
   var r = new Rectangle(0, (state - 1) * cellHeight, cellWidth, cellHeight);
   this.scrollPane.scrollRectToVisible(r);
};

TMProgramView.prototype.componentResized = function(e) {
   var rowHeaderWidth = this.rowHeader.getMinimumSize().width;
   var programWidth = this.programCanvas.getMinimumSize().width;
   var nv = (e === null) ? TMC.PREFERRED_VISIBLE : this.getNVisibleStates();
   var ns = Math.max(nv + 1, this.tm.getNStates());
   var height = ns * this.getCellHeight();
   this.rowHeader.setPreferredSize(new Dimension(rowHeaderWidth, height));
   this.programCanvas.setPreferredSize(new Dimension(programWidth, height));
   this.programCanvas.revalidate();
};

TMProgramView.prototype.componentHidden = function(e) {
   /* Empty */
};

TMProgramView.prototype.componentMoved = function(e) {
   /* Empty */
};

TMProgramView.prototype.componentShown = function(e) {
   /* Empty */
};

TMProgramView.prototype.stateChanged = function(e) {
   if (this.oldStateCount !== this.tm.getNStates()) {
      this.oldStateCount = this.tm.getNStates();
      var e2 =
      new ComponentEvent(this, ComponentEvent.COMPONENT_RESIZED);
      this.componentResized(e2);
   } else {
      this.repaint();
   }
};

var TMProgramScrollPane = function(programCanvas) {
   JSScrollPane.call(this, programCanvas, JScrollPane.VERTICAL_SCROLLBAR_ALWAYS, JScrollPane.HORIZONTAL_SCROLLBAR_NEVER);
   this.setBorder(BorderFactory.createLineBorder(TMC.PROGRAM_BORDER_COLOR));
};

TMProgramScrollPane.prototype = 
   jslib.inheritPrototype(JSScrollPane, "TMProgramScrollPane extends JSScrollPane");
TMProgramScrollPane.prototype.constructor = TMProgramScrollPane;
TMProgramScrollPane.prototype.$class = 
   new Class("TMProgramScrollPane", TMProgramScrollPane);

var TMProgramLayout = function(programView) {
   this.programView = programView;
   this.tm = programView.getTuringMachine();
};

TMProgramLayout.prototype.addLayoutComponent = function(name, comp) {
   if (comp.getTreeLock()) {
      if (jslib.equals("ColumnHeader", name)) {
         this.columnHeader = comp;
      } else if (jslib.equals("RowHeader", name)) {
         this.rowHeader = comp;
      } else if (jslib.equals("Program", name)) {
         this.scrollPane = comp;
      } else {
         throw new IllegalArgumentException("addLayoutComponent: " +
         "unknown constraint: " + name);
      }
   }
};

TMProgramLayout.prototype.removeLayoutComponent = function(comp) {
   /* Not implemented */
};

TMProgramLayout.prototype.minimumLayoutSize = function(parent) {
   if (parent.getTreeLock()) {
      var alphabet = this.tm.getAlphabet();
      var cellWidth = this.programView.getCellWidth();
      var cellHeight = this.programView.getCellHeight();
      var rowHeaderWidth = this.programView.getRowHeaderWidth();
      var columnHeaderHeight = this.programView.getColumnHeaderHeight();
      var width = rowHeaderWidth + alphabet.length * cellWidth +
      JSPlatform.getScrollBarWidth() + 1;
      var height = columnHeaderHeight + TMC.MIN_VISIBLE * cellHeight + 1;
      return new Dimension(width, height);
   }
};

TMProgramLayout.prototype.preferredLayoutSize = function(parent) {
   if (parent.getTreeLock()) {
      var alphabet = this.tm.getAlphabet();
      var cellWidth = this.programView.getCellWidth();
      var cellHeight = this.programView.getCellHeight();
      var rowHeaderWidth = this.programView.getRowHeaderWidth();
      var columnHeaderHeight = this.programView.getColumnHeaderHeight();
      var nVisible = this.programView.getNVisibleStates();
      var width = rowHeaderWidth + alphabet.length * cellWidth +
      JSPlatform.getScrollBarWidth() + 1;
      var height = columnHeaderHeight + nVisible * cellHeight + 1;
      return new Dimension(width, height);
   }
};

TMProgramLayout.prototype.layoutContainer = function(parent) {
   if (parent.getTreeLock()) {
      var alphabet = this.tm.getAlphabet();
      var cellWidth = this.programView.getCellWidth();
      var cellHeight = this.programView.getCellHeight();
      var rowHeaderWidth = this.programView.getRowHeaderWidth();
      var columnHeaderHeight = this.programView.getColumnHeaderHeight();
      var nVisible = this.programView.getNVisibleStates();
      var na = alphabet.length;
      var width =  na * cellWidth + JSPlatform.getScrollBarWidth();
      var height = nVisible * cellHeight;
      this.columnHeader.setBounds(rowHeaderWidth, 0, width, columnHeaderHeight);
      this.rowHeader.setBounds(0, columnHeaderHeight, rowHeaderWidth, height);
      this.scrollPane.setBounds(rowHeaderWidth, columnHeaderHeight, width, height);
   }
};

var TMProgramCanvas = function(program) {
   JSCanvas.call(this);
   this.programView = program;
   this.tm = this.programView.getTuringMachine();
   this.selectedState = TMProgramCanvas.NONE_SELECTED;
   this.setTopState(1);
   this.setFocusTraversalKeysEnabled(false);
   this.addFocusListener(this);
   this.addMouseListener(this);
   this.addKeyListener(this);
};

TMProgramCanvas.prototype = 
   jslib.inheritPrototype(JSCanvas, "TMProgramCanvas extends JSCanvas");
TMProgramCanvas.prototype.constructor = TMProgramCanvas;
TMProgramCanvas.prototype.$class = 
   new Class("TMProgramCanvas", TMProgramCanvas);

TMProgramCanvas.prototype.getTopState = function() {
   return this.topState;
};

TMProgramCanvas.prototype.setTopState = function(state) {
   this.topState = Math.max(1, state);
};

TMProgramCanvas.prototype.getSelectedState = function() {
   return this.selectedState;
};

TMProgramCanvas.prototype.getSelectedSymbol = function() {
   return this.selectedSymbol;
};

TMProgramCanvas.prototype.setSelectedState = function(state, symbol) {
   this.selectedState = state;
   this.selectedSymbol = symbol;
   if (state > 0) this.programView.ensureVisible(state);
};

TMProgramCanvas.prototype.paintComponent = function(g) {
   var ns = Math.max(this.programView.getNVisibleStates() + 1, this.tm.getNStates());
   for (var i = 1; i <= ns; i++) {
      this.drawState(g, i);
   }
};

TMProgramCanvas.prototype.mouseClicked = function(e) {
   var x = e.getX();
   var y = e.getY();
   this.selectInstruction(this.locateState(x, y), this.locateSymbol(x, y));
   this.requestFocus();
   this.repaint();
};

TMProgramCanvas.prototype.mouseEntered = function(e) {
   /* Empty */
};

TMProgramCanvas.prototype.mouseExited = function(e) {
   /* Empty */
};

TMProgramCanvas.prototype.mousePressed = function(e) {
   /* Empty */
};

TMProgramCanvas.prototype.mouseReleased = function(e) {
   /* Empty */
};

TMProgramCanvas.prototype.focusLost = function(e) {
   this.selectInstruction(TMProgramCanvas.NONE_SELECTED, "");
   this.repaint();
};

TMProgramCanvas.prototype.focusGained = function(e) {
   /* Empty */
};

TMProgramCanvas.prototype.keyPressed = function(e) {
   var key = e.getKeyCode();
   var state = this.selectedState;
   var alphabet = this.tm.getAlphabet();
   var cx = alphabet.indexOf(this.selectedSymbol);
   if (this.selectedState === TMProgramCanvas.NONE_SELECTED) return;
   if (key === KeyEvent.VK_TAB) {
      key = (e.isShiftDown()) ? KeyEvent.VK_LEFT : KeyEvent.VK_RIGHT;
   }
   switch (key) {
    case KeyEvent.VK_BACK_SPACE: case KeyEvent.VK_DELETE:
      var ins = this.tm.getInstruction(this.selectedState, this.selectedSymbol);
      if (ins.length > 0) {
         ins = ins.substring(0, ins.length - 1);
         this.tm.setInstruction(this.selectedState, this.selectedSymbol, ins);
         this.drawInstruction(this.getGraphics(), this.selectedState, this.selectedSymbol);
      }
      break;
    case KeyEvent.VK_LEFT:
      e.consume();
      cx--;
      if (cx < 0) {
         if (state === 1) return;
         cx = alphabet.length - 1;
         state--;
      }
      this.selectInstruction(state, alphabet.substring(cx, cx + 1));
      break;
    case KeyEvent.VK_RIGHT:
      cx++;
      if (cx >= alphabet.length) {
         cx = 0;
         state++;
      }
      this.selectInstruction(state, alphabet.substring(cx, cx + 1));
      break;
    case KeyEvent.VK_UP:
      if (state === 1) return;
      state--;
      this.selectInstruction(state, alphabet.substring(cx, cx + 1));
      break;
    case KeyEvent.VK_DOWN: case KeyEvent.VK_ENTER: case toInt('\r'):
      state++;
      this.selectInstruction(state, alphabet.substring(cx, cx + 1));
      break;
   }
   if (this.complete) {
      this.complete = false;
      this.tm.setInstruction(this.selectedState, this.selectedSymbol, "");
   }
   this.repaint();
};

TMProgramCanvas.prototype.getMinimumSize = function() {
   var cellWidth = this.programView.getCellWidth();
   var cellHeight = this.programView.getCellHeight();
   var alphabet = this.tm.getAlphabet();
   var width = alphabet.length * cellWidth + 1 +
   JSPlatform.getScrollBarWidth();
   var height = TMC.MIN_VISIBLE * cellHeight + 1;
   return new Dimension(width, height);
};

TMProgramCanvas.prototype.keyTyped = function(e) {
   switch (e.getKeyChar()) {
    case KeyEvent.VK_TAB:
    case KeyEvent.VK_LEFT:
    case KeyEvent.VK_RIGHT:
    case KeyEvent.VK_UP:
    case KeyEvent.VK_DOWN:
    case KeyEvent.VK_ENTER:
    case toInt('\r'):
      return;
   }
   var ch = Character.toUpperCase(e.getKeyChar());
   if (this.selectedState === TMProgramCanvas.NONE_SELECTED) return;
   var ins = this.tm.getInstruction(this.selectedState, this.selectedSymbol);
   if (this.charIsLegal(ch, ins, this.tm.getAlphabet())) {
      ins += toStr(ch);
   } else if (ch !== 0) {
      this.getToolkit().beep();
   }
   this.tm.setInstruction(this.selectedState, this.selectedSymbol, ins);
   this.drawInstruction(this.getGraphics(), this.selectedState, this.selectedSymbol);
   this.repaint();
};

TMProgramCanvas.prototype.keyReleased = function(e) {
   /* Empty */
};

TMProgramCanvas.prototype.drawState = function(g, state) {
   var alphabet = this.tm.getAlphabet();
   for (var i = 0; i < alphabet.length; i++) {
      this.drawInstruction(g, state, alphabet.substring(i, i + 1));
   }
};

TMProgramCanvas.prototype.drawInstruction = function(g, state, symbol) {
   var cellWidth = this.programView.getCellWidth();
   var cellHeight = this.programView.getCellHeight();
   var chIndex = this.tm.getAlphabet().indexOf(symbol);
   var r = new Rectangle(chIndex * cellWidth - 1, (state - 1) * cellHeight - 1, cellWidth, cellHeight);
   g.setColor(this.programView.getCellColor());
   g.fillRect(r.x, r.y, r.width, r.height);
   g.setColor(this.programView.getLineColor());
   g.drawRect(r.x, r.y, r.width, r.height);
   var contents = this.tm.getInstruction(state, symbol);
   if (contents === null) contents = "";
   if (this.complete && state === this.selectedState && jslib.equals(symbol, this.selectedSymbol)) {
      g.setColor(this.programView.getSelectedColor());
      g.fillRect(r.x + 3, r.y + 3, r.width - 5, r.height - 5);
   }
   if (state === this.tm.getState() && jslib.equals(symbol, this.tm.getSymbol())) {
      this.programView.ensureVisible(state);
      g.setColor(this.programView.getHeadColor());
      g.drawRect(r.x + 1, r.y + 1, r.width - 2, r.height - 2);
      g.drawRect(r.x + 2, r.y + 2, r.width - 4, r.height - 4);
   }
   g.setColor(this.programView.getTextColor());
   g.setFont(this.programView.getFont());
   var fm = g.getFontMetrics();
   var x = r.x + toInt(((r.width - fm.stringWidth(contents)) / 2));
   var y = r.y +
   toInt(((r.height + TMC.ASCENT_FACTOR * fm.getAscent()) / 2))- 1;
   g.drawString(contents, x, y);
   if (!this.complete && state === this.selectedState && jslib.equals(symbol, this.selectedSymbol)) {
      x = r.x + toInt(((r.width + fm.stringWidth(contents)) / 2))+ 2;
      y = r.y +
      toInt(((r.height + TMC.ASCENT_FACTOR * fm.getAscent()) / 2))- 1;
      g.setColor(this.programView.getSelectedColor());
      g.drawLine(x, y + 1, x, y - fm.getAscent() + 1);
   }
};

TMProgramCanvas.prototype.selectInstruction = function(state, symbol) {
   this.selectedState = state;
   this.selectedSymbol = symbol;
   this.complete = true;
   this.repaint();
};

TMProgramCanvas.prototype.locateState = function(x, y) {
   var cellWidth = this.programView.getCellWidth();
   var cellHeight = this.programView.getCellHeight();
   if (y % cellHeight === 0) return TMProgramCanvas.NONE_SELECTED;
   if (x < 0 || x % cellWidth === 0) return TMProgramCanvas.NONE_SELECTED;
   return toInt((y / cellHeight))+ 1;
};

TMProgramCanvas.prototype.locateSymbol = function(x, y) {
   var cellWidth = this.programView.getCellWidth();
   if (x < 0 || x % cellWidth === 0) return "";
   var k = toInt((x / cellWidth));
   return this.tm.getAlphabet().substring(k, k + 1);
};

TMProgramCanvas.prototype.charIsLegal = function(ch, ins, alphabet) {
   switch (ins.length) {
      case 0: return alphabet.indexOf("" + toStr(ch)) >= 0;
      case 1: return ch === toInt('L') || ch === toInt('R') || ch === toInt('N');
      case 5: return false;
      default: return Character.isDigit(ch);
   }
};

TMProgramCanvas.NONE_SELECTED = -1;
var TMColumnHeader = function(programView) {
   JSCanvas.call(this);
   this.programView = programView;
   this.tm = programView.getTuringMachine();
};

TMColumnHeader.prototype = 
   jslib.inheritPrototype(JSCanvas, "TMColumnHeader extends JSCanvas");
TMColumnHeader.prototype.constructor = TMColumnHeader;
TMColumnHeader.prototype.$class = 
   new Class("TMColumnHeader", TMColumnHeader);

TMColumnHeader.prototype.getPreferredSize = function() {
   return new Dimension(this.programView.getContentWidth(), this.programView.getColumnHeaderHeight());
};

TMColumnHeader.prototype.paintComponent = function(g) {
   var size = this.getSize();
   if (size.width === 0 || size.height === 0) return;
   var cellWidth = this.programView.getCellWidth();
   g.setColor(this.programView.getBackground());
   g.fillRect(0, 0, size.width, size.height);
   var font = this.programView.getLabelFont();
   g.setColor(this.programView.getTextColor());
   g.setFont(font);
   var alphabet = this.tm.getAlphabet();
   var na = alphabet.length;
   var fm = g.getFontMetrics();
   var y = size.height - fm.getHeight() + fm.getAscent();
   for (var i = 0; i < na; i++) {
      var str = alphabet.substring(i, i + 1);
      var x = i * cellWidth + toInt(((cellWidth - fm.stringWidth(str)) / 2));
      g.drawString(str, x, y);
   }
};

var TMRowHeader = function(programView) {
   JSCanvas.call(this);
   this.programView = programView;
   this.tm = programView.getTuringMachine();
};

TMRowHeader.prototype = 
   jslib.inheritPrototype(JSCanvas, "TMRowHeader extends JSCanvas");
TMRowHeader.prototype.constructor = TMRowHeader;
TMRowHeader.prototype.$class = 
   new Class("TMRowHeader", TMRowHeader);

TMRowHeader.prototype.adjustmentValueChanged = function(e) {
   this.repaint();
};

TMRowHeader.prototype.getMinimumSize = function() {
   return new Dimension(this.programView.getRowHeaderWidth(), 1);
};

TMRowHeader.prototype.paintComponent = function(g) {
   var size = this.getSize();
   if (size.width === 0 || size.height === 0) return;
   var cellHeight = this.programView.getCellHeight();
   g.setColor(this.programView.getBackground());
   g.fillRect(0, 0, size.width, size.height);
   g.translate(0, -this.programView.getScrollTop());
   var font = this.programView.getLabelFont();
   g.setColor(this.programView.getTextColor());
   g.setFont(font);
   var fm = g.getFontMetrics();
   var dy = toInt(((cellHeight + fm.getAscent() - 1) / 2));
   var ns = Math.max(this.programView.getNVisibleStates() + 1, this.tm.getNStates());
   for (var i = 1; i <= ns; i++) {
      var str = "" + i;
      var width = fm.stringWidth(str);
      var x = size.width - width - 4;
      var y = (i - 1) * cellHeight + dy;
      g.drawString(str, x, y);
   }
};


/* TMTapeView.js */

var TMTapeView = function(tm) {
   JSCanvas.call(this);
   this.tm = tm;
   this.setFocusTraversalKeysEnabled(false);
   this.setBackground(TMC.APPLICATION_BACKGROUND);
   this.setCellColor(TMC.CELL_COLOR);
   this.setLineColor(TMC.LINE_COLOR);
   this.setHeadColor(TMC.HEAD_COLOR);
   this.setTextColor(TMC.TEXT_COLOR);
   this.setSelectedColor(TMC.SELECTED_COLOR);
   this.setFont(TMC.TEXT_FONT);
   this.selectedCell = TMTapeView.NONE_SELECTED;
   this.scroller = new TMTapeScroller(this);
   this.scrollBox = null;
   this.addComponentListener(this);
   this.addFocusListener(this);
   this.addMouseListener(this);
   this.addMouseMotionListener(this);
   this.addKeyListener(this);
   var size = new Dimension(TMC.TAPE_WIDTH, TMC.TAPE_HEIGHT + 1);
   this.setPreferredSize(size);
   this.setSizeParameters(size);
   size = new Dimension(10 * TMC.TAPE_HEIGHT, TMC.TAPE_HEIGHT + 1);
   this.setMinimumSize(size);
};

TMTapeView.prototype = 
   jslib.inheritPrototype(JSCanvas, "TMTapeView extends JSCanvas");
TMTapeView.prototype.constructor = TMTapeView;
TMTapeView.prototype.$class = 
   new Class("TMTapeView", TMTapeView);

TMTapeView.prototype.getModel = function() {
   return this.tm;
};

TMTapeView.prototype.setLeftCell = function(index) {
   this.leftCell = index;
};

TMTapeView.prototype.getLeftCell = function() {
   return this.leftCell;
};

TMTapeView.prototype.getSelectedCell = function() {
   return this.selectedCell;
};

TMTapeView.prototype.setSelectedCell = function(index) {
   this.selectedCell = index;
};

TMTapeView.prototype.center = function() {
   this.leftCell = this.tm.getHead() - toInt((this.nVisibleCells / 2));
};

TMTapeView.prototype.getNVisibleCells = function() {
   return this.nVisibleCells;
};

TMTapeView.prototype.setSelectedColor = function(color) {
   this.selectedColor = color;
};

TMTapeView.prototype.getSelectedColor = function() {
   return this.selectedColor;
};

TMTapeView.prototype.setTextColor = function(color) {
   this.textColor = color;
};

TMTapeView.prototype.getTextColor = function() {
   return this.textColor;
};

TMTapeView.prototype.setHeadColor = function(color) {
   this.headColor = color;
};

TMTapeView.prototype.getHeadColor = function() {
   return this.headColor;
};

TMTapeView.prototype.setCellColor = function(color) {
   this.cellColor = color;
};

TMTapeView.prototype.getCellColor = function() {
   return this.cellColor;
};

TMTapeView.prototype.setLineColor = function(color) {
   this.lineColor = color;
};

TMTapeView.prototype.getLineColor = function() {
   return this.lineColor;
};

TMTapeView.prototype.setSizeParameters = function(size) {
   this.cellHeight = this.cellWidth = size.height - 2;
   this.endWidth = toInt(Math.round(this.cellHeight * TMTapeView.END_FRACTION));
   var usableWidth = size.width - 2 * (this.endWidth + TMC.SIDE_MARGIN) - 1;
   this.nVisibleCells = toInt((usableWidth / this.cellWidth));
   if (this.nVisibleCells % 2 === 0) this.nVisibleCells--;
   this.leftOffset = toInt(((size.width - this.nVisibleCells * this.cellWidth - 1) / 2));
   this.leftCell = this.tm.getHead() - toInt((this.nVisibleCells / 2));
   this.leftBox = new Rectangle(this.leftOffset - this.endWidth, 1, this.endWidth, this.cellHeight);
   this.rightBox = new Rectangle(this.leftOffset + this.nVisibleCells * this.cellWidth, 1, this.endWidth, this.cellHeight);
   this.selectedCell = TMTapeView.NONE_SELECTED;
};

TMTapeView.prototype.isVisible = function(index) {
   return index >= this.leftCell && index < this.leftCell + this.nVisibleCells;
};

TMTapeView.prototype.ensureVisible = function(index) {
   if (!this.isVisible(index)) {
      this.leftCell = index - toInt((this.nVisibleCells / 2));
      this.repaint();
   }
};

TMTapeView.prototype.paintComponent = function(g) {
   this.drawEndBox(g, this.leftBox, -1);
   this.drawEndBox(g, this.rightBox, +1);
   for (var i = 0; i < this.nVisibleCells; i++) {
      this.drawCell(g, this.leftCell + i);
   }
};

TMTapeView.prototype.stateChanged = function(e) {
   if (!this.isVisible(this.tm.getHead())) {
      this.leftCell = this.tm.getHead() - toInt((this.nVisibleCells / 2));
   }
   this.setSelectedCell(TMTapeView.NONE_SELECTED);
   this.repaint();
};

TMTapeView.prototype.componentResized = function(e) {
   var size = this.getSize();
   if (size.width === 0 || size.height === 0) return;
   this.setSizeParameters(size);
   this.repaint();
};

TMTapeView.prototype.componentHidden = function(e) { };
TMTapeView.prototype.componentMoved = function(e) { };
TMTapeView.prototype.componentShown = function(e) { };
TMTapeView.prototype.mouseClicked = function(e) {
   this.requestFocus();
   this.mouseDragged(e);
};

TMTapeView.prototype.mousePressed = function(e) {
   if (this.leftBox.contains(e.getX(), e.getY())) {
      this.scrollBox = this.leftBox;
      this.scroller.setDirection(-1);
      this.scroller.start();
   } else if (this.rightBox.contains(e.getX(), e.getY())) {
      this.scrollBox = this.rightBox;
      this.scroller.setDirection(+1);
      this.scroller.start();
   }
};

TMTapeView.prototype.mouseReleased = function(e) {
   this.scrollBox = null;
   this.scroller.stop();
};

TMTapeView.prototype.mouseEntered = function(e) { };
TMTapeView.prototype.mouseExited = function(e) { };
TMTapeView.prototype.mouseDragged = function(e) {
   if (this.scrollBox !== null) {
      if (!this.scrollBox.contains(e.getX(), e.getY())) {
         this.scroller.stop();
      }
      return;
   }
   var index = this.locateCell(e.getX(), e.getY());
   if (index !== this.selectedCell && index !== TMTapeView.NONE_SELECTED) {
      this.selectCell(index);
      this.tm.setHead(index);
      this.repaint();
   }
};

TMTapeView.prototype.mouseMoved = function(e) { };
TMTapeView.prototype.focusLost = function(e) {
   this.selectedCell = TMTapeView.NONE_SELECTED;
   this.repaint();
};

TMTapeView.prototype.focusGained = function(e) {
   /* Empty */
};

TMTapeView.prototype.keyPressed = function(e) {
   var key = e.getKeyCode();
   if (this.selectedCell === TMTapeView.NONE_SELECTED) return;
   if (key === KeyEvent.VK_LEFT) {
      this.selectCell(this.selectedCell - 1);
      this.repaint();
   } else if (key === KeyEvent.VK_RIGHT) {
      this.selectCell(this.selectedCell + 1);
      this.repaint();
   } else if (key === KeyEvent.VK_ENTER || key === toInt('\r') || key === toInt('\n')) {
      this.selectCell(TMTapeView.NONE_SELECTED);
      this.repaint();
   }
};

TMTapeView.prototype.keyTyped = function(e) {
   var ch = e.getKeyChar();
   if (this.selectedCell === TMTapeView.NONE_SELECTED) return;
   if (ch === toInt('\r') || ch === toInt('\n')) {
      this.selectCell(TMTapeView.NONE_SELECTED);
      this.repaint();
      return;
   }
   var alphabet = this.tm.getAlphabet();
   var symbol = "" + toStr(ch);
   if (ch === toInt(' ')) symbol = alphabet.substring(0, 1);
   var cx = alphabet.indexOf(symbol);
   if (cx === -1) {
      if (ch !== 0) this.getToolkit().beep();
      return;
   }
   this.tm.setTapeSquare(this.selectedCell, symbol);
   this.selectCell(this.selectedCell + 1);
   this.repaint();
};

TMTapeView.prototype.keyReleased = function(e) {
   /* Empty */
};

TMTapeView.prototype.drawCell = function(g, index) {
   var vx = index - this.leftCell;
   if (vx < 0 || vx >= this.nVisibleCells) return;
   var r = new Rectangle(this.leftOffset + vx * this.cellWidth, 1, this.cellWidth, this.cellHeight);
   g.setColor(this.cellColor);
   g.fillRect(r.x, r.y, r.width, r.height);
   g.setColor(this.lineColor);
   g.drawRect(r.x, r.y, r.width, r.height);
   var contents = this.tm.getTapeSquare(index);
   if (index === this.selectedCell) {
      g.setColor(this.selectedColor);
      g.fillRect(r.x + 3, r.y + 3, r.width - 5, r.height - 5);
   }
   g.setColor(this.textColor);
   var fm = g.getFontMetrics();
   var x = r.x + toInt(((r.width - fm.stringWidth(contents)) / 2));
   var y = r.y +
   toInt(((r.height + TMC.ASCENT_FACTOR * fm.getAscent()) / 2))- 1;
   g.drawString(contents, x, y);
   if (index === this.tm.getHead()) {
      g.setColor(this.headColor);
      g.drawRect(r.x + 1, r.y + 1, r.width - 2, r.height - 2);
      g.drawRect(r.x + 2, r.y + 2, r.width - 4, r.height - 4);
   }
};

TMTapeView.prototype.drawEndBox = function(g, r, dir) {
   if (r === null) return;
   g.setColor(TMC.END_BACKGROUND);
   g.fillRect(r.x, r.y, r.width, r.height);
   g.setColor(this.lineColor);
   g.drawRect(r.x, r.y, r.width, r.height);
   for (var i = 0; i < this.endWidth - 6; i++) {
      var len = (dir === -1) ? 2 * i + 1 : 2 * (this.endWidth - 7 - i) + 1;
      g.drawLine(r.x + i + 3, r.y + toInt(((r.height - len) / 2)), r.x + i + 3, r.y + toInt(((r.height + len) / 2)));
   }
};

TMTapeView.prototype.selectCell = function(index) {
   this.selectedCell = index;
   if (this.selectedCell !== TMTapeView.NONE_SELECTED) this.ensureVisible(index);
};

TMTapeView.prototype.locateCell = function(x, y) {
   x -= this.leftOffset;
   if (x < 0 || x > this.cellWidth * this.nVisibleCells) {
      return TMTapeView.NONE_SELECTED;
   } else {
      return this.leftCell + toInt((x / this.cellWidth));
   }
};

TMTapeView.END_FRACTION = 0.30;
TMTapeView.NONE_SELECTED = Integer.MIN_VALUE;
var TMTapeScroller = function(view) {
   this.tapeView = view;
   this.timer = new Timer(TMC.INITIAL_SCROLL_DELAY, this);
   this.timer.setRepeats(false);
};

TMTapeScroller.prototype.setDirection = function(dir) {
   this.dir = dir;
};

TMTapeScroller.prototype.start = function() {
   this.running = true;
   this.scroll();
   this.timer.start();
};

TMTapeScroller.prototype.stop = function() {
   this.running = false;
   this.timer.stop();
};

TMTapeScroller.prototype.actionPerformed = function(e) {
   this.scroll();
   if (this.running) {
      this.timer.setDelay(TMC.SCROLL_DELAY);
      this.timer.restart();
   }
};

TMTapeScroller.prototype.scroll = function() {
   this.tapeView.setLeftCell(this.tapeView.getLeftCell() + this.dir);
   this.tapeView.repaint();
};


/* Turing.js */

var Turing = function() {
   JSProgram.call(this);
   this.createProgramFrame();
   JSFile.setCGIServer("http://web.stanford.edu/class/cs54n/cgi-bin");
   this.setTitle("Turing");
   this.model = new TMModel();
   this.tapeView = new TMTapeView(this.model);
   this.programView = new TMProgramView(this.model);
   this.model.addChangeListener(this.tapeView);
   this.model.addChangeListener(this.programView);
   var layout = new TMLayout(this.model);
   this.setLayout(layout);
   this.add(this.tapeView, "tape");
   this.add(this.programView, "program");
   this.createControlStrip();
   this.loadDialog = new TMLoadDialog(this.getFrame());
   this.loadDialog.addActionListener(new TMLoadDialogListener(this, this.loadDialog));
   this.saveDialog = new JSSaveDialog(this.getFrame());
   this.saveDialog.addActionListener(new TMSaveDialogListener(this));
   if (!JSPlatform.isJavaScript()) {
      this.add(this.createBackground(), "background");
   }
   this.tapeView.componentResized(null);
   this.programView.componentResized(null);
   if (!JSPlatform.isJavaScript()) {
      this.setMinimumSize(this.getMinimumSize());
   }
   this.pack();
   this.setVisible(true);
};

Turing.prototype = 
   jslib.inheritPrototype(JSProgram, "Turing extends JSProgram");
Turing.prototype.constructor = Turing;
Turing.prototype.$class = 
   new Class("Turing", Turing);

Turing.prototype.run = function() {
   this.updateDialogs();
   this.tapeView.componentResized(null);
   this.programView.componentResized(null);
};

Turing.prototype.updateDialogs = function() {
   var home = new JSFile("cgi:" + this.getUID() + "/Turing");
   this.loadDialog.setDirectory(home);
   this.saveDialog.setDirectory(home);
};

Turing.prototype.getModel = function() {
   return this.model;
};

Turing.prototype.actionPerformed = function(e) {
   var cmd = e.getActionCommand();
   if (jslib.equals(cmd, "Load")) {
      this.loadDialog.centerOnParent();
      this.loadDialog.setVisible(true);
   } else if (jslib.equals(cmd, "Save")) {
      this.saveDialog.centerOnParent();
      this.saveDialog.setVisible(true);
   } else if (jslib.equals(cmd, "Clear Tape")) {
      this.model.stopAction();
      this.model.clearTape();
      this.model.update();
      this.tapeView.center();
   } else if (jslib.equals(cmd, "Clear Program")) {
      this.model.stopAction();
      this.model.clearProgram();
      this.model.update();
   }
};

Turing.prototype.createBackground = function() {
   return new TMBackground();
};

Turing.prototype.createControlStrip = function() {
   var loadControl = new LoadControl();
   loadControl.addActionListener(this);
   this.model.addControl(loadControl);
   this.addControl(loadControl);
   var saveControl = new SaveControl();
   saveControl.addActionListener(this);
   this.model.addControl(saveControl);
   this.addControl(saveControl);
   var clearTapeControl = new TMClearTapeControl();
   clearTapeControl.addActionListener(this);
   this.model.addControl(clearTapeControl);
   this.addControl(clearTapeControl);
   var clearProgramControl = new TMClearProgramControl();
   clearProgramControl.addActionListener(this);
   this.model.addControl(clearProgramControl);
   this.addControl(clearProgramControl);
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

Turing.main = function(args) {
   var pgm = new Turing();
   pgm.startAfterLogin(pgm.getFrame());
};

var TMLoadDialogListener = function(pgm, dialog) {
   this.pgm = pgm;
   this.dialog = dialog;
};

TMLoadDialogListener.prototype.actionPerformed = function(e) {
   if (e instanceof JSErrorEvent) {
      // Fill in
   } else {
      var path = e.getActionCommand();
      if (path !== null && path.length > 0) {
         var append = this.dialog.getAppendFlag();
         new JSFile(path).read(new TMLoadFileListener(this.pgm, path, append));
      }
   }
};

var TMLoadFileListener = function(pgm, path, append) {
   this.pgm = pgm;
   this.path = path;
   this.append = append;
};

TMLoadFileListener.prototype.actionPerformed = function(e) {
   if (e instanceof JSErrorEvent) {
      // Fill in
   } else {
      var model = this.pgm.getModel();
      var start = 0;
      if (this.append) {
         start = model.getNStates();
      } else {
         model.clearProgram();
      }
      model.parseProgram(e.getActionCommand(), start);
      model.update();
   }
};

var TMSaveDialogListener = function(pgm) {
   this.pgm = pgm;
};

TMSaveDialogListener.prototype.actionPerformed = function(e) {
   if (e instanceof JSErrorEvent) {
      // Fill in
   } else {
      var path = e.getActionCommand();
      if (path !== null && path.length > 0) {
         var text = this.pgm.getModel().getProgramText();
         new JSFile(path).write(text, new TMSaveFileListener(this.pgm, path));
      }
   }
};

var TMSaveFileListener = function(pgm, path) {
   this.pgm = pgm;
   this.path = path;
};

TMSaveFileListener.prototype.actionPerformed = function(e) {
   if (e instanceof JSErrorEvent) {
      // Fill in
   } else {
      this.pgm.updateDialogs();
   }
};

var TMFileLoader = function(model, dialog) {
   this.model = model;
   this.dialog = dialog;
};

TMFileLoader.prototype.actionPerformed = function(e) {
   var start = 0;
   if (this.dialog.getAppendFlag()) {
      start = this.model.getNStates();
   } else {
      this.model.clearProgram();
   }
   this.model.parseProgram(e.getActionCommand(), start);
   this.model.update();
};

var TMBackground = function() {
   JSCanvas.call(this);
};

TMBackground.prototype =
   jslib.inheritPrototype(JSCanvas, "TMBackground extends JSCanvas");
TMBackground.prototype.constructor = TMBackground;
TMBackground.prototype.$class = 
   new Class("TMBackground", TMBackground);

TMBackground.prototype.paintComponent = function(g) {
   var size = this.getSize();
   g.setColor(TMC.APPLICATION_BACKGROUND);
   g.fillRect(0, 0, size.width, size.height);
};

TMBackground.prototype = 
   jslib.inheritPrototype(JSCanvas, "TMBackground extends JSCanvas");
TMBackground.prototype.constructor = TMBackground;
TMBackground.prototype.$class = 
   new Class("TMBackground", TMBackground);

var TMLoadDialog = function(target) {
   JSLoadDialog.call(this, target);
   this.setControlPanel(this.createControlPanel());
};

TMLoadDialog.prototype = 
   jslib.inheritPrototype(JSLoadDialog, "TMLoadDialog extends JSLoadDialog");
TMLoadDialog.prototype.constructor = TMLoadDialog;
TMLoadDialog.prototype.$class = 
   new Class("TMLoadDialog", TMLoadDialog);

TMLoadDialog.prototype.createControlPanel = function() {
   var panel = new JSPanel();
   var controlListener = this.getControlListener();
   panel.setLayout(new FlowLayout(FlowLayout.RIGHT));
   this.appendBox = new JCheckBox("Append");
   var cancelButton = new JButton("Cancel");
   var loadButton = new JButton("Load");
   cancelButton.addActionListener(controlListener);
   loadButton.addActionListener(controlListener);
   panel.add(this.appendBox);
   panel.add(cancelButton);
   panel.add(loadButton);
   return panel;
};

TMLoadDialog.prototype.getAppendFlag = function() {
   return this.appendBox.isSelected();
};


/* Exports */

return {
   TMC : TMC,
   TMClearProgramControl : TMClearProgramControl,
   TMClearTapeControl : TMClearTapeControl,
   TMLayout : TMLayout,
   TMModel : TMModel,
   TMProgramView : TMProgramView,
   TMTapeView : TMTapeView,
   Turing : Turing
};

});
