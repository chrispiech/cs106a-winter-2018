/*
 * File: unittest.js
 * Created on Tue Apr 28 09:40:59 PDT 2015 by java2js
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
var System = java_lang.System;

/* UnitTest.js */

var UnitTest = function() {
   /* Empty */
};

UnitTest.assertTrue = function(a1, a2) {
   if (a2 === undefined) {
      a2 = a1;
      a1 = "Failure: " + a2 + " != true";
   }
   if (!a2) {
      UnitTest.errorCount++;
      if (UnitTest.console) {
         if (UnitTest.console.showErrorMessage) {
            UnitTest.console.showErrorMessage(a1);
            return;
         } else if (UnitTest.console.println) {
            UnitTest.console.println(a1);
            return;
         }
      }
      alert(a1);
   }
};

UnitTest.assertFalse = function(a1, a2) {
   if (a2 === undefined) {
      a2 = a1;
      a1 = "Failure: " + a2 + " == true";
   }
   UnitTest.assertTrue(a1, !a2);
};

UnitTest.assertEquals = function(a1, a2, a3) {
   if (a3 === undefined) {
      a3 = a2;
      a2 = a1;
      a1 = "Failure: " + a2 + " != " + a3;
   }
   UnitTest.assertTrue(a1, a2 == a3);
};

UnitTest.assertNotEquals = function(a1, a2, a3) {
   if (a3 === undefined) {
      a3 = a2;
      a2 = a1;
      a1 = "Failure: " + a2 + " == " + a3;
   }
   UnitTest.assertTrue(a1, a2 != a3);
};

UnitTest.assertNull = function(a1, a2) {
   if (a2 === undefined) {
      a2 = a1;
      a1 = "Failure: " + a2 + " !== null";
   }
   UnitTest.assertTrue(a1, a2 === null);
};

UnitTest.assertNotNull = function(a1, a2) {
   if (a2 === undefined) {
      a2 = a1;
      a1 = "Failure: " + a2 + " === null";
   }
   UnitTest.assertTrue(a1, a2 !== null);
};

UnitTest.assertSame = function(a1, a2, a3) {
   if (a3 === undefined) {
      a3 = a2;
      a2 = a1;
      a1 = "Failure: " + a2 + " !== " + a3;
   }
   UnitTest.assertTrue(a1, a2 === a3);
};

UnitTest.assertNotSame = function(a1, a2, a3) {
   if (a3 === undefined) {
      a3 = a2;
      a2 = a1;
      a1 = "Failure: " + a2 + " === " + a3;
   }
   UnitTest.assertTrue(a1, a2 !== a3);
};

UnitTest.resetErrorCount = function() {
   UnitTest.errorCount = 0;
};

UnitTest.getErrorCount = function() {
   return UnitTest.errorCount;
};

UnitTest.setConsole = function(console) {
   UnitTest.console = console;
}

UnitTest.errorCount = 0;
UnitTest.console = null;

/* Exports */

return {
   UnitTest : UnitTest
};

});
