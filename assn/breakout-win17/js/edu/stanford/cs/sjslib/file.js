/*
 * File: file.js
 * Created on Mon Feb 08 21:55:11 PST 2016 by java2js
 * --------------------------------------------------
 * This file was generated mechanically by the java2js utility.
 * Permanent edits must be made in the Java file.
 */

define([ "jslib",
         "edu/stanford/cs/exp",
         "edu/stanford/cs/java2js",
         "edu/stanford/cs/svm",
         "java/awt",
         "java/lang" ],

function(jslib,
         edu_stanford_cs_exp,
         edu_stanford_cs_java2js,
         edu_stanford_cs_svm,
         java_awt,
         java_lang) {

/* Imports */

var inheritPrototype = jslib.inheritPrototype;
var newArray = jslib.newArray;
var toInt = jslib.toInt;
var toStr = jslib.toStr;
var Value = edu_stanford_cs_exp.Value;
var JSFile = edu_stanford_cs_java2js.JSFile;
var SVM = edu_stanford_cs_svm.SVM;
var SVMClass = edu_stanford_cs_svm.SVMClass;
var SVMMethod = edu_stanford_cs_svm.SVMMethod;
var SVMPackage = edu_stanford_cs_svm.SVMPackage;
var ActionEvent = java_awt.ActionEvent;
var ActionListener = java_awt.ActionListener;
var Class = java_lang.Class;

/* SJSFileClass.js */

var SJSFileClass = function() {
   SVMClass.call(this);
   this.defineMethod("read", new File_read());
};

SJSFileClass.prototype = 
   jslib.inheritPrototype(SVMClass, "SJSFileClass extends SVMClass");
SJSFileClass.prototype.constructor = SJSFileClass;
SJSFileClass.prototype.$class = 
   new Class("SJSFileClass", SJSFileClass);

var File_read = function() {
   SVMMethod.call(this);
};

File_read.prototype =
   jslib.inheritPrototype(SVMMethod, "File_read extends SVMMethod");
File_read.prototype.constructor = File_read;
File_read.prototype.$class = 
   new Class("File_read", File_read);

File_read.prototype.execute = function(svm, receiver) {
   svm.checkSignature("File.read", "S");
   var filename = svm.popString();
   var file = new JSFile(filename);
   svm.setState(SVM.WAITING);
   file.read(new FileListener(svm));
};

var FileListener = function(svm) {
   this.svm = svm;
};

FileListener.prototype.actionPerformed = function(e) {
   this.svm.pushString(e.getActionCommand());
   this.svm.run();
};


/* SJSPackage_file.js */

var SJSPackage_file = function() {
   SVMPackage.call(this);
};

SJSPackage_file.prototype =
   jslib.inheritPrototype(SVMPackage, "SJSPackage_file extends SVMPackage");
SJSPackage_file.prototype.constructor = SJSPackage_file;
SJSPackage_file.prototype.$class = 
   new Class("SJSPackage_file", SJSPackage_file);

SJSPackage_file.prototype.defineClasses = function(svm) {
   SVMClass.defineClass(svm, "File", new SJSFileClass());
};


/* Exports */

return {
   SJSFileClass : SJSFileClass,
   SJSPackage_file : SJSPackage_file
};

});
