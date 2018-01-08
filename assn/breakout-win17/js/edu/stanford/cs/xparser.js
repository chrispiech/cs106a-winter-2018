/*
 * File: xparser.js
 * Created on Mon Dec 15 08:57:21 PST 2014 by java2js
 * --------------------------------------------------
 * This file was generated mechanically by the java2js utility.
 * Permanent edits must be made in the Java file.
 */

define([ "jslib",
         "edu/stanford/cs/exp",
         "edu/stanford/cs/parser",
         "edu/stanford/cs/tokenscanner",
         "edu/stanford/cs/vm",
         "java/lang",
         "java/util" ],

function(jslib,
         edu_stanford_cs_exp,
         edu_stanford_cs_parser,
         edu_stanford_cs_tokenscanner,
         edu_stanford_cs_vm,
         java_lang,
         java_util) {

/* Imports */

var inheritPrototype = jslib.inheritPrototype;
var newArray = jslib.newArray;
var toInt = jslib.toInt;
var toStr = jslib.toStr;
var Constant = edu_stanford_cs_exp.Constant;
var EvalContext = edu_stanford_cs_exp.EvalContext;
var Expression = edu_stanford_cs_exp.Expression;
var LValue = edu_stanford_cs_exp.LValue;
var Value = edu_stanford_cs_exp.Value;
var InfixForm = edu_stanford_cs_parser.InfixForm;
var InfixOperator = edu_stanford_cs_parser.InfixOperator;
var NofixOperator = edu_stanford_cs_parser.NofixOperator;
var Operator = edu_stanford_cs_parser.Operator;
var Parser = edu_stanford_cs_parser.Parser;
var PrefixOperator = edu_stanford_cs_parser.PrefixOperator;
var TokenScanner = edu_stanford_cs_tokenscanner.TokenScanner;
var Compilable = edu_stanford_cs_vm.Compilable;
var VM = edu_stanford_cs_vm.VM;
var VMCode = edu_stanford_cs_vm.VMCode;
var VMInstruction = edu_stanford_cs_vm.VMInstruction;
var Class = java_lang.Class;
var Double = java_lang.Double;
var Integer = java_lang.Integer;
var RuntimeException = java_lang.RuntimeException;
var ArrayList = java_util.ArrayList;

/* ArithmeticOperator.js */

var ArithmeticOperator = function() {
   InfixOperator.call(this);
};

ArithmeticOperator.prototype =
   jslib.inheritPrototype(InfixOperator, "ArithmeticOperator extends InfixOperator");
ArithmeticOperator.prototype.constructor = ArithmeticOperator;
ArithmeticOperator.prototype.$class = 
   new Class("ArithmeticOperator", ArithmeticOperator);

ArithmeticOperator.prototype.apply2 = function(ec, lhs, rhs) {
   var type = ec.getInfixType(lhs, rhs);
   if (type === Value.INTEGER) {
      var v1 = lhs.getValue();
      var v2 = rhs.getValue();
      return Value.createInteger(this.applyInteger(v1, v2));
   } else if (type === Value.DOUBLE) {
      var v1 = lhs.getValue();
      var v2 = rhs.getValue();
      return Value.createDouble(this.applyDouble(v1, v2));
   } else {
      throw new RuntimeException("Illegal types for " + this);
   }
};

ArithmeticOperator.prototype.applyInteger = function(lhs, rhs) {
   throw new RuntimeException("Illegal types for " + this);
};

ArithmeticOperator.prototype.applyDouble = function(lhs, rhs) {
   throw new RuntimeException("Illegal types for " + this);
};

ArithmeticOperator.prototype.isCompilable = function() {
   return true;
};

ArithmeticOperator.prototype.compile = function(vm, args, code) {
   vm.compileExpression(args[0], code);
   vm.compileExpression(args[1], code);
   vm.compileInfixOperator(this, code);
};


/* RelationalOperator.js */

var RelationalOperator = function() {
   InfixOperator.call(this);
};

RelationalOperator.prototype =
   jslib.inheritPrototype(InfixOperator, "RelationalOperator extends InfixOperator");
RelationalOperator.prototype.constructor = RelationalOperator;
RelationalOperator.prototype.$class = 
   new Class("RelationalOperator", RelationalOperator);

RelationalOperator.prototype.apply2 = function(ec, lhs, rhs) {
   var type = ec.getInfixType(lhs, rhs);
   if (type === Value.INTEGER) {
      var v1 = lhs.getValue();
      var v2 = rhs.getValue();
      return new Value(Value.BOOLEAN, this.applyInteger(v1, v2));
   } else if (type === Value.DOUBLE) {
      var v1 = lhs.getValue();
      var v2 = rhs.getValue();
      return Value.createBoolean(this.applyDouble(v1, v2));
   } else {
      throw new RuntimeException("Illegal types for " + this);
   }
};

RelationalOperator.prototype.isCompilable = function() {
   return true;
};

RelationalOperator.prototype.compile = function(vm, args, code) {
   vm.compileExpression(args[0], code);
   vm.compileExpression(args[1], code);
   vm.compileInfixOperator(this, code);
};

RelationalOperator.prototype.applyInteger = function(lhs, rhs) {
   throw new RuntimeException("Illegal types for " + this);
};

RelationalOperator.prototype.applyDouble = function(lhs, rhs) {
   throw new RuntimeException("Illegal types for " + this);
};


/* Statement.js */

var Statement = function() {
   Operator.call(this);
};

Statement.prototype =
   jslib.inheritPrototype(Operator, "Statement extends Operator");
Statement.prototype.constructor = Statement;
Statement.prototype.$class = 
   new Class("Statement", Statement);

Statement.prototype.apply = function(ec, args) {
   throw new RuntimeException("Statements are not expressions");
};

Statement.prototype.isStatement = function() {
   return true;
};

Statement.prototype.isCompilable = function() {
   return true;
};


/* XParser.js */

var XParser = function() {
   Parser.call(this);
   this.addOperatorTokens(this.getTokenScanner());
   this.defineOperators();
   this.defineConstants();
};

XParser.prototype = 
   jslib.inheritPrototype(Parser, "XParser extends Parser");
XParser.prototype.constructor = XParser;
XParser.prototype.$class = 
   new Class("XParser", XParser);

XParser.prototype.addOperatorTokens = function(scanner) {
   scanner.addOperator("++");
   scanner.addOperator("--");
   scanner.addOperator("==");
   scanner.addOperator("!=");
   scanner.addOperator("<=");
   scanner.addOperator(">=");
   scanner.addOperator("&&");
   scanner.addOperator("||");
   scanner.addOperator("+=");
   scanner.addOperator("-=");
   scanner.addOperator("*=");
   scanner.addOperator("/=");
   scanner.addOperator("%=");
};

XParser.prototype.defineOperators = function() {
   var LEFT = Operator.LEFT;
   var RIGHT = Operator.RIGHT;
   this.blockOperator = new BlockOperator();
   this.statementOperator = new StatementOperator();
   this.defineOperator("(", new ParenOperator(), 0, 110, RIGHT);
   this.defineOperator("+", new PlusOperator(), 100, 80, LEFT);
   this.defineOperator("-", new MinusOperator(), 100, 80, LEFT);
   this.definePrefixOperator("!", new NotOperator(), 100);
   this.defineOperator("++", new IncrementOperator(), 100, 100, RIGHT);
   this.defineOperator("--", new DecrementOperator(), 100, 100, RIGHT);
   this.defineInfixOperator("*", new StarOperator(), 90, LEFT);
   this.defineInfixOperator("/", new SlashOperator(), 90, LEFT);
   this.defineInfixOperator("%", new PercentOperator(), 90, LEFT);
   this.defineInfixOperator("<", new LessThanOperator(), 60, LEFT);
   this.defineInfixOperator("<=", new LessEqualOperator(), 60, LEFT);
   this.defineInfixOperator(">", new GreaterThanOperator(), 60, LEFT);
   this.defineInfixOperator(">=", new GreaterEqualOperator(), 60, LEFT);
   this.defineInfixOperator("==", new EqualOperator(), 50, LEFT);
   this.defineInfixOperator("!=", new NotEqualOperator(), 50, LEFT);
   this.defineInfixOperator("&&", new AndOperator(), 30, LEFT);
   this.defineInfixOperator("||", new OrOperator(), 20, LEFT);
   this.defineInfixOperator("?", new QuestionMarkColonOperator(), 15, RIGHT);
   this.defineInfixOperator("=", new AssignmentOperator(), 10, RIGHT);
   this.defineInfixOperator("+=", new PlusEqualOperator(), 10, RIGHT);
   this.defineInfixOperator("-=", new MinusEqualOperator(), 10, RIGHT);
   this.defineInfixOperator("*=", new StarEqualOperator(), 10, RIGHT);
   this.defineInfixOperator("/=", new SlashEqualOperator(), 10, RIGHT);
   this.defineInfixOperator("%=", new PercentEqualOperator(), 10, RIGHT);
   this.definePrefixOperator("+x", new UnaryPlusOperator(), 100);
   this.definePrefixOperator("-x", new UnaryMinusOperator(), 100);
   this.definePrefixOperator("x++", new SuffixIncrementOperator(), 100);
   this.definePrefixOperator("x--", new SuffixDecrementOperator(), 100);
   this.defineSubclassOperators();
};

XParser.prototype.defineSubclassOperators = function() {
   /* Empty */
};

XParser.prototype.defineConstants = function() {
   this.definePrefixOperator("false", new FalseOperator(), 100);
   this.definePrefixOperator("true", new TrueOperator(), 100);
};

XParser.prototype.readModule = function(vm) {
   throw new RuntimeException("Modules must be defined in the subclasses");
};

XParser.prototype.readStatement = function() {
   var token = this.nextToken();
   if (token === null) {
      throw new RuntimeException("Unexpected end of line");
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

XParser.prototype.readCompoundStatement = function() {
   this.verifyToken("{");
   var statements = new ArrayList();
   var token = this.nextToken();
   if (!jslib.equals(token, "}")) {
      this.saveToken(token);
      while (true) {
         statements.add(this.readStatement());
         token = this.nextToken();
         if (jslib.equals(token, "}")) break;
         if (!jslib.equals(token, ",")) {
            throw new RuntimeException("Unexpected token " + token);
         }
      }
   }
   var n = statements.size();
   var array = jslib.newArray(n);
   for (var i = 0; i < n; i++) {
      array[i] = statements.get(i);
   }
   return this.createCompound(this.blockOperator, array);
};

XParser.prototype.defineStatementForm = function(name, op) {
   this.defineOperator(name, op, 0, 0, Operator.LEFT);
};

var StatementOperator = function() {
   Operator.call(this);
};

StatementOperator.prototype =
   jslib.inheritPrototype(Operator, "StatementOperator extends Operator");
StatementOperator.prototype.constructor = StatementOperator;
StatementOperator.prototype.$class = 
   new Class("StatementOperator", StatementOperator);

StatementOperator.prototype.apply = function(ec, args) {
   if (args.length === 2) args[1].eval(ec);
   return null;
};

StatementOperator.prototype.isCompilable = function() {
   return true;
};

StatementOperator.prototype.compile = function(vm, args, code) {
   var pos = args[0].getValue().getValue();
   vm.compileStatementStart(pos, code);
   if (args.length === 2) vm.compileExpression(args[1], code);
};

var BlockOperator = function() {
   Operator.call(this);
};

BlockOperator.prototype =
   jslib.inheritPrototype(Operator, "BlockOperator extends Operator");
BlockOperator.prototype.constructor = BlockOperator;
BlockOperator.prototype.$class = 
   new Class("BlockOperator", BlockOperator);

BlockOperator.prototype.apply = function(ec, args) {
   for (var i = 0; i < args.length; i++) {
      args[i].eval(ec);
   }
   return null;
};

BlockOperator.prototype.isCompilable = function() {
   return true;
};

BlockOperator.prototype.compile = function(vm, args, code) {
   for (var i = 0; i < args.length; i++) {
      vm.compileExpression(args[i], code);
   }
};

var ParenOperator = function() {
   Operator.call(this);
};

ParenOperator.prototype =
   jslib.inheritPrototype(Operator, "ParenOperator extends Operator");
ParenOperator.prototype.constructor = ParenOperator;
ParenOperator.prototype.$class = 
   new Class("ParenOperator", ParenOperator);

ParenOperator.prototype.prefixAction = function(p) {
   var exp = p.readE(0);
   p.verifyToken(")");
   return p.createCompound1(this, exp);
};

ParenOperator.prototype.isCompilable = function() {
   return true;
};

ParenOperator.prototype.infixAction = function(p, lhs) {
   var list = new ArrayList();
   var token = p.nextToken();
   if (!jslib.equals(token, ")")) {
      p.saveToken(token);
      while (true) {
         var exp = p.readE(0);
         list.add(exp);
         token = p.nextToken();
         if (jslib.equals(token, ")")) break;
         if (!jslib.equals(token, ",")) {
            throw new RuntimeException("Found '" + token +
            "' when expecting ',' or ')'");
         }
      }
   }
   var args = jslib.newArray(list.size());
   for (var i = 0; i < args.length; i++) {
      args[i] = list.get(i);
   }
   return p.createCompound(lhs, args);
};

ParenOperator.prototype.compile = function(vm, args, code) {
   vm.compileExpression(args[0], code);
};

ParenOperator.prototype.apply = function(ec, args) {
   return args[0].eval(ec);
};

ParenOperator.prototype.unparse = function(p, args) {
   return "(" + p.unparse(args[0]) + ")";
};

var AssignmentOperator = function() {
   InfixForm.call(this);
};

AssignmentOperator.prototype =
   jslib.inheritPrototype(InfixForm, "AssignmentOperator extends InfixForm");
AssignmentOperator.prototype.constructor = AssignmentOperator;
AssignmentOperator.prototype.$class = 
   new Class("AssignmentOperator", AssignmentOperator);

AssignmentOperator.prototype.apply = function(ec, args) {
   var lhs = args[0].getLValue(ec);
   var rhs = args[1].eval(ec);
   lhs.set(ec, rhs);
   return rhs;
};

AssignmentOperator.prototype.isCompilable = function() {
   return true;
};

AssignmentOperator.prototype.compile = function(vm, args, code) {
   vm.compileLValue(args[0], code);
   vm.compileExpression(args[1], code);
   vm.compileAssign(code);
};

AssignmentOperator.prototype.isAssignmentOperator = function() {
   return true;
};

var IncrementOperator = function() {
   Operator.call(this);
};

IncrementOperator.prototype =
   jslib.inheritPrototype(Operator, "IncrementOperator extends Operator");
IncrementOperator.prototype.constructor = IncrementOperator;
IncrementOperator.prototype.$class = 
   new Class("IncrementOperator", IncrementOperator);

IncrementOperator.prototype.prefixAction = function(p) {
   return p.createCompound1(this, p.readE(this.getPrefixPrecedence()));
};

IncrementOperator.prototype.infixAction = function(p, lhs) {
   return p.createCompound1(p.getOperator("x++"), lhs);
};

IncrementOperator.prototype.apply = function(ec, args) {
   var target = args[0].getLValue(ec);
   var old = target.get(ec);
   var value = old;
   switch (value.getType()) {
    case Value.CHARACTER:
      value = Value.createCharacter(toStr((old.getValue() + 1)));
      break;
    case Value.DOUBLE:
      value = Value.createDouble(old.getValue() + 1);
      break;
    case Value.INTEGER:
      value = Value.createInteger(old.getValue() + 1);
      break;
    default:
      throw new RuntimeException("Illegal types for ++");
   }
   target.set(ec, value);
   return value;
};

IncrementOperator.prototype.unparse = function(p, args) {
   return this.toString() + p.unparse(args[0]);
};

var DecrementOperator = function() {
   Operator.call(this);
};

DecrementOperator.prototype =
   jslib.inheritPrototype(Operator, "DecrementOperator extends Operator");
DecrementOperator.prototype.constructor = DecrementOperator;
DecrementOperator.prototype.$class = 
   new Class("DecrementOperator", DecrementOperator);

DecrementOperator.prototype.prefixAction = function(p) {
   return p.createCompound1(this, p.readE(this.getPrefixPrecedence()));
};

DecrementOperator.prototype.infixAction = function(p, lhs) {
   return p.createCompound1(p.getOperator("x--"), lhs);
};

DecrementOperator.prototype.apply = function(ec, args) {
   var target = args[0].getLValue(ec);
   var old = target.get(ec);
   var value = old;
   switch (value.getType()) {
    case Value.CHARACTER:
      value = Value.createCharacter(toStr((old.getValue() + 1)));
      break;
    case Value.DOUBLE:
      value = Value.createDouble(old.getValue() - 1);
      break;
    case Value.INTEGER:
      value = Value.createInteger(old.getValue() - 1);
      break;
    default:
      throw new RuntimeException("Illegal types for --");
   }
   target.set(ec, value);
   return value;
};

DecrementOperator.prototype.unparse = function(p, args) {
   return this.toString() + p.unparse(args[0]);
};

var SuffixIncrementOperator = function() {
   Operator.call(this);
};

SuffixIncrementOperator.prototype =
   jslib.inheritPrototype(Operator, "SuffixIncrementOperator extends Operator");
SuffixIncrementOperator.prototype.constructor = SuffixIncrementOperator;
SuffixIncrementOperator.prototype.$class = 
   new Class("SuffixIncrementOperator", SuffixIncrementOperator);

SuffixIncrementOperator.prototype.apply = function(ec, args) {
   var target = args[0].getLValue(ec);
   var old = target.get(ec);
   var value = old;
   switch (value.getType()) {
    case Value.CHARACTER:
      value = Value.createCharacter(toStr((old.getValue() + 1)));
      break;
    case Value.DOUBLE:
      value = Value.createDouble(old.getValue() + 1);
      break;
    case Value.INTEGER:
      value = Value.createInteger(old.getValue() + 1);
      break;
    default:
      throw new RuntimeException("Illegal types for ++");
   }
   target.set(ec, value);
   return old;
};

SuffixIncrementOperator.prototype.unparse = function(p, args) {
   return p.unparse(args[0]) + this.toString();
};

var SuffixDecrementOperator = function() {
   Operator.call(this);
};

SuffixDecrementOperator.prototype =
   jslib.inheritPrototype(Operator, "SuffixDecrementOperator extends Operator");
SuffixDecrementOperator.prototype.constructor = SuffixDecrementOperator;
SuffixDecrementOperator.prototype.$class = 
   new Class("SuffixDecrementOperator", SuffixDecrementOperator);

SuffixDecrementOperator.prototype.apply = function(ec, args) {
   var target = args[0].getLValue(ec);
   var old = target.get(ec);
   var value = old;
   switch (value.getType()) {
    case Value.CHARACTER:
      value = Value.createCharacter(toStr((old.getValue() + 1)));
      break;
    case Value.DOUBLE:
      value = Value.createDouble(old.getValue() + 1);
      break;
    case Value.INTEGER:
      value = Value.createInteger(old.getValue() + 1);
      break;
    default:
      throw new RuntimeException("Illegal types for --");
   }
   target.set(ec, value);
   return old;
};

SuffixDecrementOperator.prototype.unparse = function(p, args) {
   return p.unparse(args[0]) + this.toString();
};

var PlusOperator = function() {
   ArithmeticOperator.call(this);
};

PlusOperator.prototype =
   jslib.inheritPrototype(ArithmeticOperator, "PlusOperator extends ArithmeticOperator");
PlusOperator.prototype.constructor = PlusOperator;
PlusOperator.prototype.$class = 
   new Class("PlusOperator", PlusOperator);

PlusOperator.prototype.prefixAction = function(p) {
   return p.createCompound1(p.getOperator("+x"), p.readE(this.getPrefixPrecedence()));
};

PlusOperator.prototype.applyInteger = function(lh, rh) {
   return lh + rh;
};

PlusOperator.prototype.applyDouble = function(lh, rh) {
   return lh + rh;
};

var UnaryPlusOperator = function() {
   Operator.call(this);
};

UnaryPlusOperator.prototype =
   jslib.inheritPrototype(Operator, "UnaryPlusOperator extends Operator");
UnaryPlusOperator.prototype.constructor = UnaryPlusOperator;
UnaryPlusOperator.prototype.$class = 
   new Class("UnaryPlusOperator", UnaryPlusOperator);

UnaryPlusOperator.prototype.apply = function(ec, args) {
   return args[0].eval(ec);
};

var MinusOperator = function() {
   ArithmeticOperator.call(this);
};

MinusOperator.prototype =
   jslib.inheritPrototype(ArithmeticOperator, "MinusOperator extends ArithmeticOperator");
MinusOperator.prototype.constructor = MinusOperator;
MinusOperator.prototype.$class = 
   new Class("MinusOperator", MinusOperator);

MinusOperator.prototype.prefixAction = function(p) {
   return p.createCompound1(p.getOperator("-x"), p.readE(this.getPrefixPrecedence()));
};

MinusOperator.prototype.applyInteger = function(lh, rh) {
   return lh - rh;
};

MinusOperator.prototype.applyDouble = function(lh, rh) {
   return lh - rh;
};

var UnaryMinusOperator = function() {
   Operator.call(this);
};

UnaryMinusOperator.prototype =
   jslib.inheritPrototype(Operator, "UnaryMinusOperator extends Operator");
UnaryMinusOperator.prototype.constructor = UnaryMinusOperator;
UnaryMinusOperator.prototype.$class = 
   new Class("UnaryMinusOperator", UnaryMinusOperator);

UnaryMinusOperator.prototype.apply = function(ec, args) {
   var value = args[0].eval(ec);
   switch (value.getType()) {
    case Value.INTEGER: case Value.CHARACTER:
      return Value.createInteger(-value.getValue());
    case Value.DOUBLE:
      return Value.createDouble(-value.getValue());
   }
   throw new RuntimeException("Illegal types for unary minus");
};

var StarOperator = function() {
   ArithmeticOperator.call(this);
};

StarOperator.prototype =
   jslib.inheritPrototype(ArithmeticOperator, "StarOperator extends ArithmeticOperator");
StarOperator.prototype.constructor = StarOperator;
StarOperator.prototype.$class = 
   new Class("StarOperator", StarOperator);

StarOperator.prototype.applyInteger = function(lh, rh) {
   return lh * rh;
};

StarOperator.prototype.applyDouble = function(lh, rh) {
   return lh * rh;
};

var SlashOperator = function() {
   ArithmeticOperator.call(this);
};

SlashOperator.prototype =
   jslib.inheritPrototype(ArithmeticOperator, "SlashOperator extends ArithmeticOperator");
SlashOperator.prototype.constructor = SlashOperator;
SlashOperator.prototype.$class = 
   new Class("SlashOperator", SlashOperator);

SlashOperator.prototype.applyInteger = function(lh, rh) {
   if (rh === 0) throw new RuntimeException("Division by 0");
   return lh / rh;
};

SlashOperator.prototype.applyDouble = function(lh, rh) {
   if (rh === 0) throw new RuntimeException("Division by 0");
   return lh / rh;
};

var PercentOperator = function() {
   ArithmeticOperator.call(this);
};

PercentOperator.prototype =
   jslib.inheritPrototype(ArithmeticOperator, "PercentOperator extends ArithmeticOperator");
PercentOperator.prototype.constructor = PercentOperator;
PercentOperator.prototype.$class = 
   new Class("PercentOperator", PercentOperator);

PercentOperator.prototype.applyInteger = function(lh, rh) {
   if (rh === 0) throw new RuntimeException("Division by 0");
   return lh % rh;
};

PercentOperator.prototype.applyDouble = function(lh, rh) {
   throw new RuntimeException("Illegal to apply % to real values");
};

var PlusEqualOperator = function() {
   PlusOperator.call(this);
};

PlusEqualOperator.prototype =
   jslib.inheritPrototype(PlusOperator, "PlusEqualOperator extends PlusOperator");
PlusEqualOperator.prototype.constructor = PlusEqualOperator;
PlusEqualOperator.prototype.$class = 
   new Class("PlusEqualOperator", PlusEqualOperator);

PlusEqualOperator.prototype.apply = function(ec, args) {
   var lhs = args[0].getLValue(ec);
   var old = lhs.get(ec);
   var rhs = this.apply2(ec, old, args[1].eval(ec));
   lhs.set(ec, rhs);
   return rhs;
};

PlusEqualOperator.prototype.isAssignmentOperator = function() {
   return true;
};

var MinusEqualOperator = function() {
   MinusOperator.call(this);
};

MinusEqualOperator.prototype =
   jslib.inheritPrototype(MinusOperator, "MinusEqualOperator extends MinusOperator");
MinusEqualOperator.prototype.constructor = MinusEqualOperator;
MinusEqualOperator.prototype.$class = 
   new Class("MinusEqualOperator", MinusEqualOperator);

MinusEqualOperator.prototype.apply = function(ec, args) {
   var lhs = args[0].getLValue(ec);
   var old = lhs.get(ec);
   var rhs = this.apply2(ec, old, args[1].eval(ec));
   lhs.set(ec, rhs);
   return rhs;
};

MinusEqualOperator.prototype.isAssignmentOperator = function() {
   return true;
};

var StarEqualOperator = function() {
   StarOperator.call(this);
};

StarEqualOperator.prototype =
   jslib.inheritPrototype(StarOperator, "StarEqualOperator extends StarOperator");
StarEqualOperator.prototype.constructor = StarEqualOperator;
StarEqualOperator.prototype.$class = 
   new Class("StarEqualOperator", StarEqualOperator);

StarEqualOperator.prototype.apply = function(ec, args) {
   var lhs = args[0].getLValue(ec);
   var old = lhs.get(ec);
   var rhs = this.apply2(ec, old, args[1].eval(ec));
   lhs.set(ec, rhs);
   return rhs;
};

StarEqualOperator.prototype.isAssignmentOperator = function() {
   return true;
};

var SlashEqualOperator = function() {
   SlashOperator.call(this);
};

SlashEqualOperator.prototype =
   jslib.inheritPrototype(SlashOperator, "SlashEqualOperator extends SlashOperator");
SlashEqualOperator.prototype.constructor = SlashEqualOperator;
SlashEqualOperator.prototype.$class = 
   new Class("SlashEqualOperator", SlashEqualOperator);

SlashEqualOperator.prototype.apply = function(ec, args) {
   var lhs = args[0].getLValue(ec);
   var old = lhs.get(ec);
   var rhs = this.apply2(ec, old, args[1].eval(ec));
   lhs.set(ec, rhs);
   return rhs;
};

SlashEqualOperator.prototype.isAssignmentOperator = function() {
   return true;
};

var PercentEqualOperator = function() {
   PercentOperator.call(this);
};

PercentEqualOperator.prototype =
   jslib.inheritPrototype(PercentOperator, "PercentEqualOperator extends PercentOperator");
PercentEqualOperator.prototype.constructor = PercentEqualOperator;
PercentEqualOperator.prototype.$class = 
   new Class("PercentEqualOperator", PercentEqualOperator);

PercentEqualOperator.prototype.apply = function(ec, args) {
   var lhs = args[0].getLValue(ec);
   var old = lhs.get(ec);
   var rhs = this.apply2(ec, old, args[1].eval(ec));
   lhs.set(ec, rhs);
   return rhs;
};

PercentEqualOperator.prototype.isAssignmentOperator = function() {
   return true;
};

var LessThanOperator = function() {
   RelationalOperator.call(this);
};

LessThanOperator.prototype =
   jslib.inheritPrototype(RelationalOperator, "LessThanOperator extends RelationalOperator");
LessThanOperator.prototype.constructor = LessThanOperator;
LessThanOperator.prototype.$class = 
   new Class("LessThanOperator", LessThanOperator);

LessThanOperator.prototype.applyInteger = function(x, y) {
   return x < y;
};

LessThanOperator.prototype.applyDouble = function(x, y) {
   return x < y;
};

var LessEqualOperator = function() {
   RelationalOperator.call(this);
};

LessEqualOperator.prototype =
   jslib.inheritPrototype(RelationalOperator, "LessEqualOperator extends RelationalOperator");
LessEqualOperator.prototype.constructor = LessEqualOperator;
LessEqualOperator.prototype.$class = 
   new Class("LessEqualOperator", LessEqualOperator);

LessEqualOperator.prototype.applyInteger = function(x, y) {
   return x <= y;
};

LessEqualOperator.prototype.applyDouble = function(x, y) {
   return x <= y;
};

var GreaterThanOperator = function() {
   RelationalOperator.call(this);
};

GreaterThanOperator.prototype =
   jslib.inheritPrototype(RelationalOperator, "GreaterThanOperator extends RelationalOperator");
GreaterThanOperator.prototype.constructor = GreaterThanOperator;
GreaterThanOperator.prototype.$class = 
   new Class("GreaterThanOperator", GreaterThanOperator);

GreaterThanOperator.prototype.applyInteger = function(x, y) {
   return x > y;
};

GreaterThanOperator.prototype.applyDouble = function(x, y) {
   return x > y;
};

var GreaterEqualOperator = function() {
   RelationalOperator.call(this);
};

GreaterEqualOperator.prototype =
   jslib.inheritPrototype(RelationalOperator, "GreaterEqualOperator extends RelationalOperator");
GreaterEqualOperator.prototype.constructor = GreaterEqualOperator;
GreaterEqualOperator.prototype.$class = 
   new Class("GreaterEqualOperator", GreaterEqualOperator);

GreaterEqualOperator.prototype.applyInteger = function(x, y) {
   return x >= y;
};

GreaterEqualOperator.prototype.applyDouble = function(x, y) {
   return x >= y;
};

var EqualOperator = function() {
   RelationalOperator.call(this);
};

EqualOperator.prototype =
   jslib.inheritPrototype(RelationalOperator, "EqualOperator extends RelationalOperator");
EqualOperator.prototype.constructor = EqualOperator;
EqualOperator.prototype.$class = 
   new Class("EqualOperator", EqualOperator);

EqualOperator.prototype.applyInteger = function(x, y) {
   return x === y;
};

EqualOperator.prototype.applyDouble = function(x, y) {
   return x === y;
};

var NotEqualOperator = function() {
   RelationalOperator.call(this);
};

NotEqualOperator.prototype =
   jslib.inheritPrototype(RelationalOperator, "NotEqualOperator extends RelationalOperator");
NotEqualOperator.prototype.constructor = NotEqualOperator;
NotEqualOperator.prototype.$class = 
   new Class("NotEqualOperator", NotEqualOperator);

NotEqualOperator.prototype.applyInteger = function(x, y) {
   return x !== y;
};

NotEqualOperator.prototype.applyDouble = function(x, y) {
   return x !== y;
};

var NotOperator = function() {
   PrefixOperator.call(this);
};

NotOperator.prototype =
   jslib.inheritPrototype(PrefixOperator, "NotOperator extends PrefixOperator");
NotOperator.prototype.constructor = NotOperator;
NotOperator.prototype.$class = 
   new Class("NotOperator", NotOperator);

NotOperator.prototype.apply1 = function(ec, x) {
   return Value.createBoolean(!ec.isTrue(x));
};

var AndOperator = function() {
   InfixForm.call(this);
};

AndOperator.prototype =
   jslib.inheritPrototype(InfixForm, "AndOperator extends InfixForm");
AndOperator.prototype.constructor = AndOperator;
AndOperator.prototype.$class = 
   new Class("AndOperator", AndOperator);

AndOperator.prototype.apply = function(ec, args) {
   return Value.createBoolean(ec.isTrue(args[0].eval(ec)) && ec.isTrue(args[1].eval(ec)));
};

AndOperator.prototype.compile = function(vm, args, code) {
   vm.compileExpression(args[0], code);
   var j1 = vm.compileJumpF(code);
   vm.compileExpression(args[1], code);
   var j2 = vm.compileJump(code);
   j1.setTarget(code.size());
   vm.compilePushConstant(Value.createBoolean(false), code);
   j2.setTarget(code.size());
};

var OrOperator = function() {
   InfixForm.call(this);
};

OrOperator.prototype =
   jslib.inheritPrototype(InfixForm, "OrOperator extends InfixForm");
OrOperator.prototype.constructor = OrOperator;
OrOperator.prototype.$class = 
   new Class("OrOperator", OrOperator);

OrOperator.prototype.apply = function(ec, args) {
   return Value.createBoolean(ec.isTrue(args[0].eval(ec)) || ec.isTrue(args[1].eval(ec)));
};

OrOperator.prototype.compile = function(vm, args, code) {
   vm.compileExpression(args[0], code);
   var j1 = vm.compileJumpT(code);
   vm.compileExpression(args[1], code);
   var j2 = vm.compileJump(code);
   j1.setTarget(code.size());
   vm.compilePushConstant(Value.createBoolean(true), code);
   j2.setTarget(code.size());
};

var QuestionMarkColonOperator = function() {
   Operator.call(this);
};

QuestionMarkColonOperator.prototype =
   jslib.inheritPrototype(Operator, "QuestionMarkColonOperator extends Operator");
QuestionMarkColonOperator.prototype.constructor = QuestionMarkColonOperator;
QuestionMarkColonOperator.prototype.$class = 
   new Class("QuestionMarkColonOperator", QuestionMarkColonOperator);

QuestionMarkColonOperator.prototype.infixAction = function(p, lhs) {
   var e1 = p.readE(0);
   p.verifyToken(":");
   var e2 = p.readE(this.getInfixPrecedence());
   return p.createCompound3(this, lhs, e1, e2);
};

QuestionMarkColonOperator.prototype.compile = function(vm, args, code) {
   vm.compileExpression(args[0], code);
   var j1 = vm.compileJumpF(code);
   vm.compileExpression(args[1], code);
   var j2 = vm.compileJump(code);
   j1.setTarget(code.size());
   vm.compileExpression(args[2], code);
   j2.setTarget(code.size());
};

var FalseOperator = function() {
   NofixOperator.call(this);
};

FalseOperator.prototype =
   jslib.inheritPrototype(NofixOperator, "FalseOperator extends NofixOperator");
FalseOperator.prototype.constructor = FalseOperator;
FalseOperator.prototype.$class = 
   new Class("FalseOperator", FalseOperator);

FalseOperator.prototype.apply = function(ec, args) {
   return Value.createBoolean(false);
};

FalseOperator.prototype.compile = function(vm, args, code) {
   vm.compilePushConstant(Value.createBoolean(false), code);
};

var TrueOperator = function() {
   NofixOperator.call(this);
};

TrueOperator.prototype =
   jslib.inheritPrototype(NofixOperator, "TrueOperator extends NofixOperator");
TrueOperator.prototype.constructor = TrueOperator;
TrueOperator.prototype.$class = 
   new Class("TrueOperator", TrueOperator);

TrueOperator.prototype.apply = function(ec, args) {
   return Value.createBoolean(true);
};

TrueOperator.prototype.compile = function(vm, args, code) {
   vm.compilePushConstant(Value.createBoolean(true), code);
};


/* Exports */

return {
   ArithmeticOperator : ArithmeticOperator,
   RelationalOperator : RelationalOperator,
   Statement : Statement,
   XParser : XParser
};

});
