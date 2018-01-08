/*
 * File: vm.js
 * Created on Mon Sep 01 16:42:23 BST 2014 by java2js
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
         "java/lang",
         "java/util" ],

function(jslib,
         edu_stanford_cs_controller,
         edu_stanford_cs_exp,
         edu_stanford_cs_java2js,
         edu_stanford_cs_jsconsole,
         edu_stanford_cs_parser,
         java_lang,
         java_util) {

/* Imports */

var inheritPrototype = jslib.inheritPrototype;
var newArray = jslib.newArray;
var toInt = jslib.toInt;
var toStr = jslib.toStr;
var Controller = edu_stanford_cs_controller.Controller;
var EvalContext = edu_stanford_cs_exp.EvalContext;
var Expression = edu_stanford_cs_exp.Expression;
var Identifier = edu_stanford_cs_exp.Identifier;
var LValue = edu_stanford_cs_exp.LValue;
var Value = edu_stanford_cs_exp.Value;
var JSElementList = edu_stanford_cs_java2js.JSElementList;
var JSConsole = edu_stanford_cs_jsconsole.JSConsole;
var InfixOperator = edu_stanford_cs_parser.InfixOperator;
var Operator = edu_stanford_cs_parser.Operator;
var Class = java_lang.Class;
var RuntimeException = java_lang.RuntimeException;
var ArrayList = java_util.ArrayList;
var HashMap = java_util.HashMap;
var Stack = java_util.Stack;

/* VMInstruction.js */

var VMInstruction = function() {
   /* Empty */
};

VMInstruction.prototype.compile = function(vm, args, code) {
   throw new RuntimeException("Internal error: compile undefined");
};

VMInstruction.prototype.execute = function(vm) {
   throw new RuntimeException("Internal error: execute undefined");
};

VMInstruction.prototype.toString = function() {
   return "???";
};

VMInstruction.prototype.setTarget = function(target) {
   throw new RuntimeException("Illegal call to setTarget");
};

VMInstruction.prototype.isStatementStart = function() {
   return false;
};


/* VM.js */

var VM = function() {
   Controller.call(this);
   this.instructions = new HashMap();
   this.functions = new HashMap();
   this.valueStack = new Stack();
   this.callStack = new Stack();
   this.globals = new HashMap();
   this.console = null;
   this.cf = null;
};

VM.prototype = 
   jslib.inheritPrototype(Controller, "VM extends Controller");
VM.prototype.constructor = VM;
VM.prototype.$class = 
   new Class("VM", VM);

VM.prototype.defineInstruction = function(name, op) {
   this.instructions.put(name, op);
};

VM.prototype.setConsole = function(console) {
   this.console = console;
};

VM.prototype.getConsole = function() {
   return this.console;
};

VM.prototype.setTraceFlag = function(flag) {
   this.traceFlag = flag;
};

VM.prototype.getTraceFlag = function() {
   return this.traceFlag;
};

VM.prototype.getInstruction = function(name) {
   return this.instructions.get(name);
};

VM.prototype.createFrame = function() {
   return new VMFrame();
};

VM.prototype.defineFunction = function(fn) {
   this.functions.put(fn.getName(), fn);
};

VM.prototype.getFunction = function(name) {
   return this.functions.get(name);
};

VM.prototype.clearStack = function() {
   this.valueStack.clear();
};

VM.prototype.isStackEmpty = function() {
   return this.valueStack.isEmpty();
};

VM.prototype.push = function(value) {
   this.valueStack.push(value);
};

VM.prototype.pop = function() {
   if (this.valueStack.isEmpty()) {
      throw new RuntimeException("Value stack is empty");
   }
   return this.valueStack.pop();
};

VM.prototype.peek = function() {
   if (this.valueStack.isEmpty()) {
      throw new RuntimeException("Value stack is empty");
   }
   return this.valueStack.peek();
};

VM.prototype.compileStatementStart = function(pos, code) {
   code.add(new StatementStart(pos));
};

VM.prototype.compileCall = function(code) {
   code.add(new CallInstruction());
};

VM.prototype.compileReturn = function(code) {
   code.add(new ReturnInstruction());
};

VM.prototype.compileDup = function(code) {
   code.add(new DupInstruction());
};

VM.prototype.compileAssign = function(code) {
   code.add(new AssignInstruction());
};

VM.prototype.compileJump = function(code) {
   var ins = new JumpInstruction();
   code.add(ins);
   return ins;
};

VM.prototype.compileJumpF = function(code) {
   var ins = new JumpFInstruction();
   code.add(ins);
   return ins;
};

VM.prototype.compileJumpT = function(code) {
   var ins = new JumpTInstruction();
   code.add(ins);
   return ins;
};

VM.prototype.compileDecl = function(id, code) {
   code.add(new DeclInstruction(id));
};

VM.prototype.compilePushFunction = function(name, code) {
   code.add(new PushFunctionInstruction(name));
};

VM.prototype.compilePushConstant = function(value, code) {
   code.add(new PushConstantInstruction(value));
};

VM.prototype.compilePushVariable = function(id, code) {
   code.add(new PushVariableInstruction(id));
};

VM.prototype.compilePushLValue = function(id, code) {
   code.add(new PushLValueInstruction(id));
};

VM.prototype.compilePop = function(code) {
   code.add(new PopInstruction());
};

VM.prototype.compilePopVariable = function(id, code) {
   code.add(new PopVariableInstruction(id));
};

VM.prototype.compileInfixOperator = function(op, code) {
   code.add(new InfixOpInstruction(op));
};

VM.prototype.compileExpression = function(exp, code) {
   var type = exp.getType();
   if (type === Expression.CONSTANT) {
      this.compilePushConstant(exp.getValue(), code);
   } else if (type === Expression.IDENTIFIER) {
      this.compilePushVariable(exp, code);
   } else {
      var fn = exp.getFunction();
      var args = exp.getArgs();
      if (fn.isOperator()) {
         var op = fn;
         if (!op.isCompilable()) {
            throw new RuntimeException("No compilation code for " + op);
         }
         (op).compile(this, args, code);
      } else if (fn.getType() === Expression.IDENTIFIER) {
         var name = (fn).getName();
         var n = args.length;
         for (var i = 0; i < n; i++) {
            this.compileExpression(args[i], code);
         }
         this.compilePushFunction(name, code);
         this.compileCall(code);
      } else {
         throw new RuntimeException("Illegal function call");
      }
   }
};

VM.prototype.compileLValue = function(exp, code) {
   var type = exp.getType();
   if (type === Expression.IDENTIFIER) {
      this.compilePushLValue(exp, code);
   } else {
      throw new RuntimeException("Not yet implemented");
   }
};

VM.prototype.step = function() {
   while (this.cf !== null) {
      var ins = this.fetchNextInstruction();
      if (ins === null) {
         this.popFrame();
      } else {
         if (this.console !== null && this.traceFlag) this.console.println(ins);
         ins.execute(this);
         if (ins.isStatementStart()) return;
      }
   }
};

VM.prototype.pushFrame = function(frame) {
   this.callStack.push(this.cf);
   this.cf = frame;
};

VM.prototype.popFrame = function() {
   this.cf = this.callStack.pop();
};

VM.prototype.getCurrentFrame = function() {
   return this.cf;
};

VM.prototype.getCodeWord = function(addr) {
   return (this.cf === null) ? null : this.cf.getCodeWord(addr);
};

VM.prototype.fetchNextInstruction = function() {
   if (this.cf === null) return null;
   var pc = this.cf.getPC();
   this.cf.setPC(pc + 1);
   return this.cf.getCodeWord(pc);
};

VM.prototype.getStackDepth = function() {
   return (this.cf === null) ? 0 : this.callStack.size() + 1;
};

VM.prototype.getValue = function(id) {
   if (this.cf !== null && this.cf.isDefined(id)) return this.cf.getValue(id);
   var value = this.globals.get(id.getName());
   if (value === null) {
      throw new RuntimeException("The variable " + id +
      " has not been assigned a value");
   }
   return value;
};

VM.prototype.setValue = function(id, value) {
   if (this.cf !== null && this.cf.isDefined(id)) {
      this.cf.setValue(id, value);
   } else {
      this.globals.put(id.getName(), value);
   }
};

VM.prototype.call = function(fn, args) {
   throw new RuntimeException("Illegal call");
};

VM.prototype.getInfixType = function(v1, v2) {
   switch (v1.getType()) {
    case Value.INTEGER: case Value.CHARACTER:
      switch (v2.getType()) {
       case Value.INTEGER: case Value.CHARACTER:
         return Value.INTEGER;
       case Value.DOUBLE:
         return Value.DOUBLE;
      }
      break;
    case Value.DOUBLE:
      switch (v2.getType()) {
       case Value.INTEGER: case Value.CHARACTER: case Value.DOUBLE:
         return Value.DOUBLE;
      }
      break;
   }
   throw new RuntimeException("Illegal types for " + this);
};

VM.prototype.isTrue = function(v) {
   if (v.getType() !== Value.BOOLEAN) {
      throw new RuntimeException("Illegal boolean value");
   }
   return v.getValue();
};

VM.prototype.getPC = function() {
   return this.cf.getPC();
};

VM.prototype.setPC = function(pc) {
   this.cf.setPC(pc);
};

var CallInstruction = function() {
   VMInstruction.call(this);
};

CallInstruction.prototype =
   jslib.inheritPrototype(VMInstruction, "CallInstruction extends VMInstruction");
CallInstruction.prototype.constructor = CallInstruction;
CallInstruction.prototype.$class = 
   new Class("CallInstruction", CallInstruction);

CallInstruction.prototype.execute = function(vm) {
   var name = vm.pop().getValue();
   var fn = vm.getFunction(name);
   if (fn === null) {
      throw new RuntimeException("No function named " + name);
   }
   var frame = vm.createFrame();
   frame.setCode(fn.getCode());
   vm.pushFrame(frame);
};

CallInstruction.prototype.toString = function() {
   return "call";
};

var ReturnInstruction = function() {
   VMInstruction.call(this);
};

ReturnInstruction.prototype =
   jslib.inheritPrototype(VMInstruction, "ReturnInstruction extends VMInstruction");
ReturnInstruction.prototype.constructor = ReturnInstruction;
ReturnInstruction.prototype.$class = 
   new Class("ReturnInstruction", ReturnInstruction);

ReturnInstruction.prototype.execute = function(vm) {
   vm.popFrame();
};

ReturnInstruction.prototype.toString = function() {
   return "return";
};

var PushConstantInstruction = function(value) {
   VMInstruction.call(this);
   this.value = value;
};

PushConstantInstruction.prototype = 
   jslib.inheritPrototype(VMInstruction, "PushConstantInstruction extends VMInstruction");
PushConstantInstruction.prototype.constructor = PushConstantInstruction;
PushConstantInstruction.prototype.$class = 
   new Class("PushConstantInstruction", PushConstantInstruction);

PushConstantInstruction.prototype.execute = function(vm) {
   vm.push(this.value);
};

PushConstantInstruction.prototype.toString = function() {
   return "push #" + this.value;
};

var PushVariableInstruction = function(id) {
   VMInstruction.call(this);
   this.id = id;
};

PushVariableInstruction.prototype = 
   jslib.inheritPrototype(VMInstruction, "PushVariableInstruction extends VMInstruction");
PushVariableInstruction.prototype.constructor = PushVariableInstruction;
PushVariableInstruction.prototype.$class = 
   new Class("PushVariableInstruction", PushVariableInstruction);

PushVariableInstruction.prototype.execute = function(vm) {
   vm.push(vm.getValue(this.id));
};

PushVariableInstruction.prototype.toString = function() {
   return "push " + this.id;
};

var PushLValueInstruction = function(id) {
   VMInstruction.call(this);
   this.id = id;
};

PushLValueInstruction.prototype = 
   jslib.inheritPrototype(VMInstruction, "PushLValueInstruction extends VMInstruction");
PushLValueInstruction.prototype.constructor = PushLValueInstruction;
PushLValueInstruction.prototype.$class = 
   new Class("PushLValueInstruction", PushLValueInstruction);

PushLValueInstruction.prototype.execute = function(vm) {
   vm.push(this.id.getLValue(vm));
};

PushLValueInstruction.prototype.toString = function() {
   return "push &" + this.id;
};

var PushFunctionInstruction = function(name) {
   VMInstruction.call(this);
   this.name = name;
};

PushFunctionInstruction.prototype = 
   jslib.inheritPrototype(VMInstruction, "PushFunctionInstruction extends VMInstruction");
PushFunctionInstruction.prototype.constructor = PushFunctionInstruction;
PushFunctionInstruction.prototype.$class = 
   new Class("PushFunctionInstruction", PushFunctionInstruction);

PushFunctionInstruction.prototype.execute = function(vm) {
   vm.push(Value.createString(this.name));
};

PushFunctionInstruction.prototype.toString = function() {
   return "push &" + this.name;
};

var PopInstruction = function() {
   VMInstruction.call(this);
};

PopInstruction.prototype =
   jslib.inheritPrototype(VMInstruction, "PopInstruction extends VMInstruction");
PopInstruction.prototype.constructor = PopInstruction;
PopInstruction.prototype.$class = 
   new Class("PopInstruction", PopInstruction);

PopInstruction.prototype.execute = function(vm) {
   vm.pop();
};

PopInstruction.prototype.toString = function() {
   return "pop";
};

var PopVariableInstruction = function(id) {
   VMInstruction.call(this);
   this.id = id;
};

PopVariableInstruction.prototype = 
   jslib.inheritPrototype(VMInstruction, "PopVariableInstruction extends VMInstruction");
PopVariableInstruction.prototype.constructor = PopVariableInstruction;
PopVariableInstruction.prototype.$class = 
   new Class("PopVariableInstruction", PopVariableInstruction);

PopVariableInstruction.prototype.execute = function(vm) {
   vm.setValue(this.id, vm.pop());
};

PopVariableInstruction.prototype.toString = function() {
   return "pop " + this.id;
};

var DeclInstruction = function(id) {
   VMInstruction.call(this);
   this.id = id;
};

DeclInstruction.prototype = 
   jslib.inheritPrototype(VMInstruction, "DeclInstruction extends VMInstruction");
DeclInstruction.prototype.constructor = DeclInstruction;
DeclInstruction.prototype.$class = 
   new Class("DeclInstruction", DeclInstruction);

DeclInstruction.prototype.execute = function(vm) {
   vm.getCurrentFrame().setValue(this.id, Value.UNDEFINED);
};

DeclInstruction.prototype.toString = function() {
   return "decl " + this.id;
};

var AssignInstruction = function() {
   VMInstruction.call(this);
   /* Empty */
};

AssignInstruction.prototype = 
   jslib.inheritPrototype(VMInstruction, "AssignInstruction extends VMInstruction");
AssignInstruction.prototype.constructor = AssignInstruction;
AssignInstruction.prototype.$class = 
   new Class("AssignInstruction", AssignInstruction);

AssignInstruction.prototype.execute = function(vm) {
   var rhs = vm.pop();
   var lhs = vm.pop();
   lhs.set(vm, rhs);
   vm.push(rhs);
};

AssignInstruction.prototype.toString = function() {
   return "assign";
};

var DupInstruction = function() {
   VMInstruction.call(this);
   /* Empty */
};

DupInstruction.prototype = 
   jslib.inheritPrototype(VMInstruction, "DupInstruction extends VMInstruction");
DupInstruction.prototype.constructor = DupInstruction;
DupInstruction.prototype.$class = 
   new Class("DupInstruction", DupInstruction);

DupInstruction.prototype.execute = function(vm) {
   vm.push(vm.peek());
};

DupInstruction.prototype.toString = function() {
   return "dup";
};

var JumpInstruction = function() {
   VMInstruction.call(this);
   /* Empty */
};

JumpInstruction.prototype = 
   jslib.inheritPrototype(VMInstruction, "JumpInstruction extends VMInstruction");
JumpInstruction.prototype.constructor = JumpInstruction;
JumpInstruction.prototype.$class = 
   new Class("JumpInstruction", JumpInstruction);

JumpInstruction.prototype.execute = function(vm) {
   vm.setPC(this.target);
};

JumpInstruction.prototype.toString = function() {
   return "jump " + this.target;
};

JumpInstruction.prototype.setTarget = function(target) {
   this.target = target;
};

JumpInstruction.prototype.getTarget = function() {
   return this.target;
};

var JumpTInstruction = function() {
   VMInstruction.call(this);
   /* Empty */
};

JumpTInstruction.prototype = 
   jslib.inheritPrototype(VMInstruction, "JumpTInstruction extends VMInstruction");
JumpTInstruction.prototype.constructor = JumpTInstruction;
JumpTInstruction.prototype.$class = 
   new Class("JumpTInstruction", JumpTInstruction);

JumpTInstruction.prototype.execute = function(vm) {
   if (vm.isTrue(vm.pop())) vm.setPC(this.target);
};

JumpTInstruction.prototype.toString = function() {
   return "jumpt " + this.getTarget();
};

JumpTInstruction.prototype.setTarget = function(target) {
   this.target = target;
};

JumpTInstruction.prototype.getTarget = function() {
   return this.target;
};

var JumpFInstruction = function() {
   VMInstruction.call(this);
   /* Empty */
};

JumpFInstruction.prototype = 
   jslib.inheritPrototype(VMInstruction, "JumpFInstruction extends VMInstruction");
JumpFInstruction.prototype.constructor = JumpFInstruction;
JumpFInstruction.prototype.$class = 
   new Class("JumpFInstruction", JumpFInstruction);

JumpFInstruction.prototype.execute = function(vm) {
   if (!vm.isTrue(vm.pop())) vm.setPC(this.target);
};

JumpFInstruction.prototype.toString = function() {
   return "jumpf " + this.getTarget();
};

JumpFInstruction.prototype.setTarget = function(target) {
   this.target = target;
};

JumpFInstruction.prototype.getTarget = function() {
   return this.target;
};

var StatementStart = function(pos) {
   VMInstruction.call(this);
   this.pos = pos;
};

StatementStart.prototype = 
   jslib.inheritPrototype(VMInstruction, "StatementStart extends VMInstruction");
StatementStart.prototype.constructor = StatementStart;
StatementStart.prototype.$class = 
   new Class("StatementStart", StatementStart);

StatementStart.prototype.execute = function(vm) {
   /* Empty */
};

StatementStart.prototype.toString = function() {
   return "stmt @" + this.pos;
};

StatementStart.prototype.isStatementStart = function() {
   return true;
};

var InfixOpInstruction = function(op) {
   VMInstruction.call(this);
   this.op = op;
};

InfixOpInstruction.prototype = 
   jslib.inheritPrototype(VMInstruction, "InfixOpInstruction extends VMInstruction");
InfixOpInstruction.prototype.constructor = InfixOpInstruction;
InfixOpInstruction.prototype.$class = 
   new Class("InfixOpInstruction", InfixOpInstruction);

InfixOpInstruction.prototype.execute = function(vm) {
   var rhs = vm.pop();
   var lhs = vm.pop();
   vm.push(this.op.apply2(vm, lhs, rhs));
};

InfixOpInstruction.prototype.toString = function() {
   return this.op.getName();
};


/* VMCode.js */

var VMCode = function() {
   ArrayList.call(this);
};

VMCode.prototype =
   jslib.inheritPrototype(ArrayList, "VMCode extends ArrayList");
VMCode.prototype.constructor = VMCode;
VMCode.prototype.$class = 
   new Class("VMCode", VMCode);

VMCode.prototype.toString = function() {
   var str = "";
   var el = new JSElementList(this);
   for (var ei = 0; ei < el.size(); ei++) {
      var op = el.get(ei);
      str += op + "\n";
   }
   return str;
};


/* VMFrame.js */

var VMFrame = function() {
   this.locals = new HashMap();
   this.code = null;
   this.pc = 0;
};

VMFrame.prototype.setCode = function(code) {
   this.code = code;
};

VMFrame.prototype.getCode = function() {
   return this.code;
};

VMFrame.prototype.getCodeWord = function(addr) {
   if (this.code === null || addr < 0 || addr >= this.code.size()) return null;
   return this.code.get(addr);
};

VMFrame.prototype.isDefined = function(id) {
   return this.locals.containsKey(id.getName());
};

VMFrame.prototype.getValue = function(id) {
   return this.locals.get(id.getName());
};

VMFrame.prototype.setValue = function(id, value) {
   this.locals.put(id.getName(), value);
};

VMFrame.prototype.getPC = function() {
   return this.pc;
};

VMFrame.prototype.setPC = function(pc) {
   this.pc = pc;
};


/* VMFunction.js */

var VMFunction = function(name) {
   this.name = name;
   this.params = new ArrayList();
   this.code = new VMCode();
};

VMFunction.prototype.getName = function() {
   return this.name;
};

VMFunction.prototype.addParameter = function(name) {
   this.params.add(name);
};

VMFunction.prototype.getParameterList = function() {
   var n = this.params.size();
   var array = newArray(n);
   for (var i = 0; i < n; i++) {
      array[i] = this.params.get(i);
   }
   return array;
};

VMFunction.prototype.getCode = function() {
   return this.code;
};


/* Exports */

return {
   VM : VM,
   VMCode : VMCode,
   VMFrame : VMFrame,
   VMFunction : VMFunction,
   VMInstruction : VMInstruction
};

});
