/*
 * File: svm.js
 * Created on Mon Feb 08 21:55:09 PST 2016 by java2js
 * --------------------------------------------------
 * This file was generated mechanically by the java2js utility.
 * Permanent edits must be made in the Java file.
 */

define([ "jslib",
         "edu/stanford/cs/controller",
         "edu/stanford/cs/exp",
         "edu/stanford/cs/java2js",
         "edu/stanford/cs/jsconsole",
         "edu/stanford/cs/parser",
         "edu/stanford/cs/tokenscanner",
         "edu/stanford/cs/utf8",
         "java/awt",
         "java/lang",
         "java/util" ],

function(jslib,
         edu_stanford_cs_controller,
         edu_stanford_cs_exp,
         edu_stanford_cs_java2js,
         edu_stanford_cs_jsconsole,
         edu_stanford_cs_parser,
         edu_stanford_cs_tokenscanner,
         edu_stanford_cs_utf8,
         java_awt,
         java_lang,
         java_util) {

/* Imports */

var inheritPrototype = jslib.inheritPrototype;
var newArray = jslib.newArray;
var toInt = jslib.toInt;
var toStr = jslib.toStr;
var Controller = edu_stanford_cs_controller.Controller;
var Steppable = edu_stanford_cs_controller.Steppable;
var EvalContext = edu_stanford_cs_exp.EvalContext;
var Expression = edu_stanford_cs_exp.Expression;
var LValue = edu_stanford_cs_exp.LValue;
var Value = edu_stanford_cs_exp.Value;
var JSElementList = edu_stanford_cs_java2js.JSElementList;
var JSPlatform = edu_stanford_cs_java2js.JSPlatform;
var JSProgram = edu_stanford_cs_java2js.JSProgram;
var JSConsole = edu_stanford_cs_jsconsole.JSConsole;
var CodeVector = edu_stanford_cs_parser.CodeVector;
var SyntaxError = edu_stanford_cs_parser.SyntaxError;
var TokenScanner = edu_stanford_cs_tokenscanner.TokenScanner;
var UTF8 = edu_stanford_cs_utf8.UTF8;
var Dimension = java_awt.Dimension;
var Font = java_awt.Font;
var ActionEvent = java_awt.ActionEvent;
var ActionListener = java_awt.ActionListener;
var Class = java_lang.Class;
var Double = java_lang.Double;
var Integer = java_lang.Integer;
var RuntimeException = java_lang.RuntimeException;
var System = java_lang.System;
var ArrayList = java_util.ArrayList;
var HashMap = java_util.HashMap;
var Stack = java_util.Stack;
var TreeMap = java_util.TreeMap;

/* SVM.js */

var SVM = function() {
   Controller.call(this);
   this.globals = new HashMap();
   this.valueStack = new Stack();
   this.frameStack = new Stack();
   this.exceptionStack = new Stack();
   this.cf = new SVMStackFrame();
   this.pc = 0;
   this.console = null;
   this.source = null;
   this.setState(SVM.INITIAL);
   this.traceFlag = false;
   this.stepMode = SVM.BY_INSTRUCTION;
   this.importPackage("core");
};

SVM.prototype = 
   jslib.inheritPrototype(Controller, "SVM extends Controller");
SVM.prototype.constructor = SVM;
SVM.prototype.$class = 
   new Class("SVM", SVM);

SVM.prototype.run = function() {
   this.setState(SVM.RUNNING);
   while (this.getState() === SVM.RUNNING) {
      this.executeInstruction();
   }
};

SVM.prototype.step = function() {
   if (this.stepMode === SVM.BY_INSTRUCTION) {
      this.executeInstruction();
   } else {
      this.executeInstruction();
      while (this.pc >= 0 && this.pc < this.code.length && ((this.code[this.pc] >> 24) & 0xFF) !== SVMC.STMT) {
         this.executeInstruction();
      }
   }
};

SVM.prototype.isCallable = function() {
   return true;
};

SVM.prototype.getStackDepth = function() {
   return this.frameStack.size();
};

SVM.prototype.setStepMode = function(mode) {
   this.stepMode = mode;
};

SVM.prototype.executeInstruction = function() {
   if (this.pc >= 0 && this.pc < this.code.length) {
      var ir = this.code[this.pc];
      var op = (ir >> 24) & 0xFF;
      var addr = ir & 0xFFFFFF;
      var ins = SVMInstruction.get(op);
      if (this.traceFlag) {
         this.println("(" + this.pc + ") " + ins.unparse(this, addr));
      }
      this.pc++;
      try {
         ins.execute(this, addr);
      } catch (ex) {
         ex.printStackTrace();
         System.exit(1);
         this.throwException(ex, Value.createString(RuntimeException.patchMessage(ex)));
      }
   } else {
      this.setState(SVM.STOPPED);
   }
};

SVM.prototype.getStepMode = function() {
   return this.stepMode;
};

SVM.prototype.setState = function(state) {
   this.setControllerState(state);
};

SVM.prototype.getState = function() {
   return this.getControllerState();
};

SVM.prototype.setTraceFlag = function(flag) {
   this.traceFlag = flag;
};

SVM.prototype.getTraceFlag = function() {
   return this.traceFlag;
};

SVM.prototype.setConsole = function(console) {
   this.console = console;
   console.addActionListener(new SVMConsoleListener(this));
};

SVM.prototype.getConsole = function() {
   return this.console;
};

SVM.prototype.setSource = function(source) {
   this.source = source;
};

SVM.prototype.getSource = function() {
   return this.source;
};

SVM.prototype.getSourceMarker = function(index) {
   if (this.source === null || index < 0) return null;
   var start = this.source.lastIndexOf("\n", index) + 1;
   var finish = this.source.indexOf("\n", start);
   if (finish === -1) finish = this.source.length;
   return new SVMSourceMarker(this.source.substring(start, finish), start);
};

SVM.prototype.setProgram = function(program) {
   this.program = program;
};

SVM.prototype.getProgram = function() {
   return this.program;
};

SVM.prototype.setCode = function(code) {
   this.code = code;
   if (this.cf !== null) this.cf.setCode(code);
};

SVM.prototype.getCode = function() {
   return this.code;
};

SVM.prototype.get = function(addr) {
   return this.code[addr];
};

SVM.prototype.getString = function(addr) {
   return UTF8.decode(this.code, addr);
};

SVM.prototype.setPC = function(addr) {
   this.pc = addr;
};

SVM.prototype.getPC = function() {
   return this.pc;
};

SVM.prototype.push = function(v) {
   this.valueStack.push(v);
};

SVM.prototype.pushInteger = function(n) {
   this.valueStack.push(Value.createInteger(n));
};

SVM.prototype.pushDouble = function(d) {
   this.valueStack.push(Value.createDouble(d));
};

SVM.prototype.pushBoolean = function(b) {
   this.valueStack.push(Value.createBoolean(b));
};

SVM.prototype.pushString = function(str) {
   this.valueStack.push(Value.createString(str));
};

SVM.prototype.pop = function() {
   return this.valueStack.pop();
};

SVM.prototype.popInteger = function() {
   return this.valueStack.pop().getIntegerValue();
};

SVM.prototype.popDouble = function() {
   return this.valueStack.pop().getDoubleValue();
};

SVM.prototype.popBoolean = function() {
   return this.valueStack.pop().getBooleanValue();
};

SVM.prototype.popString = function() {
   return this.valueStack.pop().getStringValue();
};

SVM.prototype.roll = function(n) {
   var values = jslib.newArray(n);
   for (var i = 0; i < n; i++) {
      values[i] = this.pop();
   }
   this.push(values[0]);
   for (var i = n - 1; i > 0; i--) {
      this.push(values[i]);
   }
};

SVM.prototype.peekBack = function(k) {
   return this.valueStack.get(this.valueStack.size() - k - 1);
};

SVM.prototype.setStackBase = function(offset) {
   this.cf.setStackBase(this.valueStack.size() - offset);
};

SVM.prototype.pstack = function() {
   if (this.valueStack.isEmpty()) {
      this.println("");
   } else {
      var v = this.valueStack.pop();
      this.print(v.toString() + " ");
      this.pstack();
      this.valueStack.push(v);
   }
};

SVM.prototype.list = function() {
   var n = this.code.length;
   for (var i = 0; i < n; i++) {
      this.print("(" + i + ") ");
      var ir = this.code[i];
      var op = (ir >> 24) & 0xFF;
      var addr = ir & 0xFFFFFF;
      var ins = SVMInstruction.get(op);
      if (ins === null) {
         this.println("" + ir);
      } else {
         this.println(ins.unparse(this, addr));
      }
      if (ir === SVMC.END) break;
   }
};

SVM.prototype.getCurrentFrame = function() {
   return this.cf;
};

SVM.prototype.pushFrame = function() {
   this.frameStack.push(this.cf);
   this.cf = new SVMStackFrame();
   this.cf.setCode(this.code);
};

SVM.prototype.popFrame = function() {
   this.cf = (this.frameStack.isEmpty()) ? null : this.frameStack.pop();
   if (this.cf !== null) this.code = this.cf.getCode();
};

SVM.prototype.setStatementOffset = function(offset) {
   this.statementOffset = offset;
};

SVM.prototype.getStatementOffset = function() {
   return this.statementOffset;
};

SVM.prototype.restoreStackBase = function() {
   if (this.cf === null) return;
   var base = this.cf.getStackBase();
   while (this.valueStack.size() > base) {
      this.valueStack.pop();
   }
};

SVM.prototype.pushExceptionFrame = function(addr) {
   this.exceptionStack.push(new ExceptionFrame(addr, this.frameStack.size()));
};

SVM.prototype.popExceptionFrame = function() {
   this.exceptionStack.pop();
};

SVM.prototype.throwException = function(ex, v) {
   if (this.exceptionStack.isEmpty()) {
      JSProgram.alert(this.getStatementOffset() + ": " + ex);
   } else {
      var ef = this.exceptionStack.pop();
      var depth = ef.getStackDepth();
      while (this.frameStack.size() > depth) {
         this.popFrame();
      }
      this.restoreStackBase();
      this.valueStack.push(v);
      this.setPC(ef.getDispatchAddress());
   }
};

SVM.prototype.print = function(s) {
   if (this.console === null) {
      System.out.print(s);
   } else {
      this.console.print(s);
   }
};

SVM.prototype.println = function(s) {
   if (this.console === null) {
      alert(s);
   } else {
      this.console.println(s);
   }
};

SVM.prototype.getValue = function(name) {
   throw new RuntimeException("System error: Illegal evaluation");
};

SVM.prototype.setValue = function(name, value) {
   throw new RuntimeException("System error: Illegal evaluation");
};

SVM.prototype.isDefined = function(name) {
   throw new RuntimeException("System error: Illegal evaluation");
};

SVM.prototype.getLValue = function(exp) {
   throw new RuntimeException("System error: Illegal evaluation");
};

SVM.prototype.evalConstant = function(exp) {
   throw new RuntimeException("System error: Illegal evaluation");
};

SVM.prototype.evalIdentifier = function(exp) {
   throw new RuntimeException("System error: Illegal evaluation");
};

SVM.prototype.evalCompound = function(exp) {
   throw new RuntimeException("System error: Illegal evaluation");
};

SVM.prototype.getArgumentCount = function() {
   var ins = this.get(this.getPC());
   if (((ins >> 24) & 0xFF) !== SVMC.NARGS) return -1;
   return ins & 0xFFFFFF;
};

SVM.prototype.checkSignature = function(name, sig) {
   var nArgs = this.getArgumentCount();
   if (nArgs === -1) return;
   var len = sig.length;
   if (len !== nArgs) {
      throw new RuntimeException("Wrong number of arguments to " + name);
   }
   for (var i = 0; i < len; i++) {
      if (!this.checkArgType(this.peekBack(len - i - 1), sig.charCodeAt(i))) {
         throw new RuntimeException("Type mismatch in call to " + name);
      }
   }
};

SVM.prototype.checkArgumentCount = function(nArgs, nParams) {
   for (var i = nParams; i < nArgs; i++) {
      this.pop();
   }
   for (var i = nArgs; i < nParams; i++) {
      this.push(Value.UNDEFINED);
   }
};

SVM.prototype.importPackage = function(name) {
   if (JSPlatform.isJavaScript()) return;
   try {
      var cname = "edu.stanford.cs.sjslib." + name +
      ".SJSPackage_" + name;
      var c = Class.forName(cname);
      var pkg = c.newInstance();
      pkg.defineClasses(this);
   } catch (ex) {
      throw new RuntimeException(ex.toString());
   }
};

SVM.prototype.setGlobal = function(name, value) {
   this.globals.put(name, value);
};

SVM.prototype.getGlobal = function(name) {
   return this.globals.get(name);
};

SVM.prototype.isGlobal = function(name) {
   return this.globals.containsKey(name);
};

SVM.prototype.getGlobalInteger = function(name, defValue) {
   if (this.isGlobal(name)) {
      return this.globals.get(name).getIntegerValue();
   }
   return defValue;
};

SVM.prototype.getGlobalBoolean = function(name, defValue) {
   if (this.isGlobal(name)) {
      return this.globals.get(name).getBooleanValue();
   }
   return defValue;
};

SVM.prototype.getGlobalDouble = function(name, defValue) {
   if (this.isGlobal(name)) {
      return this.globals.get(name).getDoubleValue();
   }
   return defValue;
};

SVM.prototype.getGlobalString = function(name, defValue) {
   if (this.isGlobal(name)) {
      return this.globals.get(name).getStringValue();
   }
   return defValue;
};

SVM.prototype.checkArgType = function(v, type) {
   switch (type) {
      case toInt('B'): return v.getType() === Value.BOOLEAN;
      case toInt('D'): return v.isNumeric();
      case toInt('I'): return v.isIntegral();
      case toInt('O'): return v.getType() === Value.OBJECT;
      case toInt('S'): return v.getType() === Value.STRING;
      case toInt('*'): return true;
    default:
      throw new RuntimeException("Illegal type code: " + toStr(type));
   }
};

SVM.BY_INSTRUCTION = 0;
SVM.BY_STATEMENT = 1;
SVM.INITIAL = Controller.INITIAL;
SVM.RUNNING = Controller.RUNNING;
SVM.STEPPING = Controller.STEPPING;
SVM.CALLING = Controller.CALLING;
SVM.STOPPED = Controller.STOPPED;
SVM.FINISHED = Controller.FINISHED;
SVM.WAITING = Controller.WAITING;
SVM.ERROR = Controller.ERROR;
this.globals = null;
var SVMConsoleListener = function(svm) {
   this.svm = svm;
};

SVMConsoleListener.prototype.actionPerformed = function(e) {
   var ok = false;
   var action = "";
   if (this.svm.isGlobal("CONSOLE_WAIT")) {
      action = this.svm.getGlobalString("CONSOLE_WAIT", "");
      if (jslib.startsWith(action, "getInt")) {
         try {
            this.svm.pushInteger(Integer.parseInt(e.getActionCommand()));
            ok = true;
         } catch (ex) {
            this.svm.getConsole().showErrorMessage(RuntimeException.patchMessage(ex));
         }
      } else if (jslib.startsWith(action, "getNumber")) {
         try {
            this.svm.pushDouble(Double.parseDouble(e.getActionCommand()));
            ok = true;
         } catch (ex) {
            this.svm.getConsole().showErrorMessage(RuntimeException.patchMessage(ex));
         }
      } else {
         this.svm.pushString(e.getActionCommand());
         ok = true;
      }
   } else {
      this.svm.pushString(e.getActionCommand());
      ok = true;
   }
   if (ok) {
      this.svm.run();
   } else {
      var prompt = "";
      var colon = action.indexOf(":");
      if (colon > 0) prompt = action.substring(colon + 1);
      this.svm.getConsole().requestInput(prompt);
   }
};

var ExceptionFrame = function(addr, depth) {
   this.addr = addr;
   this.depth = depth;
};

ExceptionFrame.prototype.getDispatchAddress = function() {
   return this.addr;
};

ExceptionFrame.prototype.getStackDepth = function() {
   return this.depth;
};


/* SVMArray.js */

var SVMArray = function() {
   ArrayList.call(this);
};

SVMArray.prototype =
   jslib.inheritPrototype(ArrayList, "SVMArray extends ArrayList");
SVMArray.prototype.constructor = SVMArray;
SVMArray.prototype.$class = 
   new Class("SVMArray", SVMArray);

SVMArray.prototype.getIndex = function(k) {
   var n = this.size();
   if (k < 0) k += n;
   if (k >= 0 && k < n) {
      return k;
   } else {
      throw new RuntimeException("Array index out of bounds");
   }
};


/* SVMC.js */

var SVMC = function() {
   /* Empty */
};

SVMC.SVM_VERSION = 4;
SVMC.END =      0x00;     /* END                 */
SVMC.VERSION =  0x01;     /* VERSION n           */
SVMC.PSTACK =   0x02;     /* PSTACK              */
SVMC.STMT =     0x03;     /* STMT index          */
SVMC.HALT =     0x04;     /* HALT                */
SVMC.PUSHINT =  0x10;     /* PUSHINT int         */
SVMC.PUSHNUM =  0x11;     /* PUSHNUM num         */
SVMC.PUSHSTR =  0x12;     /* PUSHSTR str         */
SVMC.PUSHFN =   0x13;     /* PUSHFN addr         */
SVMC.FLUSH =    0x14;     /* FLUSH n             */
SVMC.DUP =      0x15;     /* DUP                 */
SVMC.ROLL =     0x16;     /* ROLL n              */
SVMC.ADD =      0x20;     /* ADD                 */
SVMC.SUB =      0x21;     /* SUB                 */
SVMC.MUL =      0x22;     /* MUL                 */
SVMC.DIV =      0x23;     /* DIV                 */
SVMC.IDIV =     0x24;     /* DIV                 */
SVMC.REM =      0x25;     /* REM                 */
SVMC.NEG =      0x26;     /* NEG                 */
SVMC.EQ =       0x30;     /* EQ                  */
SVMC.NE =       0x31;     /* NE                  */
SVMC.LT =       0x32;     /* LT                  */
SVMC.LE =       0x33;     /* LE                  */
SVMC.GT =       0x34;     /* GT                  */
SVMC.GE =       0x35;     /* GE                  */
SVMC.JUMP =     0x40;     /* JUMP addr           */
SVMC.JUMPT =    0x41;     /* JUMPT addr          */
SVMC.JUMPF =    0x42;     /* JUMPF addr          */
SVMC.DISPATCH = 0x43;     /* DISPATCH            */
SVMC.TRY =      0x44;     /* TRY addr            */
SVMC.ENDTRY =   0x45;     /* ENDTRY              */
SVMC.THROW =    0x46;     /* THROW               */
SVMC.NOT =      0x50;     /* NOT                 */
SVMC.AND =      0x51;     /* AND                 */
SVMC.OR =       0x52;     /* OR                  */
SVMC.XOR =      0x53;     /* XOR                 */
SVMC.LSH =      0x54;     /* LSH                 */
SVMC.ASH =      0x55;     /* ASH                 */
SVMC.CALL =     0x60;     /* CALL addr           */
SVMC.CALLM =    0x61;     /* CALLM name          */
SVMC.CALLFN =   0x62;     /* CALLFN              */
SVMC.RETURN =   0x63;     /* RETURN              */
SVMC.LOCALS =   0x64;     /* LOCALS vars         */
SVMC.PUSHLOC =  0x65;     /* PUSHLOC n           */
SVMC.POPLOC =   0x66;     /* POPLOC n            */
SVMC.ARG =      0x67;     /* ARG name            */
SVMC.VAR =      0x68;     /* VAR name            */
SVMC.PARAMS =   0x69;     /* PARAMS n            */
SVMC.NARGS =    0x6A;     /* NARGS n             */
SVMC.VARGS =    0x6B;     /* VARGS               */
SVMC.PUSHVAR =  0x6C;     /* PUSHVAR name        */
SVMC.POPVAR =   0x6D;     /* POPVAR name         */
SVMC.DEFAULT_WINDOW_WIDTH = 500;
SVMC.DEFAULT_WINDOW_HEIGHT = 300;
SVMC.DEFAULT_CONSOLE_WIDTH = 500;
SVMC.DEFAULT_CONSOLE_HEIGHT = 200;

/* SVMClass.js */

var SVMClass = function() {
   this.methodTable = new HashMap();
};

SVMClass.prototype.getMethod = function(name) {
   var m = this.methodTable.get(name);
   if (m === null) throw new RuntimeException(name + " is not defined");
   return m;
};

SVMClass.prototype.defineMethod = function(name, m) {
   this.methodTable.put(name, m);
};

SVMClass.isDefined = function(name) {
   return SVMClass.classTable.containsKey(name);
};

SVMClass.forName = function(name) {
   var c = SVMClass.classTable.get(name);
   if (c === null) throw new RuntimeException(name + " is not defined");
   return c;
};

SVMClass.defineClass = function(svm, name, c) {
   if (SVMClass.classTable === null) SVMClass.classTable = new HashMap();
   SVMClass.classTable.put(name, c);
   svm.setGlobal(name, Value.createObject(name, "Class"));
};

SVMClass.classTable = null;

/* SVMProgram.js */

var SVMProgram = function() {
   JSProgram.call(this);
   var className = this.$class.getName();
   this.setTitle(className.substring(className.lastIndexOf(".") + 1));
   this.svm = new SVM();
   this.svm.setProgram(this);
};

SVMProgram.prototype = 
   jslib.inheritPrototype(JSProgram, "SVMProgram extends JSProgram");
SVMProgram.prototype.constructor = SVMProgram;
SVMProgram.prototype.$class = 
   new Class("SVMProgram", SVMProgram);

SVMProgram.prototype.init = function() {
   this.setCode(SVMProgram.EMPTY_PROGRAM);
};

SVMProgram.prototype.getSVM = function() {
   return this.svm;
};

SVMProgram.prototype.isCompiler = function() {
   return false;
};

SVMProgram.prototype.setCode = function(code) {
   this.svm.setCode(code);
};

SVMProgram.prototype.getCode = function() {
   return this.svm.getCode();
};

SVMProgram.prototype.setConsole = function(console) {
   this.svm.setConsole(console);
};

SVMProgram.prototype.getConsole = function() {
   return this.svm.getConsole();
};

SVMProgram.prototype.run = function() {
   this.init();
   this.pack();
   this.setVisible(true);
   this.svm.run();
};

SVMProgram.EMPTY_PROGRAM = [
   SVMC.END << 24
];


/* SVMConsoleProgram.js */

var SVMConsoleProgram = function() {
   SVMProgram.call(this);
   this.console = new JSConsole();
   this.console.setFont(Font.decode("Courier New-Bold-14"));
   this.add(this.console, "console");
   this.setPreferredSize(SVMC.DEFAULT_WINDOW_WIDTH, SVMC.DEFAULT_WINDOW_HEIGHT);
   this.setConsole(this.console);
};

SVMConsoleProgram.prototype = 
   jslib.inheritPrototype(SVMProgram, "SVMConsoleProgram extends SVMProgram");
SVMConsoleProgram.prototype.constructor = SVMConsoleProgram;
SVMConsoleProgram.prototype.$class = 
   new Class("SVMConsoleProgram", SVMConsoleProgram);

SVMConsoleProgram.prototype.setPreferredSize = function(width, height) {
   this.console.setPreferredSize(new Dimension(width, height));
};


/* SVMMethod.js */

var SVMMethod = function() {
   /* Empty */
};

SVMMethod.prototype.isConstant = function() {
   return false;
};


/* SVMConstant.js */

var SVMConstant = function() {
   SVMMethod.call(this);
};

SVMConstant.prototype =
   jslib.inheritPrototype(SVMMethod, "SVMConstant extends SVMMethod");
SVMConstant.prototype.constructor = SVMConstant;
SVMConstant.prototype.$class = 
   new Class("SVMConstant", SVMConstant);

SVMConstant.prototype.isConstant = function() {
   return true;
};


/* SVMFunctionClosure.js */

var SVMFunctionClosure = function(code, addr, frame) {
   this.code = code;
   this.addr = addr;
   this.frame = frame;
};

SVMFunctionClosure.prototype.getAddress = function() {
   return this.addr;
};

SVMFunctionClosure.prototype.getCode = function() {
   return this.code;
};

SVMFunctionClosure.prototype.getFrame = function() {
   return this.frame;
};


/* SVMInstruction.js */

var SVMInstruction = function(name, code) {
   this.name = name;
   this.code = code;
};

SVMInstruction.prototype.getName = function() {
   return this.name;
};

SVMInstruction.prototype.getCode = function() {
   return this.code;
};

SVMInstruction.prototype.execute = function(svm, addr) {
   throw new RuntimeException("Not yet implemented");
};

SVMInstruction.prototype.unparse = function(svm, addr) {
   return this.name;
};

SVMInstruction.prototype.assemble = function(cv, scanner) {
   cv.addWord(this.code << 24);
};

SVMInstruction.lookup = function(name) {
   if (SVMInstruction.instructionTable === null) SVMInstruction.initializeInstructionTable();
   return SVMInstruction.instructionTable.get(name);
};

SVMInstruction.get = function(code) {
   if (SVMInstruction.instructionTable === null) SVMInstruction.initializeInstructionTable();
   return SVMInstruction.codeTable.get(code);
};

SVMInstruction.initializeInstructionTable = function() {
   SVMInstruction.instructionTable = new TreeMap();
   SVMInstruction.codeTable = new TreeMap();
   SVMInstruction.define(new END_Ins());
   SVMInstruction.define(new VERSION_Ins());
   SVMInstruction.define(new PSTACK_Ins());
   SVMInstruction.define(new STMT_Ins());
   SVMInstruction.define(new HALT_Ins());
   SVMInstruction.define(new PUSHINT_Ins());
   SVMInstruction.define(new PUSHNUM_Ins());
   SVMInstruction.define(new PUSHSTR_Ins());
   SVMInstruction.define(new PUSHFN_Ins());
   SVMInstruction.define(new FLUSH_Ins());
   SVMInstruction.define(new DUP_Ins());
   SVMInstruction.define(new ROLL_Ins());
   SVMInstruction.define(new ADD_Ins());
   SVMInstruction.define(new SUB_Ins());
   SVMInstruction.define(new MUL_Ins());
   SVMInstruction.define(new DIV_Ins());
   SVMInstruction.define(new IDIV_Ins());
   SVMInstruction.define(new REM_Ins());
   SVMInstruction.define(new NEG_Ins());
   SVMInstruction.define(new EQ_Ins());
   SVMInstruction.define(new NE_Ins());
   SVMInstruction.define(new LT_Ins());
   SVMInstruction.define(new LE_Ins());
   SVMInstruction.define(new GT_Ins());
   SVMInstruction.define(new GE_Ins());
   SVMInstruction.define(new JUMP_Ins());
   SVMInstruction.define(new JUMPT_Ins());
   SVMInstruction.define(new JUMPF_Ins());
   SVMInstruction.define(new DISPATCH_Ins());
   SVMInstruction.define(new TRY_Ins());
   SVMInstruction.define(new ENDTRY_Ins());
   SVMInstruction.define(new THROW_Ins());
   SVMInstruction.define(new NOT_Ins());
   SVMInstruction.define(new AND_Ins());
   SVMInstruction.define(new OR_Ins());
   SVMInstruction.define(new XOR_Ins());
   SVMInstruction.define(new LSH_Ins());
   SVMInstruction.define(new ASH_Ins());
   SVMInstruction.define(new CALL_Ins());
   SVMInstruction.define(new CALLM_Ins());
   SVMInstruction.define(new CALLFN_Ins());
   SVMInstruction.define(new RETURN_Ins());
   SVMInstruction.define(new LOCALS_Ins());
   SVMInstruction.define(new PUSHLOC_Ins());
   SVMInstruction.define(new POPLOC_Ins());
   SVMInstruction.define(new ARG_Ins());
   SVMInstruction.define(new VAR_Ins());
   SVMInstruction.define(new PARAMS_Ins());
   SVMInstruction.define(new NARGS_Ins());
   SVMInstruction.define(new VARGS_Ins());
   SVMInstruction.define(new PUSHVAR_Ins());
   SVMInstruction.define(new POPVAR_Ins());
};

SVMInstruction.define = function(ins) {
   SVMInstruction.instructionTable.put(ins.getName(), ins);
   SVMInstruction.codeTable.put(ins.getCode(), ins);
};

SVMInstruction.instructionTable = null;
SVMInstruction.codeTable = null;
var SVMStringInstruction = function(name, code) {
   SVMInstruction.call(this, name, code);
};

SVMStringInstruction.prototype = 
   jslib.inheritPrototype(SVMInstruction, "SVMStringInstruction extends SVMInstruction");
SVMStringInstruction.prototype.constructor = SVMStringInstruction;
SVMStringInstruction.prototype.$class = 
   new Class("SVMStringInstruction", SVMStringInstruction);

SVMStringInstruction.prototype.assemble = function(cv, scanner) {
   var str = scanner.getStringValue(scanner.nextToken());
   cv.addWord((this.getCode() << 24) | cv.stringRef(str));
};

SVMStringInstruction.prototype.unparse = function(svm, addr) {
   return this.getName() + " \"" + svm.getString(addr) + "\"";
};

var SVMVarInstruction = function(name, code) {
   SVMInstruction.call(this, name, code);
};

SVMVarInstruction.prototype = 
   jslib.inheritPrototype(SVMInstruction, "SVMVarInstruction extends SVMInstruction");
SVMVarInstruction.prototype.constructor = SVMVarInstruction;
SVMVarInstruction.prototype.$class = 
   new Class("SVMVarInstruction", SVMVarInstruction);

SVMVarInstruction.prototype.assemble = function(cv, scanner) {
   var str = scanner.nextToken();
   cv.addWord((this.getCode() << 24) | cv.stringRef(str));
};

SVMVarInstruction.prototype.unparse = function(svm, addr) {
   return this.getName() + " " + svm.getString(addr);
};

var SVMAddressInstruction = function(name, code) {
   SVMInstruction.call(this, name, code);
};

SVMAddressInstruction.prototype = 
   jslib.inheritPrototype(SVMInstruction, "SVMAddressInstruction extends SVMInstruction");
SVMAddressInstruction.prototype.constructor = SVMAddressInstruction;
SVMAddressInstruction.prototype.$class = 
   new Class("SVMAddressInstruction", SVMAddressInstruction);

SVMAddressInstruction.prototype.assemble = function(cv, scanner) {
   var token = scanner.nextToken();
   var type = scanner.getTokenType(token);
   switch (type) {
    case TokenScanner.NUMBER:
      cv.addWord((this.getCode() << 24) | Integer.parseInt(token));
      break;
    case TokenScanner.WORD:
      cv.addWord((this.getCode() << 24) | cv.labelRef(token));
      break;
    default:
      throw new SyntaxError("Illegal argument " + token);
   }
};

SVMAddressInstruction.prototype.unparse = function(svm, addr) {
   return this.getName() + " " + addr;
};

var SVMOffsetInstruction = function(name, code) {
   SVMInstruction.call(this, name, code);
};

SVMOffsetInstruction.prototype = 
   jslib.inheritPrototype(SVMInstruction, "SVMOffsetInstruction extends SVMInstruction");
SVMOffsetInstruction.prototype.constructor = SVMOffsetInstruction;
SVMOffsetInstruction.prototype.$class = 
   new Class("SVMOffsetInstruction", SVMOffsetInstruction);

SVMOffsetInstruction.prototype.assemble = function(cv, scanner) {
   var token = scanner.nextToken();
   var type = scanner.getTokenType(token);
   switch (type) {
    case TokenScanner.NUMBER:
      cv.addWord((this.getCode() << 24) | Integer.parseInt(token));
      break;
    case TokenScanner.WORD:
      cv.addWord((this.getCode() << 24) | cv.getLabel(token));
      break;
    default:
      throw new SyntaxError("Illegal argument " + token);
   }
};

SVMOffsetInstruction.prototype.unparse = function(svm, addr) {
   return this.getName() + " " + addr;
};

var SVMNameInstruction = function(name, code) {
   SVMInstruction.call(this, name, code);
};

SVMNameInstruction.prototype = 
   jslib.inheritPrototype(SVMInstruction, "SVMNameInstruction extends SVMInstruction");
SVMNameInstruction.prototype.constructor = SVMNameInstruction;
SVMNameInstruction.prototype.$class = 
   new Class("SVMNameInstruction", SVMNameInstruction);

SVMNameInstruction.prototype.assemble = function(cv, scanner) {
   var name = "";
   while (true) {
      var token = scanner.nextToken();
      if (jslib.equals(token, "\n")) break;
      name += token;
   }
   scanner.saveToken("\n");
   cv.addWord((this.getCode() << 24) | cv.stringRef(name));
};

var ArithmeticOp = function(name, code) {
   SVMInstruction.call(this, name, code);
};

ArithmeticOp.prototype = 
   jslib.inheritPrototype(SVMInstruction, "ArithmeticOp extends SVMInstruction");
ArithmeticOp.prototype.constructor = ArithmeticOp;
ArithmeticOp.prototype.$class = 
   new Class("ArithmeticOp", ArithmeticOp);

ArithmeticOp.prototype.execute = function(svm, addr) {
   var rhs = svm.pop();
   var lhs = svm.pop();
   if (lhs.getType() === Value.INTEGER && rhs.getType() === Value.INTEGER) {
      var x = lhs.getIntegerValue();
      var y = rhs.getIntegerValue();
      svm.pushInteger(this.applyInteger(x, y));
   } else {
      var x = lhs.getDoubleValue();
      var y = rhs.getDoubleValue();
      svm.pushDouble(this.applyDouble(x, y));
   }
};

var RelationalOp = function(name, code) {
   SVMInstruction.call(this, name, code);
};

RelationalOp.prototype = 
   jslib.inheritPrototype(SVMInstruction, "RelationalOp extends SVMInstruction");
RelationalOp.prototype.constructor = RelationalOp;
RelationalOp.prototype.$class = 
   new Class("RelationalOp", RelationalOp);

RelationalOp.prototype.execute = function(svm, addr) {
   var rhs = svm.pop();
   var lhs = svm.pop();
   var lhsType = lhs.getType();
   var rhsType = rhs.getType();
   if (lhsType === Value.STRING && rhsType === Value.STRING) {
      var s1 = lhs.getStringValue();
      var s2 = rhs.getStringValue();
      svm.pushBoolean(this.applyInteger(s1.localeCompare(s2), 0));
   } else if (lhsType === Value.INTEGER && rhsType === Value.INTEGER) {
      var x = lhs.getIntegerValue();
      var y = rhs.getIntegerValue();
      svm.pushBoolean(this.applyInteger(x, y));
   } else if (lhs.isNumeric() && rhs.isNumeric()) {
      var x = lhs.getDoubleValue();
      var y = rhs.getDoubleValue();
      svm.pushBoolean(this.applyDouble(x, y));
   } else {
      var v1 = lhs.getValue();
      var v2 = rhs.getValue();
      svm.pushBoolean(this.applyObject(v1, v2));
   }
};

RelationalOp.prototype.applyObject = function(v1, v2) {
   throw new RuntimeException("Illegal object comparison");
};

var LogicalOp = function(name, code) {
   SVMInstruction.call(this, name, code);
};

LogicalOp.prototype = 
   jslib.inheritPrototype(SVMInstruction, "LogicalOp extends SVMInstruction");
LogicalOp.prototype.constructor = LogicalOp;
LogicalOp.prototype.$class = 
   new Class("LogicalOp", LogicalOp);

LogicalOp.prototype.execute = function(svm, addr) {
   var rhs = svm.pop();
   var lhs = svm.pop();
   var lhsType = lhs.getType();
   var rhsType = rhs.getType();
   if (lhsType === Value.BOOLEAN && rhsType === Value.BOOLEAN) {
      var v1 = lhs.getBooleanValue() ? -1 : 0;
      var v2 = rhs.getBooleanValue() ? -1 : 0;
      svm.pushBoolean(this.applyInteger(v1, v2) !== 0);
   } else {
      var x = lhs.getIntegerValue();
      var y = rhs.getIntegerValue();
      svm.pushInteger(this.applyInteger(x, y));
   }
};

var END_Ins = function() {
   SVMInstruction.call(this, "END", SVMC.END);
};

END_Ins.prototype = 
   jslib.inheritPrototype(SVMInstruction, "END_Ins extends SVMInstruction");
END_Ins.prototype.constructor = END_Ins;
END_Ins.prototype.$class = 
   new Class("END_Ins", END_Ins);

END_Ins.prototype.execute = function(svm, addr) {
   svm.setPC(-1);
};

var VERSION_Ins = function() {
   SVMOffsetInstruction.call(this, "VERSION", SVMC.VERSION);
};

VERSION_Ins.prototype = 
   jslib.inheritPrototype(SVMOffsetInstruction, "VERSION_Ins extends SVMOffsetInstruction");
VERSION_Ins.prototype.constructor = VERSION_Ins;
VERSION_Ins.prototype.$class = 
   new Class("VERSION_Ins", VERSION_Ins);

VERSION_Ins.prototype.execute = function(svm, addr) {
   if (addr !== SVMC.SVM_VERSION) {
      throw new RuntimeException("Incompatible SVM version");
   }
};

var PSTACK_Ins = function() {
   SVMInstruction.call(this, "PSTACK", SVMC.PSTACK);
};

PSTACK_Ins.prototype = 
   jslib.inheritPrototype(SVMInstruction, "PSTACK_Ins extends SVMInstruction");
PSTACK_Ins.prototype.constructor = PSTACK_Ins;
PSTACK_Ins.prototype.$class = 
   new Class("PSTACK_Ins", PSTACK_Ins);

PSTACK_Ins.prototype.execute = function(svm, addr) {
   svm.pstack();
};

var STMT_Ins = function() {
   SVMOffsetInstruction.call(this, "STMT", SVMC.STMT);
};

STMT_Ins.prototype = 
   jslib.inheritPrototype(SVMOffsetInstruction, "STMT_Ins extends SVMOffsetInstruction");
STMT_Ins.prototype.constructor = STMT_Ins;
STMT_Ins.prototype.$class = 
   new Class("STMT_Ins", STMT_Ins);

STMT_Ins.prototype.execute = function(svm, addr) {
   svm.setStatementOffset(addr);
   svm.restoreStackBase();
};

var HALT_Ins = function() {
   SVMInstruction.call(this, "HALT", SVMC.HALT);
};

HALT_Ins.prototype = 
   jslib.inheritPrototype(SVMInstruction, "HALT_Ins extends SVMInstruction");
HALT_Ins.prototype.constructor = HALT_Ins;
HALT_Ins.prototype.$class = 
   new Class("HALT_Ins", HALT_Ins);

HALT_Ins.prototype.execute = function(svm, addr) {
   svm.setPC(-1);
};

var PUSHINT_Ins = function() {
   SVMAddressInstruction.call(this, "PUSHINT", SVMC.PUSHINT);
};

PUSHINT_Ins.prototype = 
   jslib.inheritPrototype(SVMAddressInstruction, "PUSHINT_Ins extends SVMAddressInstruction");
PUSHINT_Ins.prototype.constructor = PUSHINT_Ins;
PUSHINT_Ins.prototype.$class = 
   new Class("PUSHINT_Ins", PUSHINT_Ins);

PUSHINT_Ins.prototype.execute = function(svm, addr) {
   svm.pushInteger(addr);
};

var PUSHNUM_Ins = function() {
   SVMInstruction.call(this, "PUSHNUM", SVMC.PUSHNUM);
};

PUSHNUM_Ins.prototype = 
   jslib.inheritPrototype(SVMInstruction, "PUSHNUM_Ins extends SVMInstruction");
PUSHNUM_Ins.prototype.constructor = PUSHNUM_Ins;
PUSHNUM_Ins.prototype.$class = 
   new Class("PUSHNUM_Ins", PUSHNUM_Ins);

PUSHNUM_Ins.prototype.assemble = function(cv, scanner) {
   var token = scanner.nextToken();
   if (jslib.equals(token, "-")) token += scanner.nextToken();
   cv.addWord((this.getCode() << 24) | cv.stringRef(token));
};

PUSHNUM_Ins.prototype.execute = function(svm, addr) {
   var str = svm.getString(addr);
   if (str.indexOf(".") === -1) {
      svm.pushInteger(Integer.parseInt(str));
   } else {
      svm.pushDouble(Double.parseDouble(str));
   }
};

PUSHNUM_Ins.prototype.unparse = function(svm, addr) {
   return "PUSHNUM " + svm.getString(addr);
};

var PUSHSTR_Ins = function() {
   SVMStringInstruction.call(this, "PUSHSTR", SVMC.PUSHSTR);
};

PUSHSTR_Ins.prototype = 
   jslib.inheritPrototype(SVMStringInstruction, "PUSHSTR_Ins extends SVMStringInstruction");
PUSHSTR_Ins.prototype.constructor = PUSHSTR_Ins;
PUSHSTR_Ins.prototype.$class = 
   new Class("PUSHSTR_Ins", PUSHSTR_Ins);

PUSHSTR_Ins.prototype.execute = function(svm, addr) {
   svm.pushString(svm.getString(addr));
};

var PUSHFN_Ins = function() {
   SVMAddressInstruction.call(this, "PUSHFN", SVMC.PUSHFN);
};

PUSHFN_Ins.prototype = 
   jslib.inheritPrototype(SVMAddressInstruction, "PUSHFN_Ins extends SVMAddressInstruction");
PUSHFN_Ins.prototype.constructor = PUSHFN_Ins;
PUSHFN_Ins.prototype.$class = 
   new Class("PUSHFN_Ins", PUSHFN_Ins);

PUSHFN_Ins.prototype.execute = function(svm, addr) {
   var cf = svm.getCurrentFrame();
   var closure = new SVMFunctionClosure(null, addr, cf);
   svm.push(Value.createObject(closure, "FunctionClosure"));
};

var FLUSH_Ins = function() {
   SVMInstruction.call(this, "FLUSH", SVMC.FLUSH);
};

FLUSH_Ins.prototype = 
   jslib.inheritPrototype(SVMInstruction, "FLUSH_Ins extends SVMInstruction");
FLUSH_Ins.prototype.constructor = FLUSH_Ins;
FLUSH_Ins.prototype.$class = 
   new Class("FLUSH_Ins", FLUSH_Ins);

FLUSH_Ins.prototype.assemble = function(cv, scanner) {
   var token = scanner.nextToken();
   if (scanner.getTokenType(token) === TokenScanner.NUMBER) {
      cv.addWord(SVMC.FLUSH << 24 | Integer.parseInt(token));
   } else {
      scanner.saveToken(token);
      cv.addWord(SVMC.FLUSH << 24 | 1);
   }
};

FLUSH_Ins.prototype.execute = function(svm, addr) {
   for (var i = 0; i < Math.min(1, addr); i++) {
      svm.pop();
   }
};

var DUP_Ins = function() {
   SVMInstruction.call(this, "DUP", SVMC.DUP);
};

DUP_Ins.prototype = 
   jslib.inheritPrototype(SVMInstruction, "DUP_Ins extends SVMInstruction");
DUP_Ins.prototype.constructor = DUP_Ins;
DUP_Ins.prototype.$class = 
   new Class("DUP_Ins", DUP_Ins);

DUP_Ins.prototype.execute = function(svm, addr) {
   svm.push(svm.peekBack(0));
};

var ROLL_Ins = function() {
   SVMOffsetInstruction.call(this, "ROLL", SVMC.ROLL);
};

ROLL_Ins.prototype = 
   jslib.inheritPrototype(SVMOffsetInstruction, "ROLL_Ins extends SVMOffsetInstruction");
ROLL_Ins.prototype.constructor = ROLL_Ins;
ROLL_Ins.prototype.$class = 
   new Class("ROLL_Ins", ROLL_Ins);

ROLL_Ins.prototype.execute = function(svm, addr) {
   svm.roll(addr);
};

var ADD_Ins = function() {
   SVMInstruction.call(this, "ADD", SVMC.ADD);
};

ADD_Ins.prototype = 
   jslib.inheritPrototype(SVMInstruction, "ADD_Ins extends SVMInstruction");
ADD_Ins.prototype.constructor = ADD_Ins;
ADD_Ins.prototype.$class = 
   new Class("ADD_Ins", ADD_Ins);

ADD_Ins.prototype.execute = function(svm, addr) {
   var rhs = svm.pop();
   var lhs = svm.pop();
   var lhsType = lhs.getType();
   var rhsType = rhs.getType();
   if (lhsType === Value.STRING || rhsType === Value.STRING) {
      svm.pushString(lhs.toString() + rhs.toString());
   } else if (lhsType === Value.INTEGER && rhsType === Value.INTEGER) {
      var x = lhs.getIntegerValue();
      var y = rhs.getIntegerValue();
      svm.pushInteger(x + y);
   } else {
      var x = lhs.getDoubleValue();
      var y = rhs.getDoubleValue();
      svm.pushDouble(x + y);
   }
};

var SUB_Ins = function() {
   ArithmeticOp.call(this, "SUB", SVMC.SUB);
};

SUB_Ins.prototype = 
   jslib.inheritPrototype(ArithmeticOp, "SUB_Ins extends ArithmeticOp");
SUB_Ins.prototype.constructor = SUB_Ins;
SUB_Ins.prototype.$class = 
   new Class("SUB_Ins", SUB_Ins);

SUB_Ins.prototype.applyInteger = function(x, y) {
   return x - y;
};

SUB_Ins.prototype.applyDouble = function(x, y) {
   return x - y;
};

var MUL_Ins = function() {
   ArithmeticOp.call(this, "MUL", SVMC.MUL);
};

MUL_Ins.prototype = 
   jslib.inheritPrototype(ArithmeticOp, "MUL_Ins extends ArithmeticOp");
MUL_Ins.prototype.constructor = MUL_Ins;
MUL_Ins.prototype.$class = 
   new Class("MUL_Ins", MUL_Ins);

MUL_Ins.prototype.applyInteger = function(x, y) {
   return x * y;
};

MUL_Ins.prototype.applyDouble = function(x, y) {
   return x * y;
};

var DIV_Ins = function() {
   SVMInstruction.call(this, "DIV", SVMC.DIV);
};

DIV_Ins.prototype = 
   jslib.inheritPrototype(SVMInstruction, "DIV_Ins extends SVMInstruction");
DIV_Ins.prototype.constructor = DIV_Ins;
DIV_Ins.prototype.$class = 
   new Class("DIV_Ins", DIV_Ins);

DIV_Ins.prototype.execute = function(svm, addr) {
   var rhs = svm.pop();
   var lhs = svm.pop();
   if (lhs.getType() === Value.INTEGER && rhs.getType() === Value.INTEGER) {
      var num = lhs.getIntegerValue();
      var den = rhs.getIntegerValue();
      if (den !== 0 && toInt((num / den))* den === num) {
         svm.pushInteger(toInt((num / den)));
      } else {
         svm.pushDouble(num / den);
      }
   } else {
      svm.pushDouble(lhs.getDoubleValue() / rhs.getDoubleValue());
   }
};

var IDIV_Ins = function() {
   SVMInstruction.call(this, "IDIV", SVMC.IDIV);
};

IDIV_Ins.prototype = 
   jslib.inheritPrototype(SVMInstruction, "IDIV_Ins extends SVMInstruction");
IDIV_Ins.prototype.constructor = IDIV_Ins;
IDIV_Ins.prototype.$class = 
   new Class("IDIV_Ins", IDIV_Ins);

IDIV_Ins.prototype.execute = function(svm, addr) {
   var rhs = svm.pop();
   var lhs = svm.pop();
   var result = toInt((lhs.getDoubleValue() / rhs.getDoubleValue()));
   svm.pushInteger(result);
};

var REM_Ins = function() {
   SVMInstruction.call(this, "REM", SVMC.REM);
};

REM_Ins.prototype = 
   jslib.inheritPrototype(SVMInstruction, "REM_Ins extends SVMInstruction");
REM_Ins.prototype.constructor = REM_Ins;
REM_Ins.prototype.$class = 
   new Class("REM_Ins", REM_Ins);

REM_Ins.prototype.execute = function(svm, addr) {
   var rhs = svm.pop();
   var lhs = svm.pop();
   if (lhs.getType() === Value.INTEGER && rhs.getType() === Value.INTEGER) {
      var num = lhs.getIntegerValue();
      var den = rhs.getIntegerValue();
      if (den === 0) {
         svm.pushDouble(num % 0.0);
      } else {
         svm.pushInteger(num % den);
      }
   } else {
      svm.pushDouble(lhs.getDoubleValue() % rhs.getDoubleValue());
   }
};

var NEG_Ins = function() {
   SVMInstruction.call(this, "NEG", SVMC.NEG);
};

NEG_Ins.prototype = 
   jslib.inheritPrototype(SVMInstruction, "NEG_Ins extends SVMInstruction");
NEG_Ins.prototype.constructor = NEG_Ins;
NEG_Ins.prototype.$class = 
   new Class("NEG_Ins", NEG_Ins);

NEG_Ins.prototype.execute = function(svm, addr) {
   var rhs = svm.pop();
   if (rhs.getType() === Value.INTEGER) {
      var x = rhs.getIntegerValue();
      svm.pushInteger(-x);
   } else {
      var x = rhs.getDoubleValue();
      svm.pushDouble(-x);
   }
};

var EQ_Ins = function() {
   RelationalOp.call(this, "EQ", SVMC.EQ);
};

EQ_Ins.prototype = 
   jslib.inheritPrototype(RelationalOp, "EQ_Ins extends RelationalOp");
EQ_Ins.prototype.constructor = EQ_Ins;
EQ_Ins.prototype.$class = 
   new Class("EQ_Ins", EQ_Ins);

EQ_Ins.prototype.applyObject = function(x, y) {
   return x === y;
};

EQ_Ins.prototype.applyInteger = function(x, y) {
   return x === y;
};

EQ_Ins.prototype.applyDouble = function(x, y) {
   return x === y;
};

var NE_Ins = function() {
   RelationalOp.call(this, "NE", SVMC.NE);
};

NE_Ins.prototype = 
   jslib.inheritPrototype(RelationalOp, "NE_Ins extends RelationalOp");
NE_Ins.prototype.constructor = NE_Ins;
NE_Ins.prototype.$class = 
   new Class("NE_Ins", NE_Ins);

NE_Ins.prototype.applyObject = function(x, y) {
   return x !== y;
};

NE_Ins.prototype.applyInteger = function(x, y) {
   return x !== y;
};

NE_Ins.prototype.applyDouble = function(x, y) {
   return x !== y;
};

var LT_Ins = function() {
   RelationalOp.call(this, "LT", SVMC.LT);
};

LT_Ins.prototype = 
   jslib.inheritPrototype(RelationalOp, "LT_Ins extends RelationalOp");
LT_Ins.prototype.constructor = LT_Ins;
LT_Ins.prototype.$class = 
   new Class("LT_Ins", LT_Ins);

LT_Ins.prototype.applyInteger = function(x, y) {
   return x < y;
};

LT_Ins.prototype.applyDouble = function(x, y) {
   return x < y;
};

var LE_Ins = function() {
   RelationalOp.call(this, "LE", SVMC.LE);
};

LE_Ins.prototype = 
   jslib.inheritPrototype(RelationalOp, "LE_Ins extends RelationalOp");
LE_Ins.prototype.constructor = LE_Ins;
LE_Ins.prototype.$class = 
   new Class("LE_Ins", LE_Ins);

LE_Ins.prototype.applyInteger = function(x, y) {
   return x <= y;
};

LE_Ins.prototype.applyDouble = function(x, y) {
   return x <= y;
};

var GT_Ins = function() {
   RelationalOp.call(this, "GT", SVMC.GT);
};

GT_Ins.prototype = 
   jslib.inheritPrototype(RelationalOp, "GT_Ins extends RelationalOp");
GT_Ins.prototype.constructor = GT_Ins;
GT_Ins.prototype.$class = 
   new Class("GT_Ins", GT_Ins);

GT_Ins.prototype.applyInteger = function(x, y) {
   return x > y;
};

GT_Ins.prototype.applyDouble = function(x, y) {
   return x > y;
};

var GE_Ins = function() {
   RelationalOp.call(this, "GE", SVMC.GE);
};

GE_Ins.prototype = 
   jslib.inheritPrototype(RelationalOp, "GE_Ins extends RelationalOp");
GE_Ins.prototype.constructor = GE_Ins;
GE_Ins.prototype.$class = 
   new Class("GE_Ins", GE_Ins);

GE_Ins.prototype.applyInteger = function(x, y) {
   return x >= y;
};

GE_Ins.prototype.applyDouble = function(x, y) {
   return x >= y;
};

var JUMP_Ins = function() {
   SVMAddressInstruction.call(this, "JUMP", SVMC.JUMP);
};

JUMP_Ins.prototype = 
   jslib.inheritPrototype(SVMAddressInstruction, "JUMP_Ins extends SVMAddressInstruction");
JUMP_Ins.prototype.constructor = JUMP_Ins;
JUMP_Ins.prototype.$class = 
   new Class("JUMP_Ins", JUMP_Ins);

JUMP_Ins.prototype.execute = function(svm, addr) {
   svm.setPC(addr);
};

var JUMPT_Ins = function() {
   SVMAddressInstruction.call(this, "JUMPT", SVMC.JUMPT);
};

JUMPT_Ins.prototype = 
   jslib.inheritPrototype(SVMAddressInstruction, "JUMPT_Ins extends SVMAddressInstruction");
JUMPT_Ins.prototype.constructor = JUMPT_Ins;
JUMPT_Ins.prototype.$class = 
   new Class("JUMPT_Ins", JUMPT_Ins);

JUMPT_Ins.prototype.execute = function(svm, addr) {
   if (svm.popBoolean()) svm.setPC(addr);
};

var JUMPF_Ins = function() {
   SVMAddressInstruction.call(this, "JUMPF", SVMC.JUMPF);
};

JUMPF_Ins.prototype = 
   jslib.inheritPrototype(SVMAddressInstruction, "JUMPF_Ins extends SVMAddressInstruction");
JUMPF_Ins.prototype.constructor = JUMPF_Ins;
JUMPF_Ins.prototype.$class = 
   new Class("JUMPF_Ins", JUMPF_Ins);

JUMPF_Ins.prototype.execute = function(svm, addr) {
   if (!svm.popBoolean()) svm.setPC(addr);
};

var DISPATCH_Ins = function() {
   SVMInstruction.call(this, "DISPATCH", SVMC.DISPATCH);
};

DISPATCH_Ins.prototype = 
   jslib.inheritPrototype(SVMInstruction, "DISPATCH_Ins extends SVMInstruction");
DISPATCH_Ins.prototype.constructor = DISPATCH_Ins;
DISPATCH_Ins.prototype.$class = 
   new Class("DISPATCH_Ins", DISPATCH_Ins);

DISPATCH_Ins.prototype.execute = function(svm, addr) {
   svm.pushFrame();
   svm.getCurrentFrame().setReturnAddress(svm.getPC());
   svm.setPC(svm.popInteger());
};

var TRY_Ins = function() {
   SVMAddressInstruction.call(this, "TRY", SVMC.TRY);
};

TRY_Ins.prototype = 
   jslib.inheritPrototype(SVMAddressInstruction, "TRY_Ins extends SVMAddressInstruction");
TRY_Ins.prototype.constructor = TRY_Ins;
TRY_Ins.prototype.$class = 
   new Class("TRY_Ins", TRY_Ins);

TRY_Ins.prototype.execute = function(svm, addr) {
   svm.pushExceptionFrame(addr);
};

var ENDTRY_Ins = function() {
   SVMInstruction.call(this, "ENDTRY", SVMC.ENDTRY);
};

ENDTRY_Ins.prototype = 
   jslib.inheritPrototype(SVMInstruction, "ENDTRY_Ins extends SVMInstruction");
ENDTRY_Ins.prototype.constructor = ENDTRY_Ins;
ENDTRY_Ins.prototype.$class = 
   new Class("ENDTRY_Ins", ENDTRY_Ins);

ENDTRY_Ins.prototype.execute = function(svm, addr) {
   svm.popExceptionFrame();
};

var THROW_Ins = function() {
   SVMInstruction.call(this, "THROW", SVMC.THROW);
};

THROW_Ins.prototype = 
   jslib.inheritPrototype(SVMInstruction, "THROW_Ins extends SVMInstruction");
THROW_Ins.prototype.constructor = THROW_Ins;
THROW_Ins.prototype.$class = 
   new Class("THROW_Ins", THROW_Ins);

THROW_Ins.prototype.execute = function(svm, addr) {
   var v = svm.pop();
   svm.throwException(new RuntimeException(v.toString()), v);
};

var NOT_Ins = function() {
   SVMInstruction.call(this, "NOT", SVMC.NOT);
};

NOT_Ins.prototype = 
   jslib.inheritPrototype(SVMInstruction, "NOT_Ins extends SVMInstruction");
NOT_Ins.prototype.constructor = NOT_Ins;
NOT_Ins.prototype.$class = 
   new Class("NOT_Ins", NOT_Ins);

NOT_Ins.prototype.execute = function(svm, addr) {
   var v = svm.pop();
   var type = v.getType();
   if (type === Value.BOOLEAN) {
      svm.pushBoolean(!v.getBooleanValue());
   } else {
      svm.pushInteger(~v.getIntegerValue());
   }
};

var AND_Ins = function() {
   LogicalOp.call(this, "AND", SVMC.AND);
};

AND_Ins.prototype = 
   jslib.inheritPrototype(LogicalOp, "AND_Ins extends LogicalOp");
AND_Ins.prototype.constructor = AND_Ins;
AND_Ins.prototype.$class = 
   new Class("AND_Ins", AND_Ins);

AND_Ins.prototype.applyInteger = function(x, y) {
   return x & y;
};

var OR_Ins = function() {
   LogicalOp.call(this, "OR", SVMC.OR);
};

OR_Ins.prototype = 
   jslib.inheritPrototype(LogicalOp, "OR_Ins extends LogicalOp");
OR_Ins.prototype.constructor = OR_Ins;
OR_Ins.prototype.$class = 
   new Class("OR_Ins", OR_Ins);

OR_Ins.prototype.applyInteger = function(x, y) {
   return x | y;
};

var XOR_Ins = function() {
   LogicalOp.call(this, "XOR", SVMC.XOR);
};

XOR_Ins.prototype = 
   jslib.inheritPrototype(LogicalOp, "XOR_Ins extends LogicalOp");
XOR_Ins.prototype.constructor = XOR_Ins;
XOR_Ins.prototype.$class = 
   new Class("XOR_Ins", XOR_Ins);

XOR_Ins.prototype.applyInteger = function(x, y) {
   return x ^ y;
};

var LSH_Ins = function() {
   LogicalOp.call(this, "LSH", SVMC.LSH);
};

LSH_Ins.prototype = 
   jslib.inheritPrototype(LogicalOp, "LSH_Ins extends LogicalOp");
LSH_Ins.prototype.constructor = LSH_Ins;
LSH_Ins.prototype.$class = 
   new Class("LSH_Ins", LSH_Ins);

LSH_Ins.prototype.applyInteger = function(x, y) {
   return (y < 0) ? (x >>> -y) : (x << y);
};

var ASH_Ins = function() {
   LogicalOp.call(this, "ASH", SVMC.ASH);
};

ASH_Ins.prototype = 
   jslib.inheritPrototype(LogicalOp, "ASH_Ins extends LogicalOp");
ASH_Ins.prototype.constructor = ASH_Ins;
ASH_Ins.prototype.$class = 
   new Class("ASH_Ins", ASH_Ins);

ASH_Ins.prototype.applyInteger = function(x, y) {
   return (y < 0) ? (x >> -y) : (x << y);
};

var CALL_Ins = function() {
   SVMInstruction.call(this, "CALL", SVMC.CALL);
};

CALL_Ins.prototype = 
   jslib.inheritPrototype(SVMInstruction, "CALL_Ins extends SVMInstruction");
CALL_Ins.prototype.constructor = CALL_Ins;
CALL_Ins.prototype.$class = 
   new Class("CALL_Ins", CALL_Ins);

CALL_Ins.prototype.assemble = function(cv, scanner) {
   var token = scanner.nextToken();
   var type = scanner.getTokenType(token);
   if (type === TokenScanner.NUMBER) {
      cv.addWord((this.getCode() << 24) | Integer.parseInt(token));
   } else if (type === TokenScanner.WORD) {
      var next = scanner.nextToken();
      if (jslib.equals(next, ".")) {
         token += "." + scanner.nextToken();
         cv.addWord((SVMC.CALLM << 24) | cv.stringRef(token));
      } else {
         scanner.saveToken(next);
         cv.addWord((SVMC.CALL << 24) | cv.labelRef(token));
      }
   } else {
      throw new SyntaxError("Illegal argument " + token);
   }
};

CALL_Ins.prototype.execute = function(svm, addr) {
   svm.pushFrame();
   svm.getCurrentFrame().setReturnAddress(svm.getPC());
   svm.setPC(addr);
};

CALL_Ins.prototype.unparse = function(svm, addr) {
   return "CALL " + addr;
};

var CALLM_Ins = function() {
   SVMNameInstruction.call(this, "CALLM", SVMC.CALLM);
};

CALLM_Ins.prototype = 
   jslib.inheritPrototype(SVMNameInstruction, "CALLM_Ins extends SVMNameInstruction");
CALLM_Ins.prototype.constructor = CALLM_Ins;
CALLM_Ins.prototype.$class = 
   new Class("CALLM_Ins", CALLM_Ins);

CALLM_Ins.prototype.assemble = function(cv, scanner) {
   var token = scanner.nextToken();
   if (scanner.getTokenType(token) !== TokenScanner.WORD) {
      throw new SyntaxError("CALLM requires a class and method name");
   }
   scanner.verifyToken(".");
   token += "." + scanner.nextToken();
   cv.addWord((SVMC.CALLM << 24) | cv.stringRef(token));
};

CALLM_Ins.prototype.execute = function(svm, addr) {
   var name = svm.getString(addr);
   var dot = name.lastIndexOf(".");
   var cname = (dot === -1) ? this.receiverClass(svm) : name.substring(0, dot);
   var mname = name.substring(dot + 1);
   var c = SVMClass.forName(cname);
   var m = c.getMethod(mname);
   m.execute(svm, null);
};

CALLM_Ins.prototype.unparse = function(svm, addr) {
   return "CALLM " + svm.getString(addr);
};

CALLM_Ins.prototype.receiverClass = function(svm) {
   var nArgs = svm.getArgumentCount();
   return svm.peekBack(nArgs).getClassName();
};

var CALLFN_Ins = function() {
   SVMInstruction.call(this, "CALLFN", SVMC.CALLFN);
};

CALLFN_Ins.prototype = 
   jslib.inheritPrototype(SVMInstruction, "CALLFN_Ins extends SVMInstruction");
CALLFN_Ins.prototype.constructor = CALLFN_Ins;
CALLFN_Ins.prototype.$class = 
   new Class("CALLFN_Ins", CALLFN_Ins);

CALLFN_Ins.prototype.execute = function(svm, addr) {
   var fn = svm.pop();
   var type = fn.getClassName();
   if (jslib.equals(type, "FunctionClosure")) {
      var fc = fn.getValue();
      svm.pushFrame();
      var cf = svm.getCurrentFrame();
      cf.setReturnAddress(svm.getPC());
      cf.setFrameLink(fc.getFrame());
      var code = fc.getCode();
      if (code !== null) svm.setCode(code);
      svm.setPC(fc.getAddress());
   } else if (jslib.equals(type, "MethodClosure")) {
      var mc = fn.getValue();
      var receiver = mc.getReceiver();
      var c = SVMClass.forName(mc.getClassName());
      var m = c.getMethod(mc.getMethodName());
      m.execute(svm, receiver);
   } else if (jslib.equals(type, "SVMMethod")) {
      var m = fn.getValue();
      m.execute(svm, null);
   } else {
      throw new RuntimeException("Illegal function call");
   }
};

var RETURN_Ins = function() {
   SVMInstruction.call(this, "RETURN", SVMC.RETURN);
};

RETURN_Ins.prototype = 
   jslib.inheritPrototype(SVMInstruction, "RETURN_Ins extends SVMInstruction");
RETURN_Ins.prototype.constructor = RETURN_Ins;
RETURN_Ins.prototype.$class = 
   new Class("RETURN_Ins", RETURN_Ins);

RETURN_Ins.prototype.execute = function(svm, addr) {
   svm.setPC(svm.getCurrentFrame().getReturnAddress());
   svm.popFrame();
   if (svm.getCurrentFrame() === null) svm.setPC(-1);
};

var PUSHLOC_Ins = function() {
   SVMOffsetInstruction.call(this, "PUSHLOC", SVMC.PUSHLOC);
};

PUSHLOC_Ins.prototype = 
   jslib.inheritPrototype(SVMOffsetInstruction, "PUSHLOC_Ins extends SVMOffsetInstruction");
PUSHLOC_Ins.prototype.constructor = PUSHLOC_Ins;
PUSHLOC_Ins.prototype.$class = 
   new Class("PUSHLOC_Ins", PUSHLOC_Ins);

PUSHLOC_Ins.prototype.execute = function(svm, addr) {
   svm.push(svm.getCurrentFrame().getLocal(addr));
};

var POPLOC_Ins = function() {
   SVMOffsetInstruction.call(this, "POPLOC", SVMC.POPLOC);
};

POPLOC_Ins.prototype = 
   jslib.inheritPrototype(SVMOffsetInstruction, "POPLOC_Ins extends SVMOffsetInstruction");
POPLOC_Ins.prototype.constructor = POPLOC_Ins;
POPLOC_Ins.prototype.$class = 
   new Class("POPLOC_Ins", POPLOC_Ins);

POPLOC_Ins.prototype.execute = function(svm, addr) {
   svm.getCurrentFrame().setLocal(addr, svm.pop());
};

var LOCALS_Ins = function() {
   SVMOffsetInstruction.call(this, "LOCALS", SVMC.LOCALS);
};

LOCALS_Ins.prototype = 
   jslib.inheritPrototype(SVMOffsetInstruction, "LOCALS_Ins extends SVMOffsetInstruction");
LOCALS_Ins.prototype.constructor = LOCALS_Ins;
LOCALS_Ins.prototype.$class = 
   new Class("LOCALS_Ins", LOCALS_Ins);

LOCALS_Ins.prototype.execute = function(svm, addr) {
   svm.getCurrentFrame().setFrameSize(addr);
};

LOCALS_Ins.prototype.assemble = function(cv, scanner) {
   var nLocals = 0;
   while (true) {
      var token = scanner.nextToken();
      if (jslib.equals(token, "\n")) break;
      cv.defineSymbol(token, nLocals++);
   }
   scanner.saveToken("\n");
   cv.addWord((this.getCode() << 24) | nLocals);
};

var ARG_Ins = function() {
   SVMVarInstruction.call(this, "ARG", SVMC.ARG);
};

ARG_Ins.prototype = 
   jslib.inheritPrototype(SVMVarInstruction, "ARG_Ins extends SVMVarInstruction");
ARG_Ins.prototype.constructor = ARG_Ins;
ARG_Ins.prototype.$class = 
   new Class("ARG_Ins", ARG_Ins);

ARG_Ins.prototype.execute = function(svm, addr) {
   var cf = svm.getCurrentFrame();
   var name = svm.getString(addr);
   var v = svm.pop();
   cf.declareVar(name);
   cf.setVar(name, v);
};

var VAR_Ins = function() {
   SVMVarInstruction.call(this, "VAR", SVMC.VAR);
};

VAR_Ins.prototype = 
   jslib.inheritPrototype(SVMVarInstruction, "VAR_Ins extends SVMVarInstruction");
VAR_Ins.prototype.constructor = VAR_Ins;
VAR_Ins.prototype.$class = 
   new Class("VAR_Ins", VAR_Ins);

VAR_Ins.prototype.execute = function(svm, addr) {
   var cf = svm.getCurrentFrame();
   var name = svm.getString(addr);
   cf.declareVar(name);
};

var PARAMS_Ins = function() {
   SVMOffsetInstruction.call(this, "PARAMS", SVMC.PARAMS);
};

PARAMS_Ins.prototype = 
   jslib.inheritPrototype(SVMOffsetInstruction, "PARAMS_Ins extends SVMOffsetInstruction");
PARAMS_Ins.prototype.constructor = PARAMS_Ins;
PARAMS_Ins.prototype.$class = 
   new Class("PARAMS_Ins", PARAMS_Ins);

PARAMS_Ins.prototype.execute = function(svm, addr) {
   var nParams = addr;
   addr = svm.getCurrentFrame().getReturnAddress();
   var ins = svm.get(addr);
   if (((ins >> 24) & 0xFF) === SVMC.NARGS) {
      var nArgs = ins & 0xFFFFFF;
      svm.checkArgumentCount(nArgs, nParams);
      svm.setStackBase(nArgs);
   }
};

var NARGS_Ins = function() {
   SVMOffsetInstruction.call(this, "NARGS", SVMC.NARGS);
};

NARGS_Ins.prototype = 
   jslib.inheritPrototype(SVMOffsetInstruction, "NARGS_Ins extends SVMOffsetInstruction");
NARGS_Ins.prototype.constructor = NARGS_Ins;
NARGS_Ins.prototype.$class = 
   new Class("NARGS_Ins", NARGS_Ins);

NARGS_Ins.prototype.execute = function(svm, addr) {
   /* Empty */
};

var VARGS_Ins = function() {
   SVMInstruction.call(this, "VARGS", SVMC.VARGS);
};

VARGS_Ins.prototype = 
   jslib.inheritPrototype(SVMInstruction, "VARGS_Ins extends SVMInstruction");
VARGS_Ins.prototype.constructor = VARGS_Ins;
VARGS_Ins.prototype.$class = 
   new Class("VARGS_Ins", VARGS_Ins);

VARGS_Ins.prototype.execute = function(svm, addr) {
   addr = svm.getCurrentFrame().getReturnAddress();
   var ins = svm.get(addr);
   var args = new SVMArray();
   if (((ins >> 24) & 0xFF) === SVMC.NARGS) {
      var nArgs = ins & 0xFFFFFF;
      for (var i = 0; i < nArgs; i++) {
         args.add(0, svm.pop());
      }
   }
   svm.push(Value.createObject(args, "Array"));
};

var PUSHVAR_Ins = function() {
   SVMVarInstruction.call(this, "PUSHVAR", SVMC.PUSHVAR);
};

PUSHVAR_Ins.prototype = 
   jslib.inheritPrototype(SVMVarInstruction, "PUSHVAR_Ins extends SVMVarInstruction");
PUSHVAR_Ins.prototype.constructor = PUSHVAR_Ins;
PUSHVAR_Ins.prototype.$class = 
   new Class("PUSHVAR_Ins", PUSHVAR_Ins);

PUSHVAR_Ins.prototype.execute = function(svm, addr) {
   var cf = svm.getCurrentFrame();
   var name = svm.getString(addr);
   while (cf !== null) {
      if (cf.isDeclared(name)) {
         svm.push(cf.getVar(name));
         return;
      }
      cf = cf.getFrameLink();
   }
   if (svm.isGlobal(name)) {
      svm.push(svm.getGlobal(name));
   } else {
      throw new RuntimeException(name + " has not been declared");
   }
};

var POPVAR_Ins = function() {
   SVMVarInstruction.call(this, "POPVAR", SVMC.POPVAR);
};

POPVAR_Ins.prototype = 
   jslib.inheritPrototype(SVMVarInstruction, "POPVAR_Ins extends SVMVarInstruction");
POPVAR_Ins.prototype.constructor = POPVAR_Ins;
POPVAR_Ins.prototype.$class = 
   new Class("POPVAR_Ins", POPVAR_Ins);

POPVAR_Ins.prototype.execute = function(svm, addr) {
   var cf = svm.getCurrentFrame();
   var name = svm.getString(addr);
   while (cf !== null) {
      if (cf.isDeclared(name)) {
         cf.setVar(name, svm.pop());
         return;
      }
      cf = cf.getFrameLink();
   }
   if (svm.isGlobal(name)) {
      svm.setGlobal(name, svm.pop());
   } else {
      throw new RuntimeException(name + " has not been declared");
   }
};


/* SVMMethodClosure.js */

var SVMMethodClosure = function(receiver, className, methodName) {
   this.receiver = receiver;
   this.className = className;
   this.methodName = methodName;
};

SVMMethodClosure.prototype.getReceiver = function() {
   return this.receiver;
};

SVMMethodClosure.prototype.getClassName = function() {
   return this.className;
};

SVMMethodClosure.prototype.getMethodName = function() {
   return this.methodName;
};

SVMMethodClosure.prototype.toString = function() {
   return this.className + "." + this.methodName;
};


/* SVMObject.js */

var SVMObject = function() {
   TreeMap.call(this);
};

SVMObject.prototype =
   jslib.inheritPrototype(TreeMap, "SVMObject extends TreeMap");
SVMObject.prototype.constructor = SVMObject;
SVMObject.prototype.$class = 
   new Class("SVMObject", SVMObject);

SVMObject.prototype.toString = function() {
   var str = "";
   var el0 = new JSElementList(this.keySet());
   for (var ei0 = 0; ei0 < el0.size(); ei0++) {
      var key = el0.get(ei0);
      if (str.length > 0) str += ", ";
      str += key + ":" + this.get(key).toString();
   }
   return "{" + str + "}";
};


/* SVMPackage.js */

var SVMPackage = function() {
   /* Empty */
};

SVMPackage.prototype.defineClasses = function(svm) {
   /* Empty */
};


/* SVMSourceMarker.js */

var SVMSourceMarker = function(line, index) {
   this.line = line;
   this.index = index;
};

SVMSourceMarker.prototype.getSourceLine = function() {
   return this.line;
};

SVMSourceMarker.prototype.getStartingIndex = function() {
   return this.index;
};


/* SVMStackFrame.js */

var SVMStackFrame = function() {
   this.symbolTable = null;
   this.frameSize = 0;
   this.returnAddress = -1;
   this.link = null;
   this.code = null;
};

SVMStackFrame.prototype.setFrameSize = function(n) {
   this.frameSize = n;
   this.locals = jslib.newArray(n);
};

SVMStackFrame.prototype.getFrameSize = function() {
   return this.frameSize;
};

SVMStackFrame.prototype.setStackBase = function(base) {
   this.stackBase = base;
};

SVMStackFrame.prototype.getStackBase = function() {
   return this.stackBase;
};

SVMStackFrame.prototype.setCode = function(code) {
   this.code = code;
};

SVMStackFrame.prototype.getCode = function() {
   return this.code;
};

SVMStackFrame.prototype.setReturnAddress = function(addr) {
   this.returnAddress = addr;
};

SVMStackFrame.prototype.getReturnAddress = function() {
   return this.returnAddress;
};

SVMStackFrame.prototype.setSourceFile = function(filename) {
   this.sourceFile = filename;
};

SVMStackFrame.prototype.getSourceFile = function() {
   return this.sourceFile;
};

SVMStackFrame.prototype.setLocal = function(k, value) {
   this.locals[k] = value;
};

SVMStackFrame.prototype.getLocal = function(k) {
   return this.locals[k];
};

SVMStackFrame.prototype.declareVar = function(name) {
   if (this.symbolTable === null) this.symbolTable = new HashMap();
   this.symbolTable.put(name, Value.UNDEFINED);
};

SVMStackFrame.prototype.isDeclared = function(name) {
   if (this.symbolTable === null) return false;
   return this.symbolTable.containsKey(name);
};

SVMStackFrame.prototype.setVar = function(name, value) {
   if (this.symbolTable === null) this.symbolTable = new HashMap();
   this.symbolTable.put(name, value);
};

SVMStackFrame.prototype.getVar = function(name) {
   if (this.symbolTable === null) return Value.UNDEFINED;
   if (!this.symbolTable.containsKey(name)) return Value.UNDEFINED;
   return this.symbolTable.get(name);
};

SVMStackFrame.prototype.setFrameLink = function(frame) {
   this.link = frame;
};

SVMStackFrame.prototype.getFrameLink = function() {
   return this.link;
};


/* Exports */

return {
   SVM : SVM,
   SVMArray : SVMArray,
   SVMC : SVMC,
   SVMClass : SVMClass,
   SVMConsoleProgram : SVMConsoleProgram,
   SVMConstant : SVMConstant,
   SVMFunctionClosure : SVMFunctionClosure,
   SVMInstruction : SVMInstruction,
   SVMMethod : SVMMethod,
   SVMMethodClosure : SVMMethodClosure,
   SVMObject : SVMObject,
   SVMPackage : SVMPackage,
   SVMProgram : SVMProgram,
   SVMSourceMarker : SVMSourceMarker,
   SVMStackFrame : SVMStackFrame
};

});
