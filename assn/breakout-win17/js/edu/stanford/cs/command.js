/*
 * File: command.js
 * Created on Sat Oct 17 17:16:08 PDT 2015 by java2js
 * --------------------------------------------------
 * This file was generated mechanically by the java2js utility.
 * Permanent edits must be made in the Java file.
 */

define([ "jslib",
         "edu/stanford/cs/java2js",
         "edu/stanford/cs/jsconsole",
         "edu/stanford/cs/tokenscanner",
         "java/awt",
         "java/lang",
         "java/util" ],

function(jslib,
         edu_stanford_cs_java2js,
         edu_stanford_cs_jsconsole,
         edu_stanford_cs_tokenscanner,
         java_awt,
         java_lang,
         java_util) {

/* Imports */

var inheritPrototype = jslib.inheritPrototype;
var newArray = jslib.newArray;
var toInt = jslib.toInt;
var toStr = jslib.toStr;
var JSElementList = edu_stanford_cs_java2js.JSElementList;
var JSPlatform = edu_stanford_cs_java2js.JSPlatform;
var NBConsole = edu_stanford_cs_jsconsole.NBConsole;
var TokenScanner = edu_stanford_cs_tokenscanner.TokenScanner;
var ActionEvent = java_awt.ActionEvent;
var ActionListener = java_awt.ActionListener;
var Class = java_lang.Class;
var RuntimeException = java_lang.RuntimeException;
var ArrayList = java_util.ArrayList;
var Stack = java_util.Stack;
var TreeMap = java_util.TreeMap;

/* Command.js */

var Command = function() {
   /* Empty */
};

Command.prototype.setName = function(name) {
   this.name = name;
};

Command.prototype.getName = function() {
   return this.name;
};

Command.prototype.getHelp = function() {
   return null;
};

Command.prototype.execute = function(cl, scanner) {
   throw new RuntimeException("Undefined command: " + this.getName());
};

Command.prototype.scanFilename = function(scanner) {
   var filename = scanner.nextToken();
   if (jslib.equals(filename, "")) {
      throw new RuntimeException("Missing file name");
   }
   if (jslib.startsWith(filename, "\"")) {
      return scanner.getStringValue(filename);
   }
   var tt = scanner.getTokenType(filename);
   var lastTokenIsWord = (tt === TokenScanner.WORD) || (tt === TokenScanner.NUMBER);
   while (scanner.hasMoreTokens()) {
      var token = scanner.nextToken();
      tt = scanner.getTokenType(token);
      if (lastTokenIsWord) {
         if (Command.FILENAME_CHARACTERS.indexOf(token) === -1) {
            scanner.saveToken(token);
            break;
         }
         filename += token;
         lastTokenIsWord = false;
      } else if (tt === TokenScanner.WORD || tt === TokenScanner.NUMBER) {
         filename += token;
         lastTokenIsWord = true;
      } else if (Command.FILENAME_CHARACTERS.indexOf(token) === -1) {
         scanner.saveToken(token);
         break;
      } else {
         filename += token;
         lastTokenIsWord = false;
      }
   }
   return filename;
};

Command.prototype.scanOnOffToggle = function(scanner, old) {
   var token = scanner.nextToken().toLowerCase();
   if (jslib.equals(token, "")) return !old;
   if (jslib.equals(token, "on")) return true;
   if (jslib.equals(token, "off")) return false;
   throw new RuntimeException("Flag value must be on or off");
};

Command.FILENAME_CHARACTERS = "~*[]?/.-+";

/* CommandLoop.js */

var CommandLoop = function(console) {
   this.console = console;
   this.listener = null;
   this.commandList = new ArrayList();
   this.commandTable = new TreeMap();
   this.stack = new Stack();
   this.prompt = CommandLoop.DEFAULT_PROMPT;
   this.scanner = this.createScanner();
};

CommandLoop.prototype.createScanner = function() {
   var s = new TokenScanner();
   s.ignoreWhitespace();
   s.scanNumbers();
   s.scanStrings();
   return s;
};

CommandLoop.prototype.createActionListener = function() {
   return new CommandLoopListener(this);
};

CommandLoop.prototype.addCommand = function(name, cmd) {
   if (this.listener === null) {
      this.listener = this.createActionListener();
      this.console.addActionListener(this.listener);
   }
   cmd.setName(name);
   this.commandTable.put(name, cmd);
   this.commandList.add(cmd);
};

CommandLoop.prototype.getConsole = function() {
   return this.console;
};

CommandLoop.prototype.setPrompt = function(prompt) {
   this.prompt = prompt;
};

CommandLoop.prototype.getPrompt = function() {
   return this.prompt;
};

CommandLoop.prototype.setDebugFlag = function(flag) {
   this.debugFlag = flag;
};

CommandLoop.prototype.getDebugFlag = function() {
   return this.debugFlag;
};

CommandLoop.prototype.emptyCommand = function() {
   return true;
};

CommandLoop.prototype.unrecognizedCommand = function(line) {
   this.console.showErrorMessage("Unrecognized command: " + line);
   return true;
};

CommandLoop.prototype.start = function() {
   this.console.requestInput(this.prompt);
};

CommandLoop.prototype.resume = function() {
   var cf = this.stack.peek();
   while (true) {
      var line = cf.nextLine();
      if (line === null) {
         cf = this.stack.pop();
         if (this.stack.isEmpty()) {
            this.console.requestInput(this.prompt);
            return;
         }
      } else {
         if (this.stack.size() > 1) this.console.println(this.prompt + line);
         if (!this.dispatch(line)) return;
      }
   }
};

CommandLoop.prototype.processCommands = function(text) {
   var cf = new CommandFrame(text);
   this.stack.push(cf);
   this.resume();
};

CommandLoop.prototype.dispatch = function(line) {
   try {
      this.scanner.setInput(line);
      var token = this.scanner.nextToken();
      if (jslib.equals(token, "")) return this.emptyCommand();
      var cmd = this.commandTable.get(token);
      if (cmd === null) {
         this.scanner.saveToken(token);
         return this.unrecognizedCommand(line);
      }
      return cmd.execute(this, this.scanner);
   } catch (ex) {
      if (this.debugFlag) JSPlatform.printStackTrace(ex);
      var msg = RuntimeException.patchMessage(ex);
      if (msg === null) msg = ex.toString();
      this.console.showErrorMessage(msg);
   }
   return true;
};

CommandLoop.prototype.printHelp = function() {
   var fieldWidth = 0;
   var el0 = new JSElementList(this.commandList);
   for (var ei0 = 0; ei0 < el0.size(); ei0++) {
      var cmd = el0.get(ei0);
      var help = cmd.getHelp();
      if (help !== null && !jslib.startsWith(help, "*")) {
         var dash = help.indexOf(" -- ");
         if (dash === -1) dash = help.length;
         if (dash > fieldWidth) fieldWidth = dash;
      }
   }
   var el1 = new JSElementList(this.commandList);
   for (var ei1 = 0; ei1 < el1.size(); ei1++) {
      var cmd = el1.get(ei1);
      var help = cmd.getHelp();
      if (help === null) help = cmd.getName();
      if (!jslib.startsWith(help, "*")) {
         var dash = help.indexOf(" -- ");
         if (dash === -1) {
            this.console.println(help);
         } else {
            var usage = help.substring(0, dash);
            while (usage.length < fieldWidth) {
               usage += " ";
            }
            this.console.println(usage + help.substring(dash));
         }
      }
   }
};

CommandLoop.DEFAULT_PROMPT = "-> ";
var CommandLoopListener = function(cl) {
   this.cl = cl;
};

CommandLoopListener.prototype.actionPerformed = function(e) {
   this.cl.processCommands(e.getActionCommand());
};

var CommandFrame = function(text) {
   this.lines = JSPlatform.splitLines(text);
   this.index = 0;
};

CommandFrame.prototype.nextLine = function() {
   return (this.index === this.lines.length) ? null : this.lines[this.index++];
};


/* DebugCommand.js */

var DebugCommand = function() {
   Command.call(this);
};

DebugCommand.prototype =
   jslib.inheritPrototype(Command, "DebugCommand extends Command");
DebugCommand.prototype.constructor = DebugCommand;
DebugCommand.prototype.$class = 
   new Class("DebugCommand", DebugCommand);

DebugCommand.prototype.getHelp = function() {
   return "*debug on/off -- Sets the debugging flag";
};

DebugCommand.prototype.execute = function(cl, scanner) {
   cl.setDebugFlag(this.scanOnOffToggle(scanner, cl.getDebugFlag()));
   return true;
};


/* HelpCommand.js */

var HelpCommand = function() {
   Command.call(this);
};

HelpCommand.prototype =
   jslib.inheritPrototype(Command, "HelpCommand extends Command");
HelpCommand.prototype.constructor = HelpCommand;
HelpCommand.prototype.$class = 
   new Class("HelpCommand", HelpCommand);

HelpCommand.prototype.getHelp = function() {
   return "help -- Prints the list of commands";
};

HelpCommand.prototype.execute = function(cl, scanner) {
   scanner.verifyToken("");
   cl.printHelp();
   return true;
};


/* QuitCommand.js */

var QuitCommand = function() {
   Command.call(this);
};

QuitCommand.prototype =
   jslib.inheritPrototype(Command, "QuitCommand extends Command");
QuitCommand.prototype.constructor = QuitCommand;
QuitCommand.prototype.$class = 
   new Class("QuitCommand", QuitCommand);

QuitCommand.prototype.getHelp = function() {
   return "quit -- Exits the program";
};

QuitCommand.prototype.execute = function(cl, scanner) {
   scanner.verifyToken("");
   JSPlatform.exit(0);
   return true;
};


/* StackTraceCommand.js */

var StackTraceCommand = function() {
   Command.call(this);
};

StackTraceCommand.prototype =
   jslib.inheritPrototype(Command, "StackTraceCommand extends Command");
StackTraceCommand.prototype.constructor = StackTraceCommand;
StackTraceCommand.prototype.$class = 
   new Class("StackTraceCommand", StackTraceCommand);

StackTraceCommand.prototype.getHelp = function() {
   return "*stacktrace -- Displays a stack trace";
};

StackTraceCommand.prototype.execute = function(cl, scanner) {
   scanner.verifyToken("");
   JSPlatform.printStackTrace();
   return true;
};


/* Exports */

return {
   Command : Command,
   CommandLoop : CommandLoop,
   DebugCommand : DebugCommand,
   HelpCommand : HelpCommand,
   QuitCommand : QuitCommand,
   StackTraceCommand : StackTraceCommand
};

});
