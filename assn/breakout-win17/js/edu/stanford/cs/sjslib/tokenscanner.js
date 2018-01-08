/*
 * File: tokenscanner.js
 * Created on Mon Feb 08 21:55:12 PST 2016 by java2js
 * --------------------------------------------------
 * This file was generated mechanically by the java2js utility.
 * Permanent edits must be made in the Java file.
 */

define([ "jslib",
         "edu/stanford/cs/exp",
         "edu/stanford/cs/svm",
         "edu/stanford/cs/tokenscanner",
         "java/lang" ],

function(jslib,
         edu_stanford_cs_exp,
         edu_stanford_cs_svm,
         edu_stanford_cs_tokenscanner,
         java_lang) {

/* Imports */

var inheritPrototype = jslib.inheritPrototype;
var newArray = jslib.newArray;
var toInt = jslib.toInt;
var toStr = jslib.toStr;
var Value = edu_stanford_cs_exp.Value;
var SVM = edu_stanford_cs_svm.SVM;
var SVMClass = edu_stanford_cs_svm.SVMClass;
var SVMConstant = edu_stanford_cs_svm.SVMConstant;
var SVMMethod = edu_stanford_cs_svm.SVMMethod;
var SVMPackage = edu_stanford_cs_svm.SVMPackage;
var TokenScanner = edu_stanford_cs_tokenscanner.TokenScanner;
var Class = java_lang.Class;
var RuntimeException = java_lang.RuntimeException;

/* SJSPackage_tokenscanner.js */

var SJSPackage_tokenscanner = function() {
   SVMPackage.call(this);
};

SJSPackage_tokenscanner.prototype =
   jslib.inheritPrototype(SVMPackage, "SJSPackage_tokenscanner extends SVMPackage");
SJSPackage_tokenscanner.prototype.constructor = SJSPackage_tokenscanner;
SJSPackage_tokenscanner.prototype.$class = 
   new Class("SJSPackage_tokenscanner", SJSPackage_tokenscanner);

SJSPackage_tokenscanner.prototype.defineClasses = function(svm) {
   SVMClass.defineClass(svm, "TokenScanner", new SJSTokenScannerClass());
};


/* SJSTokenScannerClass.js */

var SJSTokenScannerClass = function() {
   SVMClass.call(this);
   this.defineMethod("new", new TokenScanner_new());
   this.defineMethod("setInput", new TokenScanner_setInput());
   this.defineMethod("hasMoreTokens", new TokenScanner_hasMoreTokens());
   this.defineMethod("nextToken", new TokenScanner_nextToken());
   this.defineMethod("saveToken", new TokenScanner_saveToken());
   this.defineMethod("getPosition", new TokenScanner_getPosition());
   this.defineMethod("ignoreWhitespace", new TokenScanner_ignoreWhitespace());
   this.defineMethod("ignoreComments", new TokenScanner_ignoreComments());
   this.defineMethod("scanNumbers", new TokenScanner_scanNumbers());
   this.defineMethod("scanStrings", new TokenScanner_scanStrings());
   this.defineMethod("addWordCharacters", new TokenScanner_addWordCharacters());
   this.defineMethod("isWordCharacter", new TokenScanner_isWordCharacter());
   this.defineMethod("addOperator", new TokenScanner_addOperator());
   this.defineMethod("verifyToken", new TokenScanner_verifyToken());
   this.defineMethod("getStringValue", new TokenScanner_getStringValue());
   this.defineMethod("getTokenType", new TokenScanner_getTokenType());
   this.defineMethod("EOF", new TokenScanner_EOF());
   this.defineMethod("SEPARATOR", new TokenScanner_SEPARATOR());
   this.defineMethod("WORD", new TokenScanner_WORD());
   this.defineMethod("NUMBER", new TokenScanner_NUMBER());
   this.defineMethod("STRING", new TokenScanner_STRING());
   this.defineMethod("OPERATOR", new TokenScanner_OPERATOR());
};

SJSTokenScannerClass.prototype = 
   jslib.inheritPrototype(SVMClass, "SJSTokenScannerClass extends SVMClass");
SJSTokenScannerClass.prototype.constructor = SJSTokenScannerClass;
SJSTokenScannerClass.prototype.$class = 
   new Class("SJSTokenScannerClass", SJSTokenScannerClass);

var TokenScanner_new = function() {
   SVMMethod.call(this);
};

TokenScanner_new.prototype =
   jslib.inheritPrototype(SVMMethod, "TokenScanner_new extends SVMMethod");
TokenScanner_new.prototype.constructor = TokenScanner_new;
TokenScanner_new.prototype.$class = 
   new Class("TokenScanner_new", TokenScanner_new);

TokenScanner_new.prototype.execute = function(svm, receiver) {
   if (svm.getArgumentCount() === 0) {
      svm.push(Value.createObject(new TokenScanner(), "TokenScanner"));
   } else {
      svm.checkSignature("TokenScanner.new", "S");
      var str = svm.popString();
      svm.push(Value.createObject(new TokenScanner(str), "TokenScanner"));
   }
};

var TokenScannerMethod = function() {
   SVMMethod.call(this);
};

TokenScannerMethod.prototype =
   jslib.inheritPrototype(SVMMethod, "TokenScannerMethod extends SVMMethod");
TokenScannerMethod.prototype.constructor = TokenScannerMethod;
TokenScannerMethod.prototype.$class = 
   new Class("TokenScannerMethod", TokenScannerMethod);

TokenScannerMethod.prototype.getTokenScanner = function(svm, receiver) {
   if (receiver === null) {
      return svm.pop().getValue();
   } else {
      return receiver.getValue();
   }
};

var TokenScanner_setInput = function() {
   TokenScannerMethod.call(this);
};

TokenScanner_setInput.prototype =
   jslib.inheritPrototype(TokenScannerMethod, "TokenScanner_setInput extends TokenScannerMethod");
TokenScanner_setInput.prototype.constructor = TokenScanner_setInput;
TokenScanner_setInput.prototype.$class = 
   new Class("TokenScanner_setInput", TokenScanner_setInput);

TokenScanner_setInput.prototype.execute = function(svm, receiver) {
   svm.checkSignature("TokenScanner.setInput", "S");
   var str = svm.popString();
   this.getTokenScanner(svm, receiver).setInput(str);
};

var TokenScanner_hasMoreTokens = function() {
   TokenScannerMethod.call(this);
};

TokenScanner_hasMoreTokens.prototype =
   jslib.inheritPrototype(TokenScannerMethod, "TokenScanner_hasMoreTokens extends TokenScannerMethod");
TokenScanner_hasMoreTokens.prototype.constructor = TokenScanner_hasMoreTokens;
TokenScanner_hasMoreTokens.prototype.$class = 
   new Class("TokenScanner_hasMoreTokens", TokenScanner_hasMoreTokens);

TokenScanner_hasMoreTokens.prototype.execute = function(svm, receiver) {
   svm.checkSignature("TokenScanner.hasMoreTokens", "");
   svm.pushBoolean(this.getTokenScanner(svm, receiver).hasMoreTokens());
};

var TokenScanner_nextToken = function() {
   TokenScannerMethod.call(this);
};

TokenScanner_nextToken.prototype =
   jslib.inheritPrototype(TokenScannerMethod, "TokenScanner_nextToken extends TokenScannerMethod");
TokenScanner_nextToken.prototype.constructor = TokenScanner_nextToken;
TokenScanner_nextToken.prototype.$class = 
   new Class("TokenScanner_nextToken", TokenScanner_nextToken);

TokenScanner_nextToken.prototype.execute = function(svm, receiver) {
   svm.checkSignature("TokenScanner.nextToken", "");
   svm.pushString(this.getTokenScanner(svm, receiver).nextToken());
};

var TokenScanner_saveToken = function() {
   TokenScannerMethod.call(this);
};

TokenScanner_saveToken.prototype =
   jslib.inheritPrototype(TokenScannerMethod, "TokenScanner_saveToken extends TokenScannerMethod");
TokenScanner_saveToken.prototype.constructor = TokenScanner_saveToken;
TokenScanner_saveToken.prototype.$class = 
   new Class("TokenScanner_saveToken", TokenScanner_saveToken);

TokenScanner_saveToken.prototype.execute = function(svm, receiver) {
   svm.checkSignature("TokenScanner.saveToken", "S");
   var token = svm.popString();
   this.getTokenScanner(svm, receiver).saveToken(token);
};

var TokenScanner_getPosition = function() {
   TokenScannerMethod.call(this);
};

TokenScanner_getPosition.prototype =
   jslib.inheritPrototype(TokenScannerMethod, "TokenScanner_getPosition extends TokenScannerMethod");
TokenScanner_getPosition.prototype.constructor = TokenScanner_getPosition;
TokenScanner_getPosition.prototype.$class = 
   new Class("TokenScanner_getPosition", TokenScanner_getPosition);

TokenScanner_getPosition.prototype.execute = function(svm, receiver) {
   svm.checkSignature("TokenScanner.ignoreWhitespace", "");
   svm.pushInteger(this.getTokenScanner(svm, receiver).getPosition());
};

var TokenScanner_ignoreWhitespace = function() {
   TokenScannerMethod.call(this);
};

TokenScanner_ignoreWhitespace.prototype =
   jslib.inheritPrototype(TokenScannerMethod, "TokenScanner_ignoreWhitespace extends TokenScannerMethod");
TokenScanner_ignoreWhitespace.prototype.constructor = TokenScanner_ignoreWhitespace;
TokenScanner_ignoreWhitespace.prototype.$class = 
   new Class("TokenScanner_ignoreWhitespace", TokenScanner_ignoreWhitespace);

TokenScanner_ignoreWhitespace.prototype.execute = function(svm, receiver) {
   svm.checkSignature("TokenScanner.ignoreWhitespace", "");
   this.getTokenScanner(svm, receiver).ignoreWhitespace();
};

var TokenScanner_ignoreComments = function() {
   TokenScannerMethod.call(this);
};

TokenScanner_ignoreComments.prototype =
   jslib.inheritPrototype(TokenScannerMethod, "TokenScanner_ignoreComments extends TokenScannerMethod");
TokenScanner_ignoreComments.prototype.constructor = TokenScanner_ignoreComments;
TokenScanner_ignoreComments.prototype.$class = 
   new Class("TokenScanner_ignoreComments", TokenScanner_ignoreComments);

TokenScanner_ignoreComments.prototype.execute = function(svm, receiver) {
   svm.checkSignature("TokenScanner.ignoreComments", "");
   this.getTokenScanner(svm, receiver).ignoreComments();
};

var TokenScanner_scanNumbers = function() {
   TokenScannerMethod.call(this);
};

TokenScanner_scanNumbers.prototype =
   jslib.inheritPrototype(TokenScannerMethod, "TokenScanner_scanNumbers extends TokenScannerMethod");
TokenScanner_scanNumbers.prototype.constructor = TokenScanner_scanNumbers;
TokenScanner_scanNumbers.prototype.$class = 
   new Class("TokenScanner_scanNumbers", TokenScanner_scanNumbers);

TokenScanner_scanNumbers.prototype.execute = function(svm, receiver) {
   svm.checkSignature("TokenScanner.scanNumbers", "");
   this.getTokenScanner(svm, receiver).scanNumbers();
};

var TokenScanner_scanStrings = function() {
   TokenScannerMethod.call(this);
};

TokenScanner_scanStrings.prototype =
   jslib.inheritPrototype(TokenScannerMethod, "TokenScanner_scanStrings extends TokenScannerMethod");
TokenScanner_scanStrings.prototype.constructor = TokenScanner_scanStrings;
TokenScanner_scanStrings.prototype.$class = 
   new Class("TokenScanner_scanStrings", TokenScanner_scanStrings);

TokenScanner_scanStrings.prototype.execute = function(svm, receiver) {
   svm.checkSignature("TokenScanner.scanStrings", "");
   this.getTokenScanner(svm, receiver).scanStrings();
};

var TokenScanner_addWordCharacters = function() {
   TokenScannerMethod.call(this);
};

TokenScanner_addWordCharacters.prototype =
   jslib.inheritPrototype(TokenScannerMethod, "TokenScanner_addWordCharacters extends TokenScannerMethod");
TokenScanner_addWordCharacters.prototype.constructor = TokenScanner_addWordCharacters;
TokenScanner_addWordCharacters.prototype.$class = 
   new Class("TokenScanner_addWordCharacters", TokenScanner_addWordCharacters);

TokenScanner_addWordCharacters.prototype.execute = function(svm, receiver) {
   svm.checkSignature("TokenScanner.addWordCharacters", "S");
   var str = svm.popString();
   this.getTokenScanner(svm, receiver).addWordCharacters(str);
};

var TokenScanner_isWordCharacter = function() {
   TokenScannerMethod.call(this);
};

TokenScanner_isWordCharacter.prototype =
   jslib.inheritPrototype(TokenScannerMethod, "TokenScanner_isWordCharacter extends TokenScannerMethod");
TokenScanner_isWordCharacter.prototype.constructor = TokenScanner_isWordCharacter;
TokenScanner_isWordCharacter.prototype.$class = 
   new Class("TokenScanner_isWordCharacter", TokenScanner_isWordCharacter);

TokenScanner_isWordCharacter.prototype.execute = function(svm, receiver) {
   svm.checkSignature("TokenScanner.isWordCharacter", "S");
   var ch = svm.popString();
   var scanner = this.getTokenScanner(svm, receiver);
   svm.pushBoolean(scanner.isWordCharacter(ch.charCodeAt(0)));
};

var TokenScanner_addOperator = function() {
   TokenScannerMethod.call(this);
};

TokenScanner_addOperator.prototype =
   jslib.inheritPrototype(TokenScannerMethod, "TokenScanner_addOperator extends TokenScannerMethod");
TokenScanner_addOperator.prototype.constructor = TokenScanner_addOperator;
TokenScanner_addOperator.prototype.$class = 
   new Class("TokenScanner_addOperator", TokenScanner_addOperator);

TokenScanner_addOperator.prototype.execute = function(svm, receiver) {
   svm.checkSignature("TokenScanner.addOperator", "S");
   var op = svm.popString();
   this.getTokenScanner(svm, receiver).addOperator(op);
};

var TokenScanner_verifyToken = function() {
   TokenScannerMethod.call(this);
};

TokenScanner_verifyToken.prototype =
   jslib.inheritPrototype(TokenScannerMethod, "TokenScanner_verifyToken extends TokenScannerMethod");
TokenScanner_verifyToken.prototype.constructor = TokenScanner_verifyToken;
TokenScanner_verifyToken.prototype.$class = 
   new Class("TokenScanner_verifyToken", TokenScanner_verifyToken);

TokenScanner_verifyToken.prototype.execute = function(svm, receiver) {
   svm.checkSignature("TokenScanner.verifyToken", "S");
   var expected = svm.popString();
   try {
      this.getTokenScanner(svm, receiver).verifyToken(expected);
   } catch (ex) {
      throw new RuntimeException(RuntimeException.patchMessage(ex));
   }
};

var TokenScanner_getStringValue = function() {
   TokenScannerMethod.call(this);
};

TokenScanner_getStringValue.prototype =
   jslib.inheritPrototype(TokenScannerMethod, "TokenScanner_getStringValue extends TokenScannerMethod");
TokenScanner_getStringValue.prototype.constructor = TokenScanner_getStringValue;
TokenScanner_getStringValue.prototype.$class = 
   new Class("TokenScanner_getStringValue", TokenScanner_getStringValue);

TokenScanner_getStringValue.prototype.execute = function(svm, receiver) {
   svm.checkSignature("TokenScanner.getStringValue", "S");
   var token = svm.popString();
   svm.pushString(this.getTokenScanner(svm, receiver).getStringValue(token));
};

var TokenScanner_getTokenType = function() {
   TokenScannerMethod.call(this);
};

TokenScanner_getTokenType.prototype =
   jslib.inheritPrototype(TokenScannerMethod, "TokenScanner_getTokenType extends TokenScannerMethod");
TokenScanner_getTokenType.prototype.constructor = TokenScanner_getTokenType;
TokenScanner_getTokenType.prototype.$class = 
   new Class("TokenScanner_getTokenType", TokenScanner_getTokenType);

TokenScanner_getTokenType.prototype.execute = function(svm, receiver) {
   svm.checkSignature("TokenScanner.getTokenType", "S");
   var token = svm.popString();
   svm.pushInteger(this.getTokenScanner(svm, receiver).getTokenType(token));
};

var TokenScanner_EOF = function() {
   SVMConstant.call(this);
};

TokenScanner_EOF.prototype =
   jslib.inheritPrototype(SVMConstant, "TokenScanner_EOF extends SVMConstant");
TokenScanner_EOF.prototype.constructor = TokenScanner_EOF;
TokenScanner_EOF.prototype.$class = 
   new Class("TokenScanner_EOF", TokenScanner_EOF);

TokenScanner_EOF.prototype.execute = function(svm, receiver) {
   svm.checkSignature("TokenScanner.EOF", "");
   svm.pushInteger(TokenScanner.EOF);
};

var TokenScanner_SEPARATOR = function() {
   SVMConstant.call(this);
};

TokenScanner_SEPARATOR.prototype =
   jslib.inheritPrototype(SVMConstant, "TokenScanner_SEPARATOR extends SVMConstant");
TokenScanner_SEPARATOR.prototype.constructor = TokenScanner_SEPARATOR;
TokenScanner_SEPARATOR.prototype.$class = 
   new Class("TokenScanner_SEPARATOR", TokenScanner_SEPARATOR);

TokenScanner_SEPARATOR.prototype.execute = function(svm, receiver) {
   svm.checkSignature("TokenScanner.SEPARATOR", "");
   svm.pushInteger(TokenScanner.SEPARATOR);
};

var TokenScanner_WORD = function() {
   SVMConstant.call(this);
};

TokenScanner_WORD.prototype =
   jslib.inheritPrototype(SVMConstant, "TokenScanner_WORD extends SVMConstant");
TokenScanner_WORD.prototype.constructor = TokenScanner_WORD;
TokenScanner_WORD.prototype.$class = 
   new Class("TokenScanner_WORD", TokenScanner_WORD);

TokenScanner_WORD.prototype.execute = function(svm, receiver) {
   svm.checkSignature("TokenScanner.WORD", "");
   svm.pushInteger(TokenScanner.WORD);
};

var TokenScanner_NUMBER = function() {
   SVMConstant.call(this);
};

TokenScanner_NUMBER.prototype =
   jslib.inheritPrototype(SVMConstant, "TokenScanner_NUMBER extends SVMConstant");
TokenScanner_NUMBER.prototype.constructor = TokenScanner_NUMBER;
TokenScanner_NUMBER.prototype.$class = 
   new Class("TokenScanner_NUMBER", TokenScanner_NUMBER);

TokenScanner_NUMBER.prototype.execute = function(svm, receiver) {
   svm.checkSignature("TokenScanner.NUMBER", "");
   svm.pushInteger(TokenScanner.NUMBER);
};

var TokenScanner_STRING = function() {
   SVMConstant.call(this);
};

TokenScanner_STRING.prototype =
   jslib.inheritPrototype(SVMConstant, "TokenScanner_STRING extends SVMConstant");
TokenScanner_STRING.prototype.constructor = TokenScanner_STRING;
TokenScanner_STRING.prototype.$class = 
   new Class("TokenScanner_STRING", TokenScanner_STRING);

TokenScanner_STRING.prototype.execute = function(svm, receiver) {
   svm.checkSignature("TokenScanner.STRING", "");
   svm.pushInteger(TokenScanner.STRING);
};

var TokenScanner_OPERATOR = function() {
   SVMConstant.call(this);
};

TokenScanner_OPERATOR.prototype =
   jslib.inheritPrototype(SVMConstant, "TokenScanner_OPERATOR extends SVMConstant");
TokenScanner_OPERATOR.prototype.constructor = TokenScanner_OPERATOR;
TokenScanner_OPERATOR.prototype.$class = 
   new Class("TokenScanner_OPERATOR", TokenScanner_OPERATOR);

TokenScanner_OPERATOR.prototype.execute = function(svm, receiver) {
   svm.checkSignature("TokenScanner.OPERATOR", "");
   svm.pushInteger(TokenScanner.OPERATOR);
};


/* Exports */

return {
   SJSPackage_tokenscanner : SJSPackage_tokenscanner,
   SJSTokenScannerClass : SJSTokenScannerClass
};

});
