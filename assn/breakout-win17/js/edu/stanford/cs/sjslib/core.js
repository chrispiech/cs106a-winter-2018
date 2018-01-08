/*
 * File: core.js
 * Created on Mon Feb 08 21:55:11 PST 2016 by java2js
 * --------------------------------------------------
 * This file was generated mechanically by the java2js utility.
 * Permanent edits must be made in the Java file.
 */

define([ "jslib",
         "edu/stanford/cs/exp",
         "edu/stanford/cs/java2js",
         "edu/stanford/cs/jsconsole",
         "edu/stanford/cs/svm",
         "java/awt",
         "java/lang",
         "java/util",
         "javax/swing" ],

function(jslib,
         edu_stanford_cs_exp,
         edu_stanford_cs_java2js,
         edu_stanford_cs_jsconsole,
         edu_stanford_cs_svm,
         java_awt,
         java_lang,
         java_util,
         javax_swing) {

/* Imports */

var inheritPrototype = jslib.inheritPrototype;
var newArray = jslib.newArray;
var toInt = jslib.toInt;
var toStr = jslib.toStr;
var Value = edu_stanford_cs_exp.Value;
var JSElementList = edu_stanford_cs_java2js.JSElementList;
var JSPlatform = edu_stanford_cs_java2js.JSPlatform;
var JSProgram = edu_stanford_cs_java2js.JSProgram;
var JSConsole = edu_stanford_cs_jsconsole.JSConsole;
var SVM = edu_stanford_cs_svm.SVM;
var SVMArray = edu_stanford_cs_svm.SVMArray;
var SVMC = edu_stanford_cs_svm.SVMC;
var SVMClass = edu_stanford_cs_svm.SVMClass;
var SVMConstant = edu_stanford_cs_svm.SVMConstant;
var SVMMethod = edu_stanford_cs_svm.SVMMethod;
var SVMMethodClosure = edu_stanford_cs_svm.SVMMethodClosure;
var SVMObject = edu_stanford_cs_svm.SVMObject;
var SVMPackage = edu_stanford_cs_svm.SVMPackage;
var BorderLayout = java_awt.BorderLayout;
var Component = java_awt.Component;
var Dimension = java_awt.Dimension;
var Font = java_awt.Font;
var Character = java_lang.Character;
var Class = java_lang.Class;
var Double = java_lang.Double;
var Integer = java_lang.Integer;
var RuntimeException = java_lang.RuntimeException;
var System = java_lang.System;
var Scanner = java_util.Scanner;
var JFrame = javax_swing.JFrame;

/* SJSArrayClass.js */

var SJSArrayClass = function() {
   SVMClass.call(this);
   this.defineMethod("new", new Array_new());
   this.defineMethod("create", new Array_create());
   this.defineMethod("concat", new Array_concat());
   this.defineMethod("indexOf", new Array_indexOf());
   this.defineMethod("join", new Array_join());
   this.defineMethod("lastIndexOf", new Array_lastIndexOf());
   this.defineMethod("pop", new Array_pop());
   this.defineMethod("push", new Array_push());
   this.defineMethod("reverse", new Array_reverse());
   this.defineMethod("shift", new Array_shift());
   this.defineMethod("size", new Array_size());
   this.defineMethod("slice", new Array_slice());
   this.defineMethod("sort", new Array_sort());
   this.defineMethod("splice", new Array_splice());
   this.defineMethod("unshift", new Array_unshift());
};

SJSArrayClass.prototype = 
   jslib.inheritPrototype(SVMClass, "SJSArrayClass extends SVMClass");
SJSArrayClass.prototype.constructor = SJSArrayClass;
SJSArrayClass.prototype.$class = 
   new Class("SJSArrayClass", SJSArrayClass);

var ArrayMethod = function() {
   SVMMethod.call(this);
};

ArrayMethod.prototype =
   jslib.inheritPrototype(SVMMethod, "ArrayMethod extends SVMMethod");
ArrayMethod.prototype.constructor = ArrayMethod;
ArrayMethod.prototype.$class = 
   new Class("ArrayMethod", ArrayMethod);

ArrayMethod.prototype.getArray = function(svm, receiver) {
   if (receiver === null) {
      return svm.pop().getValue();
   } else {
      return receiver.getValue();
   }
};

var Array_new = function() {
   SVMMethod.call(this);
};

Array_new.prototype =
   jslib.inheritPrototype(SVMMethod, "Array_new extends SVMMethod");
Array_new.prototype.constructor = Array_new;
Array_new.prototype.$class = 
   new Class("Array_new", Array_new);

Array_new.prototype.execute = function(svm, receiver) {
   var array = new SVMArray();
   var nArgs = svm.getArgumentCount();
   if (nArgs < 1) {
      svm.checkSignature("Array.new", "");
   } else {
      var init = Value.UNDEFINED;
      if (nArgs === 1) {
         svm.checkSignature("Array.new", "I");
      } else {
         svm.checkSignature("Array.new", "I*");
         init = svm.pop();
      }
      var n = svm.popInteger();
      for (var i = 0; i < n; i++) {
         array.add(init);
      }
   }
   svm.push(Value.createObject(array, "Array"));
};

var Array_create = function() {
   SVMMethod.call(this);
};

Array_create.prototype =
   jslib.inheritPrototype(SVMMethod, "Array_create extends SVMMethod");
Array_create.prototype.constructor = Array_create;
Array_create.prototype.$class = 
   new Class("Array_create", Array_create);

Array_create.prototype.execute = function(svm, receiver) {
   var array = new SVMArray();
   var nArgs = svm.getArgumentCount();
   for (var i = 0; i < nArgs; i++) {
      array.add(0, svm.pop());
   }
   svm.push(Value.createObject(array, "Array"));
};

var Array_concat = function() {
   ArrayMethod.call(this);
};

Array_concat.prototype =
   jslib.inheritPrototype(ArrayMethod, "Array_concat extends ArrayMethod");
Array_concat.prototype.constructor = Array_concat;
Array_concat.prototype.$class = 
   new Class("Array_concat", Array_concat);

Array_concat.prototype.execute = function(svm, receiver) {
   var args = new SVMArray();
   var nArgs = svm.getArgumentCount();
   for (var i = 0; i < nArgs; i++) {
      args.add(0, svm.pop());
   }
   args.add(0, (receiver === null) ? svm.pop() : receiver);
   var result = new SVMArray();
   for (var i = 0; i < args.size(); i++) {
      var array = args.get(i).getValue();
      for (var j = 0; i < array.size(); j++) {
         result.add(array.get(j));
      }
   }
   svm.push(Value.createObject(result, "Array"));
};

var Array_indexOf = function() {
   ArrayMethod.call(this);
};

Array_indexOf.prototype =
   jslib.inheritPrototype(ArrayMethod, "Array_indexOf extends ArrayMethod");
Array_indexOf.prototype.constructor = Array_indexOf;
Array_indexOf.prototype.$class = 
   new Class("Array_indexOf", Array_indexOf);

Array_indexOf.prototype.execute = function(svm, receiver) {
   var nArgs = svm.getArgumentCount();
   var start = 0;
   if (nArgs === 1) {
      svm.checkSignature("Array.indexOf", "*");
   } else {
      svm.checkSignature("Array.indexOf", "*I");
      start = svm.popInteger();
   }
   var element = svm.pop().getValue();
   var array = this.getArray(svm, receiver);
   for (var i = array.getIndex(start); i < array.size(); i++) {
      if (jslib.equals(array.get(i).getValue(), element)) {
         svm.pushInteger(i);
         return;
      }
   }
   svm.pushInteger(-1);
};

var Array_join = function() {
   ArrayMethod.call(this);
};

Array_join.prototype =
   jslib.inheritPrototype(ArrayMethod, "Array_join extends ArrayMethod");
Array_join.prototype.constructor = Array_join;
Array_join.prototype.$class = 
   new Class("Array_join", Array_join);

Array_join.prototype.execute = function(svm, receiver) {
   var nArgs = svm.getArgumentCount();
   var separator = ",";
   if (nArgs === 1) {
      svm.checkSignature("Array.indexOf", "S");
      separator = svm.popString();
   }
   var result = "";
   var array = this.getArray(svm, receiver);
   for (var i = 0; i < array.size(); i++) {
      if (i > 0) result += separator;
      result += array.get(i);
   }
   svm.pushString(result);
};

var Array_lastIndexOf = function() {
   ArrayMethod.call(this);
};

Array_lastIndexOf.prototype =
   jslib.inheritPrototype(ArrayMethod, "Array_lastIndexOf extends ArrayMethod");
Array_lastIndexOf.prototype.constructor = Array_lastIndexOf;
Array_lastIndexOf.prototype.$class = 
   new Class("Array_lastIndexOf", Array_lastIndexOf);

Array_lastIndexOf.prototype.execute = function(svm, receiver) {
   var nArgs = svm.getArgumentCount();
   var start = -1;
   if (nArgs === 1) {
      svm.checkSignature("Array.lastIndexOf", "*");
   } else {
      svm.checkSignature("Array.lastIndexOf", "*I");
      start = svm.popInteger();
   }
   var element = svm.pop().getValue();
   var array = this.getArray(svm, receiver);
   for (var i = array.getIndex(start); i >= 0; i--) {
      if (jslib.equals(array.get(i).getValue(), element)) {
         svm.pushInteger(i);
         return;
      }
   }
   svm.pushInteger(-1);
};

var Array_pop = function() {
   ArrayMethod.call(this);
};

Array_pop.prototype =
   jslib.inheritPrototype(ArrayMethod, "Array_pop extends ArrayMethod");
Array_pop.prototype.constructor = Array_pop;
Array_pop.prototype.$class = 
   new Class("Array_pop", Array_pop);

Array_pop.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Array.pop", "");
   var array = this.getArray(svm, receiver);
   var n = array.size();
   if (n === 0) {
      throw new RuntimeException("pop called on empty array");
   }
   var v = array.get(n - 1);
   array.remove(n - 1);
   svm.push(v);
};

var Array_push = function() {
   ArrayMethod.call(this);
};

Array_push.prototype =
   jslib.inheritPrototype(ArrayMethod, "Array_push extends ArrayMethod");
Array_push.prototype.constructor = Array_push;
Array_push.prototype.$class = 
   new Class("Array_push", Array_push);

Array_push.prototype.execute = function(svm, receiver) {
   var args = new SVMArray();
   var nArgs = svm.getArgumentCount();
   for (var i = 0; i < nArgs; i++) {
      args.add(0, svm.pop());
   }
   var array = this.getArray(svm, receiver);
   for (var i = 0; i < args.size(); i++) {
      array.add(args.get(i));
   }
   svm.pushInteger(array.size());
};

var Array_reverse = function() {
   ArrayMethod.call(this);
};

Array_reverse.prototype =
   jslib.inheritPrototype(ArrayMethod, "Array_reverse extends ArrayMethod");
Array_reverse.prototype.constructor = Array_reverse;
Array_reverse.prototype.$class = 
   new Class("Array_reverse", Array_reverse);

Array_reverse.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Array.reverse", "");
   var array = this.getArray(svm, receiver);
   var lh = 0;
   var rh = array.size() - 1;
   while (lh < rh) {
      var v = array.get(lh);
      array.set(lh, array.get(rh));
      array.set(rh, v);
      lh++;
      rh--;
   }
};

var Array_shift = function() {
   ArrayMethod.call(this);
};

Array_shift.prototype =
   jslib.inheritPrototype(ArrayMethod, "Array_shift extends ArrayMethod");
Array_shift.prototype.constructor = Array_shift;
Array_shift.prototype.$class = 
   new Class("Array_shift", Array_shift);

Array_shift.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Array.shift", "");
   var array = this.getArray(svm, receiver);
   if (array.isEmpty()) {
      throw new RuntimeException("shift called on empty array");
   }
   var v = array.get(0);
   array.remove(0);
   svm.push(v);
};

var Array_size = function() {
   ArrayMethod.call(this);
};

Array_size.prototype =
   jslib.inheritPrototype(ArrayMethod, "Array_size extends ArrayMethod");
Array_size.prototype.constructor = Array_size;
Array_size.prototype.$class = 
   new Class("Array_size", Array_size);

Array_size.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Array.size", "");
   svm.pushInteger(this.getArray(svm, receiver).size());
};

var Array_slice = function() {
   ArrayMethod.call(this);
};

Array_slice.prototype =
   jslib.inheritPrototype(ArrayMethod, "Array_slice extends ArrayMethod");
Array_slice.prototype.constructor = Array_slice;
Array_slice.prototype.$class = 
   new Class("Array_slice", Array_slice);

Array_slice.prototype.execute = function(svm, receiver) {
   var nArgs = svm.getArgumentCount();
   var end = -1;
   if (nArgs === 1) {
      svm.checkSignature("Array.slice", "I");
   } else {
      svm.checkSignature("Array.slice", "II");
      end = svm.popInteger();
   }
   var start = svm.popInteger();
   var array = this.getArray(svm, receiver);
   start = array.getIndex(start);
   end = array.getIndex(end);
   var result = new SVMArray();
   for (var i = start; i < end; i++) {
      result.add(0, array.get(i));
   }
   svm.push(Value.createObject(result, "Array"));
};

var Array_sort = function() {
   ArrayMethod.call(this);
};

Array_sort.prototype =
   jslib.inheritPrototype(ArrayMethod, "Array_sort extends ArrayMethod");
Array_sort.prototype.constructor = Array_sort;
Array_sort.prototype.$class = 
   new Class("Array_sort", Array_sort);

Array_sort.prototype.execute = function(svm, receiver) {
   throw new RuntimeException("Not yet implemented");
};

var Array_splice = function() {
   ArrayMethod.call(this);
};

Array_splice.prototype =
   jslib.inheritPrototype(ArrayMethod, "Array_splice extends ArrayMethod");
Array_splice.prototype.constructor = Array_splice;
Array_splice.prototype.$class = 
   new Class("Array_splice", Array_splice);

Array_splice.prototype.execute = function(svm, receiver) {
   var args = new SVMArray();
   var nArgs = svm.getArgumentCount();
   for (var i = 0; i < nArgs - 2; i++) {
      args.add(0, svm.pop());
   }
   var deleteCount = svm.popInteger();
   var index = svm.popInteger();
   var array = this.getArray(svm, receiver);
   index = array.getIndex(index);
   var result = new SVMArray();
   for (var i = 0; i < deleteCount; i++) {
      result.add(args.get(index));
      result.remove(index);
   }
   for (var i = 0; i < nArgs - 2; i++) {
      result.add(index + 1, args.get(i));
   }
   svm.push(Value.createObject(result, "Array"));
};

var Array_unshift = function() {
   ArrayMethod.call(this);
};

Array_unshift.prototype =
   jslib.inheritPrototype(ArrayMethod, "Array_unshift extends ArrayMethod");
Array_unshift.prototype.constructor = Array_unshift;
Array_unshift.prototype.$class = 
   new Class("Array_unshift", Array_unshift);

Array_unshift.prototype.execute = function(svm, receiver) {
   var args = new SVMArray();
   var nArgs = svm.getArgumentCount();
   for (var i = 0; i < nArgs; i++) {
      args.add(0, svm.pop());
   }
   var array = this.getArray(svm, receiver);
   for (var i = 0; i < args.size(); i++) {
      array.add(i, args.get(i));
   }
   svm.pushInteger(array.size());
};


/* SJSCharacterClass.js */

var SJSCharacterClass = function() {
   SVMClass.call(this);
   this.defineMethod("digit", new Character_digit());
   this.defineMethod("forDigit", new Character_forDigit());
   this.defineMethod("getNumericValue", new Character_getNumericValue());
   this.defineMethod("isDigit", new Character_isDigit());
   this.defineMethod("isLetter", new Character_isLetter());
   this.defineMethod("isLetterOrDigit", new Character_isLetterOrDigit());
   this.defineMethod("isLowerCase", new Character_isLowerCase());
   this.defineMethod("isUpperCase", new Character_isUpperCase());
   this.defineMethod("isWhitespace", new Character_isWhitespace());
   this.defineMethod("toUpperCase", new Character_toUpperCase());
   this.defineMethod("toLowerCase", new Character_toLowerCase());
   this.defineMethod("toString", new Character_toString());
};

SJSCharacterClass.prototype = 
   jslib.inheritPrototype(SVMClass, "SJSCharacterClass extends SVMClass");
SJSCharacterClass.prototype.constructor = SJSCharacterClass;
SJSCharacterClass.prototype.$class = 
   new Class("SJSCharacterClass", SJSCharacterClass);

var CharacterMethod = function() {
   SVMMethod.call(this);
};

CharacterMethod.prototype =
   jslib.inheritPrototype(SVMMethod, "CharacterMethod extends SVMMethod");
CharacterMethod.prototype.constructor = CharacterMethod;
CharacterMethod.prototype.$class = 
   new Class("CharacterMethod", CharacterMethod);

CharacterMethod.prototype.popChar = function(svm) {
   var v = svm.pop();
   var type = v.getType();
   if (type === Value.INTEGER) return v.getIntegerValue();
   if (type === Value.STRING) {
      var str = v.getStringValue();
      if (str.length !== 1) {
         throw new RuntimeException("Argument must be a single character");
      }
      return toInt(str.charCodeAt(0));
   }
   throw new RuntimeException("Illegal type in Character class method");
};

var Character_digit = function() {
   CharacterMethod.call(this);
};

Character_digit.prototype =
   jslib.inheritPrototype(CharacterMethod, "Character_digit extends CharacterMethod");
Character_digit.prototype.constructor = Character_digit;
Character_digit.prototype.$class = 
   new Class("Character_digit", Character_digit);

Character_digit.prototype.execute = function(svm, receiver) {
   if (receiver !== null) {
      throw new RuntimeException("Character methods calls must be static");
   }
   svm.checkSignature("Character.digit", "*I");
   var radix = svm.popInteger();
   svm.pushInteger(Character.digit(this.popChar(svm), radix));
};

var Character_forDigit = function() {
   CharacterMethod.call(this);
};

Character_forDigit.prototype =
   jslib.inheritPrototype(CharacterMethod, "Character_forDigit extends CharacterMethod");
Character_forDigit.prototype.constructor = Character_forDigit;
Character_forDigit.prototype.$class = 
   new Class("Character_forDigit", Character_forDigit);

Character_forDigit.prototype.execute = function(svm, receiver) {
   if (receiver !== null) {
      throw new RuntimeException("Character methods calls must be static");
   }
   svm.checkSignature("Character.digit", "II");
   var radix = svm.popInteger();
   var digit = svm.popInteger();
   svm.pushString("" + toStr(Character.forDigit(digit, radix)));
};

var Character_getNumericValue = function() {
   CharacterMethod.call(this);
};

Character_getNumericValue.prototype =
   jslib.inheritPrototype(CharacterMethod, "Character_getNumericValue extends CharacterMethod");
Character_getNumericValue.prototype.constructor = Character_getNumericValue;
Character_getNumericValue.prototype.$class = 
   new Class("Character_getNumericValue", Character_getNumericValue);

Character_getNumericValue.prototype.execute = function(svm, receiver) {
   if (receiver !== null) {
      throw new RuntimeException("Character methods calls must be static");
   }
   svm.checkSignature("Character.getNumericValue", "*");
   svm.pushInteger(this.popChar(svm));
};

var Character_isDigit = function() {
   CharacterMethod.call(this);
};

Character_isDigit.prototype =
   jslib.inheritPrototype(CharacterMethod, "Character_isDigit extends CharacterMethod");
Character_isDigit.prototype.constructor = Character_isDigit;
Character_isDigit.prototype.$class = 
   new Class("Character_isDigit", Character_isDigit);

Character_isDigit.prototype.execute = function(svm, receiver) {
   if (receiver !== null) {
      throw new RuntimeException("Character methods calls must be static");
   }
   svm.checkSignature("Character.isDigit", "*");
   svm.pushBoolean(Character.isDigit(this.popChar(svm)));
};

var Character_isLetter = function() {
   CharacterMethod.call(this);
};

Character_isLetter.prototype =
   jslib.inheritPrototype(CharacterMethod, "Character_isLetter extends CharacterMethod");
Character_isLetter.prototype.constructor = Character_isLetter;
Character_isLetter.prototype.$class = 
   new Class("Character_isLetter", Character_isLetter);

Character_isLetter.prototype.execute = function(svm, receiver) {
   if (receiver !== null) {
      throw new RuntimeException("Character methods calls must be static");
   }
   svm.checkSignature("Character.isLetter", "*");
   svm.pushBoolean(Character.isLetter(this.popChar(svm)));
};

var Character_isLetterOrDigit = function() {
   CharacterMethod.call(this);
};

Character_isLetterOrDigit.prototype =
   jslib.inheritPrototype(CharacterMethod, "Character_isLetterOrDigit extends CharacterMethod");
Character_isLetterOrDigit.prototype.constructor = Character_isLetterOrDigit;
Character_isLetterOrDigit.prototype.$class = 
   new Class("Character_isLetterOrDigit", Character_isLetterOrDigit);

Character_isLetterOrDigit.prototype.execute = function(svm, receiver) {
   if (receiver !== null) {
      throw new RuntimeException("Character methods calls must be static");
   }
   svm.checkSignature("Character.isLetterOrDigit", "*");
   svm.pushBoolean(Character.isLetterOrDigit(this.popChar(svm)));
};

var Character_isLowerCase = function() {
   CharacterMethod.call(this);
};

Character_isLowerCase.prototype =
   jslib.inheritPrototype(CharacterMethod, "Character_isLowerCase extends CharacterMethod");
Character_isLowerCase.prototype.constructor = Character_isLowerCase;
Character_isLowerCase.prototype.$class = 
   new Class("Character_isLowerCase", Character_isLowerCase);

Character_isLowerCase.prototype.execute = function(svm, receiver) {
   if (receiver !== null) {
      throw new RuntimeException("Character methods calls must be static");
   }
   svm.checkSignature("Character.isLowerCase", "*");
   svm.pushBoolean(Character.isLowerCase(this.popChar(svm)));
};

var Character_isUpperCase = function() {
   CharacterMethod.call(this);
};

Character_isUpperCase.prototype =
   jslib.inheritPrototype(CharacterMethod, "Character_isUpperCase extends CharacterMethod");
Character_isUpperCase.prototype.constructor = Character_isUpperCase;
Character_isUpperCase.prototype.$class = 
   new Class("Character_isUpperCase", Character_isUpperCase);

Character_isUpperCase.prototype.execute = function(svm, receiver) {
   if (receiver !== null) {
      throw new RuntimeException("Character methods calls must be static");
   }
   svm.checkSignature("Character.isUpperCase", "*");
   svm.pushBoolean(Character.isUpperCase(this.popChar(svm)));
};

var Character_isWhitespace = function() {
   CharacterMethod.call(this);
};

Character_isWhitespace.prototype =
   jslib.inheritPrototype(CharacterMethod, "Character_isWhitespace extends CharacterMethod");
Character_isWhitespace.prototype.constructor = Character_isWhitespace;
Character_isWhitespace.prototype.$class = 
   new Class("Character_isWhitespace", Character_isWhitespace);

Character_isWhitespace.prototype.execute = function(svm, receiver) {
   if (receiver !== null) {
      throw new RuntimeException("Character methods calls must be static");
   }
   svm.checkSignature("Character.isWhitespace", "*");
   svm.pushBoolean(Character.isWhitespace(this.popChar(svm)));
};

var Character_toLowerCase = function() {
   CharacterMethod.call(this);
};

Character_toLowerCase.prototype =
   jslib.inheritPrototype(CharacterMethod, "Character_toLowerCase extends CharacterMethod");
Character_toLowerCase.prototype.constructor = Character_toLowerCase;
Character_toLowerCase.prototype.$class = 
   new Class("Character_toLowerCase", Character_toLowerCase);

Character_toLowerCase.prototype.execute = function(svm, receiver) {
   if (receiver !== null) {
      throw new RuntimeException("Character methods calls must be static");
   }
   svm.checkSignature("Character.toLowerCase", "*");
   var v = svm.pop();
   if (v.isIntegral()) {
      svm.pushInteger(Character.toLowerCase(v.getIntegerValue()));
   } else if (v.getType() === Value.STRING) {
      var str = v.getStringValue();
      if (str.length !== 1) {
         throw new RuntimeException("Value must be a single character");
      }
      svm.pushString(str.toLowerCase());
   }
};

var Character_toUpperCase = function() {
   CharacterMethod.call(this);
};

Character_toUpperCase.prototype =
   jslib.inheritPrototype(CharacterMethod, "Character_toUpperCase extends CharacterMethod");
Character_toUpperCase.prototype.constructor = Character_toUpperCase;
Character_toUpperCase.prototype.$class = 
   new Class("Character_toUpperCase", Character_toUpperCase);

Character_toUpperCase.prototype.execute = function(svm, receiver) {
   if (receiver !== null) {
      throw new RuntimeException("Character methods calls must be static");
   }
   svm.checkSignature("Character.toUpperCase", "*");
   var v = svm.pop();
   if (v.isIntegral()) {
      svm.pushInteger(Character.toUpperCase(v.getIntegerValue()));
   } else if (v.getType() === Value.STRING) {
      var str = v.getStringValue();
      if (str.length !== 1) {
         throw new RuntimeException("Value must be a single character");
      }
      svm.pushString(str.toUpperCase());
   }
};

var Character_toString = function() {
   CharacterMethod.call(this);
};

Character_toString.prototype =
   jslib.inheritPrototype(CharacterMethod, "Character_toString extends CharacterMethod");
Character_toString.prototype.constructor = Character_toString;
Character_toString.prototype.$class = 
   new Class("Character_toString", Character_toString);

Character_toString.prototype.execute = function(svm, receiver) {
   if (receiver !== null) {
      throw new RuntimeException("Character methods calls must be static");
   }
   svm.checkSignature("Character.toString", "*");
   svm.pushString("" + toStr(this.popChar(svm)));
};


/* SJSConsoleClass.js */

var SJSConsoleClass = function() {
   SVMClass.call(this);
   this.defineMethod("_init", new Console_init());
   this.defineMethod("new", new Console_new());
   this.defineMethod("print", new Console_print());
   this.defineMethod("println", new Console_println());
   this.defineMethod("showErrorMessage", new Console_showErrorMessage());
   this.defineMethod("clear", new Console_clear());
   this.defineMethod("getLine", new Console_getLine());
   this.defineMethod("getNumber", new Console_getNumber());
   this.defineMethod("getInt", new Console_getInt());
};

SJSConsoleClass.prototype = 
   jslib.inheritPrototype(SVMClass, "SJSConsoleClass extends SVMClass");
SJSConsoleClass.prototype.constructor = SJSConsoleClass;
SJSConsoleClass.prototype.$class = 
   new Class("SJSConsoleClass", SJSConsoleClass);

var Console_init = function() {
   SVMMethod.call(this);
};

Console_init.prototype =
   jslib.inheritPrototype(SVMMethod, "Console_init extends SVMMethod");
Console_init.prototype.constructor = Console_init;
Console_init.prototype.$class = 
   new Class("Console_init", Console_init);

Console_init.prototype.execute = function(svm, closure) {
   var needsConsole = false;
   if (JSPlatform.isJavaScript()) {
      needsConsole = JSPlatform.elementExists("console");
   }
   var width = SVMC.DEFAULT_CONSOLE_WIDTH;
   if (svm.isGlobal("CONSOLE_WIDTH")) {
      width = svm.getGlobal("CONSOLE_WIDTH").getIntegerValue();
      needsConsole = true;
   } else if (svm.isGlobal("GWINDOW_WIDTH")) {
      width = svm.getGlobal("GWINDOW_WIDTH").getIntegerValue();
   }
   var height = SVMC.DEFAULT_CONSOLE_HEIGHT;
   if (svm.isGlobal("CONSOLE_HEIGHT")) {
      height = svm.getGlobal("CONSOLE_HEIGHT").getIntegerValue();
      needsConsole = true;
   }
   if (needsConsole) {
      var console = new JSConsole();
      svm.setConsole(console);
      console.setPreferredSize(new Dimension(width, height));
      console.setFont(Font.decode("Courier New-Bold-14"));
      var pgm = svm.getProgram();
      if (pgm === null) {
         var frame = null;
         if (svm.isGlobal("canvas")) {
            var comp = svm.getGlobal("canvas").getValue();
            frame = comp.getParent();
         } else {
            frame = new JFrame();
            frame.setTitle(svm.getGlobalString("TITLE", "Console"));
            frame.setLayout(new BorderLayout());
         }
         frame.add(console, BorderLayout.CENTER);
         frame.pack();
         frame.setVisible(true);
      } else {
         pgm.add(console, "console");
      }
   }
};

var Console_new = function() {
   SVMMethod.call(this);
};

Console_new.prototype =
   jslib.inheritPrototype(SVMMethod, "Console_new extends SVMMethod");
Console_new.prototype.constructor = Console_new;
Console_new.prototype.$class = 
   new Class("Console_new", Console_new);

Console_new.prototype.execute = function(svm, receiver) {
   svm.push(Value.createObject(new JSConsole(), "Console"));
};

var ConsoleMethod = function() {
   SVMMethod.call(this);
};

ConsoleMethod.prototype =
   jslib.inheritPrototype(SVMMethod, "ConsoleMethod extends SVMMethod");
ConsoleMethod.prototype.constructor = ConsoleMethod;
ConsoleMethod.prototype.$class = 
   new Class("ConsoleMethod", ConsoleMethod);

ConsoleMethod.prototype.getConsole = function(svm, receiver) {
   if (receiver === null) {
      return svm.getConsole();
   } else {
      return receiver.getValue();
   }
};

var Console_print = function() {
   ConsoleMethod.call(this);
};

Console_print.prototype =
   jslib.inheritPrototype(ConsoleMethod, "Console_print extends ConsoleMethod");
Console_print.prototype.constructor = Console_print;
Console_print.prototype.$class = 
   new Class("Console_print", Console_print);

Console_print.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Console.print", "*");
   var console = this.getConsole(svm, receiver);
   if (console === null) {
      System.out.print(svm.pop());
   } else {
      console.print(svm.pop());
   }
};

var Console_println = function() {
   ConsoleMethod.call(this);
};

Console_println.prototype =
   jslib.inheritPrototype(ConsoleMethod, "Console_println extends ConsoleMethod");
Console_println.prototype.constructor = Console_println;
Console_println.prototype.$class = 
   new Class("Console_println", Console_println);

Console_println.prototype.execute = function(svm, receiver) {
   var console = this.getConsole(svm, receiver);
   if (svm.getArgumentCount() === 0) {
      if (console === null) {
         alert();
      } else {
         console.println();
      }
   } else {
      svm.checkSignature("Console.println", "*");
      if (console === null) {
         alert(svm.pop());
      } else {
         console.println(svm.pop());
      }
   }
};

var Console_showErrorMessage = function() {
   ConsoleMethod.call(this);
};

Console_showErrorMessage.prototype =
   jslib.inheritPrototype(ConsoleMethod, "Console_showErrorMessage extends ConsoleMethod");
Console_showErrorMessage.prototype.constructor = Console_showErrorMessage;
Console_showErrorMessage.prototype.$class = 
   new Class("Console_showErrorMessage", Console_showErrorMessage);

Console_showErrorMessage.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Console.showErrorMessage", "S");
   var console = this.getConsole(svm, receiver);
   if (console === null) {
      alert(svm.pop());
   } else {
      console.showErrorMessage("Error: " + svm.pop());
   }
};

var Console_clear = function() {
   ConsoleMethod.call(this);
};

Console_clear.prototype =
   jslib.inheritPrototype(ConsoleMethod, "Console_clear extends ConsoleMethod");
Console_clear.prototype.constructor = Console_clear;
Console_clear.prototype.$class = 
   new Class("Console_clear", Console_clear);

Console_clear.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Console.clear", "");
   var console = this.getConsole(svm, receiver);
   if (console !== null) console.clear();
};

var Console_getLine = function() {
   ConsoleMethod.call(this);
};

Console_getLine.prototype =
   jslib.inheritPrototype(ConsoleMethod, "Console_getLine extends ConsoleMethod");
Console_getLine.prototype.constructor = Console_getLine;
Console_getLine.prototype.$class = 
   new Class("Console_getLine", Console_getLine);

Console_getLine.prototype.execute = function(svm, receiver) {
   var prompt = null;
   if (svm.getArgumentCount() === 1) {
      svm.checkSignature("Console.getLine", "S");
      prompt = svm.popString();
   } else {
      svm.checkSignature("Console.getLine", "");
   }
   if (prompt !== null) svm.print(prompt);
   var console = this.getConsole(svm, receiver);
   if (console === null) {
      svm.push(Value.createString(new Scanner(System.in).nextLine()));
   } else {
      svm.setGlobal("CONSOLE_WAIT", Value.createString("getLine"));
      svm.setState(SVM.WAITING);
      console.requestInput("");
   }
};

var Console_getInt = function() {
   ConsoleMethod.call(this);
};

Console_getInt.prototype =
   jslib.inheritPrototype(ConsoleMethod, "Console_getInt extends ConsoleMethod");
Console_getInt.prototype.constructor = Console_getInt;
Console_getInt.prototype.$class = 
   new Class("Console_getInt", Console_getInt);

Console_getInt.prototype.execute = function(svm, receiver) {
   var prompt = null;
   if (svm.getArgumentCount() === 1) {
      svm.checkSignature("Console.getInt", "S");
      prompt = svm.popString();
   } else {
      svm.checkSignature("Console.getInt", "");
   }
   if (prompt !== null) svm.print(prompt);
   var console = this.getConsole(svm, receiver);
   if (console === null) {
      var legal = false;
      while (!legal) {
         var line = new Scanner(System.in).nextLine();
         try {
            var value = Integer.parseInt(line);
            svm.push(Value.createInteger(value));
            legal = true;
         } catch (ex) {
            svm.println("Illegal integer");
            if (prompt !== null) svm.print(prompt);
         }
      }
   } else {
      var action = "getInt";
      if (prompt !== null) action += ":" + prompt;
      svm.setGlobal("CONSOLE_WAIT", Value.createString(action));
      svm.setState(SVM.WAITING);
      console.requestInput("");
   }
};

var Console_getNumber = function() {
   ConsoleMethod.call(this);
};

Console_getNumber.prototype =
   jslib.inheritPrototype(ConsoleMethod, "Console_getNumber extends ConsoleMethod");
Console_getNumber.prototype.constructor = Console_getNumber;
Console_getNumber.prototype.$class = 
   new Class("Console_getNumber", Console_getNumber);

Console_getNumber.prototype.execute = function(svm, receiver) {
   var prompt = null;
   if (svm.getArgumentCount() === 1) {
      svm.checkSignature("Console.getNumber", "S");
      prompt = svm.popString();
   } else {
      svm.checkSignature("Console.getNumber", "");
   }
   if (prompt !== null) svm.print(prompt);
   var console = this.getConsole(svm, receiver);
   if (console === null) {
      var legal = false;
      while (!legal) {
         var line = new Scanner(System.in).nextLine();
         try {
            var value = Double.parseDouble(line);
            svm.push(Value.createDouble(value));
            legal = true;
         } catch (ex) {
            svm.println("Illegal number");
            if (prompt !== null) svm.print(prompt);
         }
      }
   } else {
      var action = "getNumber";
      if (prompt !== null) action += ":" + prompt;
      svm.setGlobal("CONSOLE_WAIT", Value.createString(action));
      svm.setState(SVM.WAITING);
      console.requestInput("");
   }
};


/* SJSCoreClass.js */

var SJSCoreClass = function() {
   SVMClass.call(this);
   this.defineMethod("FALSE", new Core_FALSE());
   this.defineMethod("TRUE", new Core_TRUE());
   this.defineMethod("NULL", new Core_NULL());
   this.defineMethod("UNDEFINED", new Core_UNDEFINED());
   this.defineMethod("select", new Core_select());
   this.defineMethod("assign", new Core_assign());
};

SJSCoreClass.prototype = 
   jslib.inheritPrototype(SVMClass, "SJSCoreClass extends SVMClass");
SJSCoreClass.prototype.constructor = SJSCoreClass;
SJSCoreClass.prototype.$class = 
   new Class("SJSCoreClass", SJSCoreClass);

var Core_FALSE = function() {
   SVMConstant.call(this);
};

Core_FALSE.prototype =
   jslib.inheritPrototype(SVMConstant, "Core_FALSE extends SVMConstant");
Core_FALSE.prototype.constructor = Core_FALSE;
Core_FALSE.prototype.$class = 
   new Class("Core_FALSE", Core_FALSE);

Core_FALSE.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Core.FALSE", "");
   svm.pushBoolean(false);
};

var Core_TRUE = function() {
   SVMConstant.call(this);
};

Core_TRUE.prototype =
   jslib.inheritPrototype(SVMConstant, "Core_TRUE extends SVMConstant");
Core_TRUE.prototype.constructor = Core_TRUE;
Core_TRUE.prototype.$class = 
   new Class("Core_TRUE", Core_TRUE);

Core_TRUE.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Core.TRUE", "");
   svm.pushBoolean(true);
};

var Core_NULL = function() {
   SVMConstant.call(this);
};

Core_NULL.prototype =
   jslib.inheritPrototype(SVMConstant, "Core_NULL extends SVMConstant");
Core_NULL.prototype.constructor = Core_NULL;
Core_NULL.prototype.$class = 
   new Class("Core_NULL", Core_NULL);

Core_NULL.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Core.NULL", "");
   svm.push(Value.NULL);
};

var Core_UNDEFINED = function() {
   SVMConstant.call(this);
};

Core_UNDEFINED.prototype =
   jslib.inheritPrototype(SVMConstant, "Core_UNDEFINED extends SVMConstant");
Core_UNDEFINED.prototype.constructor = Core_UNDEFINED;
Core_UNDEFINED.prototype.$class = 
   new Class("Core_UNDEFINED", Core_UNDEFINED);

Core_UNDEFINED.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Core.UNDEFINED", "");
   svm.push(Value.UNDEFINED);
};

var Core_select = function() {
   SVMMethod.call(this);
};

Core_select.prototype =
   jslib.inheritPrototype(SVMMethod, "Core_select extends SVMMethod");
Core_select.prototype.constructor = Core_select;
Core_select.prototype.$class = 
   new Class("Core_select", Core_select);

Core_select.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Core.select", "**");
   var ix = svm.pop();
   var obj = (receiver === null) ? svm.pop() : receiver;
   var type = obj.getType();
   if (type === Value.STRING) {
      var s = obj.getStringValue();
      if (ix.getType() === Value.STRING) {
         var name = ix.getStringValue();
         if (jslib.equals(name, "length")) {
            svm.pushInteger(s.length);
            return;
         }
         var mc = new SVMMethodClosure(obj, "String", name);
         svm.push(Value.createObject(mc, "MethodClosure"));
         return;
      }
      var index = ix.getIntegerValue();
      var n = s.length;
      if (index < 0) index += n;
      if (index >= 0 && index < n) {
         svm.pushString(s.substring(index, index + 1));
      } else {
         throw new RuntimeException("String index out of bounds");
      }
      return;
   } else if (type === Value.OBJECT) {
      var className = obj.getClassName();
      if (jslib.equals(className, "Array")) {
         var array = obj.getValue();
         if (ix.getType() === Value.STRING) {
            var name = ix.getStringValue();
            if (jslib.equals(name, "length")) {
               svm.pushInteger(array.size());
               return;
            }
            var mc = new SVMMethodClosure(obj, "Array", name);
            svm.push(Value.createObject(mc, "MethodClosure"));
         } else {
            svm.push(array.get(array.getIndex(ix.getIntegerValue())));
         }
      } else if (jslib.equals(className, "Object") || jslib.equals(className, "Map")) {
         var map = obj.getValue();
         svm.push(map.get(ix.getStringValue()));
      } else {
         var name = ix.getStringValue();
         if (jslib.equals(className, "Class")) {
            className = obj.getValue();
            obj = null;
         }
         var c = SVMClass.forName(className);
         if (c === null) {
            throw new RuntimeException("Undefined class " + className);
         }
         var m = c.getMethod(name);
         if (m === null) {
            throw new RuntimeException("Undefined method " + name);
         }
         if (m.isConstant()) {
            m.execute(svm, null);
            return;
         }
         var mc = new SVMMethodClosure(obj, className, name);
         svm.push(Value.createObject(mc, "MethodClosure"));
      }
   }
};

var Core_assign = function() {
   SVMMethod.call(this);
};

Core_assign.prototype =
   jslib.inheritPrototype(SVMMethod, "Core_assign extends SVMMethod");
Core_assign.prototype.constructor = Core_assign;
Core_assign.prototype.$class = 
   new Class("Core_assign", Core_assign);

Core_assign.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Core.assign", "***");
   var value = svm.pop();
   var ix = svm.pop();
   var obj = (receiver === null) ? svm.pop() : receiver;
   if (obj.getType() === Value.OBJECT) {
      var className = obj.getClassName();
      if (jslib.equals(className, "Array")) {
         var array = obj.getValue();
         array.set(array.getIndex(ix.getIntegerValue()), value);
         return;
      } else if (jslib.equals(className, "Object") || jslib.equals(className, "Map")) {
         var map = obj.getValue();
         map.put(ix.getStringValue(), value);
         return;
      }
   }
   throw new RuntimeException("Illegal selection");
};


/* SJSEventClass.js */

var SJSEventClass = function() {
   SVMClass.call(this);
   this.defineMethod("ACTION_EVENT", new Event_ACTION_EVENT());
   this.defineMethod("KEY_EVENT", new Event_KEY_EVENT());
   this.defineMethod("MOUSE_EVENT", new Event_MOUSE_EVENT());
};

SJSEventClass.prototype = 
   jslib.inheritPrototype(SVMClass, "SJSEventClass extends SVMClass");
SJSEventClass.prototype.constructor = SJSEventClass;
SJSEventClass.prototype.$class = 
   new Class("SJSEventClass", SJSEventClass);

SJSEventClass.ACTION_EVENT = 100;
SJSEventClass.KEY_EVENT = 200;
SJSEventClass.MOUSE_EVENT = 300;
var Event_ACTION_EVENT = function() {
   SVMConstant.call(this);
};

Event_ACTION_EVENT.prototype =
   jslib.inheritPrototype(SVMConstant, "Event_ACTION_EVENT extends SVMConstant");
Event_ACTION_EVENT.prototype.constructor = Event_ACTION_EVENT;
Event_ACTION_EVENT.prototype.$class = 
   new Class("Event_ACTION_EVENT", Event_ACTION_EVENT);

Event_ACTION_EVENT.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Event.ACTION_EVENT", "");
   svm.pushInteger(SJSEventClass.ACTION_EVENT);
};

var Event_KEY_EVENT = function() {
   SVMConstant.call(this);
};

Event_KEY_EVENT.prototype =
   jslib.inheritPrototype(SVMConstant, "Event_KEY_EVENT extends SVMConstant");
Event_KEY_EVENT.prototype.constructor = Event_KEY_EVENT;
Event_KEY_EVENT.prototype.$class = 
   new Class("Event_KEY_EVENT", Event_KEY_EVENT);

Event_KEY_EVENT.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Event.KEY_EVENT", "");
   svm.pushInteger(SJSEventClass.KEY_EVENT);
};

var Event_MOUSE_EVENT = function() {
   SVMConstant.call(this);
};

Event_MOUSE_EVENT.prototype =
   jslib.inheritPrototype(SVMConstant, "Event_MOUSE_EVENT extends SVMConstant");
Event_MOUSE_EVENT.prototype.constructor = Event_MOUSE_EVENT;
Event_MOUSE_EVENT.prototype.$class = 
   new Class("Event_MOUSE_EVENT", Event_MOUSE_EVENT);

Event_MOUSE_EVENT.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Event.MOUSE_EVENT", "");
   svm.pushInteger(SJSEventClass.MOUSE_EVENT);
};


/* SJSGlobalClass.js */

var SJSGlobalClass = function() {
   SVMClass.call(this);
   this.defineMethod("get", new Global_get());
   this.defineMethod("set", new Global_set());
   this.defineMethod("isDefined", new Global_isDefined());
};

SJSGlobalClass.prototype = 
   jslib.inheritPrototype(SVMClass, "SJSGlobalClass extends SVMClass");
SJSGlobalClass.prototype.constructor = SJSGlobalClass;
SJSGlobalClass.prototype.$class = 
   new Class("SJSGlobalClass", SJSGlobalClass);

var Global_get = function() {
   SVMMethod.call(this);
};

Global_get.prototype =
   jslib.inheritPrototype(SVMMethod, "Global_get extends SVMMethod");
Global_get.prototype.constructor = Global_get;
Global_get.prototype.$class = 
   new Class("Global_get", Global_get);

Global_get.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Global.get", "S");
   svm.push(svm.getGlobal(svm.popString()));
};

var Global_set = function() {
   SVMMethod.call(this);
};

Global_set.prototype =
   jslib.inheritPrototype(SVMMethod, "Global_set extends SVMMethod");
Global_set.prototype.constructor = Global_set;
Global_set.prototype.$class = 
   new Class("Global_set", Global_set);

Global_set.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Global.set", "S");
   var value = svm.pop();
   var key = svm.popString();
   svm.setGlobal(key, value);
};

var Global_isDefined = function() {
   SVMMethod.call(this);
};

Global_isDefined.prototype =
   jslib.inheritPrototype(SVMMethod, "Global_isDefined extends SVMMethod");
Global_isDefined.prototype.constructor = Global_isDefined;
Global_isDefined.prototype.$class = 
   new Class("Global_isDefined", Global_isDefined);

Global_isDefined.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Global.isDefined", "S");
   svm.pushBoolean(svm.isGlobal(svm.popString()));
};


/* SJSMathClass.js */

var SJSMathClass = function() {
   SVMClass.call(this);
   this.defineMethod("PI", new Math_PI());
   this.defineMethod("E", new Math_E());
   this.defineMethod("abs", new Math_abs());
   this.defineMethod("atan", new Math_atan());
   this.defineMethod("atan2", new Math_atan2());
   this.defineMethod("ceil", new Math_ceil());
   this.defineMethod("cos", new Math_cos());
   this.defineMethod("exp", new Math_exp());
   this.defineMethod("floor", new Math_floor());
   this.defineMethod("hypot", new Math_hypot());
   this.defineMethod("log", new Math_log());
   this.defineMethod("log10", new Math_log10());
   this.defineMethod("max", new Math_max());
   this.defineMethod("min", new Math_min());
   this.defineMethod("pow", new Math_pow());
   this.defineMethod("random", new Math_random());
   this.defineMethod("round", new Math_round());
   this.defineMethod("signum", new Math_signum());
   this.defineMethod("sin", new Math_sin());
   this.defineMethod("sqrt", new Math_sqrt());
   this.defineMethod("tan", new Math_tan());
   this.defineMethod("toDegrees", new Math_toDegrees());
   this.defineMethod("toRadians", new Math_toRadians());
};

SJSMathClass.prototype = 
   jslib.inheritPrototype(SVMClass, "SJSMathClass extends SVMClass");
SJSMathClass.prototype.constructor = SJSMathClass;
SJSMathClass.prototype.$class = 
   new Class("SJSMathClass", SJSMathClass);

var Math_PI = function() {
   SVMConstant.call(this);
};

Math_PI.prototype =
   jslib.inheritPrototype(SVMConstant, "Math_PI extends SVMConstant");
Math_PI.prototype.constructor = Math_PI;
Math_PI.prototype.$class = 
   new Class("Math_PI", Math_PI);

Math_PI.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Math.PI", "");
   svm.pushDouble(Math.PI);
};

var Math_E = function() {
   SVMConstant.call(this);
};

Math_E.prototype =
   jslib.inheritPrototype(SVMConstant, "Math_E extends SVMConstant");
Math_E.prototype.constructor = Math_E;
Math_E.prototype.$class = 
   new Class("Math_E", Math_E);

Math_E.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Math.E", "");
   svm.pushDouble(Math.E);
};

var Math_abs = function() {
   SVMMethod.call(this);
};

Math_abs.prototype =
   jslib.inheritPrototype(SVMMethod, "Math_abs extends SVMMethod");
Math_abs.prototype.constructor = Math_abs;
Math_abs.prototype.$class = 
   new Class("Math_abs", Math_abs);

Math_abs.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Math.abs", "D");
   var v = svm.pop();
   switch (v.getType()) {
    case Value.INTEGER:
      svm.pushInteger(Math.abs(v.getIntegerValue()));
      break;
    case Value.DOUBLE:
      svm.pushDouble(Math.abs(v.getDoubleValue()));
      break;
    default:
      throw new RuntimeException("Illegal type in abs");
   }
};

var Math_min = function() {
   SVMMethod.call(this);
};

Math_min.prototype =
   jslib.inheritPrototype(SVMMethod, "Math_min extends SVMMethod");
Math_min.prototype.constructor = Math_min;
Math_min.prototype.$class = 
   new Class("Math_min", Math_min);

Math_min.prototype.execute = function(svm, receiver) {
   var nArgs = svm.getArgumentCount();
   if (nArgs === -1) nArgs = 2;
   if (nArgs === 0) {
      throw new RuntimeException("min requires at least one argument");
   }
   var min = svm.pop();
   for (var i = 1; i < nArgs; i++) {
      var v = svm.pop();
      if (min.getDoubleValue() > v.getDoubleValue()) min = v;
   }
   svm.push(min);
};

var Math_max = function() {
   SVMMethod.call(this);
};

Math_max.prototype =
   jslib.inheritPrototype(SVMMethod, "Math_max extends SVMMethod");
Math_max.prototype.constructor = Math_max;
Math_max.prototype.$class = 
   new Class("Math_max", Math_max);

Math_max.prototype.execute = function(svm, receiver) {
   var nArgs = svm.getArgumentCount();
   if (nArgs === -1) nArgs = 2;
   if (nArgs === 0) {
      throw new RuntimeException("max requires at least one argument");
   }
   var max = svm.pop();
   for (var i = 1; i < nArgs; i++) {
      var v = svm.pop();
      if (max.getDoubleValue() < v.getDoubleValue()) max = v;
   }
   svm.push(max);
};

var Math_random = function() {
   SVMMethod.call(this);
};

Math_random.prototype =
   jslib.inheritPrototype(SVMMethod, "Math_random extends SVMMethod");
Math_random.prototype.constructor = Math_random;
Math_random.prototype.$class = 
   new Class("Math_random", Math_random);

Math_random.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Math.random", "");
   svm.pushDouble(Math.random());
};

var Math_round = function() {
   SVMMethod.call(this);
};

Math_round.prototype =
   jslib.inheritPrototype(SVMMethod, "Math_round extends SVMMethod");
Math_round.prototype.constructor = Math_round;
Math_round.prototype.$class = 
   new Class("Math_round", Math_round);

Math_round.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Math.round", "D");
   svm.pushInteger(toInt(Math.round(svm.popDouble())));
};

var Math_signum = function() {
   SVMMethod.call(this);
};

Math_signum.prototype =
   jslib.inheritPrototype(SVMMethod, "Math_signum extends SVMMethod");
Math_signum.prototype.constructor = Math_signum;
Math_signum.prototype.$class = 
   new Class("Math_signum", Math_signum);

Math_signum.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Math.signum", "D");
   var d = svm.popDouble();
   if (d === 0) {
      svm.pushInteger(0);
   } else if (d < 0) {
      svm.pushInteger(-1);
   } else {
      svm.pushInteger(1);
   }
};

var Math_sqrt = function() {
   SVMMethod.call(this);
};

Math_sqrt.prototype =
   jslib.inheritPrototype(SVMMethod, "Math_sqrt extends SVMMethod");
Math_sqrt.prototype.constructor = Math_sqrt;
Math_sqrt.prototype.$class = 
   new Class("Math_sqrt", Math_sqrt);

Math_sqrt.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Math.sqrt", "D");
   svm.pushDouble(Math.sqrt(svm.popDouble()));
};

var Math_floor = function() {
   SVMMethod.call(this);
};

Math_floor.prototype =
   jslib.inheritPrototype(SVMMethod, "Math_floor extends SVMMethod");
Math_floor.prototype.constructor = Math_floor;
Math_floor.prototype.$class = 
   new Class("Math_floor", Math_floor);

Math_floor.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Math.floor", "D");
   svm.pushInteger(toInt(Math.floor(svm.popDouble())));
};

var Math_ceil = function() {
   SVMMethod.call(this);
};

Math_ceil.prototype =
   jslib.inheritPrototype(SVMMethod, "Math_ceil extends SVMMethod");
Math_ceil.prototype.constructor = Math_ceil;
Math_ceil.prototype.$class = 
   new Class("Math_ceil", Math_ceil);

Math_ceil.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Math.ceil", "D");
   svm.pushInteger(toInt(Math.ceil(svm.popDouble())));
};

var Math_exp = function() {
   SVMMethod.call(this);
};

Math_exp.prototype =
   jslib.inheritPrototype(SVMMethod, "Math_exp extends SVMMethod");
Math_exp.prototype.constructor = Math_exp;
Math_exp.prototype.$class = 
   new Class("Math_exp", Math_exp);

Math_exp.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Math.exp", "D");
   svm.pushDouble(Math.exp(svm.popDouble()));
};

var Math_log = function() {
   SVMMethod.call(this);
};

Math_log.prototype =
   jslib.inheritPrototype(SVMMethod, "Math_log extends SVMMethod");
Math_log.prototype.constructor = Math_log;
Math_log.prototype.$class = 
   new Class("Math_log", Math_log);

Math_log.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Math.log", "D");
   svm.pushDouble(Math.log(svm.popDouble()));
};

var Math_log10 = function() {
   SVMMethod.call(this);
};

Math_log10.prototype =
   jslib.inheritPrototype(SVMMethod, "Math_log10 extends SVMMethod");
Math_log10.prototype.constructor = Math_log10;
Math_log10.prototype.$class = 
   new Class("Math_log10", Math_log10);

Math_log10.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Math.log10", "D");
   svm.pushDouble(Math.log(svm.popDouble()) / Math.log(10.0));
};

var Math_pow = function() {
   SVMMethod.call(this);
};

Math_pow.prototype =
   jslib.inheritPrototype(SVMMethod, "Math_pow extends SVMMethod");
Math_pow.prototype.constructor = Math_pow;
Math_pow.prototype.$class = 
   new Class("Math_pow", Math_pow);

Math_pow.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Math.pow", "DD");
   var d2 = svm.popDouble();
   var d1 = svm.popDouble();
   svm.pushDouble(Math.pow(d1, d2));
};

var Math_cos = function() {
   SVMMethod.call(this);
};

Math_cos.prototype =
   jslib.inheritPrototype(SVMMethod, "Math_cos extends SVMMethod");
Math_cos.prototype.constructor = Math_cos;
Math_cos.prototype.$class = 
   new Class("Math_cos", Math_cos);

Math_cos.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Math.cos", "D");
   svm.pushDouble(Math.cos(svm.popDouble()));
};

var Math_sin = function() {
   SVMMethod.call(this);
};

Math_sin.prototype =
   jslib.inheritPrototype(SVMMethod, "Math_sin extends SVMMethod");
Math_sin.prototype.constructor = Math_sin;
Math_sin.prototype.$class = 
   new Class("Math_sin", Math_sin);

Math_sin.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Math.sin", "D");
   svm.pushDouble(Math.sin(svm.popDouble()));
};

var Math_tan = function() {
   SVMMethod.call(this);
};

Math_tan.prototype =
   jslib.inheritPrototype(SVMMethod, "Math_tan extends SVMMethod");
Math_tan.prototype.constructor = Math_tan;
Math_tan.prototype.$class = 
   new Class("Math_tan", Math_tan);

Math_tan.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Math.tan", "D");
   svm.pushDouble(Math.tan(svm.popDouble()));
};

var Math_atan = function() {
   SVMMethod.call(this);
};

Math_atan.prototype =
   jslib.inheritPrototype(SVMMethod, "Math_atan extends SVMMethod");
Math_atan.prototype.constructor = Math_atan;
Math_atan.prototype.$class = 
   new Class("Math_atan", Math_atan);

Math_atan.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Math.atan", "D");
   svm.pushDouble(Math.atan(svm.popDouble()));
};

var Math_atan2 = function() {
   SVMMethod.call(this);
};

Math_atan2.prototype =
   jslib.inheritPrototype(SVMMethod, "Math_atan2 extends SVMMethod");
Math_atan2.prototype.constructor = Math_atan2;
Math_atan2.prototype.$class = 
   new Class("Math_atan2", Math_atan2);

Math_atan2.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Math.atan2", "DD");
   var x = svm.popDouble();
   var y = svm.popDouble();
   svm.pushDouble(Math.atan2(y, x));
};

var Math_hypot = function() {
   SVMMethod.call(this);
};

Math_hypot.prototype =
   jslib.inheritPrototype(SVMMethod, "Math_hypot extends SVMMethod");
Math_hypot.prototype.constructor = Math_hypot;
Math_hypot.prototype.$class = 
   new Class("Math_hypot", Math_hypot);

Math_hypot.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Math.hypot", "DD");
   var y = svm.popDouble();
   var x = svm.popDouble();
   svm.pushDouble(Math.sqrt(x * x + y * y));
};

var Math_toDegrees = function() {
   SVMMethod.call(this);
};

Math_toDegrees.prototype =
   jslib.inheritPrototype(SVMMethod, "Math_toDegrees extends SVMMethod");
Math_toDegrees.prototype.constructor = Math_toDegrees;
Math_toDegrees.prototype.$class = 
   new Class("Math_toDegrees", Math_toDegrees);

Math_toDegrees.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Math.toDegrees", "D");
   svm.pushDouble(180 * svm.popDouble() / Math.PI);
};

var Math_toRadians = function() {
   SVMMethod.call(this);
};

Math_toRadians.prototype =
   jslib.inheritPrototype(SVMMethod, "Math_toRadians extends SVMMethod");
Math_toRadians.prototype.constructor = Math_toRadians;
Math_toRadians.prototype.$class = 
   new Class("Math_toRadians", Math_toRadians);

Math_toRadians.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Math.toRadians", "D");
   svm.pushDouble(Math.PI * svm.popDouble() / 180);
};


/* SJSNumberClass.js */

var SJSNumberClass = function() {
   SVMClass.call(this);
   this.defineMethod("isFinite", new Number_isFinite());
   this.defineMethod("isNaN", new Number_isNaN());
   this.defineMethod("parseFloat", new Number_parseFloat());
   this.defineMethod("parseInt", new Number_parseInt());
   this.defineMethod("toString", new Number_toString());
};

SJSNumberClass.prototype = 
   jslib.inheritPrototype(SVMClass, "SJSNumberClass extends SVMClass");
SJSNumberClass.prototype.constructor = SJSNumberClass;
SJSNumberClass.prototype.$class = 
   new Class("SJSNumberClass", SJSNumberClass);

var Number_isFinite = function() {
   SVMMethod.call(this);
};

Number_isFinite.prototype =
   jslib.inheritPrototype(SVMMethod, "Number_isFinite extends SVMMethod");
Number_isFinite.prototype.constructor = Number_isFinite;
Number_isFinite.prototype.$class = 
   new Class("Number_isFinite", Number_isFinite);

Number_isFinite.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Number.isFinite", "D");
   var value = svm.popDouble();
   svm.pushBoolean(!Double.isNaN(value) && !Double.isInfinite(value));
};

var Number_isNaN = function() {
   SVMMethod.call(this);
};

Number_isNaN.prototype =
   jslib.inheritPrototype(SVMMethod, "Number_isNaN extends SVMMethod");
Number_isNaN.prototype.constructor = Number_isNaN;
Number_isNaN.prototype.$class = 
   new Class("Number_isNaN", Number_isNaN);

Number_isNaN.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Number.isNaN", "D");
   svm.pushBoolean(Double.isNaN(svm.popDouble()));
};

var Number_parseFloat = function() {
   SVMMethod.call(this);
};

Number_parseFloat.prototype =
   jslib.inheritPrototype(SVMMethod, "Number_parseFloat extends SVMMethod");
Number_parseFloat.prototype.constructor = Number_parseFloat;
Number_parseFloat.prototype.$class = 
   new Class("Number_parseFloat", Number_parseFloat);

Number_parseFloat.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Number.parseFloat", "S");
   svm.pushDouble(Double.parseDouble(svm.popString()));
};

var Number_toString = function() {
   SVMMethod.call(this);
};

Number_toString.prototype =
   jslib.inheritPrototype(SVMMethod, "Number_toString extends SVMMethod");
Number_toString.prototype.constructor = Number_toString;
Number_toString.prototype.$class = 
   new Class("Number_toString", Number_toString);

Number_toString.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Number.toString", "D");
   var v = svm.pop();
   if (v.isIntegral()) {
      svm.pushString("" + v.getIntegerValue());
   } else {
      svm.pushString("" + v.getDoubleValue());
   }
};

var Number_parseInt = function() {
   SVMMethod.call(this);
};

Number_parseInt.prototype =
   jslib.inheritPrototype(SVMMethod, "Number_parseInt extends SVMMethod");
Number_parseInt.prototype.constructor = Number_parseInt;
Number_parseInt.prototype.$class = 
   new Class("Number_parseInt", Number_parseInt);

Number_parseInt.prototype.execute = function(svm, receiver) {
   if (svm.getArgumentCount() === 2) {
      svm.checkSignature("Number.parseInt", "SI");
      var base = svm.popInteger();
      svm.pushInteger(Integer.parseInt(svm.popString(), base));
   } else {
      svm.checkSignature("Number.parseInt", "S");
      svm.pushInteger(Integer.parseInt(svm.popString()));
   }
};


/* SJSObjectClass.js */

var SJSObjectClass = function() {
   SVMClass.call(this);
   this.defineMethod("new", new Object_new());
   this.defineMethod("create", new Object_create());
   this.defineMethod("keyArray", new Object_keyArray());
};

SJSObjectClass.prototype = 
   jslib.inheritPrototype(SVMClass, "SJSObjectClass extends SVMClass");
SJSObjectClass.prototype.constructor = SJSObjectClass;
SJSObjectClass.prototype.$class = 
   new Class("SJSObjectClass", SJSObjectClass);

var ObjectMethod = function() {
   SVMMethod.call(this);
};

ObjectMethod.prototype =
   jslib.inheritPrototype(SVMMethod, "ObjectMethod extends SVMMethod");
ObjectMethod.prototype.constructor = ObjectMethod;
ObjectMethod.prototype.$class = 
   new Class("ObjectMethod", ObjectMethod);

ObjectMethod.prototype.getObject = function(svm, receiver) {
   if (receiver === null) {
      return svm.pop().getValue();
   } else {
      return receiver.getValue();
   }
};

var Object_new = function() {
   SVMMethod.call(this);
};

Object_new.prototype =
   jslib.inheritPrototype(SVMMethod, "Object_new extends SVMMethod");
Object_new.prototype.constructor = Object_new;
Object_new.prototype.$class = 
   new Class("Object_new", Object_new);

Object_new.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Object.new", "");
   svm.push(Value.createObject(new SVMObject(), "Object"));
};

var Object_create = function() {
   SVMMethod.call(this);
};

Object_create.prototype =
   jslib.inheritPrototype(SVMMethod, "Object_create extends SVMMethod");
Object_create.prototype.constructor = Object_create;
Object_create.prototype.$class = 
   new Class("Object_create", Object_create);

Object_create.prototype.execute = function(svm, receiver) {
   var obj = new SVMObject();
   var nArgs = svm.getArgumentCount();
   for (var i = 0; i < nArgs; i += 2) {
      var v = svm.pop();
      var k = svm.popString();
      obj.put(k, v);
   }
   svm.push(Value.createObject(obj, "Object"));
};

var Object_keyArray = function() {
   SVMMethod.call(this);
};

Object_keyArray.prototype =
   jslib.inheritPrototype(SVMMethod, "Object_keyArray extends SVMMethod");
Object_keyArray.prototype.constructor = Object_keyArray;
Object_keyArray.prototype.$class = 
   new Class("Object_keyArray", Object_keyArray);

Object_keyArray.prototype.execute = function(svm, receiver) {
   var array = new SVMArray();
   var obj = svm.pop().getValue();
   var el0 = new JSElementList(obj.keySet());
   for (var ei0 = 0; ei0 < el0.size(); ei0++) {
      var key = el0.get(ei0);
      array.add(Value.createString(key));
   }
   svm.push(Value.createObject(array, "Array"));
};


/* SJSPackage_core.js */

var SJSPackage_core = function() {
   SVMPackage.call(this);
};

SJSPackage_core.prototype =
   jslib.inheritPrototype(SVMPackage, "SJSPackage_core extends SVMPackage");
SJSPackage_core.prototype.constructor = SJSPackage_core;
SJSPackage_core.prototype.$class = 
   new Class("SJSPackage_core", SJSPackage_core);

SJSPackage_core.prototype.defineClasses = function(svm) {
   SVMClass.defineClass(svm, "Array", new SJSArrayClass());
   SVMClass.defineClass(svm, "Character", new SJSCharacterClass());
   SVMClass.defineClass(svm, "Console", new SJSConsoleClass());
   SVMClass.defineClass(svm, "Core", new SJSCoreClass());
   SVMClass.defineClass(svm, "Global", new SJSGlobalClass());
   SVMClass.defineClass(svm, "Math", new SJSMathClass());
   SVMClass.defineClass(svm, "Number", new SJSNumberClass());
   SVMClass.defineClass(svm, "Object", new SJSObjectClass());
   SVMClass.defineClass(svm, "Program", new SJSProgramClass());
   SVMClass.defineClass(svm, "String", new SJSStringClass());
   SVMClass.defineClass(svm, "System", new SJSSystemClass());
};


/* SJSProgramClass.js */

var SJSProgramClass = function() {
   SVMClass.call(this);
   this.defineMethod("add", new Program_add());
   this.defineMethod("alert", new Program_alert());
   this.defineMethod("exit", new Program_exit());
   this.defineMethod("setConsole", new Program_setConsole());
   this.defineMethod("getConsole", new Program_getConsole());
};

SJSProgramClass.prototype = 
   jslib.inheritPrototype(SVMClass, "SJSProgramClass extends SVMClass");
SJSProgramClass.prototype.constructor = SJSProgramClass;
SJSProgramClass.prototype.$class = 
   new Class("SJSProgramClass", SJSProgramClass);

var Program_add = function() {
   SVMMethod.call(this);
};

Program_add.prototype =
   jslib.inheritPrototype(SVMMethod, "Program_add extends SVMMethod");
Program_add.prototype.constructor = Program_add;
Program_add.prototype.$class = 
   new Class("Program_add", Program_add);

Program_add.prototype.execute = function(svm, closure) {
   svm.checkSignature("Program.add", "OS");
   var name = svm.popString();
   var c = svm.pop().getValue();
   svm.getProgram().add(c, name);
};

var Program_alert = function() {
   SVMMethod.call(this);
};

Program_alert.prototype =
   jslib.inheritPrototype(SVMMethod, "Program_alert extends SVMMethod");
Program_alert.prototype.constructor = Program_alert;
Program_alert.prototype.$class = 
   new Class("Program_alert", Program_alert);

Program_alert.prototype.execute = function(svm, closure) {
   var msg = "";
   if (svm.getArgumentCount() === 1) {
      msg += svm.pop().toString();
   }
   JSProgram.alert(msg);
};

var Program_exit = function() {
   SVMMethod.call(this);
};

Program_exit.prototype =
   jslib.inheritPrototype(SVMMethod, "Program_exit extends SVMMethod");
Program_exit.prototype.constructor = Program_exit;
Program_exit.prototype.$class = 
   new Class("Program_exit", Program_exit);

Program_exit.prototype.execute = function(svm, closure) {
   var status = 0;
   if (svm.getArgumentCount() === 1) {
      svm.checkSignature("Program.exit", "I");
      status = svm.popInteger();
   }
   System.exit(status);
};

var Program_setConsole = function() {
   SVMMethod.call(this);
};

Program_setConsole.prototype =
   jslib.inheritPrototype(SVMMethod, "Program_setConsole extends SVMMethod");
Program_setConsole.prototype.constructor = Program_setConsole;
Program_setConsole.prototype.$class = 
   new Class("Program_setConsole", Program_setConsole);

Program_setConsole.prototype.execute = function(svm, closure) {
   svm.checkSignature("Program.setConsole", "O");
   var console = svm.pop().getValue();
   svm.setConsole(console);
};

var Program_getConsole = function() {
   SVMMethod.call(this);
};

Program_getConsole.prototype =
   jslib.inheritPrototype(SVMMethod, "Program_getConsole extends SVMMethod");
Program_getConsole.prototype.constructor = Program_getConsole;
Program_getConsole.prototype.$class = 
   new Class("Program_getConsole", Program_getConsole);

Program_getConsole.prototype.execute = function(svm, closure) {
   svm.checkSignature("Program.getConsole", "");
   var console = svm.getConsole();
   if (console === null) {
      svm.push(Value.UNDEFINED);
   } else {
      svm.push(Value.createObject(console, "Console"));
   }
};


/* SJSStringClass.js */

var SJSStringClass = function() {
   SVMClass.call(this);
   this.defineMethod("charAt", new String_charAt());
   this.defineMethod("charCodeAt", new String_charCodeAt());
   this.defineMethod("compareTo", new String_compareTo());
   this.defineMethod("compareToIgnoreCase", new String_compareToIgnoreCase());
   this.defineMethod("concat", new String_concat());
   this.defineMethod("contains", new String_contains());
   this.defineMethod("endsWith", new String_endsWith());
   this.defineMethod("equals", new String_equals());
   this.defineMethod("equalsIgnoreCase", new String_equalsIgnoreCase());
   this.defineMethod("fromCharCode", new String_fromCharCode());
   this.defineMethod("indexOf", new String_indexOf());
   this.defineMethod("isEmpty", new String_isEmpty());
   this.defineMethod("lastIndexOf", new String_lastIndexOf());
   this.defineMethod("length", new String_length());
   this.defineMethod("size", new String_size());
   this.defineMethod("startsWith", new String_startsWith());
   this.defineMethod("substring", new String_substring());
   this.defineMethod("toLowerCase", new String_toLowerCase());
   this.defineMethod("toUpperCase", new String_toUpperCase());
   this.defineMethod("trim", new String_trim());
};

SJSStringClass.prototype = 
   jslib.inheritPrototype(SVMClass, "SJSStringClass extends SVMClass");
SJSStringClass.prototype.constructor = SJSStringClass;
SJSStringClass.prototype.$class = 
   new Class("SJSStringClass", SJSStringClass);

var StringMethod = function() {
   SVMMethod.call(this);
};

StringMethod.prototype =
   jslib.inheritPrototype(SVMMethod, "StringMethod extends SVMMethod");
StringMethod.prototype.constructor = StringMethod;
StringMethod.prototype.$class = 
   new Class("StringMethod", StringMethod);

StringMethod.prototype.getString = function(svm, receiver) {
   if (receiver === null) {
      return svm.popString();
   } else {
      return receiver.getStringValue();
   }
};

var String_charAt = function() {
   StringMethod.call(this);
};

String_charAt.prototype =
   jslib.inheritPrototype(StringMethod, "String_charAt extends StringMethod");
String_charAt.prototype.constructor = String_charAt;
String_charAt.prototype.$class = 
   new Class("String_charAt", String_charAt);

String_charAt.prototype.execute = function(svm, receiver) {
   svm.checkSignature("String.charAt", "I");
   var k = svm.popInteger();
   svm.pushString(this.getString(svm, receiver).substring(k, k + 1));
};

var String_charCodeAt = function() {
   StringMethod.call(this);
};

String_charCodeAt.prototype =
   jslib.inheritPrototype(StringMethod, "String_charCodeAt extends StringMethod");
String_charCodeAt.prototype.constructor = String_charCodeAt;
String_charCodeAt.prototype.$class = 
   new Class("String_charCodeAt", String_charCodeAt);

String_charCodeAt.prototype.execute = function(svm, receiver) {
   svm.checkSignature("String.charCodeAt", "I");
   var k = svm.popInteger();
   svm.pushInteger(this.getString(svm, receiver).charCodeAt(k));
};

var String_compareTo = function() {
   StringMethod.call(this);
};

String_compareTo.prototype =
   jslib.inheritPrototype(StringMethod, "String_compareTo extends StringMethod");
String_compareTo.prototype.constructor = String_compareTo;
String_compareTo.prototype.$class = 
   new Class("String_compareTo", String_compareTo);

String_compareTo.prototype.execute = function(svm, receiver) {
   svm.checkSignature("String.compareTo", "S");
   var s = svm.popString();
   svm.pushInteger(this.getString(svm, receiver).localeCompare(s));
};

var String_compareToIgnoreCase = function() {
   StringMethod.call(this);
};

String_compareToIgnoreCase.prototype =
   jslib.inheritPrototype(StringMethod, "String_compareToIgnoreCase extends StringMethod");
String_compareToIgnoreCase.prototype.constructor = String_compareToIgnoreCase;
String_compareToIgnoreCase.prototype.$class = 
   new Class("String_compareToIgnoreCase", String_compareToIgnoreCase);

String_compareToIgnoreCase.prototype.execute = function(svm, receiver) {
   svm.checkSignature("String.compareToIgnoreCase", "S");
   var s = svm.popString().toUpperCase();
   svm.pushInteger(this.getString(svm, receiver).toUpperCase().localeCompare(s));
};

var String_concat = function() {
   StringMethod.call(this);
};

String_concat.prototype =
   jslib.inheritPrototype(StringMethod, "String_concat extends StringMethod");
String_concat.prototype.constructor = String_concat;
String_concat.prototype.$class = 
   new Class("String_concat", String_concat);

String_concat.prototype.execute = function(svm, receiver) {
   svm.checkSignature("String.concat", "**");
   var s = svm.popString();
   svm.pushString(this.getString(svm, receiver).concat(s));
};

var String_contains = function() {
   StringMethod.call(this);
};

String_contains.prototype =
   jslib.inheritPrototype(StringMethod, "String_contains extends StringMethod");
String_contains.prototype.constructor = String_contains;
String_contains.prototype.$class = 
   new Class("String_contains", String_contains);

String_contains.prototype.execute = function(svm, receiver) {
   svm.checkSignature("String.contains", "S");
   var s = svm.popString();
   svm.pushBoolean(this.getString(svm, receiver).indexOf(s) >= 0);
};

var String_endsWith = function() {
   StringMethod.call(this);
};

String_endsWith.prototype =
   jslib.inheritPrototype(StringMethod, "String_endsWith extends StringMethod");
String_endsWith.prototype.constructor = String_endsWith;
String_endsWith.prototype.$class = 
   new Class("String_endsWith", String_endsWith);

String_endsWith.prototype.execute = function(svm, receiver) {
   svm.checkSignature("String.endsWith", "S");
   var s = svm.popString();
   svm.pushBoolean(jslib.endsWith(this.getString(svm, receiver), s));
};

var String_equals = function() {
   StringMethod.call(this);
};

String_equals.prototype =
   jslib.inheritPrototype(StringMethod, "String_equals extends StringMethod");
String_equals.prototype.constructor = String_equals;
String_equals.prototype.$class = 
   new Class("String_equals", String_equals);

String_equals.prototype.execute = function(svm, receiver) {
   svm.checkSignature("String.equals", "S");
   var s = svm.popString();
   svm.pushBoolean(jslib.equals(this.getString(svm, receiver), s));
};

var String_equalsIgnoreCase = function() {
   StringMethod.call(this);
};

String_equalsIgnoreCase.prototype =
   jslib.inheritPrototype(StringMethod, "String_equalsIgnoreCase extends StringMethod");
String_equalsIgnoreCase.prototype.constructor = String_equalsIgnoreCase;
String_equalsIgnoreCase.prototype.$class = 
   new Class("String_equalsIgnoreCase", String_equalsIgnoreCase);

String_equalsIgnoreCase.prototype.execute = function(svm, receiver) {
   svm.checkSignature("String.equalsIgnoreCase", "S");
   var s = svm.popString();
   svm.pushBoolean(jslib.equalsIgnoreCase(this.getString(svm, receiver), s));
};

var String_fromCharCode = function() {
   StringMethod.call(this);
};

String_fromCharCode.prototype =
   jslib.inheritPrototype(StringMethod, "String_fromCharCode extends StringMethod");
String_fromCharCode.prototype.constructor = String_fromCharCode;
String_fromCharCode.prototype.$class = 
   new Class("String_fromCharCode", String_fromCharCode);

String_fromCharCode.prototype.execute = function(svm, receiver) {
   svm.checkSignature("String.fromCharCode", "I");
   svm.pushString("" + toStr(svm.popInteger()));
};

var String_indexOf = function() {
   StringMethod.call(this);
};

String_indexOf.prototype =
   jslib.inheritPrototype(StringMethod, "String_indexOf extends StringMethod");
String_indexOf.prototype.constructor = String_indexOf;
String_indexOf.prototype.$class = 
   new Class("String_indexOf", String_indexOf);

String_indexOf.prototype.execute = function(svm, receiver) {
   if (svm.getArgumentCount() === 2) {
      svm.checkSignature("String.indexOf", "SI");
      var k = svm.popInteger();
      var s = svm.popString();
      svm.pushInteger(this.getString(svm, receiver).indexOf(s, k));
   } else {
      svm.checkSignature("String.indexOf", "S");
      var s = svm.popString();
      svm.pushInteger(this.getString(svm, receiver).indexOf(s));
   }
};

var String_isEmpty = function() {
   StringMethod.call(this);
};

String_isEmpty.prototype =
   jslib.inheritPrototype(StringMethod, "String_isEmpty extends StringMethod");
String_isEmpty.prototype.constructor = String_isEmpty;
String_isEmpty.prototype.$class = 
   new Class("String_isEmpty", String_isEmpty);

String_isEmpty.prototype.execute = function(svm, receiver) {
   svm.checkSignature("String.isEmpty", "");
   svm.pushBoolean(this.getString(svm, receiver).length === 0);
};

var String_lastIndexOf = function() {
   StringMethod.call(this);
};

String_lastIndexOf.prototype =
   jslib.inheritPrototype(StringMethod, "String_lastIndexOf extends StringMethod");
String_lastIndexOf.prototype.constructor = String_lastIndexOf;
String_lastIndexOf.prototype.$class = 
   new Class("String_lastIndexOf", String_lastIndexOf);

String_lastIndexOf.prototype.execute = function(svm, receiver) {
   if (svm.getArgumentCount() === 2) {
      svm.checkSignature("String.lastIndexOf", "SI");
      var k = svm.popInteger();
      var s = svm.popString();
      svm.pushInteger(this.getString(svm, receiver).lastIndexOf(s, k));
   } else {
      svm.checkSignature("String.lastIndexOf", "S");
      var s = svm.popString();
      svm.pushInteger(this.getString(svm, receiver).lastIndexOf(s));
   }
};

var String_length = function() {
   StringMethod.call(this);
};

String_length.prototype =
   jslib.inheritPrototype(StringMethod, "String_length extends StringMethod");
String_length.prototype.constructor = String_length;
String_length.prototype.$class = 
   new Class("String_length", String_length);

String_length.prototype.execute = function(svm, receiver) {
   svm.checkSignature("String.length", "");
   svm.pushInteger(this.getString(svm, receiver).length);
};

var String_size = function() {
   StringMethod.call(this);
};

String_size.prototype =
   jslib.inheritPrototype(StringMethod, "String_size extends StringMethod");
String_size.prototype.constructor = String_size;
String_size.prototype.$class = 
   new Class("String_size", String_size);

String_size.prototype.execute = function(svm, receiver) {
   svm.checkSignature("String.size", "");
   svm.pushInteger(this.getString(svm, receiver).length);
};

var String_startsWith = function() {
   StringMethod.call(this);
};

String_startsWith.prototype =
   jslib.inheritPrototype(StringMethod, "String_startsWith extends StringMethod");
String_startsWith.prototype.constructor = String_startsWith;
String_startsWith.prototype.$class = 
   new Class("String_startsWith", String_startsWith);

String_startsWith.prototype.execute = function(svm, receiver) {
   svm.checkSignature("String.startsWith", "S");
   var s = svm.popString();
   svm.pushBoolean(jslib.startsWith(this.getString(svm, receiver), s));
};

var String_substring = function() {
   StringMethod.call(this);
};

String_substring.prototype =
   jslib.inheritPrototype(StringMethod, "String_substring extends StringMethod");
String_substring.prototype.constructor = String_substring;
String_substring.prototype.$class = 
   new Class("String_substring", String_substring);

String_substring.prototype.execute = function(svm, receiver) {
   if (svm.getArgumentCount() === 1) {
      svm.checkSignature("String.substring", "I");
      var p1 = svm.popInteger();
      svm.pushString(this.getString(svm, receiver).substring(p1));
   } else {
      svm.checkSignature("String.substring", "II");
      var p2 = svm.popInteger();
      var p1 = svm.popInteger();
      svm.pushString(this.getString(svm, receiver).substring(p1, p2));
   }
};

var String_toLowerCase = function() {
   StringMethod.call(this);
};

String_toLowerCase.prototype =
   jslib.inheritPrototype(StringMethod, "String_toLowerCase extends StringMethod");
String_toLowerCase.prototype.constructor = String_toLowerCase;
String_toLowerCase.prototype.$class = 
   new Class("String_toLowerCase", String_toLowerCase);

String_toLowerCase.prototype.execute = function(svm, receiver) {
   svm.checkSignature("String.toLowerCase", "");
   svm.pushString(this.getString(svm, receiver).toLowerCase());
};

var String_toUpperCase = function() {
   StringMethod.call(this);
};

String_toUpperCase.prototype =
   jslib.inheritPrototype(StringMethod, "String_toUpperCase extends StringMethod");
String_toUpperCase.prototype.constructor = String_toUpperCase;
String_toUpperCase.prototype.$class = 
   new Class("String_toUpperCase", String_toUpperCase);

String_toUpperCase.prototype.execute = function(svm, receiver) {
   svm.checkSignature("String.toUpperCase", "");
   svm.pushString(this.getString(svm, receiver).toUpperCase());
};

var String_trim = function() {
   StringMethod.call(this);
};

String_trim.prototype =
   jslib.inheritPrototype(StringMethod, "String_trim extends StringMethod");
String_trim.prototype.constructor = String_trim;
String_trim.prototype.$class = 
   new Class("String_trim", String_trim);

String_trim.prototype.execute = function(svm, receiver) {
   svm.checkSignature("String.trim", "");
   svm.pushString(this.getString(svm, receiver).trim());
};


/* SJSSystemClass.js */

var SJSSystemClass = function() {
   SVMClass.call(this);
   this.defineMethod("currentTimeMillis", new System_currentTimeMillis());
};

SJSSystemClass.prototype = 
   jslib.inheritPrototype(SVMClass, "SJSSystemClass extends SVMClass");
SJSSystemClass.prototype.constructor = SJSSystemClass;
SJSSystemClass.prototype.$class = 
   new Class("SJSSystemClass", SJSSystemClass);

var System_currentTimeMillis = function() {
   SVMMethod.call(this);
};

System_currentTimeMillis.prototype =
   jslib.inheritPrototype(SVMMethod, "System_currentTimeMillis extends SVMMethod");
System_currentTimeMillis.prototype.constructor = System_currentTimeMillis;
System_currentTimeMillis.prototype.$class = 
   new Class("System_currentTimeMillis", System_currentTimeMillis);

System_currentTimeMillis.prototype.execute = function(svm, receiver) {
   svm.checkSignature("System.currentTimeMillis", "");
   svm.pushDouble(System.currentTimeMillis());
};


/* Exports */

return {
   SJSArrayClass : SJSArrayClass,
   SJSCharacterClass : SJSCharacterClass,
   SJSConsoleClass : SJSConsoleClass,
   SJSCoreClass : SJSCoreClass,
   SJSEventClass : SJSEventClass,
   SJSGlobalClass : SJSGlobalClass,
   SJSMathClass : SJSMathClass,
   SJSNumberClass : SJSNumberClass,
   SJSObjectClass : SJSObjectClass,
   SJSPackage_core : SJSPackage_core,
   SJSProgramClass : SJSProgramClass,
   SJSStringClass : SJSStringClass,
   SJSSystemClass : SJSSystemClass
};

});
