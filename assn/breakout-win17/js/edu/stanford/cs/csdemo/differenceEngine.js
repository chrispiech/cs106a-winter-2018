/*
 * File: differenceEngine.js
 * Created on Sat Oct 17 18:32:45 PDT 2015 by java2js
 * --------------------------------------------------
 * This file was generated mechanically by the java2js utility.
 * Permanent edits must be made in the Java file.
 */

define([ "jslib",
         "edu/stanford/cs/controller",
         "edu/stanford/cs/java2js",
         "edu/stanford/cs/jsconsole",
         "edu/stanford/cs/jscontrols/JSControl",
         "edu/stanford/cs/jscontrols/ResetControl",
         "edu/stanford/cs/jscontrols/StepControl",
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
         edu_stanford_cs_jscontrols_ResetControl,
         edu_stanford_cs_jscontrols_StepControl,
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
var Steppable = edu_stanford_cs_controller.Steppable;
var JSCanvas = edu_stanford_cs_java2js.JSCanvas;
var JSElementList = edu_stanford_cs_java2js.JSElementList;
var JSImage = edu_stanford_cs_java2js.JSImage;
var JSProgram = edu_stanford_cs_java2js.JSProgram;
var JSConsole = edu_stanford_cs_jsconsole.JSConsole;
var JSControl = edu_stanford_cs_jscontrols_JSControl.JSControl;
var ResetControl = edu_stanford_cs_jscontrols_ResetControl.ResetControl;
var StepControl = edu_stanford_cs_jscontrols_StepControl.StepControl;
var Color = java_awt.Color;
var Component = java_awt.Component;
var Container = java_awt.Container;
var Dimension = java_awt.Dimension;
var Font = java_awt.Font;
var Graphics = java_awt.Graphics;
var Image = java_awt.Image;
var Insets = java_awt.Insets;
var LayoutManager = java_awt.LayoutManager;
var Point = java_awt.Point;
var Rectangle = java_awt.Rectangle;
var ActionEvent = java_awt.ActionEvent;
var ActionListener = java_awt.ActionListener;
var KeyEvent = java_awt.KeyEvent;
var KeyListener = java_awt.KeyListener;
var MouseEvent = java_awt.MouseEvent;
var MouseListener = java_awt.MouseListener;
var Character = java_lang.Character;
var Class = java_lang.Class;
var RuntimeException = java_lang.RuntimeException;
var BigInteger = java_math.BigInteger;
var ArrayList = java_util.ArrayList;
var JFrame = javax_swing.JFrame;
var Timer = javax_swing.Timer;
var ChangeEvent = javax_swing.ChangeEvent;
var ChangeListener = javax_swing.ChangeListener;

/* DEC.js */

var DEC = function() {
   /* Empty */
};

DEC.ONE = new BigInteger("1");
DEC.TEN = new BigInteger("10");
DEC.ZERO = new BigInteger("0");
DEC.APPLICATION_BACKGROUND = new Color(0xCCFFFF);
DEC.SELECTED_COLOR = new Color(0x99FF99);
DEC.SHADE_COLOR = new Color(0x996633);
DEC.LEFT_MARGIN = 10;
DEC.BOTTOM_MARGIN = 5;
DEC.RIGHT_MARGIN = 10;
DEC.TOP_MARGIN = 10;
DEC.SHADE_MARGIN = 6;
DEC.CYCLE_PLACES = 5;
DEC.DEFAULT_NCOLUMNS = 15;
DEC.DEFAULT_NDIGITS = 30;
DEC.MILL_PRINTER_SEP = 10;
DEC.PRINTER_WIDTH = 430;

/* DEController.js */

var DEController = function(model, view) {
   JSCanvas.call(this);
   this.model = model;
   this.view = view;
   this.timer = new Timer(DEController.DELAY, this);
   this.timer.setActionCommand("Advance");
   view.addMouseListener(this);
   view.addKeyListener(this);
};

DEController.prototype = 
   jslib.inheritPrototype(JSCanvas, "DEController extends JSCanvas");
DEController.prototype.constructor = DEController;
DEController.prototype.$class = 
   new Class("DEController", DEController);

DEController.prototype.init = function(pgm) {
   /* Empty */
};

DEController.prototype.mousePressed = function(e) {
   this.view.requestFocus();
   this.startX = e.getX();
   this.startWheel = this.view.getWheelIndex(e.getX(), e.getY());
   if (this.startWheel === null) this.model.step();
   e.consume();
};

DEController.prototype.mouseReleased = function(e) {
   var wheel = this.view.getWheelIndex(e.getX(), e.getY());
   if (wheel === null || this.startWheel === null) return;
   if (Math.abs(this.startX - e.getX()) < 2) return;
   if (wheel.x === this.startWheel.x && wheel.y === this.startWheel.y) {
      var sign = (this.startX < e.getX()) ? 1 : -1;
      var delta = ((wheel.x % 2 === 0) === (sign === -1)) ? 9 : 1;
      var digit = (this.model.getColumnDigit(wheel.x, wheel.y) + delta) % 10;
      this.model.setColumnDigit(wheel.x, wheel.y, digit);
      this.view.repaint();
   }
   e.consume();
};

DEController.prototype.mouseClicked = function(e) {
   if (this.startWheel === null) {
      this.view.setSelectedColumn(-1);
   } else {
      this.view.setSelectedColumn(this.startWheel.x);
      this.initialSelection = true;
      this.minusFlag = false;
      this.firstDigit = true;
   }
   e.consume();
   this.view.repaint();
};

DEController.prototype.mouseEntered = function(e) {
   /* Empty */
};

DEController.prototype.mouseExited = function(e) {
   /* Empty */
};

DEController.prototype.keyPressed = function(e) {
   var column = this.view.getSelectedColumn();
   if (column === -1) return;
   switch (e.getKeyCode()) {
    case KeyEvent.VK_TAB:
      if (e.isShiftDown()) {
         column = Math.max(-1, column - 1);
      } else {
         column++;
         if (column >= this.model.getNColumns()) column = -1;
      }
      this.view.setSelectedColumn(column);
      this.initialSelection = true;
      this.minusFlag = false;
      this.firstDigit = true;
      break;
    case KeyEvent.VK_DELETE: case KeyEvent.VK_BACK_SPACE:
      var value = this.model.getColumn(column);
      this.model.setColumn(column, value.divide(DEC.TEN));
      break;
   }
   this.view.repaint();
};

DEController.prototype.keyTyped = function(e) {
   var column = this.view.getSelectedColumn();
   if (column === -1) return;
   var ch = toInt(e.getKeyChar());
   if (ch === toInt('\b') || ch === toInt('\t') || ch === toInt('\177') || ch === 0) return;
   if (this.initialSelection) {
      this.model.setColumn(column, DEC.ZERO);
      this.initialSelection = false;
      if (ch === toInt('-')) {
         this.minusFlag = true;
         return;
      }
   }
   if (Character.isDigit(ch)) {
      var digit = new BigInteger("" + Character.digit(ch, 10));
      var value = this.model.getColumn(column);
      if (this.minusFlag) {
         var top = DEC.ONE;
         for (var i = 0; i < this.model.getNDigits(); i++) {
            top = top.multiply(DEC.TEN);
         }
         value = (this.firstDigit) ? DEC.ZERO : top.subtract(value);
         value = value.multiply(DEC.TEN).add(digit);
         value = top.subtract(value);
      } else {
         value = value.multiply(DEC.TEN).add(digit);
      }
      this.model.setColumn(column, value);
      this.firstDigit = false;
   } else {
      this.view.setSelectedColumn(-1);
   }
   this.view.repaint();
};

DEController.prototype.keyReleased = function(e) {
   /* Empty */
};

DEController.prototype.actionPerformed = function(e) {
   var cmd = e.getActionCommand();
   if (jslib.equalsIgnoreCase(cmd, "Advance")) {
      this.model.step();
   }
};

DEController.DELAY = 50;

/* DELayout.js */

var DELayout = function() {
   /* Empty */
};

DELayout.prototype.addLayoutComponent = function(name, comp) {
   if (jslib.equals(name, "controls")) {
      this.controls = comp;
   } else if (jslib.equals(name, "view")) {
      this.view = comp;
   } else if (jslib.equals(name, "printer")) {
      this.printer = comp;
   } else {
      throw new RuntimeException("Illegal component name: " + name);
   }
};

DELayout.prototype.removeLayoutComponent = function(comp) {
   /* Empty */
};

DELayout.prototype.preferredLayoutSize = function(target) {
   if (target.getTreeLock()) {
      var insets = target.getInsets();
      var vSize = this.view.getPreferredSize();
      var pSize = this.printer.getPreferredSize();
      var cSize = this.controls.getPreferredSize();
      var width = DEC.LEFT_MARGIN + vSize.width + DEC.MILL_PRINTER_SEP +
      pSize.width + DEC.RIGHT_MARGIN +
      insets.left + insets.right;
      var height = DEC.TOP_MARGIN + vSize.height + DEC.BOTTOM_MARGIN +
      cSize.height + insets.top + insets.bottom;
      return new Dimension(width, height);
   }
};

DELayout.prototype.minimumLayoutSize = function(target) {
   return this.preferredLayoutSize(target);
};

DELayout.prototype.layoutContainer = function(target) {
   if (target.getTreeLock()) {
      var insets = target.getInsets();
      var vSize = this.view.getPreferredSize();
      var cSize = this.controls.getPreferredSize();
      var bounds = target.getBounds();
      var x = bounds.x + insets.left;
      var y = bounds.y + insets.top;
      var width = bounds.width - insets.left - insets.right;
      var height = bounds.height - insets.top - insets.bottom;
      var px = x + DEC.LEFT_MARGIN + vSize.width + DEC.MILL_PRINTER_SEP;
      var ph = height - DEC.TOP_MARGIN - DEC.BOTTOM_MARGIN - cSize.height;
      var cy = y + height - cSize.height;
      this.view.setBounds(x + DEC.LEFT_MARGIN, y + DEC.TOP_MARGIN, vSize.width, vSize.height);
      this.printer.setBounds(px, y + DEC.TOP_MARGIN, width - DEC.RIGHT_MARGIN - px, ph);
      this.controls.setBounds(0, cy, width, cSize.height);
   }
};


/* DEModel.js */

var DEModel = function() {
   this.listeners = new ArrayList();
   this.setSize(DEC.DEFAULT_NCOLUMNS, DEC.DEFAULT_NDIGITS);
   this.clear();
};

DEModel.prototype.setSize = function(nc, nd) {
   this.nColumns = nc;
   this.nDigits = nd;
   this.wheels = jslib.newArray(this.nColumns);
};

DEModel.prototype.getNColumns = function() {
   return this.nColumns;
};

DEModel.prototype.getNDigits = function() {
   return this.nDigits;
};

DEModel.prototype.getCycleCount = function() {
   return this.cycleCount;
};

DEModel.prototype.setCycleCount = function(count) {
   this.cycleCount = count;
};

DEModel.prototype.getColumnDigit = function(column, place) {
   var str = this.wheels[column].toString();
   var index = str.length - 1 - place;
   return (index >= 0) ? Character.digit(str.charCodeAt(index), 10) : 0;
};

DEModel.prototype.setColumnDigit = function(column, place, value) {
   var nDigit = DEC.ONE;
   var oDigit = new BigInteger("" + this.getColumnDigit(column, place));
   var mask = DEC.ONE;
   for (var i = 0; i < place; i++) {
      nDigit = nDigit.multiply(DEC.TEN);
      oDigit = oDigit.multiply(DEC.TEN);
   }
   for (var i = 0; i < this.nDigits; i++) {
      mask = mask.multiply(DEC.TEN);
   }
   this.wheels[column] = this.wheels[column].subtract(oDigit).add(nDigit).mod(mask);
};

DEModel.prototype.getColumn = function(column) {
   return this.wheels[column];
};

DEModel.prototype.setColumn = function(column, value) {
   this.wheels[column] = value;
};

DEModel.prototype.step = function() {
   for (var column = 0; column < this.nColumns - 1; column++) {
      this.setColumn(column, this.getColumn(column).add(this.getColumn(column + 1)));
   }
   this.cycleCount++;
   this.fireChangeListeners();
};

DEModel.prototype.isCallable = function() {
   return false;
};

DEModel.prototype.getStackDepth = function() {
   return 0;
};

DEModel.prototype.clear = function() {
   for (var i = 0; i < this.nColumns; i++) {
      this.wheels[i] = DEC.ZERO;
   }
   this.cycleCount = 0;
   this.fireChangeListeners();
};

DEModel.prototype.addChangeListener = function(listener) {
   this.listeners.add(listener);
};

DEModel.prototype.fireChangeListeners = function() {
   var el0 = new JSElementList(this.listeners);
   for (var ei0 = 0; ei0 < el0.size(); ei0++) {
      var listener = el0.get(ei0);
      listener.stateChanged(new ChangeEvent(this));
   }
};


/* DEPrinter.js */

var DEPrinter = function(model, view) {
   JSConsole.call(this);
   this.model = model;
   this.lastCycleCount = 0;
   this.setFont(Font.decode("SansSerif-Bold-16"));
   model.addChangeListener(this);
};

DEPrinter.prototype = 
   jslib.inheritPrototype(JSConsole, "DEPrinter extends JSConsole");
DEPrinter.prototype.constructor = DEPrinter;
DEPrinter.prototype.$class = 
   new Class("DEPrinter", DEPrinter);

DEPrinter.prototype.stateChanged = function(e) {
   var ccount = this.model.getCycleCount();
   if (this.lastCycleCount !== ccount && ccount !== 0) {
      this.println(this.generateDisplayLine(ccount));
      this.repaint();
      this.lastCycleCount = ccount;
   }
};

DEPrinter.prototype.generateDisplayLine = function(ccount) {
   var str = "" + ccount;
   while (str.length < DEC.CYCLE_PLACES) {
      str = "0" + str;
   }
   var value = "";
   for (var d = this.model.getNDigits() - 1; d >= 0; d--) {
      value += this.model.getColumnDigit(0, d);
   }
   return " " + str + "  " + value;
};

DEPrinter.prototype.getPreferredSize = function() {
   return new Dimension(DEC.PRINTER_WIDTH, 1);
};


/* DEView.js */

var DEView = function(model) {
   JSCanvas.call(this);
   this.model = model;
   model.addChangeListener(this);
   this.selectedColumn = -1;
   this.setGraphicsValues();
   this.setFocusTraversalKeysEnabled(false);
};

DEView.prototype = 
   jslib.inheritPrototype(JSCanvas, "DEView extends JSCanvas");
DEView.prototype.constructor = DEView;
DEView.prototype.$class = 
   new Class("DEView", DEView);

DEView.prototype.stateChanged = function(e) {
   this.repaint();
};

DEView.prototype.paintComponent = function(g) {
   g.setColor(this.getBackground());
   g.fillRect(0, 0, this.getWidth(), this.getHeight());
   g.setColor(this.getForeground());
   var x = 0;
   var y = 0;
   for (var c = 0; c < this.nColumns; c++) {
      var value = this.model.getColumn(c);
      this.paintColumn(g, x, y, value, c === this.selectedColumn);
      x += this.columnWidth - 1;
   }
};

DEView.prototype.paintColumn = function(g, x0, y0, value, selected) {
   g.setColor(DEC.SHADE_COLOR);
   g.fillRect(x0, y0, this.columnWidth, this.viewHeight);
   var x = x0 + (this.columnWidth - this.digitWidth) / 2;
   var y = y0;
   g.setColor((selected) ? DEC.SELECTED_COLOR : Color.WHITE);
   g.fillRect(x, y0, this.digitWidth, this.viewHeight);
   g.setColor(Color.BLACK);
   var str = "" + value;
   var len = str.length;
   g.setFont(this.digitFont);
   y = y0;
   x = x0 + this.columnWidth / 2;
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
   g.drawRect(x0, y0, this.columnWidth - 1, this.nDigits * this.digitHeight);
};

DEView.prototype.setGraphicsValues = function() {
   this.nColumns = this.model.getNColumns();
   this.nDigits = this.model.getNDigits();
   var style = Font.PLAIN;
   if (this.nDigits <= 20) {
      this.fontSize = 24;
      this.digitWidth = 24;
      this.digitHeight = 24;
      this.digitOffset = 3;
   } else if (this.nDigits <= 30) {
      this.fontSize = 20;
      style = Font.BOLD;
      this.digitWidth = 20;
      this.digitHeight = 20;
      this.digitOffset = 3;
   } else {
      this.fontSize = 14;
      style = Font.BOLD;
      this.digitWidth = 14;
      this.digitHeight = 14;
      this.digitOffset = 2;
   }
   this.columnWidth = this.digitWidth + 2 * DEC.SHADE_MARGIN + 2;
   this.viewWidth = this.nColumns * (this.columnWidth - 1) + 1;
   this.viewHeight = this.nDigits * this.digitHeight + 1;
   this.digitFont = new Font("SansSerif", style, this.fontSize);
};

DEView.prototype.getMinimumSize = function() {
   return new Dimension(this.viewWidth, this.viewHeight);
};

DEView.prototype.getPreferredSize = function() {
   return new Dimension(this.viewWidth, this.viewHeight);
};

DEView.prototype.getWheelIndex = function(x, y) {
   var column = toInt((x / (this.columnWidth - 1)));
   var row = this.nDigits - toInt((y / this.digitHeight + 1));
   if (column >= 0 && column < this.nColumns && row >= 0 && row < this.nDigits) {
      return new Point(column, row);
   }
   return null;
};

DEView.prototype.setSelectedColumn = function(column) {
   this.selectedColumn = column;
};

DEView.prototype.getSelectedColumn = function() {
   return this.selectedColumn;
};


/* DEWoodcut.js */

var DEWoodcut = function() {
   JSProgram.call(this);
   this.createProgramFrame();
   this.setTitle("Difference Engine");
   var engine = new DEWoodcutModel();
   var view = new DEWoodcutView(engine);
   var sf = JSProgram.isJavaScript() ? DEWoodcut.WOODCUT_SF_JAVASCRIPT : DEWoodcut.WOODCUT_SF_JAVA;
   view.setScaleFactor(sf);
   var controller = new DEWoodcutController(engine, view);
   controller.init(this);
   this.add(view, "view");
   var width = toInt(Math.round(sf * DEWoodcutView.VIEW_WIDTH));
   var height = toInt(Math.round(sf * DEWoodcutView.VIEW_HEIGHT));
   this.setPreferredSize(new Dimension(width, height));
   this.pack();
   this.setVisible(true);
};

DEWoodcut.prototype = 
   jslib.inheritPrototype(JSProgram, "DEWoodcut extends JSProgram");
DEWoodcut.prototype.constructor = DEWoodcut;
DEWoodcut.prototype.$class = 
   new Class("DEWoodcut", DEWoodcut);

DEWoodcut.main = function(args) {
   new DEWoodcut().start();
};

DEWoodcut.WOODCUT_SF_JAVA = 1.00;
DEWoodcut.WOODCUT_SF_JAVASCRIPT = 0.85;

/* DEWoodcutController.js */

var DEWoodcutController = function(model, view) {
   JSCanvas.call(this);
   this.model = model;
   this.view = view;
   this.timer = new Timer(DEWoodcutController.FORWARD_DELAY, this);
   this.timer.setActionCommand("Advance");
   view.addMouseListener(this);
   view.addKeyListener(this);
};

DEWoodcutController.prototype = 
   jslib.inheritPrototype(JSCanvas, "DEWoodcutController extends JSCanvas");
DEWoodcutController.prototype.constructor = DEWoodcutController;
DEWoodcutController.prototype.$class = 
   new Class("DEWoodcutController", DEWoodcutController);

DEWoodcutController.prototype.init = function(frame) {
   /* Empty */
};

DEWoodcutController.prototype.mousePressed = function(e) {
   this.view.requestFocus();
   this.startX = e.getX();
   this.startWheel = this.view.getWheelIndex(e.getX(), e.getY());
   if (this.startWheel === null) this.timer.start();
   e.consume();
};

DEWoodcutController.prototype.mouseReleased = function(e) {
   var wheel = this.view.getWheelIndex(e.getX(), e.getY());
   if (wheel === null || this.startWheel === null) return;
   if (Math.abs(this.startX - e.getX()) < 2) return;
   if (wheel.x === this.startWheel.x && wheel.y === this.startWheel.y) {
      var sign = (this.startX < e.getX()) ? 1 : -1;
      var delta = ((wheel.x % 2 === 0) === (sign === -1)) ? 9 : 1;
      var digit = (this.model.getColumnDigit(wheel.x, wheel.y) + delta) % 10;
      this.model.setColumnDigit(wheel.x, wheel.y, digit);
      this.view.repaint();
   }
};

DEWoodcutController.prototype.mouseClicked = function(e) {
   if (this.startWheel === null) {
      this.view.setSelectedColumn(-1);
   } else {
      this.view.setSelectedColumn(this.startWheel.x);
      this.initialSelection = true;
      this.view.repaint();
   }
   e.consume();
};

DEWoodcutController.prototype.mouseEntered = function(e) {
   /* Empty */
};

DEWoodcutController.prototype.mouseExited = function(e) {
   /* Empty */
};

DEWoodcutController.prototype.keyPressed = function(e) {
   var column = this.view.getSelectedColumn();
   if (column === -1) return;
   switch (e.getKeyCode()) {
    case KeyEvent.VK_TAB:
      if (e.isShiftDown()) {
         column = Math.max(0, column - 1);
      } else {
         column = Math.min(2, column + 1);
      }
      this.view.setSelectedColumn(column);
      this.initialSelection = true;
      break;
    case KeyEvent.VK_DELETE: case KeyEvent.VK_BACK_SPACE:
      var value = this.model.getColumn(column);
      this.model.setColumn(column, toInt((value / 10)));
      break;
   }
   this.view.repaint();
};

DEWoodcutController.prototype.keyTyped = function(e) {
   var column = this.view.getSelectedColumn();
   if (column === -1) return;
   var ch = toInt(e.getKeyChar());
   if (ch === toInt('\b') || ch === toInt('\t') || ch === toInt('\177') || ch === 0) return;
   if (this.initialSelection) {
      this.model.setColumn(column, 0);
      this.model.setCycleCount(0);
      this.initialSelection = false;
   }
   if (Character.isDigit(ch)) {
      var value = this.model.getColumn(column);
      this.model.setColumn(column, 10 * value + Character.digit(ch, 10));
   } else {
      this.view.setSelectedColumn(-1);
   }
   this.view.repaint();
};

DEWoodcutController.prototype.keyReleased = function(e) {
   /* Empty */
};

DEWoodcutController.prototype.actionPerformed = function(e) {
   var cmd = e.getActionCommand();
   if (jslib.equalsIgnoreCase(cmd, "Advance")) {
      this.advance();
   }
};

DEWoodcutController.prototype.advance = function() {
   this.model.step();
   this.timer.setDelay(this.model.isReturning() ? DEWoodcutController.REVERSE_DELAY : DEWoodcutController.FORWARD_DELAY);
   if (this.model.isCycleComplete()) {
      this.timer.stop();
   }
};

DEWoodcutController.FORWARD_DELAY = 35;
DEWoodcutController.REVERSE_DELAY = 10;

/* DEWoodcutModel.js */

var DEWoodcutModel = function() {
   this.listeners = new ArrayList();
   this.initWheels();
   this.setColumn(0, 0);
   this.setColumn(1, 1);
   this.setColumn(2, 2);
   this.cycleCount = 0;
   this.microCycle = 0;
   this.returning = false;
   this.cycleComplete = true;
};

DEWoodcutModel.prototype.initWheels = function() {
   this.wheels = jslib.newArray(DEWoodcutModel.N_COLUMNS, DEWoodcutModel.N_DIGITS);
   this.oldWheels = jslib.newArray(DEWoodcutModel.N_COLUMNS, DEWoodcutModel.N_DIGITS);
   for (var i = 0; i < DEWoodcutModel.N_COLUMNS; i++) {
      this.wheels[i] = jslib.newArray(DEWoodcutModel.N_DIGITS);
      this.oldWheels[i] = jslib.newArray(DEWoodcutModel.N_DIGITS);
      for (var j = 0; j < DEWoodcutModel.N_DIGITS; j++) {
         this.wheels[i][j] = 0;
      }
   }
};

DEWoodcutModel.prototype.getCycleCount = function() {
   return this.cycleCount;
};

DEWoodcutModel.prototype.setCycleCount = function(count) {
   this.cycleCount = count;
};

DEWoodcutModel.prototype.getHandleOffset = function() {
   return this.microCycle;
};

DEWoodcutModel.prototype.isReturning = function() {
   return this.returning;
};

DEWoodcutModel.prototype.getColumnDigit = function(column, place) {
   return this.wheels[column][place];
};

DEWoodcutModel.prototype.setColumnDigit = function(column, place, value) {
   this.wheels[column][place] = value;
};

DEWoodcutModel.prototype.getColumn = function(column) {
   var value = 0;
   for (var i = DEWoodcutModel.N_DIGITS - 1; i >= 0; i--) {
      value = 10 * value + this.wheels[column][i];
   }
   return value;
};

DEWoodcutModel.prototype.setColumn = function(column, value) {
   for (var i = 0; i < DEWoodcutModel.N_DIGITS; i++) {
      this.wheels[column][i] = value % 10;
      value = toInt((value / 10));
   }
};

DEWoodcutModel.prototype.getColumnOffset = function(column, place) {
   if (this.returning || column === DEWoodcutModel.N_COLUMNS - 1) return 0;
   if (this.digitCount >= this.oldWheels[column + 1][place]) return 0;
   return this.microCycle % DEWoodcutModel.DIGIT_STEPS;
};

DEWoodcutModel.prototype.step = function() {
   if (this.cycleComplete) {
      this.saveWheelState();
      this.returning = false;
      this.maxDigit = 0;
      for (var i = 1; i < DEWoodcutModel.N_COLUMNS; i++) {
         for (var j = 0; j < DEWoodcutModel.N_DIGITS; j++) {
            this.maxDigit = Math.max(this.getColumnDigit(i, j), this.maxDigit);
         }
      }
      this.digitCount = 0;
      this.microCycle = 0;
      this.cycleComplete = false;
   }
   if (this.returning) {
      if (this.microCycle-- === 0) this.cycleComplete = true;
   } else {
      if (++this.microCycle % DEWoodcutModel.DIGIT_STEPS === 0) {
         for (var i = 0; i < DEWoodcutModel.N_COLUMNS - 1; i++) {
            for (var j = 0; j < DEWoodcutModel.N_DIGITS; j++) {
               if (this.digitCount < this.oldWheels[i + 1][j]) {
                  this.incrementColumnDigit(i, j);
               }
            }
         }
         if (++this.digitCount === this.maxDigit) {
            this.returning = true;
            this.cycleCount++;
         }
      }
   }
   this.fireChangeListeners();
};

DEWoodcutModel.prototype.isCallable = function() {
   return false;
};

DEWoodcutModel.prototype.getStackDepth = function() {
   return 0;
};

DEWoodcutModel.prototype.isCycleComplete = function() {
   return this.cycleComplete;
};

DEWoodcutModel.prototype.addChangeListener = function(listener) {
   this.listeners.add(listener);
};

DEWoodcutModel.prototype.fireChangeListeners = function() {
   var el0 = new JSElementList(this.listeners);
   for (var ei0 = 0; ei0 < el0.size(); ei0++) {
      var listener = el0.get(ei0);
      listener.stateChanged(new ChangeEvent(this));
   }
};

DEWoodcutModel.prototype.incrementColumnDigit = function(column, place) {
   if (place < DEWoodcutModel.N_DIGITS) {
      var digit = this.getColumnDigit(column, place);
      if (digit === 9) {
         this.setColumnDigit(column, place, 0);
         this.incrementColumnDigit(column, place + 1);
      } else {
         this.setColumnDigit(column, place, digit + 1);
      }
   }
};

DEWoodcutModel.prototype.saveWheelState = function() {
   for (var i = 0; i < DEWoodcutModel.N_COLUMNS; i++) {
      for (var j = 0; j < DEWoodcutModel.N_DIGITS; j++) {
         this.oldWheels[i][j] = this.wheels[i][j];
      }
   }
};

DEWoodcutModel.N_COLUMNS = 3;
DEWoodcutModel.N_DIGITS = 6;
DEWoodcutModel.DIGIT_STEPS = 7;

/* DEWoodcutView.js */

var DEWoodcutView = function(model) {
   JSCanvas.call(this);
   this.engine = model;
   this.engine.addChangeListener(this);
   this.initImages();
   this.translate(DEWoodcutView.LEFT_MARGIN, DEWoodcutView.TOP_MARGIN);
   this.setBackground(DEWoodcutView.CANVAS_BACKGROUND);
   this.selectedColumn = -1;
   this.setFocusTraversalKeysEnabled(false);
};

DEWoodcutView.prototype = 
   jslib.inheritPrototype(JSCanvas, "DEWoodcutView extends JSCanvas");
DEWoodcutView.prototype.constructor = DEWoodcutView;
DEWoodcutView.prototype.$class = 
   new Class("DEWoodcutView", DEWoodcutView);

DEWoodcutView.prototype.stateChanged = function(e) {
   this.repaint();
};

DEWoodcutView.prototype.paintComponent = function(g) {
   g.setColor(DEWoodcutView.CANVAS_BACKGROUND);
   g.fillRect(0, 0, DEWoodcutView.VIEW_WIDTH, DEWoodcutView.VIEW_HEIGHT);
   g.setColor(Color.BLACK);
   this.draw(g);
};

DEWoodcutView.prototype.getEngine = function() {
   return this.engine;
};

DEWoodcutView.prototype.translate = function(x, y) {
   this.x0 = x;
   this.y0 = y;
};

DEWoodcutView.prototype.getWheelIndex = function(x, y) {
   x /= this.getScaleFactor();
   y /= this.getScaleFactor();
   for (var i = 0; i < DEWoodcutView.NCOLUMNS; i++) {
      for (var j = 0; j < DEWoodcutView.NDIGITS - i; j++) {
         if (DEWoodcutView.COLUMN_CAGES[i][j].contains(x - this.x0, y - this.y0)) {
            return new Point(i, j);
         }
      }
   }
   return null;
};

DEWoodcutView.prototype.draw = function(g) {
   this.drawHandle(g);
   this.drawMachine(g);
   this.drawGears(g);
   this.drawColumns(g);
   this.drawCycleCount(g);
};

DEWoodcutView.prototype.setSelectedColumn = function(column) {
   this.selectedColumn = column;
};

DEWoodcutView.prototype.getSelectedColumn = function() {
   return this.selectedColumn;
};

DEWoodcutView.prototype.drawHandle = function(g) {
   var g2 = g.create(this.x0 + DEWoodcutView.HANDLE_DX, this.y0 + DEWoodcutView.HANDLE_DY, DEWoodcutView.HANDLE_WIDTH, DEWoodcutView.HANDLE_HEIGHT);
   g2.drawImage(this.handle, this.engine.getHandleOffset(), 0, this);
   g2.dispose();
};

DEWoodcutView.prototype.drawMachine = function(g) {
   g.drawImage(this.machine, this.x0, this.y0, this);
};

DEWoodcutView.prototype.drawColumns = function(g) {
   var image = null;
   var offset = 0;
   for (var c = 0; c < DEWoodcutView.NCOLUMNS; c++) {
      for (var d = 0; d < DEWoodcutView.NDIGITS - c; d++) {
         if (c % 2 === 0) {
            image = this.digitsDown;
            offset = DEWoodcutView.DIGIT_DOWN_OFFSET;
            offset += (9 - this.engine.getColumnDigit(c, d)) * DEWoodcutView.DIGIT_WIDTH;
            offset -= 3 * this.engine.getColumnOffset(c, d);
         } else {
            image = this.digitsUp;
            offset = DEWoodcutView.DIGIT_UP_OFFSET;
            offset += this.engine.getColumnDigit(c, d) * DEWoodcutView.DIGIT_WIDTH;
            offset += 3 * this.engine.getColumnOffset(c, d);
         }
         var r = DEWoodcutView.COLUMN_CAGES[c][d];
         var g2 = g.create(this.x0 + r.x, this.y0 + r.y, r.width, r.height);
         var mask = (c === this.selectedColumn) ? this.selectedMask : this.wheelMask;
         g2.drawImage(mask, 0, 0, this);
         g2.drawImage(image, -offset, 0, this);
         g2.dispose();
      }
   }
};

DEWoodcutView.prototype.drawCycleCount = function(g) {
   var cycleCount = this.engine.getCycleCount();
   for (var k = 0; k < DEWoodcutView.CYCLE_DIGITS; k++) {
      var digit = cycleCount % 10;
      cycleCount = toInt((cycleCount / 10));
      var offset = DEWoodcutView.DIGIT_DOWN_OFFSET + (9 - digit) * DEWoodcutView.DIGIT_WIDTH;
      var r = DEWoodcutView.CYCLE_CAGES[k];
      var g2 = g.create(this.x0 + r.x, this.y0 + r.y, r.width, r.height);
      g2.drawImage(this.wheelMask, 0, 0, this);
      g2.drawImage(this.digitsDown, -offset, 0, this);
      g2.dispose();
   }
};

DEWoodcutView.prototype.drawGears = function(g) {
   for (var i = 0; i < DEWoodcutView.GEAR_CAGES.length; i++) {
      var r = DEWoodcutView.GEAR_CAGES[i];
      var g2 = g.create(this.x0 + r.x, this.y0 + r.y, r.width, r.height);
      var offset = this.engine.getHandleOffset() % r.width;
      var x = DEWoodcutView.GEAR_DIRECTION[i] * offset - r.width;
      g2.drawImage(this.gearTeeth, x, 0, this);
      g2.dispose();
   }
};

DEWoodcutView.prototype.initImages = function() {
   this.machine = new JSImage("images/DEMachine.png");
   this.wheelMask = new JSImage("images/DEWheelMask.png");
   this.selectedMask = new JSImage("images/DESelectedMask.png");
   this.digitsUp = new JSImage("images/DEDigitsUp.png");
   this.digitsDown = new JSImage("images/DEDigitsDown.png");
   this.gearTeeth = new JSImage("images/DEGearTeeth.png");
   this.handle = new JSImage("images/DEHandle.png");
};

DEWoodcutView.COLUMN_CAGE_0 = [
   new Rectangle(129, 576, 65, 15),
   new Rectangle(127, 483, 65, 15),
   new Rectangle(126, 391, 65, 15),
   new Rectangle(124, 297, 65, 15),
   new Rectangle(123, 204, 65, 15),
   new Rectangle(122, 111, 65, 15),
];

DEWoodcutView.COLUMN_CAGE_1 = [
   new Rectangle(265, 537, 65, 15),
   new Rectangle(265, 444, 65, 15),
   new Rectangle(265, 352, 65, 15),
   new Rectangle(264, 258, 65, 15),
   new Rectangle(262, 164, 65, 15),
];

DEWoodcutView.COLUMN_CAGE_2 = [
   new Rectangle(403, 498, 65, 15),
   new Rectangle(403, 406, 65, 15),
   new Rectangle(403, 312, 65, 15),
   new Rectangle(402, 218, 65, 15)
];

DEWoodcutView.COLUMN_CAGES = [
   DEWoodcutView.COLUMN_CAGE_0,
   DEWoodcutView.COLUMN_CAGE_1,
   DEWoodcutView.COLUMN_CAGE_2
];

DEWoodcutView.CYCLE_CAGES = [
   new Rectangle(401, 125, 65, 14),
   new Rectangle(401, 110, 65, 14),
   new Rectangle(401, 95, 65, 14),
   new Rectangle(401, 68, 65, 15)
];

DEWoodcutView.GEAR_CAGES = [
   new Rectangle(104, 9, 99, 7),
   new Rectangle(91, 33, 48, 7),
   new Rectangle(168, 33, 39, 7),
   new Rectangle(236, 8, 76, 8),
   new Rectangle(240, 48, 94, 8),
   new Rectangle(376, 8, 94, 8)
];

DEWoodcutView.GEAR_DIRECTION = [
   -1, -1, -1, 1, 1, -1
];

DEWoodcutView.VIEW_WIDTH = 570;
DEWoodcutView.VIEW_HEIGHT = 740;
DEWoodcutView.LEFT_MARGIN = 10;
DEWoodcutView.TOP_MARGIN = 10;
DEWoodcutView.NCOLUMNS = 3;
DEWoodcutView.NDIGITS = 6;
DEWoodcutView.NGEARS = 6;
DEWoodcutView.GEAR_MAX = 75;
DEWoodcutView.GEAR_RADIUS = 43;
DEWoodcutView.CYCLE_DIGITS = 4;
DEWoodcutView.DIGIT_WIDTH = 18;
DEWoodcutView.DIGIT_UP_OFFSET = 29;
DEWoodcutView.DIGIT_DOWN_OFFSET = 29;
DEWoodcutView.HANDLE_DX = 7;
DEWoodcutView.HANDLE_DY = 14;
DEWoodcutView.HANDLE_WIDTH = 175;
DEWoodcutView.HANDLE_HEIGHT = 90;
DEWoodcutView.CANVAS_BACKGROUND = new Color(0xCCFFFF);
DEWoodcutView.COLUMN_BGCOLOR = new Color(0xCCFFFF);
DEWoodcutView.SHADE_COLOR = new Color(0x996633);

/* DifferenceEngine.js */

var DifferenceEngine = function() {
   JSProgram.call(this);
   this.createProgramFrame();
   this.setTitle("Difference Engine");
   this.setLayout(new DELayout());
   this.model = new DEModel();
   this.view = new DEView(this.model);
   this.printer = new DEPrinter(this.model, this.view);
   this.controller = new DEController(this.model, this.view);
   this.add(this.view, "view");
   this.add(this.printer, "printer");
   this.model.addChangeListener(this.printer);
   this.controller.init(this);
   this.setBackground(DEC.APPLICATION_BACKGROUND);
   this.resetControl = new ResetControl();
   this.resetControl.addActionListener(this);
   this.addControl(this.resetControl);
   this.stepControl = new StepControl();
   this.stepControl.addActionListener(this);
   this.addControl(this.stepControl);
   this.pack();
   this.setVisible(true);
   this.setMinimumSize(this.getMinimumSize());
};

DifferenceEngine.prototype = 
   jslib.inheritPrototype(JSProgram, "DifferenceEngine extends JSProgram");
DifferenceEngine.prototype.constructor = DifferenceEngine;
DifferenceEngine.prototype.$class = 
   new Class("DifferenceEngine", DifferenceEngine);

DifferenceEngine.prototype.run = function() {
   this.view.repaint();
   this.printer.repaint();
};

DifferenceEngine.prototype.actionPerformed = function(e) {
   if (jslib.equals(e.getActionCommand(), "Reset")) {
      this.model.clear();
      this.printer.clear();
   } else if (jslib.equals(e.getActionCommand(), "Step")) {
      this.view.setSelectedColumn(-1);
      this.model.step();
   }
};

DifferenceEngine.main = function(args) {
   new DifferenceEngine().start();
};


/* Exports */

return {
   DEC : DEC,
   DEController : DEController,
   DELayout : DELayout,
   DEModel : DEModel,
   DEPrinter : DEPrinter,
   DEView : DEView,
   DEWoodcut : DEWoodcut,
   DEWoodcutController : DEWoodcutController,
   DEWoodcutModel : DEWoodcutModel,
   DEWoodcutView : DEWoodcutView,
   DifferenceEngine : DifferenceEngine
};

});
