/*
 * File: util.js
 * Created on Mon Feb 08 21:55:13 PST 2016 by java2js
 * --------------------------------------------------
 * This file was generated mechanically by the java2js utility.
 * Permanent edits must be made in the Java file.
 */

define([ "jslib",
         "edu/stanford/cs/exp",
         "edu/stanford/cs/java2js",
         "edu/stanford/cs/random",
         "edu/stanford/cs/sjslib/core",
         "edu/stanford/cs/svm",
         "java/awt",
         "java/lang",
         "java/util",
         "javax/swing" ],

function(jslib,
         edu_stanford_cs_exp,
         edu_stanford_cs_java2js,
         edu_stanford_cs_random,
         edu_stanford_cs_sjslib_core,
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
var RandomGenerator = edu_stanford_cs_random.RandomGenerator;
var SJSEventClass = edu_stanford_cs_sjslib_core.SJSEventClass;
var SVM = edu_stanford_cs_svm.SVM;
var SVMArray = edu_stanford_cs_svm.SVMArray;
var SVMClass = edu_stanford_cs_svm.SVMClass;
var SVMConstant = edu_stanford_cs_svm.SVMConstant;
var SVMMethod = edu_stanford_cs_svm.SVMMethod;
var SVMObject = edu_stanford_cs_svm.SVMObject;
var SVMPackage = edu_stanford_cs_svm.SVMPackage;
var ActionEvent = java_awt.ActionEvent;
var ActionListener = java_awt.ActionListener;
var Class = java_lang.Class;
var RuntimeException = java_lang.RuntimeException;
var ArrayDeque = java_util.ArrayDeque;
var TreeSet = java_util.TreeSet;
var Timer = javax_swing.Timer;

/* SJSActionEventClass.js */

var SJSActionEventClass = function() {
   SJSEventClass.call(this);
   this.defineMethod("getEventType", new ActionEvent_getEventType());
   this.defineMethod("getID", new ActionEvent_getID());
   this.defineMethod("getSource", new ActionEvent_getSource());
   this.defineMethod("getActionCommand", new ActionEvent_getActionCommand());
   this.defineMethod("TYPE", new ActionEvent_TYPE());
   this.defineMethod("ACTION_PERFORMED", new ActionEvent_ACTION_PERFORMED());
};

SJSActionEventClass.prototype = 
   jslib.inheritPrototype(SJSEventClass, "SJSActionEventClass extends SJSEventClass");
SJSActionEventClass.prototype.constructor = SJSActionEventClass;
SJSActionEventClass.prototype.$class = 
   new Class("SJSActionEventClass", SJSActionEventClass);

SJSActionEventClass.ACTION_PERFORMED = SJSEventClass.ACTION_EVENT + 1;
var ActionEventMethod = function() {
   SVMMethod.call(this);
};

ActionEventMethod.prototype =
   jslib.inheritPrototype(SVMMethod, "ActionEventMethod extends SVMMethod");
ActionEventMethod.prototype.constructor = ActionEventMethod;
ActionEventMethod.prototype.$class = 
   new Class("ActionEventMethod", ActionEventMethod);

ActionEventMethod.prototype.getActionEvent = function(svm, receiver) {
   if (receiver === null) {
      return svm.pop().getValue();
   } else {
      return receiver.getValue();
   }
};

var ActionEvent_getEventType = function() {
   ActionEventMethod.call(this);
};

ActionEvent_getEventType.prototype =
   jslib.inheritPrototype(ActionEventMethod, "ActionEvent_getEventType extends ActionEventMethod");
ActionEvent_getEventType.prototype.constructor = ActionEvent_getEventType;
ActionEvent_getEventType.prototype.$class = 
   new Class("ActionEvent_getEventType", ActionEvent_getEventType);

ActionEvent_getEventType.prototype.execute = function(svm, receiver) {
   svm.checkSignature("ActionEvent.getEventType", "");
   this.getActionEvent(svm, receiver);
   svm.pushInteger(SJSEventClass.ACTION_EVENT);
};

var ActionEvent_getID = function() {
   ActionEventMethod.call(this);
};

ActionEvent_getID.prototype =
   jslib.inheritPrototype(ActionEventMethod, "ActionEvent_getID extends ActionEventMethod");
ActionEvent_getID.prototype.constructor = ActionEvent_getID;
ActionEvent_getID.prototype.$class = 
   new Class("ActionEvent_getID", ActionEvent_getID);

ActionEvent_getID.prototype.execute = function(svm, receiver) {
   svm.pushInteger(SJSActionEventClass.ACTION_PERFORMED);
};

var ActionEvent_getSource = function() {
   ActionEventMethod.call(this);
};

ActionEvent_getSource.prototype =
   jslib.inheritPrototype(ActionEventMethod, "ActionEvent_getSource extends ActionEventMethod");
ActionEvent_getSource.prototype.constructor = ActionEvent_getSource;
ActionEvent_getSource.prototype.$class = 
   new Class("ActionEvent_getSource", ActionEvent_getSource);

ActionEvent_getSource.prototype.execute = function(svm, receiver) {
   svm.checkSignature("ActionEvent.getSource", "");
   var source = this.getActionEvent(svm, receiver).getSource();
   var v = new Value(Value.OBJECT, source);
   var className = source.$class.getName();
   className = className.substring(className.lastIndexOf(".") + 1);
   v.setClassName(className);
   svm.push(v);
};

var ActionEvent_getActionCommand = function() {
   ActionEventMethod.call(this);
};

ActionEvent_getActionCommand.prototype =
   jslib.inheritPrototype(ActionEventMethod, "ActionEvent_getActionCommand extends ActionEventMethod");
ActionEvent_getActionCommand.prototype.constructor = ActionEvent_getActionCommand;
ActionEvent_getActionCommand.prototype.$class = 
   new Class("ActionEvent_getActionCommand", ActionEvent_getActionCommand);

ActionEvent_getActionCommand.prototype.execute = function(svm, receiver) {
   svm.checkSignature("ActionEvent.getActionCommand", "");
   svm.pushString(this.getActionEvent(svm, receiver).getActionCommand());
};

var ActionEvent_ACTION_PERFORMED = function() {
   SVMConstant.call(this);
};

ActionEvent_ACTION_PERFORMED.prototype =
   jslib.inheritPrototype(SVMConstant, "ActionEvent_ACTION_PERFORMED extends SVMConstant");
ActionEvent_ACTION_PERFORMED.prototype.constructor = ActionEvent_ACTION_PERFORMED;
ActionEvent_ACTION_PERFORMED.prototype.$class = 
   new Class("ActionEvent_ACTION_PERFORMED", ActionEvent_ACTION_PERFORMED);

ActionEvent_ACTION_PERFORMED.prototype.execute = function(svm, receiver) {
   svm.checkSignature("ActionEvent.ACTION_PERFORMED", "");
   svm.pushInteger(SJSActionEventClass.ACTION_PERFORMED);
};

var ActionEvent_TYPE = function() {
   SVMConstant.call(this);
};

ActionEvent_TYPE.prototype =
   jslib.inheritPrototype(SVMConstant, "ActionEvent_TYPE extends SVMConstant");
ActionEvent_TYPE.prototype.constructor = ActionEvent_TYPE;
ActionEvent_TYPE.prototype.$class = 
   new Class("ActionEvent_TYPE", ActionEvent_TYPE);

ActionEvent_TYPE.prototype.execute = function(svm, receiver) {
   svm.checkSignature("ActionEvent.TYPE", "");
   svm.pushInteger(SJSEventClass.ACTION_EVENT);
};


/* SJSArrayListClass.js */

var SJSArrayListClass = function() {
   SVMClass.call(this);
   this.defineMethod("new", new ArrayList_new());
   this.defineMethod("size", new ArrayList_size());
   this.defineMethod("isEmpty", new ArrayList_isEmpty());
   this.defineMethod("clear", new ArrayList_clear());
   this.defineMethod("get", new ArrayList_get());
   this.defineMethod("set", new ArrayList_set());
   this.defineMethod("add", new ArrayList_add());
   this.defineMethod("insert", new ArrayList_insert());
   this.defineMethod("remove", new ArrayList_remove());
};

SJSArrayListClass.prototype = 
   jslib.inheritPrototype(SVMClass, "SJSArrayListClass extends SVMClass");
SJSArrayListClass.prototype.constructor = SJSArrayListClass;
SJSArrayListClass.prototype.$class = 
   new Class("SJSArrayListClass", SJSArrayListClass);

var ArrayListMethod = function() {
   SVMMethod.call(this);
};

ArrayListMethod.prototype =
   jslib.inheritPrototype(SVMMethod, "ArrayListMethod extends SVMMethod");
ArrayListMethod.prototype.constructor = ArrayListMethod;
ArrayListMethod.prototype.$class = 
   new Class("ArrayListMethod", ArrayListMethod);

ArrayListMethod.prototype.getArrayList = function(svm, receiver) {
   if (receiver === null) {
      return svm.pop().getValue();
   } else {
      return receiver.getValue();
   }
};

var ArrayList_new = function() {
   SVMMethod.call(this);
};

ArrayList_new.prototype =
   jslib.inheritPrototype(SVMMethod, "ArrayList_new extends SVMMethod");
ArrayList_new.prototype.constructor = ArrayList_new;
ArrayList_new.prototype.$class = 
   new Class("ArrayList_new", ArrayList_new);

ArrayList_new.prototype.execute = function(svm, receiver) {
   var array = new SVMArray();
   svm.checkSignature("ArrayList.new", "");
   svm.push(Value.createObject(array, "ArrayList"));
};

var ArrayList_size = function() {
   ArrayListMethod.call(this);
};

ArrayList_size.prototype =
   jslib.inheritPrototype(ArrayListMethod, "ArrayList_size extends ArrayListMethod");
ArrayList_size.prototype.constructor = ArrayList_size;
ArrayList_size.prototype.$class = 
   new Class("ArrayList_size", ArrayList_size);

ArrayList_size.prototype.execute = function(svm, receiver) {
   svm.checkSignature("ArrayList.size", "");
   svm.pushInteger(this.getArrayList(svm, receiver).size());
};

var ArrayList_isEmpty = function() {
   ArrayListMethod.call(this);
};

ArrayList_isEmpty.prototype =
   jslib.inheritPrototype(ArrayListMethod, "ArrayList_isEmpty extends ArrayListMethod");
ArrayList_isEmpty.prototype.constructor = ArrayList_isEmpty;
ArrayList_isEmpty.prototype.$class = 
   new Class("ArrayList_isEmpty", ArrayList_isEmpty);

ArrayList_isEmpty.prototype.execute = function(svm, receiver) {
   svm.checkSignature("ArrayList.isEmpty", "");
   svm.pushBoolean(this.getArrayList(svm, receiver).isEmpty());
};

var ArrayList_clear = function() {
   ArrayListMethod.call(this);
};

ArrayList_clear.prototype =
   jslib.inheritPrototype(ArrayListMethod, "ArrayList_clear extends ArrayListMethod");
ArrayList_clear.prototype.constructor = ArrayList_clear;
ArrayList_clear.prototype.$class = 
   new Class("ArrayList_clear", ArrayList_clear);

ArrayList_clear.prototype.execute = function(svm, receiver) {
   svm.checkSignature("ArrayList.clear", "");
   this.getArrayList(svm, receiver).clear();
};

var ArrayList_get = function() {
   ArrayListMethod.call(this);
};

ArrayList_get.prototype =
   jslib.inheritPrototype(ArrayListMethod, "ArrayList_get extends ArrayListMethod");
ArrayList_get.prototype.constructor = ArrayList_get;
ArrayList_get.prototype.$class = 
   new Class("ArrayList_get", ArrayList_get);

ArrayList_get.prototype.execute = function(svm, receiver) {
   svm.checkSignature("ArrayList.get", "I");
   var k = svm.popInteger();
   svm.push(this.getArrayList(svm, receiver).get(k));
};

var ArrayList_set = function() {
   ArrayListMethod.call(this);
};

ArrayList_set.prototype =
   jslib.inheritPrototype(ArrayListMethod, "ArrayList_set extends ArrayListMethod");
ArrayList_set.prototype.constructor = ArrayList_set;
ArrayList_set.prototype.$class = 
   new Class("ArrayList_set", ArrayList_set);

ArrayList_set.prototype.execute = function(svm, receiver) {
   svm.checkSignature("ArrayList.set", "I*");
   var v = svm.pop();
   var k = svm.popInteger();
   this.getArrayList(svm, receiver).set(k, v);
};

var ArrayList_add = function() {
   ArrayListMethod.call(this);
};

ArrayList_add.prototype =
   jslib.inheritPrototype(ArrayListMethod, "ArrayList_add extends ArrayListMethod");
ArrayList_add.prototype.constructor = ArrayList_add;
ArrayList_add.prototype.$class = 
   new Class("ArrayList_add", ArrayList_add);

ArrayList_add.prototype.execute = function(svm, receiver) {
   svm.checkSignature("ArrayList.add", "*");
   var v = svm.pop();
   this.getArrayList(svm, receiver).add(v);
};

var ArrayList_insert = function() {
   ArrayListMethod.call(this);
};

ArrayList_insert.prototype =
   jslib.inheritPrototype(ArrayListMethod, "ArrayList_insert extends ArrayListMethod");
ArrayList_insert.prototype.constructor = ArrayList_insert;
ArrayList_insert.prototype.$class = 
   new Class("ArrayList_insert", ArrayList_insert);

ArrayList_insert.prototype.execute = function(svm, receiver) {
   svm.checkSignature("ArrayList.insert", "I*");
   var v = svm.pop();
   var k = svm.popInteger();
   this.getArrayList(svm, receiver).add(k, v);
};

var ArrayList_remove = function() {
   ArrayListMethod.call(this);
};

ArrayList_remove.prototype =
   jslib.inheritPrototype(ArrayListMethod, "ArrayList_remove extends ArrayListMethod");
ArrayList_remove.prototype.constructor = ArrayList_remove;
ArrayList_remove.prototype.$class = 
   new Class("ArrayList_remove", ArrayList_remove);

ArrayList_remove.prototype.execute = function(svm, receiver) {
   svm.checkSignature("ArrayList.remove", "I");
   var k = svm.popInteger();
   this.getArrayList(svm, receiver).remove(k);
};


/* SJSGridClass.js */

var SJSGridClass = function() {
   SVMClass.call(this);
   this.defineMethod("new", new Grid_new());
   this.defineMethod("numRows", new Grid_numRows());
   this.defineMethod("numCols", new Grid_numCols());
   this.defineMethod("resize", new Grid_resize());
   this.defineMethod("inBounds", new Grid_inBounds());
   this.defineMethod("get", new Grid_get());
   this.defineMethod("set", new Grid_set());
   this.defineMethod("toString", new Grid_toString());
};

SJSGridClass.prototype = 
   jslib.inheritPrototype(SVMClass, "SJSGridClass extends SVMClass");
SJSGridClass.prototype.constructor = SJSGridClass;
SJSGridClass.prototype.$class = 
   new Class("SJSGridClass", SJSGridClass);

var GridMethod = function() {
   SVMMethod.call(this);
};

GridMethod.prototype =
   jslib.inheritPrototype(SVMMethod, "GridMethod extends SVMMethod");
GridMethod.prototype.constructor = GridMethod;
GridMethod.prototype.$class = 
   new Class("GridMethod", GridMethod);

GridMethod.prototype.getGrid = function(svm, receiver) {
   if (receiver === null) {
      return svm.pop().getValue();
   } else {
      return receiver.getValue();
   }
};

var Grid_new = function() {
   SVMMethod.call(this);
};

Grid_new.prototype =
   jslib.inheritPrototype(SVMMethod, "Grid_new extends SVMMethod");
Grid_new.prototype.constructor = Grid_new;
Grid_new.prototype.$class = 
   new Class("Grid_new", Grid_new);

Grid_new.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Grid.new", "II");
   var nCols = svm.popInteger();
   var nRows = svm.popInteger();
   svm.push(Value.createObject(new Grid(nRows, nCols), "Grid"));
};

var Grid_numRows = function() {
   GridMethod.call(this);
};

Grid_numRows.prototype =
   jslib.inheritPrototype(GridMethod, "Grid_numRows extends GridMethod");
Grid_numRows.prototype.constructor = Grid_numRows;
Grid_numRows.prototype.$class = 
   new Class("Grid_numRows", Grid_numRows);

Grid_numRows.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Grid.numRows", "");
   svm.pushInteger(this.getGrid(svm, receiver).numRows());
};

var Grid_numCols = function() {
   GridMethod.call(this);
};

Grid_numCols.prototype =
   jslib.inheritPrototype(GridMethod, "Grid_numCols extends GridMethod");
Grid_numCols.prototype.constructor = Grid_numCols;
Grid_numCols.prototype.$class = 
   new Class("Grid_numCols", Grid_numCols);

Grid_numCols.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Grid.numCols", "");
   svm.pushInteger(this.getGrid(svm, receiver).numCols());
};

var Grid_resize = function() {
   GridMethod.call(this);
};

Grid_resize.prototype =
   jslib.inheritPrototype(GridMethod, "Grid_resize extends GridMethod");
Grid_resize.prototype.constructor = Grid_resize;
Grid_resize.prototype.$class = 
   new Class("Grid_resize", Grid_resize);

Grid_resize.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Grid.resize", "II");
   var nCols = svm.popInteger();
   var nRows = svm.popInteger();
   this.getGrid(svm, receiver).resize(nRows, nCols);
};

var Grid_inBounds = function() {
   GridMethod.call(this);
};

Grid_inBounds.prototype =
   jslib.inheritPrototype(GridMethod, "Grid_inBounds extends GridMethod");
Grid_inBounds.prototype.constructor = Grid_inBounds;
Grid_inBounds.prototype.$class = 
   new Class("Grid_inBounds", Grid_inBounds);

Grid_inBounds.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Grid.inBounds", "II");
   var nCols = svm.popInteger();
   var nRows = svm.popInteger();
   svm.pushBoolean(this.getGrid(svm, receiver).inBounds(nRows, nCols));
};

var Grid_get = function() {
   GridMethod.call(this);
};

Grid_get.prototype =
   jslib.inheritPrototype(GridMethod, "Grid_get extends GridMethod");
Grid_get.prototype.constructor = Grid_get;
Grid_get.prototype.$class = 
   new Class("Grid_get", Grid_get);

Grid_get.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Grid.get", "II");
   var row = svm.popInteger();
   var col = svm.popInteger();
   svm.push(this.getGrid(svm, receiver).get(row, col));
};

var Grid_set = function() {
   GridMethod.call(this);
};

Grid_set.prototype =
   jslib.inheritPrototype(GridMethod, "Grid_set extends GridMethod");
Grid_set.prototype.constructor = Grid_set;
Grid_set.prototype.$class = 
   new Class("Grid_set", Grid_set);

Grid_set.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Grid.set", "II*");
   var v = svm.pop();
   var row = svm.popInteger();
   var col = svm.popInteger();
   this.getGrid(svm, receiver).set(row, col, v);
};

var Grid_toString = function() {
   GridMethod.call(this);
};

Grid_toString.prototype =
   jslib.inheritPrototype(GridMethod, "Grid_toString extends GridMethod");
Grid_toString.prototype.constructor = Grid_toString;
Grid_toString.prototype.$class = 
   new Class("Grid_toString", Grid_toString);

Grid_toString.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Grid.toString", "");
   svm.pushString(this.getGrid(svm, receiver).toString());
};

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
   if (!this.inBounds(row, col)) {
      throw new RuntimeException("set: Grid indices out of bounds");
   }
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


/* SJSMapClass.js */

var SJSMapClass = function() {
   SVMClass.call(this);
   this.defineMethod("new", new Map_new());
   this.defineMethod("keyArray", new Map_keyArray());
   this.defineMethod("size", new Map_size());
   this.defineMethod("isEmpty", new Map_isEmpty());
   this.defineMethod("clear", new Map_clear());
   this.defineMethod("put", new Map_put());
   this.defineMethod("get", new Map_get());
   this.defineMethod("containsKey", new Map_containsKey());
   this.defineMethod("remove", new Map_remove());
};

SJSMapClass.prototype = 
   jslib.inheritPrototype(SVMClass, "SJSMapClass extends SVMClass");
SJSMapClass.prototype.constructor = SJSMapClass;
SJSMapClass.prototype.$class = 
   new Class("SJSMapClass", SJSMapClass);

var MapMethod = function() {
   SVMMethod.call(this);
};

MapMethod.prototype =
   jslib.inheritPrototype(SVMMethod, "MapMethod extends SVMMethod");
MapMethod.prototype.constructor = MapMethod;
MapMethod.prototype.$class = 
   new Class("MapMethod", MapMethod);

MapMethod.prototype.getMap = function(svm, receiver) {
   if (receiver === null) {
      return svm.pop().getValue();
   } else {
      return receiver.getValue();
   }
};

var Map_new = function() {
   SVMMethod.call(this);
};

Map_new.prototype =
   jslib.inheritPrototype(SVMMethod, "Map_new extends SVMMethod");
Map_new.prototype.constructor = Map_new;
Map_new.prototype.$class = 
   new Class("Map_new", Map_new);

Map_new.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Map.new", "");
   svm.push(Value.createObject(new SVMObject(), "Map"));
};

var Map_create = function() {
   SVMMethod.call(this);
};

Map_create.prototype =
   jslib.inheritPrototype(SVMMethod, "Map_create extends SVMMethod");
Map_create.prototype.constructor = Map_create;
Map_create.prototype.$class = 
   new Class("Map_create", Map_create);

Map_create.prototype.execute = function(svm, receiver) {
   var m = new SVMObject();
   var nArgs = svm.getArgumentCount();
   for (var i = 0; i < nArgs; i += 2) {
      var v = svm.pop();
      var k = svm.popString();
      m.put(k, v);
   }
   svm.push(Value.createObject(m, "Map"));
};

var Map_keyArray = function() {
   MapMethod.call(this);
};

Map_keyArray.prototype =
   jslib.inheritPrototype(MapMethod, "Map_keyArray extends MapMethod");
Map_keyArray.prototype.constructor = Map_keyArray;
Map_keyArray.prototype.$class = 
   new Class("Map_keyArray", Map_keyArray);

Map_keyArray.prototype.execute = function(svm, receiver) {
   var array = new SVMArray();
   var el0 = new JSElementList(this.getMap(svm, receiver).keySet());
   for (var ei0 = 0; ei0 < el0.size(); ei0++) {
      var key = el0.get(ei0);
      array.add(Value.createString(key));
   }
   svm.push(Value.createObject(array, "Array"));
};

var Map_size = function() {
   MapMethod.call(this);
};

Map_size.prototype =
   jslib.inheritPrototype(MapMethod, "Map_size extends MapMethod");
Map_size.prototype.constructor = Map_size;
Map_size.prototype.$class = 
   new Class("Map_size", Map_size);

Map_size.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Map.size", "");
   svm.pushInteger(this.getMap(svm, receiver).size());
};

var Map_isEmpty = function() {
   MapMethod.call(this);
};

Map_isEmpty.prototype =
   jslib.inheritPrototype(MapMethod, "Map_isEmpty extends MapMethod");
Map_isEmpty.prototype.constructor = Map_isEmpty;
Map_isEmpty.prototype.$class = 
   new Class("Map_isEmpty", Map_isEmpty);

Map_isEmpty.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Map.isEmpty", "");
   svm.pushBoolean(this.getMap(svm, receiver).isEmpty());
};

var Map_clear = function() {
   MapMethod.call(this);
};

Map_clear.prototype =
   jslib.inheritPrototype(MapMethod, "Map_clear extends MapMethod");
Map_clear.prototype.constructor = Map_clear;
Map_clear.prototype.$class = 
   new Class("Map_clear", Map_clear);

Map_clear.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Map.clear", "");
   this.getMap(svm, receiver).clear();
};

var Map_get = function() {
   MapMethod.call(this);
};

Map_get.prototype =
   jslib.inheritPrototype(MapMethod, "Map_get extends MapMethod");
Map_get.prototype.constructor = Map_get;
Map_get.prototype.$class = 
   new Class("Map_get", Map_get);

Map_get.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Map.get", "S");
   var str = svm.popString();
   var v = this.getMap(svm, receiver).get(str);
   svm.push((v === null) ? Value.UNDEFINED : v);
};

var Map_put = function() {
   MapMethod.call(this);
};

Map_put.prototype =
   jslib.inheritPrototype(MapMethod, "Map_put extends MapMethod");
Map_put.prototype.constructor = Map_put;
Map_put.prototype.$class = 
   new Class("Map_put", Map_put);

Map_put.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Map.put", "S*");
   var v = svm.pop();
   var str = svm.popString();
   this.getMap(svm, receiver).put(str, v);
};

var Map_containsKey = function() {
   MapMethod.call(this);
};

Map_containsKey.prototype =
   jslib.inheritPrototype(MapMethod, "Map_containsKey extends MapMethod");
Map_containsKey.prototype.constructor = Map_containsKey;
Map_containsKey.prototype.$class = 
   new Class("Map_containsKey", Map_containsKey);

Map_containsKey.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Map.containsKey", "S");
   var str = svm.popString();
   svm.pushBoolean(this.getMap(svm, receiver).containsKey(str));
};

var Map_remove = function() {
   MapMethod.call(this);
};

Map_remove.prototype =
   jslib.inheritPrototype(MapMethod, "Map_remove extends MapMethod");
Map_remove.prototype.constructor = Map_remove;
Map_remove.prototype.$class = 
   new Class("Map_remove", Map_remove);

Map_remove.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Map.remove", "S");
   var str = svm.popString();
   this.getMap(svm, receiver).remove(str);
};


/* SJSPackage_util.js */

var SJSPackage_util = function() {
   SVMPackage.call(this);
};

SJSPackage_util.prototype =
   jslib.inheritPrototype(SVMPackage, "SJSPackage_util extends SVMPackage");
SJSPackage_util.prototype.constructor = SJSPackage_util;
SJSPackage_util.prototype.$class = 
   new Class("SJSPackage_util", SJSPackage_util);

SJSPackage_util.prototype.defineClasses = function(svm) {
   SVMClass.defineClass(svm, "ActionEvent", new SJSActionEventClass());
   SVMClass.defineClass(svm, "ArrayList", new SJSArrayListClass());
   SVMClass.defineClass(svm, "Grid", new SJSGridClass());
   SVMClass.defineClass(svm, "Map", new SJSMapClass());
   SVMClass.defineClass(svm, "Queue", new SJSQueueClass());
   SVMClass.defineClass(svm, "Random", new SJSRandomClass());
   SVMClass.defineClass(svm, "Set", new SJSSetClass());
   SVMClass.defineClass(svm, "Stack", new SJSStackClass());
   SVMClass.defineClass(svm, "Timer", new SJSTimerClass());
};


/* SJSQueueClass.js */

var SJSQueueClass = function() {
   SVMClass.call(this);
   this.defineMethod("new", new Queue_new());
   this.defineMethod("size", new Queue_size());
   this.defineMethod("isEmpty", new Queue_isEmpty());
   this.defineMethod("clear", new Queue_clear());
   this.defineMethod("enqueue", new Queue_enqueue());
   this.defineMethod("dequeue", new Queue_dequeue());
   this.defineMethod("add", new Queue_add());
   this.defineMethod("remove", new Queue_remove());
   this.defineMethod("peek", new Queue_peek());
};

SJSQueueClass.prototype = 
   jslib.inheritPrototype(SVMClass, "SJSQueueClass extends SVMClass");
SJSQueueClass.prototype.constructor = SJSQueueClass;
SJSQueueClass.prototype.$class = 
   new Class("SJSQueueClass", SJSQueueClass);

var QueueMethod = function() {
   SVMMethod.call(this);
};

QueueMethod.prototype =
   jslib.inheritPrototype(SVMMethod, "QueueMethod extends SVMMethod");
QueueMethod.prototype.constructor = QueueMethod;
QueueMethod.prototype.$class = 
   new Class("QueueMethod", QueueMethod);

QueueMethod.prototype.getQueue = function(svm, receiver) {
   if (receiver === null) {
      return svm.pop().getValue();
   } else {
      return receiver.getValue();
   }
};

var Queue_new = function() {
   SVMMethod.call(this);
};

Queue_new.prototype =
   jslib.inheritPrototype(SVMMethod, "Queue_new extends SVMMethod");
Queue_new.prototype.constructor = Queue_new;
Queue_new.prototype.$class = 
   new Class("Queue_new", Queue_new);

Queue_new.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Queue.new", "");
   svm.push(Value.createObject(new Queue(), "Queue"));
};

var Queue_size = function() {
   QueueMethod.call(this);
};

Queue_size.prototype =
   jslib.inheritPrototype(QueueMethod, "Queue_size extends QueueMethod");
Queue_size.prototype.constructor = Queue_size;
Queue_size.prototype.$class = 
   new Class("Queue_size", Queue_size);

Queue_size.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Queue.size", "");
   svm.pushInteger(this.getQueue(svm, receiver).size());
};

var Queue_isEmpty = function() {
   QueueMethod.call(this);
};

Queue_isEmpty.prototype =
   jslib.inheritPrototype(QueueMethod, "Queue_isEmpty extends QueueMethod");
Queue_isEmpty.prototype.constructor = Queue_isEmpty;
Queue_isEmpty.prototype.$class = 
   new Class("Queue_isEmpty", Queue_isEmpty);

Queue_isEmpty.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Queue.isEmpty", "");
   svm.pushBoolean(this.getQueue(svm, receiver).isEmpty());
};

var Queue_clear = function() {
   QueueMethod.call(this);
};

Queue_clear.prototype =
   jslib.inheritPrototype(QueueMethod, "Queue_clear extends QueueMethod");
Queue_clear.prototype.constructor = Queue_clear;
Queue_clear.prototype.$class = 
   new Class("Queue_clear", Queue_clear);

Queue_clear.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Queue.clear", "");
   this.getQueue(svm, receiver).clear();
};

var Queue_enqueue = function() {
   QueueMethod.call(this);
};

Queue_enqueue.prototype =
   jslib.inheritPrototype(QueueMethod, "Queue_enqueue extends QueueMethod");
Queue_enqueue.prototype.constructor = Queue_enqueue;
Queue_enqueue.prototype.$class = 
   new Class("Queue_enqueue", Queue_enqueue);

Queue_enqueue.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Queue.enqueue", "*");
   var v = svm.pop();
   this.getQueue(svm, receiver).add(v);
};

var Queue_dequeue = function() {
   QueueMethod.call(this);
};

Queue_dequeue.prototype =
   jslib.inheritPrototype(QueueMethod, "Queue_dequeue extends QueueMethod");
Queue_dequeue.prototype.constructor = Queue_dequeue;
Queue_dequeue.prototype.$class = 
   new Class("Queue_dequeue", Queue_dequeue);

Queue_dequeue.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Queue.dequeue", "");
   var queue = this.getQueue(svm, receiver);
   if (queue.isEmpty()) throw new RuntimeException("Queue is empty");
   svm.push(queue.remove());
};

var Queue_add = function() {
   QueueMethod.call(this);
};

Queue_add.prototype =
   jslib.inheritPrototype(QueueMethod, "Queue_add extends QueueMethod");
Queue_add.prototype.constructor = Queue_add;
Queue_add.prototype.$class = 
   new Class("Queue_add", Queue_add);

Queue_add.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Queue.add", "*");
   var v = svm.pop();
   this.getQueue(svm, receiver).add(v);
};

var Queue_remove = function() {
   QueueMethod.call(this);
};

Queue_remove.prototype =
   jslib.inheritPrototype(QueueMethod, "Queue_remove extends QueueMethod");
Queue_remove.prototype.constructor = Queue_remove;
Queue_remove.prototype.$class = 
   new Class("Queue_remove", Queue_remove);

Queue_remove.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Queue.remove", "");
   var queue = this.getQueue(svm, receiver);
   if (queue.isEmpty()) throw new RuntimeException("Queue is empty");
   svm.push(queue.remove());
};

var Queue_peek = function() {
   QueueMethod.call(this);
};

Queue_peek.prototype =
   jslib.inheritPrototype(QueueMethod, "Queue_peek extends QueueMethod");
Queue_peek.prototype.constructor = Queue_peek;
Queue_peek.prototype.$class = 
   new Class("Queue_peek", Queue_peek);

Queue_peek.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Queue.peek", "");
   var queue = this.getQueue(svm, receiver);
   if (queue.isEmpty()) throw new RuntimeException("Queue is empty");
   svm.push(queue.peek());
};

var Queue = function() {
   ArrayDeque.call(this);
};

Queue.prototype =
   jslib.inheritPrototype(ArrayDeque, "Queue extends ArrayDeque");
Queue.prototype.constructor = Queue;
Queue.prototype.$class = 
   new Class("Queue", Queue);


/* SJSRandomClass.js */

var SJSRandomClass = function() {
   SVMClass.call(this);
   this.defineMethod("nextBoolean", new Random_nextBoolean());
   this.defineMethod("nextDouble", new Random_nextDouble());
   this.defineMethod("nextInt", new Random_nextInt());
   this.defineMethod("setSeed", new Random_setSeed());
};

SJSRandomClass.prototype = 
   jslib.inheritPrototype(SVMClass, "SJSRandomClass extends SVMClass");
SJSRandomClass.prototype.constructor = SJSRandomClass;
SJSRandomClass.prototype.$class = 
   new Class("SJSRandomClass", SJSRandomClass);

var Random_nextBoolean = function() {
   SVMMethod.call(this);
};

Random_nextBoolean.prototype =
   jslib.inheritPrototype(SVMMethod, "Random_nextBoolean extends SVMMethod");
Random_nextBoolean.prototype.constructor = Random_nextBoolean;
Random_nextBoolean.prototype.$class = 
   new Class("Random_nextBoolean", Random_nextBoolean);

Random_nextBoolean.prototype.execute = function(svm, receiver) {
   if (svm.getArgumentCount() === 0) {
      svm.checkSignature("Random.nextBoolean", "");
      svm.pushBoolean(RandomGenerator.getInstance().nextBoolean());
   } else {
      svm.checkSignature("Random.nextDouble", "D");
      var p = svm.popDouble();
      svm.pushBoolean(RandomGenerator.getInstance().nextBoolean(p));
   }
};

var Random_nextDouble = function() {
   SVMMethod.call(this);
};

Random_nextDouble.prototype =
   jslib.inheritPrototype(SVMMethod, "Random_nextDouble extends SVMMethod");
Random_nextDouble.prototype.constructor = Random_nextDouble;
Random_nextDouble.prototype.$class = 
   new Class("Random_nextDouble", Random_nextDouble);

Random_nextDouble.prototype.execute = function(svm, receiver) {
   if (svm.getArgumentCount() === 0) {
      svm.checkSignature("Random.nextDouble", "");
      svm.pushDouble(RandomGenerator.getInstance().nextDouble());
   } else {
      svm.checkSignature("Random.nextDouble", "DD");
      var high = svm.popDouble();
      var low = svm.popDouble();
      svm.pushDouble(RandomGenerator.getInstance().nextDouble(low, high));
   }
};

var Random_nextInt = function() {
   SVMMethod.call(this);
};

Random_nextInt.prototype =
   jslib.inheritPrototype(SVMMethod, "Random_nextInt extends SVMMethod");
Random_nextInt.prototype.constructor = Random_nextInt;
Random_nextInt.prototype.$class = 
   new Class("Random_nextInt", Random_nextInt);

Random_nextInt.prototype.execute = function(svm, receiver) {
   if (svm.getArgumentCount() === 1) {
      svm.checkSignature("Random.nextInt", "I");
      var n = svm.popInteger();
      svm.pushInteger(RandomGenerator.getInstance().nextInt(n));
   } else {
      svm.checkSignature("Random.nextInt", "II");
      var high = svm.popInteger();
      var low = svm.popInteger();
      svm.pushInteger(RandomGenerator.getInstance().nextInt(low, high));
   }
};

var Random_setSeed = function() {
   SVMMethod.call(this);
};

Random_setSeed.prototype =
   jslib.inheritPrototype(SVMMethod, "Random_setSeed extends SVMMethod");
Random_setSeed.prototype.constructor = Random_setSeed;
Random_setSeed.prototype.$class = 
   new Class("Random_setSeed", Random_setSeed);

Random_setSeed.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Random.setSeed", "I");
   RandomGenerator.getInstance().setSeed(svm.popInteger());
};


/* SJSSetClass.js */

var SJSSetClass = function() {
   SVMClass.call(this);
   this.defineMethod("new", new Set_new());
   this.defineMethod("keyArray", new Set_keyArray());
   this.defineMethod("size", new Set_size());
   this.defineMethod("isEmpty", new Set_isEmpty());
   this.defineMethod("clear", new Set_clear());
   this.defineMethod("contains", new Set_contains());
   this.defineMethod("add", new Set_add());
   this.defineMethod("remove", new Set_remove());
};

SJSSetClass.prototype = 
   jslib.inheritPrototype(SVMClass, "SJSSetClass extends SVMClass");
SJSSetClass.prototype.constructor = SJSSetClass;
SJSSetClass.prototype.$class = 
   new Class("SJSSetClass", SJSSetClass);

var SetMethod = function() {
   SVMMethod.call(this);
};

SetMethod.prototype =
   jslib.inheritPrototype(SVMMethod, "SetMethod extends SVMMethod");
SetMethod.prototype.constructor = SetMethod;
SetMethod.prototype.$class = 
   new Class("SetMethod", SetMethod);

SetMethod.prototype.getSet = function(svm, receiver) {
   if (receiver === null) {
      return svm.pop().getValue();
   } else {
      return receiver.getValue();
   }
};

var Set_new = function() {
   SVMMethod.call(this);
};

Set_new.prototype =
   jslib.inheritPrototype(SVMMethod, "Set_new extends SVMMethod");
Set_new.prototype.constructor = Set_new;
Set_new.prototype.$class = 
   new Class("Set_new", Set_new);

Set_new.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Set.new", "");
   svm.push(Value.createObject(new Set(), "Set"));
};

var Set_keyArray = function() {
   SetMethod.call(this);
};

Set_keyArray.prototype =
   jslib.inheritPrototype(SetMethod, "Set_keyArray extends SetMethod");
Set_keyArray.prototype.constructor = Set_keyArray;
Set_keyArray.prototype.$class = 
   new Class("Set_keyArray", Set_keyArray);

Set_keyArray.prototype.execute = function(svm, receiver) {
   var array = new SVMArray();
   var el0 = new JSElementList(this.getSet(svm, receiver));
   for (var ei0 = 0; ei0 < el0.size(); ei0++) {
      var key = el0.get(ei0);
      array.add(Value.createString(key));
   }
   svm.push(Value.createObject(array, "Array"));
};

var Set_size = function() {
   SetMethod.call(this);
};

Set_size.prototype =
   jslib.inheritPrototype(SetMethod, "Set_size extends SetMethod");
Set_size.prototype.constructor = Set_size;
Set_size.prototype.$class = 
   new Class("Set_size", Set_size);

Set_size.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Set.size", "");
   svm.pushInteger(this.getSet(svm, receiver).size());
};

var Set_isEmpty = function() {
   SetMethod.call(this);
};

Set_isEmpty.prototype =
   jslib.inheritPrototype(SetMethod, "Set_isEmpty extends SetMethod");
Set_isEmpty.prototype.constructor = Set_isEmpty;
Set_isEmpty.prototype.$class = 
   new Class("Set_isEmpty", Set_isEmpty);

Set_isEmpty.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Set.isEmpty", "");
   svm.pushBoolean(this.getSet(svm, receiver).isEmpty());
};

var Set_clear = function() {
   SetMethod.call(this);
};

Set_clear.prototype =
   jslib.inheritPrototype(SetMethod, "Set_clear extends SetMethod");
Set_clear.prototype.constructor = Set_clear;
Set_clear.prototype.$class = 
   new Class("Set_clear", Set_clear);

Set_clear.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Set.clear", "");
   this.getSet(svm, receiver).clear();
};

var Set_contains = function() {
   SetMethod.call(this);
};

Set_contains.prototype =
   jslib.inheritPrototype(SetMethod, "Set_contains extends SetMethod");
Set_contains.prototype.constructor = Set_contains;
Set_contains.prototype.$class = 
   new Class("Set_contains", Set_contains);

Set_contains.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Set.contains", "S");
   var str = svm.popString();
   svm.pushBoolean(this.getSet(svm, receiver).contains(str));
};

var Set_add = function() {
   SetMethod.call(this);
};

Set_add.prototype =
   jslib.inheritPrototype(SetMethod, "Set_add extends SetMethod");
Set_add.prototype.constructor = Set_add;
Set_add.prototype.$class = 
   new Class("Set_add", Set_add);

Set_add.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Set.add", "S");
   var str = svm.popString();
   this.getSet(svm, receiver).add(str);
};

var Set_remove = function() {
   SetMethod.call(this);
};

Set_remove.prototype =
   jslib.inheritPrototype(SetMethod, "Set_remove extends SetMethod");
Set_remove.prototype.constructor = Set_remove;
Set_remove.prototype.$class = 
   new Class("Set_remove", Set_remove);

Set_remove.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Set.remove", "S");
   var str = svm.popString();
   this.getSet(svm, receiver).remove(str);
};

var Set = function() {
   TreeSet.call(this);
};

Set.prototype =
   jslib.inheritPrototype(TreeSet, "Set extends TreeSet");
Set.prototype.constructor = Set;
Set.prototype.$class = 
   new Class("Set", Set);


/* SJSStackClass.js */

var SJSStackClass = function() {
   SVMClass.call(this);
   this.defineMethod("new", new Stack_new());
   this.defineMethod("size", new Stack_size());
   this.defineMethod("isEmpty", new Stack_isEmpty());
   this.defineMethod("clear", new Stack_clear());
   this.defineMethod("push", new Stack_push());
   this.defineMethod("pop", new Stack_pop());
   this.defineMethod("peek", new Stack_peek());
};

SJSStackClass.prototype = 
   jslib.inheritPrototype(SVMClass, "SJSStackClass extends SVMClass");
SJSStackClass.prototype.constructor = SJSStackClass;
SJSStackClass.prototype.$class = 
   new Class("SJSStackClass", SJSStackClass);

var StackMethod = function() {
   SVMMethod.call(this);
};

StackMethod.prototype =
   jslib.inheritPrototype(SVMMethod, "StackMethod extends SVMMethod");
StackMethod.prototype.constructor = StackMethod;
StackMethod.prototype.$class = 
   new Class("StackMethod", StackMethod);

StackMethod.prototype.getStack = function(svm, receiver) {
   if (receiver === null) {
      return svm.pop().getValue();
   } else {
      return receiver.getValue();
   }
};

var Stack_new = function() {
   SVMMethod.call(this);
};

Stack_new.prototype =
   jslib.inheritPrototype(SVMMethod, "Stack_new extends SVMMethod");
Stack_new.prototype.constructor = Stack_new;
Stack_new.prototype.$class = 
   new Class("Stack_new", Stack_new);

Stack_new.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Stack.new", "");
   svm.push(Value.createObject(new Stack(), "Stack"));
};

var Stack_size = function() {
   StackMethod.call(this);
};

Stack_size.prototype =
   jslib.inheritPrototype(StackMethod, "Stack_size extends StackMethod");
Stack_size.prototype.constructor = Stack_size;
Stack_size.prototype.$class = 
   new Class("Stack_size", Stack_size);

Stack_size.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Stack.size", "");
   svm.pushInteger(this.getStack(svm, receiver).size());
};

var Stack_isEmpty = function() {
   StackMethod.call(this);
};

Stack_isEmpty.prototype =
   jslib.inheritPrototype(StackMethod, "Stack_isEmpty extends StackMethod");
Stack_isEmpty.prototype.constructor = Stack_isEmpty;
Stack_isEmpty.prototype.$class = 
   new Class("Stack_isEmpty", Stack_isEmpty);

Stack_isEmpty.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Stack.isEmpty", "");
   svm.pushBoolean(this.getStack(svm, receiver).isEmpty());
};

var Stack_clear = function() {
   StackMethod.call(this);
};

Stack_clear.prototype =
   jslib.inheritPrototype(StackMethod, "Stack_clear extends StackMethod");
Stack_clear.prototype.constructor = Stack_clear;
Stack_clear.prototype.$class = 
   new Class("Stack_clear", Stack_clear);

Stack_clear.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Stack.clear", "");
   this.getStack(svm, receiver).clear();
};

var Stack_push = function() {
   StackMethod.call(this);
};

Stack_push.prototype =
   jslib.inheritPrototype(StackMethod, "Stack_push extends StackMethod");
Stack_push.prototype.constructor = Stack_push;
Stack_push.prototype.$class = 
   new Class("Stack_push", Stack_push);

Stack_push.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Stack.push", "*");
   var v = svm.pop();
   this.getStack(svm, receiver).push(v);
};

var Stack_pop = function() {
   StackMethod.call(this);
};

Stack_pop.prototype =
   jslib.inheritPrototype(StackMethod, "Stack_pop extends StackMethod");
Stack_pop.prototype.constructor = Stack_pop;
Stack_pop.prototype.$class = 
   new Class("Stack_pop", Stack_pop);

Stack_pop.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Stack.pop", "");
   var stack = this.getStack(svm, receiver);
   if (stack.isEmpty()) throw new RuntimeException("Stack is empty");
   svm.push(stack.pop());
};

var Stack_peek = function() {
   StackMethod.call(this);
};

Stack_peek.prototype =
   jslib.inheritPrototype(StackMethod, "Stack_peek extends StackMethod");
Stack_peek.prototype.constructor = Stack_peek;
Stack_peek.prototype.$class = 
   new Class("Stack_peek", Stack_peek);

Stack_peek.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Stack.peek", "");
   var stack = this.getStack(svm, receiver);
   if (stack.isEmpty()) throw new RuntimeException("Stack is empty");
   svm.push(stack.peek());
};

var Stack = function() {
   ArrayDeque.call(this);
};

Stack.prototype =
   jslib.inheritPrototype(ArrayDeque, "Stack extends ArrayDeque");
Stack.prototype.constructor = Stack;
Stack.prototype.$class = 
   new Class("Stack", Stack);


/* SJSTimerClass.js */

var SJSTimerClass = function() {
   SVMClass.call(this);
   this.defineMethod("new", new Timer_new());
   this.defineMethod("setRepeats", new Timer_setRepeats());
   this.defineMethod("setActionCommand", new Timer_setActionCommand());
   this.defineMethod("start", new Timer_start());
   this.defineMethod("stop", new Timer_stop());
   this.defineMethod("pause", new Timer_pause());
};

SJSTimerClass.prototype = 
   jslib.inheritPrototype(SVMClass, "SJSTimerClass extends SVMClass");
SJSTimerClass.prototype.constructor = SJSTimerClass;
SJSTimerClass.prototype.$class = 
   new Class("SJSTimerClass", SJSTimerClass);

var Timer_new = function() {
   SVMMethod.call(this);
};

Timer_new.prototype =
   jslib.inheritPrototype(SVMMethod, "Timer_new extends SVMMethod");
Timer_new.prototype.constructor = Timer_new;
Timer_new.prototype.$class = 
   new Class("Timer_new", Timer_new);

Timer_new.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Timer.new", "I");
   var delay = svm.popInteger();
   var l = svm.getGlobal("canvas").getValue();
   svm.push(Value.createObject(new Timer(delay, l), "Timer"));
};

var TimerMethod = function() {
   SVMMethod.call(this);
};

TimerMethod.prototype =
   jslib.inheritPrototype(SVMMethod, "TimerMethod extends SVMMethod");
TimerMethod.prototype.constructor = TimerMethod;
TimerMethod.prototype.$class = 
   new Class("TimerMethod", TimerMethod);

TimerMethod.prototype.getTimer = function(svm, receiver) {
   if (receiver === null) {
      return svm.pop().getValue();
   } else {
      return receiver.getValue();
   }
};

var Timer_setRepeats = function() {
   TimerMethod.call(this);
};

Timer_setRepeats.prototype =
   jslib.inheritPrototype(TimerMethod, "Timer_setRepeats extends TimerMethod");
Timer_setRepeats.prototype.constructor = Timer_setRepeats;
Timer_setRepeats.prototype.$class = 
   new Class("Timer_setRepeats", Timer_setRepeats);

Timer_setRepeats.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Timer.setRepeats", "B");
   var flag = svm.popBoolean();
   this.getTimer(svm, receiver).setRepeats(flag);
};

var Timer_setActionCommand = function() {
   TimerMethod.call(this);
};

Timer_setActionCommand.prototype =
   jslib.inheritPrototype(TimerMethod, "Timer_setActionCommand extends TimerMethod");
Timer_setActionCommand.prototype.constructor = Timer_setActionCommand;
Timer_setActionCommand.prototype.$class = 
   new Class("Timer_setActionCommand", Timer_setActionCommand);

Timer_setActionCommand.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Timer.setActionCommand", "S");
   var cmd = svm.popString();
   this.getTimer(svm, receiver).setActionCommand(cmd);
};

var Timer_start = function() {
   TimerMethod.call(this);
};

Timer_start.prototype =
   jslib.inheritPrototype(TimerMethod, "Timer_start extends TimerMethod");
Timer_start.prototype.constructor = Timer_start;
Timer_start.prototype.$class = 
   new Class("Timer_start", Timer_start);

Timer_start.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Timer.start", "");
   this.getTimer(svm, receiver).start();
};

var Timer_stop = function() {
   TimerMethod.call(this);
};

Timer_stop.prototype =
   jslib.inheritPrototype(TimerMethod, "Timer_stop extends TimerMethod");
Timer_stop.prototype.constructor = Timer_stop;
Timer_stop.prototype.$class = 
   new Class("Timer_stop", Timer_stop);

Timer_stop.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Timer.stop", "");
   this.getTimer(svm, receiver).stop();
};

var Timer_pause = function() {
   SVMMethod.call(this);
};

Timer_pause.prototype =
   jslib.inheritPrototype(SVMMethod, "Timer_pause extends SVMMethod");
Timer_pause.prototype.constructor = Timer_pause;
Timer_pause.prototype.$class = 
   new Class("Timer_pause", Timer_pause);

Timer_pause.prototype.execute = function(svm, receiver) {
   svm.checkSignature("Timer.pause", "I");
   var timer = new Timer(svm.popInteger(), new PauseListener(svm));
   timer.setRepeats(false);
   timer.start();
   svm.setState(SVM.WAITING);
};

var PauseListener = function(svm) {
   this.svm = svm;
};

PauseListener.prototype.actionPerformed = function(e) {
   this.svm.run();
};


/* Exports */

return {
   SJSActionEventClass : SJSActionEventClass,
   SJSArrayListClass : SJSArrayListClass,
   SJSGridClass : SJSGridClass,
   SJSMapClass : SJSMapClass,
   SJSPackage_util : SJSPackage_util,
   SJSQueueClass : SJSQueueClass,
   SJSRandomClass : SJSRandomClass,
   SJSSetClass : SJSSetClass,
   SJSStackClass : SJSStackClass,
   SJSTimerClass : SJSTimerClass
};

});
