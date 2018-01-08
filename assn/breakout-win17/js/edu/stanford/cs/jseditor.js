/*
 * File: jseditor.js
 * -----------------
 * This file implements the JSEditor class on top of Ace, which must already
 * be loaded using the global variable ace.
 */

define([ "jslib",
         "edu/stanford/cs/java2js",
         "java/awt",
         "javax/swing" ],

function(jslib,
         edu_stanford_cs_java2js,
         java_awt,
         javax_swing) {

/* Imports */

var inheritPrototype = jslib.inheritPrototype;
var newArray = jslib.newArray;
var toInt = jslib.toInt;
var toStr = jslib.toStr;
var Integer = jslib.Integer;
var Double = jslib.Double;
var Character = jslib.Character;
var JSElementList = jslib.JSElementList;
var getLocalCoordinates = jslib.getLocalCoordinates;
var getScreenCoordinates = jslib.getScreenCoordinates;
var RuntimeException = jslib.RuntimeException;
var JSPanel = edu_stanford_cs_java2js.JSPanel;
var AdjustmentEvent = java_awt.AdjustmentEvent;
var BorderLayout = java_awt.BorderLayout;
var Color = java_awt.Color;
var FontMetrics = java_awt.FontMetrics;
var Insets = java_awt.Insets;
var Point = java_awt.Point;
var ChangeEvent = javax_swing.ChangeEvent;
var JComponent = javax_swing.JComponent;
var Position = javax_swing.Position;

var oop = ace.require("ace/lib/oop");
var Range = ace.require("ace/range").Range;
var TextMode = ace.require("ace/mode/text").Mode;
var TextHighlightRules =
    ace.require("ace/mode/text_highlight_rules").TextHighlightRules;
var Tokenizer = ace.require("ace/tokenizer").Tokenizer;

/* JSEditor.js */

var JSEditor = function() {
   JSPanel.call(this);
   this.setLayout(new BorderLayout());
   this.textPane = new JComponent();
   this.add(this.textPane, BorderLayout.CENTER);
   this.aceEditor = ace.edit(this.textPane.element);
   this.aceEditor.setHighlightActiveLine(false);
   this.aceEditor.setHighlightSelectedWord(false);
   this.aceEditor.setDisplayIndentGuides(false);
   this.aceEditor.setShowPrintMargin(false);
   this.aceEditor.renderer.setShowGutter(false);
   this.adjustmentListeners = [ ];
   this.changeListeners = [ ];
   this.changeListenersEnabled = true;
   this.frame = null;
};

JSEditor.prototype =
   jslib.inheritPrototype(JSPanel, "JSEditor extends JSPanel");
JSEditor.prototype.constructor = JSEditor;

JSEditor.prototype.setText = function(text) {
   this.changeListenersEnabled = false;
   this.aceEditor.setValue(text);
   this.changeListenersEnabled = true;
   this.fireChangeListeners();
};

JSEditor.prototype.getText = function() {
   return this.aceEditor.getValue();
};

JSEditor.prototype.select = function(start, end) {
   var document = this.aceEditor.session.getDocument();
   var rc1 = document.indexToPosition(start);
   var rc2 = document.indexToPosition(end);
   var range = new Range(rc1.row, rc1.column, rc2.row, rc2.column);
   return this.aceEditor.getSelection().setSelectionRange(range);
};

JSEditor.prototype.setMargin = function(insets) {
   if (typeof(insets) === "number") {
      this.aceEditor.renderer.setScrollMargin(insets, insets, insets, insets);
      this.insets = new Insets(insets, insets, insets, insets);
   } else {
      this.aceEditor.renderer.setScrollMargin(insets.top, insets.bottom,
                                              insets.left, insets.right);
      this.insets = insets;
   }
};

JSEditor.prototype.getMargin = function() {
   return this.insets;
};

JSEditor.prototype.requestFocus = function() {
   this.aceEditor.focus();
};

JSEditor.prototype.setCursorPosition = function(offset) {
   var document = this.aceEditor.session.getDocument();
   var rc = document.indexToPosition(offset);
   this.aceEditor.navigateTo(rc.row, rc.column);
};

JSEditor.prototype.getCursorPosition = function() {
   var document = this.aceEditor.session.getDocument();
   return document.positionToIndex(this.aceEditor.getCursorPosition(), 0);
};

JSEditor.prototype.setFont = function(font) {
   this.font = font;
   if (this.textPane) {
      this.textPane.element.style.font = font.getFontTag();
   }
};

JSEditor.prototype.getFont = function() {
   return this.font;
};

JSEditor.prototype.getLineHeight = function() {
   return this.aceEditor.renderer.layerConfig.lineHeight ||
          this.font.getFontMetrics().getHeight();
};

JSEditor.prototype.getTextPaneMetrics = function() {
   return this.font.getFontMetrics();
};

JSEditor.prototype.setFrame = function(frame) {
   this.frame = frame;
};

JSEditor.prototype.getFrame = function() {
   return this.frame;
};

JSEditor.prototype.setLineWrap = function(flag) {
   this.aceEditor.session.setUseWrapMode(flag);
};

JSEditor.prototype.getLineWrap = function() {
   return this.aceEditor.session.getUseWrapMode();
};

JSEditor.prototype.getLine = function(k) {
   var line = this.aceEditor.session.getDocument().getLine(k - 1);
   return line;
};

JSEditor.prototype.getLineNumber = function(offset) {
   var document = this.aceEditor.session.getDocument();
   return document.indexToPosition(offset).row + 1;
};

JSEditor.prototype.ensureLineVisible = function(k) {
   var first = this.aceEditor.renderer.getFirstFullyVisibleRow() + 1;
   var last = this.aceEditor.renderer.getLastFullyVisibleRow() + 1;
   if (first <= k && k <= last) return;
   var top = Math.max(1, k - toInt((last - first) / 2));
   this.aceEditor.renderer.scrollToRow(top - 1);
};

JSEditor.prototype.pointToOffset = function(pt) {
   var renderer = this.aceEditor.renderer;
   var document = this.aceEditor.session.getDocument();
   var textPoint = getScreenCoordinates(pt, this.textPane.element);
   var rc = renderer.screenToTextCoordinates(textPoint.x, textPoint.y);
   return document.positionToIndex(rc, 0);
};

JSEditor.prototype.offsetToPoint = function(index) {
   var renderer = this.aceEditor.renderer;
   var document = this.aceEditor.session.getDocument();
   var rc = document.indexToPosition(index, 0);
   var spt = renderer.textToScreenCoordinates(rc.row, rc.column);
   var pt = getLocalCoordinates(spt, this.textPane.element);
   var fm = this.getFont().getFontMetrics();
   return new Point(pt.x, pt.y + fm.getAscent());
};

JSEditor.prototype.getTopLine = function() {
   return this.aceEditor.renderer.getFirstVisibleRow() + 1;
};

JSEditor.prototype.setTextColor = function(p1, p2, color) {
   var session = this.aceEditor.session;
   var renderer = this.aceEditor.renderer;
   var document = session.getDocument();
   var range = new Range(document.indexToPosition(p1),
                         document.indexToPosition(p2));
   session.addMarker(range, "comment", "text");
};

JSEditor.prototype.getLineStart = function(k) {
   var document = this.aceEditor.session.getDocument();
   return document.positionToIndex({ row: k - 1, column: 0 }, 0);
};

JSEditor.prototype.getLineRange = function(k) {
   var text = this.aceEditor.getValue();
   var document = this.aceEditor.session.getDocument();
   var start = document.positionToIndex({ row: k - 1, column: 0 }, 0);
   var end = start;
   while (end < text.length && text.charAt(end) !== '\n' &&
                               text.charAt(end) !== '\r') {
      end++;
   }
   return new OffsetRange(start, end);
};

JSEditor.prototype.createMarker = function(offset) {
   var document = this.aceEditor.session.getDocument();
   var anchor = document.createAnchor(document.indexToPosition(offset, 0));
   return new Marker(this, anchor);
};

JSEditor.prototype.addAdjustmentListener = function(listener) {
   var editor = this;
   var session = this.aceEditor.session;
   session.on("changeScrollTop",
              function(top) { editor.fireAdjustmentListeners(); });
   this.adjustmentListeners.push(listener);
};

JSEditor.prototype.removeAdjustmentListener = function(listener) {
   throw new RuntimeException("Not implemented");
};

JSEditor.prototype.fireAdjustmentListeners = function(e) {
   var e = new AdjustmentEvent(this, AdjustmentEvent.ADJUSTMENT_VALUE_CHANGED,
                                     AdjustmentEvent.TRACK, 0);
   for (var i = 0; i < this.adjustmentListeners.length; i++) {
      this.adjustmentListeners[i].adjustmentValueChanged(e);
   }
};

JSEditor.prototype.addChangeListener = function(listener) {
   var editor = this;
   var session = this.aceEditor.session;
   session.on("change", function(e) {
      if (editor.changeListenersEnabled) editor.fireChangeListeners();
   });
   this.changeListeners.push(listener);
};

JSEditor.prototype.removeChangeListener = function(listener) {
   throw new RuntimeException("Not implemented");
};

JSEditor.prototype.fireChangeListeners = function() {
   var e = new ChangeEvent(this);
   for (var i = 0; i < this.changeListeners.length; i++) {
      this.changeListeners[i].stateChanged(e);
   }
};

JSEditor.prototype.setEditorMode = function(mode) {
   this.mode = mode;
   var session = this.aceEditor.session;
   session.setMode(this.createAceMode(mode));
};

JSEditor.prototype.getEditorMode = function() {
   return this.mode;
};

JSEditor.prototype.createAceMode = function(mode) {
   var name = "ace/mode/" + mode.getModeName();
   var rules = mode.ruleTable;
   var highlightRules = function() {
      this.$rules = rules;
   };
   oop.inherits(highlightRules, TextHighlightRules);
   var aceMode = function() {
      this.HighlightRules = highlightRules;
   };
   oop.inherits(aceMode, TextMode);
   ace.define(name, ["require", "exports", "module"],
              function(require, exports, module) {
                 exports.Mode = aceMode;
              });
   return name;
};

/* Marker.js */

var Marker = function(editor, anchor) {
   this.editor = editor;
   this.anchor = anchor;
};

Marker.prototype.compareTo = function(marker) {
   return this.getOffset() - marker.getOffset();
};

Marker.prototype.toString = function() {
   return "Marker@" + ("" + (1000000 + this.getOffset())).substring(1);
};

Marker.prototype.getOffset = function() {
   var document = this.editor.aceEditor.session.getDocument();
   return document.positionToIndex(this.anchor.getPosition(), 0);
};

/* OffsetRange.js */

var OffsetRange = function(start, end) {
   this.start = start;
   this.end = end;
};

OffsetRange.prototype.isEmpty = function() {
   return this.start === this.end;
};

OffsetRange.prototype.getStart = function() {
   return this.start;
};

OffsetRange.prototype.getEnd = function() {
   return this.end;
};

/* EditorMode.js */

var EditorMode = function() {
   this.ruleTable = {};
   this.styleTable = {};
   this.modeName = null;
};

EditorMode.prototype.setModeName = function(name) {
   this.modeName = name;
};

EditorMode.prototype.getModeName = function() {
   return this.modeName;
};

EditorMode.prototype.addRule = function(state, regex, style, next) {
   var rules = this.ruleTable[state];
   if (!rules) {
      rules = [];
      this.ruleTable[state] = rules;
   }
   var es = this.styleTable[style];
   var str = style + "' style='color:" + es.color.getColorTag() + "' + junk='";
   var rule = { token : str, regex : new RegExp(regex), next : next };
   rules.push(rule);
};

EditorMode.prototype.setStyleColor = function(style, color) {
   var es = this.styleTable[style];
   if (!es) {
      es = {};
      this.styleTable[style] = es;
   }
   es.color = color;
};

EditorMode.prototype.runTokenizer = function(editor) {
   /* Empty */
};

EditorMode.prototype.toString = function() {
   var str = "EditorMode";
   if (this.modeName !== null) str += ":" + this.modeName;
   return str;
};

/* Exports */

return {
   EditorMode : EditorMode,
   JSEditor : JSEditor,
   Marker : Marker,
   OffsetRange : OffsetRange
};

});
