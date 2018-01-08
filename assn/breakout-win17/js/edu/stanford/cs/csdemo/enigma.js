/*
 * File: enigma.js
 * Created on Sat Oct 17 18:17:04 PDT 2015 by java2js
 * --------------------------------------------------
 * This file was generated mechanically by the java2js utility.
 * Permanent edits must be made in the Java file.
 */

define([ "jslib",
         "edu/stanford/cs/controller",
         "edu/stanford/cs/java2js",
         "java/awt",
         "java/lang",
         "java/util",
         "javax/swing" ],

function(jslib,
         edu_stanford_cs_controller,
         edu_stanford_cs_java2js,
         java_awt,
         java_lang,
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
var JSProgram = edu_stanford_cs_java2js.JSProgram;
var BasicStroke = java_awt.BasicStroke;
var Color = java_awt.Color;
var Dimension = java_awt.Dimension;
var Font = java_awt.Font;
var FontMetrics = java_awt.FontMetrics;
var Graphics = java_awt.Graphics;
var Graphics2D = java_awt.Graphics2D;
var Point = java_awt.Point;
var Rectangle = java_awt.Rectangle;
var KeyEvent = java_awt.KeyEvent;
var KeyListener = java_awt.KeyListener;
var MouseEvent = java_awt.MouseEvent;
var MouseListener = java_awt.MouseListener;
var Character = java_lang.Character;
var Class = java_lang.Class;
var RuntimeException = java_lang.RuntimeException;
var ArrayList = java_util.ArrayList;
var Arrays = java_util.Arrays;
var Comparator = java_util.Comparator;
var JComponent = javax_swing.JComponent;
var ChangeEvent = javax_swing.ChangeEvent;
var ChangeListener = javax_swing.ChangeListener;

/* EC.js */

var EC = function() {
   /* Empty */
};

EC.KEY_DOWN_COLOR = Color.WHITE;
EC.KEY_UP_COLOR = new Color(0xCCCCCC);
EC.LAMP_ON_COLOR = Color.YELLOW;
EC.LAMP_OFF_COLOR = EC.KEY_UP_COLOR;
EC.LAMP_DISABLED_COLOR = EC.KEY_DOWN_COLOR;
EC.ACTIVE_COLOR = Color.RED;
EC.CANVAS_BACKGROUND = new Color(0xCCFFFF);
EC.KEY_FONT = Font.decode("SansSerif-20");
EC.STECKER_KEY_FONT = Font.decode("SansSerif-18");
EC.MESSAGE_FONT = Font.decode("Monospaced-bold-12");
EC.COUNTER_FONT = Font.decode("SansSerif-18");
EC.LABEL_FONT = Font.decode("Serif-8");
EC.LAMP_FONT = Font.decode("SansSerif-bold-12");
EC.ACTIVE_LINE_WIDTH = 3;
EC.KEY_SIZE = 35;
EC.KEY_SEP_X = 16;
EC.KEY_SEP_Y = 15;
EC.KEY_DELTA = 13;
EC.KEYBOARD_WIDTH = 10 * (EC.KEY_SIZE + EC.KEY_SEP_X);
EC.KEYBOARD_HEIGHT = 3 * (EC.KEY_SIZE + EC.KEY_SEP_Y);
EC.KEYBOARD_SEP = 16;
EC.RESET_SIZE = 60;
EC.SPACE_SIZE = 60;
EC.TOP_MARGIN = 18;
EC.LEFT_MARGIN = 20;
EC.CONTACT_WIDTH = 10;
EC.CONTACT_HEIGHT = 9;
EC.CONTACT_MARGIN = 3;
EC.CONTACT_SEP = 6;
EC.CHANNEL_DELTA = 10;
EC.CHANNEL_RADIUS = 7;
EC.ROTOR_WIDTH = 72;
EC.CONNECTOR_WIDTH = 40;
EC.REFLECTOR_WIDTH = 70;
EC.STECKERBOARD_WIDTH = 70;
EC.COUNTER_WIDTH = 25;
EC.COUNTER_HEIGHT = 25;
EC.COUNTER_SEP = 8;
EC.LABEL_SEP = 3;
EC.CANVAS_WIDTH = 800;
EC.CANVAS_HEIGHT = 650;
EC.MESSAGE_WIDTH = EC.CANVAS_WIDTH;
EC.MESSAGE_HEIGHT = 40;
EC.EVEN_LAMP_OFFSET = 25;
EC.ODD_LAMP_OFFSET = 50;
EC.LAMP_SIZE = 18;

/* Enigma.js */

var Enigma = function() {
   JSProgram.call(this);
   this.createProgramFrame();
   this.setTitle("Enigma");
   var em = new EnigmaModel();
   em.addRotor(EnigmaRotor.createStandardRotor(-1));
   em.addRotor(EnigmaRotor.createStandardRotor(-2));
   em.addRotor(EnigmaRotor.createStandardRotor(-3));
   em.setSteckerboard(EnigmaSteckerboard.createStandardSteckerboard());
   var view = new EnigmaView(em);
   this.add(view, "view");
   this.setPreferredSize(new Dimension(EC.CANVAS_WIDTH, EC.CANVAS_HEIGHT));
   this.pack();
   this.setVisible(true);
};

Enigma.prototype = 
   jslib.inheritPrototype(JSProgram, "Enigma extends JSProgram");
Enigma.prototype.constructor = Enigma;
Enigma.prototype.$class = 
   new Class("Enigma", Enigma);

Enigma.prototype.run = function() {
   /* Empty */
};

Enigma.main = function(args) {
   new Enigma().start();
};


/* EnigmaConnectorView.js */

var EnigmaConnectorView = function(x, y) {
   this.x0 = x;
   this.y0 = y;
};

EnigmaConnectorView.prototype.paint = function(g) {
   g.setColor(Color.BLACK);
   for (var i = 0; i < 26; i++) {
      this.paintConnection(g, i);
   }
   g.setColor(Color.BLACK);
};

EnigmaConnectorView.prototype.paintConnection = function(g, start) {
   var x1 = this.x0;
   var y1 = this.y0 + EC.CONTACT_MARGIN +
   start * (EC.CONTACT_HEIGHT + EC.CONTACT_SEP);
   var x2 = x1 + EC.CONNECTOR_WIDTH - EC.CONTACT_WIDTH + 1;
   g.fillRect(x1, y1, EC.CONTACT_WIDTH, EC.CONTACT_HEIGHT + 1);
   g.fillRect(x2, y1, EC.CONTACT_WIDTH, EC.CONTACT_HEIGHT + 1);
   x1 += EC.CONTACT_WIDTH;
   y1 += EC.CONTACT_HEIGHT / 2;
   g.drawLine(x1, y1, x2, y1);
};


/* EnigmaKeyboardView.js */

var EnigmaKeyboardView = function(x, y) {
   this.x0 = x;
   this.y0 = y;
   this.initKeyboard();
};

EnigmaKeyboardView.prototype.paint = function(g) {
   for (var index = 0; index < 26; index++) {
      this.paintKey(g, index, false);
   }
};

EnigmaKeyboardView.prototype.getKeyAtLocation = function(x, y) {
   var r = EC.KEY_SIZE / 2;
   for (var index = 0; index < 26; index++) {
      var dx = this.keys[index].x + r - x;
      var dy = this.keys[index].y + r - y;
      if (dx * dx + dy * dy < r * r) return index;
   }
   return -1;
};

EnigmaKeyboardView.prototype.initKeyboard = function() {
   this.keys = jslib.newArray(26);
   var dy = EC.KEY_SEP_Y + EC.KEY_SIZE;
   this.initKeyboardRow(this.x0 + EC.KEY_DELTA, this.y0, "QWERTZUIO");
   this.initKeyboardRow(this.x0 + 2 * EC.KEY_DELTA, this.y0 + dy, "ASDFGHJK");
   this.initKeyboardRow(this.x0 + EC.KEY_DELTA, this.y0 + 2 * dy, "PYXCVBNML");
};

EnigmaKeyboardView.prototype.initKeyboardRow = function(x, y, row) {
   for (var i = 0; i < row.length; i++) {
      this.keys[row.charCodeAt(i) - toInt('A')] = new Point(x, y);
      x += EC.KEY_SIZE + EC.KEY_SEP_X;
   }
};

EnigmaKeyboardView.prototype.paintKey = function(g, index, activated) {
   var x = this.keys[index].x;
   var y = this.keys[index].y;
   g.setColor((activated) ? EC.KEY_DOWN_COLOR : EC.KEY_UP_COLOR);
   g.fillOval(x, y, EC.KEY_SIZE, EC.KEY_SIZE);
   g.setColor(Color.BLACK);
   g.drawOval(x, y, EC.KEY_SIZE, EC.KEY_SIZE);
   g.setFont(EC.KEY_FONT);
   var str = "" + toStr((index + toInt('A')));
   var fm = g.getFontMetrics();
   x += (EC.KEY_SIZE - fm.stringWidth(str)) / 2;
   y += (EC.KEY_SIZE + fm.getAscent()) / 2 - 2;
   g.drawString(str, x, y);
};


/* EnigmaLampView.js */

var EnigmaLampView = function(x, y) {
   this.x0 = x;
   this.y0 = y;
};

EnigmaLampView.prototype.getLocation = function() {
   return new Point(this.x0, this.y0);
};

EnigmaLampView.prototype.move = function(dx, dy) {
   this.x0 += dx;
   this.y0 += dy;
};

EnigmaLampView.prototype.paint = function(g) {
   g.setColor(Color.BLACK);
   for (var i = 0; i < 26; i++) {
      this.paintConnection(g, i);
   }
   g.setColor(Color.BLACK);
   for (var i = 0; i < 26; i++) {
      this.paintLamp(g, i, EC.LAMP_OFF_COLOR, Color.BLACK, Color.BLACK);
   }
};

EnigmaLampView.prototype.getLampAtLocation = function(x, y) {
   for (var index = 0; index < 26; index++) {
      if (this.getLampBounds(index).contains(x, y)) return index;
   }
   return -1;
};

EnigmaLampView.prototype.paintConnection = function(g, index) {
   var x1 = this.x0;
   var y1 = this.y0 + EC.CONTACT_MARGIN +
   index * (EC.CONTACT_HEIGHT + EC.CONTACT_SEP);
   g.fillRect(x1, y1, EC.CONTACT_WIDTH, EC.CONTACT_HEIGHT + 1);
   x1 += EC.CONTACT_WIDTH;
   y1 += EC.CONTACT_HEIGHT / 2;
   var x2 = x1 +
   ((index % 2 === 0) ? EC.EVEN_LAMP_OFFSET : EC.ODD_LAMP_OFFSET);
   g.drawLine(x1, y1, x2, y1);
};

EnigmaLampView.prototype.paintLamp = function(g, index, lampColor, borderColor, textColor) {
   var bounds = this.getLampBounds(index);
   var x = bounds.x;
   var y = bounds.y;
   g.setColor(lampColor);
   g.fillOval(x, y, EC.LAMP_SIZE, EC.LAMP_SIZE);
   g.setColor(borderColor);
   g.drawOval(x, y, EC.LAMP_SIZE, EC.LAMP_SIZE);
   g.setFont(EC.LAMP_FONT);
   var str = "" + toStr((index + toInt('A')));
   var fm = g.getFontMetrics();
   x += (EC.LAMP_SIZE - fm.stringWidth(str) + 1) / 2;
   y += (EC.LAMP_SIZE + fm.getAscent()) / 2 - 1;
   g.setColor(textColor);
   g.drawString(str, x, y);
};

EnigmaLampView.prototype.getLampBounds = function(index) {
   var x = this.x0 + EC.CONTACT_WIDTH +
   ((index % 2 === 0) ? EC.EVEN_LAMP_OFFSET : EC.ODD_LAMP_OFFSET);
   var y = this.y0 + EC.CONTACT_MARGIN +
   index * (EC.CONTACT_HEIGHT + EC.CONTACT_SEP) +
   (EC.CONTACT_HEIGHT - EC.LAMP_SIZE - 1) / 2;
   return new Rectangle(x, y, EC.LAMP_SIZE, EC.LAMP_SIZE);
};


/* EnigmaMessageView.js */

var EnigmaMessageView = function() {
   JComponent.call(this);
   this.setBackground(Color.WHITE);
   this.first = true;
   this.clear();
};

EnigmaMessageView.prototype = 
   jslib.inheritPrototype(JComponent, "EnigmaMessageView extends JComponent");
EnigmaMessageView.prototype.constructor = EnigmaMessageView;
EnigmaMessageView.prototype.$class = 
   new Class("EnigmaMessageView", EnigmaMessageView);

EnigmaMessageView.prototype.append = function(chPlain, chEncoded) {
   this.plaintext += chPlain;
   this.ciphertext += chEncoded;
   this.repaint();
};

EnigmaMessageView.prototype.clear = function() {
   this.plaintext = "";
   this.ciphertext = "";
   this.repaint();
};

EnigmaMessageView.prototype.paintComponent = function(g) {
   var size = this.getSize();
   g.setColor(Color.WHITE);
   g.fillRect(0, 0, size.width, size.height);
   g.setColor(Color.BLACK);
   g.setFont(EC.MESSAGE_FONT);
   var fm = g.getFontMetrics();
   var yc = size.height / 2;
   var y1 = (yc + fm.getAscent()) / 2 - 1;
   var y2 = size.height - (yc - y1) - 1;
   if (this.plaintext.length !== 0) {
      g.drawString(this.plaintext, 5, y1);
      g.drawString(this.ciphertext, 5, y2);
   }
   g.drawRect(0, 0, size.width - 1, size.height - 1);
   g.drawLine(0, yc, size.width - 1, yc);
   if (this.first) this.requestFocus();
   this.first = false;
};


/* EnigmaModel.js */

var EnigmaModel = function() {
   this.listeners = new ArrayList();
   this.rotors = new ArrayList();
   this.reflector = EnigmaReflector.createStandardReflector(0);
   this.steckerboard = null;
   this.clear();
};

EnigmaModel.prototype.addRotor = function(rotor) {
   this.rotors.add(rotor);
   this.fireChangeListeners();
};

EnigmaModel.prototype.addChangeListener = function(listener) {
   this.listeners.add(listener);
};

EnigmaModel.prototype.clear = function() {
   var el0 = new JSElementList(this.rotors);
   for (var ei0 = 0; ei0 < el0.size(); ei0++) {
      var r = el0.get(ei0);
      r.set(0);
   }
   this.input = "";
   this.output = "";
   this.activeKeyIndex = -1;
   this.fireChangeListeners();
};

EnigmaModel.prototype.step = function() {
   var index = 0;
   while (index < this.getRotorCount() && this.getRotor(index).advance()) {
      index++;
   }
   this.fireChangeListeners();
};

EnigmaModel.prototype.isCallable = function() {
   return false;
};

EnigmaModel.prototype.getStackDepth = function() {
   return 0;
};

EnigmaModel.prototype.getRotorCount = function() {
   return this.rotors.size();
};

EnigmaModel.prototype.getRotor = function(index) {
   return this.rotors.get(index);
};

EnigmaModel.prototype.getReflector = function() {
   return this.reflector;
};

EnigmaModel.prototype.setReflector = function(ref) {
   this.reflector = ref;
};

EnigmaModel.prototype.getSteckerboard = function() {
   return this.steckerboard;
};

EnigmaModel.prototype.setSteckerboard = function(s) {
   this.steckerboard = s;
};

EnigmaModel.prototype.getInput = function() {
   return this.input;
};

EnigmaModel.prototype.getOutput = function() {
   return this.output;
};

EnigmaModel.prototype.appendOutputChar = function(ch) {
   this.output += ch;
};

EnigmaModel.prototype.pressKey = function(keyIndex) {
   this.activeKeyIndex = keyIndex;
   this.input += toStr((keyIndex + toInt('A')));
   this.appendOutputChar(toStr((this.map(keyIndex) + toInt('A'))));
   this.step();
};

EnigmaModel.prototype.releaseKey = function() {
   this.activeKeyIndex = -1;
   this.fireChangeListeners();
};

EnigmaModel.prototype.getActiveKeyIndex = function() {
   return this.activeKeyIndex;
};

EnigmaModel.prototype.map = function(index) {
   if (this.steckerboard !== null) index = this.steckerboard.mapRTL(index);
   for (var i = 0; i < this.getRotorCount(); i++) {
      index = this.getRotor(i).mapRTL(index);
   }
   index = this.getReflector().map(index);
   for (var i = this.getRotorCount() - 1; i >= 0; i--) {
      index = this.getRotor(i).mapLTR(index);
   }
   if (this.steckerboard !== null) index = this.steckerboard.mapLTR(index);
   return index;
};

EnigmaModel.prototype.fireChangeListeners = function() {
   var el0 = new JSElementList(this.listeners);
   for (var ei0 = 0; ei0 < el0.size(); ei0++) {
      var listener = el0.get(ei0);
      listener.stateChanged(new ChangeEvent(this));
   }
};


/* EnigmaReflector.js */

var EnigmaReflector = function(permutation) {
   EnigmaReflector.checkPermutation(permutation);
   this.mapAcross = permutation;
};

EnigmaReflector.createStandardReflector = function(n) {
   switch (n) {
      case 0: return new EnigmaReflector("IXUHFEZDAOMTKQJWNSRLCYPBVG");
      case 1: return new EnigmaReflector("YRUHQSLDPXNGOKMIEBFZCWVJAT");
      case 2: return new EnigmaReflector("FVPJIAOYEDRZXWGCTKUQSBNMHL");
      case 3: return new EnigmaReflector("ENKQAUYWJICOPBLMDXZVFTHRGS");
      case 4: return new EnigmaReflector("RDOBJNTKVEHMLFCWZAXGYIPSUQ");
   }
   throw new RuntimeException("Standard reflector numbers must be" +
   " between 0 and 4");
};

EnigmaReflector.prototype.map = function(index) {
   return this.mapAcross.charCodeAt(index) - toInt('A');
};

EnigmaReflector.prototype.getPermutation = function() {
   return this.mapAcross;
};

EnigmaReflector.checkPermutation = function(permutation) {
   EnigmaRotor.checkPermutation(permutation);
   for (var start = 0; start < 26; start++) {
      var finish = permutation.charCodeAt(start) - toInt('A');
      if (start === finish) {
         throw new RuntimeException(toStr((start + toInt('A')))+
         " maps to itself");
      }
      if (start !== permutation.charCodeAt(finish) - toInt('A')) {
         throw new RuntimeException("Permutation is not symmetric");
      }
   }
};


/* EnigmaReflectorView.js */

var EnigmaReflectorView = function(target, x, y) {
   this.reflector = target;
   this.channels = this.createChannels(this.reflector.getPermutation());
   this.nLevels = -1;
   var el0 = new JSElementList(this.channels);
   for (var ei0 = 0; ei0 < el0.size(); ei0++) {
      var level = el0.get(ei0);
      this.nLevels = Math.max(this.nLevels, level);
   }
   this.xsep = (EC.REFLECTOR_WIDTH - EC.CONTACT_WIDTH - EC.CONTACT_MARGIN) / (this.nLevels + 1);
   this.x0 = x;
   this.y0 = y;
};

EnigmaReflectorView.prototype.paint = function(g) {
   var h = 26 * (EC.CONTACT_HEIGHT + EC.CONTACT_SEP);
   g.setColor(Color.WHITE);
   g.fillRect(this.x0, this.y0, EC.REFLECTOR_WIDTH, h);
   g.setColor(Color.BLACK);
   g.drawRect(this.x0, this.y0, EC.REFLECTOR_WIDTH, h);
   for (var start = 0; start < 26; start++) {
      var finish = this.reflector.map(start);
      if (start > finish) this.paintConnection(g, start, finish);
   }
   g.setColor(Color.BLACK);
};

EnigmaReflectorView.prototype.paintConnection = function(g, start, finish) {
   if (start > finish) {
      var tmp = start;
      start = finish;
      finish = tmp;
   }
   var xcontact = this.x0 + EC.REFLECTOR_WIDTH - EC.CONTACT_WIDTH;
   var y1 = this.y0 + EC.CONTACT_MARGIN +
   start * (EC.CONTACT_HEIGHT + EC.CONTACT_SEP);
   var y2 = this.y0 + EC.CONTACT_MARGIN +
   finish * (EC.CONTACT_HEIGHT + EC.CONTACT_SEP);
   g.fillRect(xcontact, y1, EC.CONTACT_WIDTH + 1, EC.CONTACT_HEIGHT + 1);
   g.fillRect(xcontact, y2, EC.CONTACT_WIDTH + 1, EC.CONTACT_HEIGHT + 1);
   var xchannel = xcontact - this.channels[start] * this.xsep - EC.CHANNEL_RADIUS;
   y1 += EC.CONTACT_HEIGHT / 2;
   y2 += EC.CONTACT_HEIGHT / 2;
   var diameter = 2 * EC.CHANNEL_RADIUS;
   g.drawLine(xcontact, y1, xchannel + EC.CHANNEL_RADIUS, y1);
   g.drawArc(xchannel, y1, diameter, diameter, 90, 90);
   g.drawLine(xchannel, y1 + EC.CHANNEL_RADIUS, xchannel, y2 - EC.CHANNEL_RADIUS);
   g.drawArc(xchannel, y2 - diameter, diameter, diameter, 180, 90);
   g.drawLine(xchannel + EC.CHANNEL_RADIUS, y2, xcontact, y2);
};

EnigmaReflectorView.prototype.compare = function(s1, s2) {
   return EnigmaReflectorView.distance(s1) - EnigmaReflectorView.distance(s2);
};

EnigmaReflectorView.prototype.createChannels = function(permutation) {
   var connections = jslib.newArray(13);
   var nPairs = 0;
   for (var i = 0; i < 26; i++) {
      var from = toStr((toInt('A') + i));
      var to = toStr(permutation.charCodeAt(i));
      if (from < to) {
         connections[nPairs++] = from + "-" + to;
      }
   }
   Arrays.sort(connections, this);
   this.channels = jslib.newArray(26);
   for (var i = 0; i < 26; i++) {
      this.channels[i] = -1;
   }
   var el0 = new JSElementList(connections);
   for (var ei0 = 0; ei0 < el0.size(); ei0++) {
      var connection = el0.get(ei0);
      var start = connection.charCodeAt(0) - toInt('A');
      var finish = connection.charCodeAt(2) - toInt('A');
      var max = -1;
      for (var i = start; i <= finish; i++) {
         if (this.channels[i] > max) max = this.channels[i];
      }
      var level = max + 1;
      this.channels[start] = this.channels[finish] = level;
   }
   return this.channels;
};

EnigmaReflectorView.distance = function(s) {
   return Math.abs(s.charCodeAt(2) - s.charCodeAt(0));
};


/* EnigmaRotor.js */

var EnigmaRotor = function(permutation, offset, carry) {
   this.initPermutationArrays(permutation);
   this.ringOffset = offset;
   this.carryIndex = carry - toInt('A');
   this.setting = 0;
};

EnigmaRotor.createStandardRotor = function(n) {
   var offset = 0;
   var carry = toInt('Z');
   switch (n) {
      case 1: offset = 25; carry = toInt('Q'); break;
      case 2: offset = 13; carry = toInt('E'); break;
      case 3: offset =  4; carry = toInt('V'); break;
      case 4: offset = 18; carry = toInt('J'); break;
      case 5: offset =  8; carry = toInt('Z'); break;
   }
   switch (Math.abs(n)) {
    case 1:
      return new EnigmaRotor("EKMFLGDQVZNTOWYHXUSPAIBRCJ", offset, carry);
    case 2:
      return new EnigmaRotor("AJDKSIRUXBLHWTMCQGZNPYFVOE", offset, carry);
    case 3:
      return new EnigmaRotor("BDFHJLCPRTXVZNYEIWGAKMUSQO", offset, carry);
    case 4:
      return new EnigmaRotor("ESOVPZJAYQUIRHXLNFTGKDCMWB", offset, carry);
    case 5:
      return new EnigmaRotor("VZBRGITYUPSDNHLXAWMJQOFECK", offset, carry);
   }
   throw new RuntimeException("Standard rotor numbers must be between" +
   " 1 and 5");
};

EnigmaRotor.prototype.mapRTL = function(index) {
   return (this.rtl[(this.setting + index) % 26] + 26 + this.ringOffset - this.setting) % 26;
};

EnigmaRotor.prototype.mapLTR = function(index) {
   return (this.ltr[(26 + this.setting + index - this.ringOffset) % 26] + 26 - this.setting) % 26;
};

EnigmaRotor.prototype.set = function(index) {
   this.setting = index;
};

EnigmaRotor.prototype.get = function() {
   return this.setting;
};

EnigmaRotor.prototype.advance = function() {
   var carry = (this.carryIndex === this.setting);
   this.setting = (this.setting + 1) % 26;
   return carry;
};

EnigmaRotor.checkPermutation = function(permutation) {
   if (permutation.length !== 26) {
      throw new RuntimeException("Permutation length must be 26");
   }
   var bits = 0;
   for (var i = 0; i < 26; i++) {
      var ch = permutation.charCodeAt(i);
      if (ch < toInt('A') || ch > toInt('Z')) {
         throw new RuntimeException("Illegal character " + ch +
         " in permutation");
      }
      var mask = 1 << (ch - toInt('A'));
      if ((bits & mask) !== 0) {
         throw new RuntimeException("Duplicate character " + ch +
         " in permutation");
      }
      bits |= mask;
   }
};

EnigmaRotor.prototype.initPermutationArrays = function(permutation) {
   EnigmaRotor.checkPermutation(permutation);
   this.ltr = jslib.newArray(26);
   this.rtl = jslib.newArray(26);
   for (var p1 = 0; p1 < 26; p1++) {
      var p2 = permutation.charCodeAt(p1) - toInt('A');
      this.rtl[p1] = p2;
      this.ltr[p2] = p1;
   }
};


/* EnigmaRotorView.js */

var EnigmaRotorView = function(target, x, y) {
   this.rotor = target;
   this.x0 = x;
   this.y0 = y;
   this.xCounter = x + (EC.ROTOR_WIDTH - EC.COUNTER_WIDTH) / 2;
   this.yCounter = y - EC.COUNTER_HEIGHT - EC.COUNTER_SEP;
};

EnigmaRotorView.prototype.paint = function(g) {
   var h = 26 * (EC.CONTACT_HEIGHT + EC.CONTACT_SEP);
   g.setColor(Color.WHITE);
   g.fillRect(this.x0, this.y0, EC.ROTOR_WIDTH, h);
   g.setColor(Color.BLACK);
   g.drawRect(this.x0, this.y0, EC.ROTOR_WIDTH, h);
   this.paintCounter(g, this.xCounter, this.yCounter);
   for (var start = 0; start < 26; start++) {
      this.paintConnection(g, start, this.rotor.mapLTR(start));
   }
   g.setColor(Color.BLACK);
};

EnigmaRotorView.prototype.paintCounter = function(g, x, y) {
   g.setColor(Color.WHITE);
   g.fillRect(x, y, EC.COUNTER_WIDTH, EC.COUNTER_HEIGHT);
   g.setColor(Color.BLACK);
   g.drawRect(x, y, EC.COUNTER_WIDTH, EC.COUNTER_HEIGHT);
   g.setFont(EC.COUNTER_FONT);
   var str = "" + toStr((this.rotor.get() + toInt('A')));
   var fm = g.getFontMetrics();
   x += (EC.COUNTER_WIDTH - fm.stringWidth(str)) / 2;
   y += (EC.COUNTER_HEIGHT + fm.getAscent()) / 2 - 1;
   g.drawString(str, x, y);
};

EnigmaRotorView.prototype.isCounterClick = function(x, y) {
   if (x < this.xCounter || x > this.xCounter + EC.COUNTER_WIDTH) return false;
   if (y < this.yCounter || y > this.yCounter + EC.COUNTER_HEIGHT) return false;
   return true;
};

EnigmaRotorView.prototype.paintConnection = function(g, start, finish) {
   var x1 = this.x0;
   var y1 = this.y0 + EC.CONTACT_MARGIN +
   start * (EC.CONTACT_HEIGHT + EC.CONTACT_SEP);
   var y2 = this.y0 + EC.CONTACT_MARGIN +
   finish * (EC.CONTACT_HEIGHT + EC.CONTACT_SEP);
   var x2 = x1 + EC.ROTOR_WIDTH - EC.CONTACT_WIDTH + 1;
   g.fillRect(x1, y1, EC.CONTACT_WIDTH, EC.CONTACT_HEIGHT + 1);
   g.fillRect(x2, y2, EC.CONTACT_WIDTH, EC.CONTACT_HEIGHT + 1);
   x1 += EC.CONTACT_WIDTH;
   y1 += EC.CONTACT_HEIGHT / 2;
   y2 += EC.CONTACT_HEIGHT / 2;
   g.drawLine(x1, y1, x2, y2);
};


/* EnigmaSteckerboard.js */

var EnigmaSteckerboard = function(permutation) {
   EnigmaRotor.checkPermutation(permutation);
   this.ltr = jslib.newArray(26);
   this.rtl = jslib.newArray(26);
   for (var p1 = 0; p1 < 26; p1++) {
      var p2 = permutation.charCodeAt(p1) - toInt('A');
      this.rtl[p1] = p2;
      this.ltr[p2] = p1;
   }
};

EnigmaSteckerboard.prototype.mapRTL = function(index) {
   return this.rtl[index];
};

EnigmaSteckerboard.prototype.mapLTR = function(index) {
   return this.ltr[index];
};

EnigmaSteckerboard.createStandardSteckerboard = function() {
   return new EnigmaSteckerboard(EnigmaSteckerboard.PERMUTATION);
};

EnigmaSteckerboard.PERMUTATION = "ACBDEFGNIJKLSHOPQRMTUYWXVZ";

/* EnigmaSteckerboardView.js */

var EnigmaSteckerboardView = function(target, x, y) {
   this.steckerboard = target;
   this.x0 = x;
   this.y0 = y;
};

EnigmaSteckerboardView.prototype.paint = function(g) {
   var h = 26 * (EC.CONTACT_HEIGHT + EC.CONTACT_SEP);
   g.setColor(Color.WHITE);
   g.fillRect(this.x0, this.y0, EC.STECKERBOARD_WIDTH, h);
   g.setColor(Color.BLACK);
   g.drawRect(this.x0, this.y0, EC.STECKERBOARD_WIDTH, h);
   for (var start = 0; start < 26; start++) {
      this.paintConnection(g, start, this.steckerboard.mapLTR(start));
   }
   g.setColor(Color.BLACK);
};

EnigmaSteckerboardView.prototype.paintConnection = function(g, start, finish) {
   var x1 = this.x0;
   var y1 = this.y0 + EC.CONTACT_MARGIN +
   start * (EC.CONTACT_HEIGHT + EC.CONTACT_SEP);
   var y2 = this.y0 + EC.CONTACT_MARGIN +
   finish * (EC.CONTACT_HEIGHT + EC.CONTACT_SEP);
   var x2 = x1 + EC.STECKERBOARD_WIDTH - EC.CONTACT_WIDTH + 1;
   g.fillRect(x1, y1, EC.CONTACT_WIDTH, EC.CONTACT_HEIGHT + 1);
   g.fillRect(x2, y2, EC.CONTACT_WIDTH, EC.CONTACT_HEIGHT + 1);
   x1 += EC.CONTACT_WIDTH;
   y1 += EC.CONTACT_HEIGHT / 2;
   y2 += EC.CONTACT_HEIGHT / 2;
   g.drawLine(x1, y1, x2, y2);
};


/* EnigmaView.js */

var EnigmaView = function(enigma) {
   JSCanvas.call(this);
   this.em = enigma;
   this.setBackground(EC.CANVAS_BACKGROUND);
   this.initView();
   this.addMouseListener(this);
   this.addKeyListener(this);
   this.keyDown = false;
   this.requestFocus();
};

EnigmaView.prototype = 
   jslib.inheritPrototype(JSCanvas, "EnigmaView extends JSCanvas");
EnigmaView.prototype.constructor = EnigmaView;
EnigmaView.prototype.$class = 
   new Class("EnigmaView", EnigmaView);

EnigmaView.prototype.paintComponent = function(g) {
   var steckerboard = this.em.getSteckerboard();
   var nRotors = this.em.getRotorCount();
   var g2d = g;
   this.reflectorView.paint(g2d);
   for (var i = 0; i < nRotors; i++) {
      this.rotorViews[i].paint(g2d);
      this.connectorViews[i].paint(g2d);
   }
   if (steckerboard !== null) {
      this.connectorViews[nRotors].paint(g2d);
      this.steckerboardView.paint(g2d);
   }
   this.lampView.paint(g2d);
   this.keyboardView.paint(g2d);
   var start = this.em.getActiveKeyIndex();
   if (start === -1) return;
   var index = start;
   g2d.setStroke(new BasicStroke(EC.ACTIVE_LINE_WIDTH));
   g2d.setColor(EC.ACTIVE_COLOR);
   this.lampView.paintConnection(g2d, index);
   if (steckerboard !== null) {
      var left = steckerboard.mapRTL(index);
      this.steckerboardView.paintConnection(g2d, left, index);
      this.connectorViews[nRotors].paintConnection(g2d, left);
      index = left;
   }
   for (var i = 0; i < this.em.getRotorCount(); i++) {
      var left = this.em.getRotor(i).mapRTL(index);
      this.rotorViews[i].paintConnection(g2d, left, index);
      this.connectorViews[i].paintConnection(g2d, left);
      index = left;
   }
   var output = this.em.getReflector().map(index);
   this.reflectorView.paintConnection(g2d, index, output);
   index = output;
   for (var i = this.em.getRotorCount() - 1; i >= 0; i--) {
      var right = this.em.getRotor(i).mapLTR(index);
      this.connectorViews[i].paintConnection(g2d, index);
      this.rotorViews[i].paintConnection(g2d, index, right);
      index = right;
   }
   if (steckerboard !== null) {
      var right = steckerboard.mapLTR(index);
      this.connectorViews[nRotors].paintConnection(g2d, index);
      this.steckerboardView.paintConnection(g2d, index, right);
      index = right;
   }
   this.lampView.paintConnection(g2d, index);
   this.lampView.paintLamp(g2d, index, EC.LAMP_ON_COLOR, Color.RED, Color.BLACK);
   g2d.setStroke(new BasicStroke(1));
   this.lampView.paintLamp(g2d, start, EC.LAMP_DISABLED_COLOR, Color.BLACK, Color.BLACK);
   this.keyboardView.paintKey(g2d, start, true);
};

EnigmaView.prototype.mousePressed = function(e) {
   this.requestFocus();
   var x = e.getX();
   var y = e.getY();
   var index = this.lampView.getLampAtLocation(x, y);
   if (index === -1) index = this.keyboardView.getKeyAtLocation(x, y);
   if (index >= 0) {
      this.em.pressKey(index);
   } else {
      for (var i = 0; i < this.em.getRotorCount(); i++) {
         if (this.rotorViews[i].isCounterClick(x, y)) {
            this.em.getRotor(i).advance();
            break;
         }
      }
   }
   this.repaint();
};

EnigmaView.prototype.mouseReleased = function(e) {
   this.em.releaseKey();
   this.repaint();
};

EnigmaView.prototype.mouseClicked = function(e) {
   /* Empty */
};

EnigmaView.prototype.mouseEntered = function(e) {
   /* Empty */
};

EnigmaView.prototype.mouseExited = function(e) {
   /* Empty */
};

EnigmaView.prototype.keyPressed = function(e) {
   if (this.keyDown) return;
   var ch = e.getKeyCode();
   if (Character.isLetter(ch)) {
      this.keyDown = true;
      this.em.pressKey(Character.toUpperCase(ch) - toInt('A'));
      this.repaint();
   }
};

EnigmaView.prototype.keyReleased = function(e) {
   var ch = e.getKeyCode();
   if (Character.isLetter(ch)) {
      this.em.releaseKey();
      this.keyDown = false;
      this.repaint();
   }
};

EnigmaView.prototype.keyTyped = function(e) {
   /* Empty */
};

EnigmaView.prototype.initView = function() {
   var hasSteckerboard = this.em.getSteckerboard() !== null;
   var nRotors = this.em.getRotorCount();
   var nConnectors = (hasSteckerboard) ? nRotors + 1 : nRotors;
   var width = EC.REFLECTOR_WIDTH + nRotors * EC.ROTOR_WIDTH +
   (nRotors + 3) * EC.CONNECTOR_WIDTH;
   var height = 26 * (EC.CONTACT_HEIGHT + EC.CONTACT_SEP) +
   EC.COUNTER_HEIGHT + 2 * EC.COUNTER_SEP +
   2 * EC.KEYBOARD_SEP + EC.KEYBOARD_HEIGHT;
   var x = (EC.CANVAS_WIDTH - width) / 2;
   if (hasSteckerboard) {
      x -= (EC.STECKERBOARD_WIDTH + EC.CONNECTOR_WIDTH) / 2;
   }
   var y = (EC.CANVAS_HEIGHT - height) / 2 + 2 * EC.COUNTER_SEP +
   EC.COUNTER_HEIGHT;
   this.reflectorView = new EnigmaReflectorView(this.em.getReflector(), x, y);
   this.connectorViews = jslib.newArray(nConnectors);
   this.rotorViews = jslib.newArray(nRotors);
   x += EC.REFLECTOR_WIDTH;
   for (var i = nRotors - 1; i >= 0; i--) {
      this.connectorViews[i] = new EnigmaConnectorView(x, y);
      x += EC.CONNECTOR_WIDTH;
      this.rotorViews[i] = new EnigmaRotorView(this.em.getRotor(i), x, y);
      x += EC.ROTOR_WIDTH;
   }
   if (hasSteckerboard) {
      this.connectorViews[nRotors] = new EnigmaConnectorView(x, y);
      x += EC.CONNECTOR_WIDTH;
      this.steckerboardView = new EnigmaSteckerboardView(this.em.getSteckerboard(), x, y);
      x += EC.STECKERBOARD_WIDTH;
   }
   this.lampView = new EnigmaLampView(x, y);
   y += 26 * (EC.CONTACT_HEIGHT + EC.CONTACT_SEP) + EC.KEYBOARD_SEP;
   x = (EC.CANVAS_WIDTH - EC.KEYBOARD_WIDTH) / 2;
   this.keyboardView = new EnigmaKeyboardView(x, y);
};


/* Exports */

return {
   EC : EC,
   Enigma : Enigma,
   EnigmaModel : EnigmaModel,
   EnigmaReflector : EnigmaReflector,
   EnigmaReflectorView : EnigmaReflectorView,
   EnigmaRotor : EnigmaRotor,
   EnigmaRotorView : EnigmaRotorView,
   EnigmaSteckerboard : EnigmaSteckerboard,
   EnigmaSteckerboardView : EnigmaSteckerboardView,
   EnigmaView : EnigmaView
};

});
