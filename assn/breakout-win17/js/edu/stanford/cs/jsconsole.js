/*
 * File: jsconsole.js
 * ------------------
 * This package implements the JSConsole class.
 */

/* Standard header for requirejs */

define([ "jslib",
         "java/awt",
         "java/lang",
         "javax/swing" ],

function(jslib,
         java_awt,
         java_lang,
         javax_swing) {

/* Imports */

var inheritPrototype = jslib.inheritPrototype;
var addListener = jslib.addListener;
var quoteHTML = jslib.quoteHTML;
var ActionEvent = java_awt.ActionEvent;
var Color = java_awt.Color;
var Font = java_awt.Font;
var Class = java_lang.Class;
var JComponent = javax_swing.JComponent;
var LineBorder = javax_swing.LineBorder;

/* JSConsole.js */

var JSConsole = function() {
   JComponent.call(this);
   var console = this;
   var div = console.element;
   div.align = "left";
   div.style.overflowY = "auto";
   div.style.overflowX = "auto";
   div.style.background = "white";
   div.contentEditable = true;
   console.setBorder(new LineBorder(Color.BLACK, 1));
   console.margin = JSConsole.DEFAULT_SCROLL_MARGIN;
   console.nLines = 0;
   console.listeners = [];
   console.setFont(Font.decode("Monospaced-Bold-14"));
   var callback = function(e) { console.keypress(e); };
   addListener(div, "keypress", callback);
   console.font.setStyleProperties(div.style);
};

JSConsole.prototype =
   jslib.inheritPrototype(JComponent, "JSConsole extends JComponent");
JSConsole.prototype.constructor = JSConsole;
JSConsole.prototype.$class = new Class("JSConsole", JSConsole);

JSConsole.prototype.isSwingComponent = function() {
   return true;
};

JSConsole.prototype.repaint = function() {
   /* Empty */
};

JSConsole.prototype.setFont = function(font) {
   if (typeof(font) === "string") font = new Font(font);
   this.font = font;
   if (this.element) font.setStyleProperties(this.element.style);
};

JSConsole.prototype.toString = function() {
   var str = "JConsole:";
   var div = this.element;
   if (div === null) return str + "(?)";
   return str + "(" + div.clientWidth + "x" + div.clientHeight + ")";
};

JSConsole.prototype.print = function(str) {
   this.element.innerHTML += quoteHTML("" + str);
   this.scrollToEnd();
};

JSConsole.prototype.println = function(str) {
   if (str === undefined) str = "";
   this.element.innerHTML += quoteHTML("" + str) + "<br>";
   this.scrollToEnd();
};

JSConsole.prototype.showErrorMessage = function(msg) {
   this.element.innerHTML += "<font color=red>" + quoteHTML("" + msg) +
                             "</font><br>";
   this.scrollToEnd();
};

JSConsole.prototype.clear = function() {
   this.element.innerHTML = "";
};

JSConsole.prototype.requestFocus = function() {
   this.element.focus();
};

JSConsole.prototype.requestInput = function(prompt) {
   this.requestFocus();
   if (prompt === undefined) prompt = "";
   this.print(prompt);
   this.start = this.element.innerHTML.length;
   this.input = "";
};

JSConsole.prototype.keypress = function(e) {
   if (!e.metaKey && e.preventDefault) e.preventDefault();
   this.scrollToEnd();
   var ch = String.fromCharCode(e.which || e.keyCode);
   if (ch === '\n' || ch === '\r') {
      this.element.innerHTML += "<br>";
      try {
         this.fireActionListeners();
      } catch (msg) {
         this.showErrorMessage("Error: " + msg);
      }
   } else {
      if (ch === '\177' || ch === '\b') {
         if (this.input.length > 0) {
            this.input = this.input.substring(0, this.input.length - 1);
         }
      } else {
         this.input += ch;
      }
      this.element.innerHTML =
         this.element.innerHTML.substring(0, this.start) +
         "<font color=blue>" + quoteHTML(this.input) + "</font>";
   }
   this.moveCursorToEnd();
};

/*
 * Method: addActionListener
 * Usage: console.addActionListener(listener);
 * -------------------------------------------
 * Adds an action listener to the console, which is triggered when the
 * user types a newline character.  For convenience, the listener can
 * be either a Java-like object with an <code>actionPerformed</code>
 * method or a function that expects the text of the line.
 */

JSConsole.prototype.addActionListener = function(listener) {
   this.listeners.push(listener);
};

JSConsole.prototype.fireActionListeners = function() {
   var e = null;
   for (var i in this.listeners) {
      var listener = this.listeners[i];
      if (typeof(listener) === "function") {
      	 listener(this.input);
      } else {
         if (!e) e = new ActionEvent(this, ActionEvent.ACTION_PERFORMED,
                                     this.input);
      	 listener.actionPerformed(e);
      }
   }
};

JSConsole.prototype.scrollToEnd = function() {
   var div = this.element;
   if (div.scrollHeight > div.scrollTop + div.clientHeight - this.margin) {
      div.scrollTop = div.scrollHeight - div.clientHeight + this.margin;
   }
};

JSConsole.prototype.moveCursorToEnd = function() {
   var div = this.element;
   var range = document.createRange();
   var selection = window.getSelection();
   range.selectNode(div);
   range.collapse(false);
   selection.removeAllRanges();
   selection.addRange(range);
};

JSConsole.DEFAULT_WIDTH = 800;
JSConsole.DEFAULT_HEIGHT = 360;
JSConsole.DEFAULT_SCROLL_MARGIN = 25;
 
return {
   JSConsole : JSConsole
};

});
