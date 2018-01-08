/*
 * File: fsm.js
 * Created on Sun May 31 08:21:49 PDT 2015 by java2js
 * --------------------------------------------------
 * This file was generated mechanically by the java2js utility.
 * Permanent edits must be made in the Java file.
 */

define([ "jslib",
         "edu/stanford/cs/controller",
         "edu/stanford/cs/java2js",
         "edu/stanford/cs/jscontrols/JSControl",
         "edu/stanford/cs/jscontrols/LoadControl",
         "edu/stanford/cs/jscontrols/ResetControl",
         "edu/stanford/cs/jsdialog",
         "java/awt",
         "java/lang",
         "java/util",
         "javax/swing" ],

function(jslib,
         edu_stanford_cs_controller,
         edu_stanford_cs_java2js,
         edu_stanford_cs_jscontrols_JSControl,
         edu_stanford_cs_jscontrols_LoadControl,
         edu_stanford_cs_jscontrols_ResetControl,
         edu_stanford_cs_jsdialog,
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
var JSPlatform = edu_stanford_cs_java2js.JSPlatform;
var JSProgram = edu_stanford_cs_java2js.JSProgram;
var JSControl = edu_stanford_cs_jscontrols_JSControl.JSControl;
var LoadControl = edu_stanford_cs_jscontrols_LoadControl.LoadControl;
var ResetControl = edu_stanford_cs_jscontrols_ResetControl.ResetControl;
var JSLoadDialog = edu_stanford_cs_jsdialog.JSLoadDialog;
var Color = java_awt.Color;
var Dimension = java_awt.Dimension;
var Font = java_awt.Font;
var FontMetrics = java_awt.FontMetrics;
var Graphics = java_awt.Graphics;
var Graphics2D = java_awt.Graphics2D;
var Point = java_awt.Point;
var Polygon = java_awt.Polygon;
var ActionEvent = java_awt.ActionEvent;
var ActionListener = java_awt.ActionListener;
var KeyEvent = java_awt.KeyEvent;
var KeyListener = java_awt.KeyListener;
var MouseEvent = java_awt.MouseEvent;
var MouseListener = java_awt.MouseListener;
var MouseMotionListener = java_awt.MouseMotionListener;
var Class = java_lang.Class;
var ArrayList = java_util.ArrayList;
var TreeMap = java_util.TreeMap;
var ChangeEvent = javax_swing.ChangeEvent;
var ChangeListener = javax_swing.ChangeListener;

/* FSM.js */

var FSM = function() {
   JSProgram.call(this);
   this.createProgramFrame();
   this.setTitle("Finite State Machine Simulator");
   this.model = new FSMModel();
   this.view = new FSMView(this.model);
   this.loadDialog = new JSLoadDialog(this.view, FSMC.EXAMPLES);
   this.loadDialog.addActionListener(new FSMFileLoader(this));
   this.loadDialog.setTitle("Examples");
   this.add(this.view, "view");
   this.createControlStrip();
   this.pack();
   this.setVisible(true);
};

FSM.prototype = 
   jslib.inheritPrototype(JSProgram, "FSM extends JSProgram");
FSM.prototype.constructor = FSM;
FSM.prototype.$class = 
   new Class("FSM", FSM);

FSM.prototype.run = function() {
   /* Empty */
};

FSM.prototype.actionPerformed = function(e) {
   var cmd = e.getActionCommand();
   if (jslib.equals(cmd, "Load")) {
      var asize = this.loadDialog.getTarget().getSize();
      var dsize = this.loadDialog.getSize();
      var x = (asize.width - dsize.width) / 2;
      var y = (asize.height - dsize.height) / 2;
      this.loadDialog.setBounds(x, y, dsize.width, dsize.height);
      this.loadDialog.setVisible(true);
   } else if (jslib.equals(cmd, "Reset")) {
      this.model.stopAction();
      this.model.clear();
   }
};

FSM.prototype.createControlStrip = function() {
   var loadControl = new LoadControl();
   loadControl.addActionListener(this);
   this.model.addControl(loadControl);
   this.addControl(loadControl);
   var resetControl = new ResetControl();
   resetControl.addActionListener(this);
   this.model.addControl(resetControl);
   this.addControl(resetControl);
};

FSM.main = function(args) {
   new FSM().start();
};

var FSMFileLoader = function(app) {
   this.app = app;
};

FSMFileLoader.prototype.actionPerformed = function(e) {
   // Fill in
};


/* FSMArc.js */

var FSMArc = function(start, finish) {
   this.start = start;
   this.finish = finish;
};

FSMArc.prototype.getStart = function() {
   return this.start;
};

FSMArc.prototype.getFinish = function() {
   return this.finish;
};

FSMArc.prototype.setLabel = function(str) {
   this.label = str;
};

FSMArc.prototype.getLabel = function() {
   return this.label;
};

FSMArc.prototype.setSelected = function(flag) {
   this.selected = flag;
};

FSMArc.prototype.isSelected = function() {
   return this.selected;
};

FSMArc.prototype.getDisplacement = function() {
   return this.displacement;
};

FSMArc.prototype.computeDisplacement = function(track) {
   var x0 = this.start.getLocation().x;
   var y0 = this.start.getLocation().y;
   var dx = this.finish.getLocation().x - x0;
   var dy = this.finish.getLocation().y - y0;
   var hyp = Math.sqrt(dx * dx + dy * dy);
   var sinTheta = dy / hyp;
   var cosTheta = dx / hyp;
   this.displacement = 0;
   for (var i = 0; i < track.size(); i++) {
      var p = track.get(i);
      var yt = (p.x - x0) * -sinTheta + (p.y - y0) * -cosTheta;
      var disp = (toInt(Math.round(yt))+ 16) & -16;
      if (Math.abs(disp) < FSMArc.MIN_DISP) disp = 0;
      if (Math.abs(disp) > Math.abs(this.displacement)) this.displacement = disp;
   }
};

FSMArc.MIN_DISP = 20;

/* FSMC.js */

var FSMC = function() {
   /* Empty */
};

FSMC.CANVAS_WIDTH = 1000;
FSMC.CANVAS_HEIGHT = 600;
FSMC.STATE_SIZE = 50;
FSMC.FINAL_SIZE = 44;
FSMC.SELF_DY = -2;
FSMC.ARC_TOP_DY = -6;
FSMC.ARC_BOTTOM_DY = 14;
FSMC.LABEL_DY = 4;
FSMC.SUBSCRIPT_DY = 5;
FSMC.TRIANGLE_LENGTH = 5;
FSMC.TRIANGLE_BREADTH = 8;
FSMC.LABEL_WIDTH = 30;
FSMC.LABEL_HEIGHT = 16;
FSMC.HOME = "http://cs.stanford.edu/~eroberts/demos";
FSMC.ROOT = FSMC.HOME + "/FiniteStateMachine";
FSMC.EXAMPLES = FSMC.ROOT + "/examples";
FSMC.CANVAS_BACKGROUND = new Color(0xCCFFFF);
FSMC.SELECTED_COLOR = new Color(0x9999FF);
FSMC.SUBSCRIPT_FONT = Font.decode("Helvetica Neue-8");
FSMC.STATE_FONT = Font.decode("Serif-Italic-14");
FSMC.LABEL_FONT = Font.decode("Courier New-Bold-14");

/* FSMModel.js */

var FSMModel = function() {
   Controller.call(this);
   this.states = new TreeMap();
   this.arcs = new ArrayList();
   this.nextState = 0;
};

FSMModel.prototype = 
   jslib.inheritPrototype(Controller, "FSMModel extends Controller");
FSMModel.prototype.constructor = FSMModel;
FSMModel.prototype.$class = 
   new Class("FSMModel", FSMModel);

FSMModel.prototype.createNextState = function() {
   var state = new FSMState(this.nextState);
   this.states.put(this.nextState++, state);
   return state;
};

FSMModel.prototype.createArc = function(start, finish) {
   var arc = new FSMArc(start, finish);
   this.arcs.add(arc);
   return arc;
};

FSMModel.prototype.getStates = function() {
   return this.states;
};

FSMModel.prototype.getArcs = function() {
   return this.arcs;
};

FSMModel.prototype.getArcsFrom = function(state) {
   var arcList = new ArrayList();
   var el0 = new JSElementList(this.arcs);
   for (var ei0 = 0; ei0 < el0.size(); ei0++) {
      var arc = el0.get(ei0);
      if (arc.getStart() === state) arcList.add(arc);
   }
   return arcList;
};

FSMModel.prototype.getArcsConnecting = function(start, finish) {
   var arcList = new ArrayList();
   var el0 = new JSElementList(this.arcs);
   for (var ei0 = 0; ei0 < el0.size(); ei0++) {
      var arc = el0.get(ei0);
      if (arc.getStart() === start && arc.getStart() === finish) {
         arcList.add(arc);
      }
   }
   return arcList;
};

FSMModel.prototype.setActive = function(flag) {
   this.active = flag;
};

FSMModel.prototype.isActive = function() {
   return this.active;
};

FSMModel.prototype.setInput = function(str) {
   this.input = str;
};

FSMModel.prototype.getInput = function() {
   return this.input;
};

FSMModel.prototype.clear = function() {
   this.update();
};

FSMModel.prototype.step = function() {
   this.update();
};

FSMModel.prototype.isCallable = function() {
   return false;
};

FSMModel.prototype.getStackDepth = function() {
   return 0;
};

FSMModel.prototype.resetAction = function() {
   this.stopAction();
   this.clear();
};


/* FSMState.js */

var FSMState = function(number) {
   this.number = number;
   this.finalState = false;
};

FSMState.prototype.getNumber = function() {
   return this.number;
};

FSMState.prototype.setSelected = function(flag) {
   this.selected = flag;
};

FSMState.prototype.isSelected = function() {
   return this.selected;
};

FSMState.prototype.setLocation = function(x, y) {
   this.x = x;
   this.y = y;
};

FSMState.prototype.getLocation = function() {
   return new Point(this.x, this.y);
};

FSMState.prototype.snapToGrid = function() {
   this.x = (this.x + 4) & -8;
   this.y = (this.y + 4) & -8;
};

FSMState.prototype.setFinal = function(flag) {
   this.finalState = flag;
};

FSMState.prototype.isFinal = function() {
   return this.finalState;
};


/* FSMView.js */

var FSMView = function(model) {
   JSCanvas.call(this);
   this.model = model;
   model.addChangeListener(this);
   this.addMouseListener(this);
   this.addMouseMotionListener(this);
   this.addKeyListener(this);
   this.setPreferredSize(new Dimension(FSMC.CANVAS_WIDTH, FSMC.CANVAS_HEIGHT));
   this.setBackground(FSMC.CANVAS_BACKGROUND);
   this.selectedState = null;
   var r = FSMC.STATE_SIZE / 2;
   this.selfArcOffset = toInt(Math.round(r * Math.sqrt(2.0)));
   this.activeArc = null;
   this.track = null;
};

FSMView.prototype = 
   jslib.inheritPrototype(JSCanvas, "FSMView extends JSCanvas");
FSMView.prototype.constructor = FSMView;
FSMView.prototype.$class = 
   new Class("FSMView", FSMView);

FSMView.prototype.stateChanged = function(e) {
   this.repaint();
};

FSMView.prototype.paintComponent = function(g) {
   g.setColor(this.getBackground());
   g.fillRect(0, 0, this.getWidth(), this.getHeight());
   g.setColor(Color.BLACK);
   if (this.track !== null) this.drawTrack(g);
   var arcs = this.model.getArcs();
   var el0 = new JSElementList(arcs);
   for (var ei0 = 0; ei0 < el0.size(); ei0++) {
      var arc = el0.get(ei0);
      this.drawArc(g, arc);
   }
   var states = this.model.getStates();
   var el1 = new JSElementList(states.keySet());
   for (var ei1 = 0; ei1 < el1.size(); ei1++) {
      var k = el1.get(ei1);
      var state = states.get(k);
      this.drawState(g, state);
   }
};

FSMView.prototype.keyPressed = function(e) {
   if (this.activeArc !== null) {
      var str = this.model.getInput();
      var code = e.getKeyCode();
      if (code === toInt('\n') || code === toInt('\r')) {
         this.activeArc.setLabel(str);
         this.activeArc = null;
      } else if (str.length > 0 && (code === KeyEvent.VK_BACK_SPACE || code === KeyEvent.VK_DELETE)) {
         this.model.setInput(str.substring(0, str.length - 1));
      }
      this.repaint();
   }
};

FSMView.prototype.keyReleased = function(e) {
   /* Empty */
};

FSMView.prototype.keyTyped = function(e) {
   if (this.activeArc !== null) {
      var str = this.model.getInput();
      var ch = e.getKeyChar();
      switch (e.getKeyCode()) {
       case toInt('\n'): case toInt('\r'):
       case KeyEvent.VK_BACK_SPACE:
       case KeyEvent.VK_DELETE:
         break;
       default:
         this.model.setInput(str + toStr(ch));
      }
      this.repaint();
   }
};

FSMView.prototype.mouseClicked = function(e) {
   if (this.selectedState !== null) this.selectedState.setSelected(false);
   this.selectedState = this.getStateAtLocation(e.getX(), e.getY());
   if (this.selectedState !== null) this.selectedState.setSelected(true);
   if (e.getClickCount() === 2) {
      if (this.selectedState === null) {
         this.selectedState = this.model.createNextState();
         this.selectedState.setLocation(e.getX(), e.getY());
         this.selectedState.snapToGrid();
         this.selectedState.setSelected(false);
         this.selectedState = null;
      } else {
         this.selectedState.setFinal(!this.selectedState.isFinal());
      }
   }
   this.repaint();
};

FSMView.prototype.mouseEntered = function(e) {
   /* Empty */
};

FSMView.prototype.mouseExited = function(e) {
   /* Empty */
};

FSMView.prototype.mousePressed = function(e) {
   this.requestFocus();
   var state = this.getStateAtLocation(e.getX(), e.getY());
   if (state === null) return;
   if (this.selectedState === null) {
      this.dragOffset = null;
      this.arcStart = state;
      var pt = this.arcStart.getLocation();
      this.arcOffset = new Point(e.getX() - pt.x, e.getY() - pt.y);
      this.movedOutside = false;
   } else if (state === this.selectedState) {
      this.arcOffset = null;
      var pt = this.selectedState.getLocation();
      this.dragOffset = new Point(e.getX() - pt.x, e.getY() - pt.y);
   }
};

FSMView.prototype.mouseReleased = function(e) {
   if (this.dragOffset !== null) {
      this.selectedState.setLocation(e.getX() - this.dragOffset.x, e.getY() - this.dragOffset.y);
      this.selectedState.snapToGrid();
   } else if (this.arcOffset !== null) {
      var state = this.getStateAtLocation(e.getX(), e.getY());
      if (state !== null && this.movedOutside) {
         this.activeArc = this.model.createArc(this.arcStart, state);
         if (this.track !== null) this.activeArc.computeDisplacement(this.track);
         this.model.setInput("");
      }
   }
   this.arcOffset = null;
   this.dragOffset = null;
   this.track = null;
   this.repaint();
};

FSMView.prototype.mouseMoved = function(e) {
   /* Empty */
};

FSMView.prototype.mouseDragged = function(e) {
   if (this.dragOffset !== null) {
      this.selectedState.setLocation(e.getX() - this.dragOffset.x, e.getY() - this.dragOffset.y);
      this.repaint();
   } else if (this.arcOffset !== null) {
      if (this.getStateAtLocation(e.getX(), e.getY()) === null) {
         this.movedOutside = true;
         if (this.track === null) {
            this.track = new ArrayList();
            this.track.add(this.arcStart.getLocation());
         }
         this.track.add(new Point(e.getPoint()));
         this.repaint();
      }
   }
};

FSMView.prototype.getStateAtLocation = function(x, y) {
   var r2 = FSMC.STATE_SIZE * FSMC.STATE_SIZE / 4;
   var states = this.model.getStates();
   var el0 = new JSElementList(states.keySet());
   for (var ei0 = 0; ei0 < el0.size(); ei0++) {
      var k = el0.get(ei0);
      var state = states.get(k);
      var pt = state.getLocation();
      var dx = pt.x - x;
      var dy = pt.y - y;
      if (dx * dx + dy * dy < r2) return state;
   }
   return null;
};

FSMView.prototype.drawArc = function(g, arc) {
   var start = arc.getStart();
   var finish = arc.getFinish();
   if (start === finish) {
      this.drawSelfArc(g, arc);
   } else {
      this.drawNormalArc(g, arc);
   }
   this.drawArcLabel(g, arc);
};

FSMView.prototype.drawSelfArc = function(g, arc) {
   var p = arc.getStart().getLocation();
   var r = FSMC.STATE_SIZE / 2;
   g.drawArc(p.x - r, p.y - this.selfArcOffset - r + FSMC.SELF_DY, 2 * r, 2 * r, -45, 270);
   this.drawArrowhead(g, p, Math.PI / 4);
};

FSMView.prototype.drawNormalArc = function(g, arc) {
   var start = arc.getStart();
   var finish = arc.getFinish();
   var p1 = start.getLocation();
   var p2 = finish.getLocation();
   var b = arc.getDisplacement();
   var dx = p2.x - p1.x;
   var dy = p2.y - p1.y;
   var theta = Math.atan2(dy, dx);
   if (b === 0) {
      g.drawLine(p1.x, p1.y, p2.x, p2.y);
      this.drawArrowhead(g, p2, theta);
   } else {
      var a = Math.sqrt(dx * dx + dy * dy) / 2;
      var r = Math.abs(toInt(Math.round(b / 2 + a * a / (2 * b))));
      var g2d = g.create();
      g2d.translate(p1.x, p1.y);
      g2d.rotate(theta);
      var phi = Math.atan2(a, r - Math.abs(b));
      var deg = toInt(Math.round(180 * phi / Math.PI));
      var rho = Math.atan2(FSMC.STATE_SIZE / 2, r);
      if (b < 0) {
         g2d.translate(a, -b - r);
         g2d.drawArc(-r, -r, 2 * r, 2 * r, 270 - deg, 2 * deg);
         this.drawArrowhead(g, p2, 3 * Math.PI / 2 - (theta - rho));
      } else {
         g2d.translate(a, r - b);
         g2d.drawArc(-r, -r, 2 * r, 2 * r, 90 - deg, 2 * deg);
         this.drawArrowhead(g, p2, Math.PI / 2 - (theta - rho));
      }
      g2d.dispose();
   }
};

FSMView.prototype.drawArcLabel = function(g, arc) {
   var p1 = arc.getStart().getLocation();
   var p2 = arc.getFinish().getLocation();
   var mid = null;
   var theta = 0;
   var label = arc.getLabel();
   if (jslib.equals(p1, p2)) {
      var r = FSMC.STATE_SIZE / 2;
      mid = new Point(p2.x, p1.y - this.selfArcOffset - r);
   } else {
      mid = new Point((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
      theta = Math.atan2(p2.y - p1.y, p2.x - p1.x);
   }
   var g2d = g.create();
   g2d.translate(mid.x, mid.y);
   var b = arc.getDisplacement();
   if (b < 0) {
      if (theta < Math.PI / 2 && theta > -Math.PI / 2) {
         g2d.rotate(theta);
         g2d.translate(0, FSMC.ARC_BOTTOM_DY - b);
      } else {
         g2d.rotate(Math.PI + theta);
         g2d.translate(0, FSMC.ARC_TOP_DY + b);
      }
   } else {
      if (theta < Math.PI / 2 && theta > -Math.PI / 2) {
         g2d.rotate(theta);
         g2d.translate(0, FSMC.ARC_TOP_DY - b);
      } else {
         g2d.rotate(Math.PI + theta);
         g2d.translate(0, FSMC.ARC_BOTTOM_DY + b);
      }
   }
   g2d.setFont(FSMC.LABEL_FONT);
   var fm = g2d.getFontMetrics();
   if (this.activeArc === arc) {
      g2d.setColor(FSMC.SELECTED_COLOR);
      g2d.fillRect(-FSMC.LABEL_WIDTH / 2, fm.getDescent() - FSMC.LABEL_HEIGHT, FSMC.LABEL_WIDTH, FSMC.LABEL_HEIGHT);
      g2d.setColor(Color.BLACK);
      label = this.model.getInput();
   }
   if (label !== null) g2d.drawString(label, -fm.stringWidth(label) / 2, 0);
   g2d.dispose();
};

FSMView.prototype.drawArrowhead = function(g, p, theta) {
   var g2d = g.create();
   g2d.translate(p.x, p.y);
   g2d.rotate(theta);
   g2d.translate(-FSMC.STATE_SIZE / 2, 0);
   var triangle = new Polygon();
   var poly = new Polygon();
   poly.addPoint(0, 0);
   poly.addPoint(-FSMC.TRIANGLE_LENGTH, FSMC.TRIANGLE_BREADTH / 2);
   poly.addPoint(-FSMC.TRIANGLE_LENGTH, -FSMC.TRIANGLE_BREADTH / 2);
   g2d.fillPolygon(poly);
   g2d.dispose();
};

FSMView.prototype.drawTrack = function(g) {
   var p1 = this.track.get(0);
   for (var i = 1; i < this.track.size(); i++) {
      var p2 = this.track.get(i);
      g.drawLine(p1.x, p1.y, p2.x, p2.y);
      p1 = p2;
   }
};

FSMView.prototype.drawState = function(g, state) {
   var pt = state.getLocation();
   g.setColor(state.isSelected() ? FSMC.SELECTED_COLOR : Color.WHITE);
   g.fillOval(pt.x - FSMC.STATE_SIZE / 2, pt.y - FSMC.STATE_SIZE / 2, FSMC.STATE_SIZE, FSMC.STATE_SIZE);
   g.setColor(Color.BLACK);
   g.drawOval(pt.x - FSMC.STATE_SIZE / 2, pt.y - FSMC.STATE_SIZE / 2, FSMC.STATE_SIZE, FSMC.STATE_SIZE);
   if (state.isFinal()) {
      g.drawOval(pt.x - FSMC.FINAL_SIZE / 2, pt.y - FSMC.FINAL_SIZE / 2, FSMC.FINAL_SIZE, FSMC.FINAL_SIZE);
   }
   var sub = "" + state.getNumber();
   g.setFont(FSMC.STATE_FONT);
   var fm = g.getFontMetrics();
   var width = fm.stringWidth("s");
   var sWidth = width;
   g.setFont(FSMC.SUBSCRIPT_FONT);
   fm = g.getFontMetrics();
   width += fm.stringWidth(sub);
   var x0 = pt.x - width / 2;
   g.setFont(FSMC.STATE_FONT);
   g.drawString("s", x0, pt.y + FSMC.LABEL_DY);
   g.setFont(FSMC.SUBSCRIPT_FONT);
   g.drawString(sub, x0 + sWidth, pt.y + FSMC.SUBSCRIPT_DY);
};


/* Exports */

return {
   FSM : FSM,
   FSMArc : FSMArc,
   FSMC : FSMC,
   FSMModel : FSMModel,
   FSMState : FSMState,
   FSMView : FSMView
};

});
