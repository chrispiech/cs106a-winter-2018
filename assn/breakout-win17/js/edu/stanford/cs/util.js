/*
 * File: util.js
 * -------------
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

/* Grid.js */

var Grid = function(nRows, nCols) {
   this.resize(nRows, nCols);
};

Grid.prototype.numRows = function() {
   return this.nRows;
};

Grid.prototype.numCols = function() {
   return this.nCols;
};

Grid.prototype.resize = function(nRows, nCols) {
   if (nRows < 0 || nCols < 0) {
      throw new RuntimeException("Illegal grid size");
   }
   this.nRows = nRows;
   this.nCols = nCols;
   this.elements = jslib.newArray(nRows * nCols);
};

Grid.prototype.inBounds = function(row, col) {
   return row >= 0 && col >= 0 && row < this.nRows && col < this.nCols;
};

Grid.prototype.get = function(row, col) {
   if (!this.inBounds(row, col)) {
      throw new RuntimeException("get: Grid indices out of bounds");
   }
   return this.elements[(row * this.nCols) + col];
};

Grid.prototype.set = function(row, col, value) {
   if (!this.inBounds(row, col)) this.error("set: Grid indices out of bounds");
   this.elements[(row * this.nCols) + col] = value;
};

Grid.prototype.toString = function() {
   var str = "";
   for (var i = 0; i < this.nRows; i++) {
      if (i > 0) str += ", ";
      str += "{";
      for (var j = 0; j < this.nCols; j++) {
         if (j > 0) str += ", ";
         str += this.get(i, j).toString();
      }
      str += "}";
   }
   return "{" + str + "}";
};

Grid.prototype.toArray = function() {
   return this.elements;
};


/* Exports */

return {
   Grid : Grid
};

});
