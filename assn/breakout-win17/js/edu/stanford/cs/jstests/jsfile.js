/*
 * File: jsfile.js
 * Created on Sat Oct 17 17:16:08 PDT 2015 by java2js
 * --------------------------------------------------
 * This file was generated mechanically by the java2js utility.
 * Permanent edits must be made in the Java file.
 */

define([ "jslib",
         "edu/stanford/cs/command",
         "edu/stanford/cs/java2js",
         "edu/stanford/cs/jsconsole",
         "edu/stanford/cs/tokenscanner",
         "java/awt",
         "java/lang" ],

function(jslib,
         edu_stanford_cs_command,
         edu_stanford_cs_java2js,
         edu_stanford_cs_jsconsole,
         edu_stanford_cs_tokenscanner,
         java_awt,
         java_lang) {

/* Imports */

var inheritPrototype = jslib.inheritPrototype;
var newArray = jslib.newArray;
var toInt = jslib.toInt;
var toStr = jslib.toStr;
var Command = edu_stanford_cs_command.Command;
var CommandLoop = edu_stanford_cs_command.CommandLoop;
var HelpCommand = edu_stanford_cs_command.HelpCommand;
var QuitCommand = edu_stanford_cs_command.QuitCommand;
var JSCookie = edu_stanford_cs_java2js.JSCookie;
var JSErrorEvent = edu_stanford_cs_java2js.JSErrorEvent;
var JSFile = edu_stanford_cs_java2js.JSFile;
var JSLoadDialog = edu_stanford_cs_java2js.JSLoadDialog;
var JSPlatform = edu_stanford_cs_java2js.JSPlatform;
var JSProgram = edu_stanford_cs_java2js.JSProgram;
var JSSaveDialog = edu_stanford_cs_java2js.JSSaveDialog;
var JSConsole = edu_stanford_cs_jsconsole.JSConsole;
var TokenScanner = edu_stanford_cs_tokenscanner.TokenScanner;
var Dimension = java_awt.Dimension;
var Font = java_awt.Font;
var ActionEvent = java_awt.ActionEvent;
var ActionListener = java_awt.ActionListener;
var Class = java_lang.Class;

/* JSFileTest.js */

var JSFileTest = function() {
   JSProgram.call(this);
   JSFile.setCGIServer(JSFileTest.CGI_SERVER);
   this.setTitle("JSFileTest");
   this.console = new JSConsole();
   this.console.setFont(Font.decode("Courier New-Bold-16"));
   this.add(this.console, "console");
   this.loadDialog = new JSLoadDialog(this.console);
   this.loadDialog.addActionListener(new LoadDialogListener(this));
   this.saveDialog = new JSSaveDialog(this.console);
   this.saveDialog.addActionListener(new SaveDialogListener(this));
   this.commandLoop = new JSFileCommandLoop(this, this.console);
   this.setPreferredSize(new Dimension(800, 600));
   this.pack();
   this.setVisible(true);
};

JSFileTest.prototype = 
   jslib.inheritPrototype(JSProgram, "JSFileTest extends JSProgram");
JSFileTest.prototype.constructor = JSFileTest;
JSFileTest.prototype.$class = 
   new Class("JSFileTest", JSFileTest);

JSFileTest.prototype.run = function() {
   this.updateDialogs();
   this.commandLoop.start();
};

JSFileTest.prototype.updateDialogs = function() {
   var home = new JSFile("cgi:" + this.getUID());
   this.loadDialog.setDirectory(home);
   this.saveDialog.setDirectory(home);
};

JSFileTest.prototype.resume = function() {
   this.commandLoop.resume();
};

JSFileTest.prototype.showLoadDialog = function() {
   this.loadDialog.centerOnParent();
   this.loadDialog.setVisible(true);
};

JSFileTest.prototype.showSaveDialog = function() {
   this.saveDialog.centerOnParent();
   this.saveDialog.setVisible(true);
};

JSFileTest.prototype.setUID = function(uid) {
   this.uid = uid;
};

JSFileTest.prototype.getUID = function() {
   return this.uid;
};

JSFileTest.prototype.getConsole = function() {
   return this.console;
};

JSFileTest.prototype.setText = function(text) {
   this.text = text;
};

JSFileTest.prototype.getText = function() {
   return this.text;
};

JSFileTest.CGI_SERVER = "http://cs54n.stanford.edu/cgi-bin";
JSFileTest.main = function(args) {
   var pgm = new JSFileTest();
   pgm.startAfterLogin(pgm.getConsole());
};

var LoginHandler = function(pgm) {
   this.pgm = pgm;
};

LoginHandler.prototype.actionPerformed = function(e) {
   if (e instanceof JSErrorEvent) {
      this.pgm.setUID("eroberts");
   } else {
      this.pgm.setUID(e.getActionCommand());
   }
   this.pgm.start();
};

var JSFileCommandLoop = function(app, console) {
   CommandLoop.call(this, console);
   this.app = app;
   this.addCommand("cat", new CatCommand());
   this.addCommand("cookie", new CookieCommand());
   this.addCommand("create", new CreateCommand());
   this.addCommand("help", new HelpCommand());
   this.addCommand("load", new LoadCommand());
   this.addCommand("ls", new ListCommand());
   this.addCommand("quit", new QuitCommand());
   this.addCommand("rm", new DeleteCommand());
   this.addCommand("save", new SaveCommand());
   this.addCommand("text", new TextCommand());
   this.addCommand("tree", new TreeCommand());
   this.addCommand("whoami", new WhoAmICommand());
};

JSFileCommandLoop.prototype = 
   jslib.inheritPrototype(CommandLoop, "JSFileCommandLoop extends CommandLoop");
JSFileCommandLoop.prototype.constructor = JSFileCommandLoop;
JSFileCommandLoop.prototype.$class = 
   new Class("JSFileCommandLoop", JSFileCommandLoop);

JSFileCommandLoop.prototype.getApplication = function() {
   return this.app;
};

var WhoAmICommand = function() {
   Command.call(this);
};

WhoAmICommand.prototype =
   jslib.inheritPrototype(Command, "WhoAmICommand extends Command");
WhoAmICommand.prototype.constructor = WhoAmICommand;
WhoAmICommand.prototype.$class = 
   new Class("WhoAmICommand", WhoAmICommand);

WhoAmICommand.prototype.getHelp = function() {
   return "whoami -- Displays the user id";
};

WhoAmICommand.prototype.execute = function(cl, scanner) {
   var pgm = (cl).getApplication();
   var console = pgm.getConsole();
   console.println(pgm.getUID());
   return true;
};

var CatCommand = function() {
   Command.call(this);
   /* Empty */
};

CatCommand.prototype = 
   jslib.inheritPrototype(Command, "CatCommand extends Command");
CatCommand.prototype.constructor = CatCommand;
CatCommand.prototype.$class = 
   new Class("CatCommand", CatCommand);

CatCommand.prototype.getHelp = function() {
   return "cat file -- Displays the contents of the file";
};

CatCommand.prototype.execute = function(cl, scanner) {
   var pgm = (cl).getApplication();
   var console = pgm.getConsole();
   var uid = pgm.getUID();
   if (uid === null) {
      console.showErrorMessage("Login required");
      return true;
   }
   var filename = this.scanFilename(scanner);
   var path = "cgi:" + uid + "/" + filename;
   new JSFile(path).read(new CatHandler(cl, filename));
   return false;
};

var CatHandler = function(cl, filename) {
   this.cl = cl;
   this.filename = filename;
};

CatHandler.prototype.actionPerformed = function(e) {
   var pgm = (this.cl).getApplication();
   var console = pgm.getConsole();
   if (e instanceof JSErrorEvent) {
      console.showErrorMessage("Can't open " + this.filename);
   } else {
      console.print(e.getActionCommand());
   }
   this.cl.resume();
};

var DeleteCommand = function() {
   Command.call(this);
   /* Empty */
};

DeleteCommand.prototype = 
   jslib.inheritPrototype(Command, "DeleteCommand extends Command");
DeleteCommand.prototype.constructor = DeleteCommand;
DeleteCommand.prototype.$class = 
   new Class("DeleteCommand", DeleteCommand);

DeleteCommand.prototype.getHelp = function() {
   return "rm file -- Deletes the file";
};

DeleteCommand.prototype.execute = function(cl, scanner) {
   var pgm = (cl).getApplication();
   var console = pgm.getConsole();
   var uid = pgm.getUID();
   if (uid === null) {
      console.showErrorMessage("Login required");
      return true;
   }
   var filename = this.scanFilename(scanner);
   var path = "cgi:" + uid + "/" + filename;
   new JSFile(path).delete(new DeleteHandler(cl, filename));
   return false;
};

var DeleteHandler = function(cl, filename) {
   this.cl = cl;
   this.filename = filename;
};

DeleteHandler.prototype.actionPerformed = function(e) {
   var pgm = (this.cl).getApplication();
   var console = pgm.getConsole();
   if (e instanceof JSErrorEvent) {
      console.showErrorMessage("Can't delete " + this.filename);
   } else {
      pgm.updateDialogs();
   }
   this.cl.resume();
};

var CreateCommand = function() {
   Command.call(this);
   /* Empty */
};

CreateCommand.prototype = 
   jslib.inheritPrototype(Command, "CreateCommand extends Command");
CreateCommand.prototype.constructor = CreateCommand;
CreateCommand.prototype.$class = 
   new Class("CreateCommand", CreateCommand);

CreateCommand.prototype.getHelp = function() {
   return "create file text -- Creates a one-line file containing text";
};

CreateCommand.prototype.execute = function(cl, scanner) {
   var pgm = (cl).getApplication();
   var console = pgm.getConsole();
   var uid = pgm.getUID();
   if (uid === null) {
      console.showErrorMessage("Login required");
      return true;
   }
   var filename = this.scanFilename(scanner);
   var path = "cgi:" + uid + "/" + filename;
   var text = scanner.nextToken();
   if (jslib.startsWith(text, "'") || jslib.startsWith(text, "\"")) {
      text = scanner.getStringValue(text);
   }
   new JSFile(path).write(text + "\n", new CreateHandler(cl, filename));
   return false;
};

var CreateHandler = function(cl, filename) {
   this.cl = cl;
   this.filename = filename;
};

CreateHandler.prototype.actionPerformed = function(e) {
   var pgm = (this.cl).getApplication();
   var console = pgm.getConsole();
   if (e instanceof JSErrorEvent) {
      console.showErrorMessage("Can't create " + this.filename);
   } else {
      pgm.updateDialogs();
   }
   this.cl.resume();
};

var ListCommand = function() {
   Command.call(this);
   /* Empty */
};

ListCommand.prototype = 
   jslib.inheritPrototype(Command, "ListCommand extends Command");
ListCommand.prototype.constructor = ListCommand;
ListCommand.prototype.$class = 
   new Class("ListCommand", ListCommand);

ListCommand.prototype.getHelp = function() {
   return "ls -- Lists the home directory";
};

ListCommand.prototype.execute = function(cl, scanner) {
   var pgm = (cl).getApplication();
   var console = pgm.getConsole();
   var uid = pgm.getUID();
   if (uid === null) {
      console.showErrorMessage("Login required");
      return true;
   }
   new JSFile("cgi:" + uid).readDirectory(new ListHandler(cl));
   return false;
};

var ListHandler = function(cl) {
   this.cl = cl;
};

ListHandler.prototype.actionPerformed = function(e) {
   var pgm = (this.cl).getApplication();
   var console = pgm.getConsole();
   if (e instanceof JSErrorEvent) {
      console.showErrorMessage(e.getActionCommand());
   } else {
      console.print(e.getActionCommand());
   }
   this.cl.resume();
};

var TextCommand = function() {
   Command.call(this);
   /* Empty */
};

TextCommand.prototype = 
   jslib.inheritPrototype(Command, "TextCommand extends Command");
TextCommand.prototype.constructor = TextCommand;
TextCommand.prototype.$class = 
   new Class("TextCommand", TextCommand);

TextCommand.prototype.getHelp = function() {
   return "text -- Shows the stored text buffer";
};

TextCommand.prototype.execute = function(cl, scanner) {
   var pgm = (cl).getApplication();
   var console = pgm.getConsole();
   console.print(pgm.getText());
   return true;
};

var TreeCommand = function() {
   Command.call(this);
   /* Empty */
};

TreeCommand.prototype = 
   jslib.inheritPrototype(Command, "TreeCommand extends Command");
TreeCommand.prototype.constructor = TreeCommand;
TreeCommand.prototype.$class = 
   new Class("TreeCommand", TreeCommand);

TreeCommand.prototype.getHelp = function() {
   return "tree -- Lists the directory tree";
};

TreeCommand.prototype.execute = function(cl, scanner) {
   var pgm = (cl).getApplication();
   var console = pgm.getConsole();
   var uid = pgm.getUID();
   if (uid === null) {
      console.showErrorMessage("Login required");
      return true;
   }
   new JSFile("cgi:" + uid).readDirectoryTree(new TreeHandler(cl));
   return false;
};

var TreeHandler = function(cl) {
   this.cl = cl;
};

TreeHandler.prototype.actionPerformed = function(e) {
   var pgm = (this.cl).getApplication();
   var console = pgm.getConsole();
   if (e instanceof JSErrorEvent) {
      console.showErrorMessage(e.getActionCommand());
   } else {
      var names = JSPlatform.splitLines(e.getActionCommand());
      for (var i = 0; i < names.length; i++) {
         var name = names[i];
         if (name.length > 0) {
            var j = 0;
            while (j < name.length && name.charCodeAt(j) === toInt(':')) {
               console.print("  ");
               j++;
            }
            console.println(name.substring(j));
         }
      }
   }
   this.cl.resume();
};

var CookieCommand = function() {
   Command.call(this);
   /* Empty */
};

CookieCommand.prototype = 
   jslib.inheritPrototype(Command, "CookieCommand extends Command");
CookieCommand.prototype.constructor = CookieCommand;
CookieCommand.prototype.$class = 
   new Class("CookieCommand", CookieCommand);

CookieCommand.prototype.getHelp = function() {
   return "cookie name [= value] -- Gets or sets a cookie";
};

CookieCommand.prototype.execute = function(cl, scanner) {
   var pgm = (cl).getApplication();
   var console = pgm.getConsole();
   if (scanner.hasMoreTokens()) {
      var name = scanner.nextToken();
      if (scanner.hasMoreTokens()) {
         scanner.verifyToken("=");
         var value = scanner.nextToken().trim();
         if (jslib.startsWith(value, "'") || jslib.startsWith(value, "\"")) {
            value = scanner.getStringValue(value);
         }
         JSCookie.set(name, value);
      } else {
         var value = JSCookie.get(name);
         if (value === null) {
            console.println(name + " is not defined");
         } else {
            console.println(value);
         }
      }
   } else {
      var names = JSCookie.getNames();
      for (var i = 0; i < names.length; i++) {
         console.println(names[i] + "=" + JSCookie.get(names[i]));
      }
   }
   return true;
};

var LoadCommand = function() {
   Command.call(this);
   /* Empty */
};

LoadCommand.prototype = 
   jslib.inheritPrototype(Command, "LoadCommand extends Command");
LoadCommand.prototype.constructor = LoadCommand;
LoadCommand.prototype.$class = 
   new Class("LoadCommand", LoadCommand);

LoadCommand.prototype.getHelp = function() {
   return "load -- Opens a load dialog";
};

LoadCommand.prototype.execute = function(cl, scanner) {
   var pgm = (cl).getApplication();
   pgm.showLoadDialog();
   return false;
};

var LoadDialogListener = function(pgm) {
   this.pgm = pgm;
};

LoadDialogListener.prototype.actionPerformed = function(e) {
   var path = e.getActionCommand();
   if (jslib.equals(path, "")) {
      this.pgm.resume();
   } else {
      new JSFile(path).read(new LoadFileListener(this.pgm));
   }
};

var LoadFileListener = function(pgm) {
   this.pgm = pgm;
};

LoadFileListener.prototype.actionPerformed = function(e) {
   if (e instanceof JSErrorEvent) {
      this.pgm.getConsole().showErrorMessage(e.getActionCommand());
   } else {
      this.pgm.setText(e.getActionCommand());
   }
   this.pgm.resume();
};

var SaveCommand = function() {
   Command.call(this);
   /* Empty */
};

SaveCommand.prototype = 
   jslib.inheritPrototype(Command, "SaveCommand extends Command");
SaveCommand.prototype.constructor = SaveCommand;
SaveCommand.prototype.$class = 
   new Class("SaveCommand", SaveCommand);

SaveCommand.prototype.getHelp = function() {
   return "save -- Opens a save dialog";
};

SaveCommand.prototype.execute = function(cl, scanner) {
   var pgm = (cl).getApplication();
   pgm.showSaveDialog();
   return false;
};

var SaveDialogListener = function(pgm) {
   this.pgm = pgm;
};

SaveDialogListener.prototype.actionPerformed = function(e) {
   var path = e.getActionCommand();
   if (jslib.equals(path, "")) {
      this.pgm.resume();
   } else {
      new JSFile(path).write(this.pgm.getText(), new SaveFileListener(this.pgm));
   }
};

var SaveFileListener = function(pgm) {
   this.pgm = pgm;
};

SaveFileListener.prototype.actionPerformed = function(e) {
   if (e instanceof JSErrorEvent) {
      this.pgm.getConsole().showErrorMessage(e.getActionCommand());
   }
   this.pgm.updateDialogs();
   this.pgm.resume();
};


/* Exports */

return {
   JSFileTest : JSFileTest
};

});
