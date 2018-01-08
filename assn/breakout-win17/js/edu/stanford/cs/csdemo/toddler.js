/*
 * File: toddler.js
 * Created on Sat Oct 17 21:42:37 PDT 2015 by java2js
 * --------------------------------------------------
 * This file was generated mechanically by the java2js utility.
 * Permanent edits must be made in the Java file.
 */

define([ "jslib",
         "edu/stanford/cs/command",
         "edu/stanford/cs/controller",
         "edu/stanford/cs/java2js",
         "edu/stanford/cs/jsconsole",
         "edu/stanford/cs/jscontrols/JSControl",
         "edu/stanford/cs/jscontrols/LoadControl",
         "edu/stanford/cs/jscontrols/NewControl",
         "edu/stanford/cs/jscontrols/ResetControl",
         "edu/stanford/cs/jscontrols/RunControl",
         "edu/stanford/cs/jscontrols/SaveControl",
         "edu/stanford/cs/jscontrols/SpeedControl",
         "edu/stanford/cs/jscontrols/StepControl",
         "edu/stanford/cs/programeditor",
         "edu/stanford/cs/tokenscanner",
         "java/awt",
         "java/lang",
         "java/util",
         "javax/swing" ],

function(jslib,
         edu_stanford_cs_command,
         edu_stanford_cs_controller,
         edu_stanford_cs_java2js,
         edu_stanford_cs_jsconsole,
         edu_stanford_cs_jscontrols_JSControl,
         edu_stanford_cs_jscontrols_LoadControl,
         edu_stanford_cs_jscontrols_NewControl,
         edu_stanford_cs_jscontrols_ResetControl,
         edu_stanford_cs_jscontrols_RunControl,
         edu_stanford_cs_jscontrols_SaveControl,
         edu_stanford_cs_jscontrols_SpeedControl,
         edu_stanford_cs_jscontrols_StepControl,
         edu_stanford_cs_programeditor,
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
var Command = edu_stanford_cs_command.Command;
var CommandLoop = edu_stanford_cs_command.CommandLoop;
var DebugCommand = edu_stanford_cs_command.DebugCommand;
var HelpCommand = edu_stanford_cs_command.HelpCommand;
var QuitCommand = edu_stanford_cs_command.QuitCommand;
var ScriptCommand = edu_stanford_cs_command.ScriptCommand;
var StackTraceCommand = edu_stanford_cs_command.StackTraceCommand;
var Controller = edu_stanford_cs_controller.Controller;
var Steppable = edu_stanford_cs_controller.Steppable;
var JSCanvas = edu_stanford_cs_java2js.JSCanvas;
var JSElementList = edu_stanford_cs_java2js.JSElementList;
var JSErrorEvent = edu_stanford_cs_java2js.JSErrorEvent;
var JSFile = edu_stanford_cs_java2js.JSFile;
var JSFrame = edu_stanford_cs_java2js.JSFrame;
var JSLoadDialog = edu_stanford_cs_java2js.JSLoadDialog;
var JSPanel = edu_stanford_cs_java2js.JSPanel;
var JSPlatform = edu_stanford_cs_java2js.JSPlatform;
var JSProgram = edu_stanford_cs_java2js.JSProgram;
var JSSaveDialog = edu_stanford_cs_java2js.JSSaveDialog;
var JSScrollPane = edu_stanford_cs_java2js.JSScrollPane;
var JSConsole = edu_stanford_cs_jsconsole.JSConsole;
var NBConsole = edu_stanford_cs_jsconsole.NBConsole;
var JSControl = edu_stanford_cs_jscontrols_JSControl.JSControl;
var LoadControl = edu_stanford_cs_jscontrols_LoadControl.LoadControl;
var NewControl = edu_stanford_cs_jscontrols_NewControl.NewControl;
var ResetControl = edu_stanford_cs_jscontrols_ResetControl.ResetControl;
var RunControl = edu_stanford_cs_jscontrols_RunControl.RunControl;
var SaveControl = edu_stanford_cs_jscontrols_SaveControl.SaveControl;
var SpeedControl = edu_stanford_cs_jscontrols_SpeedControl.SpeedControl;
var StepControl = edu_stanford_cs_jscontrols_StepControl.StepControl;
var CommentHighlightMode = edu_stanford_cs_programeditor.CommentHighlightMode;
var ProgramEditor = edu_stanford_cs_programeditor.ProgramEditor;
var TokenScanner = edu_stanford_cs_tokenscanner.TokenScanner;
var BorderLayout = java_awt.BorderLayout;
var Color = java_awt.Color;
var Component = java_awt.Component;
var Container = java_awt.Container;
var Dimension = java_awt.Dimension;
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
var Character = java_lang.Character;
var Class = java_lang.Class;
var Integer = java_lang.Integer;
var RuntimeException = java_lang.RuntimeException;
var ArrayList = java_util.ArrayList;
var HashMap = java_util.HashMap;
var HashSet = java_util.HashSet;
var Map = java_util.Map;
var Set = java_util.Set;
var TreeMap = java_util.TreeMap;
var BorderFactory = javax_swing.BorderFactory;
var JComponent = javax_swing.JComponent;
var JScrollPane = javax_swing.JScrollPane;
var ChangeEvent = javax_swing.ChangeEvent;
var ChangeListener = javax_swing.ChangeListener;

/* TDC.js */

var TDC = function() {
   /* Empty */
};

TDC.DEFAULT_ADDRESS_SIZE = 2;
TDC.DEFAULT_BASE = 10;
TDC.PREFERRED_WIDTH = 1016;
TDC.PREFERRED_HEIGHT = 600;
TDC.MINIMUM_WIDTH = 800;
TDC.MINIMUM_HEIGHT = 450;
TDC.OUTER_MARGIN = 6;
TDC.CPU_WIDTH = 120;
TDC.CPU_HEIGHT = 250;
TDC.CPU_LEFT_MARGIN = 35;
TDC.CPU_TOP_MARGIN = 20;
TDC.CPU_YSEP = 15;
TDC.MEMORY_HEIGHT = 250;
TDC.INNER_SEP = 6;
TDC.DIGIT_WIDTH = 11;
TDC.SIGN_WIDTH = 11;
TDC.MAX_INSTRUCTION_WIDTH = 130;
TDC.CELL_HEIGHT = 20;
TDC.CONTROL_HEIGHT = 64;
TDC.COLUMN_HEADER_HEIGHT = 20;
TDC.ROW_HEADER_WIDTH = 15;
TDC.LABEL_DX = -3;
TDC.BASELINE_DY = -1;
TDC.SIGN_DY = -1;
TDC.SHORT_PADDING = 2;
TDC.ADDRESS_FONT = Font.decode("SansSerif-Bold-14");
TDC.ADDRESS_ITALIC = Font.decode("Serif-Italic-14");
TDC.ANNOTATION_FONT = Font.decode("Serif-12");
TDC.TRACE_FONT = Font.decode("Courier New-Bold-12");
TDC.CODE_FONT = Font.decode("Courier New-Bold-14");
TDC.CONSOLE_FONT = Font.decode("Courier New-Bold-18");
TDC.EDITOR_FONT = Font.decode("Courier New-Bold-18");
TDC.LABEL_FONT = Font.decode("Courier New-Bold-16");
TDC.VALUE_FONT = Font.decode("Helvetica Neue-Bold-16");
TDC.APPLICATION_BACKGROUND = new Color(0xCCFFFF);
TDC.CELL0_BACKGROUND = new Color(0xEEEEEE);
TDC.LOAD = 1;
TDC.STORE = 2;
TDC.ADD = 3;
TDC.SUB = 4;
TDC.JUMP = 5;
TDC.JUMPZ = 6;
TDC.JUMPN = 7;
TDC.INPUT = 8;
TDC.OUTPUT = 9;
TDC.LOADX = -1;
TDC.STOREX = -2;
TDC.XLOAD = -3;
TDC.XSTORE = -4;
TDC.CALL = -5;
TDC.PUSH = -6;
TDC.POP = -7;
TDC.INCHAR = -8;
TDC.OUTCHAR = -9;
TDC.TRAP = 99;
TDC.TRAPX = 8;
TDC.LOADXR = 20;
TDC.LOADSP = 21;
TDC.LOADXAC = 22;
TDC.LOADXSP = 23;
TDC.INCX = 24;
TDC.DECX = 25;
TDC.PUSHAC = 30;
TDC.POPAC = 31;
TDC.PUSHXR = 32;
TDC.POPXR = 33;
TDC.MUL = 40;
TDC.DIV = 41;
TDC.REM = 42;
TDC.ADDSTK = 50;
TDC.SUBSTK = 51;
TDC.MULSTK = 52;
TDC.DIVSTK = 53;
TDC.REMSTK = 54;
TDC.INPUTX = 60;
TDC.OUTPUTX = 61;
TDC.INCHARX = 62;
TDC.OUTCHARX = 63;
TDC.CONSOLE_WIDTH = 800;
TDC.CONSOLE_HEIGHT = 300;

/* TDCellView.js */

var TDCellView = function() {
   /* Empty */
};

TDCellView.prototype.setBounds = function(x, y, width, height) {
   this.bounds = new Rectangle(x, y, width, height);
};

TDCellView.prototype.getBounds = function() {
   return this.bounds;
};

TDCellView.prototype.setSelected = function(flag) {
   this.selected = flag;
};

TDCellView.prototype.isSelected = function() {
   return this.selected;
};

TDCellView.prototype.getLabel = function() {
   return null;
};

TDCellView.prototype.draw = function(g) {
   this.drawStandardCell(g);
};

TDCellView.prototype.drawStandardCell = function(g) {
   g.setFont(TDC.LABEL_FONT);
   var fm = g.getFontMetrics();
   g.setColor(Color.WHITE);
   var r = this.getBounds();
   g.fillRect(r.x, r.y, r.width, r.height);
   g.setColor(Color.BLACK);
   g.drawRect(r.x, r.y, r.width, r.height);
   var label = this.getLabel();
   if (label !== null) {
      var x = r.x - fm.stringWidth(label) + TDC.LABEL_DX;
      var y = r.y + toInt(((r.height + fm.getAscent()) / 2))+
      TDC.BASELINE_DY;
      g.drawString(label, x, y);
   }
   g.setFont(TDC.VALUE_FONT);
   var g2 = g.create(r.x, r.y, r.width, r.height);
   this.drawContents(g2, this.getContents());
   g2.dispose();
};

TDCellView.prototype.drawContents = function(g, str) {
   var fm = g.getFontMetrics();
   var hasSign = jslib.startsWith(str, "+") || jslib.startsWith(str, "-");
   str = str.replace("-", "\u2212");
   var x = toInt(((this.bounds.width - fm.stringWidth(str)) / 2));
   var y = toInt(((this.bounds.height + fm.getAscent()) / 2))+ TDC.BASELINE_DY;
   if (hasSign) {
      var sign = str.substring(0, 1);
      str = str.substring(1);
      g.drawString(sign, x, y + TDC.SIGN_DY);
      x += fm.stringWidth(sign);
   }
   g.drawString(str, x, y);
};

TDCellView.prototype.getContents = function() {
   return null;
};


/* TDCommandListener.js */

var TDCommandListener = function(tdi, cl) {
   this.tdi = tdi;
   this.cl = cl;
};

TDCommandListener.prototype.actionPerformed = function(e) {
   var model = this.tdi.getModel();
   if (model.getControllerState() === Controller.WAITING) {
      model.deliverInput(e.getActionCommand());
   } else {
      if (this.cl !== null) this.cl.processCommands(e.getActionCommand());
   }
};


/* TDCommandLoop.js */

var TDCommandLoop = function(td, console) {
   CommandLoop.call(this, console);
   this.td = td;
   this.addCommand("load", new LoadCommand());
   this.addCommand("run", new RunCommand());
   this.addCommand("step", new StepCommand());
   this.addCommand("list", new ListCommand());
   this.addCommand("ac", new ACCommand());
   this.addCommand("ir", new IRCommand());
   this.addCommand("pc", new PCCommand());
   this.addCommand("sp", new SPCommand());
   this.addCommand("xr", new XRCommand());
   this.addCommand("speed", new SpeedCommand());
   this.addCommand("size", new SizeCommand());
   this.addCommand("dec", new DecCommand());
   this.addCommand("hex", new HexCommand());
   this.addCommand("reset", new ResetCommand());
   this.addCommand("clear", new ClearCommand());
   this.addCommand("quit", new QuitCommand());
   this.addCommand("help", new HelpCommand());
   this.addCommand("debug", new DebugCommand());
   this.addCommand("script", new ScriptCommand());
   this.addCommand("stacktrace", new StackTraceCommand());
   this.addCommand("AC", new ACCommand());
   this.addCommand("IR", new IRCommand());
   this.addCommand("PC", new PCCommand());
   this.addCommand("SP", new SPCommand());
   this.addCommand("XR", new XRCommand());
};

TDCommandLoop.prototype = 
   jslib.inheritPrototype(CommandLoop, "TDCommandLoop extends CommandLoop");
TDCommandLoop.prototype.constructor = TDCommandLoop;
TDCommandLoop.prototype.$class = 
   new Class("TDCommandLoop", TDCommandLoop);

TDCommandLoop.prototype.createActionListener = function() {
   return new TDCommandListener(this.td, this);
};

TDCommandLoop.prototype.getInterpreter = function() {
   return this.td;
};

var LoadCommand = function() {
   Command.call(this);
};

LoadCommand.prototype =
   jslib.inheritPrototype(Command, "LoadCommand extends Command");
LoadCommand.prototype.constructor = LoadCommand;
LoadCommand.prototype.$class = 
   new Class("LoadCommand", LoadCommand);

LoadCommand.prototype.getHelp = function() {
   return "load file -- Loads the specified file";
};

LoadCommand.prototype.execute = function(cl, scanner) {
   var td = (cl).getInterpreter();
   var path = this.scanFilename(scanner);
   scanner.verifyToken("");
   var slash = path.lastIndexOf("/");
   var filename = path.substring(slash + 1);
   var dot = path.indexOf(".", slash + 1);
   if (slash === -1) path = "examples/" + path;   // Add search path someday
   if (dot === -1) path += ".asm";
   new JSFile(path).read(new TDLoadCommandListener(td, filename));
   return false;
};

var RegisterCommand = function() {
   Command.call(this);
};

RegisterCommand.prototype =
   jslib.inheritPrototype(Command, "RegisterCommand extends Command");
RegisterCommand.prototype.constructor = RegisterCommand;
RegisterCommand.prototype.$class = 
   new Class("RegisterCommand", RegisterCommand);

RegisterCommand.prototype.getHelp = function() {
   var name = this.getName();
   if (Character.isUpperCase(name.charCodeAt(0))) return "*";
   return name + " -- Display the value in the " + name.toUpperCase();
};

RegisterCommand.prototype.execute = function(cl, scanner) {
   var td = (cl).getInterpreter();
   var model = td.getModel();
   var token = scanner.nextToken();
   if (jslib.equals(token, "=")) {
      this.set(model, model.scanValue(scanner));
   } else {
      var str = model.digitString(this.get(model), this.getNDigits(model));
      td.getConsole().println(this.getName() + " = " + str);
   }
   return true;
};

var ACCommand = function() {
   RegisterCommand.call(this);
};

ACCommand.prototype =
   jslib.inheritPrototype(RegisterCommand, "ACCommand extends RegisterCommand");
ACCommand.prototype.constructor = ACCommand;
ACCommand.prototype.$class = 
   new Class("ACCommand", ACCommand);

ACCommand.prototype.get = function(model) {
   return model.getAC();
};

ACCommand.prototype.set = function(model, value) {
   model.setAC(value);
};

ACCommand.prototype.getNDigits = function(model) {
   return -(model.getAddressSize() + 1);
};

var IRCommand = function() {
   RegisterCommand.call(this);
};

IRCommand.prototype =
   jslib.inheritPrototype(RegisterCommand, "IRCommand extends RegisterCommand");
IRCommand.prototype.constructor = IRCommand;
IRCommand.prototype.$class = 
   new Class("IRCommand", IRCommand);

IRCommand.prototype.get = function(model) {
   return model.getIR();
};

IRCommand.prototype.set = function(model, value) {
   model.setIR(value);
};

IRCommand.prototype.getNDigits = function(model) {
   return -(model.getAddressSize() + 1);
};

var PCCommand = function() {
   RegisterCommand.call(this);
};

PCCommand.prototype =
   jslib.inheritPrototype(RegisterCommand, "PCCommand extends RegisterCommand");
PCCommand.prototype.constructor = PCCommand;
PCCommand.prototype.$class = 
   new Class("PCCommand", PCCommand);

PCCommand.prototype.get = function(model) {
   return model.getPC();
};

PCCommand.prototype.set = function(model, value) {
   model.setPC(value);
};

PCCommand.prototype.getNDigits = function(model) {
   return model.getAddressSize();
};

var SPCommand = function() {
   RegisterCommand.call(this);
};

SPCommand.prototype =
   jslib.inheritPrototype(RegisterCommand, "SPCommand extends RegisterCommand");
SPCommand.prototype.constructor = SPCommand;
SPCommand.prototype.$class = 
   new Class("SPCommand", SPCommand);

SPCommand.prototype.get = function(model) {
   return model.getSP();
};

SPCommand.prototype.set = function(model, value) {
   model.setSP(value);
};

SPCommand.prototype.getNDigits = function(model) {
   return model.getAddressSize();
};

var XRCommand = function() {
   RegisterCommand.call(this);
};

XRCommand.prototype =
   jslib.inheritPrototype(RegisterCommand, "XRCommand extends RegisterCommand");
XRCommand.prototype.constructor = XRCommand;
XRCommand.prototype.$class = 
   new Class("XRCommand", XRCommand);

XRCommand.prototype.get = function(model) {
   return model.getXR();
};

XRCommand.prototype.set = function(model, value) {
   model.setXR(value);
};

XRCommand.prototype.getNDigits = function(model) {
   return model.getAddressSize();
};

var ClearCommand = function() {
   Command.call(this);
};

ClearCommand.prototype =
   jslib.inheritPrototype(Command, "ClearCommand extends Command");
ClearCommand.prototype.constructor = ClearCommand;
ClearCommand.prototype.$class = 
   new Class("ClearCommand", ClearCommand);

ClearCommand.prototype.getHelp = function() {
   return "clear -- Clear all memory cells and registers";
};

ClearCommand.prototype.execute = function(cl, scanner) {
   var td = (cl).getInterpreter();
   td.getModel().clear();
   return true;
};

var DecCommand = function() {
   Command.call(this);
};

DecCommand.prototype =
   jslib.inheritPrototype(Command, "DecCommand extends Command");
DecCommand.prototype.constructor = DecCommand;
DecCommand.prototype.$class = 
   new Class("DecCommand", DecCommand);

DecCommand.prototype.getHelp = function() {
   return "dec -- Sets Toddler to use decimal arithmetic";
};

DecCommand.prototype.execute = function(cl, scanner) {
   var td = (cl).getInterpreter();
   var model = td.getModel();
   model.setBase(10);
   model.clear();
   return true;
};

var HexCommand = function() {
   Command.call(this);
};

HexCommand.prototype =
   jslib.inheritPrototype(Command, "HexCommand extends Command");
HexCommand.prototype.constructor = HexCommand;
HexCommand.prototype.$class = 
   new Class("HexCommand", HexCommand);

HexCommand.prototype.getHelp = function() {
   return "hex -- Sets Toddler to use hexadecimal arithmetic";
};

HexCommand.prototype.execute = function(cl, scanner) {
   var td = (cl).getInterpreter();
   var model = td.getModel();
   model.setBase(16);
   model.clear();
   return true;
};

var ListCommand = function() {
   Command.call(this);
};

ListCommand.prototype =
   jslib.inheritPrototype(Command, "ListCommand extends Command");
ListCommand.prototype.constructor = ListCommand;
ListCommand.prototype.$class = 
   new Class("ListCommand", ListCommand);

ListCommand.prototype.getHelp = function() {
   return "list -- Lists all nonzero words in the program";
};

ListCommand.prototype.execute = function(cl, scanner) {
   var td = (cl).getInterpreter();
   var model = td.getModel();
   var nbc = td.getConsole();
   var addressDigits = model.getAddressSize();
   var valueDigits = addressDigits + 1;
   var skip = false;
   for (var i = 1; i < model.getMemorySize(); i++) {
      var value = model.getMemory(i);
      if (value !== 0) {
         var line = "(";
         line += model.digitString(i, addressDigits);
         line += ") ";
         line += model.digitString(value, -valueDigits);
         if (skip) {
            skip = false;
            line += "   *";
         } else {
            var str = TDInstruction.unparse(model, value);
            if (!jslib.equals(str, "")) {
               if (jslib.endsWith(str, "*")) {
                  value = model.getMemory(i + 1);
                  line += "   " + str.substring(0, str.length - 1);
                  line += model.digitString(value, addressDigits);
                  skip = true;
               } else {
                  line += "   " + str;
               }
            }
         }
         nbc.println(line);
      }
   }
   return true;
};

var ResetCommand = function() {
   Command.call(this);
};

ResetCommand.prototype =
   jslib.inheritPrototype(Command, "ResetCommand extends Command");
ResetCommand.prototype.constructor = ResetCommand;
ResetCommand.prototype.$class = 
   new Class("ResetCommand", ResetCommand);

ResetCommand.prototype.getHelp = function() {
   return "reset -- Reset the values in the registers";
};

ResetCommand.prototype.execute = function(cl, scanner) {
   var td = (cl).getInterpreter();
   td.getModel().reset();
   return true;
};

var RunCommand = function() {
   Command.call(this);
};

RunCommand.prototype =
   jslib.inheritPrototype(Command, "RunCommand extends Command");
RunCommand.prototype.constructor = RunCommand;
RunCommand.prototype.$class = 
   new Class("RunCommand", RunCommand);

RunCommand.prototype.getHelp = function() {
   return "run -- Runs the program";
};

RunCommand.prototype.execute = function(cl, scanner) {
   var td = (cl).getInterpreter();
   var model = td.getModel();
   model.setControllerState(Controller.RUNNING);
   td.setInputState(Controller.RUNNING);
   model.reset();
   model.setPC(1);
   model.startAction();
   return false;
};

var SizeCommand = function() {
   Command.call(this);
};

SizeCommand.prototype =
   jslib.inheritPrototype(Command, "SizeCommand extends Command");
SizeCommand.prototype.constructor = SizeCommand;
SizeCommand.prototype.$class = 
   new Class("SizeCommand", SizeCommand);

SizeCommand.prototype.getHelp = function() {
   return "size n -- Sets the memory size to n words";
};

SizeCommand.prototype.execute = function(cl, scanner) {
   var td = (cl).getInterpreter();
   var model = td.getModel();
   var token = scanner.nextToken().toUpperCase();
   if (jslib.equals(token, "100")) {
      model.setAddressSize(2);
   } else if (jslib.equals(token, "1000") || jslib.equals(token, "1K")) {
      model.setAddressSize(3);
   } else if (jslib.equals(token, "10000") || jslib.equals(token, "10K")) {
      model.setAddressSize(4);
   } else if (jslib.equals(token, "100000") || jslib.equals(token, "100K")) {
      model.setAddressSize(5);
   } else if (jslib.equals(token, "1000000") || jslib.equals(token, "1M")) {
      model.setAddressSize(6);
   } else {
      throw new RuntimeException("Illegal size");
   }
   model.clear();
   return true;
};

var StepCommand = function() {
   Command.call(this);
};

StepCommand.prototype =
   jslib.inheritPrototype(Command, "StepCommand extends Command");
StepCommand.prototype.constructor = StepCommand;
StepCommand.prototype.$class = 
   new Class("StepCommand", StepCommand);

StepCommand.prototype.getHelp = function() {
   return "step -- Execute a single step of the program";
};

StepCommand.prototype.execute = function(cl, scanner) {
   var td = (cl).getInterpreter();
   var model = td.getModel();
   if (model.getPC() === 0) model.setPC(1);
   td.setInputState(Controller.STEPPING);
   model.stepAction();
   return false;
};

var SpeedCommand = function() {
   Command.call(this);
};

SpeedCommand.prototype =
   jslib.inheritPrototype(Command, "SpeedCommand extends Command");
SpeedCommand.prototype.constructor = SpeedCommand;
SpeedCommand.prototype.$class = 
   new Class("SpeedCommand", SpeedCommand);

SpeedCommand.prototype.getHelp = function() {
   return "speed n -- Sets the speed to a value between 0 and 100";
};

SpeedCommand.prototype.execute = function(cl, scanner) {
   var td = (cl).getInterpreter();
   var model = td.getModel();
   var token = scanner.nextToken();
   model.setSpeed(Integer.parseInt(token));
   return true;
};

var TraceCommand = function() {
   Command.call(this);
};

TraceCommand.prototype =
   jslib.inheritPrototype(Command, "TraceCommand extends Command");
TraceCommand.prototype.constructor = TraceCommand;
TraceCommand.prototype.$class = 
   new Class("TraceCommand", TraceCommand);

TraceCommand.prototype.getHelp = function() {
   return "trace [on/off] -- Turns instruction tracing on or off";
};

TraceCommand.prototype.execute = function(cl, scanner) {
   var td = (cl).getInterpreter();
   var model = td.getModel();
   model.setTraceFlag(this.scanOnOffToggle(scanner, model.getTraceFlag()));
   return true;
};

var TDLoadCommandListener = function(tdi, filename) {
   this.tdi = tdi;
   this.filename = filename;
};

TDLoadCommandListener.prototype.actionPerformed = function(e) {
   if (e instanceof JSErrorEvent) {
      this.tdi.getConsole().showErrorMessage(e.getActionCommand());
   } else {
      var text = e.getActionCommand();
      this.tdi.load(this.filename, text);
   }
};


/* TDViewCanvas.js */

var TDViewCanvas = function() {
   JSCanvas.call(this);
   this.setFocusTraversalKeysEnabled(false);
   this.setOpaque(false);
   this.cells = new ArrayList();
};

TDViewCanvas.prototype = 
   jslib.inheritPrototype(JSCanvas, "TDViewCanvas extends JSCanvas");
TDViewCanvas.prototype.constructor = TDViewCanvas;
TDViewCanvas.prototype.$class = 
   new Class("TDViewCanvas", TDViewCanvas);

TDViewCanvas.prototype.add = function(cell) {
   this.cells.add(cell);
};

TDViewCanvas.prototype.getCellAt = function(x, y) {
   var el0 = new JSElementList(this.cells);
   for (var ei0 = 0; ei0 < el0.size(); ei0++) {
      var cell = el0.get(ei0);
      if (cell.getBounds().contains(x, y)) return cell;
   }
   return null;
};

TDViewCanvas.prototype.drawCells = function(g) {
   var el0 = new JSElementList(this.cells);
   for (var ei0 = 0; ei0 < el0.size(); ei0++) {
      var cell = el0.get(ei0);
      cell.draw(g);
   }
};


/* TDCPUView.js */

var TDCPUView = function(model) {
   TDViewCanvas.call(this);
   var x = TDC.CPU_LEFT_MARGIN;
   var y = TDC.CPU_TOP_MARGIN;
   var acView = new TDACView(model, x, y);
   y += acView.getBounds().height + TDC.CPU_YSEP;
   var pcView = new PCView(model, x, y);
   y += pcView.getBounds().height + TDC.CPU_YSEP;
   var irView = new TDIRView(model, x, y);
   var insView = new TDInsView(model, x, y + TDC.CELL_HEIGHT + 2);
   y += irView.getBounds().height + TDC.CPU_YSEP + TDC.CELL_HEIGHT + 2;
   var xrView = new TDXRView(model, x, y);
   y += xrView.getBounds().height + TDC.CPU_YSEP;
   var spView = new TDSPView(model, x, y);
   this.add(pcView);
   this.add(acView);
   this.add(irView);
   this.add(insView);
   this.add(xrView);
   this.add(spView);
};

TDCPUView.prototype = 
   jslib.inheritPrototype(TDViewCanvas, "TDCPUView extends TDViewCanvas");
TDCPUView.prototype.constructor = TDCPUView;
TDCPUView.prototype.$class = 
   new Class("TDCPUView", TDCPUView);

TDCPUView.prototype.stateChanged = function(e) {
   this.repaint();
};

TDCPUView.prototype.paintComponent = function(g) {
   var size = this.getSize();
   g.setColor(TDC.APPLICATION_BACKGROUND);
   g.fillRect(0, 0, size.width, size.height);
   g.setColor(Color.BLACK);
   this.drawCells(g);
};

var TDACView = function(model, x, y) {
   TDCellView.call(this);
   this.model = model;
   var width = model.getWordSize() * TDC.DIGIT_WIDTH;
   if (model.getBase() === 10) width += TDC.SIGN_WIDTH;
   this.setBounds(x, y, width, TDC.CELL_HEIGHT);
};

TDACView.prototype = 
   jslib.inheritPrototype(TDCellView, "TDACView extends TDCellView");
TDACView.prototype.constructor = TDACView;
TDACView.prototype.$class = 
   new Class("TDACView", TDACView);

TDACView.prototype.getLabel = function() {
   return "AC";
};

TDACView.prototype.getContents = function() {
   return this.model.digitString(this.model.getAC(), -this.model.getWordSize());
};

var PCView = function(model, x, y) {
   TDCellView.call(this);
   this.model = model;
   var width = model.getAddressSize() * TDC.DIGIT_WIDTH + TDC.SHORT_PADDING;
   this.setBounds(x, y, width, TDC.CELL_HEIGHT);
};

PCView.prototype = 
   jslib.inheritPrototype(TDCellView, "PCView extends TDCellView");
PCView.prototype.constructor = PCView;
PCView.prototype.$class = 
   new Class("PCView", PCView);

PCView.prototype.getLabel = function() {
   return "PC";
};

PCView.prototype.getContents = function() {
   return this.model.digitString(this.model.getPC(), this.model.getAddressSize());
};

var TDIRView = function(model, x, y) {
   TDCellView.call(this);
   this.model = model;
   var width = model.getWordSize() * TDC.DIGIT_WIDTH + TDC.SIGN_WIDTH;
   this.setBounds(x, y, width, TDC.CELL_HEIGHT);
};

TDIRView.prototype = 
   jslib.inheritPrototype(TDCellView, "TDIRView extends TDCellView");
TDIRView.prototype.constructor = TDIRView;
TDIRView.prototype.$class = 
   new Class("TDIRView", TDIRView);

TDIRView.prototype.getLabel = function() {
   return "IR";
};

TDIRView.prototype.getContents = function() {
   return this.model.digitString(this.model.getIR(), -this.model.getWordSize());
};

var TDInsView = function(model, x, y) {
   TDCellView.call(this);
   this.model = model;
   var width = TDC.MAX_INSTRUCTION_WIDTH;
   this.setBounds(x, y, width, TDC.CELL_HEIGHT);
};

TDInsView.prototype = 
   jslib.inheritPrototype(TDCellView, "TDInsView extends TDCellView");
TDInsView.prototype.constructor = TDInsView;
TDInsView.prototype.$class = 
   new Class("TDInsView", TDInsView);

TDInsView.prototype.draw = function(g) {
   g.setFont(TDC.TRACE_FONT);
   var fm = g.getFontMetrics();
   var r = this.getBounds();
   var x = r.x + 2;
   var y = r.y + fm.getAscent() + 2;
   var ins = TDInstruction.unparse(this.model, this.model.getIR());
   g.drawString(ins, x, y);
};

var TDXRView = function(model, x, y) {
   TDCellView.call(this);
   this.model = model;
   var width = model.getAddressSize() * TDC.DIGIT_WIDTH + TDC.SHORT_PADDING;
   this.setBounds(x, y, width, TDC.CELL_HEIGHT);
};

TDXRView.prototype = 
   jslib.inheritPrototype(TDCellView, "TDXRView extends TDCellView");
TDXRView.prototype.constructor = TDXRView;
TDXRView.prototype.$class = 
   new Class("TDXRView", TDXRView);

TDXRView.prototype.getLabel = function() {
   return "XR";
};

TDXRView.prototype.getContents = function() {
   return this.model.digitString(this.model.getXR(), this.model.getAddressSize());
};

TDXRView.prototype.draw = function(g) {
   if (this.model.isExtended()) this.drawStandardCell(g);
};

var TDSPView = function(model, x, y) {
   TDCellView.call(this);
   this.model = model;
   var width = model.getAddressSize() * TDC.DIGIT_WIDTH + TDC.SHORT_PADDING;
   this.setBounds(x, y, width, TDC.CELL_HEIGHT);
};

TDSPView.prototype = 
   jslib.inheritPrototype(TDCellView, "TDSPView extends TDCellView");
TDSPView.prototype.constructor = TDSPView;
TDSPView.prototype.$class = 
   new Class("TDSPView", TDSPView);

TDSPView.prototype.getLabel = function() {
   return "SP";
};

TDSPView.prototype.getContents = function() {
   return this.model.digitString(this.model.getSP(), this.model.getAddressSize());
};

TDSPView.prototype.draw = function(g) {
   if (this.model.isExtended()) this.drawStandardCell(g);
};


/* TDEditor.js */

var TDEditor = function(model) {
   ProgramEditor.call(this);
   this.model = model;
   this.scanner = new TokenScanner();
   this.scanner.ignoreWhitespace();
   this.scanner.ignoreComments();
   this.scanner.scanNumbers();
   this.setFont(TDC.EDITOR_FONT);
   this.setLineWrap(false);
   this.setEditorMode(new CommentHighlightMode());
   this.lineTable = new TreeMap();
   this.addrTable = new TreeMap();
   this.editorFile = null;
};

TDEditor.prototype = 
   jslib.inheritPrototype(ProgramEditor, "TDEditor extends ProgramEditor");
TDEditor.prototype.constructor = TDEditor;
TDEditor.prototype.$class = 
   new Class("TDEditor", TDEditor);

TDEditor.prototype.isBreakpointLegal = function(k) {
   this.lineTable.containsValue(k);
   return true;
};

TDEditor.prototype.getSourceLineIndex = function(addr) {
   var k = this.lineTable.get(addr);
   return (k === null) ? 0 : k;
};

TDEditor.prototype.getAddressForLine = function(addr) {
   var k = this.addrTable.get(addr);
   return (k === null) ? 0 : k;
};

TDEditor.prototype.setSourceLineIndex = function(addr, line) {
   this.lineTable.put(addr, line);
   this.addrTable.put(line, addr);
};

TDEditor.prototype.clearLineTable = function() {
   this.lineTable.clear();
   this.addrTable.clear();
};

TDEditor.prototype.setFile = function(file) {
   this.editorFile = file;
   var frame = this.getFrame();
   if (frame !== null) {
      frame.setTitle((file === null) ? "Untitled" : file.getName());
   }
};

TDEditor.prototype.getFile = function() {
   return this.editorFile;
};

TDEditor.prototype.drawAnnotations = function(g, k, r) {
   if (this.isBreakpoint(k)) this.drawBreakpoint(g, r);
   var addr = this.getAddressForLine(k);
   if (addr !== 0) {
      var str = this.model.digitString(addr, this.model.getAddressSize());
      str = "(" + str + ")";
      g.setColor(Color.BLACK);
      g.setFont(TDC.ANNOTATION_FONT);
      var fm = g.getFontMetrics();
      var x = r.x + (r.width - fm.stringWidth(str)) / 2;
      var y = r.y + (r.height + fm.getAscent()) / 2;
      y -= JSProgram.isJavaScript() ? 3 : 1;
      g.drawString(str, x, y);
   }
   if (this.getCurrentLine() === k) this.drawCurrentLineMarker(g, r);
};

TDEditor.prototype.paint = function(g) {
   if (g.getFont().getSize() >= 22) return;
   ProgramEditor.prototype.paint.call(this, g);
};


/* TDInstruction.js */

var TDInstruction = function() {
   /* Empty */
};

TDInstruction.parse = function(model, scanner) {
   if (TDInstruction.opcodeTable === null) TDInstruction.initInstructionTable();
   var token = scanner.nextToken();
   if (scanner.getTokenType(token) !== TokenScanner.WORD) {
      scanner.saveToken(token);
      return false;
   }
   var ins = TDInstruction.parseTable.get(token.toUpperCase());
   if (ins === null) {
      scanner.saveToken(token);
      return false;
   }
   ins.parseIns(model, scanner);
   return true;
};

TDInstruction.unparse = function(model, value) {
   if (TDInstruction.opcodeTable === null) TDInstruction.initInstructionTable();
   var op = model.getOperation(value);
   var ins = TDInstruction.opcodeTable.get(op);
   if (ins === null) return "";
   return ins.unparseIns(model, value);
};

TDInstruction.execute = function(model, value) {
   if (TDInstruction.opcodeTable === null) TDInstruction.initInstructionTable();
   var op = model.getOperation(value);
   var ins = TDInstruction.opcodeTable.get(op);
   if (ins === null) {
      var msg = "Illegal instruction: (";
      msg += model.digitString(model.getPC() - 1, model.getAddressSize());
      msg += ") " + model.digitString(model.getIR(), model.getWordSize());
      throw new RuntimeException(msg);
   }
   ins.executeIns(model, model.getAddress(value));
};

TDInstruction.prototype.parseStandardIns = function(model, scanner) {
   var ins = model.createIns(this.opcode, model.scanAddressField(scanner));
   if (ins < 0) model.setExtended(true);
   return ins;
};

TDInstruction.prototype.parseIns = function(model, scanner) {
   model.storeValue(this.parseStandardIns(model, scanner));
};

TDInstruction.prototype.unparseStandardIns = function(model, value) {
   var addr = model.getAddress(value);
   if (addr === 0) return "";
   return this.name + " " + model.digitString(value, model.getAddressSize());
};

TDInstruction.prototype.unparseIns = function(model, value) {
   return this.unparseStandardIns(model, value);
};

TDInstruction.prototype.executeIns = function(model, addr) {
   throw new RuntimeException("Internal error: undefined instruction");
};

TDInstruction.prototype.isDirective = function() {
   return false;
};

TDInstruction.prototype.fixHexAddr = function(xx) {
   return 10 * (xx >> 4 & 0xF) + (xx & 0xF);
};

TDInstruction.prototype.createTrap = function(model, xx) {
   if (model.getBase() === 16) {
      return model.createIns(TDC.TRAPX, 16 * toInt((xx / 10))+ xx % 10);
   } else {
      return -xx;
   }
};

TDInstruction.prototype.scanAddress = function(model, scanner) {
   var token = scanner.nextToken();
   if (jslib.equals(token, "\n")) {
      scanner.saveToken(token);
      token = "";
   }
   if (jslib.equals(token, "")) {
      return 0;
   } else {
      return Integer.parseInt(token, model.getBase());
   }
};

TDInstruction.initInstructionTable = function() {
   TDInstruction.opcodeTable = new HashMap();
   TDInstruction.parseTable = new HashMap();
   /* The next two lines must precede the regular LOAD/STORE definitions */
   TDInstruction.define(TDC.XLOAD, "LOAD", new XLOAD_Instruction());
   TDInstruction.define(TDC.XSTORE, "STORE", new XSTORE_Instruction());
   TDInstruction.define(TDC.LOAD, "LOAD", new LOAD_Instruction());
   TDInstruction.define(TDC.STORE, "STORE", new STORE_Instruction());
   TDInstruction.define(TDC.ADD, "ADD", new ADD_Instruction());
   TDInstruction.define(TDC.SUB, "SUB", new SUB_Instruction());
   TDInstruction.define(TDC.JUMP, "JUMP", new JUMP_Instruction());
   TDInstruction.define(TDC.JUMPZ, "JUMPZ", new JUMPZ_Instruction());
   TDInstruction.define(TDC.JUMPN, "JUMPN", new JUMPN_Instruction());
   TDInstruction.define(TDC.INPUT, "INPUT", new INPUT_Instruction());
   TDInstruction.define(TDC.OUTPUT, "OUTPUT", new OUTPUT_Instruction());
   TDInstruction.define(TDC.LOADX, "LOADX", new LOADX_Instruction());
   TDInstruction.define(TDC.STOREX, "STOREX", new STOREX_Instruction());
   TDInstruction.define(TDC.CALL, "CALL", new CALL_Instruction());
   TDInstruction.define(TDC.PUSH, "PUSH", new PUSH_Instruction());
   TDInstruction.define(TDC.POP, "POP", new POP_Instruction());
   TDInstruction.define(TDC.INCHAR, "INCHAR", new INCHAR_Instruction());
   TDInstruction.define(TDC.OUTCHAR, "OUTCHAR", new OUTCHAR_Instruction());
   TDInstruction.define(TDC.TRAP, null, new TRAP_Instruction());
   TDInstruction.define(TDC.LOADXR, null, new LOADXR_Instruction());
   TDInstruction.define(TDC.LOADSP, null, new LOADSP_Instruction());
   TDInstruction.define(TDC.LOADXAC, null, new LOADXAC_Instruction());
   TDInstruction.define(TDC.LOADXSP, null, new LOADXSP_Instruction());
   TDInstruction.define(TDC.INCX, "INCX", new INCX_Instruction());
   TDInstruction.define(TDC.DECX, "DECX", new DECX_Instruction());
   TDInstruction.define(TDC.PUSHAC, null, new PUSHAC_Instruction());
   TDInstruction.define(TDC.POPAC, null, new POPAC_Instruction());
   TDInstruction.define(TDC.PUSHXR, null, new PUSHXR_Instruction());
   TDInstruction.define(TDC.POPXR, null, new POPXR_Instruction());
   TDInstruction.define(TDC.MUL, "MUL", new MUL_Instruction());
   TDInstruction.define(TDC.DIV, "DIV", new DIV_Instruction());
   TDInstruction.define(TDC.REM, "REM", new REM_Instruction());
   TDInstruction.define(TDC.ADDSTK, "ADDSTK", new ADDSTK_Instruction());
   TDInstruction.define(TDC.SUBSTK, "SUBSTK", new SUBSTK_Instruction());
   TDInstruction.define(TDC.MULSTK, "MULSTK", new MULSTK_Instruction());
   TDInstruction.define(TDC.DIVSTK, "DIVSTK", new DIVSTK_Instruction());
   TDInstruction.define(TDC.REMSTK, "REMSTK", new REMSTK_Instruction());
   TDInstruction.define(TDC.INPUTX, null, new INPUTX_Instruction());
   TDInstruction.define(TDC.OUTPUTX, null, new OUTPUTX_Instruction());
   TDInstruction.define(TDC.INCHARX, null, new INCHARX_Instruction());
   TDInstruction.define(TDC.OUTCHARX, null, new OUTCHARX_Instruction());
   TDInstruction.parseTable.put("HALT", new HALT_Instruction());
   TDInstruction.parseTable.put("RETURN", new RETURN_Instruction());
};

TDInstruction.define = function(op, key, ins) {
   TDInstruction.opcodeTable.put(op, ins);
   if (key !== null) TDInstruction.parseTable.put(key, ins);
   ins.name = key;
   ins.opcode = op;
};

TDInstruction.opcodeTable = null;
TDInstruction.parseTable = null;
var LOAD_Instruction = function() {
   TDInstruction.call(this);
};

LOAD_Instruction.prototype =
   jslib.inheritPrototype(TDInstruction, "LOAD_Instruction extends TDInstruction");
LOAD_Instruction.prototype.constructor = LOAD_Instruction;
LOAD_Instruction.prototype.$class = 
   new Class("LOAD_Instruction", LOAD_Instruction);

LOAD_Instruction.prototype.parseIns = function(model, scanner) {
   var token = scanner.nextToken();
   if (jslib.equalsIgnoreCase(token, "XR")) {
      model.setExtended(true);
      model.storeValue(this.createTrap(model, TDC.LOADXR));
   } else if (jslib.equalsIgnoreCase(token, "SP")) {
      model.setExtended(true);
      model.storeValue(this.createTrap(model, TDC.LOADSP));
   } else {
      scanner.saveToken(token);
      var result = this.parseStandardIns(model, scanner);
      token = scanner.nextToken();
      if (jslib.equals(token, "(")) {
         token = scanner.nextToken();
         if (!jslib.equalsIgnoreCase(token, "XR")) {
            throw new RuntimeException("Only XR can be used as an index");
         }
         scanner.verifyToken(")");
         model.setExtended(true);
         result = model.createIns(TDC.XLOAD, model.getAddress(result));
      } else {
         scanner.saveToken(token);
      }
      model.storeValue(result);
   }
};

LOAD_Instruction.prototype.executeIns = function(model, addr) {
   model.setAC(model.getMemory(addr));
};

var STORE_Instruction = function() {
   TDInstruction.call(this);
};

STORE_Instruction.prototype =
   jslib.inheritPrototype(TDInstruction, "STORE_Instruction extends TDInstruction");
STORE_Instruction.prototype.constructor = STORE_Instruction;
STORE_Instruction.prototype.$class = 
   new Class("STORE_Instruction", STORE_Instruction);

STORE_Instruction.prototype.parseIns = function(model, scanner) {
   var result = this.parseStandardIns(model, scanner);
   var token = scanner.nextToken();
   if (jslib.equals(token, "(")) {
      token = scanner.nextToken();
      if (!jslib.equalsIgnoreCase(token, "XR")) {
         throw new RuntimeException("Only XR can be used as an index");
      }
      scanner.verifyToken(")");
      model.setExtended(true);
      result = model.createIns(TDC.XSTORE, model.getAddress(result));
   } else {
      scanner.saveToken(token);
   }
   model.storeValue(result);
};

STORE_Instruction.prototype.executeIns = function(model, addr) {
   model.setMemory(addr, model.getAC());
};

var ADD_Instruction = function() {
   TDInstruction.call(this);
};

ADD_Instruction.prototype =
   jslib.inheritPrototype(TDInstruction, "ADD_Instruction extends TDInstruction");
ADD_Instruction.prototype.constructor = ADD_Instruction;
ADD_Instruction.prototype.$class = 
   new Class("ADD_Instruction", ADD_Instruction);

ADD_Instruction.prototype.executeIns = function(model, addr) {
   model.setAC(model.getAC() + model.getMemory(addr));
};

var SUB_Instruction = function() {
   TDInstruction.call(this);
};

SUB_Instruction.prototype =
   jslib.inheritPrototype(TDInstruction, "SUB_Instruction extends TDInstruction");
SUB_Instruction.prototype.constructor = SUB_Instruction;
SUB_Instruction.prototype.$class = 
   new Class("SUB_Instruction", SUB_Instruction);

SUB_Instruction.prototype.executeIns = function(model, addr) {
   model.setAC(model.getAC() - model.getMemory(addr));
};

var JUMP_Instruction = function() {
   TDInstruction.call(this);
};

JUMP_Instruction.prototype =
   jslib.inheritPrototype(TDInstruction, "JUMP_Instruction extends TDInstruction");
JUMP_Instruction.prototype.constructor = JUMP_Instruction;
JUMP_Instruction.prototype.$class = 
   new Class("JUMP_Instruction", JUMP_Instruction);

JUMP_Instruction.prototype.unparseIns = function(model, value) {
   if (model.getAddress(value) === 0) return "HALT";
   return this.unparseStandardIns(model, value);
};

JUMP_Instruction.prototype.executeIns = function(model, addr) {
   model.setPC(addr);
};

var HALT_Instruction = function() {
   TDInstruction.call(this);
};

HALT_Instruction.prototype =
   jslib.inheritPrototype(TDInstruction, "HALT_Instruction extends TDInstruction");
HALT_Instruction.prototype.constructor = HALT_Instruction;
HALT_Instruction.prototype.$class = 
   new Class("HALT_Instruction", HALT_Instruction);

HALT_Instruction.prototype.parseIns = function(model, scanner) {
   model.storeValue(model.createIns(TDC.JUMP, 0));
};

var JUMPZ_Instruction = function() {
   TDInstruction.call(this);
};

JUMPZ_Instruction.prototype =
   jslib.inheritPrototype(TDInstruction, "JUMPZ_Instruction extends TDInstruction");
JUMPZ_Instruction.prototype.constructor = JUMPZ_Instruction;
JUMPZ_Instruction.prototype.$class = 
   new Class("JUMPZ_Instruction", JUMPZ_Instruction);

JUMPZ_Instruction.prototype.executeIns = function(model, addr) {
   if (model.getAC() === 0) model.setPC(addr);
};

var JUMPN_Instruction = function() {
   TDInstruction.call(this);
};

JUMPN_Instruction.prototype =
   jslib.inheritPrototype(TDInstruction, "JUMPN_Instruction extends TDInstruction");
JUMPN_Instruction.prototype.constructor = JUMPN_Instruction;
JUMPN_Instruction.prototype.$class = 
   new Class("JUMPN_Instruction", JUMPN_Instruction);

JUMPN_Instruction.prototype.executeIns = function(model, addr) {
   if (model.getAC() < 0) model.setPC(addr);
};

var INPUT_Instruction = function() {
   TDInstruction.call(this);
};

INPUT_Instruction.prototype =
   jslib.inheritPrototype(TDInstruction, "INPUT_Instruction extends TDInstruction");
INPUT_Instruction.prototype.constructor = INPUT_Instruction;
INPUT_Instruction.prototype.$class = 
   new Class("INPUT_Instruction", INPUT_Instruction);

INPUT_Instruction.prototype.parseIns = function(model, scanner) {
   var token = scanner.nextToken();
   if (model.getBase() === 16) {
      var xx = (toInt((TDC.INPUTX / 10))<< 4) | (TDC.INPUTX % 10);
      model.storeValue((TDC.TRAPX << 4 * model.getAddressSize()) | xx);
      var addr = 0;
      if (!(jslib.equals(token, "") || jslib.equalsIgnoreCase(token, "AC"))) {
         scanner.saveToken(token);
         addr = model.scanAddressField(scanner);
      }
      model.storeValue(addr);
   } else {
      if (jslib.equalsIgnoreCase(token, "AC")) {
         model.storeValue(model.createIns(TDC.INPUT, 0));
      } else {
         scanner.saveToken(token);
         model.storeValue(this.parseStandardIns(model, scanner));
      }
   }
};

INPUT_Instruction.prototype.unparseIns = function(model, value) {
   if (model.getAddress(value) === 0) return "INPUT AC";
   return this.unparseStandardIns(model, value);
};

INPUT_Instruction.prototype.executeIns = function(model, addr) {
   model.waitForInput(TDC.INPUT, addr);
};

var OUTPUT_Instruction = function() {
   TDInstruction.call(this);
};

OUTPUT_Instruction.prototype =
   jslib.inheritPrototype(TDInstruction, "OUTPUT_Instruction extends TDInstruction");
OUTPUT_Instruction.prototype.constructor = OUTPUT_Instruction;
OUTPUT_Instruction.prototype.$class = 
   new Class("OUTPUT_Instruction", OUTPUT_Instruction);

OUTPUT_Instruction.prototype.parseIns = function(model, scanner) {
   var token = scanner.nextToken();
   if (model.getBase() === 16) {
      var xx = (toInt((TDC.OUTPUTX / 10))<< 4) | (TDC.OUTPUTX % 10);
      model.storeValue((TDC.TRAPX << 4 * model.getAddressSize()) | xx);
      var addr = 0;
      if (!(jslib.equals(token, "") || jslib.equalsIgnoreCase(token, "AC"))) {
         scanner.saveToken(token);
         addr = model.scanAddressField(scanner);
      }
      model.storeValue(addr);
   } else {
      if (jslib.equalsIgnoreCase(token, "AC")) {
         model.storeValue(model.createIns(TDC.OUTPUT, 0));
      } else {
         scanner.saveToken(token);
         model.storeValue(this.parseStandardIns(model, scanner));
      }
   }
};

OUTPUT_Instruction.prototype.unparseIns = function(model, value) {
   if (model.getAddress(value) === 0) return "OUTPUT AC";
   return this.unparseStandardIns(model, value);
};

OUTPUT_Instruction.prototype.executeIns = function(model, addr) {
   var value = (addr === 0) ? model.getAC() : model.getMemory(addr);
   if (model.getBase() === 16) {
      if ((value & (model.getMemorySize() << 3)) !== 0) {
         value -= (model.getMemorySize() << 4);
      }
   }
   model.getConsole().println(value);
};

var INCHAR_Instruction = function() {
   TDInstruction.call(this);
};

INCHAR_Instruction.prototype =
   jslib.inheritPrototype(TDInstruction, "INCHAR_Instruction extends TDInstruction");
INCHAR_Instruction.prototype.constructor = INCHAR_Instruction;
INCHAR_Instruction.prototype.$class = 
   new Class("INCHAR_Instruction", INCHAR_Instruction);

INCHAR_Instruction.prototype.parseIns = function(model, scanner) {
   var token = scanner.nextToken();
   if (model.getBase() === 16) {
      var xx = (toInt((TDC.INCHARX / 10))<< 4) | (TDC.INCHARX % 10);
      model.storeValue((TDC.TRAPX << 4 * model.getAddressSize()) | xx);
      var addr = 0;
      if (!(jslib.equals(token, "") || jslib.equalsIgnoreCase(token, "AC"))) {
         scanner.saveToken(token);
         addr = model.scanAddressField(scanner);
      }
      model.storeValue(addr);
   } else {
      if (jslib.equalsIgnoreCase(token, "AC")) {
         model.storeValue(model.createIns(TDC.INCHAR, 0));
      } else {
         scanner.saveToken(token);
         model.storeValue(this.parseStandardIns(model, scanner));
      }
   }
};

INCHAR_Instruction.prototype.unparseIns = function(model, value) {
   if (model.getAddress(value) === 0) return "INCHAR AC";
   return this.unparseStandardIns(model, value);
};

INCHAR_Instruction.prototype.executeIns = function(model, addr) {
   model.waitForInput(TDC.INCHAR, addr);
};

var OUTCHAR_Instruction = function() {
   TDInstruction.call(this);
};

OUTCHAR_Instruction.prototype =
   jslib.inheritPrototype(TDInstruction, "OUTCHAR_Instruction extends TDInstruction");
OUTCHAR_Instruction.prototype.constructor = OUTCHAR_Instruction;
OUTCHAR_Instruction.prototype.$class = 
   new Class("OUTCHAR_Instruction", OUTCHAR_Instruction);

OUTCHAR_Instruction.prototype.parseIns = function(model, scanner) {
   var token = scanner.nextToken();
   if (model.getBase() === 16) {
      var xx = (toInt((TDC.OUTCHARX / 10))<< 4) | (TDC.OUTCHARX % 10);
      model.storeValue((TDC.TRAPX << 4 * model.getAddressSize()) | xx);
      var addr = 0;
      if (!(jslib.equals(token, "") || jslib.equalsIgnoreCase(token, "AC"))) {
         scanner.saveToken(token);
         addr = model.scanAddressField(scanner);
      }
      model.storeValue(addr);
   } else {
      if (jslib.equalsIgnoreCase(token, "AC")) {
         model.storeValue(model.createIns(TDC.OUTCHAR, 0));
      } else {
         scanner.saveToken(token);
         model.storeValue(this.parseStandardIns(model, scanner));
      }
   }
};

OUTCHAR_Instruction.prototype.unparseIns = function(model, value) {
   if (model.getAddress(value) === 0) return "OUTCHAR AC";
   return this.unparseStandardIns(model, value);
};

OUTCHAR_Instruction.prototype.executeIns = function(model, addr) {
   var value = (addr === 0) ? model.getAC() : model.getMemory(addr);
   if (model.getBase() === 16) {
      if ((value & (model.getMemorySize() << 3)) !== 0) {
         value -= (model.getMemorySize() << 4);
      }
   }
   model.getConsole().print(toStr(value));
};

var TRAP_Instruction = function() {
   TDInstruction.call(this);
};

TRAP_Instruction.prototype =
   jslib.inheritPrototype(TDInstruction, "TRAP_Instruction extends TDInstruction");
TRAP_Instruction.prototype.constructor = TRAP_Instruction;
TRAP_Instruction.prototype.$class = 
   new Class("TRAP_Instruction", TRAP_Instruction);

TRAP_Instruction.prototype.parseIns = function(model, scanner) {
   throw new RuntimeException("Illegal instruction");
};

TRAP_Instruction.prototype.unparseIns = function(model, value) {
   var xx = (model.getBase() === 16) ? this.fixHexAddr(value) : -value % 100;
   switch (xx) {
      case TDC.LOADXR: return "LOAD XR";
      case TDC.LOADSP: return "LOAD SP";
      case TDC.LOADXAC: return "LOADX AC";
      case TDC.LOADXSP: return "LOADX SP";
      case TDC.INCX: return "INCX";
      case TDC.DECX: return "DECX";
      case TDC.PUSHAC: return "PUSH AC";
      case TDC.POPAC: return "POP AC";
      case TDC.PUSHXR: return "PUSH XR";
      case TDC.POPXR: return "POP XR";
      case TDC.MUL: return "MUL *";
      case TDC.DIV: return "DIV *";
      case TDC.REM: return "REM *";
      case TDC.ADDSTK: return "ADDSTK";
      case TDC.SUBSTK: return "SUBSTK";
      case TDC.MULSTK: return "MULSTK";
      case TDC.DIVSTK: return "DIVSTK";
      case TDC.REMSTK: return "REMSTK";
      case TDC.INPUTX: return "INPUT *";
      case TDC.OUTPUTX: return "OUTPUT *";
      case TDC.INCHARX: return "INCHAR *";
      case TDC.OUTCHARX: return "OUTCHAR *";
   }
   return "";
};

TRAP_Instruction.prototype.executeIns = function(model, addr) {
   var xx = (model.getBase() === 16) ? this.fixHexAddr(addr) : addr % 100;
   var ins = TDInstruction.opcodeTable.get(xx);
   if (ins === null) {
      var msg = "Illegal instruction: (";
      msg += model.digitString(model.getPC() - 1, model.getAddressSize());
      msg += ") " + model.digitString(model.getIR(), model.getWordSize());
      throw new RuntimeException(msg);
   }
   ins.executeIns(model, addr);
};

var LOADX_Instruction = function() {
   TDInstruction.call(this);
};

LOADX_Instruction.prototype =
   jslib.inheritPrototype(TDInstruction, "LOADX_Instruction extends TDInstruction");
LOADX_Instruction.prototype.constructor = LOADX_Instruction;
LOADX_Instruction.prototype.$class = 
   new Class("LOADX_Instruction", LOADX_Instruction);

LOADX_Instruction.prototype.parseIns = function(model, scanner) {
   var token = scanner.nextToken();
   model.setExtended(true);
   if (jslib.equalsIgnoreCase(token, "AC")) {
      model.storeValue(this.createTrap(model, TDC.LOADXAC));
   } else if (jslib.equalsIgnoreCase(token, "SP")) {
      model.storeValue(this.createTrap(model, TDC.LOADXSP));
   } else {
      scanner.saveToken(token);
      model.storeValue(this.parseStandardIns(model, scanner));
   }
};

LOADX_Instruction.prototype.executeIns = function(model, addr) {
   model.setXR(model.getMemory(addr));
};

var STOREX_Instruction = function() {
   TDInstruction.call(this);
};

STOREX_Instruction.prototype =
   jslib.inheritPrototype(TDInstruction, "STOREX_Instruction extends TDInstruction");
STOREX_Instruction.prototype.constructor = STOREX_Instruction;
STOREX_Instruction.prototype.$class = 
   new Class("STOREX_Instruction", STOREX_Instruction);

STOREX_Instruction.prototype.executeIns = function(model, addr) {
   model.setMemory(addr, model.getXR());
};

var XLOAD_Instruction = function() {
   TDInstruction.call(this);
};

XLOAD_Instruction.prototype =
   jslib.inheritPrototype(TDInstruction, "XLOAD_Instruction extends TDInstruction");
XLOAD_Instruction.prototype.constructor = XLOAD_Instruction;
XLOAD_Instruction.prototype.$class = 
   new Class("XLOAD_Instruction", XLOAD_Instruction);

XLOAD_Instruction.prototype.unparseIns = function(model, value) {
   var addr = model.getAddress(value);
   return "LOAD " + Integer.toString(addr, model.getBase()) + "(XR)";
};

XLOAD_Instruction.prototype.executeIns = function(model, addr) {
   model.setAC(model.getMemory(addr + model.getXR()));
};

var XSTORE_Instruction = function() {
   TDInstruction.call(this);
};

XSTORE_Instruction.prototype =
   jslib.inheritPrototype(TDInstruction, "XSTORE_Instruction extends TDInstruction");
XSTORE_Instruction.prototype.constructor = XSTORE_Instruction;
XSTORE_Instruction.prototype.$class = 
   new Class("XSTORE_Instruction", XSTORE_Instruction);

XSTORE_Instruction.prototype.unparseIns = function(model, value) {
   var addr = model.getAddress(value);
   return "STORE " + Integer.toString(addr, model.getBase()) + "(XR)";
};

XSTORE_Instruction.prototype.executeIns = function(model, addr) {
   model.setMemory(addr + model.getXR(), model.getAC());
};

var CALL_Instruction = function() {
   TDInstruction.call(this);
};

CALL_Instruction.prototype =
   jslib.inheritPrototype(TDInstruction, "CALL_Instruction extends TDInstruction");
CALL_Instruction.prototype.constructor = CALL_Instruction;
CALL_Instruction.prototype.$class = 
   new Class("CALL_Instruction", CALL_Instruction);

CALL_Instruction.prototype.unparseIns = function(model, value) {
   if (model.getAddress(value) === 0) return "RETURN";
   return this.unparseStandardIns(model, value);
};

CALL_Instruction.prototype.executeIns = function(model, addr) {
   if (addr === 0) {
      model.setPC(model.pop());
   } else {
      model.push(model.getPC());
      model.setPC(addr);
   }
};

var RETURN_Instruction = function() {
   TDInstruction.call(this);
};

RETURN_Instruction.prototype =
   jslib.inheritPrototype(TDInstruction, "RETURN_Instruction extends TDInstruction");
RETURN_Instruction.prototype.constructor = RETURN_Instruction;
RETURN_Instruction.prototype.$class = 
   new Class("RETURN_Instruction", RETURN_Instruction);

RETURN_Instruction.prototype.parseIns = function(model, scanner) {
   model.setExtended(true);
   model.storeValue(model.createIns(TDC.CALL, 0));
};

var PUSH_Instruction = function() {
   TDInstruction.call(this);
};

PUSH_Instruction.prototype =
   jslib.inheritPrototype(TDInstruction, "PUSH_Instruction extends TDInstruction");
PUSH_Instruction.prototype.constructor = PUSH_Instruction;
PUSH_Instruction.prototype.$class = 
   new Class("PUSH_Instruction", PUSH_Instruction);

PUSH_Instruction.prototype.parseIns = function(model, scanner) {
   var token = scanner.nextToken();
   model.setExtended(true);
   if (jslib.equalsIgnoreCase(token, "AC")) {
      model.storeValue(this.createTrap(model, TDC.PUSHAC));
   } else if (jslib.equalsIgnoreCase(token, "XR")) {
      model.storeValue(this.createTrap(model, TDC.PUSHXR));
   } else {
      scanner.saveToken(token);
      model.storeValue(this.parseStandardIns(model, scanner));
   }
};

PUSH_Instruction.prototype.executeIns = function(model, addr) {
   model.push(model.getMemory(addr));
};

var POP_Instruction = function() {
   TDInstruction.call(this);
};

POP_Instruction.prototype =
   jslib.inheritPrototype(TDInstruction, "POP_Instruction extends TDInstruction");
POP_Instruction.prototype.constructor = POP_Instruction;
POP_Instruction.prototype.$class = 
   new Class("POP_Instruction", POP_Instruction);

POP_Instruction.prototype.parseIns = function(model, scanner) {
   var token = scanner.nextToken();
   model.setExtended(true);
   if (jslib.equalsIgnoreCase(token, "AC")) {
      model.storeValue(this.createTrap(model, TDC.POPAC));
   } else if (jslib.equalsIgnoreCase(token, "XR")) {
      model.storeValue(this.createTrap(model, TDC.POPXR));
   } else {
      scanner.saveToken(token);
      model.storeValue(this.parseStandardIns(model, scanner));
   }
};

POP_Instruction.prototype.executeIns = function(model, addr) {
   model.setMemory(addr, model.pop());
};

var ExtendedInstruction = function() {
   TDInstruction.call(this);
};

ExtendedInstruction.prototype =
   jslib.inheritPrototype(TDInstruction, "ExtendedInstruction extends TDInstruction");
ExtendedInstruction.prototype.constructor = ExtendedInstruction;
ExtendedInstruction.prototype.$class = 
   new Class("ExtendedInstruction", ExtendedInstruction);

ExtendedInstruction.prototype.parseIns = function(model, scanner) {
   if (model.getBase() === 16) {
      var xx = (toInt((this.opcode / 10))<< 4) | (this.opcode % 10);
      model.storeValue((TDC.TRAPX << 4 * model.getAddressSize()) | xx);
   } else {
      model.storeValue(-this.opcode);
   }
};

var TwoWordInstruction = function() {
   TDInstruction.call(this);
};

TwoWordInstruction.prototype =
   jslib.inheritPrototype(TDInstruction, "TwoWordInstruction extends TDInstruction");
TwoWordInstruction.prototype.constructor = TwoWordInstruction;
TwoWordInstruction.prototype.$class = 
   new Class("TwoWordInstruction", TwoWordInstruction);

TwoWordInstruction.prototype.parseIns = function(model, scanner) {
   if (model.getBase() === 16) {
      var xx = (toInt((this.opcode / 10))<< 4) | (this.opcode % 10);
      model.storeValue((TDC.TRAPX << 4 * model.getAddressSize()) | xx);
   } else {
      model.storeValue(-this.opcode);
   }
   var token = scanner.nextToken();
   var addr = 0;
   if (!(jslib.equals(token, "") || jslib.equalsIgnoreCase(token, "AC"))) {
      scanner.saveToken(token);
      addr = model.scanAddressField(scanner);
   }
   model.storeValue(addr);
};

var LOADXR_Instruction = function() {
   ExtendedInstruction.call(this);
};

LOADXR_Instruction.prototype =
   jslib.inheritPrototype(ExtendedInstruction, "LOADXR_Instruction extends ExtendedInstruction");
LOADXR_Instruction.prototype.constructor = LOADXR_Instruction;
LOADXR_Instruction.prototype.$class = 
   new Class("LOADXR_Instruction", LOADXR_Instruction);

LOADXR_Instruction.prototype.executeIns = function(model, addr) {
   model.setAC(model.getXR());
};

var LOADSP_Instruction = function() {
   ExtendedInstruction.call(this);
};

LOADSP_Instruction.prototype =
   jslib.inheritPrototype(ExtendedInstruction, "LOADSP_Instruction extends ExtendedInstruction");
LOADSP_Instruction.prototype.constructor = LOADSP_Instruction;
LOADSP_Instruction.prototype.$class = 
   new Class("LOADSP_Instruction", LOADSP_Instruction);

LOADSP_Instruction.prototype.executeIns = function(model, addr) {
   model.setAC(model.getSP());
};

var LOADXAC_Instruction = function() {
   ExtendedInstruction.call(this);
};

LOADXAC_Instruction.prototype =
   jslib.inheritPrototype(ExtendedInstruction, "LOADXAC_Instruction extends ExtendedInstruction");
LOADXAC_Instruction.prototype.constructor = LOADXAC_Instruction;
LOADXAC_Instruction.prototype.$class = 
   new Class("LOADXAC_Instruction", LOADXAC_Instruction);

LOADXAC_Instruction.prototype.executeIns = function(model, addr) {
   model.setXR(model.getAC());
};

var LOADXSP_Instruction = function() {
   ExtendedInstruction.call(this);
};

LOADXSP_Instruction.prototype =
   jslib.inheritPrototype(ExtendedInstruction, "LOADXSP_Instruction extends ExtendedInstruction");
LOADXSP_Instruction.prototype.constructor = LOADXSP_Instruction;
LOADXSP_Instruction.prototype.$class = 
   new Class("LOADXSP_Instruction", LOADXSP_Instruction);

LOADXSP_Instruction.prototype.executeIns = function(model, addr) {
   model.setXR(model.getSP());
};

var INCX_Instruction = function() {
   ExtendedInstruction.call(this);
};

INCX_Instruction.prototype =
   jslib.inheritPrototype(ExtendedInstruction, "INCX_Instruction extends ExtendedInstruction");
INCX_Instruction.prototype.constructor = INCX_Instruction;
INCX_Instruction.prototype.$class = 
   new Class("INCX_Instruction", INCX_Instruction);

INCX_Instruction.prototype.executeIns = function(model, addr) {
   model.setXR(model.getXR() + 1);
};

var DECX_Instruction = function() {
   ExtendedInstruction.call(this);
};

DECX_Instruction.prototype =
   jslib.inheritPrototype(ExtendedInstruction, "DECX_Instruction extends ExtendedInstruction");
DECX_Instruction.prototype.constructor = DECX_Instruction;
DECX_Instruction.prototype.$class = 
   new Class("DECX_Instruction", DECX_Instruction);

DECX_Instruction.prototype.executeIns = function(model, addr) {
   model.setXR(model.getXR() - 1);
};

var PUSHAC_Instruction = function() {
   ExtendedInstruction.call(this);
};

PUSHAC_Instruction.prototype =
   jslib.inheritPrototype(ExtendedInstruction, "PUSHAC_Instruction extends ExtendedInstruction");
PUSHAC_Instruction.prototype.constructor = PUSHAC_Instruction;
PUSHAC_Instruction.prototype.$class = 
   new Class("PUSHAC_Instruction", PUSHAC_Instruction);

PUSHAC_Instruction.prototype.executeIns = function(model, addr) {
   model.push(model.getAC());
};

var POPAC_Instruction = function() {
   ExtendedInstruction.call(this);
};

POPAC_Instruction.prototype =
   jslib.inheritPrototype(ExtendedInstruction, "POPAC_Instruction extends ExtendedInstruction");
POPAC_Instruction.prototype.constructor = POPAC_Instruction;
POPAC_Instruction.prototype.$class = 
   new Class("POPAC_Instruction", POPAC_Instruction);

POPAC_Instruction.prototype.executeIns = function(model, addr) {
   model.setAC(model.pop());
};

var PUSHXR_Instruction = function() {
   ExtendedInstruction.call(this);
};

PUSHXR_Instruction.prototype =
   jslib.inheritPrototype(ExtendedInstruction, "PUSHXR_Instruction extends ExtendedInstruction");
PUSHXR_Instruction.prototype.constructor = PUSHXR_Instruction;
PUSHXR_Instruction.prototype.$class = 
   new Class("PUSHXR_Instruction", PUSHXR_Instruction);

PUSHXR_Instruction.prototype.executeIns = function(model, addr) {
   model.push(model.getXR());
};

var POPXR_Instruction = function() {
   ExtendedInstruction.call(this);
};

POPXR_Instruction.prototype =
   jslib.inheritPrototype(ExtendedInstruction, "POPXR_Instruction extends ExtendedInstruction");
POPXR_Instruction.prototype.constructor = POPXR_Instruction;
POPXR_Instruction.prototype.$class = 
   new Class("POPXR_Instruction", POPXR_Instruction);

POPXR_Instruction.prototype.executeIns = function(model, addr) {
   model.setXR(model.pop());
};

var MUL_Instruction = function() {
   TwoWordInstruction.call(this);
};

MUL_Instruction.prototype =
   jslib.inheritPrototype(TwoWordInstruction, "MUL_Instruction extends TwoWordInstruction");
MUL_Instruction.prototype.constructor = MUL_Instruction;
MUL_Instruction.prototype.$class = 
   new Class("MUL_Instruction", MUL_Instruction);

MUL_Instruction.prototype.executeIns = function(model, addr) {
   addr = model.getMemory(model.getPC());
   model.setPC(model.getPC() + 1);
   model.setAC(model.getAC() * model.getMemory(addr));
};

var DIV_Instruction = function() {
   TwoWordInstruction.call(this);
};

DIV_Instruction.prototype =
   jslib.inheritPrototype(TwoWordInstruction, "DIV_Instruction extends TwoWordInstruction");
DIV_Instruction.prototype.constructor = DIV_Instruction;
DIV_Instruction.prototype.$class = 
   new Class("DIV_Instruction", DIV_Instruction);

DIV_Instruction.prototype.executeIns = function(model, addr) {
   addr = model.getMemory(model.getPC());
   model.setPC(model.getPC() + 1);
   model.setAC(toInt((model.getAC() / model.getMemory(addr))));
};

var REM_Instruction = function() {
   TwoWordInstruction.call(this);
};

REM_Instruction.prototype =
   jslib.inheritPrototype(TwoWordInstruction, "REM_Instruction extends TwoWordInstruction");
REM_Instruction.prototype.constructor = REM_Instruction;
REM_Instruction.prototype.$class = 
   new Class("REM_Instruction", REM_Instruction);

REM_Instruction.prototype.executeIns = function(model, addr) {
   addr = model.getMemory(model.getPC());
   model.setPC(model.getPC() + 1);
   model.setAC(toInt((model.getAC() % model.getMemory(addr))));
};

var ADDSTK_Instruction = function() {
   ExtendedInstruction.call(this);
};

ADDSTK_Instruction.prototype =
   jslib.inheritPrototype(ExtendedInstruction, "ADDSTK_Instruction extends ExtendedInstruction");
ADDSTK_Instruction.prototype.constructor = ADDSTK_Instruction;
ADDSTK_Instruction.prototype.$class = 
   new Class("ADDSTK_Instruction", ADDSTK_Instruction);

ADDSTK_Instruction.prototype.executeIns = function(model, addr) {
   var rhs = model.pop();
   var lhs = model.pop();
   model.push(lhs + rhs);
};

var SUBSTK_Instruction = function() {
   ExtendedInstruction.call(this);
};

SUBSTK_Instruction.prototype =
   jslib.inheritPrototype(ExtendedInstruction, "SUBSTK_Instruction extends ExtendedInstruction");
SUBSTK_Instruction.prototype.constructor = SUBSTK_Instruction;
SUBSTK_Instruction.prototype.$class = 
   new Class("SUBSTK_Instruction", SUBSTK_Instruction);

SUBSTK_Instruction.prototype.executeIns = function(model, addr) {
   var rhs = model.pop();
   var lhs = model.pop();
   model.push(lhs - rhs);
};

var MULSTK_Instruction = function() {
   ExtendedInstruction.call(this);
};

MULSTK_Instruction.prototype =
   jslib.inheritPrototype(ExtendedInstruction, "MULSTK_Instruction extends ExtendedInstruction");
MULSTK_Instruction.prototype.constructor = MULSTK_Instruction;
MULSTK_Instruction.prototype.$class = 
   new Class("MULSTK_Instruction", MULSTK_Instruction);

MULSTK_Instruction.prototype.executeIns = function(model, addr) {
   var rhs = model.pop();
   var lhs = model.pop();
   model.push(lhs * rhs);
};

var DIVSTK_Instruction = function() {
   ExtendedInstruction.call(this);
};

DIVSTK_Instruction.prototype =
   jslib.inheritPrototype(ExtendedInstruction, "DIVSTK_Instruction extends ExtendedInstruction");
DIVSTK_Instruction.prototype.constructor = DIVSTK_Instruction;
DIVSTK_Instruction.prototype.$class = 
   new Class("DIVSTK_Instruction", DIVSTK_Instruction);

DIVSTK_Instruction.prototype.executeIns = function(model, addr) {
   var rhs = model.pop();
   if (rhs === 0) throw new RuntimeException("Division by zero");
   var lhs = model.pop();
   model.push(toInt((lhs / rhs)));
};

var REMSTK_Instruction = function() {
   ExtendedInstruction.call(this);
};

REMSTK_Instruction.prototype =
   jslib.inheritPrototype(ExtendedInstruction, "REMSTK_Instruction extends ExtendedInstruction");
REMSTK_Instruction.prototype.constructor = REMSTK_Instruction;
REMSTK_Instruction.prototype.$class = 
   new Class("REMSTK_Instruction", REMSTK_Instruction);

REMSTK_Instruction.prototype.executeIns = function(model, addr) {
   var rhs = model.pop();
   if (rhs === 0) throw new RuntimeException("Division by zero");
   var lhs = model.pop();
   model.push(lhs % rhs);
};

var INPUTX_Instruction = function() {
   TwoWordInstruction.call(this);
};

INPUTX_Instruction.prototype =
   jslib.inheritPrototype(TwoWordInstruction, "INPUTX_Instruction extends TwoWordInstruction");
INPUTX_Instruction.prototype.constructor = INPUTX_Instruction;
INPUTX_Instruction.prototype.$class = 
   new Class("INPUTX_Instruction", INPUTX_Instruction);

INPUTX_Instruction.prototype.executeIns = function(model, addr) {
   addr = model.getMemory(model.getPC());
   model.setPC(model.getPC() + 1);
   model.waitForInput(TDC.INPUT, addr);
};

var OUTPUTX_Instruction = function() {
   TwoWordInstruction.call(this);
};

OUTPUTX_Instruction.prototype =
   jslib.inheritPrototype(TwoWordInstruction, "OUTPUTX_Instruction extends TwoWordInstruction");
OUTPUTX_Instruction.prototype.constructor = OUTPUTX_Instruction;
OUTPUTX_Instruction.prototype.$class = 
   new Class("OUTPUTX_Instruction", OUTPUTX_Instruction);

OUTPUTX_Instruction.prototype.executeIns = function(model, addr) {
   addr = model.getMemory(model.getPC());
   model.setPC(model.getPC() + 1);
   var value = (addr === 0) ? model.getAC() : model.getMemory(addr);
   if (model.getBase() === 16) {
      if ((value & (model.getMemorySize() << 3)) !== 0) {
         value -= (model.getMemorySize() << 4);
      }
   }
   model.getConsole().println(value);
};

var INCHARX_Instruction = function() {
   TwoWordInstruction.call(this);
};

INCHARX_Instruction.prototype =
   jslib.inheritPrototype(TwoWordInstruction, "INCHARX_Instruction extends TwoWordInstruction");
INCHARX_Instruction.prototype.constructor = INCHARX_Instruction;
INCHARX_Instruction.prototype.$class = 
   new Class("INCHARX_Instruction", INCHARX_Instruction);

INCHARX_Instruction.prototype.executeIns = function(model, addr) {
   addr = model.getMemory(model.getPC());
   model.setPC(model.getPC() + 1);
   model.waitForInput(TDC.INCHAR, addr);
};

var OUTCHARX_Instruction = function() {
   TwoWordInstruction.call(this);
};

OUTCHARX_Instruction.prototype =
   jslib.inheritPrototype(TwoWordInstruction, "OUTCHARX_Instruction extends TwoWordInstruction");
OUTCHARX_Instruction.prototype.constructor = OUTCHARX_Instruction;
OUTCHARX_Instruction.prototype.$class = 
   new Class("OUTCHARX_Instruction", OUTCHARX_Instruction);

OUTCHARX_Instruction.prototype.executeIns = function(model, addr) {
   addr = model.getMemory(model.getPC());
   model.setPC(model.getPC() + 1);
   var value = (addr === 0) ? model.getAC() : model.getMemory(addr);
   if (model.getBase() === 16) {
      if ((value & (model.getMemorySize() << 3)) !== 0) {
         value -= (model.getMemorySize() << 4);
      }
   }
   model.getConsole().print(toStr(value));
};


/* TDInterpreter.js */

var TDInterpreter = function(console) {
   this.console = console;
   this.model = new TDModel();
   this.model.setConsole(console);
   this.model.addChangeListener(this);
   if (console.isSwingComponent()) {
      this.cl = null;
      console.addActionListener(new TDCommandListener(this, this.cl));
   } else {
      this.cl = new TDCommandLoop(this, console);
   }
   this.inputState = this.model.getControllerState();
};

TDInterpreter.prototype.run = function() {
   if (this.cl !== null) this.cl.start();
};

TDInterpreter.prototype.getCommandLoop = function() {
   return this.cl;
};

TDInterpreter.prototype.getConsole = function() {
   return this.console;
};

TDInterpreter.prototype.getModel = function() {
   return this.model;
};

TDInterpreter.prototype.getInputState = function() {
   return this.inputState;
};

TDInterpreter.prototype.setInputState = function(state) {
   this.inputState = state;
};

TDInterpreter.prototype.stateChanged = function(e) {
   var ns = this.model.getControllerState();
   switch (this.inputState) {
    case Controller.RUNNING:
    case Controller.STEPPING:
    case Controller.CALLING:
      if (ns === Controller.STOPPED) {
         if (this.cl !== null) this.cl.resume();
      }
   }
   if (ns === Controller.ERROR) {
      this.console.showErrorMessage("Error: " + this.model.getErrorMessage());
      this.model.setControllerState(Controller.INITIAL);
      if (this.cl !== null) this.cl.resume();
   }
};

TDInterpreter.prototype.load = function(filename, text) {
   this.model.load(text);
   if (this.cl !== null) this.cl.resume();
};


/* TDLayout.js */

var TDLayout = function() {
   /* Empty */
};

TDLayout.prototype.addLayoutComponent = function(name, comp) {
   if (jslib.equals(name, "background")) {
      this.bg = comp;
   } else if (jslib.equals(name, "controls")) {
      this.controls = comp;
   } else if (jslib.equals(name, "cpu")) {
      this.cpuView = comp;
   } else if (jslib.equals(name, "memory")) {
      this.memoryView = comp;
   } else if (jslib.equals(name, "editor")) {
      this.editor = comp;
   } else if (jslib.equals(name, "console")) {
      this.console = comp;
   } else {
      throw new RuntimeException("Illegal component name: " + name);
   }
};

TDLayout.prototype.removeLayoutComponent = function(comp) {
   /* Empty */
};

TDLayout.prototype.preferredLayoutSize = function(target) {
   return new Dimension(TDC.PREFERRED_WIDTH, TDC.PREFERRED_HEIGHT);
};

TDLayout.prototype.minimumLayoutSize = function(target) {
   return new Dimension(TDC.MINIMUM_WIDTH, TDC.MINIMUM_HEIGHT);
};

TDLayout.prototype.layoutContainer = function(target) {
   if (target.getTreeLock()) {
      var insets = target.getInsets();
      var bounds = target.getBounds();
      var x0 = bounds.x + insets.left;
      var y0 = bounds.y + insets.top;
      var width = bounds.width - insets.left - insets.right;
      var height = bounds.height - insets.top - insets.bottom;
      var cellWidth = TDC.SIGN_WIDTH + 3 * TDC.DIGIT_WIDTH;
      var memoryWidth = TDC.ROW_HEADER_WIDTH + 10 * cellWidth + 1;
      var memoryHeight = TDC.COLUMN_HEADER_HEIGHT + 10 * TDC.CELL_HEIGHT +
      JSPlatform.getScrollBarWidth();
      if (this.bg !== null) this.bg.setBounds(x0, y0, width, height);
      if (this.memoryView !== null) {
         var x = x0 + TDC.OUTER_MARGIN + TDC.CPU_WIDTH;
         var y = y0 + TDC.OUTER_MARGIN;
         this.memoryView.setBounds(x, y, memoryWidth, memoryHeight);
      }
      if (this.cpuView !== null) {
         var x = x0 + TDC.OUTER_MARGIN;
         var y = y0 + TDC.OUTER_MARGIN;
         this.cpuView.setBounds(x, y, TDC.CPU_WIDTH, TDC.CPU_HEIGHT);
      }
      if (this.console !== null) {
         var x = x0 + TDC.OUTER_MARGIN;
         var y = y0 + TDC.OUTER_MARGIN + memoryHeight + TDC.INNER_SEP;
         var w = memoryWidth + TDC.CPU_WIDTH;
         var h = height - 2 * TDC.OUTER_MARGIN - memoryHeight -
         TDC.CONTROL_HEIGHT - TDC.INNER_SEP;
         this.console.setBounds(x, y, w, h);
      }
      if (this.editor !== null) {
         var x = x0 + TDC.OUTER_MARGIN + TDC.CPU_WIDTH + memoryWidth +
         TDC.INNER_SEP;
         var y = y0 + TDC.OUTER_MARGIN;
         var w = width - (x - insets.left) - TDC.OUTER_MARGIN;
         var h = height - 2 * TDC.OUTER_MARGIN;
         this.editor.setBounds(x, y, w, h);
      }
      if (this.controls !== null) {
         var pSize = this.controls.getPreferredSize();
         var x = x0 +
         toInt(((memoryWidth + TDC.CPU_WIDTH - pSize.width) / 2));
         var y = y0 + height - TDC.CONTROL_HEIGHT;
         this.controls.setBounds(x, y, pSize.width, pSize.height);
      }
   }
};


/* TDMemoryView.js */

var TDMemoryView = function(model) {
   JSPanel.call(this);
   this.model = model;
   this.setLayout(new BorderLayout());
   this.memoryCanvas = new TDMemoryCanvas(model);
   this.scrollPane =
   new JSScrollPane(this.memoryCanvas, JScrollPane.VERTICAL_SCROLLBAR_NEVER, JScrollPane.HORIZONTAL_SCROLLBAR_AS_NEEDED);
   this.scrollPane.setBorder(BorderFactory.createEmptyBorder());
   this.scrollPane.setOpaque(false);
   var columnHeader = new TDColumnHeader(this);
   var rowHeader = new TDRowHeader(this);
   this.add(columnHeader, BorderLayout.NORTH);
   this.add(rowHeader, BorderLayout.WEST);
   this.add(this.scrollPane, BorderLayout.CENTER);
};

TDMemoryView.prototype = 
   jslib.inheritPrototype(JSPanel, "TDMemoryView extends JSPanel");
TDMemoryView.prototype.constructor = TDMemoryView;
TDMemoryView.prototype.$class = 
   new Class("TDMemoryView", TDMemoryView);

TDMemoryView.prototype.getModel = function() {
   return this.model;
};

TDMemoryView.prototype.getScrollPane = function() {
   return this.scrollPane;
};

TDMemoryView.prototype.ensureVisible = function(addr) {
   // Fill in
};

TDMemoryView.prototype.stateChanged = function(e) {
   if (this.model.getParameterChangeFlag()) {
      this.memoryCanvas.revalidate();
      this.model.setParameterChangeFlag(false);
   }
   this.repaint();
};

var TDMemoryCanvas = function(model) {
   TDViewCanvas.call(this);
   this.model = model;
   this.setBackground(TDC.APPLICATION_BACKGROUND);
   var x = 0;
   var y = 0;
   var width = 0;
   var height = 0;
   for (var addr = 0; addr < 100; addr++) {
      var mc = new TDMemoryCellView(model, addr, x, y);
      this.add(mc);
      if (addr === 0) {
         width = mc.getBounds().width;
         height = mc.getBounds().height;
      }
      if ((addr + 1) % 10 === 0) {
         x += width;
         y = 0;
      } else {
         y += height;
      }
   }
};

TDMemoryCanvas.prototype = 
   jslib.inheritPrototype(TDViewCanvas, "TDMemoryCanvas extends TDViewCanvas");
TDMemoryCanvas.prototype.constructor = TDMemoryCanvas;
TDMemoryCanvas.prototype.$class = 
   new Class("TDMemoryCanvas", TDMemoryCanvas);

TDMemoryCanvas.prototype.getPreferredSize = function() {
   var cellWidth = TDC.SIGN_WIDTH + this.model.getWordSize() * TDC.DIGIT_WIDTH;
   var width = toInt((this.model.getMemorySize() / 10))* cellWidth;
   var height = 10 * TDC.CELL_HEIGHT;
   return new Dimension(width, height);
};

TDMemoryCanvas.prototype.paintComponent = function(g) {
   this.drawCells(g);
};

var TDMemoryCellView = function(model, offset, x, y) {
   TDCellView.call(this);
   this.model = model;
   this.offset = offset;
   var width = model.getWordSize() * TDC.DIGIT_WIDTH;
   if (model.getBase() === 10) width += TDC.SIGN_WIDTH;
   this.setBounds(x, y, width, TDC.CELL_HEIGHT);
};

TDMemoryCellView.prototype = 
   jslib.inheritPrototype(TDCellView, "TDMemoryCellView extends TDCellView");
TDMemoryCellView.prototype.constructor = TDMemoryCellView;
TDMemoryCellView.prototype.$class = 
   new Class("TDMemoryCellView", TDMemoryCellView);

TDMemoryCellView.prototype.getContents = function() {
   return this.model.digitString(this.model.getMemory(this.offset), -this.model.getWordSize());
};

TDMemoryCellView.prototype.draw = function(g) {
   if (this.offset === 0) {
      var r = this.getBounds();
      g.setColor(TDC.CELL0_BACKGROUND);
      g.fillRect(r.x, r.y, r.width, r.height);
      g.setColor(Color.BLACK);
      g.drawRect(r.x, r.y, r.width, r.height);
   } else {
      this.drawStandardCell(g);
   }
};

var TDColumnHeader = function(memoryView) {
   JSCanvas.call(this);
   this.memoryView = memoryView;
   this.model = memoryView.getModel();
};

TDColumnHeader.prototype = 
   jslib.inheritPrototype(JSCanvas, "TDColumnHeader extends JSCanvas");
TDColumnHeader.prototype.constructor = TDColumnHeader;
TDColumnHeader.prototype.$class = 
   new Class("TDColumnHeader", TDColumnHeader);

TDColumnHeader.prototype.getPreferredSize = function() {
   var pSize = this.memoryView.getScrollPane().getPreferredSize();
   return new Dimension(TDC.ROW_HEADER_WIDTH + pSize.width, TDC.COLUMN_HEADER_HEIGHT);
};

TDColumnHeader.prototype.paintComponent = function(g) {
   var size = this.getSize();
   if (size.width === 0 || size.height === 0) return;
   g.setColor(TDC.APPLICATION_BACKGROUND);
   g.fillRect(0, 0, size.width, size.height);
   g.setColor(Color.BLACK);
   var memorySize = this.model.getMemorySize();
   var cellWidth = TDC.SIGN_WIDTH + this.model.getWordSize() * TDC.DIGIT_WIDTH;
   g.setFont(TDC.ADDRESS_ITALIC);
   var suffixWidth = g.getFontMetrics().stringWidth("x");
   g.setFont(TDC.ADDRESS_FONT);
   var fm = g.getFontMetrics();
   var y = size.height - fm.getHeight() + fm.getAscent();
   for (var base = 0; base < memorySize; base += 10) {
      var prefix = "" + toInt((base / 10));
      var prefixWidth = fm.stringWidth(prefix);
      var x = TDC.ROW_HEADER_WIDTH + toInt((base / 10))* cellWidth +
      toInt(((cellWidth - prefixWidth - suffixWidth) / 2));
      g.setFont(TDC.ADDRESS_FONT);
      g.drawString(prefix, x, y);
      g.setFont(TDC.ADDRESS_ITALIC);
      g.drawString("x", x + prefixWidth, y);
   }
};

TDColumnHeader.prototype.adjustmentValueChanged = function(e) {
   this.repaint();
};

var TDRowHeader = function(memoryView) {
   JSCanvas.call(this);
   /* Empty */
};

TDRowHeader.prototype = 
   jslib.inheritPrototype(JSCanvas, "TDRowHeader extends JSCanvas");
TDRowHeader.prototype.constructor = TDRowHeader;
TDRowHeader.prototype.$class = 
   new Class("TDRowHeader", TDRowHeader);

TDRowHeader.prototype.getPreferredSize = function() {
   return new Dimension(TDC.ROW_HEADER_WIDTH, 1);
};

TDRowHeader.prototype.paintComponent = function(g) {
   var size = this.getSize();
   g.setColor(TDC.APPLICATION_BACKGROUND);
   g.fillRect(0, 0, size.width, size.height);
   g.setColor(Color.BLACK);
   g.setFont(TDC.ADDRESS_FONT);
   var fm = g.getFontMetrics();
   var x = size.width + TDC.LABEL_DX - fm.stringWidth("0");
   var dy = toInt(((TDC.CELL_HEIGHT + fm.getAscent()) / 2))+
   TDC.BASELINE_DY;
   for (var i = 0; i < 10; i++) {
      var str = "" + i;
      var y = i * TDC.CELL_HEIGHT + dy;
      g.drawString(str, x, y);
   }
};


/* TDModel.js */

var TDModel = function() {
   Controller.call(this);
   this.setBase(TDC.DEFAULT_BASE);
   this.setAddressSize(TDC.DEFAULT_ADDRESS_SIZE);
   this.setTarget(this);
   this.traceFlag = false;
   this.symtab = new HashMap();
   this.unresolved = new HashMap();
   this.constants = new HashSet();
   this.editor = null;
   this.clear();
};

TDModel.prototype = 
   jslib.inheritPrototype(Controller, "TDModel extends Controller");
TDModel.prototype.constructor = TDModel;
TDModel.prototype.$class = 
   new Class("TDModel", TDModel);

TDModel.prototype.setConsole = function(nbc) {
   this.console = nbc;
};

TDModel.prototype.getConsole = function() {
   return this.console;
};

TDModel.prototype.setEditor = function(editor) {
   this.editor = editor;
   editor.addChangeListener(new TDEditorChangeListener(this));
};

TDModel.prototype.getEditor = function() {
   return this.editor;
};

TDModel.prototype.setChangeFlag = function(flag) {
   this.changeFlag = flag;
};

TDModel.prototype.getChangeFlag = function() {
   return this.changeFlag;
};

TDModel.prototype.setParameterChangeFlag = function(flag) {
   this.parameterChangeFlag = flag;
};

TDModel.prototype.getParameterChangeFlag = function() {
   return this.parameterChangeFlag;
};

TDModel.prototype.setTraceFlag = function(flag) {
   this.traceFlag = flag;
};

TDModel.prototype.getTraceFlag = function() {
   return this.traceFlag;
};

TDModel.prototype.setExtended = function(flag) {
   this.extended = flag;
};

TDModel.prototype.isExtended = function() {
   return this.extended;
};

TDModel.prototype.clear = function() {
   this.memorySize = 1;
   for (var i = 0; i < this.addressSize; i++) {
      this.memorySize *= this.base;
   }
   this.memory = jslib.newArray(this.memorySize);
   for (var i = 0; i < this.memorySize; i++) {
      this.memory[i] = 0;
   }
   this.dot = 1;
   this.symtab.clear();
   this.unresolved.clear();
   this.constants.clear();
   if (this.editor !== null) {
      this.editor.clearLineTable();
      this.editor.removeAllBreakpoints();
   }
   this.changeFlag = true;
   this.reset();
};

TDModel.prototype.clearRegisters = function() {
   this.ac = 0;
   this.pc = 0;
   this.xr = 0;
   this.ir = 0;
   this.sp = 0;
};

TDModel.prototype.reset = function() {
   this.clearRegisters();
   this.inputBuffer = "";
   this.setControllerState(Controller.INITIAL);
   this.update();
};

TDModel.prototype.getBase = function() {
   return this.base;
};

TDModel.prototype.setBase = function(radix) {
   if (radix !== 10 && radix !== 16) {
      throw new RuntimeException("setBase: Radix must be 10 or 16");
   }
   this.base = radix;
   this.parameterChangeFlag = true;
};

TDModel.prototype.getAddressSize = function() {
   return this.addressSize;
};

TDModel.prototype.getWordSize = function() {
   return this.wordSize;
};

TDModel.prototype.setAddressSize = function(nDigits) {
   this.addressSize = nDigits;
   this.wordSize = nDigits + 1;
   this.parameterChangeFlag = true;
};

TDModel.prototype.getMemorySize = function() {
   return this.memorySize;
};

TDModel.prototype.digitString = function(value, nDigits) {
   if (this.base === 16) {
      nDigits = Math.abs(nDigits);
      value = value & ((1 << 4 * nDigits) - 1);
   }
   var sign = "";
   if (nDigits < 0) {
      sign = (value < 0) ? "-" : "+";
      nDigits = -nDigits;
   }
   value = Math.abs(value);
   var str = Integer.toString(value, this.base).toUpperCase();
   while (str.length < nDigits) {
      str = "0" + str;
   }
   if (str.length > nDigits && nDigits !== 0) {
      str = str.substring(str.length - nDigits);
   }
   return sign + str;
};

TDModel.prototype.getMemory = function(addr) {
   if (addr < 0) addr = this.memorySize - (-addr % this.memorySize);
   addr = addr % this.memorySize;
   if (addr === 0) {
      var msg = "getMemory: Illegal reference to address ";
      msg += this.digitString(0, this.addressSize);
      throw new RuntimeException(msg);
   }
   return this.memory[addr % this.memorySize];
};

TDModel.prototype.getAC = function() {
   return this.ac;
};

TDModel.prototype.getPC = function() {
   return this.pc;
};

TDModel.prototype.getIR = function() {
   return this.ir;
};

TDModel.prototype.createIns = function(op, addr) {
   if (this.base === 16) {
      return ((op & 0xF) << 4 * this.addressSize) | (addr & (this.memorySize - 1));
   } else {
      if (op < 0) {
         return -((-op % 10) * this.memorySize + (addr % this.memorySize));
      } else {
         return (op % 10) * this.memorySize + (addr % this.memorySize);
      }
   }
};

TDModel.prototype.getOperation = function(word) {
   if (this.base === 16) {
      return TDModel.HEX_OPS[(word >> 4 * this.addressSize) & 0xF];
   } else {
      if (word < 0) {
         var op = -toInt((-word / this.memorySize));
         return (op === 0) ? TDC.TRAP : op;
      } else {
         return toInt((word / this.memorySize));
      }
   }
};

TDModel.prototype.getAddress = function(word) {
   return Math.abs(word) % this.memorySize;
};

TDModel.prototype.getSP = function() {
   return this.sp;
};

TDModel.prototype.getXR = function() {
   return this.xr;
};

TDModel.prototype.startAction = function() {
   if (this.changeFlag) this.load(this.editor.getText());
   this.changeFlag = false;
   this.start(Controller.RUNNING);
};

TDModel.prototype.stepAction = function() {
   if (this.changeFlag) this.load(this.editor.getText());
   this.changeFlag = false;
   this.start(Controller.STEPPING);
};

TDModel.prototype.step = function() {
   var pcLine = this.editor.getSourceLineIndex(this.pc);
   if (this.pc === 0) {
      this.clearRegisters();
      this.pc = 1;
   } else {
      try {
         this.setIR(this.getMemory(this.pc));
         this.setPC(this.pc + 1);
         TDInstruction.execute(this, this.ir);
      } catch (ex) {
         this.editor.showErrorMessage(pcLine, "<html>" + RuntimeException.patchMessage(ex) + "</html>");
         this.setPC(0);
         this.editor.setCurrentLine(0);
         this.setControllerState(Controller.ERROR);
         this.update();
         return;
      }
   }
   var ci = (this.getControllerState() === Controller.WAITING) ? this.pc - 1 : this.pc;
   pcLine = this.editor.getSourceLineIndex(ci);
   if (this.pc > 0 && this.getSpeed() < 95) {
      this.editor.setCurrentLine(pcLine);
      this.setIR(this.getMemory(ci));
   } else {
      this.editor.setCurrentLine(0);
   }
   if (pcLine > 0 && this.editor.isBreakpoint(pcLine)) {
      this.editor.setCurrentLine(pcLine);
      this.setControllerState(Controller.STOPPED);
   }
   this.update();
   if (this.pc === 0) this.stopAction();
};

TDModel.prototype.isCallable = function() {
   return false;  // Make true sometime
};

TDModel.prototype.getStackDepth = function() {
   return 0;
};

TDModel.prototype.deliverInput = function(line) {
   if (this.inputMode === TDC.INPUT) {
      if (this.inputTarget === 0) {
         this.setAC(Integer.parseInt(line));
      } else {
         this.setMemory(this.inputTarget, Integer.parseInt(line));
      }
      this.inputBuffer = "";
   } else {
      this.inputBuffer = line + "\n";
      this.setAC(this.inputBuffer.charCodeAt(0));
      this.inputBuffer = this.inputBuffer.substring(1);
   }
   this.start(this.inputState);
   var pcLine = this.editor.getSourceLineIndex(this.pc);
   if (this.pc > 0 && this.getSpeed() < 95) {
      this.editor.setCurrentLine(pcLine);
      this.setIR(this.getMemory(this.pc));
   } else {
      this.editor.setCurrentLine(0);
   }
   if (pcLine > 0 && this.editor.isBreakpoint(pcLine)) {
      this.editor.setCurrentLine(pcLine);
      this.setControllerState(Controller.STOPPED);
   }
   this.update();
};

TDModel.createScanner = function() {
   var scanner = new TokenScanner();
   scanner.ignoreWhitespace();
   scanner.ignoreComments();
   scanner.scanStrings();
   scanner.addOperator("\n");
   return scanner;
};

TDModel.prototype.load = function(pgm) {
   var scanner = TDModel.createScanner();
   scanner.setInput(pgm);
   this.clear();
   this.assemble(scanner, true);
   this.resolveReferences();
};

TDModel.START = 0;
TDModel.AFTER_TERM = 1;
TDModel.AFTER_OP = 2;
TDModel.prototype.assemble = function(scanner, storeMarks) {
   var state = TDModel.START;
   var value = 0;
   var sign = 1;
   var lineNumber = 0;
   while (scanner.hasMoreTokens()) {
      var token = scanner.nextToken();
      scanner.saveToken(token);
      var lc = this.dot;
      if (state === TDModel.START) {
         value = 0;
         sign = 1;
         lineNumber = this.editor.getLineNumber(scanner.getPosition());
      }
      if (TDInstruction.parse(this, scanner)) {
         if (storeMarks) this.editor.setSourceLineIndex(lc, lineNumber);
      } else {
         token = scanner.nextToken();
         var type = scanner.getTokenType(token);
         if (type === TokenScanner.SEPARATOR) {
            if (state === TDModel.AFTER_OP) {
               throw new RuntimeException("Missing operand");
            }
            if (state === TDModel.AFTER_TERM) {
               if (storeMarks) this.editor.setSourceLineIndex(this.dot, lineNumber);
               this.storeValue(value);
            }
            state = TDModel.START;
         } else if (type === TokenScanner.OPERATOR) {
            if (jslib.equals(token, "-")) {
               sign = -1;
               state = TDModel.AFTER_OP;
            } else if (jslib.equals(token, "+")) {
               sign = 1;
               state = TDModel.AFTER_OP;
            } else if (jslib.equals(token, ".")) {
               token = scanner.nextToken();
               if (jslib.equals(token, "=")) {
                  this.dot = this.scanAddressField(scanner);
                  scanner.verifyToken("\n");
                  state = TDModel.START;
               } else {
                  if (state === TDModel.AFTER_TERM) {
                     var msg = "Unexpected token: " + token;
                     throw new RuntimeException(msg);
                  }
                  value = value + sign * this.dot;
                  state = TDModel.AFTER_TERM;
               }
            } else if (jslib.equals(token, "(")) {
               this.dot = this.scanAddressField(scanner);
               scanner.verifyToken(")");
               state = TDModel.START;
            } else if (jslib.equals(token, "#")) {
               var str = "#";
               while (true) {
                  var ch = toInt(scanner.getChar());
                  str += toStr(ch);
                  if (ch === toInt('\n')) break;
               }
               this.unresolved.put(this.dot, str);
               this.constants.add(str);
               state = TDModel.START;
            } else {
               throw new RuntimeException("Unexpected token " + token);
            }
         } else if (type === TokenScanner.STRING) {
            var str = scanner.getStringValue(token);
            if (token.charCodeAt(0) === toInt('"')) {
               for (var i = 0; i < str.length; i++) {
                  this.setMemory(this.dot++, str.charCodeAt(i) & 0xFF);
               }
               this.setMemory(this.dot++, 0);
               scanner.verifyToken("\n");
               state = TDModel.START;
            } else {
               if (str.length !== 1) {
                  throw new RuntimeException("Illegal character " + token);
               }
               if (state === TDModel.AFTER_TERM) {
                  throw new RuntimeException("Unexpected token: " + token);
               }
               value = value + sign * (str.charCodeAt(0) & 0xFF);
               state = TDModel.AFTER_TERM;
            }
         } else if (type === TokenScanner.NUMBER) {
            if (state === TDModel.AFTER_TERM) {
               throw new RuntimeException("Unexpected token: " + token);
            }
            scanner.saveToken(token);
            value = value + sign * this.scanValue(scanner);
            state = TDModel.AFTER_TERM;
         } else if (type === TokenScanner.WORD) {
            var nextToken = scanner.nextToken();
            if (jslib.equals(nextToken, ":") && state === TDModel.START) {
               this.symtab.put(token, this.dot);
            } else if (jslib.equals(nextToken, "=") && state === TDModel.START) {
               this.symtab.put(token, this.scanValue(scanner));
               scanner.verifyToken("\n");
            } else {
               scanner.saveToken(nextToken);
               if (this.symtab.containsKey(token)) {
                  if (state === TDModel.AFTER_TERM) {
                     var msg = "Unexpected token: " + token;
                     throw new RuntimeException(msg);
                  }
                  value = value + sign * this.symtab.get(token);
                  state = TDModel.AFTER_TERM;
               } else {
                  if (state === TDModel.AFTER_TERM) {
                     var msg = "Unexpected token: " + token;
                     throw new RuntimeException(msg);
                  }
                  if (sign !== 1) {
                     var msg = "Unexpected token: " + token;
                     throw new RuntimeException(msg);
                  }
                  this.unresolved.put(this.dot, token);
                  state = TDModel.AFTER_TERM;
               }
            }
         }
      }
   }
};

TDModel.prototype.scanAddressField = function(scanner) {
   var token = scanner.nextToken();
   var type = scanner.getTokenType(token);
   if (type === TokenScanner.NUMBER) {
      try {
         return Integer.parseInt(token, this.getBase());
      } catch (ex) {
         /* Empty */
      }
   } else if (type === TokenScanner.WORD) {
      if (this.symtab.containsKey(token)) return this.symtab.get(token);
      this.unresolved.put(this.dot, token);
      return 0;
   } else if (jslib.equals(token, "#")) {
      var str = "#";
      while (true) {
         var ch = toInt(scanner.getChar());
         str += toStr(ch);
         if (ch === toInt('\n')) break;
      }
      this.unresolved.put(this.dot, str);
      this.constants.add(str);
      return 0;
   }
   throw new RuntimeException("Illegal value: " + token);
};

TDModel.prototype.scanValue = function(scanner) {
   var token = scanner.nextToken();
   try {
      var sign = 1;
      if (jslib.equals(token, "-")) {
         sign = -1;
         token = scanner.nextToken();
      } else if (jslib.equals(token, "+")) {
         token = scanner.nextToken();
      }
      switch (scanner.getTokenType(token)) {
       case TokenScanner.NUMBER:
       case TokenScanner.WORD:
         return sign * Integer.parseInt(token, this.getBase());
      }
      throw new RuntimeException("Illegal value: " + token);
   } catch (ex) {
      throw new RuntimeException("Illegal value: " + ex);
   }
};

TDModel.prototype.storeValue = function(value) {
   if (this.dot >= this.memorySize) {
      throw new RuntimeException("Out of memory");
   }
   this.setMemory(this.dot++, value);
};

TDModel.prototype.resolveReferences = function() {
   var scanner = TDModel.createScanner();
   var el0 = new JSElementList(this.constants);
   for (var ei0 = 0; ei0 < el0.size(); ei0++) {
      var name = el0.get(ei0);
      scanner.setInput(name.substring(1));
      this.symtab.put(name, this.dot);
      this.assemble(scanner, false);
   }
   var el1 = new JSElementList(this.unresolved.keySet());
   for (var ei1 = 0; ei1 < el1.size(); ei1++) {
      var addr = el1.get(ei1);
      var id = this.unresolved.get(addr);
      if (this.symtab.containsKey(id)) {
         var sign = (this.memory[addr] < 0) ? -1 : 1;
         this.setMemory(addr, this.memory[addr] + sign * this.symtab.get(id));
      } else {
         this.console.showErrorMessage("Undefined symbol: " + id);
      }
   }
};

TDModel.prototype.setMemory = function(addr, value) {
   if (addr < 0) addr = this.memorySize - (-addr % this.memorySize);
   addr = addr % this.memorySize;
   if (addr === 0) {
      var msg = "setMemory: Illegal reference to address ";
      msg += this.digitString(0, this.addressSize);
      throw new RuntimeException(msg);
   }
   if (this.base === 16) {
      this.memory[addr] = value & (this.base * this.memorySize - 1);
   } else {
      if (value < 0) {
         this.memory[addr] = -(-value % (this.base * this.memorySize));
      } else {
         this.memory[addr] = value % (this.base * this.memorySize);
      }
   }
};

TDModel.prototype.setAC = function(value) {
   if (this.base === 16) {
      this.ac = value & (this.base * this.memorySize - 1);
   } else {
      if (value < 0) {
         this.ac = -(-value % (this.base * this.memorySize));
      } else {
         this.ac = value % (this.base * this.memorySize);
      }
   }
};

TDModel.prototype.setIR = function(value) {
   if (this.base === 16) {
      this.ir = value & (this.base * this.memorySize - 1);
   } else {
      if (value < 0) {
         this.ir = -(-value % (this.base * this.memorySize));
      } else {
         this.ir = value % (this.base * this.memorySize);
      }
   }
};

TDModel.prototype.setPC = function(value) {
   if (this.base === 16) {
      this.pc = value & (this.memorySize - 1);
   } else {
      if (value < 0) {
         this.pc = this.memorySize - (-value % this.memorySize);
      } else {
         this.pc = value % this.memorySize;
      }
   }
};

TDModel.prototype.setSP = function(value) {
   if (this.base === 16) {
      this.sp = value & (this.memorySize - 1);
   } else {
      if (value < 0) {
         this.sp = this.memorySize - (-value % this.memorySize);
      } else {
         this.sp = value % this.memorySize;
      }
   }
};

TDModel.prototype.setXR = function(value) {
   if (this.base === 16) {
      this.xr = value & (this.memorySize - 1);
   } else {
      if (value < 0) {
         this.xr = this.memorySize - (-value % this.memorySize);
      } else {
         this.xr = value % this.memorySize;
      }
   }
};

TDModel.prototype.waitForInput = function(op, addr) {
   if (op === TDC.INCHAR && this.inputBuffer.length > 0) {
      this.setAC(this.inputBuffer.charCodeAt(0));
      this.inputBuffer = this.inputBuffer.substring(1);
      return;
   }
   this.inputState = this.getControllerState();
   this.inputMode = op;
   this.inputTarget = addr;
   this.stop(Controller.WAITING);
   this.console.requestInput((op === TDC.INPUT) ? " ? " : "");
};

TDModel.prototype.push = function(value) {
   this.setSP(this.sp - 1);
   this.setMemory(this.sp, value);
};

TDModel.prototype.pop = function() {
   if (this.sp === 0) throw new RuntimeException("POP: Stack is empty");
   var value = this.getMemory(this.sp);
   this.setSP(this.sp + 1);
   return value;
};

TDModel.HEX_OPS = [
   0,
   TDC.LOAD,
   TDC.STORE,
   TDC.ADD,
   TDC.SUB,
   TDC.JUMP,
   TDC.JUMPZ,
   TDC.JUMPN,
   TDC.TRAP,
   TDC.POP,
   TDC.PUSH,
   TDC.CALL,
   TDC.XSTORE,
   TDC.XLOAD,
   TDC.STOREX,
   TDC.LOADX
];

var TDEditorChangeListener = function(model) {
   this.model = model;
};

TDEditorChangeListener.prototype.stateChanged = function(e) {
   this.model.setChangeFlag(true);
};


/* Toddler.js */

var Toddler = function() {
   JSProgram.call(this);
   this.createProgramFrame();
   JSFile.setCGIServer("http://web.stanford.edu/class/cs54n/cgi-bin");
   this.setTitle("Toddler");
   this.setBackground(TDC.APPLICATION_BACKGROUND);
   var layout = new TDLayout();
   this.setLayout(layout);
   this.console = this.createConsole();
   this.interpreter = new TDInterpreter(this.console);
   this.model = this.interpreter.getModel();
   this.editor = this.createEditor(this.model);
   this.model.setEditor(this.editor);
   this.cpuView = new TDCPUView(this.model);
   this.memoryView = new TDMemoryView(this.model);
   this.model.addChangeListener(this.cpuView);
   this.model.addChangeListener(this.memoryView);
   this.loadDialog = new JSLoadDialog(this.getFrame());
   this.loadDialog.addActionListener(new TDLoadDialogListener(this));
   this.saveDialog = new JSSaveDialog(this.getFrame());
   this.saveDialog.addActionListener(new TDSaveDialogListener(this));
   var consoleFrame = this.createFrame(this.console, "Console");
   var editorFrame = this.createFrame(this.editor, "Untitled");
   this.editor.setFrame(editorFrame);
   this.add(editorFrame, "editor");
   this.add(consoleFrame, "console");
   this.add(this.cpuView, "cpu");
   this.add(this.memoryView, "memory");
   this.createControlStrip();
   if (!JSProgram.isJavaScript()) {
      this.add(this.createBackground(), "background");
      this.setMinimumSize(this.getMinimumSize());
   }
   this.pack();
   this.model.update();
   this.setVisible(true);
};

Toddler.prototype = 
   jslib.inheritPrototype(JSProgram, "Toddler extends JSProgram");
Toddler.prototype.constructor = Toddler;
Toddler.prototype.$class = 
   new Class("Toddler", Toddler);

Toddler.prototype.run = function() {
   var home = new JSFile("cgi:" + this.getUID() + "/Toddler");
   this.loadDialog.setDirectory(home);
   this.saveDialog.setDirectory(home);
   this.console.clear();
   this.console.repaint();
   this.interpreter.run();
};

Toddler.prototype.getInterpreter = function() {
   return this.interpreter;
};

Toddler.prototype.getEditor = function() {
   return this.editor;
};

Toddler.prototype.actionPerformed = function(e) {
   var cmd = e.getActionCommand();
   if (jslib.equals(cmd, "Load")) {
      this.loadDialog.centerOnParent();
      this.loadDialog.setVisible(true);
   } else if (jslib.equals(cmd, "Save")) {
      var file = this.editor.getFile();
      if (file !== null) {
         file.write(this.editor.getText(), null);
      } else {
         this.saveDialog.centerOnParent();
         this.saveDialog.setVisible(true);
      }
   } else if (jslib.equals(cmd, "New")) {
      this.editor.setFile(null);
      this.editor.setText("");
      this.editor.clearLineTable();
      this.editor.repaint();
   } else if (jslib.equals(cmd, "Reset")) {
      this.model = this.interpreter.getModel();
      this.model.stopAction();
      this.model.clear();
      this.console.clear();
   }
};

Toddler.prototype.createFrame = function(component, title) {
   return new JSFrame(component, title);
};

Toddler.prototype.createEditor = function(model) {
   this.editor = new TDEditor(model);
   this.editor.setFont(TDC.EDITOR_FONT);
   return this.editor;
};

Toddler.prototype.createConsole = function() {
   this.console = new JSConsole();
   this.console.setFont(TDC.CONSOLE_FONT);
   return this.console;
};

Toddler.prototype.createBackground = function() {
   return new TDBackground();
};

Toddler.prototype.createControlStrip = function() {
   var newControl = new NewControl();
   newControl.addActionListener(this);
   this.model.addControl(newControl);
   this.addControl(newControl);
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

Toddler.main = function(args) {
   var pgm = new Toddler();
   pgm.startAfterLogin(pgm.getFrame());
};

var TDLoadDialogListener = function(pgm) {
   this.pgm = pgm;
};

TDLoadDialogListener.prototype.actionPerformed = function(e) {
   if (e instanceof JSErrorEvent) {
      // Fill in
   } else {
      var path = e.getActionCommand();
      if (path !== null && path.length !== 0) {
         new JSFile(path).read(new TDLoadFileListener(this.pgm, path));
      }
   }
};

var TDLoadFileListener = function(pgm, path) {
   this.pgm = pgm;
   this.path = path;
};

TDLoadFileListener.prototype.actionPerformed = function(e) {
   var editor = this.pgm.getEditor();
   editor.removeAllBreakpoints();
   editor.setText(e.getActionCommand());
   editor.setCursorPosition(0);
   var frame = editor.getFrame();
   if (frame !== null) frame.setTitle(JSFile.getTail(this.path));
};

var TDSaveDialogListener = function(pgm) {
   this.pgm = pgm;
};

TDSaveDialogListener.prototype.actionPerformed = function(e) {
   if (e instanceof JSErrorEvent) {
      // Fill in
   } else {
      var path = e.getActionCommand();
      if (path !== null && path.length !== 0) {
         var editor = this.pgm.getEditor();
         var text = editor.getText();
         new JSFile(path).write(text, new TDSaveFileListener(this.pgm, path));
      }
   }
};

var TDSaveFileListener = function(pgm, path) {
   this.pgm = pgm;
   this.path = path;
};

TDSaveFileListener.prototype.actionPerformed = function(e) {
   var editor = this.pgm.getEditor();
   var frame = editor.getFrame();
   if (frame !== null) frame.setTitle(JSFile.getTail(this.path));
};

var TDBackground = function() {
   JSCanvas.call(this);
};

TDBackground.prototype =
   jslib.inheritPrototype(JSCanvas, "TDBackground extends JSCanvas");
TDBackground.prototype.constructor = TDBackground;
TDBackground.prototype.$class = 
   new Class("TDBackground", TDBackground);

TDBackground.prototype.paintComponent = function(g) {
   var size = this.getSize();
   g.setColor(TDC.APPLICATION_BACKGROUND);
   g.fillRect(0, 0, size.width, size.height);
};

TDBackground.prototype = 
   jslib.inheritPrototype(JSCanvas, "TDBackground extends JSCanvas");
TDBackground.prototype.constructor = TDBackground;
TDBackground.prototype.$class = 
   new Class("TDBackground", TDBackground);


/* Exports */

return {
   TDC : TDC,
   TDCPUView : TDCPUView,
   TDCommandListener : TDCommandListener,
   TDCommandLoop : TDCommandLoop,
   TDEditor : TDEditor,
   TDInstruction : TDInstruction,
   TDInterpreter : TDInterpreter,
   TDLayout : TDLayout,
   TDMemoryView : TDMemoryView,
   TDModel : TDModel,
   Toddler : Toddler
};

});
