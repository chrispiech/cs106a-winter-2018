/*
 * File: jconsole.js
 * -----------------
 * Implements the console model for the js shell.
 */

define([ "java/awt" ], function(awt) {

/* Imports */

var ActionEvent = awt.ActionEvent;

/*
 * Class: JConsole
 * ---------------
 * This class implements the console model with the js stub.
 */

/*
 * Constructor: JConsole
 * Usage: console = new JConsole();
 * --------------------------------
 * Creates a <code>JConsole</code> object.
 */

var JConsole = function() {
   this.listeners = [];
};

/*
 * Method: setFont
 * Usage: console.setFont(font);
 * -----------------------------
 * Changes the font used for the console.  The <code>font</code> parameter
 * is either an object with the fields defined in <code>java/awt.js</code>
 * or a string in the form <code>family-style-size</code>.
 */

JConsole.prototype.setFont = function(font) {
   /* Ignored */
};

/*
 * Method: print
 * Usage: console.print(x);
 * ------------------------
 * Prints the value of x on the console.
 */

JConsole.prototype.print = function(x) {
   putstr(x);
};

/*
 * Method: println
 * Usage: console.println(x);
 * --------------------------
 * Prints the value of x on the console followed by a newline.
 */

JConsole.prototype.println = function(x) {
   print(x);
};

/*
 * Method: clear
 * Usage: console.clear();
 * -----------------------
 * Clears the console.
 */

JConsole.prototype.clear = function() {
   /* Ignored */
};

/*
 * Method: requestInput
 * Usage: console.requestInput(prompt);
 * ------------------------------------
 * Requests a line of input.  This method does not wait.  When the line
 * is complete, the console triggers a Newline event.
 */

JConsole.prototype.requestInput = function(prompt) {
   this.print(prompt);
   this.actionCommand = readline();
   this.fireActionListeners();   
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

JConsole.prototype.addActionListener = function(listener) {
   this.listeners.push(listener);
};

JConsole.prototype.fireActionListeners = function() {
   var e = null;
   for (var i in this.listeners) {
      var listener = this.listeners[i];
      if (typeof(listener) == "function") {
      	 listener(this.actionCommand);
      } else {
         if (!e) e = new ActionEvent(this, ActionEvent.ACTION_PERFORMED,
                                     this.actionCommand);
      	 listener.actionPerformed(e);
      }
   }
};

/* Module trailer for requirejs */

return { JConsole : JConsole };
});
