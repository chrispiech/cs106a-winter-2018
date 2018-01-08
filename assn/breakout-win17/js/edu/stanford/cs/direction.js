/*
 * File: direction.js
 * Created on Fri Feb 27 07:53:46 PST 2015 by java2js
 * --------------------------------------------------
 * This file was generated mechanically by the java2js utility.
 * Permanent edits must be made in the Java file.
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
var Point = java_awt.Point;
var Class = java_lang.Class;
var RuntimeException = java_lang.RuntimeException;

/* Direction.js */

var Direction = function() {
   /* Empty */
};

Direction.directionName = function(dir) {
   switch (dir) {
      case Direction.NORTH: return "NORTH";
      case Direction.EAST:  return "EAST";
      case Direction.SOUTH: return "SOUTH";
      case Direction.WEST:  return "WEST";
   }
   return null;
};

Direction.leftFrom = function(dir) {
   switch (dir) {
      case Direction.NORTH: return Direction.WEST;
      case Direction.EAST:  return Direction.NORTH;
      case Direction.SOUTH: return Direction.EAST;
      case Direction.WEST:  return Direction.SOUTH;
   }
   throw new RuntimeException("Illegal direction");
};

Direction.rightFrom = function(dir) {
   switch (dir) {
      case Direction.NORTH: return Direction.EAST;
      case Direction.EAST:  return Direction.SOUTH;
      case Direction.SOUTH: return Direction.WEST;
      case Direction.WEST:  return Direction.NORTH;
   }
   throw new RuntimeException("Illegal direction");
};

Direction.oppositeDirection = function(dir) {
   switch (dir) {
      case Direction.NORTH: return Direction.SOUTH;
      case Direction.EAST:  return Direction.WEST;
      case Direction.SOUTH: return Direction.NORTH;
      case Direction.WEST:  return Direction.EAST;
   }
   throw new RuntimeException("Illegal direction");
};

Direction.adjacentPoint = function(pt, dir) {
   switch (dir) {
      case Direction.NORTH: return new Point(pt.x, pt.y + 1);
      case Direction.EAST:  return new Point(pt.x + 1, pt.y);
      case Direction.SOUTH: return new Point(pt.x, pt.y - 1);
      case Direction.WEST:  return new Point(pt.x - 1, pt.y);
   }
   throw new RuntimeException("Illegal direction");
};

Direction.getRotationAngle = function(dir) {
   switch (dir) {
      case Direction.EAST:  return 0;
      case Direction.NORTH: return 90 * Math.PI / 180;
      case Direction.WEST:  return 180 * Math.PI / 180;
      case Direction.SOUTH: return 270 * Math.PI / 180;
   }
   throw new RuntimeException("Illegal direction");
};

Direction.NORTH = 0;
Direction.EAST = 1;
Direction.SOUTH = 2;
Direction.WEST = 3;

/* Exports */

return {
   Direction : Direction
};

});
