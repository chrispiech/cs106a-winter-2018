/*
 * File: random.js
 * ---------------
 * This file implements the JavaScript side of the RandomGenerator class.
 */

define([ "jslib",
         "java/awt",
         "java/lang" ],

function(jslib,
         java_awt,
         java_lang) {

/* Imports */

var inheritPrototype = jslib.inheritPrototype;
var newArray = jslib.newArray;
var toInt = jslib.toInt;
var toStr = jslib.toStr;
var Color = java_awt.Color;
var Class = java_lang.Class;
var System = java_lang.System;

/* RandomGenerator.js */

var RandomGenerator = function() {
   this.setSeed(toInt(System.currentTimeMillis() & 0x7FFFFFFF));
};

RandomGenerator.prototype.nextInt = function(low, high) {
   if (high === undefined) {
      return Math.floor(low * this.nextDouble());
   } else {
      return low + Math.floor((high - low + 1) * this.nextDouble());
   }
};

RandomGenerator.prototype.nextDouble = function(low, high) {
   if (low === undefined) {
      return this.next() / 0x40000000;
   } else {
      return low + (high - low) * this.nextDouble();
   }
};

RandomGenerator.prototype.nextBoolean = function(p) {
   return this.nextDouble() < ((p === undefined) ? 0.5 : p);
};

RandomGenerator.prototype.nextColor = function() {
   return new Color(this.nextInt(256), this.nextInt(256), this.nextInt(256));
};

RandomGenerator.prototype.setSeed = function(seed) {
   this.s1 = seed & 0xFFFF;
   this.s2 = (seed >> 16) & 0xFFFF;
};

RandomGenerator.getInstance = function() {
   return RandomGenerator.standardInstance;
};

RandomGenerator.prototype.next = function() {
   this.s1 = (this.s1 * RandomGenerator.MULTIPLIER +
                        RandomGenerator.INCREMENT) & 0xFFFF;
   this.s2 = (this.s2 * RandomGenerator.MULTIPLIER +
                        RandomGenerator.INCREMENT) & 0xFFFF;
   return ((this.s2 & 0x3FFF) << 16) | this.s1;
};

RandomGenerator.MULTIPLIER = 31421;
RandomGenerator.INCREMENT = 6927;
RandomGenerator.MODULUS = (1 << 24);
RandomGenerator.standardInstance = new RandomGenerator();

/* Exports */

return {
   RandomGenerator : RandomGenerator
};

});
