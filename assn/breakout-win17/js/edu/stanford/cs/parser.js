/*
 * File: parser.js
 * Created on Sun Mar 01 22:39:17 EST 2015 by java2js
 * --------------------------------------------------
 * This file was generated mechanically by the java2js utility.
 * Permanent edits must be made in the Java file.
 */

define([ "jslib",
         "edu/stanford/cs/exp",
         "edu/stanford/cs/java2js",
         "edu/stanford/cs/tokenscanner",
         "edu/stanford/cs/utf8",
         "java/lang",
         "java/util" ],

function(jslib,
         edu_stanford_cs_exp,
         edu_stanford_cs_java2js,
         edu_stanford_cs_tokenscanner,
         edu_stanford_cs_utf8,
         java_lang,
         java_util) {

/* Imports */

var inheritPrototype = jslib.inheritPrototype;
var newArray = jslib.newArray;
var toInt = jslib.toInt;
var toStr = jslib.toStr;
var Compound = edu_stanford_cs_exp.Compound;
var Constant = edu_stanford_cs_exp.Constant;
var EvalContext = edu_stanford_cs_exp.EvalContext;
var Expression = edu_stanford_cs_exp.Expression;
var Identifier = edu_stanford_cs_exp.Identifier;
var Value = edu_stanford_cs_exp.Value;
var JSElementList = edu_stanford_cs_java2js.JSElementList;
var TokenScanner = edu_stanford_cs_tokenscanner.TokenScanner;
var UTF8 = edu_stanford_cs_utf8.UTF8;
var Character = java_lang.Character;
var Class = java_lang.Class;
var Double = java_lang.Double;
var Integer = java_lang.Integer;
var RuntimeException = java_lang.RuntimeException;
var ArrayList = java_util.ArrayList;
var HashMap = java_util.HashMap;

/* CodeVector.js */

var CodeVector = function() {
   this.code = new ArrayList();
   this.labels = new HashMap();
   this.labelRefs = new HashMap();
   this.intRefs = new HashMap();
   this.stringRefs = new HashMap();
   this.labelCount = 0;
   this.errorHandler = null;
};

CodeVector.prototype.setErrorHandler = function(handler) {
   this.errorHandler = handler;
};

CodeVector.prototype.getErrorHandler = function() {
   return this.errorHandler;
};

CodeVector.prototype.addWord = function(word) {
   this.code.add(word);
};

CodeVector.prototype.addInstruction = function(op, addr) {
   this.addWord((op << 24) | addr);
};

CodeVector.prototype.getCurrentAddress = function() {
   return this.code.size();
};

CodeVector.prototype.newLabel = function() {
   return "$" + this.labelCount++;
};

CodeVector.prototype.defineLabel = function(name) {
   this.defineSymbol(name, this.getCurrentAddress());
};

CodeVector.prototype.defineSymbol = function(name, value) {
   this.labels.put(name, value);
};

CodeVector.prototype.isDefined = function(name) {
   return this.labels.containsKey(name);
};

CodeVector.prototype.getLabel = function(name) {
   if (this.labels.containsKey(name)) {
      return this.labels.get(name);
   } else {
      this.error("Undefined symbol " + name);
      return 0;
   }
};

CodeVector.prototype.labelRef = function(name) {
   if (this.labels.containsKey(name)) {
      return this.labels.get(name);
   } else {
      var refs = this.labelRefs.get(name);
      if (refs === null) {
         refs = new IntList();
         this.labelRefs.put(name, refs);
      }
      refs.add(this.code.size());
      return 0;
   }
};

CodeVector.prototype.stringRef = function(str) {
   var refs = this.stringRefs.get(str);
   if (refs === null) {
      refs = new IntList();
      this.stringRefs.put(str, refs);
   }
   refs.add(this.code.size());
   return 0;
};

CodeVector.prototype.intRef = function(n) {
   var refs = this.intRefs.get(n);
   if (refs === null) {
      refs = new IntList();
      this.intRefs.put(n, refs);
   }
   refs.add(this.code.size());
   return 0;
};

CodeVector.prototype.getCode = function() {
   this.resolveReferences();
   var n = this.code.size();
   var array = jslib.newArray(n);
   for (var i = 0; i < n; i++) {
      array[i] = this.code.get(i);
   }
   return array;
};

CodeVector.prototype.resolveReferences = function() {
   var el0 = new JSElementList(this.labelRefs.keySet());
   for (var ei0 = 0; ei0 < el0.size(); ei0++) {
      var name = el0.get(ei0);
      if (this.labels.containsKey(name)) {
         var refs = this.labelRefs.get(name);
         var value = this.labels.get(name);
         var el1 = new JSElementList(refs);
         for (var ei1 = 0; ei1 < el1.size(); ei1++) {
            var addr = el1.get(ei1);
            this.code.set(addr, this.code.get(addr) + value);
         }
      } else {
         this.error("Unresolved reference: " + name);
      }
   }
   var el2 = new JSElementList(this.stringRefs.keySet());
   for (var ei2 = 0; ei2 < el2.size(); ei2++) {
      var str = el2.get(ei2);
      var start = this.code.size();
      var refs = this.stringRefs.get(str);
      var words = UTF8.encode(str);
      for (var i = 0; i < words.length; i++) {
         this.code.add(words[i]);
      }
      var el3 = new JSElementList(refs);
      for (var ei3 = 0; ei3 < el3.size(); ei3++) {
         var addr = el3.get(ei3);
         this.code.set(addr, this.code.get(addr) + start);
      }
   }
   var el4 = new JSElementList(this.intRefs.keySet());
   for (var ei4 = 0; ei4 < el4.size(); ei4++) {
      var n = el4.get(ei4);
      var start = this.code.size();
      var refs = this.intRefs.get(n);
      this.code.add(n);
      var el5 = new JSElementList(refs);
      for (var ei5 = 0; ei5 < el5.size(); ei5++) {
         var addr = el5.get(ei5);
         this.code.set(addr, this.code.get(addr) + start);
      }
   }
};

CodeVector.prototype.error = function(msg) {
   if (this.errorHandler === null) {
      throw new RuntimeException(msg);
   } else {
      this.errorHandler.error(msg);
   }
};

var IntList = function() {
   ArrayList.call(this);
};

IntList.prototype =
   jslib.inheritPrototype(ArrayList, "IntList extends ArrayList");
IntList.prototype.constructor = IntList;
IntList.prototype.$class = 
   new Class("IntList", IntList);


/* Operator.js */

var Operator = function() {
   Expression.call(this);
   /* Default constructor */
};

Operator.prototype = 
   jslib.inheritPrototype(Expression, "Operator extends Expression");
Operator.prototype.constructor = Operator;
Operator.prototype.$class = 
   new Class("Operator", Operator);

Operator.prototype.isStatement = function() {
   return false;
};

Operator.prototype.setPrefixPrecedence = function(prec) {
   this.prefixPrec = prec;
};

Operator.prototype.getPrefixPrecedence = function() {
   return this.prefixPrec;
};

Operator.prototype.setInfixPrecedence = function(prec) {
   this.infixPrec = prec;
};

Operator.prototype.getInfixPrecedence = function() {
   return this.infixPrec;
};

Operator.prototype.setAssociativity = function(assoc) {
   this.associativity = assoc;
};

Operator.prototype.getAssociativity = function() {
   return this.associativity;
};

Operator.prototype.getType = function() {
   return Expression.OPERATOR;
};

Operator.prototype.isAssignmentOperator = function() {
   return false;
};

Operator.prototype.setName = function(name) {
   this.opName = name;
};

Operator.prototype.getName = function() {
   return this.opName;
};

Operator.prototype.prefixAction = function(p) {
   throw new RuntimeException("Illegal use of operator " + this);
};

Operator.prototype.infixAction = function(p, lhs) {
   throw new RuntimeException("Illegal use of operator " + this);
};

Operator.prototype.toString = function() {
   return this.opName;
};

Operator.prototype.unparse = function(p, args) {
   var parenFlag = Character.isJavaIdentifierStart(this.opName.charCodeAt(0));
   var result = "";
   switch (args.length) {
    case 0:
      result = this.opName;
      break;
    case 1:
      result = this.opName;
      if (parenFlag) result += "(";
      result += p.unparse(args[0]);
      if (parenFlag) result += ")";
      break;
    case 2:
      if (parenFlag) {
         result = this.opName + "(";
         result += p.unparse(args[0]);
         result += ", ";
         result += p.unparse(args[1]);
         result += ")";
      } else {
         result = p.unparse(args[0]);
         result += " " + this.opName + " ";
         result += p.unparse(args[1]);
      }
      break;
    default:
      throw new RuntimeException("unparse: Nonstandard operator " + this.opName);
   }
   return result;
};

Operator.prototype.apply = function(ec, args) {
   throw new RuntimeException("Undefined operator " + this.opName);
};

Operator.prototype.matches = function(name) {
   return (jslib.equals(this.opName, name));
};

Operator.prototype.compile = function(parser, args, cv) {
   throw new RuntimeException("No compile method defined for " + this.opName);
};

Operator.prototype.eval = function(ec) {
   throw new RuntimeException("Illegal evaluation of an operator");
};

Operator.prototype.isOperator = function() {
   return true;
};

Operator.LEFT = 0;
Operator.RIGHT = 1;

/* InfixForm.js */

var InfixForm = function() {
   Operator.call(this);
};

InfixForm.prototype =
   jslib.inheritPrototype(Operator, "InfixForm extends Operator");
InfixForm.prototype.constructor = InfixForm;
InfixForm.prototype.$class = 
   new Class("InfixForm", InfixForm);

InfixForm.prototype.infixAction = function(p, lhs) {
   return p.createCompound2(this, lhs, p.readE(this.getInfixPrecedence()));
};


/* InfixOperator.js */

var InfixOperator = function() {
   InfixForm.call(this);
};

InfixOperator.prototype =
   jslib.inheritPrototype(InfixForm, "InfixOperator extends InfixForm");
InfixOperator.prototype.constructor = InfixOperator;
InfixOperator.prototype.$class = 
   new Class("InfixOperator", InfixOperator);

InfixOperator.prototype.apply = function(ec, args) {
   return this.apply2(ec, args[0].eval(ec), args[1].eval(ec));
};

InfixOperator.prototype.apply2 = function(ec, lhs, rhs) {
   throw new RuntimeException("Undefined operator '" + this + "'");
};


/* NofixOperator.js */

var NofixOperator = function() {
   Operator.call(this);
};

NofixOperator.prototype =
   jslib.inheritPrototype(Operator, "NofixOperator extends Operator");
NofixOperator.prototype.constructor = NofixOperator;
NofixOperator.prototype.$class = 
   new Class("NofixOperator", NofixOperator);

NofixOperator.prototype.prefixAction = function(p) {
   return p.createCompound0(this);
};


/* Parser.js */

var Parser = function() {
   this.scanner = this.createTokenScanner();
   this.operators = new HashMap();
};

Parser.prototype.parse = function() {
   var exp = this.readE(0);
   var token = this.nextToken();
   if (!jslib.equals(token, "")) {
      throw new RuntimeException("Unexpected token: " + token);
   }
   return exp;
};

Parser.prototype.readE = function(precedence) {
   var exp = this.readT();
   var token = this.nextToken();
   while (this.takesPrecedence(token, precedence)) {
      var op = this.lookupOperator(token);
      if (op.isStatement()) {
         throw new RuntimeException("Illegal context for " + op);
      }
      exp = op.infixAction(this, exp);
      token = this.nextToken();
   }
   this.saveToken(token);
   return exp;
};

Parser.prototype.readT = function() {
   var token = this.nextToken();
   if (token === null) {
      throw new RuntimeException("Unexpected end of line");
   }
   switch (this.scanner.getTokenType(token)) {
    case TokenScanner.WORD: case TokenScanner.OPERATOR:
      var op = this.lookupOperator(token);
      if (op === null) return this.createIdentifier(token);
      if (op.isStatement()) {
         throw new RuntimeException("Illegal context for " + op);
      }
      return op.prefixAction(this);
    default:
      return this.createConstant(token);
   }
};

Parser.prototype.unparse = function(exp) {
   switch (exp.getType()) {
    case Expression.CONSTANT:
      return this.unparseConstant(exp);
    case Expression.IDENTIFIER:
      return this.unparseIdentifier(exp);
    case Expression.COMPOUND:
      var fn = exp.getFunction();
      var args = exp.getArgs();
      if (fn.getType() === Expression.OPERATOR) {
         return (fn).unparse(this, args);
      }
      var result = fn.toString();
      result += "(";
      for (var i = 0; i < args.length; i++) {
         if (i > 0) result += ",";
         result += this.unparse(args[i]);
      }
      return result + ")";
   }
   return exp.toString();
};

Parser.prototype.unparseIdentifier = function(id) {
   return id.getName();
};

Parser.prototype.unparseConstant = function(c) {
   var value = c.getValue();
   switch (value.getType()) {
    case Value.STRING:
      return Parser.unparseString(value.getValue());
    case Value.CHARACTER:
      return Parser.unparseChar(value.getValue());
    default:
      return value.toString();
   }
};

Parser.unparseString = function(str) {
   var result = "\"";
   var len = str.length;
   for (var i = 0; i < len; i++) {
      var ch = toInt(str.charCodeAt(i));
      switch (ch) {
         case toInt('\b'): result += "\\b"; break;
         case toInt('\f'): result += "\\f"; break;
         case toInt('\n'): result += "\\n"; break;
         case toInt('\r'): result += "\\r"; break;
         case toInt('\t'): result += "\\t"; break;
         case toInt('\\'): result += "\\\\"; break;
         case toInt('"'): result += "\\\""; break;
       default:
         if (ch >= 32 && ch < 127) {
            result += toStr(ch);
         } else if (ch < 256) {
            var oct = "000" + Integer.toString(ch, 8);
            result += "\\" + oct.substring(oct.length - 3);
         } else {
            var hex = "0000" + Integer.toString(ch, 16).toUpperCase();
            result += "\\u" + hex.substring(hex.length - 4);
         }
      }
   }
   return result + "\"";
};

Parser.unparseChar = function(ch) {
   var result = "'";
   switch (ch) {
      case toInt('\b'): result += "\\b"; break;
      case toInt('\f'): result += "\\f"; break;
      case toInt('\n'): result += "\\n"; break;
      case toInt('\r'): result += "\\r"; break;
      case toInt('\t'): result += "\\t"; break;
      case toInt('\\'): result += "\\\\"; break;
      case toInt('\''): result += "\\'"; break;
    default:
      if (ch >= 32 && ch < 127) {
         result += toStr(ch);
      } else if (ch < 256) {
         var oct = "000" + Integer.toString(ch, 8);
         result += "\\" + oct.substring(oct.length - 3);
      } else {
         var hex = "0000" + Integer.toString(ch, 16).toUpperCase();
         result += "\\u" + hex.substring(hex.length - 4);
      }
   }
   return result + "'";
};

Parser.prototype.compile = function(exp, cv) {
   throw new RuntimeException("No compiler defined");
};

Parser.prototype.definePrefixOperator = function(name, op, prec) {
   this.defineOperator(name, op, prec, 0, Operator.LEFT);
};

Parser.prototype.defineInfixOperator = function(name, op, prec, assoc) {
   this.defineOperator(name, op, 0, prec, assoc);
};

Parser.prototype.defineOperator = function(name, op, prefix, infix, assoc) {
   op.setName(name);
   op.setPrefixPrecedence(prefix);
   op.setInfixPrecedence(infix);
   op.setAssociativity(assoc);
   this.operators.put(name, op);
};

Parser.prototype.removeOperator = function(name) {
   this.operators.remove(name);
};

Parser.prototype.lookupOperator = function(name) {
   return this.operators.get(name);
};

Parser.prototype.getOperatorTable = function() {
   return this.operators;
};

Parser.prototype.getOperator = function(op) {
   return this.operators.get(op);
};

Parser.prototype.getTokenScanner = function() {
   return this.scanner;
};

Parser.prototype.setInput = function(str) {
   this.scanner.setInput(str);
};

Parser.prototype.hasMoreTokens = function() {
   return this.scanner.hasMoreTokens();
};

Parser.prototype.nextToken = function() {
   return this.scanner.nextToken();
};

Parser.prototype.saveToken = function(token) {
   this.scanner.saveToken(token);
};

Parser.prototype.getTokenType = function(token) {
   return this.scanner.getTokenType(token);
};

Parser.prototype.getPosition = function() {
   return this.scanner.getPosition();
};

Parser.prototype.verifyToken = function(expected) {
   this.scanner.verifyToken(expected);
};

Parser.prototype.takesPrecedence = function(token, prec) {
   if (token === null) return false;
   var op = this.lookupOperator(token);
   if (op === null) return false;
   var newprec = op.getInfixPrecedence();
   if (newprec === prec) {
      return (op.getAssociativity() === Operator.RIGHT);
   }
   return (newprec > prec);
};

Parser.prototype.createTokenScanner = function() {
   this.scanner = new TokenScanner();
   this.scanner.ignoreWhitespace();
   this.scanner.scanStrings();
   this.scanner.scanNumbers();
   return this.scanner;
};

Parser.prototype.createIdentifier = function(name) {
   return new Identifier(name);
};

Parser.prototype.createConstant = function(token) {
   var type = this.scanner.getTokenType(token);
   if (type === TokenScanner.NUMBER) {
      if (token.indexOf(".") >= 0) {
         var d = Double.parseDouble(token);
         return new Constant(new Value(Value.DOUBLE, d));
      } else {
         var i = Integer.parseInt(token);
         return new Constant(new Value(Value.INTEGER, i));
      }
   } else if (type === TokenScanner.STRING) {
      if (jslib.startsWith(token, "'")) {
         var c = this.scanner.getStringValue(token).charCodeAt(0);
         return new Constant(new Value(Value.CHARACTER, c));
      } else {
         var s = this.scanner.getStringValue(token);
         return new Constant(new Value(Value.STRING, s));
      }
   } else {
      throw new RuntimeException("Illegal constant: " + token );
   }
};

Parser.prototype.createCompound = function(op, args) {
   return new Compound(op, args);
};

Parser.prototype.createCompound0 = function(op) {
   return this.createCompound(op, jslib.newArray(0));
};

Parser.prototype.createCompound1 = function(op, a1) {
   var args = jslib.newArray(1);
   args[0] = a1;
   return this.createCompound(op, args);
};

Parser.prototype.createCompound2 = function(op, a1, a2) {
   var args = jslib.newArray(2);
   args[0] = a1;
   args[1] = a2;
   return this.createCompound(op, args);
};

Parser.prototype.createCompound3 = function(op, a1, a2, a3) {
   var args = jslib.newArray(3);
   args[0] = a1;
   args[1] = a2;
   args[2] = a3;
   return this.createCompound(op, args);
};

Parser.prototype.createCompound4 = function(op, a1, a2, a3, a4) {
   var args = jslib.newArray(4);
   args[0] = a1;
   args[1] = a2;
   args[2] = a3;
   args[3] = a4;
   return this.createCompound(op, args);
};


/* PrefixForm.js */

var PrefixForm = function() {
   Operator.call(this);
};

PrefixForm.prototype =
   jslib.inheritPrototype(Operator, "PrefixForm extends Operator");
PrefixForm.prototype.constructor = PrefixForm;
PrefixForm.prototype.$class = 
   new Class("PrefixForm", PrefixForm);

PrefixForm.prototype.prefixAction = function(p) {
   return p.createCompound1(this, p.readE(this.getPrefixPrecedence()));
};


/* PrefixOperator.js */

var PrefixOperator = function() {
   PrefixForm.call(this);
};

PrefixOperator.prototype =
   jslib.inheritPrototype(PrefixForm, "PrefixOperator extends PrefixForm");
PrefixOperator.prototype.constructor = PrefixOperator;
PrefixOperator.prototype.$class = 
   new Class("PrefixOperator", PrefixOperator);

PrefixOperator.prototype.apply = function(ec, args) {
   return this.apply1(ec, args[0].eval(ec));
};

PrefixOperator.prototype.apply1 = function(ec, rhs) {
   throw new RuntimeException("Undefined operator '" + this + "'");
};


/* StackFrame.js */

var StackFrame = function() {
   this.symbolTable = null;
   this.frameSize = 0;
   this.returnAddress = -1;
};

StackFrame.prototype.setFrameSize = function(n) {
   this.frameSize = n;
   this.locals = jslib.newArray(n);
};

StackFrame.prototype.getFrameSize = function() {
   return this.frameSize;
};

StackFrame.prototype.setStackBase = function(base) {
   this.stackBase = base;
};

StackFrame.prototype.getStackBase = function() {
   return this.stackBase;
};

StackFrame.prototype.setReturnAddress = function(addr) {
   this.returnAddress = addr;
};

StackFrame.prototype.getReturnAddress = function() {
   return this.returnAddress;
};

StackFrame.prototype.setSourceFile = function(filename) {
   this.sourceFile = filename;
};

StackFrame.prototype.getSourceFile = function() {
   return this.sourceFile;
};

StackFrame.prototype.setLocal = function(k, value) {
   this.locals[k] = value;
};

StackFrame.prototype.getLocal = function(k) {
   return this.locals[k];
};

StackFrame.prototype.declareVar = function(name) {
   if (this.symbolTable === null) this.symbolTable = new HashMap();
   this.symbolTable.put(name, Value.UNDEFINED);
};

StackFrame.prototype.isDeclared = function(name) {
   if (this.symbolTable === null) return false;
   return this.symbolTable.containsKey(name);
};

StackFrame.prototype.setVar = function(name, value) {
   if (this.symbolTable === null) this.symbolTable = new HashMap();
   this.symbolTable.put(name, value);
};

StackFrame.prototype.getVar = function(name) {
   if (this.symbolTable === null) return Value.UNDEFINED;
   if (!this.symbolTable.containsKey(name)) return Value.UNDEFINED;
   return this.symbolTable.get(name);
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


/* Exports */

return {
   CodeVector : CodeVector,
   InfixForm : InfixForm,
   InfixOperator : InfixOperator,
   NofixOperator : NofixOperator,
   Operator : Operator,
   Parser : Parser,
   PrefixForm : PrefixForm,
   PrefixOperator : PrefixOperator,
   StackFrame : StackFrame,
   Statement : Statement
};

});
