/*
 * File: lexicon.js
 * Created on Mon Feb 08 21:55:12 PST 2016 by java2js
 * --------------------------------------------------
 * This file was generated mechanically by the java2js utility.
 * Permanent edits must be made in the Java file.
 */

define([ "jslib",
         "edu/stanford/cs/exp",
         "edu/stanford/cs/lexicon",
         "edu/stanford/cs/svm",
         "java/lang" ],

function(jslib,
         edu_stanford_cs_exp,
         edu_stanford_cs_lexicon,
         edu_stanford_cs_svm,
         java_lang) {

/* Imports */

var inheritPrototype = jslib.inheritPrototype;
var newArray = jslib.newArray;
var toInt = jslib.toInt;
var toStr = jslib.toStr;
var Value = edu_stanford_cs_exp.Value;
var EnglishLexicon = edu_stanford_cs_lexicon.EnglishLexicon;
var SVM = edu_stanford_cs_svm.SVM;
var SVMClass = edu_stanford_cs_svm.SVMClass;
var SVMMethod = edu_stanford_cs_svm.SVMMethod;
var SVMPackage = edu_stanford_cs_svm.SVMPackage;
var Class = java_lang.Class;

/* SJSEnglishLexiconClass.js */

var SJSEnglishLexiconClass = function() {
   SVMClass.call(this);
   this.defineMethod("contains", new EnglishLexicon_contains());
   this.defineMethod("containsPrefix", new EnglishLexicon_containsPrefix());
};

SJSEnglishLexiconClass.prototype = 
   jslib.inheritPrototype(SVMClass, "SJSEnglishLexiconClass extends SVMClass");
SJSEnglishLexiconClass.prototype.constructor = SJSEnglishLexiconClass;
SJSEnglishLexiconClass.prototype.$class = 
   new Class("SJSEnglishLexiconClass", SJSEnglishLexiconClass);

SJSEnglishLexiconClass.ENGLISH = new EnglishLexicon();
var EnglishLexicon_contains = function() {
   SVMMethod.call(this);
};

EnglishLexicon_contains.prototype =
   jslib.inheritPrototype(SVMMethod, "EnglishLexicon_contains extends SVMMethod");
EnglishLexicon_contains.prototype.constructor = EnglishLexicon_contains;
EnglishLexicon_contains.prototype.$class = 
   new Class("EnglishLexicon_contains", EnglishLexicon_contains);

EnglishLexicon_contains.prototype.execute = function(svm, receiver) {
   svm.checkSignature("EnglishLexicon.contains", "S");
   var str = svm.popString();
   svm.pushBoolean(SJSEnglishLexiconClass.ENGLISH.contains(str));
};

var EnglishLexicon_containsPrefix = function() {
   SVMMethod.call(this);
};

EnglishLexicon_containsPrefix.prototype =
   jslib.inheritPrototype(SVMMethod, "EnglishLexicon_containsPrefix extends SVMMethod");
EnglishLexicon_containsPrefix.prototype.constructor = EnglishLexicon_containsPrefix;
EnglishLexicon_containsPrefix.prototype.$class = 
   new Class("EnglishLexicon_containsPrefix", EnglishLexicon_containsPrefix);

EnglishLexicon_containsPrefix.prototype.execute = function(svm, receiver) {
   svm.checkSignature("EnglishLexicon.containsPrefix", "S");
   var str = svm.popString();
   svm.pushBoolean(SJSEnglishLexiconClass.ENGLISH.containsPrefix(str));
};


/* SJSPackage_lexicon.js */

var SJSPackage_lexicon = function() {
   SVMPackage.call(this);
};

SJSPackage_lexicon.prototype =
   jslib.inheritPrototype(SVMPackage, "SJSPackage_lexicon extends SVMPackage");
SJSPackage_lexicon.prototype.constructor = SJSPackage_lexicon;
SJSPackage_lexicon.prototype.$class = 
   new Class("SJSPackage_lexicon", SJSPackage_lexicon);

SJSPackage_lexicon.prototype.defineClasses = function(svm) {
   SVMClass.defineClass(svm, "EnglishLexicon", new SJSEnglishLexiconClass());
};


/* Exports */

return {
   SJSEnglishLexiconClass : SJSEnglishLexiconClass,
   SJSPackage_lexicon : SJSPackage_lexicon
};

});
