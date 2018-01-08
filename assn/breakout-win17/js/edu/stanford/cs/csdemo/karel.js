/*
 * File: karel.js
 * Created on Tue Jan 12 18:23:12 PST 2016 by java2js
 * --------------------------------------------------
 * This file was generated mechanically by the java2js utility.
 * Permanent edits must be made in the Java file.
 */

define([ "jslib",
         "edu/stanford/cs/controller",
         "edu/stanford/cs/direction",
         "edu/stanford/cs/exp",
         "edu/stanford/cs/java2js",
         "edu/stanford/cs/jsconsole",
         "edu/stanford/cs/jscontrols/JSControl",
         "edu/stanford/cs/jscontrols/LoadControl",
         "edu/stanford/cs/jscontrols/RunControl",
         "edu/stanford/cs/jscontrols/SaveControl",
         "edu/stanford/cs/jscontrols/SpeedControl",
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
         edu_stanford_cs_controller,
         edu_stanford_cs_direction,
         edu_stanford_cs_exp,
         edu_stanford_cs_java2js,
         edu_stanford_cs_jsconsole,
         edu_stanford_cs_jscontrols_JSControl,
         edu_stanford_cs_jscontrols_LoadControl,
         edu_stanford_cs_jscontrols_RunControl,
         edu_stanford_cs_jscontrols_SaveControl,
         edu_stanford_cs_jscontrols_SpeedControl,
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
var Controller = edu_stanford_cs_controller.Controller;
var Direction = edu_stanford_cs_direction.Direction;
var Compound = edu_stanford_cs_exp.Compound;
var Constant = edu_stanford_cs_exp.Constant;
var Expression = edu_stanford_cs_exp.Expression;
var Value = edu_stanford_cs_exp.Value;
var JSCanvas = edu_stanford_cs_java2js.JSCanvas;
var JSElementList = edu_stanford_cs_java2js.JSElementList;
var JSErrorEvent = edu_stanford_cs_java2js.JSErrorEvent;
var JSFile = edu_stanford_cs_java2js.JSFile;
var JSFrame = edu_stanford_cs_java2js.JSFrame;
var JSImage = edu_stanford_cs_java2js.JSImage;
var JSLoadDialog = edu_stanford_cs_java2js.JSLoadDialog;
var JSProgram = edu_stanford_cs_java2js.JSProgram;
var JSSaveDialog = edu_stanford_cs_java2js.JSSaveDialog;
var JSConsole = edu_stanford_cs_jsconsole.JSConsole;
var JSControl = edu_stanford_cs_jscontrols_JSControl.JSControl;
var LoadControl = edu_stanford_cs_jscontrols_LoadControl.LoadControl;
var RunControl = edu_stanford_cs_jscontrols_RunControl.RunControl;
var SaveControl = edu_stanford_cs_jscontrols_SaveControl.SaveControl;
var SpeedControl = edu_stanford_cs_jscontrols_SpeedControl.SpeedControl;
var StepControl = edu_stanford_cs_jscontrols_StepControl.StepControl;
var CodeVector = edu_stanford_cs_parser.CodeVector;
var InfixForm = edu_stanford_cs_parser.InfixForm;
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
var SVMFunctionClosure = edu_stanford_cs_svm.SVMFunctionClosure;
var SVMMethod = edu_stanford_cs_svm.SVMMethod;
var TokenScanner = edu_stanford_cs_tokenscanner.TokenScanner;
var BasicStroke = java_awt.BasicStroke;
var CardLayout = java_awt.CardLayout;
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
var Point = java_awt.Point;
var Polygon = java_awt.Polygon;
var Rectangle = java_awt.Rectangle;
var ActionEvent = java_awt.ActionEvent;
var ActionListener = java_awt.ActionListener;
var AdjustmentEvent = java_awt.AdjustmentEvent;
var AdjustmentListener = java_awt.AdjustmentListener;
var ComponentEvent = java_awt.ComponentEvent;
var ComponentListener = java_awt.ComponentListener;
var KeyEvent = java_awt.KeyEvent;
var KeyListener = java_awt.KeyListener;
var MouseEvent = java_awt.MouseEvent;
var MouseListener = java_awt.MouseListener;
var MouseMotionListener = java_awt.MouseMotionListener;
var Character = java_lang.Character;
var Class = java_lang.Class;
var Double = java_lang.Double;
var Integer = java_lang.Integer;
var RuntimeException = java_lang.RuntimeException;
var ArrayList = java_util.ArrayList;
var Stack = java_util.Stack;
var TreeMap = java_util.TreeMap;
var TreeSet = java_util.TreeSet;
var JComponent = javax_swing.JComponent;
var JPanel = javax_swing.JPanel;
var Timer = javax_swing.Timer;
var ChangeEvent = javax_swing.ChangeEvent;
var ChangeListener = javax_swing.ChangeListener;

/* Karel.js */

var Karel = function() {
   this.x = 1;
   this.y = 1;
   this.dir = Karel.EAST;
   this.world = null;
   this.beepers = KC.INFINITE;
};

Karel.prototype.move = function() {
   this.checkWorld("move");
   if (this.world.checkWall(this.x, this.y, this.dir)) {
      throw new RuntimeException("Karel is blocked");
   }
   var pt = Direction.adjacentPoint(new Point(this.x, this.y), this.dir);
   this.setLocation(pt.x, pt.y);
   this.world.trace();
};

Karel.prototype.turnLeft = function() {
   this.checkWorld("turnLeft");
   this.setDirection(Direction.leftFrom(this.dir));
   this.world.trace();
};

Karel.prototype.pickBeeper = function() {
   this.checkWorld("pickBeeper");
   var nb = this.world.getBeepersOnCorner(this.x, this.y);
   if (nb < 1) {
      throw new RuntimeException("pickBeeper: No beepers on this corner");
   }
   this.world.setBeepersOnCorner(this.x, this.y, KarelWorld.adjustBeepers(nb, -1));
   this.setBeepersInBag(KarelWorld.adjustBeepers(this.getBeepersInBag(), +1));
   this.world.trace();
};

Karel.prototype.putBeeper = function() {
   this.checkWorld("putBeeper");
   var nb = this.getBeepersInBag();
   if (nb < 1) throw new RuntimeException("putBeeper: No beepers in bag");
   var cb = KarelWorld.adjustBeepers(this.world.getBeepersOnCorner(this.x, this.y), +1);
   this.world.setBeepersOnCorner(this.x, this.y, cb);
   this.setBeepersInBag(KarelWorld.adjustBeepers(nb, -1));
   this.world.trace();
};

Karel.prototype.frontIsClear = function() {
   this.checkWorld("frontIsClear");
   return !this.world.checkWall(this.x, this.y, this.dir);
};

Karel.prototype.frontIsBlocked = function() {
   this.checkWorld("frontIsBlocked");
   return this.world.checkWall(this.x, this.y, this.dir);
};

Karel.prototype.leftIsClear = function() {
   this.checkWorld("leftIsClear");
   return !this.world.checkWall(this.x, this.y, Direction.leftFrom(this.dir));
};

Karel.prototype.leftIsBlocked = function() {
   this.checkWorld("leftIsBlocked");
   return this.world.checkWall(this.x, this.y, Direction.leftFrom(this.dir));
};

Karel.prototype.rightIsClear = function() {
   this.checkWorld("rightIsClear");
   return !this.world.checkWall(this.x, this.y, Direction.rightFrom(this.dir));
};

Karel.prototype.rightIsBlocked = function() {
   this.checkWorld("rightIsBlocked");
   return this.world.checkWall(this.x, this.y, Direction.rightFrom(this.dir));
};

Karel.prototype.beepersPresent = function() {
   this.checkWorld("beepersPresent");
   return this.world.getBeepersOnCorner(this.x, this.y) > 0;
};

Karel.prototype.noBeepersPresent = function() {
   this.checkWorld("noBeepersPresent");
   return this.world.getBeepersOnCorner(this.x, this.y) === 0;
};

Karel.prototype.beepersInBag = function() {
   this.checkWorld("beepersInBag");
   return this.getBeepersInBag() > 0;
};

Karel.prototype.noBeepersInBag = function() {
   this.checkWorld("noBeepersInBag");
   return this.getBeepersInBag() === 0;
};

Karel.prototype.facingNorth = function() {
   this.checkWorld("facingNorth");
   return this.dir === Karel.NORTH;
};

Karel.prototype.facingEast = function() {
   this.checkWorld("facingEast");
   return this.dir === Karel.EAST;
};

Karel.prototype.facingSouth = function() {
   this.checkWorld("facingSouth");
   return this.dir === Karel.SOUTH;
};

Karel.prototype.facingWest = function() {
   this.checkWorld("facingWest");
   return this.dir === Karel.WEST;
};

Karel.prototype.notFacingNorth = function() {
   this.checkWorld("notFacingNorth");
   return this.dir !== Karel.NORTH;
};

Karel.prototype.notFacingEast = function() {
   this.checkWorld("notFacingEast");
   return this.dir !== Karel.EAST;
};

Karel.prototype.notFacingSouth = function() {
   this.checkWorld("notFacingSouth");
   return this.dir !== Karel.SOUTH;
};

Karel.prototype.notFacingWest = function() {
   this.checkWorld("notFacingWest");
   return this.dir !== Karel.WEST;
};

Karel.prototype.getLocation = function() {
   return new Point(this.x, this.y);
};

Karel.prototype.setLocation = function(x, y) {
   if (this.world !== null) {
      if (this.world.outOfBounds(x, y)) {
         throw new RuntimeException("setLocation: Out of bounds");
      }
      var occupant = this.world.getKarelOnSquare(x, y);
      if (occupant === this) return;
      if (occupant !== null) {
         throw new RuntimeException("setLocation: Square is occupied");
      }
   }
   this.x = x;
   this.y = y;
};

Karel.prototype.getDirection = function() {
   return this.dir;
};

Karel.prototype.setDirection = function(dir) {
   this.dir = dir;
   if (this.world !== null) this.world.fireChangeListeners();
};

Karel.prototype.getBeepersInBag = function() {
   return this.beepers;
};

Karel.prototype.setBeepersInBag = function(nBeepers) {
   this.beepers = nBeepers;
};

Karel.prototype.getWorld = function() {
   return this.world;
};

Karel.prototype.setWorld = function(world) {
   this.world = world;
};

Karel.prototype.checkWorld = function(caller) {
   if (this.world === null) {
      throw new RuntimeException(caller + ": Karel is not in a world");
   }
};

Karel.NORTH = Direction.NORTH;
Karel.EAST = Direction.EAST;
Karel.SOUTH = Direction.SOUTH;
Karel.WEST = Direction.WEST;

/* KarelANDOperator.js */

var KarelANDOperator = function() {
   InfixForm.call(this);
};

KarelANDOperator.prototype =
   jslib.inheritPrototype(InfixForm, "KarelANDOperator extends InfixForm");
KarelANDOperator.prototype.constructor = KarelANDOperator;
KarelANDOperator.prototype.$class = 
   new Class("KarelANDOperator", KarelANDOperator);

KarelANDOperator.prototype.compile = function(p, args, cv) {
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


/* KarelApplication.js */

var KarelApplication = function() {
   JSProgram.call(this);
   this.createProgramFrame();
   JSFile.setCGIServer("http://web.stanford.edu/class/cs54n/cgi-bin");
   this.setTitle("Karel the Robot");
   this.setLayout(new KarelLayout());
   this.world = new KarelWorld();
   this.view = new KarelWorldView(this.world);
   this.parser = new KarelParser();
   this.worldEditor = new KarelWorldEditor(this.view);
   this.view.setLook(KC.SIMPLE);
   this.world.addChangeListener(this.view);
   var karel = new Karel();
   this.world.addKarel(karel);
   this.console = new KarelConsole(this);
   this.editor = new KarelEditor();
   var consoleFrame = this.createFrame(this.console, "Karel Console");
   var editorFrame = this.createFrame(this.editor, "Untitled");
   this.editor.setFrame(editorFrame);
   this.loadDialog = new JSLoadDialog(this.view);
   this.loadDialog.addActionListener(new KarelLoadDialogListener(this, this.loadDialog));
   this.saveDialog = new JSSaveDialog(this.view);
   this.saveDialog.addActionListener(new KarelSaveDialogListener(this, this.saveDialog));
   this.uiLayout = new CardLayout();
   this.ui = new JPanel();
   this.ui.setLayout(this.uiLayout);
   this.ui.add(consoleFrame, "console");
   this.ui.add(this.worldEditor, "worldEditor");
   this.uiLayout.show(this.ui, "console");
   this.vm = new KarelVM(this);
   this.timer = new Timer(0, this);
   this.timer.setActionCommand("Step");
   this.add(this.view, "world");
   this.add(this.ui, "ui");
   this.add(editorFrame, "editor");
   this.setBackground(KC.APPLICATION_BACKGROUND);
   this.createControlStrip();
   this.pack();
   this.setMinimumSize(this.getMinimumSize());
   this.setEditWorldEnabled(false);
   this.setVisible(true);
};

KarelApplication.prototype = 
   jslib.inheritPrototype(JSProgram, "KarelApplication extends JSProgram");
KarelApplication.prototype.constructor = KarelApplication;
KarelApplication.prototype.$class = 
   new Class("KarelApplication", KarelApplication);

KarelApplication.prototype.run = function() {
   var home = new JSFile("cgi:" + this.getUID() + "/Karel");
   this.loadDialog.setDirectory(home);
   this.saveDialog.setDirectory(home);
   this.view.repaint();
   this.getCommand();
};

KarelApplication.prototype.parseProgram = function() {
   this.parser.setInput(this.editor.getText());
   this.parser.readModule(this.vm);
};

KarelApplication.prototype.showErrorMessage = function(msg) {
   this.console.showErrorMessage(msg);
};

KarelApplication.prototype.getConsole = function() {
   return this.console;
};

KarelApplication.prototype.getEditor = function() {
   return this.editor;
};

KarelApplication.prototype.getWorld = function() {
   return this.world;
};

KarelApplication.prototype.getWorldView = function() {
   return this.view;
};

KarelApplication.prototype.getVM = function() {
   return this.vm;
};

KarelApplication.prototype.getCommand = function() {
   this.console.requestInput("-> ");
};

KarelApplication.prototype.executeUserCommand = function(line) {
   try {
      if (this.execute(line)) this.getCommand();
   } catch (ex) {
      this.console.showErrorMessage(RuntimeException.patchMessage(ex));
      this.getCommand();
   }
};

KarelApplication.prototype.execute = function(line) {
   var scanner = new TokenScanner();
   scanner.ignoreWhitespace();
   scanner.setInput(line);
   var cmd = scanner.nextToken();
   if (cmd.length > 0) {
      if (jslib.equals(cmd, "quit")) {
         this.exit(0);
      } else {
         scanner.verifyToken("(");
         scanner.verifyToken(")");
         var token = scanner.nextToken();
         if (jslib.equals(token, ";")) {
            token = scanner.nextToken();
         }
         return this.vm.execute(cmd);
      }
   }
   return true;
};

KarelApplication.prototype.setEditWorldEnabled = function(flag) {
   this.editWorldEnabled = flag;
   if (flag) {
      this.uiLayout.show(this.ui, "worldEditor");
      this.view.setWorldMonitor(this.worldEditor);
      this.worldEditor.repaint();
   } else {
      this.uiLayout.show(this.ui, "console");
      this.view.setWorldMonitor(null);
      this.console.repaint();
   }
};

KarelApplication.prototype.scanFilename = function(scanner) {
   var filename = "";
   while (scanner.hasMoreTokens()) {
      filename += scanner.nextToken();
   }
   return filename;
};

KarelApplication.prototype.actionPerformed = function(e) {
   var cmd = e.getActionCommand();
   if (jslib.equals(cmd, "Reset")) {
      this.timer.stop();
   } else if (jslib.equals(cmd, "Run")) {
      this.parseProgram();
      //         this.adjustDelay();
      //         this.timer.start();
   } else if (jslib.equals(cmd, "Step")) {
      //         this.adjustDelay();
   } else if (jslib.equals(cmd, "Edit World")) {
      this.setEditWorldEnabled(!this.editWorldEnabled);
   } else if (jslib.equals(cmd, "Load")) {
      this.timer.stop();
      this.loadDialog.centerOnParent();
      this.loadDialog.setVisible(true);
   } else if (jslib.equals(cmd, "Save")) {
      this.saveDialog.centerOnParent();
      this.saveDialog.setVisible(true);
   }
};

KarelApplication.prototype.loadWorld = function(str) {
   this.world.load(str);
   this.getCommand();
};

KarelApplication.prototype.adjustDelay = function() {
   this.timer.setDelay(this.speedControl.getSpeed());
};

KarelApplication.prototype.adjustmentValueChanged = function(e) {
   this.adjustDelay();
};

KarelApplication.prototype.createControlStrip = function() {
   var loadControl = new LoadControl();
   loadControl.addActionListener(this);
   this.addControl(loadControl);
   var saveControl = new SaveControl();
   saveControl.addActionListener(this);
   this.addControl(saveControl);
   this.editWorldControl = new KarelEditWorldControl();
   this.editWorldControl.addActionListener(this);
   this.addControl(this.editWorldControl);
   this.runControl = new RunControl();
   this.runControl.addActionListener(this);
   this.addControl(this.runControl);
   var stepControl = new StepControl();
   stepControl.addActionListener(this);
   this.addControl(stepControl);
   this.speedControl = new SpeedControl();
   this.speedControl.addAdjustmentListener(this);
   this.addControl(this.speedControl);
};

KarelApplication.prototype.createFrame = function(component, title) {
   return new JSFrame(component, title);
};

KarelApplication.main = function(args) {
   var pgm = new KarelApplication();
   if (args.length > 0) pgm.getVM().setTraceFlag(true);
   pgm.startAfterLogin(pgm.getFrame());
};

var KarelLoadDialogListener = function(pgm, dialog) {
   this.pgm = pgm;
   this.dialog = dialog;
};

KarelLoadDialogListener.prototype.actionPerformed = function(e) {
   if (e instanceof JSErrorEvent) {
      // Fill in
   } else {
      var path = e.getActionCommand();
      if (path === null || path.length === 0) {
         this.dialog.setVisible(false);
      } else {
         new JSFile(path).read(new KarelLoadFileListener(this.pgm, path));
      }
   }
};

var KarelLoadFileListener = function(pgm, path) {
   this.pgm = pgm;
   this.path = path;
};

KarelLoadFileListener.prototype.actionPerformed = function(e) {
   if (jslib.endsWith(this.path, ".w")) {
      var world = this.pgm.getWorld();
      if (world) {
         world.load(e.getActionCommand());
         this.pgm.getWorldView().setDisplayParameters();
      }
   } else {
      var editor = this.pgm.getEditor();
      editor.removeAllBreakpoints();
      editor.setText(e.getActionCommand());
      editor.setCursorPosition(0);
      var frame = editor.getFrame();
      if (frame !== null) frame.setTitle(JSFile.getTail(this.path));
      this.pgm.parseProgram();
   }
};

var KarelSaveDialogListener = function(pgm, dialog) {
   this.pgm = pgm;
   this.dialog = dialog;
};

KarelSaveDialogListener.prototype.actionPerformed = function(e) {
   if (e instanceof JSErrorEvent) {
      // Fill in
   } else {
      var path = e.getActionCommand();
      if (path !== null && path.length > 0) {
         var editor = this.pgm.getEditor();
         var text = editor.getText();
         new JSFile(path).write(text, new KarelSaveFileListener(this.pgm, path));
      }
   }
};

var KarelSaveFileListener = function(pgm, path) {
   this.pgm = pgm;
   this.path = path;
};

KarelSaveFileListener.prototype.actionPerformed = function(e) {
   var editor = this.pgm.getEditor();
   var frame = editor.getFrame();
   if (frame !== null) frame.setTitle(JSFile.getTail(this.path));
};


/* KarelBlockOperator.js */

var KarelBlockOperator = function() {
   Operator.call(this);
   this.setName("BLOCK");
};

KarelBlockOperator.prototype = 
   jslib.inheritPrototype(Operator, "KarelBlockOperator extends Operator");
KarelBlockOperator.prototype.constructor = KarelBlockOperator;
KarelBlockOperator.prototype.$class = 
   new Class("KarelBlockOperator", KarelBlockOperator);

KarelBlockOperator.prototype.compile = function(p, args, cv) {
   for (var i = 0; i < args.length; i++) {
      p.compile(args[i], cv);
   }
};


/* KarelConsole.js */

var KarelConsole = function(app) {
   JSConsole.call(this);
   this.app = app;
   this.setFont(KC.CONSOLE_FONT);
   this.addActionListener(this);
};

KarelConsole.prototype = 
   jslib.inheritPrototype(JSConsole, "KarelConsole extends JSConsole");
KarelConsole.prototype.constructor = KarelConsole;
KarelConsole.prototype.$class = 
   new Class("KarelConsole", KarelConsole);

KarelConsole.prototype.actionPerformed = function(e) {
   this.app.executeUserCommand(e.getActionCommand());
};


/* KarelEditor.js */

var KarelEditor = function() {
   ProgramEditor.call(this);
   this.scanner = new TokenScanner();
   this.scanner.ignoreWhitespace();
   this.scanner.ignoreComments();
   this.scanner.scanNumbers();
   this.scanner.addWordCharacters("?+-");
   this.setFont(KC.EDITOR_FONT);
   this.setLineWrap(false);
   this.setEditorMode(new CommentHighlightMode());
};

KarelEditor.prototype = 
   jslib.inheritPrototype(ProgramEditor, "KarelEditor extends ProgramEditor");
KarelEditor.prototype.constructor = KarelEditor;
KarelEditor.prototype.$class = 
   new Class("KarelEditor", KarelEditor);

KarelEditor.prototype.getPreferredSize = function() {
   return new Dimension(KC.EDITOR_WIDTH, KC.EDITOR_HEIGHT);
};

KarelEditor.prototype.isBreakpointLegal = function(k) {
   this.updateLineTable();
   return this.lineTable.containsValue(k);
};

KarelEditor.prototype.getSourceLineIndex = function(addr) {
   var k = this.lineTable.get(addr);
   return (k === null) ? 0 : k;
};

KarelEditor.prototype.updateLineTable = function() {
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

KarelEditor.prototype.paint = function(g) {
   if (g.getFont().getSize() >= 22) return;
   ProgramEditor.prototype.paint.call(this, g);
};


/* KarelEditWorldControl.js */

var KarelEditWorldControl = function() {
   JSControl.call(this);
   this.setName("Edit World");
   this.setIcon(this.createImageIcon(KarelEditWorldControl.CONTROL));
   this.setDisabledIcon(this.createImageIcon(KarelEditWorldControl.DISABLED));
   this.setRolloverIcon(this.createImageIcon(KarelEditWorldControl.ROLLOVER));
   this.setPressedIcon(this.createImageIcon(KarelEditWorldControl.PRESSED));
};

KarelEditWorldControl.prototype = 
   jslib.inheritPrototype(JSControl, "KarelEditWorldControl extends JSControl");
KarelEditWorldControl.prototype.constructor = KarelEditWorldControl;
KarelEditWorldControl.prototype.$class = 
   new Class("KarelEditWorldControl", KarelEditWorldControl);

KarelEditWorldControl.CONTROL =
"data:image/png;base64," +
"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" +
"AAAAAElFTkSuQmCC";
KarelEditWorldControl.DISABLED =
"data:image/png;base64," +
"iVBORw0KGgoAAAANSUhEUgAAARcAAAEXCAYAAACH0wDUAAAs5klEQVR42u2d" +
"eVvUvNeA3+//DX4qoiCLCoKAgMgqqyiLIMgiuwIKKLsgj/bt6TjSnKRN0qad" +
"pj1zXfcfMG323pOkafp/7xzn/wiCIExDhUAQBMmFIAiSC0EQJBcqBML5vxcv" +
"Xjh+GhoanP/9739SHjx44OBzX7165VCZElQIOQcudLjgVUSRFs+ePSMBkVwI" +
"m3oeqr2NrFLuBVF9klyICvZG4EK0WSQ6kHBILoSFMmlubnY6OjoYJt688Xgz" +
"MfGPzzs7HjsuE+7fGBwGkFTvhoZUJBciBqaGOGV5gABmZmY8Ofz8+dP5/fs3" +
"z58/DH/c/2F+y0Bh/P7z22Pn846zsLjgSmvCk0Pzs2aSDcmFSAOY5IxzgYFA" +
"hoaGPIlsb287X79+df777z/z3LDc/MeCj5d9//3HD2fLTe+4m+7xvz2gOL00" +
"kDK1J5ILDXfcX9yoMunp6XGmp6edH+7FmYhEUpLLTcAxkK+FhQVPmFF7cTRX" +
"Q3IpHLq/zH6ZfP267158N+kKpQJywfhlE6VnQ+2O5EJzKH+B4QErE0yx5ILP" +
"2XeHfVA+IF0d2dCwieSSm7UnOr2TwcEhZ2Vl1fn168blVzg3PDc3N6HIwrxB" +
"COPAx3DcsNyw4POjpBOHCezt7zvj4+NaooF5LmqnJJfc9lLgl/fDhw/O+fkF" +
"ujBJLjpy8bOysuKKelBL7NRuSS65kArcHp6amnK+f/8efFGSXCLLpXzc+fm5" +
"J+6O9g6SDMklvxO0DfX1Xrd9f29P7aIkucSWy22+bjyRQ/k31DeQZEgu+ZAK" +
"dM+hm659UZJcjMrFz/7evvKwido5ySWDUhlwjo4OnevrK48rjmuG8nHBx7Nc" +
"e+ewcMdcIa4x6PwrlmsROF4ch+R4Li9X1wKuGGTp5svuGiEoQzfcw8NDZ2xs" +
"TGkSmNo9ySVRVH7pBgdYqZBcsiuXMqenpyQZkks2J2qhUULjPHJ/CcUXMckl" +
"y3LxcI87PTtTkgzNyZBcEl+nUpbKmfvLF34Rk1xskEsZkMy7d1NOfX09rZMh" +
"uaQ7BAKpjI6OOicnJ94TxkQeuEKU/j83NyeVDF0vJBcjQyCSSrHkUubdu3eh" +
"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";
KarelEditWorldControl.PRESSED =
"data:image/png;base64," +
"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" +
"g7hgMJh88v+VIwmFIIceYQAAAABJRU5ErkJggg==";
KarelEditWorldControl.ROLLOVER =
"data:image/png;base64," +
"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";

/* KarelFunctionKeyword.js */

var KarelFunctionKeyword = function() {
   PrefixOperator.call(this);
};

KarelFunctionKeyword.prototype =
   jslib.inheritPrototype(PrefixOperator, "KarelFunctionKeyword extends PrefixOperator");
KarelFunctionKeyword.prototype.constructor = KarelFunctionKeyword;
KarelFunctionKeyword.prototype.$class = 
   new Class("KarelFunctionKeyword", KarelFunctionKeyword);

KarelFunctionKeyword.prototype.prefixAction = function(p) {
   var jsp = p;
   var fn = jsp.readFunctionEntry();
   return fn;
};

KarelFunctionKeyword.prototype.compile = function(p, args, cv) {
   cv.addInstruction(SVMC.PUSHFN, cv.labelRef(args[0].getName()));
};


/* KarelGraphics.js */

var KarelGraphics = function() {
   /* Empty */
};

KarelGraphics.drawBeeper = function(g, x, y, size, bg, label) {
   var g2 = g.create();
   var fg = g2.getColor();
   var ps = toInt(Math.round(size * KC.BEEPER_LABEL_FRACTION));
   ps = Math.min(ps, KC.BEEPER_LABEL_MAX_SIZE);
   if (ps < KC.BEEPER_LABEL_MIN_SIZE) ps = 0;
   var p = new Polygon();
   p.addPoint(x - size / 2, y);
   p.addPoint(x, y + size / 2);
   p.addPoint(x + size / 2, y);
   p.addPoint(x, y - size / 2);
   p.addPoint(x - size / 2, y);
   g2.setColor((bg === null) ? KC.BEEPER_FILL_COLOR : bg);
   g2.fillPolygon(p);
   g2.setColor(fg);
   g2.drawPolygon(p);
   g2.setColor(Color.BLACK);
   if (ps > 0 && label.length > 0) {
      g2.setFont(new Font(KC.BEEPER_FONT_FAMILY, Font.PLAIN, ps));
      var fm = g2.getFontMetrics();
      var x0 = x - fm.stringWidth(label) / 2;
      var y0 = toInt(Math.round(y + KC.BEEPER_LABEL_DROP * fm.getAscent()));
      g2.drawString(label, x0, y0);
   }
   g2.dispose();
};

KarelGraphics.drawSimpleKarel = function(g, x, y, size, dir, bg) {
   var g2 = g.create();
   var fg = g2.getColor();
   g2.translate(x, y);
   g2.rotate(-Direction.getRotationAngle(dir));
   var p = new Polygon();
   p.addPoint(-size / 2, -size / 2);
   p.addPoint(-size / 2, size / 2);
   p.addPoint(0, size / 2);
   p.addPoint(size / 2, 0);
   p.addPoint(0, -size / 2);
   p.addPoint(-size / 2, -size / 2);
   g2.setColor((bg === null) ? Color.WHITE : bg);
   g2.fillPolygon(p);
   g2.setColor(fg);
   g2.drawPolygon(p);
   g2.dispose();
};

KarelGraphics.drawFancyKarel = function(g, x, y, size, dir, bg) {
   var g2 = g.create();
   var fg = g2.getColor();
   g2.translate(x, y);
   g2.rotate(-Direction.getRotationAngle(dir));
   for (var pass = 0; pass < 2; pass++) {
      var p = new Polygon();
      var cx = size * KC.BODY_OFFSET_X;
      var cy = -size * (KC.BODY_OFFSET_Y + KC.LOWER_NOTCH);
      var sx = cx + size * (KC.SCREEN_OFFSET_X - KC.BODY_OFFSET_X);
      var sy = cy - size * (KC.SCREEN_OFFSET_Y - KC.BODY_OFFSET_Y -
      KC.LOWER_NOTCH);
      KarelGraphics.addVertex(p, cx, cy);
      KarelGraphics.addVertex(p, cx, cy -= size * (KC.BODY_HEIGHT - KC.LOWER_NOTCH));
      KarelGraphics.addVertex(p, cx += size * (KC.BODY_WIDTH - KC.UPPER_NOTCH), cy);
      KarelGraphics.addVertex(p, cx += size * KC.UPPER_NOTCH, cy += size * KC.UPPER_NOTCH);
      KarelGraphics.addVertex(p, cx, cy += size * (KC.BODY_HEIGHT - KC.UPPER_NOTCH));
      KarelGraphics.addVertex(p, cx -= size * (KC.BODY_WIDTH - KC.LOWER_NOTCH), cy);
      KarelGraphics.addVertex(p, cx -= size * KC.LOWER_NOTCH, cy -= size * KC.LOWER_NOTCH);
      if (pass === 1) {
         g2.setColor(fg);
         g2.drawPolygon(p);
         p = new Polygon();
      }
      KarelGraphics.addVertex(p, sx, sy);
      KarelGraphics.addVertex(p, sx += KC.SCREEN_WIDTH * size, sy);
      KarelGraphics.addVertex(p, sx, sy -= KC.SCREEN_HEIGHT * size);
      KarelGraphics.addVertex(p, sx -= KC.SCREEN_WIDTH * size, sy);
      KarelGraphics.addVertex(p, sx, sy += KC.SCREEN_HEIGHT * size);
      if (pass === 0) {
         g2.setColor((bg === null) ? Color.WHITE : bg);
         g2.fillPolygon(p);
      } else {
         g2.setColor(fg);
         g2.drawPolygon(p);
      }
   }
   g2.setColor(fg);
   var p = new Polygon();
   var cx = size * (KC.SCREEN_OFFSET_X + KC.SCREEN_WIDTH);
   var cy = -size * (KC.SCREEN_OFFSET_Y + KC.BODY_OFFSET_Y) / 2;
   KarelGraphics.addVertex(p, cx - KC.SLOT_WIDTH, cy);
   KarelGraphics.addVertex(p, cx, cy);
   g2.drawPolygon(p);
   p = new Polygon();
   cx = size * KC.BODY_OFFSET_X;
   cy = -size * KC.SCREEN_OFFSET_Y;
   KarelGraphics.addVertex(p, cx, cy);
   KarelGraphics.addVertex(p, cx -= size * (KC.UPPER_ANKLE + KC.FOOT_WIDTH), cy);
   KarelGraphics.addVertex(p, cx, cy += size * KC.FOOT_LENGTH);
   KarelGraphics.addVertex(p, cx += size * KC.FOOT_WIDTH, cy);
   KarelGraphics.addVertex(p, cx, cy -= size * (KC.FOOT_LENGTH - KC.FOOT_WIDTH));
   KarelGraphics.addVertex(p, cx += size * KC.UPPER_ANKLE, cy);
   KarelGraphics.addVertex(p, cx, cy -= size * KC.FOOT_WIDTH);
   g2.fillPolygon(p);
   g2.drawPolygon(p);
   p = new Polygon();
   cx = size * (KC.SCREEN_OFFSET_X + KC.SCREEN_WIDTH - KC.SLOT_WIDTH);
   cy = -size * KC.BODY_OFFSET_Y;
   KarelGraphics.addVertex(p, cx, cy);
   KarelGraphics.addVertex(p, cx, cy += size * (KC.LOWER_ANKLE + KC.FOOT_WIDTH));
   KarelGraphics.addVertex(p, cx += size * KC.FOOT_LENGTH, cy);
   KarelGraphics.addVertex(p, cx, cy -= size * KC.FOOT_WIDTH);
   KarelGraphics.addVertex(p, cx -= size * (KC.FOOT_LENGTH - KC.FOOT_WIDTH), cy);
   KarelGraphics.addVertex(p, cx, cy -= size * KC.LOWER_ANKLE);
   KarelGraphics.addVertex(p, cx -= size * KC.FOOT_WIDTH, cy);
   g2.fillPolygon(p);
   g2.drawPolygon(p);
   g2.dispose();
};

KarelGraphics.drawVerticalWall = function(g, x, y, size) {
   var g2 = g.create();
   g2.setStroke(KarelGraphics.NORMAL_WALL);
   g2.drawLine(x, y, x, y + size);
   g2.dispose();
};

KarelGraphics.drawHorizontalWall = function(g, x, y, size) {
   var g2 = g.create();
   g2.setStroke(KarelGraphics.NORMAL_WALL);
   g2.drawLine(x, y, x + size, y);
   g2.dispose();
};

KarelGraphics.addVertex = function(p, x, y) {
   p.addPoint(toInt(Math.round(x)), toInt(Math.round(y)));
};

KarelGraphics.THIN_WALL =
new BasicStroke(1, BasicStroke.CAP_SQUARE, BasicStroke.JOIN_MITER);
KarelGraphics.NORMAL_WALL =
new BasicStroke(2, BasicStroke.CAP_SQUARE, BasicStroke.JOIN_MITER);
KarelGraphics.THICK_WALL =
new BasicStroke(3, BasicStroke.CAP_SQUARE, BasicStroke.JOIN_MITER);

/* KarelIfStatement.js */

var KarelIfStatement = function() {
   Statement.call(this);
};

KarelIfStatement.prototype =
   jslib.inheritPrototype(Statement, "KarelIfStatement extends Statement");
KarelIfStatement.prototype.constructor = KarelIfStatement;
KarelIfStatement.prototype.$class = 
   new Class("KarelIfStatement", KarelIfStatement);

KarelIfStatement.prototype.prefixAction = function(p) {
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

KarelIfStatement.prototype.compile = function(p, args, cv) {
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


/* KarelLayout.js */

var KarelLayout = function() {
   this.controls = null;
   this.editor = null;
   this.ui = null;
   this.world = null;
};

KarelLayout.prototype.addLayoutComponent = function(name, comp) {
   if (jslib.equals(name, "controls")) {
      this.controls = comp;
   } else if (jslib.equals(name, "world")) {
      this.world = comp;
   } else if (jslib.equals(name, "ui")) {
      this.ui = comp;
   } else if (jslib.equals(name, "editor")) {
      this.editor = comp;
   } else {
      throw new RuntimeException("Illegal component name: " + name);
   }
};

KarelLayout.prototype.removeLayoutComponent = function(comp) {
   /* Empty */
};

KarelLayout.prototype.preferredLayoutSize = function(target) {
   if (target.getTreeLock()) {
      var insets = target.getInsets();
      var ch = (this.controls === null) ? 0 : this.controls.getPreferredSize().height;
      var width = KC.LEFT_MARGIN + KC.WORLD_WIDTH + KC.COMPONENT_SEP +
      KC.EDITOR_WIDTH + KC.RIGHT_MARGIN +
      insets.left + insets.right;
      var height = KC.TOP_MARGIN + KC.WORLD_HEIGHT + KC.COMPONENT_SEP +
      KC.CONSOLE_HEIGHT + KC.BOTTOM_MARGIN + ch +
      insets.top + insets.bottom;
      return new Dimension(width, height);
   }
};

KarelLayout.prototype.minimumLayoutSize = function(target) {
   return this.preferredLayoutSize(target);
};

KarelLayout.prototype.layoutContainer = function(target) {
   if (target.getTreeLock()) {
      var insets = target.getInsets();
      var bounds = target.getBounds();
      var ch = (this.controls === null) ? 0 : this.controls.getPreferredSize().height;
      var x0 = bounds.x + insets.left;
      var y0 = bounds.y + insets.top;
      var width = bounds.width - insets.left - insets.right;
      var height = bounds.height - insets.top - insets.bottom;
      if (this.world !== null) {
         var x = x0 + KC.LEFT_MARGIN;
         var y = y0 + KC.TOP_MARGIN;
         var w = KC.WORLD_WIDTH;
         var h = KC.WORLD_HEIGHT;
         this.world.setBounds(x, y, w, h);
      }
      if (this.ui !== null) {
         var x = x0 + KC.LEFT_MARGIN;
         var y = y0 + KC.TOP_MARGIN + KC.WORLD_HEIGHT + KC.COMPONENT_SEP;
         var w = KC.CONSOLE_WIDTH;
         var h = y0 + height - y - KC.BOTTOM_MARGIN - ch;
         this.ui.setBounds(x, y, w, h);
      }
      if (this.editor !== null) {
         var x = x0 + KC.LEFT_MARGIN + KC.WORLD_WIDTH + KC.COMPONENT_SEP;
         var y = y0 + KC.TOP_MARGIN;
         var w = x0 + width - x - KC.RIGHT_MARGIN;
         var h = y0 + height - y - KC.BOTTOM_MARGIN - ch;
         this.editor.setBounds(x, y, w, h);
      }
      if (this.controls !== null) {
         this.controls.setBounds(0, height - ch, width, ch);
      }
   }
};


/* KarelNOTOperator.js */

var KarelNOTOperator = function() {
   PrefixOperator.call(this);
};

KarelNOTOperator.prototype =
   jslib.inheritPrototype(PrefixOperator, "KarelNOTOperator extends PrefixOperator");
KarelNOTOperator.prototype.constructor = KarelNOTOperator;
KarelNOTOperator.prototype.$class = 
   new Class("KarelNOTOperator", KarelNOTOperator);

KarelNOTOperator.prototype.compile = function(p, args, cv) {
   p.compile(args[0], cv);
   cv.addInstruction(SVMC.NOT, 0);
};


/* KarelOROperator.js */

var KarelOROperator = function() {
   InfixForm.call(this);
};

KarelOROperator.prototype =
   jslib.inheritPrototype(InfixForm, "KarelOROperator extends InfixForm");
KarelOROperator.prototype.constructor = KarelOROperator;
KarelOROperator.prototype.$class = 
   new Class("KarelOROperator", KarelOROperator);

KarelOROperator.prototype.compile = function(p, args, cv) {
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


/* KarelParenOperator.js */

var KarelParenOperator = function() {
   Operator.call(this);
};

KarelParenOperator.prototype =
   jslib.inheritPrototype(Operator, "KarelParenOperator extends Operator");
KarelParenOperator.prototype.constructor = KarelParenOperator;
KarelParenOperator.prototype.$class = 
   new Class("KarelParenOperator", KarelParenOperator);

KarelParenOperator.prototype.prefixAction = function(p) {
   var exp = p.readE(0);
   p.verifyToken(")");
   return p.createCompound1(this, exp);
};

KarelParenOperator.prototype.infixAction = function(p, lhs) {
   p.verifyToken(")");
   return p.createCompound(lhs, jslib.newArray(0));
};

KarelParenOperator.prototype.compile = function(p, args, cv) {
   p.compile(args[0], cv);
};

KarelParenOperator.prototype.unparse = function(p, args) {
   return "(" + p.unparse(args[0]) + ")";
};


/* KarelParser.js */

var KarelParser = function() {
   Parser.call(this);
   this.blockOperator = new KarelBlockOperator();
   this.statementOperator = new KarelStatementOperator();
   this.functionKeyword = new KarelFunctionKeyword();
   this.statementStack = new Stack();
   this.defineOperators();
   this.defineStatementForms();
};

KarelParser.prototype = 
   jslib.inheritPrototype(Parser, "KarelParser extends Parser");
KarelParser.prototype.constructor = KarelParser;
KarelParser.prototype.$class = 
   new Class("KarelParser", KarelParser);

KarelParser.prototype.createTokenScanner = function() {
   var scanner = new TokenScanner();
   scanner.ignoreWhitespace();
   scanner.ignoreComments();
   scanner.scanStrings();
   scanner.scanNumbers();
   scanner.addWordCharacters("_");
   this.addOperatorTokens(scanner);
   return scanner;
};

KarelParser.prototype.addOperatorTokens = function(scanner) {
   scanner.addOperator("&&");
   scanner.addOperator("||");
};

KarelParser.prototype.defineOperators = function() {
   var LEFT = Operator.LEFT;
   var RIGHT = Operator.RIGHT;
   this.defineOperator("(", new KarelParenOperator(), 0, 110, RIGHT);
   this.definePrefixOperator("!", new KarelNOTOperator(), 100);
   this.defineInfixOperator("&&", new KarelANDOperator(), 30, LEFT);
   this.defineInfixOperator("||", new KarelOROperator(), 20, LEFT);
};

KarelParser.prototype.readModule = function(vm) {
   while (this.hasMoreTokens()) {
      this.readFunction(vm);
   }
};

KarelParser.prototype.readFunction = function(vm) {
   var token = this.nextToken();
   if (jslib.equals(token, "function")) {
      var entry = this.readFunctionEntry();
      var args = entry.getArgs();
      var name = args[0].getName();
      if (name.contains("#")) {
         throw new SyntaxError("Top-level functions must have names");
      }
      var body = args[3];
      var cv = new CodeVector();
      this.compile(body, cv);
      cv.addInstruction(SVMC.RETURN, 0);
      var code = cv.getCode();
      var fc = new SVMFunctionClosure(code, 0, null);
      vm.setGlobal(name, Value.createObject(fc, "FunctionClosure"));
   } else {
      throw new SyntaxError("Illegal top-level definition");
   }
};

KarelParser.prototype.readFunctionEntry = function() {
   var name = this.nextToken();
   this.verifyToken("(");
   this.verifyToken(")");
   var formals = new ArrayList();
   var locals = new ArrayList();
   var body = this.readCompoundStatement();
   var fn = this.createCompound4(this.functionKeyword, this.createIdentifier(name), this.createList("formals", formals), this.createList("locals", locals), body);
   return fn;
};

KarelParser.prototype.defineStatementForms = function() {
   this.defineStatementForm("if", new KarelIfStatement());
   this.defineStatementForm("while", new KarelWhileStatement());
   this.defineStatementForm("repeat", new KarelRepeatStatement());
};

KarelParser.prototype.compile = function(exp, cv) {
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

KarelParser.prototype.compileConstant = function(value, cv) {
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

KarelParser.prototype.compileIdentifier = function(name, cv) {
   cv.addInstruction(SVMC.PUSHVAR, cv.stringRef(name));
};

KarelParser.prototype.compileCompound = function(exp, cv) {
   var fn = exp.getFunction();
   var type = fn.getType();
   if (type === Expression.OPERATOR) {
      (fn).compile(this, exp.getArgs(), cv);
   } else {
      cv.addInstruction(SVMC.PUSHSTR, cv.stringRef(fn.toString()));
      cv.addInstruction(SVMC.CALLM, cv.stringRef("Global.get"));
      cv.addInstruction(SVMC.CALLFN, 0);
   }
};

KarelParser.prototype.compileArgs = function(args, cv) {
   var n = args.length;
   for (var i = 0; i < n; i++) {
      this.compile(args[i], cv);
   }
};

KarelParser.prototype.createList = function(key, list) {
   var n = list.size();
   var args = jslib.newArray(n);
   for (var i = 0; i < n; i++) {
      args[i] = this.createIdentifier(list.get(i));
   }
   return this.createCompound(this.createIdentifier(key), args);
};

KarelParser.prototype.readStatement = function() {
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

KarelParser.prototype.readCompoundStatement = function() {
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

KarelParser.prototype.defineStatementForm = function(name, op) {
   this.defineOperator(name, op, 0, 0, Operator.LEFT);
};

KarelParser.prototype.pushStatementContext = function(breakLabel, continueLabel) {
   var sc = new StatementContext();
   sc.breakLabel = breakLabel;
   sc.continueLabel = continueLabel;
   sc.nextLabel = null;
   this.statementStack.push(sc);
};

KarelParser.prototype.popStatementContext = function() {
   this.statementStack.pop();
};

KarelParser.prototype.getStatementDepth = function() {
   return this.statementStack.size();
};

KarelParser.prototype.setNextLabel = function(str) {
   this.statementStack.peek().nextLabel = str;
};

KarelParser.prototype.getNextLabel = function() {
   return this.statementStack.peek().nextLabel;
};

KarelParser.prototype.getBreakLabel = function() {
   return this.statementStack.peek().breakLabel;
};

KarelParser.prototype.getContinueLabel = function() {
   return this.statementStack.peek().continueLabel;
};

KarelParser.prototype.createConstant = function(token) {
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


/* KarelRepeatStatement.js */

var KarelRepeatStatement = function() {
   Statement.call(this);
};

KarelRepeatStatement.prototype =
   jslib.inheritPrototype(Statement, "KarelRepeatStatement extends Statement");
KarelRepeatStatement.prototype.constructor = KarelRepeatStatement;
KarelRepeatStatement.prototype.$class = 
   new Class("KarelRepeatStatement", KarelRepeatStatement);

KarelRepeatStatement.prototype.prefixAction = function(p) {
   p.verifyToken("(");
   var token = p.nextToken();
   var type = p.getTokenType(token);
   if (type !== TokenScanner.NUMBER) {
      throw new SyntaxError("Missing repeat count");
   }
   var count = p.createConstant(token);
   p.verifyToken(")");
   var stmt = (p).readCompoundStatement();
   return p.createCompound2(this, count, stmt);
};

KarelRepeatStatement.prototype.compile = function(p, args, cv) {
   var jsp = p;
   var count = args[0];
   var stmt = args[1];
   var tag1 = cv.newLabel();
   var tag2 = cv.newLabel();
   var tag3 = cv.newLabel();
   jsp.pushStatementContext(tag3, tag2);
   var index = "i_" + jsp.getStatementDepth();
   var max = "n_" + jsp.getStatementDepth();
   cv.addInstruction(SVMC.VAR, cv.stringRef(index));
   cv.addInstruction(SVMC.VAR, cv.stringRef(max));
   p.compile(count, cv);
   cv.addInstruction(SVMC.POPVAR, cv.stringRef(max));
   cv.addInstruction(SVMC.PUSHINT, 0);
   cv.addInstruction(SVMC.POPVAR, cv.stringRef(index));
   cv.defineLabel(tag1);
   cv.addInstruction(SVMC.PUSHVAR, cv.stringRef(index));
   cv.addInstruction(SVMC.PUSHVAR, cv.stringRef(max));
   cv.addInstruction(SVMC.LT, 0);
   cv.addInstruction(SVMC.JUMPF, cv.labelRef(tag3));
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


/* KarelStatementOperator.js */

var KarelStatementOperator = function() {
   Operator.call(this);
   this.setName("STMT");
};

KarelStatementOperator.prototype = 
   jslib.inheritPrototype(Operator, "KarelStatementOperator extends Operator");
KarelStatementOperator.prototype.constructor = KarelStatementOperator;
KarelStatementOperator.prototype.$class = 
   new Class("KarelStatementOperator", KarelStatementOperator);

KarelStatementOperator.prototype.compile = function(p, args, cv) {
   cv.addInstruction(SVMC.STMT, args[0].getValue().getIntegerValue());
   p.compile(args[1], cv);
};


/* KarelVM.js */

var KarelVM = function(app) {
   SVM.call(this);
   this.app = app;
   this.defineBuiltInFunctions();
   this.setTarget(this);
   this.setSpeed(90);
   this.addChangeListener(new KarelVMChangeListener(app));
};

KarelVM.prototype = 
   jslib.inheritPrototype(SVM, "KarelVM extends SVM");
KarelVM.prototype.constructor = KarelVM;
KarelVM.prototype.$class = 
   new Class("KarelVM", KarelVM);

KarelVM.prototype.getConsole = function() {
   return this.app.getConsole();
};

KarelVM.prototype.getWorld = function() {
   return this.app.getWorld();
};

KarelVM.prototype.execute = function(str) {
   var v = this.getGlobal(str);
   var type = v.getClassName();
   if (jslib.equals(type, "FunctionClosure")) {
      var fc = v.getValue();
      this.setCode(fc.getCode());
      this.setPC(0);
      this.start(Controller.RUNNING);
      return false;
   } else {
      var fn = v.getValue();
      fn.execute(this, null);
      return true;
   }
};

KarelVM.prototype.defineBuiltInFunctions = function() {
   this.defineMethod("move", new KarelMove());
   this.defineMethod("turnLeft", new KarelTurnLeft());
   this.defineMethod("pickBeeper", new KarelPickBeeper());
   this.defineMethod("putBeeper", new KarelPutBeeper());
   this.defineMethod("frontIsClear", new KarelFrontIsClear());
   this.defineMethod("frontIsBlocked", new KarelFrontIsBlocked());
   this.defineMethod("leftIsClear", new KarelLeftIsClear());
   this.defineMethod("leftIsBlocked", new KarelLeftIsBlocked());
   this.defineMethod("rightIsClear", new KarelRightIsClear());
   this.defineMethod("rightIsBlocked", new KarelRightIsBlocked());
   this.defineMethod("beepersInBag", new KarelBeepersInBag());
   this.defineMethod("noBeepersInBag", new KarelBeepersInBag());
};

KarelVM.prototype.defineMethod = function(name, method) {
   this.setGlobal(name, Value.createObject(method, "SVMMethod"));
};

var KarelMove = function() {
   SVMMethod.call(this);
};

KarelMove.prototype =
   jslib.inheritPrototype(SVMMethod, "KarelMove extends SVMMethod");
KarelMove.prototype.constructor = KarelMove;
KarelMove.prototype.$class = 
   new Class("KarelMove", KarelMove);

KarelMove.prototype.execute = function(svm, receiver) {
   (svm).getWorld().getKarel().move();
};

var KarelTurnLeft = function() {
   SVMMethod.call(this);
};

KarelTurnLeft.prototype =
   jslib.inheritPrototype(SVMMethod, "KarelTurnLeft extends SVMMethod");
KarelTurnLeft.prototype.constructor = KarelTurnLeft;
KarelTurnLeft.prototype.$class = 
   new Class("KarelTurnLeft", KarelTurnLeft);

KarelTurnLeft.prototype.execute = function(svm, receiver) {
   (svm).getWorld().getKarel().turnLeft();
};

var KarelPickBeeper = function() {
   SVMMethod.call(this);
};

KarelPickBeeper.prototype =
   jslib.inheritPrototype(SVMMethod, "KarelPickBeeper extends SVMMethod");
KarelPickBeeper.prototype.constructor = KarelPickBeeper;
KarelPickBeeper.prototype.$class = 
   new Class("KarelPickBeeper", KarelPickBeeper);

KarelPickBeeper.prototype.execute = function(svm, receiver) {
   (svm).getWorld().getKarel().pickBeeper();
};

var KarelPutBeeper = function() {
   SVMMethod.call(this);
};

KarelPutBeeper.prototype =
   jslib.inheritPrototype(SVMMethod, "KarelPutBeeper extends SVMMethod");
KarelPutBeeper.prototype.constructor = KarelPutBeeper;
KarelPutBeeper.prototype.$class = 
   new Class("KarelPutBeeper", KarelPutBeeper);

KarelPutBeeper.prototype.execute = function(svm, receiver) {
   (svm).getWorld().getKarel().putBeeper();
};

var KarelFrontIsClear = function() {
   SVMMethod.call(this);
};

KarelFrontIsClear.prototype =
   jslib.inheritPrototype(SVMMethod, "KarelFrontIsClear extends SVMMethod");
KarelFrontIsClear.prototype.constructor = KarelFrontIsClear;
KarelFrontIsClear.prototype.$class = 
   new Class("KarelFrontIsClear", KarelFrontIsClear);

KarelFrontIsClear.prototype.execute = function(svm, receiver) {
   var kvm = (svm);
   kvm.pushBoolean(kvm.getWorld().getKarel().frontIsClear());
};

var KarelFrontIsBlocked = function() {
   SVMMethod.call(this);
};

KarelFrontIsBlocked.prototype =
   jslib.inheritPrototype(SVMMethod, "KarelFrontIsBlocked extends SVMMethod");
KarelFrontIsBlocked.prototype.constructor = KarelFrontIsBlocked;
KarelFrontIsBlocked.prototype.$class = 
   new Class("KarelFrontIsBlocked", KarelFrontIsBlocked);

KarelFrontIsBlocked.prototype.execute = function(svm, receiver) {
   var kvm = (svm);
   kvm.pushBoolean(kvm.getWorld().getKarel().frontIsBlocked());
};

var KarelLeftIsClear = function() {
   SVMMethod.call(this);
};

KarelLeftIsClear.prototype =
   jslib.inheritPrototype(SVMMethod, "KarelLeftIsClear extends SVMMethod");
KarelLeftIsClear.prototype.constructor = KarelLeftIsClear;
KarelLeftIsClear.prototype.$class = 
   new Class("KarelLeftIsClear", KarelLeftIsClear);

KarelLeftIsClear.prototype.execute = function(svm, receiver) {
   var kvm = (svm);
   kvm.pushBoolean(kvm.getWorld().getKarel().leftIsClear());
};

var KarelLeftIsBlocked = function() {
   SVMMethod.call(this);
};

KarelLeftIsBlocked.prototype =
   jslib.inheritPrototype(SVMMethod, "KarelLeftIsBlocked extends SVMMethod");
KarelLeftIsBlocked.prototype.constructor = KarelLeftIsBlocked;
KarelLeftIsBlocked.prototype.$class = 
   new Class("KarelLeftIsBlocked", KarelLeftIsBlocked);

KarelLeftIsBlocked.prototype.execute = function(svm, receiver) {
   var kvm = (svm);
   kvm.pushBoolean(kvm.getWorld().getKarel().leftIsBlocked());
};

var KarelRightIsClear = function() {
   SVMMethod.call(this);
};

KarelRightIsClear.prototype =
   jslib.inheritPrototype(SVMMethod, "KarelRightIsClear extends SVMMethod");
KarelRightIsClear.prototype.constructor = KarelRightIsClear;
KarelRightIsClear.prototype.$class = 
   new Class("KarelRightIsClear", KarelRightIsClear);

KarelRightIsClear.prototype.execute = function(svm, receiver) {
   var kvm = (svm);
   kvm.pushBoolean(kvm.getWorld().getKarel().rightIsClear());
};

var KarelRightIsBlocked = function() {
   SVMMethod.call(this);
};

KarelRightIsBlocked.prototype =
   jslib.inheritPrototype(SVMMethod, "KarelRightIsBlocked extends SVMMethod");
KarelRightIsBlocked.prototype.constructor = KarelRightIsBlocked;
KarelRightIsBlocked.prototype.$class = 
   new Class("KarelRightIsBlocked", KarelRightIsBlocked);

KarelRightIsBlocked.prototype.execute = function(svm, receiver) {
   var kvm = (svm);
   kvm.pushBoolean(kvm.getWorld().getKarel().rightIsBlocked());
};

var KarelBeepersInBag = function() {
   SVMMethod.call(this);
};

KarelBeepersInBag.prototype =
   jslib.inheritPrototype(SVMMethod, "KarelBeepersInBag extends SVMMethod");
KarelBeepersInBag.prototype.constructor = KarelBeepersInBag;
KarelBeepersInBag.prototype.$class = 
   new Class("KarelBeepersInBag", KarelBeepersInBag);

KarelBeepersInBag.prototype.execute = function(svm, receiver) {
   var kvm = (svm);
   kvm.pushBoolean(kvm.getWorld().getKarel().beepersInBag());
};

var KarelNoBeepersInBag = function() {
   SVMMethod.call(this);
};

KarelNoBeepersInBag.prototype =
   jslib.inheritPrototype(SVMMethod, "KarelNoBeepersInBag extends SVMMethod");
KarelNoBeepersInBag.prototype.constructor = KarelNoBeepersInBag;
KarelNoBeepersInBag.prototype.$class = 
   new Class("KarelNoBeepersInBag", KarelNoBeepersInBag);

KarelNoBeepersInBag.prototype.execute = function(svm, receiver) {
   var kvm = (svm);
   kvm.pushBoolean(kvm.getWorld().getKarel().noBeepersInBag());
};

var KarelVMChangeListener = function(pgm) {
   this.pgm = pgm;
};

KarelVMChangeListener.prototype.stateChanged = function(e) {
   if (this.pgm.getVM().getState() === Controller.STOPPED) {
      this.pgm.getCommand();
   }
};


/* KarelWhileStatement.js */

var KarelWhileStatement = function() {
   Statement.call(this);
};

KarelWhileStatement.prototype =
   jslib.inheritPrototype(Statement, "KarelWhileStatement extends Statement");
KarelWhileStatement.prototype.constructor = KarelWhileStatement;
KarelWhileStatement.prototype.$class = 
   new Class("KarelWhileStatement", KarelWhileStatement);

KarelWhileStatement.prototype.prefixAction = function(p) {
   var jsp = p;
   jsp.verifyToken("(");
   var exp = jsp.readE(0);
   jsp.verifyToken(")");
   var s = jsp.readStatement();
   return jsp.createCompound2(this, exp, s);
};

KarelWhileStatement.prototype.compile = function(p, args, cv) {
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


/* KarelWorld.js */

var KarelWorld = function() {
   this.listeners = new ArrayList();
   this.resize(10, 10);
};

KarelWorld.prototype.resize = function(width, height) {
   this.width = width;
   this.height = height;
   this.karels = new ArrayList();
   this.map = jslib.newArray(width + 2, height + 2);
   for (var x = 1; x <= width + 1; x++) {
      for (var y = 1; y <= height + 1; y++) {
         this.map[x][y] = new Corner();
         this.map[x][y].wallSouth = (y === 1) || (y === height + 1);
         this.map[x][y].wallWest = (x === 1) || (x === width + 1);
         this.map[x][y].color = null;
         this.map[x][y].nBeepers = 0;
      }
   }
   this.update();
};

KarelWorld.prototype.addKarel = function(karel) {
   if (this.karels.indexOf(karel) === -1) {
      karel.setWorld(this);
      this.karels.add(karel);
   }
   this.update();
};

KarelWorld.prototype.removeKarel = function(karel) {
   this.karels.remove(karel);
   karel.setWorld(null);
   this.update();
};

KarelWorld.prototype.getKarel = function() {
   return this.getKarelAtIndex(0);
};

KarelWorld.prototype.getKarelAtIndex = function(k) {
   if (k < 0 || k >= this.karels.size()) {
      throw new RuntimeException("Illegal Karel index");
   }
   return this.karels.get(k);
};

KarelWorld.prototype.getKarelCount = function() {
   return this.karels.size();
};

KarelWorld.prototype.getKarelOnSquare = function(x, y) {
   var el0 = new JSElementList(this.karels);
   for (var ei0 = 0; ei0 < el0.size(); ei0++) {
      var karel = el0.get(ei0);
      var pt = karel.getLocation();
      if (pt.x === x && pt.y === y) return karel;
   }
   return null;
};

KarelWorld.prototype.setFilePath = function(path) {
   this.filePath = path;
};

KarelWorld.prototype.getFilePath = function() {
   return this.filePath;
};

KarelWorld.prototype.reset = function() {
   /* Empty */
};

KarelWorld.prototype.getNCols = function() {
   return this.width;
};

KarelWorld.prototype.getNRows = function() {
   return this.height;
};

KarelWorld.prototype.outOfBounds = function(x, y) {
   return x < 1 || x > this.width || y < 1 || y > this.height;
};

KarelWorld.prototype.getBeepersOnCorner = function(x, y) {
   return (this.map[x][y]).nBeepers;
};

KarelWorld.prototype.setBeepersOnCorner = function(x, y, nBeepers) {
   this.map[x][y].nBeepers = nBeepers;
   this.update();
};

KarelWorld.adjustBeepers = function(nBeepers, delta) {
   if (nBeepers === KC.INFINITE) return KC.INFINITE;
   return Math.max(nBeepers + delta, 0);
};

KarelWorld.setBeepers = function(nBeepers, delta) {
   if (delta === KC.INFINITE) return KC.INFINITE;
   if (delta === KC.PLUS1) {
      return (nBeepers === KC.INFINITE) ? KC.INFINITE : nBeepers + 1;
   }
   if (delta === KC.MINUS1) {
      if (nBeepers === 0) return 0;
      return (nBeepers === KC.INFINITE) ? KC.INFINITE : nBeepers - 1;
   }
   return delta;
};

KarelWorld.prototype.getCornerColor = function(x, y) {
   return this.map[x][y].color;
};

KarelWorld.prototype.setCornerColor = function(x, y, color) {
   this.map[x][y].color = color;
   this.update();
};

KarelWorld.prototype.checkWall = function(x, y, dir) {
   switch (dir) {
      case KarelWorld.SOUTH: return this.map[x][y].wallSouth;
      case KarelWorld.WEST:  return this.map[x][y].wallWest;
      case KarelWorld.NORTH: return this.map[x][y + 1].wallSouth;
      case KarelWorld.EAST:  return this.map[x + 1][y].wallWest;
   }
   return false;
};

KarelWorld.prototype.setWall = function(x, y, dir) {
   switch (dir) {
      case KarelWorld.SOUTH: this.map[x][y].wallSouth = true; break;
      case KarelWorld.WEST:  this.map[x][y].wallWest = true; break;
      case KarelWorld.NORTH: this.map[x][y + 1].wallSouth = true; break;
      case KarelWorld.EAST:  this.map[x + 1][y].wallWest = true; break;
   }
   this.update();
};

KarelWorld.prototype.clearWall = function(x, y, dir) {
   switch (dir) {
      case KarelWorld.SOUTH: this.map[x][y].wallSouth = false; break;
      case KarelWorld.WEST:  this.map[x][y].wallWest = false; break;
      case KarelWorld.NORTH: this.map[x][y + 1].wallSouth = false; break;
      case KarelWorld.EAST:  this.map[x + 1][y].wallWest = false; break;
   }
   this.update();
};

KarelWorld.prototype.trace = function() {
   this.update();
};

KarelWorld.prototype.addChangeListener = function(listener) {
   this.listeners.add(listener);
};

KarelWorld.prototype.removeChangeListener = function(listener) {
   this.listeners.remove(listener);
};

KarelWorld.prototype.update = function() {
   if (!this.loadInProgress) this.fireChangeListeners();
};

KarelWorld.prototype.fireChangeListeners = function() {
   var el0 = new JSElementList(this.listeners);
   for (var ei0 = 0; ei0 < el0.size(); ei0++) {
      var listener = el0.get(ei0);
      listener.stateChanged(new ChangeEvent(this));
   }
};

KarelWorld.encodeColor = function(color) {
   if (jslib.equals(color, Color.BLACK)) return "BLACK";
   if (jslib.equals(color, Color.BLUE)) return "BLUE";
   if (jslib.equals(color, Color.CYAN)) return "CYAN";
   if (jslib.equals(color, Color.DARK_GRAY)) return "DARK_GRAY";
   if (jslib.equals(color, Color.GRAY)) return "GRAY";
   if (jslib.equals(color, Color.GREEN)) return "GREEN";
   if (jslib.equals(color, Color.LIGHT_GRAY)) return "LIGHT_GRAY";
   if (jslib.equals(color, Color.MAGENTA)) return "MAGENTA";
   if (jslib.equals(color, Color.ORANGE)) return "ORANGE";
   if (jslib.equals(color, Color.PINK)) return "PINK";
   if (jslib.equals(color, Color.RED)) return "RED";
   if (jslib.equals(color, Color.WHITE)) return "WHITE";
   if (jslib.equals(color, Color.YELLOW)) return "YELLOW";
   return "0x" + Integer.toString(color.getRGB() & 0xFFFFFF).toUpperCase();
};

KarelWorld.decodeColor = function(name) {
   if (jslib.equalsIgnoreCase(name, "black")) return Color.BLACK;
   if (jslib.equalsIgnoreCase(name, "blue")) return Color.BLUE;
   if (jslib.equalsIgnoreCase(name, "cyan")) return Color.CYAN;
   if (jslib.equalsIgnoreCase(name, "darkgray")) return Color.DARK_GRAY;
   if (jslib.equalsIgnoreCase(name, "dark_gray")) return Color.DARK_GRAY;
   if (jslib.equalsIgnoreCase(name, "gray")) return Color.GRAY;
   if (jslib.equalsIgnoreCase(name, "green")) return Color.GREEN;
   if (jslib.equalsIgnoreCase(name, "lightgray")) return Color.LIGHT_GRAY;
   if (jslib.equalsIgnoreCase(name, "light_gray")) return Color.LIGHT_GRAY;
   if (jslib.equalsIgnoreCase(name, "magenta")) return Color.MAGENTA;
   if (jslib.equalsIgnoreCase(name, "orange")) return Color.ORANGE;
   if (jslib.equalsIgnoreCase(name, "pink")) return Color.PINK;
   if (jslib.equalsIgnoreCase(name, "red")) return Color.RED;
   if (jslib.equalsIgnoreCase(name, "white")) return Color.WHITE;
   if (jslib.equalsIgnoreCase(name, "yellow")) return Color.YELLOW;
   return Color.decode(name);
};

KarelWorld.prototype.save = function() {
   /* if (pathname === null) return;
   var pt = new Point(0, 0);
   try {
      var wr = new PrintWriter(new FileWriter(pathname));
      wr.println("Dimension: (" + this.width + ", " + this.height + ")");
      for (pt.x = 1; pt.x <= this.width; pt.x++) {
         for (pt.y = 1; pt.y <= this.height; pt.y++) {
            if (pt.x > 1 && this.checkWall(pt, KarelWorld.WEST)) {
               wr.println("Wall: (" + pt.x + ", " + pt.y + ") west");
            }
            if (pt.y > 1 && this.checkWall(pt, KarelWorld.SOUTH)) {
               wr.println("Wall: (" + pt.x + ", " + pt.y + ") south");
            }
         }
      }
      for (pt.x = 1; pt.x <= this.width; pt.x++) {
         for (pt.y = 1; pt.y <= this.height; pt.y++) {
            var color = this.getCornerColor(pt);
            if (color !== null) {
               wr.println("Color: (" + pt.x + ", " + pt.y + ") " +
               KarelWorld.encodeColor(color));
            }
            var nBeepers = this.getBeepersOnCorner(pt);
            if (nBeepers !== 0) {
               var str = (nBeepers === KC.INFINITE) ? "INFINITE" : "" + nBeepers;
               wr.println("Beeper: (" + pt.x + ", " + pt.y + ") " + str);
            }
         }
      }
      var iterator = this.karels.iterator();
      while (iterator.hasNext()) {
         var karel = iterator.next();
         var dirName = "Error";
         switch (karel.getDirection()) {
            case KarelWorld.NORTH: dirName = "north"; break;
            case KarelWorld.EAST:  dirName = "east"; break;
            case KarelWorld.SOUTH: dirName = "south"; break;
            case KarelWorld.WEST:  dirName = "west"; break;
         }
         var loc = karel.getLocation();
         wr.println("Karel: (" + loc.x + ", " + loc.y + ") " + dirName);
         var nBeepers = karel.getBeepersInBag();
         var str = (nBeepers === KC.INFINITE) ? "INFINITE" : "" + nBeepers;
         if (this.getKarelCount() === 1) {
            wr.println();
            wr.println("BeeperBag: " + str);
         } else {
            wr.println(" " + str);
         }
      }
      wr.println("Speed: " + this.speedFormat(this.getSpeed()));
      wr.close();
   } catch (ex) {
      throw new RuntimeException("" + ex);
   }
   */
};

KarelWorld.prototype.speedFormat = function(speed) {
   return (Double.toString(speed) + "00").substring(0, 4);
};

KarelWorld.prototype.load = function(str) {
   if (this) {
      this.loadInProgress = true;
      this.lastKarel = null;
      this.lastBeepers = KC.INFINITE;
      this.karels.clear();
      var scanner = new TokenScanner();
      scanner.ignoreWhitespace();
      scanner.ignoreComments();
      scanner.scanNumbers();
      scanner.scanStrings();
      scanner.addOperator(KarelWorld.EOL);
      scanner.setInput(str);
      while (this.readMapLine(scanner)) {
         /* Empty */
      }
      this.loadInProgress = false;
   }
   this.update();
};

KarelWorld.prototype.readMapLine = function(scanner) {
   var cmd = scanner.nextToken().toLowerCase();
   if (jslib.equals(cmd, "")) return false;
   if (jslib.equals(cmd, KarelWorld.EOL)) return true;
   scanner.verifyToken(":");
   if (jslib.equals(cmd, "dimension")) {
      this.dimensionCommand(scanner);
   } else if (jslib.equals(cmd, "karel")) {
      this.karelCommand(scanner);
   } else if (jslib.equals(cmd, "wall")) {
      this.wallCommand(scanner);
   } else if (jslib.equals(cmd, "color")) {
      this.setColorCommand(scanner);
   } else if (jslib.equals(cmd, "speed")) {
      this.speedCommand(scanner);
   } else if (jslib.equals(cmd, "beeper")) {
      this.beeperCommand(scanner);
   } else if (jslib.equals(cmd, "beeperbag")) {
      this.beeperBagCommand(scanner);
   } else {
      throw new RuntimeException("Illegal command: " + cmd);
   }
   return true;
};

KarelWorld.prototype.dimensionCommand = function(scanner) {
   var pt = this.scanPoint(scanner);
   scanner.verifyToken(KarelWorld.EOL);
   this.resize(pt.x, pt.y);
};

KarelWorld.prototype.karelCommand = function(scanner) {
   var pt = this.scanPoint(scanner);
   var dir = this.scanDirection(scanner);
   scanner.verifyToken(KarelWorld.EOL);
   this.lastKarel = new Karel();
   this.addKarel(this.lastKarel);
   this.lastKarel.setLocation(pt.x, pt.y);
   this.lastKarel.setDirection(dir);
   this.lastKarel.setBeepersInBag(this.lastBeepers);
};

KarelWorld.prototype.wallCommand = function(scanner) {
   var pt = this.scanPoint(scanner);
   var dir = this.scanDirection(scanner);
   scanner.verifyToken(KarelWorld.EOL);
   this.setWall(pt.x, pt.y, dir);
};

KarelWorld.prototype.setColorCommand = function(scanner) {
   var pt = this.scanPoint(scanner);
   var colorName = scanner.nextToken().toLowerCase();
   scanner.verifyToken(KarelWorld.EOL);
   this.setCornerColor(pt.x, pt.y, KarelWorld.decodeColor(colorName));
};

KarelWorld.prototype.speedCommand = function(scanner) {
   var speed = this.scanDouble(scanner);
   scanner.verifyToken(KarelWorld.EOL);
   //      this.setSpeed(speed);
};

KarelWorld.prototype.beeperCommand = function(scanner) {
   var pt = this.scanPoint(scanner);
   var nBeepers = this.scanBeeperCount(scanner);
   scanner.verifyToken(KarelWorld.EOL);
   this.setBeepersOnCorner(pt.x, pt.y, nBeepers);
};

KarelWorld.prototype.beeperBagCommand = function(scanner) {
   var nBeepers = this.scanBeeperCount(scanner);
   scanner.verifyToken(KarelWorld.EOL);
   if (this.lastKarel === null) {
      this.lastBeepers = nBeepers;
   } else {
      this.lastKarel.setBeepersInBag(nBeepers);
   }
};

KarelWorld.prototype.scanInt = function(scanner) {
   var token = scanner.nextToken();
   if (jslib.equals(token, KarelWorld.EOL)) {
      throw new RuntimeException("Missing integer value");
   }
   try {
      return Integer.parseInt(token);
   } catch (ex) {
      throw new RuntimeException("Illegal integer");
   }
};

KarelWorld.prototype.scanDouble = function(scanner) {
   var token = scanner.nextToken();
   if (jslib.equals(token, KarelWorld.EOL)) {
      throw new RuntimeException("Missing floating-point value");
   }
   try {
      return Double.parseDouble(token);
   } catch (ex) {
      throw new RuntimeException("Illegal floating-point value");
   }
};

KarelWorld.prototype.scanBeeperCount = function(scanner) {
   var token = scanner.nextToken().toLowerCase();
   if (jslib.equals(token, KarelWorld.EOL)) {
      throw new RuntimeException("Missing beeper count");
   }
   if (jslib.startsWith("infinite", token) || jslib.startsWith("infinity", token)) {
      return KC.INFINITE;
   } else {
      scanner.saveToken(token);
      return this.scanInt(scanner);
   }
};

KarelWorld.prototype.scanPoint = function(scanner) {
   var pt = new Point(0, 0);
   scanner.verifyToken("(");
   pt.x = this.scanInt(scanner);
   scanner.verifyToken(",");
   pt.y = this.scanInt(scanner);
   scanner.verifyToken(")");
   return pt;
};

KarelWorld.prototype.scanDirection = function(scanner) {
   var token = scanner.nextToken().toLowerCase();
   if (jslib.equals(token, KarelWorld.EOL)) {
      throw new RuntimeException("Missing direction specification");
   }
   if (jslib.startsWith("north", token)) {
      return KarelWorld.NORTH;
   } else if (jslib.startsWith("east", token)) {
      return KarelWorld.EAST;
   } else if (jslib.startsWith("south", token)) {
      return KarelWorld.SOUTH;
   } else if (jslib.startsWith("west", token)) {
      return KarelWorld.WEST;
   } else {
      throw new RuntimeException("Illegal direction " + token);
   }
};

KarelWorld.NORTH = Direction.NORTH;
KarelWorld.EAST = Direction.EAST;
KarelWorld.SOUTH = Direction.SOUTH;
KarelWorld.WEST = Direction.WEST;
KarelWorld.EOL = "\n";
var Corner = function() {
   /* Empty */
};


/* KarelWorldEditor.js */

var KarelWorldEditor = function(view) {
   JSCanvas.call(this);
   this.view = view;
   this.world = view.getWorld();
   this.activeKarel = null;
   this.selectedTool = null;
   this.setBackground(KC.APPLICATION_BACKGROUND);
   this.initEditorCanvas();
   this.addMouseListener(this);
   this.addKeyListener(this);
};

KarelWorldEditor.prototype = 
   jslib.inheritPrototype(JSCanvas, "KarelWorldEditor extends JSCanvas");
KarelWorldEditor.prototype.constructor = KarelWorldEditor;
KarelWorldEditor.prototype.$class = 
   new Class("KarelWorldEditor", KarelWorldEditor);

KarelWorldEditor.prototype.initEditorCanvas = function() {
   this.tools = new ArrayList();
   var x = KC.TOOL_X;
   var y = KC.TOOL_Y;
   this.defineTool(new WallTool(x, y, true));
   x += KC.BIG_TOOL_SIZE + KC.TOOL_SEP;
   this.defineTool(new WallTool(x, y, false));
   x += KC.BIG_TOOL_SIZE + 2 * KC.TOOL_SEP;
   this.defineTool(new BeeperTool(x, y, 1));
   x += KC.BIG_TOOL_SIZE + KC.TOOL_SEP;
   this.defineTool(new BeeperTool(x, y, KC.PLUS1));
   x += KC.BIG_TOOL_SIZE + KC.TOOL_SEP;
   this.defineTool(new BeeperTool(x, y, KC.MINUS1));
   x += KC.BIG_TOOL_SIZE + KC.TOOL_SEP;
   this.defineTool(new BeeperTool(x, y, 0));
   x += KC.BIG_TOOL_SIZE + KC.TOOL_SEP;
   this.defineTool(new BeeperTool(x, y, KC.INFINITE));
   x += KC.BIG_TOOL_SIZE + 2 * KC.TOOL_SEP;
   this.defineTool(new KarelTool(x, y, Direction.EAST));
   x += KC.BIG_TOOL_SIZE + KC.TOOL_SEP;
   this.defineTool(new KarelTool(x, y, Direction.SOUTH));
   x += KC.BIG_TOOL_SIZE + KC.TOOL_SEP;
   this.defineTool(new KarelTool(x, y, Direction.WEST));
   x += KC.BIG_TOOL_SIZE + KC.TOOL_SEP;
   this.defineTool(new KarelTool(x, y, Direction.NORTH));
   x += KC.BIG_TOOL_SIZE + KC.TOOL_SEP;
   this.defineTool(new BeeperBagTool(x, y));
   x += KC.BEEPER_BAG_WIDTH + KC.TOOL_SEP;
   this.resizeTool = new ResizeTool(x, y);
   this.defineTool(this.resizeTool);
   var useColors = false;
   if (useColors) {
      x = KC.TOOL_X;
      y += KC.BIG_TOOL_SIZE + KC.TOOL_Y_DELTA;
      var x0 = x + 2 * KC.BIG_TOOL_SIZE + KC.TOOL_SEP;
      x = x0;
      y += Math.max(2 * KC.KAREL_TOOL_SIZE, KC.BEEPER_BAG_HEIGHT) +
      KC.TOOL_Y_DELTA;
      for (var i = 0; i < COLORS.length; i++) {
         this.defineTool(new ColorTool(x, y, COLORS[i]));
         x += KC.COLOR_TOOL_SIZE + KC.TOOL_SEP;
         if (COLORS[i] === Color.RED) {
            x = x0;
            y += KC.BIG_TOOL_SIZE;
         }
      }
   }
   this.selectedTool = this.tools.get(0);
};

KarelWorldEditor.prototype.getPreferredSize = function() {
   var width = 7 * KC.BIG_TOOL_SIZE + 10 * KC.TOOL_SEP;
   var height = 3 * (KC.TOOL_Y + KC.BIG_TOOL_SIZE + KC.TOOL_Y_DELTA) +
   3 * KC.COLOR_TOOL_SIZE + KC.TOOL_Y_DELTA;
   return new Dimension(width, height);
};

KarelWorldEditor.prototype.setSelectedTool = function(tool) {
   this.selectedTool = tool;
   this.repaint();
};

KarelWorldEditor.prototype.getSelectedTool = function() {
   return this.selectedTool;
};

KarelWorldEditor.prototype.getWorld = function() {
   return this.world;
};

KarelWorldEditor.prototype.paintComponent = function(g) {
   var el0 = new JSElementList(this.tools);
   for (var ei0 = 0; ei0 < el0.size(); ei0++) {
      var tool = el0.get(ei0);
      tool.paint(g, this);
   }
};

KarelWorldEditor.prototype.getView = function() {
   return this.view;
};

KarelWorldEditor.prototype.setActiveKarel = function(karel) {
   this.activeKarel = karel;
};

KarelWorldEditor.prototype.getActiveKarel = function() {
   return this.activeKarel;
};

KarelWorldEditor.prototype.wallAction = function(x, y, dir) {
   if (this.activeKarel === null) {
      var tool = this.getSelectedTool();
      if (tool !== null) tool.wallAction(this, x, y, dir);
   }
};

KarelWorldEditor.prototype.cornerAction = function(x, y) {
   if (this.activeKarel === null) {
      var tool = this.getSelectedTool();
      if (tool !== null) tool.cornerAction(this, x, y);
   } else {
      this.activeKarel.setLocation(x, y);
      this.view.repaint();
   }
};

KarelWorldEditor.prototype.keyPressed = function(e) {
   if (this.selectedTool === this.resizeTool) {
      var code = e.getKeyCode();
      if (code === 13 || code === 10) {
         this.resizeTool.processKey(this, toInt('\n'));
      } else if (code === 8 || code === 127) {
         this.resizeTool.processKey(this, toInt('\b'));
      }
   }
};

KarelWorldEditor.prototype.keyReleased = function(e) {
   /* Empty */
};

KarelWorldEditor.prototype.keyTyped = function(e) {
   if (this.selectedTool === this.resizeTool) {
      var code = e.getKeyCode();
      if (code === 13 || code === 10 || code === 8 || code === 127) return;
      this.resizeTool.processKey(this, e.getKeyChar());
   }
};

KarelWorldEditor.prototype.mousePressed = function(e) {
   var tool = this.findTool(e.getX(), e.getY());
   if (tool !== null) tool.toolAction(this);
};

KarelWorldEditor.prototype.mouseClicked = function(e) { };
KarelWorldEditor.prototype.mouseReleased = function(e) { };
KarelWorldEditor.prototype.mouseEntered = function(e) { };
KarelWorldEditor.prototype.mouseExited = function(e) { };
KarelWorldEditor.prototype.defineTool = function(tool) {
   this.tools.add(tool);
};

KarelWorldEditor.prototype.findTool = function(x, y) {
   var el0 = new JSElementList(this.tools);
   for (var ei0 = 0; ei0 < el0.size(); ei0++) {
      var tool = el0.get(ei0);
      if (tool.contains(x, y)) return tool;
   }
   return null;
};

var MapTool = function(x, y, width, height) {
   this.x = x;
   this.y = y;
   this.width = width;
   this.height = height;
};

MapTool.prototype.contains = function(x, y) {
   return (x >= this.x && x < this.x + this.width && y >= this.y && y < this.y + this.height);
};

MapTool.prototype.toolAction = function(editor) {
   editor.setSelectedTool(this);
};

MapTool.prototype.wallAction = function(editor, x, y, dir) {
   /* Empty */
};

MapTool.prototype.cornerAction = function(editor, x, y) {
   /* Empty */
};

MapTool.prototype.beeperBagAction = function(editor) {
   /* Empty */
};

MapTool.prototype.getBounds = function() {
   return new Rectangle(this.x, this.y, this.width, this.height);
};

MapTool.prototype.setBorderGraphics = function(g2, isSelected) {
   if (isSelected) {
      g2.setStroke(new BasicStroke(KC.SELECTED_BORDER_WIDTH));
      g2.setColor(KC.SELECTED_BORDER_COLOR);
   } else {
      g2.setStroke(new BasicStroke(1));
      g2.setColor(Color.BLACK);
   }
};

var KarelTool = function(x, y, dir) {
   MapTool.call(this, x, y, KC.KAREL_TOOL_SIZE, KC.KAREL_TOOL_SIZE);
   this.dir = dir;
};

KarelTool.prototype = 
   jslib.inheritPrototype(MapTool, "KarelTool extends MapTool");
KarelTool.prototype.constructor = KarelTool;
KarelTool.prototype.$class = 
   new Class("KarelTool", KarelTool);

KarelTool.prototype.paint = function(g, editor) {
   var r = this.getBounds();
   var cx = r.x + r.width / 2;
   var cy = r.y + r.height / 2;
   if (editor.getView().getLook() === KC.FANCY) {
      KarelGraphics.drawFancyKarel(g, cx, cy, r.width, this.dir, null);
   } else {
      KarelGraphics.drawSimpleKarel(g, cx, cy, r.width, this.dir, null);
   }
};

KarelTool.prototype.toolAction = function(editor) {
   editor.getWorld().getKarel().setDirection(this.dir);
};

var WallTool = function(x, y, createWall) {
   MapTool.call(this, x, y, KC.WALL_TOOL_SIZE, KC.WALL_TOOL_SIZE);
   this.createWall = createWall;
};

WallTool.prototype = 
   jslib.inheritPrototype(MapTool, "WallTool extends MapTool");
WallTool.prototype.constructor = WallTool;
WallTool.prototype.$class = 
   new Class("WallTool", WallTool);

WallTool.prototype.paint = function(g, editor) {
   var g2 = g.create();
   var r = this.getBounds();
   g2.setColor(Color.WHITE);
   g2.fillRect(r.x, r.y, KC.WALL_TOOL_SIZE, KC.WALL_TOOL_SIZE);
   this.setBorderGraphics(g2, editor.getSelectedTool() === this);
   g2.drawRect(r.x, r.y, KC.WALL_TOOL_SIZE, KC.WALL_TOOL_SIZE);
   g2.setColor(Color.BLACK);
   g2.setStroke(new BasicStroke(KC.WALL_LINEWIDTH));
   g2.drawLine(r.x + (KC.WALL_TOOL_SIZE - KC.WALL_TOOL_LENGTH) / 2, r.y + KC.WALL_TOOL_SIZE / 2, r.x + (KC.WALL_TOOL_SIZE + KC.WALL_TOOL_LENGTH) / 2, r.y + KC.WALL_TOOL_SIZE / 2);
   if (!this.createWall) {
      g2.setColor(Color.RED);
      g2.setStroke(new BasicStroke(KC.CROSS_LINEWIDTH));
      g2.drawLine(r.x + (KC.WALL_TOOL_SIZE - KC.CROSS_SIZE) / 2, r.y + (KC.WALL_TOOL_SIZE - KC.CROSS_SIZE) / 2, r.x + (KC.WALL_TOOL_SIZE + KC.CROSS_SIZE) / 2, r.y + (KC.WALL_TOOL_SIZE + KC.CROSS_SIZE) / 2);
      g2.drawLine(r.x + (KC.WALL_TOOL_SIZE - KC.CROSS_SIZE) / 2, r.y + (KC.WALL_TOOL_SIZE + KC.CROSS_SIZE) / 2, r.x + (KC.WALL_TOOL_SIZE + KC.CROSS_SIZE) / 2, r.y + (KC.WALL_TOOL_SIZE - KC.CROSS_SIZE) / 2);
   }
   g2.dispose();
};

WallTool.prototype.wallAction = function(editor, x, y, dir) {
   var world = editor.getWorld();
   if (this.createWall) {
      world.setWall(x, y, dir);
   } else {
      world.clearWall(x, y, dir);
   }
   editor.getView().repaint();
};

var BeeperTool = function(x, y, nBeepers) {
   MapTool.call(this, x, y, KC.BEEPER_TOOL_SIZE, KC.BEEPER_TOOL_SIZE);
   this.nBeepers = nBeepers;
};

BeeperTool.prototype = 
   jslib.inheritPrototype(MapTool, "BeeperTool extends MapTool");
BeeperTool.prototype.constructor = BeeperTool;
BeeperTool.prototype.$class = 
   new Class("BeeperTool", BeeperTool);

BeeperTool.prototype.paint = function(g, editor) {
   var g2 = g.create();
   var r = this.getBounds();
   var cx = r.x + r.width / 2;
   var cy = r.y + r.height / 2;
   var label = "" + this.nBeepers;
   switch (this.nBeepers) {
      case 1: label = ""; break;
      case KC.PLUS1: label = "+1"; break;
      case KC.MINUS1: label = "-1"; break;
      case KC.INFINITE: label = KC.INFINITY_SYMBOL; break;
   }
   this.setBorderGraphics(g2, editor.getSelectedTool() === this);
   KarelGraphics.drawBeeper(g2, cx, cy, KC.BEEPER_TOOL_SIZE, null, label);
   g2.dispose();
};

BeeperTool.prototype.cornerAction = function(editor, x, y) {
   var world = editor.getWorld();
   var nb = world.getBeepersOnCorner(x, y);
   switch (this.nBeepers) {
      case KC.PLUS1: nb = KarelWorld.adjustBeepers(nb, +1); break;
      case KC.MINUS1: nb = KarelWorld.adjustBeepers(nb, -1); break;
      default: nb = this.nBeepers;
   }
   world.setBeepersOnCorner(x, y, nb);
   editor.getView().repaint();
};

BeeperTool.prototype.beeperBagAction = function(editor) {
   var karel = editor.getWorld().getKarel();
   var nb = karel.getBeepersInBag();
   switch (this.nBeepers) {
      case KC.PLUS1: nb = KarelWorld.adjustBeepers(nb, +1); break;
      case KC.MINUS1: nb = KarelWorld.adjustBeepers(nb, -1); break;
      default: nb = this.nBeepers;
   }
   karel.setBeepersInBag(nb);
   editor.repaint();
};

var BeeperBagTool = function(x, y) {
   MapTool.call(this, x, y, KC.BEEPER_BAG_WIDTH, KC.BEEPER_BAG_HEIGHT);
   this.image = new JSImage(BeeperBagTool.BEEPER_BAG);
};

BeeperBagTool.prototype = 
   jslib.inheritPrototype(MapTool, "BeeperBagTool extends MapTool");
BeeperBagTool.prototype.constructor = BeeperBagTool;
BeeperBagTool.prototype.$class = 
   new Class("BeeperBagTool", BeeperBagTool);

BeeperBagTool.prototype.paint = function(g, editor) {
   var r = this.getBounds();
   var cx = r.x + r.width / 2;
   var cy = r.y + KC.BAG_LABEL_DELTA_Y;
   g.drawImage(this.image, r.x, r.y, editor);
   var nBeepers = editor.getWorld().getKarel().getBeepersInBag();
   var label = "" + nBeepers;
   if (nBeepers === KC.INFINITE) label = KC.INFINITY_SYMBOL;
   KarelGraphics.drawBeeper(g, cx, cy, KC.BEEPER_TOOL_SIZE, null, label);
};

BeeperBagTool.prototype.toolAction = function(editor) {
   var tool = editor.getSelectedTool();
   if (tool !== null) tool.beeperBagAction(editor);
};

BeeperBagTool.BEEPER_BAG =
"data:image/png;base64," +
"iVBORw0KGgoAAAANSUhEUgAAACMAAAAvCAYAAABpG3MiAAADmUlEQVR42s1Z" +
"63mDMAxkJcIKWSEbUK+QFbJBYIWskBGanWjO+BRZyDxS0q8/9EEdP47TSbLd" +
"6jEM1X+x1R1Pp9Nwv9+HLZOjP8btBuZ8Pg9N04hdLpdVk6OfHod5fg0GX8YJ" +
"D4cqGt7bto6T3263ySK2L2wNQ5uYaes6Po/H47hYVcU2AMI72vAb2mgcu8bF" +
"q/0PJrAYFghNlS3IRdFHt8X+icFdBSyAEgMAdEzvGgDahbUNQDaDgYUQ5Iux" +
"eB9GfQCYAAHYZ7+PhXbG0BPEtW0jEFpkJgF8B8jbYAjkes0BoR1gPp70bIRp" +
"EBbYn4KBNsiEBbUmue0K5tF1It6+SZppXyEPkH8GhmHcfY0RhCdNQCGsn6A/" +
"Coa5RAOwBv2Ane4wunNtgd0EpO97YeTxDF/9hH1/NfKMLuzHkEcCxNhdywH1" +
"4LExAWJEjfFL4t6c6DSARxjNAwYQeH53I0iMRTKcc9mqLQS+CpPFKAkvEDGn" +
"GDDok4FJRpZQKt4CIwUwgdGTAgTBzTHDJ4HOZehZMBAeIwN0c3LtHg9MSTtk" +
"plTN51lp64wJvlu38F3/5oFhn8iOk4P87JpA6HRvNSLR0zUuMwh5rRuGOucF" +
"64tgoPZRCyG6yHPNGvOYYRvm97aibj7Rg/WXaRbYHqnvm+zviZC7HIzkHiPm" +
"aZZVWwI9uQbGlA8Q1I2OGjuOetHMUDuanRxMHwa7i5vThgfW188rL1HE6AtX" +
"FZlhPvFyhFsQC6XBlgdtsktMOUdvN15bySftyAGWFTtpaVGw6rFEvejUQFBR" +
"M32YgmnrVkLaZlAKNAPRTfUx50INZgQXJLu7zHjbSCvc0mJLbpKP6xspLdwb" +
"TcAgCYWUqLwC+I7pULbv/HAchydgoGw3iqgJtYmyxXAOjFe5xcyFwGTztOQe" +
"6mUJjK3yOkr1WL3hypKdFrD1r17UUm9/L4W1BReiiFsfDM9DYv3UzyUd2HJh" +
"WfIOfTBdEtzDmaXVHmM9um1OssxY8FkR9sBYdjzRlYB5YU1mpVCqgolkp8N6" +
"sWpzYd1m2VobTfbjYim4tgtg6td+V6qrBqjqkeeaucSn9ePthYtnpFJGJmMe" +
"gDlgWszWPYt7YH34Empxjt6YmckkExysdJhbdeOgbzHnCiIXjxU5fQQvGiHY" +
"pTP3pnN23GIkF/GmwWNCg9lyE7H5FgI338icqGUARLdxf6KZ2HpP86t/PICt" +
"7tEJS+9eLO4CZm/7AVZxh59YWW1+AAAAAElFTkSuQmCC";
var ResizeTool = function(x, y) {
   MapTool.call(this, x, y, KC.RESIZE_TOOL_SIZE, KC.RESIZE_TOOL_SIZE);
   this.highlighted = false;
};

ResizeTool.prototype = 
   jslib.inheritPrototype(MapTool, "ResizeTool extends MapTool");
ResizeTool.prototype.constructor = ResizeTool;
ResizeTool.prototype.$class = 
   new Class("ResizeTool", ResizeTool);

ResizeTool.prototype.paint = function(g, editor) {
   var world = editor.getWorld();
   var r = this.getBounds();
   g.setColor(Color.WHITE);
   g.fillRect(r.x, r.y, r.width, r.height);
   g.setColor(Color.BLACK);
   g.drawRect(r.x, r.y, r.width, r.height);
   if (editor.getSelectedTool() === this) {
      this.drawLabel(g, this.label);
   } else {
      this.drawLabel(g, world.getNCols() + "x" + world.getNRows());
   }
};

ResizeTool.prototype.toolAction = function(editor) {
   var world = editor.getWorld();
   editor.setSelectedTool(this);
   editor.requestFocus();
   this.highlighted = true;
   this.label = world.getNCols() + "x" + world.getNRows();
};

ResizeTool.prototype.processKey = function(editor, ch) {
   if (this.highlighted) {
      this.label = "";
      this.highlighted = false;
   }
   var times = this.label.indexOf("x");
   if (Character.isDigit(ch)) {
      this.label += ch;
   } else if (times > 0 && times < this.label.length - 2 && (ch === toInt('\n') || ch === toInt('\r'))) {
      var width = Integer.parseInt(this.label.substring(0, times));
      var height = Integer.parseInt(this.label.substring(times + 1));
      editor.getWorld().resize(width, height);
      editor.setSelectedTool(null);
   } else if (times === -1 && (ch === toInt('x') || ch === toInt('X') || ch === toInt('*'))) {
      this.label += "x";
   } else if (this.label.length > 0 && (ch === toInt('\177') || ch === toInt('\b'))) {
      this.label = this.label.substring(0, this.label.length - 1);
   }
   editor.repaint();
};

ResizeTool.prototype.drawLabel = function(g, str) {
   var r = this.getBounds();
   var times = str.indexOf("x");
   if (times === -1) {
      g.setFont(KC.RESIZE_FONT);
      var fm = g.getFontMetrics();
      var x = r.x + (r.width - fm.stringWidth(str)) / 2;
      var y = r.y + r.height / 2 + KC.RESIZE_DY;
      g.drawString(str, x, y);
   } else {
      var s1 = str.substring(0, times);
      var s2 = str.substring(times + 1);
      g.setFont(KC.RESIZE_X_FONT);
      var fm = g.getFontMetrics();
      var wx = fm.stringWidth("x");
      g.setFont(KC.RESIZE_FONT);
      fm = g.getFontMetrics();
      var w1 = fm.stringWidth(s1);
      var w2 = fm.stringWidth(s2);
      var x = r.x + (r.width - (w1 + wx + w2)) / 2;
      var y = r.y + r.height / 2 + KC.RESIZE_DY;
      if (this.highlighted) {
         g.setColor(KC.RESIZE_BG);
         g.fillRect(x + KC.RESIZE_BG_DX, y + KC.RESIZE_BG_DY, w1 + wx + w2 + KC.RESIZE_BG_DW, KC.RESIZE_BG_HEIGHT);
         g.setColor(Color.BLACK);
      }
      g.drawString(s1, x, y);
      g.drawString(s2, x + w1 + wx, y);
      g.setFont(KC.RESIZE_X_FONT);
      g.drawString("x", x + w1, y);
   }
};

var ColorTool = function(x, y, color) {
   MapTool.call(this, x, y, KC.COLOR_TOOL_SIZE, KC.COLOR_TOOL_SIZE);
   this.color = color;
};

ColorTool.prototype = 
   jslib.inheritPrototype(MapTool, "ColorTool extends MapTool");
ColorTool.prototype.constructor = ColorTool;
ColorTool.prototype.$class = 
   new Class("ColorTool", ColorTool);

ColorTool.prototype.paint = function(g, editor) {
   // Finish later
};


/* KarelWorldView.js */

var KarelWorldView = function(world) {
   JSCanvas.call(this);
   this.world = world;
   this.setBackground(KC.APPLICATION_BACKGROUND);
   this.look = KC.SIMPLE;
   this.numberSquaresFlag = true;
   this.displayOneFlag = false;
   this.addComponentListener(this);
   this.addMouseListener(this);
   this.addMouseMotionListener(this);
   this.monitor = null;
};

KarelWorldView.prototype = 
   jslib.inheritPrototype(JSCanvas, "KarelWorldView extends JSCanvas");
KarelWorldView.prototype.constructor = KarelWorldView;
KarelWorldView.prototype.$class = 
   new Class("KarelWorldView", KarelWorldView);

KarelWorldView.prototype.getWorld = function() {
   return this.world;
};

KarelWorldView.prototype.setWorldMonitor = function(monitor) {
   this.monitor = monitor;
};

KarelWorldView.prototype.setDisplayParameters = function() {
   this.nRows = this.world.getNRows();
   this.nCols = this.world.getNCols();
   var width = this.getSize().width -
   ((this.numberSquaresFlag) ? KC.LEFT_NUMBER_MARGIN : 2);
   var height = this.getSize().height -
   ((this.numberSquaresFlag) ? KC.BOTTOM_NUMBER_MARGIN : 0) - 2;
   this.sqSize = Math.min(toInt((width / this.nCols)), toInt((height / this.nRows)));
   width = this.nCols * this.sqSize;
   height = this.nRows * this.sqSize;
   this.x0 = (this.numberSquaresFlag) ? KC.LEFT_NUMBER_MARGIN : 2;
   this.y0 = 2;
   this.repaint();
};

KarelWorldView.prototype.paintComponent = function(g) {
   if (this.world) {
      this.paintOutline(g);
      this.paintWalls(g);
      this.paintBeepers(g);
      this.paintKarels(g);
   }
};

KarelWorldView.prototype.setLook = function(look) {
   this.look = look;
};

KarelWorldView.prototype.getLook = function() {
   return this.look;
};

KarelWorldView.prototype.setNumberSquaresFlag = function(flag) {
   this.numberSquaresFlag = flag;
};

KarelWorldView.prototype.getNumberSquaresFlag = function() {
   return this.numberSquaresFlag;
};

KarelWorldView.prototype.setDisplayOneFlag = function(flag) {
   this.displayOneFlag = flag;
};

KarelWorldView.prototype.getDisplayOneFlag = function() {
   return this.displayOneFlag;
};

KarelWorldView.prototype.drawKarel = function(g, x, y, sqSize, dir) {
   if (sqSize < KC.MIN_FANCY || this.look === KC.SIMPLE) {
      var karelSize = toInt(Math.round(sqSize * KC.KAREL_FRACTION));
      KarelGraphics.drawSimpleKarel(g, x, y, karelSize, dir, null);
   } else {
      var karelSize = sqSize - KC.KAREL_INSET;
      KarelGraphics.drawFancyKarel(g, x, y, karelSize, dir, null);
   }
};

KarelWorldView.prototype.getClickCorner = function(mx, my) {
   var sx = (mx - this.x0 + this.sqSize / 2) / this.sqSize;
   var sy = (this.y0 + this.nRows * this.sqSize - my + this.sqSize / 2) / this.sqSize;
   var tx = toInt((sx + 0.5));
   var ty = toInt((sy + 0.5));
   if (tx < 1 || tx > this.nCols || ty < 1 || ty > this.nRows) return null;
   if (Math.abs(sx - tx) > 0.3 || Math.abs(sy - ty) > 0.3) return null;
   return new Point(tx, ty);
};

KarelWorldView.prototype.stateChanged = function(e) {
   this.repaint();
};

KarelWorldView.prototype.componentHidden = function(e) {
   /* Empty */
};

KarelWorldView.prototype.componentMoved = function(e) {
   /* Empty */
};

KarelWorldView.prototype.componentResized = function(e) {
   this.setDisplayParameters();
};

KarelWorldView.prototype.componentShown = function(e) {
   /* Empty */
};

KarelWorldView.prototype.mouseClicked = function(e) {
   /* Empty */
};

KarelWorldView.prototype.mouseEntered = function(e) {
   /* Empty */
};

KarelWorldView.prototype.mouseExited = function(e) {
   /* Empty */
};

KarelWorldView.prototype.mousePressed = function(e) {
   if (this.monitor !== null) {
      var pt = this.getClickCorner(e.getX(), e.getY());
      if (pt === null) {
         this.checkForWallClick(e.getX(), e.getY());
      } else {
         this.monitor.setActiveKarel(this.world.getKarelOnSquare(pt.x, pt.y));
         this.monitor.cornerAction(pt.x, pt.y);
      }
   }
};

KarelWorldView.prototype.mouseReleased = function(e) {
   /* Empty */
};

KarelWorldView.prototype.mouseMoved = function(e) {
   /* Empty */
};

KarelWorldView.prototype.mouseDragged = function(e) {
   if (this.monitor !== null) {
      var pt = this.getClickCorner(e.getX(), e.getY());
      if (pt === null) {
         this.checkForWallClick(e.getX(), e.getY());
      } else {
         this.monitor.cornerAction(pt.x, pt.y);
      }
   }
};

KarelWorldView.prototype.paintOutline = function(g) {
   g.setColor(Color.WHITE);
   g.fillRect(this.x0, this.y0, this.nCols * this.sqSize, this.nRows * this.sqSize);
   g.setColor(Color.BLACK);
   if (this.sqSize > KC.NUMBER_THRESHOLD && this.numberSquaresFlag) {
      g.setFont(KC.NUMBER_FONT);
      var fm = g.getFontMetrics();
      var x = this.x0 + this.sqSize / 2;
      var y = this.y0 + this.nRows * this.sqSize + fm.getAscent() + 2;
      for (var ix = 1; ix <= this.nCols; ix++) {
         var label = "" + ix;
         g.drawString(label, x - fm.stringWidth(label) / 2, y);
         x += this.sqSize;
      }
      x = this.x0 - 2;
      y = this.y0 + this.nRows * this.sqSize - this.sqSize / 2 + 2;
      for (var iy = 1; iy <= this.nRows; iy++) {
         var label = "" + iy;
         g.drawString(label, x - fm.stringWidth(label), y);
         y -= this.sqSize;
      }
   }
};

KarelWorldView.prototype.paintWalls = function(g) {
   var tick = toInt(Math.round(KC.TICK_FRACTION * this.sqSize));
   for (var x = 1; x <= this.nCols; x++) {
      var kx = this.x0 + x * this.sqSize;
      var xc = kx - this.sqSize / 2;
      for (var y = 1; y <= this.nRows; y++) {
         var ky = this.y0 + (this.nRows - y) * this.sqSize;
         var yc = ky + this.sqSize / 2;
         if (x > 0 && y > 0 && this.world.getKarelOnSquare(x, y) === null) {
            g.drawLine(xc - tick / 2, yc, xc + tick / 2, yc);
            g.drawLine(xc, yc - tick / 2, xc, yc + tick / 2);
         }
         if (x === 1 && this.world.checkWall(x, y, Direction.WEST)) {
            KarelGraphics.drawVerticalWall(g, kx - this.sqSize, ky, this.sqSize);
         }
         if (this.world.checkWall(x, y, Direction.EAST)) {
            KarelGraphics.drawVerticalWall(g, kx, ky, this.sqSize);
         }
         if (y === 1 && this.world.checkWall(x, y, Direction.SOUTH)) {
            KarelGraphics.drawHorizontalWall(g, kx - this.sqSize, ky + this.sqSize, this.sqSize);
         }
         if (this.world.checkWall(x, y, Direction.NORTH)) {
            KarelGraphics.drawHorizontalWall(g, kx - this.sqSize, ky, this.sqSize);
         }
      }
   }
};

KarelWorldView.prototype.paintBeepers = function(g) {
   for (var x = 1; x <= this.nCols; x++) {
      var xc = toInt(Math.round(this.x0 + (x - 0.5) * this.sqSize));
      for (var y = 1; y <= this.nRows; y++) {
         var yc = toInt(Math.round(this.y0 + (this.nRows - y + 0.5) * this.sqSize));
         var nBeepers = this.world.getBeepersOnCorner(x, y);
         if (nBeepers > 0) {
            var label = "" + nBeepers;
            if (nBeepers === 1 && !this.displayOneFlag) label = "";
            if (nBeepers === KC.INFINITE) label = KC.INFINITY_SYMBOL;
            var beeperSize = toInt(Math.round(this.sqSize * KC.BEEPER_FRACTION));
            KarelGraphics.drawBeeper(g, xc, yc, beeperSize, null, label);
         }
      }
   }
};

KarelWorldView.prototype.paintKarels = function(g) {
   for (var i = 0; i < this.world.getKarelCount(); i++) {
      var karel = this.world.getKarelAtIndex(i);
      var pt = karel.getLocation();
      var xc = toInt(Math.round(this.x0 + (pt.x - 0.5) * this.sqSize));
      var yc = toInt(Math.round(this.y0 + (this.nRows - pt.y + 0.5) * this.sqSize));
      this.drawKarel(g, xc, yc, this.sqSize, karel.getDirection());
   }
};

KarelWorldView.prototype.checkForWallClick = function(mx, my) {
   var sx = (mx - this.x0 + 0.5 * this.sqSize) / this.sqSize;
   var sy = (this.y0 + this.nRows * this.sqSize - my + this.sqSize / 2) / this.sqSize;
   var tx = toInt((sx + 0.5));
   var ty = toInt((sy + 0.5));
   var dir = 0;
   if (Math.abs(sx - tx) > KC.WALL_TOLERANCE && Math.abs(sy - ty) < KC.WALL_FRACTION) {
      if (tx > sx) tx--;
      if (tx < 0 || tx > this.nCols || ty < 1 || ty > this.nRows) return;
      this.monitor.wallAction(tx, ty, Direction.EAST);
   } else if (Math.abs(sy - ty) > KC.WALL_TOLERANCE && Math.abs(sx - tx) < KC.WALL_FRACTION) {
      if (ty > sy) ty--;
      if (tx < 1 || tx > this.nCols || ty < 0 || ty > this.nRows) return;
      this.monitor.wallAction(tx, ty, Direction.NORTH);
   }
};


/* KC.js */

var KC = function() {
   /* Empty */
};

KC.INFINITE = 99999999;
KC.PLUS1 = -1;
KC.MINUS1 = -2;
KC.BLANKB = -3;
KC.SIMPLE = 0;
KC.FANCY = 1;
KC.WORLD_WIDTH = 400;
KC.WORLD_HEIGHT = 400;
KC.CONSOLE_WIDTH = 400;
KC.CONSOLE_HEIGHT = 100;
KC.EDITOR_WIDTH = 400;
KC.EDITOR_HEIGHT = 510;
KC.LEFT_MARGIN = 5;
KC.RIGHT_MARGIN = 10;
KC.TOP_MARGIN = 10;
KC.BOTTOM_MARGIN = 10;
KC.COMPONENT_SEP = 10;
KC.LEFT_NUMBER_MARGIN = 16;
KC.BOTTOM_NUMBER_MARGIN = 15;
KC.DOUBLE_WALL_THRESHOLD = 24;
KC.CROSS_THRESHOLD = 11;
KC.NUMBER_THRESHOLD = 15;
KC.RESIZE_BG_DX = -2;
KC.RESIZE_BG_DY = -10;
KC.RESIZE_BG_DW = 4;
KC.RESIZE_BG_HEIGHT = 12;
KC.EDITOR_FONT = Font.decode("Courier New-Bold-18");
KC.CONSOLE_FONT = Font.decode("Courier New-Bold-16");
KC.NUMBER_FONT = Font.decode("Serif-10");
KC.RESIZE_FONT = Font.decode("Serif-12");
KC.RESIZE_X_FONT = Font.decode("SansSerif-12");
KC.RESIZE_BG = new Color(0xFFCCFF);
KC.TICK_FRACTION = 0.20;
KC.WALL_FRACTION = 0.30;
KC.WALL_TOLERANCE = 0.15;
KC.MAX_WIDTH = 50;
KC.MAX_HEIGHT = 50;
KC.TOKEN_TRACE = false;
KC.BEEPER_FILL_COLOR = Color.LIGHT_GRAY;
KC.APPLICATION_BACKGROUND = new Color(0xCCFFFF);
KC.MARKED_COLOR = Color.DARK_GRAY;
KC.INFINITY_SYMBOL = "\u221E";
KC.BEEPER_FONT_FAMILY = "SansSerif";
KC.BEEPER_BORDER = 1;
KC.MIN_FANCY = 20;
KC.MIN_BEEPER = 4;
KC.MIN_LABEL = 15;
KC.KAREL_FRACTION = 0.50;
KC.BEEPER_FRACTION = 0.70;
KC.SIMPLE_FRACTION = 0.70;
KC.BEEPER_LABEL_FRACTION = 0.5;
KC.BEEPER_LABEL_DROP = 0.35;
KC.BEEPER_LABEL_MAX_SIZE = 20;
KC.BEEPER_LABEL_MIN_SIZE = 6;
KC.KAREL_INSET = 7;
KC.BODY_OFFSET_X = -0.20;
KC.BODY_OFFSET_Y = -0.33;
KC.BODY_WIDTH = 0.60;
KC.BODY_HEIGHT = 0.80;
KC.UPPER_NOTCH = 0.15;
KC.LOWER_NOTCH = 0.10;
KC.SCREEN_OFFSET_X = -0.07;
KC.SCREEN_OFFSET_Y = -0.05;
KC.SCREEN_WIDTH = 0.30;
KC.SCREEN_HEIGHT = 0.40;
KC.SLOT_WIDTH = 0.15;
KC.FOOT_WIDTH = 0.08;
KC.FOOT_LENGTH = 0.20;
KC.UPPER_ANKLE = 0.08;
KC.LOWER_ANKLE = 0.08;
KC.SELECTED_BORDER_COLOR = Color.BLUE;
KC.SELECTED_BORDER_WIDTH = 2;
KC.BIG_TOOL_SIZE = 20;
KC.WALL_TOOL_SIZE = 20;
KC.COLOR_TOOL_SIZE = 12;
KC.KAREL_TOOL_SIZE = 20;
KC.BEEPER_TOOL_SIZE = 22;
KC.TOOL_SEP = 6;
KC.TOOL_Y_DELTA = 8;
KC.TOOL_MARGIN = 20;
KC.TOOL_X = 8;
KC.TOOL_Y = 3;
KC.LABEL_SEP = 5;
KC.WALL_TOOL_LENGTH = 12;
KC.WALL_LINEWIDTH = 4;
KC.CROSS_SIZE = 10;
KC.CROSS_LINEWIDTH = 3;
KC.BEEPER_BAG_WIDTH = 35;
KC.BEEPER_BAG_HEIGHT = 47;
KC.BAG_LABEL_DELTA_Y = 28;
KC.RESIZE_TOOL_SIZE = 46;
KC.RESIZE_DY = 4;

/* Exports */

return {
   KC : KC,
   Karel : Karel,
   KarelANDOperator : KarelANDOperator,
   KarelApplication : KarelApplication,
   KarelBlockOperator : KarelBlockOperator,
   KarelConsole : KarelConsole,
   KarelEditWorldControl : KarelEditWorldControl,
   KarelEditor : KarelEditor,
   KarelFunctionKeyword : KarelFunctionKeyword,
   KarelGraphics : KarelGraphics,
   KarelIfStatement : KarelIfStatement,
   KarelLayout : KarelLayout,
   KarelNOTOperator : KarelNOTOperator,
   KarelOROperator : KarelOROperator,
   KarelParenOperator : KarelParenOperator,
   KarelParser : KarelParser,
   KarelRepeatStatement : KarelRepeatStatement,
   KarelStatementOperator : KarelStatementOperator,
   KarelVM : KarelVM,
   KarelWhileStatement : KarelWhileStatement,
   KarelWorld : KarelWorld,
   KarelWorldView : KarelWorldView
};

});
