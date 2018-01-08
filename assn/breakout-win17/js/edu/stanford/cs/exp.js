/*
 * File: exp.js
 * Created on Mon Jun 08 14:14:06 PDT 2015 by java2js
 * --------------------------------------------------
 * This file was generated mechanically by the java2js utility.
 * Permanent edits must be made in the Java file.
 */

define([ "jslib",
         "java/lang" ],

function(jslib,
         java_lang) {

/* Imports */

var inheritPrototype = jslib.inheritPrototype;
var newArray = jslib.newArray;
var toInt = jslib.toInt;
var toStr = jslib.toStr;
var Class = java_lang.Class;
var RuntimeException = java_lang.RuntimeException;

/* Expression.js */

var Expression = function() {
   /* Empty */
};

Expression.prototype.getValue = function() {
   throw new RuntimeException("getValue must be called on a Constant");
};

Expression.prototype.getName = function() {
   throw new RuntimeException("getName must be called on an Identifier");
};

Expression.prototype.getFunction = function() {
   throw new RuntimeException("getFunction must be called on a Compound");
};

Expression.prototype.getArgs = function() {
   throw new RuntimeException("getArgs must be called on a Compound");
};

Expression.evalArgs = function(ec, args) {
   var actuals = jslib.newArray(args.length);
   for (var i = 0; i < args.length; i++) {
      actuals[i] = args[i].eval(ec);
   }
   return actuals;
};

Expression.prototype.getLValue = function(ec) {
   return ec.getLValue(this);
};

Expression.prototype.matches = function(str) {
   return false;
};

Expression.prototype.getClientData = function() {
   return this.data;
};

Expression.prototype.setClientData = function(data) {
   this.data = data;
};

Expression.prototype.isOperator = function() {
   return false;
};

Expression.CONSTANT = 1;
Expression.IDENTIFIER = 2;
Expression.COMPOUND = 3;
Expression.OPERATOR = 4;
Expression.FUNCTION = 5;

/* Compound.js */

var Compound = function(fn, args) {
   Expression.call(this);
   this.function = fn;
   this.arguments = args;
};

Compound.prototype = 
   jslib.inheritPrototype(Expression, "Compound extends Expression");
Compound.prototype.constructor = Compound;
Compound.prototype.$class = 
   new Class("Compound", Compound);

Compound.prototype.getFunction = function() {
   return this.function;
};

Compound.prototype.getArgs = function() {
   return this.arguments;
};

Compound.prototype.eval = function(ec) {
   return ec.evalCompound(this);
};

Compound.prototype.toString = function() {
   var result = this.function.toString();
   result += "(";
   for (var i = 0; i < this.arguments.length; i++) {
      if (i > 0) result += ",";
      result += this.arguments[i].toString();
   }
   return result + ")";
};

Compound.prototype.getType = function() {
   return Expression.COMPOUND;
};


/* Constant.js */

var Constant = function(v) {
   Expression.call(this);
   this.value = v;
};

Constant.prototype = 
   jslib.inheritPrototype(Expression, "Constant extends Expression");
Constant.prototype.constructor = Constant;
Constant.prototype.$class = 
   new Class("Constant", Constant);

Constant.prototype.getValue = function() {
   return this.value;
};

Constant.prototype.eval = function(ec) {
   return ec.evalConstant(this);
};

Constant.prototype.toString = function() {
   return this.value.toString();
};

Constant.prototype.getType = function() {
   return Expression.CONSTANT;
};


/* Identifier.js */

var Identifier = function(name) {
   Expression.call(this);
   this.name = name;
};

Identifier.prototype = 
   jslib.inheritPrototype(Expression, "Identifier extends Expression");
Identifier.prototype.constructor = Identifier;
Identifier.prototype.$class = 
   new Class("Identifier", Identifier);

Identifier.prototype.eval = function(ec) {
   return ec.evalIdentifier(this);
};

Identifier.prototype.getType = function() {
   return Expression.IDENTIFIER;
};

Identifier.prototype.getName = function() {
   return this.name;
};

Identifier.prototype.toString = function() {
   return this.name;
};

Identifier.prototype.matches = function(name) {
   return jslib.equals(this.name, name);
};


/* Value.js */

var Value = function(type, value) {
   this.type = type;
   this.value = value;
   switch (type) {
      case Value.BOOLEAN: this.className = "Boolean"; break;
      case Value.CHARACTER: this.className = "Character"; break;
      case Value.DOUBLE: this.className = "Double"; break;
      case Value.INTEGER: this.className = "Integer"; break;
      case Value.LONG: this.className = "Long"; break;
      case Value.OBJECT: this.className = "Object"; break;
      case Value.STRING: this.className = "String"; break;
   }
};

Value.prototype.getType = function() {
   return this.type;
};

Value.prototype.getClassName = function() {
   return this.className;
};

Value.prototype.setClassName = function(name) {
   this.className = name;
};

Value.prototype.getValue = function() {
   return this.value;
};

Value.prototype.toString = function() {
   if (this.value === null) return "null";
   if (this.isIntegral()) return "" + this.getIntegerValue();
   return this.value.toString();
};

Value.prototype.isIntegral = function() {
   switch (this.type) {
    case Value.INTEGER:
      return true;
    case Value.DOUBLE:
      var d = this.value;
      return (toInt(d)== d);
    default:
      return false;
   }
};

Value.prototype.isNumeric = function() {
   switch (this.type) {
    case Value.INTEGER: case Value.DOUBLE:
      return true;
    default:
      return false;
   }
};

Value.prototype.isLValue = function() {
   return false;
};

Value.prototype.getIntegerValue = function() {
   switch (this.type) {
    case Value.INTEGER:
      return this.value;
    case Value.DOUBLE:
      var d = this.value;
      if (toInt(d)== d) return toInt(d);
      throw new RuntimeException("Illegal integer");
    default:
      throw new RuntimeException("Illegal integer");
   }
};

Value.prototype.getDoubleValue = function() {
   switch (this.type) {
    case Value.INTEGER:
      return this.value;
    case Value.DOUBLE:
      return this.value;
    default:
      throw new RuntimeException("Illegal double");
   }
};

Value.prototype.getStringValue = function() {
   return this.toString();
};

Value.prototype.getBooleanValue = function() {
   if (this.type !== Value.BOOLEAN) {
      throw new RuntimeException("Illegal boolean");
   }
   return this.value;
};

Value.createInteger = function(n) {
   return new Value(Value.INTEGER, n);
};

Value.createDouble = function(d) {
   return new Value(Value.DOUBLE, d);
};

Value.createBoolean = function(b) {
   return new Value(Value.BOOLEAN, b);
};

Value.createCharacter = function(ch) {
   return new Value(Value.CHARACTER, ch);
};

Value.createString = function(s) {
   return new Value(Value.STRING, s);
};

Value.createObject = function(obj, className) {
   this.value = new Value(Value.OBJECT, obj);
   this.value.setClassName(className);
   return this.value;
};

Value.ASSIGNABLE = 'A';
Value.BOOLEAN = 'B';
Value.CHARACTER = 'C';
Value.DOUBLE = 'D';
Value.FUNCTION = 'F';
Value.INTEGER = 'I';
Value.LONG = 'L';
Value.OBJECT = 'O';
Value.REF = 'R';
Value.STRING = 'S';
Value.VOID = 'V';
Value.NULL = new Value(Value.REF, "undefined");
Value.UNDEFINED = new Value(Value.VOID, "null");

/* LValue.js */

var LValue = function() {
   Value.call(this, Value.ASSIGNABLE, null);
};

LValue.prototype = 
   jslib.inheritPrototype(Value, "LValue extends Value");
LValue.prototype.constructor = LValue;
LValue.prototype.$class = 
   new Class("LValue", LValue);

LValue.prototype.isLValue = function() {
   return true;
};


/* Exports */

return {
   Compound : Compound,
   Constant : Constant,
   Expression : Expression,
   Identifier : Identifier,
   LValue : LValue,
   Value : Value
};

});
