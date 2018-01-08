/*
 * File: unittest.js
 * Created on Mon Feb 08 21:55:13 PST 2016 by java2js
 * --------------------------------------------------
 * This file was generated mechanically by the java2js utility.
 * Permanent edits must be made in the Java file.
 */

define([ "jslib",
         "edu/stanford/cs/exp",
         "edu/stanford/cs/svm",
         "edu/stanford/cs/unittest",
         "java/lang" ],

function(jslib,
         edu_stanford_cs_exp,
         edu_stanford_cs_svm,
         edu_stanford_cs_unittest,
         java_lang) {

/* Imports */

var inheritPrototype = jslib.inheritPrototype;
var newArray = jslib.newArray;
var toInt = jslib.toInt;
var toStr = jslib.toStr;
var Value = edu_stanford_cs_exp.Value;
var SVM = edu_stanford_cs_svm.SVM;
var SVMClass = edu_stanford_cs_svm.SVMClass;
var SVMMethod = edu_stanford_cs_svm.SVMMethod;
var SVMPackage = edu_stanford_cs_svm.SVMPackage;
var UnitTest = edu_stanford_cs_unittest.UnitTest;
var Class = java_lang.Class;
var RuntimeException = java_lang.RuntimeException;

/* SJSPackage_unittest.js */

var SJSPackage_unittest = function() {
   SVMPackage.call(this);
};

SJSPackage_unittest.prototype =
   jslib.inheritPrototype(SVMPackage, "SJSPackage_unittest extends SVMPackage");
SJSPackage_unittest.prototype.constructor = SJSPackage_unittest;
SJSPackage_unittest.prototype.$class = 
   new Class("SJSPackage_unittest", SJSPackage_unittest);

SJSPackage_unittest.prototype.defineClasses = function(svm) {
   SVMClass.defineClass(svm, "UnitTest", new SJSUnitTestClass());
};


/* SJSUnitTestClass.js */

var SJSUnitTestClass = function() {
   SVMClass.call(this);
   this.defineMethod("assertTrue", new UnitTest_assertTrue());
   this.defineMethod("assertFalse", new UnitTest_assertFalse());
   this.defineMethod("assertEquals", new UnitTest_assertEquals());
   this.defineMethod("assertNotEquals", new UnitTest_assertNotEquals());
   this.defineMethod("resetErrorCount", new UnitTest_resetErrorCount());
   this.defineMethod("getErrorCount", new UnitTest_getErrorCount());
};

SJSUnitTestClass.prototype = 
   jslib.inheritPrototype(SVMClass, "SJSUnitTestClass extends SVMClass");
SJSUnitTestClass.prototype.constructor = SJSUnitTestClass;
SJSUnitTestClass.prototype.$class = 
   new Class("SJSUnitTestClass", SJSUnitTestClass);

var UnitTest_assertTrue = function() {
   SVMMethod.call(this);
};

UnitTest_assertTrue.prototype =
   jslib.inheritPrototype(SVMMethod, "UnitTest_assertTrue extends SVMMethod");
UnitTest_assertTrue.prototype.constructor = UnitTest_assertTrue;
UnitTest_assertTrue.prototype.$class = 
   new Class("UnitTest_assertTrue", UnitTest_assertTrue);

UnitTest_assertTrue.prototype.execute = function(svm, receiver) {
   UnitTest.setConsole(svm.getConsole());
   var flag = svm.popBoolean();
   switch (svm.getArgumentCount()) {
    case 1:
      UnitTest.assertTrue(flag);
      break;
    case 2:
      UnitTest.assertTrue(svm.popString(), flag);
      break;
    default:
      throw new RuntimeException("Illegal call to assertTrue");
   }
};

var UnitTest_assertFalse = function() {
   SVMMethod.call(this);
};

UnitTest_assertFalse.prototype =
   jslib.inheritPrototype(SVMMethod, "UnitTest_assertFalse extends SVMMethod");
UnitTest_assertFalse.prototype.constructor = UnitTest_assertFalse;
UnitTest_assertFalse.prototype.$class = 
   new Class("UnitTest_assertFalse", UnitTest_assertFalse);

UnitTest_assertFalse.prototype.execute = function(svm, receiver) {
   UnitTest.setConsole(svm.getConsole());
   var flag = svm.popBoolean();
   switch (svm.getArgumentCount()) {
    case 1:
      UnitTest.assertFalse(flag);
      break;
    case 2:
      UnitTest.assertFalse(svm.popString(), flag);
      break;
    default:
      throw new RuntimeException("Illegal call to assertFalse");
   }
};

var UnitTest_assertEquals = function() {
   SVMMethod.call(this);
};

UnitTest_assertEquals.prototype =
   jslib.inheritPrototype(SVMMethod, "UnitTest_assertEquals extends SVMMethod");
UnitTest_assertEquals.prototype.constructor = UnitTest_assertEquals;
UnitTest_assertEquals.prototype.$class = 
   new Class("UnitTest_assertEquals", UnitTest_assertEquals);

UnitTest_assertEquals.prototype.execute = function(svm, receiver) {
   UnitTest.setConsole(svm.getConsole());
   var v2 = svm.pop();
   var v1 = svm.pop();
   switch (svm.getArgumentCount()) {
    case 2:
      UnitTest.assertEquals(v1.getValue(), v2.getValue());
      break;
    case 3:
      UnitTest.assertEquals(svm.popString(), v1.getValue(), v2.getValue());
      break;
    default:
      throw new RuntimeException("Illegal call to assertEquals");
   }
};

var UnitTest_assertNotEquals = function() {
   SVMMethod.call(this);
};

UnitTest_assertNotEquals.prototype =
   jslib.inheritPrototype(SVMMethod, "UnitTest_assertNotEquals extends SVMMethod");
UnitTest_assertNotEquals.prototype.constructor = UnitTest_assertNotEquals;
UnitTest_assertNotEquals.prototype.$class = 
   new Class("UnitTest_assertNotEquals", UnitTest_assertNotEquals);

UnitTest_assertNotEquals.prototype.execute = function(svm, receiver) {
   UnitTest.setConsole(svm.getConsole());
   var v2 = svm.pop();
   var v1 = svm.pop();
   switch (svm.getArgumentCount()) {
    case 2:
      UnitTest.assertNotEquals(v1.getValue(), v2.getValue());
      break;
    case 3:
      UnitTest.assertNotEquals(svm.popString(), v1.getValue(), v2.getValue());
      break;
    default:
      throw new RuntimeException("Illegal call to assertNotEquals");
   }
};

var UnitTest_resetErrorCount = function() {
   SVMMethod.call(this);
};

UnitTest_resetErrorCount.prototype =
   jslib.inheritPrototype(SVMMethod, "UnitTest_resetErrorCount extends SVMMethod");
UnitTest_resetErrorCount.prototype.constructor = UnitTest_resetErrorCount;
UnitTest_resetErrorCount.prototype.$class = 
   new Class("UnitTest_resetErrorCount", UnitTest_resetErrorCount);

UnitTest_resetErrorCount.prototype.execute = function(svm, receiver) {
   UnitTest.resetErrorCount();
};

var UnitTest_getErrorCount = function() {
   SVMMethod.call(this);
};

UnitTest_getErrorCount.prototype =
   jslib.inheritPrototype(SVMMethod, "UnitTest_getErrorCount extends SVMMethod");
UnitTest_getErrorCount.prototype.constructor = UnitTest_getErrorCount;
UnitTest_getErrorCount.prototype.$class = 
   new Class("UnitTest_getErrorCount", UnitTest_getErrorCount);

UnitTest_getErrorCount.prototype.execute = function(svm, receiver) {
   svm.pushInteger(UnitTest.getErrorCount());
};


/* Exports */

return {
   SJSPackage_unittest : SJSPackage_unittest,
   SJSUnitTestClass : SJSUnitTestClass
};

});
