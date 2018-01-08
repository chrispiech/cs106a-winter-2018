/*
 * File: java2js.js
 * ----------------
 * This file implements the java2js package, which includes a small
 * number of classes to bridge certain differences between Java and
 * JavaScript.
 */

/* Standard header for requirejs */

define([ "jslib",
         "java/awt",
         "java/lang",
         "java/util",
         "javax/swing" ],

function(jslib,
         java_awt,
         java_lang,
         java_util,
         javax_swing) {

/* Imports */

var inheritPrototype = jslib.inheritPrototype;
var addListener = jslib.addListener;
var quoteHTML = jslib.quoteHTML;
var toInt = jslib.toInt;
var toStr = jslib.toStr;
var RuntimeException = jslib.RuntimeException;
var ActionEvent = java_awt.ActionEvent;
var BorderLayout = java_awt.BorderLayout;
var Color = java_awt.Color;
var Component = java_awt.Component;
var Dimension = java_awt.Dimension;
var FlowLayout = java_awt.FlowLayout;
var Font = java_awt.Font;
var FontMetrics = java_awt.FontMetrics;
var Graphics = java_awt.Graphics;
var MouseEvent = java_awt.MouseEvent;
var Point = java_awt.Point;
var Rectangle = java_awt.Rectangle;
var Class = java_lang.Class;
var ArrayList = java_util.ArrayList;
var BorderFactory = javax_swing.BorderFactory;
var JButton = javax_swing.JButton;
var JComponent = javax_swing.JComponent;
var JLabel = javax_swing.JLabel;
var JList = javax_swing.JList;
var JPanel = javax_swing.JPanel;
var JScrollPane = javax_swing.JScrollPane;
var JScrollBar = javax_swing.JScrollBar;
var JTextField = javax_swing.JTextField;

/* JSElementList */

var JSElementList = function(collection) {
   ArrayList.call(this);
   var array = collection.toArray ? collection.toArray() : collection;
   for (var i = 0; i < array.length; i++) {
      this.add(array[i]);
   }
};

JSElementList.prototype =
   jslib.inheritPrototype(ArrayList, "JSElementList extends ArrayList");
JSElementList.prototype.constructor = JSElementList;
JSElementList.prototype.$class = new Class("JSElementList", JSElementList);

/* JSErrorEvent */

var JSErrorEvent = function(source, msg) {
   ActionEvent.call(this, source, ActionEvent.ACTION_PERFORMED, msg);
};

JSErrorEvent.prototype =
   jslib.inheritPrototype(ActionEvent, "JSErrorEvent extends ActionEvent");
JSErrorEvent.prototype.constructor = JSErrorEvent;
JSErrorEvent.prototype.$class = new Class("JSErrorEvent", JSErrorEvent);

/* JSCanvas */

var JSCanvas = function() {
   JComponent.call(this, document.createElement("canvas"));
   this.canvas = this.element;
   this.canvas.contentEditable = true;
   this.canvas.overflow = "hidden";
   this.canvas.style.outlineWidth = "0px";
   this.element = this.canvas;
   this.sf = 1;
};

JSCanvas.prototype =
   jslib.inheritPrototype(JComponent, "JSCanvas extends JComponent");
JSCanvas.prototype.constructor = JSCanvas;
JSCanvas.prototype.$class = new Class("JSCanvas", JSCanvas);

JSCanvas.prototype.toString = function() {
   return "JSCanvas #" + this.uid;
};

JSCanvas.prototype.getSize = function() {
   return new Dimension(this.width, this.height);
};

JSCanvas.prototype.setScaleFactor = function(sf) {
   this.sf = sf;
};

JSCanvas.prototype.getScaleFactor = function() {
   return this.sf;
};

JSCanvas.prototype.repaint = function() {
   var g = this.getGraphics();
   if (g && g.ctx) this.paint(g);
};

JSCanvas.prototype.paint = function(g) {
   g.ctx.save();
   if (this.isOpaque() && this.bg) {
      g.ctx.fillStyle = this.bg.getColorTag();
      g.ctx.fillRect(0, 0, this.element.width, this.element.height);
   }
   g.ctx.scale(this.sf, this.sf);
   g.ctx.fillStyle = g.ctx.strokeStyle = this.fg.getColorTag();
   g.ctx.font = this.font.getFontTag();
   this.paintComponent(g);
   g.ctx.restore();
};

JSCanvas.prototype.paintComponent = function(g) {
   /* Empty */
};

JSCanvas.getEnclosingFrame = function(comp) {
   return comp;
};

/* JSCookie */

var JSCookie = function() {
   throw new RuntimeException("JSCookie cannot be instantiated");
};

JSCookie.set = function(name, value, days) {
   var str = name + "=" + value;
   if (days !== undefined) {
      var date = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
      str += "; expires=" + date.toUTCString();
   }
   document.cookie = str;
};
     
JSCookie.remove = function(name) {
   document.cookie = name + "=; expires=" + new Date(0).toUTCString();
};

JSCookie.get = function(name) {
   var cookies = document.cookie.split(";");
   for (var i = 0; i < cookies.length; i++) {
      var binding = cookies[i];
      var equals = binding.indexOf("=");
      if (equals === -1) {
         throw new RuntimeException("Invalid cookie string");
      }
      var key = jslib.trim(binding.substring(0, equals));
      var value = jslib.trim(binding.substring(equals + 1));
      if (key === name) return value;
   }
   return null;
};

JSCookie.getNames = function() {
   var cookies = document.cookie.split(";");
   var names = [];
   for (var i = 0; i < cookies.length; i++) {
      var binding = cookies[i];
      var equals = binding.indexOf("=");
      if (equals === -1) {
         throw new RuntimeException("Invalid cookie string");
      }
      names.push(jslib.trim(binding.substring(0, equals)));
   }
   return names;
};

/* JSFile */

var JSFile = function(dir, file) {
   if (file !== undefined) {
      this.path = (dir === "") ? file.name : dir + "/" + file.name;
      this.file = file;
   } else if (typeof(dir) === "string") {
      this.path = dir;
      this.file = null;
   } else {
      this.file = dir;
      this.path = dir.name;
   }
};

JSFile.prototype.$class = new Class("JSFile", JSFile);

JSFile.prototype.getPath = function() {
   return this.path;
};

JSFile.prototype.getName = function() {
   return JSFile.getTail(this.path);
};

JSFile.prototype.getProtocol = function() {
   return this.path.substring(0, this.path.indexOf(":") + 1);
};

JSFile.prototype.getPathname = function() {
   return this.path.substring(this.path.indexOf(":") + 1);
};

JSFile.prototype.getAbsolutePath = function() {
   return this.path;
};

JSFile.prototype.read = function(listener) {
   var protocol = this.getProtocol();
   if (window.FileReader && this.file && protocol === "") {
      this.readUsingFileReader(this.file, listener);
   } else {
      var path = this.getPathname();
      var cmd = "readFile.pl?path=" + encodeURIComponent(path);
      JSFile.sendHttpRequest(cmd, listener, this);
   }
};

JSFile.prototype.readDirectory = function(listener) {
   var protocol = this.getProtocol();
   if (window.FileReader && this.file && protocol === "") {
      throw new RuntimeException("Not implemented");
   } else {
      var path = this.getPathname();
      var cmd = "readDirectory.pl?path=" + encodeURIComponent(path);
      JSFile.sendHttpRequest(cmd, listener, this);
   }
};

JSFile.prototype.readDirectoryTree = function(listener) {
   var protocol = this.getProtocol();
   if (window.FileReader && this.file && protocol === "") {
      throw new RuntimeException("Not implemented");
   } else {
      var path = this.getPathname();
      var cmd = "readTree.pl?path=" + encodeURIComponent(path);
      JSFile.sendHttpRequest(cmd, listener, this);
   }
};

JSFile.prototype.readUsingFileReader = function(file, listener) {
   var reader = new FileReader();
   var fileLoaded = function(e) {
      e = new ActionEvent(this, ActionEvent.ACTION_PERFORMED, e.target.result);
      listener.actionPerformed(e);
   }
   reader.onload = fileLoaded;
   reader.readAsText(file);
};

JSFile.prototype.write = function(text, listener) {
   var protocol = this.getProtocol();
   if (window.FileWriter && this.file && protocol === "") {
      this.writeUsingFileWriter(this.file, listener, text);
   } else {
      var path = this.getPathname();
      var cmd = "writeFile.pl?path=" + encodeURIComponent(path) +
                "&text=" + encodeURIComponent(text);
      JSFile.sendHttpRequest(cmd, listener, this);
   }
};

JSFile.prototype.writeUsingFileWriter = function(file, listener, text) {
   throw new RuntimeException("Not yet implemented");
};

JSFile.prototype.delete = function(listener) {
   var protocol = this.getProtocol();
   var path = this.getPathname();
   var cmd = "deleteFile.pl?path=" + encodeURIComponent(path);
   JSFile.sendHttpRequest(cmd, listener, this);
};

JSFile.prototype.toString = function() {
   return this.path;
};

JSFile.sendHttpRequest = function(cmd, listener, source) {
   var req = new XMLHttpRequest();
   var url = JSFile.CGIServer + "/" + cmd;
   if (!source) source = "JSFile";
   req.ok = false;
   req.onreadystatechange = function() {
      if (req.readyState === 2) {
         req.ok = true;
      } else if (req.readyState === 4) {
         var text = req.responseText;
         if (text.startsWith("OK\n")) {
            text = text.substring(3);
         } else if (text.startsWith("Error:")) {
            req.ok = false;
         }
         var e = null;
         if (req.ok) {
            e = new ActionEvent(source, ActionEvent.ACTION_PERFORMED, text);
         } else {
            e = new JSErrorEvent(source, "Can't open " + url);
         }
         if (e !== null && listener !== null) {
            listener.actionPerformed(e);
         }
      }
   };
   req.open("GET", url, true);
   req.send();
};

JSFile.login = function(listener) {
   JSFile.sendHttpRequest("login.pl", listener, null);
};

JSFile.setCGIServer = function(url) {
   JSFile.CGIServer = url;
};

JSFile.getCGIServer = function() {
   return JSFile.CGIServer;
};

JSFile.getHead = function(path) {
   var slashIndex = -1;
   for (var i = 0; i < path.length; i++) {
      switch (path.charCodeAt(i)) {
         case toInt('/'): case toInt('\\'): slashIndex = i; break;
      }
   }
   if (slashIndex === -1) {
      return "";
   } else if (slashIndex === 0) {
      return path.substring(0, 1);
   } else {
      return path.substring(0, slashIndex);
   }
};

JSFile.getTail = function(path) {
   var slashIndex = -1;
   for (var i = 0; i < path.length; i++) {
      switch (path.charCodeAt(i)) {
         case toInt('/'): case toInt('\\'): slashIndex = i; break;
      }
   }
   if (slashIndex === -1) return path;
   return path.substring(slashIndex + 1);
};

JSFile.getRoot = function(path) {
   var dotIndex = -1;
   for (var i = 0; i < path.length; i++) {
      switch (path.charCodeAt(i)) {
         case toInt('.'): dotIndex = i; break;
         case toInt('/'): case toInt('\\'): dotIndex = -1; break;
      }
   }
   if (dotIndex === -1) return path;
   return path.substring(0, dotIndex);
};

JSFile.getExtension = function(path) {
   var dotIndex = -1;
   for (var i = 0; i < path.length; i++) {
      switch (path.charCodeAt(i)) {
         case toInt('.'): dotIndex = i; break;
         case toInt('/'): case toInt('\\'): dotIndex = -1; break;
      }
   }
   if (dotIndex === -1) return "";
   return path.substring(dotIndex);
};

JSFile.parseHTMLDirectory = function(html) {
   var files = new ArrayList();
   var start = html.indexOf("Parent Directory");
   if (start === -1) return null;
   while (true) {
      start = html.indexOf("<td><a href=\"", start);
      if (start === -1) break;
      start += "<td><a href=\"".length;
      var finish = html.indexOf("\"", start);
      if (finish === -1) return null;
      files.add(html.substring(start, finish));
   }
   var n = files.size();
   var array = jslib.newArray(n);
   for (var i = 0; i < n; i++) {
      array[i] = files.get(i);
   }
   return array;
};

/* JSImage */

var JSImage = function(src) {
   var image = new Image();
   var jsi = this;
   jsi.image = image;
   image.src = src;
   if (src.indexOf(JSImage.DATA_HEADER) === 0) {
      var hlen = JSImage.DATA_HEADER.length;
      var header = window.atob(src.substring(hlen, hlen + 32));
      jsi.width = JSImage.getInt(header, 16);
      jsi.height = JSImage.getInt(header, 20);
      image.alt = "Image-" + image.width + "x" + image.height;
   } else {
      jsi.width = 0;
      jsi.height = 0;
      image.onload = function() {
         jsi.width = image.width;
         jsi.height = image.height;
      };
      image.alt = src;
   }
};

JSImage.prototype.$class = new Class("JSImage", JSImage);

JSImage.prototype.getWidth = function() {
   return this.width;
};

JSImage.prototype.getHeight = function() {
   return this.height;
};

JSImage.prototype.getImage = function() {
   return this.image;
};

JSImage.getInt = function(bytes, start) {
   var n = bytes.charCodeAt(start);
   n = n << 8 | bytes.charCodeAt(start + 1);
   n = n << 8 | bytes.charCodeAt(start + 2);
   n = n << 8 | bytes.charCodeAt(start + 3);
   return n;
};

JSImage.DATA_HEADER = "data:image/png;base64,";

/* JSLineReader */

var JSLineReader = function(arg) {
   if (typeof(arg) === "string") {
      this.lines = JSPlatform.splitLines(arg);
      this.nLines = this.lines.length;
      if (this.nLines > 0 && this.lines[this.nLines - 1] === "") this.nLines--;
   } else {
      this.lines = arg;
      this.nLines = arg.length;
   }
   this.index = 0;
};

JSLineReader.prototype.nextLine = function() {
   if (this.index >= this.nLines) return null;
   return this.lines[this.index++];
};

JSLineReader.prototype.saveLine = function() {
   if (this.index > 0) this.index--;
};

/* JSPanel */

var JSPanel = function() {
   JComponent.call(this);
   this.element.style.position = "relative";
   this.layout = new FlowLayout();
};

JSPanel.prototype =
   jslib.inheritPrototype(JComponent, "JSPanel extends JComponent");
JSPanel.prototype.constructor = JSPanel;
JSPanel.prototype.$class = new Class("JSPanel", JSPanel);

/* JSFrame */

var JSFrame = function(contents, title) {
   JSPanel.call(this);
   this.setLayout(new BorderLayout());
   this.setBorder(BorderFactory.createLineBorder(JSFrame.BORDER_COLOR));
   this.add(contents, BorderLayout.CENTER);
   this.tb = new JSTitleBar(title);
   this.add(this.tb, BorderLayout.NORTH);
   contents.addFocusListener(this.tb);
   this.tb.addMouseListener(new JSTitleBarListener(contents));
};

JSFrame.prototype =
   jslib.inheritPrototype(JSPanel, "JSFrame extends JSPanel");
JSFrame.prototype.constructor = JSFrame;
JSFrame.prototype.$class = new Class("JSFrame", JSFrame);

JSFrame.prototype.setTitle = function(title) {
   this.tb.setTitle(title);
};

JSFrame.prototype.getTitle = function() {
   return this.tb.getTitle();
};

JSFrame.BORDER_COLOR = new Color(0x666666);

var JSTitleBarListener = function(target) {
   this.target = target;
};

JSTitleBarListener.prototype.mouseClicked = function(e) {
   this.target.requestFocus();
};

JSTitleBarListener.prototype.mouseEntered = function(e) {
   /* Empty */
};

JSTitleBarListener.prototype.mouseExited = function(e) {
   /* Empty */
};

JSTitleBarListener.prototype.mousePressed = function(e) {
   /* Empty */
};

JSTitleBarListener.prototype.mouseReleased = function(e) {
   /* Empty */
};

/* JSPlatform.js */

var JSPlatform = function() {
   /* Empty */
};

JSPlatform.prototype.$class = new Class("JSPlatform", JSPlatform);

JSPlatform.exit = function(status) {
   /* Ignored */
};

JSPlatform.isJavaScript = function() {
   return true;
};

JSPlatform.elementExists = function(id) {
   return document.getElementById(id) !== null;
};

JSPlatform.splitLines = function(text) {
   return text.split(/\r?\n|\r/);
};

JSPlatform.printStackTrace = function(ex) {
   jslib.printStackTrace(ex);
};

JSPlatform.getScrollBarWidth = function() {
   return JScrollBar.getScrollBarWidth();
};

/* JSProgram */

var JSProgram = function() {
   JComponent.call(this);
   this.controlRow = null;
   this.defaultUser = null;
};

JSProgram.prototype =
   jslib.inheritPrototype(JComponent, "JSProgram extends JComponent");
JSProgram.prototype.constructor = JSProgram;
JSProgram.prototype.$class = new Class("JSProgram", JSProgram);

JSProgram.prototype.setUID = function(uid) {
   this.uid = uid;
};

JSProgram.prototype.getUID = function() {
   return this.uid;
};

JSProgram.prototype.setDefaultUser = function(user) {
   this.defaultUser = user;
};

JSProgram.prototype.getDefaultUser = function() {
   return this.defaultUser;
};

JSProgram.prototype.createProgramFrame = function() {
   /* Empty */
};

JSProgram.prototype.getFrame = function() {
   return this;
};

JSProgram.prototype.setLayout = function(layout) {
   this.layout = null;
   this.layoutManager = layout;
};

JSProgram.prototype.getLayout = function() {
   return this.layoutManager;
};

JSProgram.prototype.setJMenuBar = function(mbar) {
   // Fill in
};

JSProgram.prototype.add = function(c, label) {
   var div = null;
   if (typeof(label) === "string") {
      div = document.getElementById(label);
   } else {
      div = label.element;
   }
   div.appendChild(c.element);
   c.div = div;
   if (c.install) c.install(c, div);
   if (typeof(label) === "string") {
      var style = window.getComputedStyle(div);
      this.width = parseInt(style.width);
      this.height = parseInt(style.height);
      if (c.setSize) c.setSize(this.width, this.height);
      if (c.layout) c.layout.layoutContainer(c);
   }
   if (c.repaint) c.repaint();
};

JSProgram.prototype.getSize = function() {
   var app = document.getElementById("application");
   if (!app) app = document.getElementsByTagName("body")[0];
   return new Dimension(app.clientWidth, app.clientHeight);
};
   
JSProgram.prototype.setTitle = function(title) {
   this.title = title;
};

JSProgram.prototype.getTitle = function() {
   return this.title;
};

JSProgram.prototype.addControl = function(button) {
   if (this.controlRow === null) {
      var controls = document.getElementById("controls");
      this.controlRow = document.createElement("tr");
      var table = document.createElement("table");
      table.appendChild(this.controlRow);
      controls.appendChild(table);
   }
   var td = document.createElement("td");
   td.appendChild(button.element);
   this.controlRow.appendChild(td);
   if (button.repaint) button.repaint();
};

JSProgram.prototype.setVisible = function(flag) {
   /* Ignored */
};

JSProgram.prototype.run = function() {
   /* Empty */
};

JSProgram.prototype.start = function() {
   this.startAfterDelay(JSProgram.DEFAULT_DELAY);
};

JSProgram.prototype.startAfterDelay = function(milliseconds) {
   var pgm = this;
   var callback = function() { pgm.run(); };
   setTimeout(callback, milliseconds || JSProgram.DEFAULT_DELAY);
};

JSProgram.prototype.startAfterLogin = function(target) {
   var pgm = this;
   var listener = {
      actionPerformed : function(e) {
         var uid = e.getActionCommand();
         if (e instanceof JSErrorEvent || uid.length === 0) {
            pgm.setUID("library");
         } else {
            JSCookie.set("USER", uid, 60);
            pgm.setUID(uid);
         }
         pgm.run();
      }
   };
   var uid = JSCookie.get("USER");
   if (uid === null) {
      var dialog = new JSLoginDialog(target);
      dialog.addActionListener(listener);
      dialog.centerOnParent();
      dialog.setVisible(true);
   } else {
      pgm.setUID(uid);
      pgm.run();
   }
};

JSProgram.prototype.toString = function() {
   return "JSProgram";
};

JSProgram.isJavaScript = function() {
   return true;
};

JSProgram.alert = function(value) {
   alert(value);
};

JSProgram.exit = function(status) {
   JSPlatform.exit(status);
};

JSProgram.DEFAULT_DELAY = 100;

/* JSProgramLayout.js */

var JSProgramLayout = function() {
   /* Not used on the JavaScript side */
}

/* JSScrollPane.js */

var JSScrollPane = function(view, vspPolicy, hspPolicy) {
   JScrollPane.call(this, view, vspPolicy, hspPolicy);
};

JSScrollPane.prototype =
   jslib.inheritPrototype(JScrollPane, "JSScrollPane extends JScrollPane");
JSScrollPane.prototype.constructor = JSScrollPane;
JSScrollPane.prototype.$class = new Class("JSScrollPane", JSScrollPane);

JSScrollPane.prototype.getViewPosition = function() {
   return new Point(this.element.scrollLeft, this.element.scrollTop);
};

JSScrollPane.prototype.scrollRectToVisible = function(r) {
   var div = this.element;
   var x = r.x - div.scrollLeft;
   if (x < 0 || x >= div.scrollWidth - r.width) {
      changed = true;
      div.scrollLeft =
         Math.max(0, Math.min(r.x, div.scrollWidth - div.clientWidth));
   }
   var y = r.y - div.scrollTop;
   if (y < 0 || y >= div.scrollHeight - r.height) {
      div.scrollTop =
         Math.max(0, Math.min(r.y, div.scrollHeight - div.clientHeight));
   }
}

JSScrollPane.HORIZONTAL_SCROLLBAR_ALWAYS =
   JScrollPane.HORIZONTAL_SCROLLBAR_ALWAYS;
JSScrollPane.HORIZONTAL_SCROLLBAR_AS_NEEDED =
   JScrollPane.HORIZONTAL_SCROLLBAR_AS_NEEDED;
JSScrollPane.HORIZONTAL_SCROLLBAR_NEVER =
   JScrollPane.HORIZONTAL_SCROLLBAR_NEVER;
JSScrollPane.VERTICAL_SCROLLBAR_ALWAYS =
   JScrollPane.VERTICAL_SCROLLBAR_ALWAYS;
JSScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED =
   JScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED;
JSScrollPane.VERTICAL_SCROLLBAR_NEVER =
   JScrollPane.VERTICAL_SCROLLBAR_NEVER;

/* JSTitleBar.js */

var JSTitleBar = function(title) {
   JSCanvas.call(this);
   this.title = title;
   this.setFont(JSTitleBar.FONT);
   this.componentHasFocus = false;
};

JSTitleBar.prototype =
   jslib.inheritPrototype(JSCanvas, "JSTitleBar extends JSCanvas");
JSTitleBar.prototype.constructor = JSTitleBar;
JSTitleBar.prototype.$class = new Class("JSTitleBar", JSTitleBar);

JSTitleBar.prototype.setTitle = function(title) {
   this.title = title;
   this.repaint();
};

JSTitleBar.prototype.getTitle = function() {
   return this.title;
};

JSTitleBar.prototype.getPreferredSize = function() {
   return this.getMinimumSize();
};

JSTitleBar.prototype.getMinimumSize = function() {
   var fm = this.getFontMetrics(this.getFont());
   return new Dimension(fm.stringWidth(this.title), JSTitleBar.HEIGHT);
};

JSTitleBar.prototype.focusGained = function(e) {
   this.componentHasFocus = true;
   this.repaint();
};

JSTitleBar.prototype.focusLost = function(e) {
   this.componentHasFocus = false;
   this.repaint();
};

JSTitleBar.prototype.repaint = function() {
   var g = this.getGraphics();
   if (!g.ctx) return;
   var c1 = (this.componentHasFocus) ? JSTitleBar.TOP_FOCUSED
                                     : JSTitleBar.TOP_BLURRED;
   var c2 = (this.componentHasFocus) ? JSTitleBar.BOTTOM_FOCUSED
                                     : JSTitleBar.BOTTOM_BLURRED;

   var lg = g.ctx.createLinearGradient(0, 0, 0, this.height);
   lg.addColorStop(0, c1.getColorTag());
   lg.addColorStop(1, c2.getColorTag());
   g.ctx.save();
   g.ctx.fillStyle = lg;
   g.ctx.fillRect(0, 0, this.width, this.height);
   g.ctx.fillStyle = this.fg.getColorTag();
   g.ctx.font = this.font.getFontTag();
   var fm = g.getFontMetrics();
   var x = (this.width - fm.stringWidth(this.title)) / 2;
   var y = (this.height + fm.getAscent()) / 2 + JSTitleBar.TITLE_DY;
   g.ctx.fillText(this.title, x, y);
   g.ctx.restore();
};

JSTitleBar.HEIGHT = 20;
JSTitleBar.FONT = Font.decode("System-12");
JSTitleBar.TOP_FOCUSED = new Color(0xCCCCCC);
JSTitleBar.BOTTOM_FOCUSED = new Color(0x999999);
JSTitleBar.TOP_BLURRED = new Color(0xEEEEEE);
JSTitleBar.BOTTOM_BLURRED = new Color(0xBBBBBB);
JSTitleBar.TITLE_DY = -1;

/* JSDialog.js */

var JSDialog = function(target) {
   JComponent.call(this);
   this.listeners = [];
   this.target = target;
   this.body = document.getElementsByTagName("body")[0];
   this.glassPane = document.createElement("div");
   this.glassPane.style = "position:absolute; width:100%; height:100%; " +
                          "background-color:rgba(0,0,0,0);" +
                          "overflow:hidden; z-index:10;";
   this.glassPane.appendChild(this.element);
   this.visible = false;
};      

JSDialog.prototype =
   jslib.inheritPrototype(JComponent, "JSDialog extends JComponent");
JSDialog.prototype.constructor = JSDialog;
JSDialog.prototype.$class = new Class("JSDialog", JSDialog);

JSDialog.prototype.execute = function(cmd) {
   var e = new ActionEvent(this, ActionEvent.ACTION_PERFORMED, cmd);
   this.fireActionListeners(e);
   this.setVisible(false);
};

JSDialog.prototype.addActionListener = function(listener) {
   this.listeners.push(listener);
};

JSDialog.prototype.fireActionListeners = function(e) {
   for (var i = 0; i < this.listeners.length; i++) {
      this.listeners[i].actionPerformed(e);
   }
};

JSDialog.prototype.getTarget = function() {
   return this.target;
};

JSDialog.prototype.getTargetCoordinates = function(pt) {
   var x = pt.x;
   var y = pt.y;
   var c = this.target.element;
   while (c && c !== this.body) {
      x -= c.offsetLeft;
      y -= c.offsetTop;
      c = c.offsetParent;
   }
   return new Point(x, y);
};

JSDialog.prototype.getWindowCoordinates = function(pt) {
   var x = pt.x;
   var y = pt.y;
   var c = this.target.element;
   while (c && c !== this.body) {
      x += c.offsetLeft;
      y += c.offsetTop;
      c = c.offsetParent;
   }
   return new Point(x, y);
};

JSDialog.prototype.setTitle = function(title) {
   /* Empty */
};

JSDialog.prototype.setVisible = function(flag) {
   if (flag !== this.visible) {
      this.visible = flag;
      if (flag) {
         this.body.appendChild(this.glassPane);
      } else {
         this.body.removeChild(this.glassPane);
      }
   }
};

JSDialog.prototype.setLocation = function(x, y) {
   if (typeof(x) === "number") {
      this.location = new Point(x, y);
   } else {
      this.location = x;
   }
};

JSDialog.prototype.centerOnParent = function() {
   var psize = this.target.getSize();
   var dsize = this.getSize();
   var x = (psize.width - dsize.width) / 2;
   var y = (psize.height - dsize.height) / 2;
   this.setLocation(x, y);   
};

/* JSLoginDialog.js */

var JSLoginDialog = function(target) {
   JSDialog.call(this, target);
   var dialog = this;
   var listener = {
      actionPerformed : function(e) {
         if (e instanceof JSErrorEvent) {
            // Fill in
         } else {
            dialog.execute("Login");
         }
      }
   };
   dialog.setLayout(new BorderLayout());
   dialog.titleBar = new JSTitleBar("Login");
   dialog.add(dialog.titleBar, BorderLayout.NORTH);
   dialog.nameField = new JTextField();
   dialog.nameField.addActionListener(listener);
   var size = new Dimension(JSLoginDialog.LOGIN_FIELD_WIDTH,
                            JSLoginDialog.LOGIN_FIELD_HEIGHT);
   dialog.nameField.setPreferredSize(size);
   var panel = new JSPanel();
   panel.setLayout(new FlowLayout());
   panel.add(new JLabel("UserID: "));
   panel.add(dialog.nameField);
   panel.add(new JLabel("  "));
   dialog.add(panel, BorderLayout.CENTER);
   size = new Dimension(JSLoginDialog.LOGIN_DIALOG_WIDTH,
                        JSLoginDialog.LOGIN_DIALOG_HEIGHT);
   dialog.setSize(size);
   dialog.element.style.position = "relative";
   dialog.element.style.backgroundColor = "white";
   dialog.element.style.border = "solid 1px #666666";
};

JSLoginDialog.prototype =
   jslib.inheritPrototype(JSDialog, "JSLoginDialog extends JSDialog");
JSLoginDialog.prototype.constructor = JSLoginDialog;
JSLoginDialog.prototype.$class = new Class("JSLoginDialog", JSLoginDialog);

JSLoginDialog.prototype.execute = function(cmd) {
   this.setVisible(false);
   cmd = this.nameField.getText();
   var e = new ActionEvent(this, ActionEvent.ACTION_PERFORMED, cmd);
   this.fireActionListeners(e);
};

JSLoginDialog.prototype.setVisible = function(flag) {
   if (flag !== this.visible) {
      this.visible = flag;
      if (flag) {
         this.body.appendChild(this.glassPane);
         var origin = this.getWindowCoordinates(new Point(0, 0));
         this.element.style.left = (this.location.x + origin.x) + "px";
         this.element.style.top = (this.location.y + origin.y) + "px";
         this.element.style.position = "absolute";
         this.element.style.zIndex = 11;
         this.titleBar.repaint();
      } else {
         this.body.removeChild(this.glassPane);
      }
   }
};

JSLoginDialog.LOGIN_DIALOG_WIDTH = 300;
JSLoginDialog.LOGIN_DIALOG_HEIGHT = 80;
JSLoginDialog.LOGIN_FIELD_WIDTH = 220;
JSLoginDialog.LOGIN_FIELD_HEIGHT = 18;

/* JSErrorDialog.js */

var JSErrorDialog = function(target) {
   JSDialog.call(this, target);
   this.element.innerHTML =
      "<table id=JSErrorTable cellPadding=0 cellSpacing=0 border=0 " +
      "bgcolor=" + JSErrorDialog.ERROR_BACKGROUND.getColorTag() + ">" +
      "<tr><td><img src='" + JSErrorDialog.BUG_IMAGE + "' width=44></td>" +
      "<td valign=middle><div id=JSErrorMessage></div></td>" +
      "<td>&nbsp;</td></tr></table>";
   var listener = new JSErrorDialogListener(this);
   this.addMouseListener(listener);
   this.maxWidth = JSErrorDialog.DEFAULT_MAX_WIDTH;
};

JSErrorDialog.prototype =
   jslib.inheritPrototype(JSDialog, "JSErrorDialog extends JSDialog");
JSErrorDialog.prototype.constructor = JSErrorDialog;
JSErrorDialog.prototype.$class = new Class("JSErrorDialog", JSErrorDialog);

JSErrorDialog.prototype.setErrorMessage = function(msg) {
   this.msg = msg;
};

JSErrorDialog.prototype.setMaxWidth = function(width) {
   this.maxWidth = width;
};

JSErrorDialog.prototype.getMaxWidth = function() {
   return this.maxWidth;
};

JSErrorDialog.prototype.setVisible = function(flag) {
   if (flag !== this.visible) {
      this.visible = flag;
      if (flag) {
         this.body.appendChild(this.glassPane);
         var table = document.getElementById("JSErrorTable");
         table.style.left = this.location.x + "px";
         table.style.top = this.location.y + "px";
         table.style.position = "absolute";
         document.getElementById("JSErrorMessage").innerHTML = this.msg;
      } else {
         this.body.removeChild(this.glassPane);
      }
   }
};

JSErrorDialog.ERROR_BACKGROUND = new Color(0xFFCC33);
JSErrorDialog.DEFAULT_MAX_WIDTH = 500;
JSErrorDialog.BUG_IMAGE =
"data:image/png;base64," +
"iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAADGUlEQVR42u2Z" +
"PU7DQBCFLSRKEJR0iAPQUNJyBSRKCkSHRMcJkOhoEBIVBVS5AlfIFbgCV1j0" +
"YT3lZbxO1ontCMFKKyfrn/0882b2x9U0peo31eof+C8APzykdHeX0mSS0mDA" +
"5+cpUels1WcAWVV1vb5O6ehoIOCzs5SoANPZ/n53cO4X6NdX+ik8ZxBgOgKQ" +
"8vlZu5M2IEruPzmZWVbPQQ78H9TCXj4+apcCUworC1M4DgaMRXGf3AosBdcC" +
"1OZaSYjKy3H/y0t9n9oGCzq3ktzq0LFzrvF7vOgchugdGItgqdPTWeeylAII" +
"XWNll4fDUhVoHLm2RA4rAUsGz8/zAKqSh6zGS+ie3HWSCdf1CqxA4zcPp0PP" +
"ozl5IAs/x38NEFiWZygt9j7SeVDQofQWoZAB0NRo2ah1SaFLDu8sh9zvnDRy" +
"FferKL0tS4Nra5hO/ahAXASKBfEK13nO7SKFlYEVHByxDpaWBNqAFWAOW5oV" +
"esnDx8dNKIHngD0/qw1rjwa8tzcf+QIF4vGxmRmQgwJsHdi1Jj/eOdYD7PKy" +
"mco4720HBxsGJvhkve3tvH6Vb6OENgK8rPqop8wwapag7u6WwWoK6mmPNg/A" +
"rtCdYdXR1tY83OFhE5hgQw4+rdRLeFuXwWMlWHWA5TREO4BPzJm5eTvXx7Yu" +
"maMzbNusynUKlKRAu6c0rE6J84ySyXsxsFYRi6xwfz8/wcGKEYpnxAHEay/A" +
"PHyZxhyMa7WgzGmakpuW9gJM58uWLYLFeq+vzYEjahoPtFn46mqNJRIgJTsx" +
"vJDr7+ammUE0S4vZIaZAzpFtFklv4YysdAXtXqDz9/eZFXkZzdaAavOAtD+d" +
"1t5qM1Yv+2L+cNe7a7VNBi4ZeYJj24DS+8Ze1PzbWw20s1M+Mmr5lJPGOFuk" +
"1cwLT0813MVF/d8zjDZXJJ9cwI8G7J0LLLe8cuDcjG5wWLQbg9i3s3I5mRfS" +
"wmBUYEBjp9pYcdjb22a6axusBgWOQQOsSyOmRO0mMcxv/JNBLq9GqZTsEW/0" +
"20b0gBasv+IrUu+bgf+fvf4K8Ddxu3rpl8K1pQAAAABJRU5ErkJggg==";

var JSErrorDialogListener = function(dialog) {
   this.dialog = dialog;
};

JSErrorDialogListener.prototype.mouseClicked = function(e) {
   this.dialog.setVisible(false);
};

JSErrorDialogListener.prototype.mouseEntered = function(e) {
   /* Empty */
};

JSErrorDialogListener.prototype.mouseExited = function(e) {
   /* Empty */
};

JSErrorDialogListener.prototype.mousePressed = function(e) {
   /* Empty */
};

JSErrorDialogListener.prototype.mouseReleased = function(e) {
   /* Empty */
};

/* JSFileDialog.js */

var JSFileDialog = function(target) {
   JSDialog.call(this, target);
   this.fileList = new JSDirectoryTree(this);
   this.setLayout(new BorderLayout());
   this.titleBar = new JSTitleBar("File Dialog");
   this.add(this.titleBar, BorderLayout.NORTH);
   this.add(this.fileList, BorderLayout.CENTER);
   this.setSize(JSFileDialog.DIALOG_WIDTH, JSFileDialog.DIALOG_HEIGHT);
   this.element.style.backgroundColor = "white";
   this.element.style.border = "solid 1px #666666";
};

JSFileDialog.prototype = 
   jslib.inheritPrototype(JSDialog, "JSFileDialog extends JSDialog");
JSFileDialog.prototype.constructor = JSFileDialog;
JSFileDialog.prototype.$class = new Class("JSFileDialog", JSFileDialog);

JSFileDialog.prototype.setTitle = function(title) {
   this.titleBar.setTitle(title);
};

JSFileDialog.prototype.setDirectory = function(dir) {
   this.dir = dir;
   this.ready = false;
   this.waiting = false;
   this.selectedFile = null;
   this.directoryReader = new JSDirectoryReader(this, dir);
};

JSFileDialog.prototype.getDirectory = function() {
   return this.dir;
};

JSFileDialog.prototype.getTree = function() {
   return this.fileList;
};

JSFileDialog.prototype.setVisible = function(flag) {
   if (flag !== this.visible) {
      this.visible = flag;
      if (flag) {
         this.selectedFile = null;
         this.fileList.select(-1, null);
         if (this.ready) {
            this.body.appendChild(this.glassPane);
            var origin = this.getWindowCoordinates(new Point(0, 0));
            this.element.style.left = (this.location.x + origin.x) + "px";
            this.element.style.top = (this.location.y + origin.y) + "px";
            this.element.style.position = "absolute";
            this.element.style.zIndex = 11;
            this.titleBar.repaint();
         } else {
            this.waiting = true;
         }
      } else {
         this.body.removeChild(this.glassPane);
      }
   }
};

JSFileDialog.prototype.getSelectedFile = function() {
   if (this.selectedFile === null) {
      var filename = this.fileList.getSelectedValue();
      if (filename !== null) {
         this.selectedFile = this.dir.getPath() + "/" + filename;
      }
   }
   return this.selectedFile;
};

JSFileDialog.prototype.setSelectedFile = function(value) {
   this.selectedFile = value;
};

JSFileDialog.prototype.setControlPanel = function(panel) {
   this.controlPanel = panel;
   this.add(this.controlPanel, BorderLayout.SOUTH);
   this.setSize(JSFileDialog.DIALOG_WIDTH, JSFileDialog.DIALOG_HEIGHT);
};

JSFileDialog.prototype.getControlPanel = function() {
   return this.controlPanel;
};

JSFileDialog.prototype.signalError = function(msg) {
   // Fill in
};

JSFileDialog.DIALOG_WIDTH = 400;
JSFileDialog.DIALOG_HEIGHT = 250;

/* JSLoadDialog */

var JSLoadDialog = function(target) {
   JSFileDialog.call(this, target);
   this.setTitle("Load File");
   this.controlListener = new JSLoadDialogListener(this);
   this.setControlPanel(this.createDefaultPanel());
   this.getTree().addActionListener(this.controlListener);
   this.getTree().setActionCommand("Load");
};

JSLoadDialog.prototype = 
   jslib.inheritPrototype(JSFileDialog, "JSLoadDialog extends JSFileDialog");
JSLoadDialog.prototype.constructor = JSLoadDialog;
JSLoadDialog.prototype.$class = new Class("JSLoadDialog", JSLoadDialog);

JSLoadDialog.prototype.createDefaultPanel = function () {
   var tree = this.getTree();
   var panel = new JSPanel();
   panel.setLayout(new FlowLayout(FlowLayout.RIGHT));
   var cancelButton = new JButton("Cancel");
   var loadButton = new JButton("Load");
   cancelButton.addActionListener(this.controlListener);
   loadButton.addActionListener(this.controlListener);
   panel.add(cancelButton);
   panel.add(loadButton);
   return panel;
};

JSLoadDialog.prototype.getControlListener = function() {
   return this.controlListener;
};

var JSLoadDialogListener = function(dialog) {
   this.dialog = dialog;
};

JSLoadDialogListener.prototype.actionPerformed = function(e) {
   var cmd = e.getActionCommand();
   if (cmd === "Cancel") {
      this.dialog.setVisible(false);
      this.dialog.execute("");
   } else if (cmd === "Load") {
      cmd = this.dialog.getSelectedFile();
      this.dialog.execute((cmd === null) ? "" : cmd);
   }
};

/* JSSaveDialog */

var JSSaveDialog = function(target) {
   JSFileDialog.call(this, target);
   this.setTitle("Save File");
   this.controlListener = new JSSaveDialogListener(this);
   this.setControlPanel(this.createDefaultPanel());
   this.getTree().addActionListener(this.controlListener);
   this.getTree().setActionCommand("Save");
};

JSSaveDialog.prototype = 
   jslib.inheritPrototype(JSFileDialog, "JSSaveDialog extends JSFileDialog");
JSSaveDialog.prototype.constructor = JSSaveDialog;
JSSaveDialog.prototype.$class = new Class("JSSaveDialog", JSSaveDialog);

JSSaveDialog.prototype.createDefaultPanel = function () {
   var panel = new JSPanel();
   this.fileField = new JTextField();
   this.fileField.setActionCommand("Save");
   this.fileField.addActionListener(this.controlListener);
   this.fileField.setPreferredSize(100, 20);
   var filePanel = new JSPanel();
   filePanel.setLayout(new BorderLayout());
   filePanel.add(this.fileField, BorderLayout.CENTER);
   filePanel.add(new JLabel("  "), BorderLayout.EAST);
   var buttons = new JSPanel();
   panel.setLayout(new BorderLayout());
   panel.setPreferredSize(100, 28);
   buttons.setLayout(new FlowLayout(FlowLayout.RIGHT));
   var cancelButton = new JButton("Cancel");
   var loadButton = new JButton("Save");
   cancelButton.addActionListener(this.controlListener);
   loadButton.addActionListener(this.controlListener);
   buttons.add(cancelButton);
   buttons.add(loadButton);
   panel.add(filePanel, BorderLayout.CENTER);
   panel.add(buttons, BorderLayout.EAST);
   return panel;
};

JSSaveDialog.prototype.getControlListener = function() {
   return this.controlListener;
};

JSSaveDialog.prototype.getSelectedFile = function () {
   var name = this.fileField.getText();
   if (name === null || name === "") {
      name = this.fileList.getSelectedValue();
   }
   return this.getDirectory().getPath() + "/" + name;
}

var JSSaveDialogListener = function(dialog) {
   this.dialog = dialog;
};

JSSaveDialogListener.prototype.actionPerformed = function(e) {
   var cmd = e.getActionCommand();
   if (cmd === "Cancel") {
      this.dialog.setVisible(false);
      this.dialog.execute("");
   } else if (cmd === "Save") {
      cmd = this.dialog.getSelectedFile();
      this.dialog.execute((cmd === null) ? "" : cmd);
   }
};

var JSDirectoryReader = function(dialog, dir) {
   this.dialog = dialog;
   dir.readDirectoryTree(this);
};

JSDirectoryReader.prototype.actionPerformed = function(e) {
   var cmd = jslib.trim(e.getActionCommand());
   var dialog = this.dialog;
   if (e instanceof JSErrorEvent) {
      dialog.signalError(cmd);
   } else {
      var fileList = this.dialog.getTree();
      fileList.parseDirectoryTree(cmd);
      fileList.update();
      dialog.ready = true;
      if (dialog.waiting) dialog.setVisible(true);
   }
};

var JSDirectoryTree = function(dialog) {
   JComponent.call(this);
   this.listeners = [];
   this.actionCommand = "";
   this.dialog = dialog;
   this.selectedIndex = -1;
   this.expanded = false;
   this.element.style.overflowX = "auto";
   this.element.style.overflowY = "auto";
   this.element.style.backgroundColor = "white";
};

JSDirectoryTree.prototype =
   jslib.inheritPrototype(JComponent, "JSDirectoryTree extends JComponent");
JSDirectoryTree.prototype.constructor = JSDirectoryTree;
JSDirectoryTree.prototype.$class = new Class("JSDirectoryTree",
                                             JSDirectoryTree);

JSDirectoryTree.prototype.addActionListener = function(listener) {
   this.listeners.push(listener);
};

JSDirectoryTree.prototype.fireActionListeners = function() {
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

JSDirectoryTree.prototype.setActionCommand = function(cmd) {
   this.actionCommand = cmd;
};

JSDirectoryTree.prototype.getActionCommand = function() {
   return this.actionCommand;
};

JSDirectoryTree.prototype.getSelectedIndex = function() {
   return this.selectedIndex;
};

JSDirectoryTree.prototype.getSelectedValue = function() {
   var file = null;
   if (this.selectedIndex !== -1) {
      file = this.array[this.selectedIndex];
      if (this.selectedIndex > this.boundary) {
         file = "examples/" + file;
      }
   }
   return file;
};

JSDirectoryTree.prototype.add = function(name) {
   this.files.push(name);
   this.update();
};

// This implementation is a stub that allows only one subdirectory

JSDirectoryTree.prototype.parseDirectoryTree = function(text) {
   var lines = JSPlatform.splitLines(text);
   var line = "";
   var n = lines.length;
   this.examples = null;
   this.files = [];
   for (var i = 0; i < n; i++) {
      line = lines[i];
      if (jslib.endsWith(line, "/")) {
         this.examples = [];
      } else if (jslib.startsWith(line, ":")) {
         this.examples.push(line.substring(1));
      } else {
         this.files.push(line);
      }
   }
};

JSDirectoryTree.prototype.update = function() {
   var table = document.createElement("table");
   table.style.border = "none";
   table.style.backgroundColor = "white";
   var n = this.files.length;
   this.files.sort();
   this.array = [];
   for (var i = 0; i < n; i++) {   
      this.array.push(this.files[i]);
   }
   if (this.examples !== null) {
      this.boundary = n++;
      this.array.push("examples");
      if (this.expanded) {
         this.examples.sort();
         for (var i = 0; i < this.examples.length; i++) {
            this.array.push(this.examples[i]);
         }
         n += this.examples.length;
      }
   }
   for (var i = 0; i < n; i++) {
      table.appendChild(this.createTableEntry(i));
   }
   while (this.element.firstChild) {
      this.element.removeChild(this.element.firstChild);
   }
   this.element.appendChild(table);
};

JSDirectoryTree.prototype.select = function(k, td) {
   if (this.selectedIndex !== -1) {
      this.selectedEntry.style.backgroundColor = "white";
   }
   if (k === this.boundary) {
      this.expanded = !this.expanded;
      this.update();
   } else {
      this.selectedIndex = k;
      this.selectedEntry = td;
      if (td !== null) {
         td.style.backgroundColor = JSDirectoryTree.SELECTED_COLOR;
      }
   }
};

JSDirectoryTree.prototype.createTableEntry = function(k) {
   var list = this;
   var tr = document.createElement("tr");
   var td = document.createElement("td");
   td.style.width = JSLoadDialog.DIALOG_WIDTH + "px";
   td.style.backgroundColor = "white";
   td.style.fontFamily = "arial","helvetica","sans-serif";
   td.style.fontSize = "0.9em";
   var mousedown = function(e) {
      if (k === list.boundary) {
         list.expanded = !list.expanded;
         list.update();
      } else {
         list.select(k, td);
      }
   };
   var dblclick = function(e) {
      if (k !== list.boundary) list.fireActionListeners();
   };
   jslib.addListener(td, "mousedown", mousedown);
   jslib.addListener(td, "dblclick", dblclick);
   var leader = JSDirectoryTree.SPACER;
   var icon = JSDirectoryTree.FILE_ICON;
   if (k === list.boundary) {
      icon = JSDirectoryTree.FOLDER_CLOSED;
      if (list.expanded) {
         leader = JSDirectoryTree.TRIANGLE_DOWN;
      } else {
         leader = JSDirectoryTree.TRIANGLE_RIGHT;
      }
   }
   var html = "<img src='" + leader + "' alt='folder' />";
   if (k > list.boundary) {
      html += "<img src='" + leader + "' alt='folder' />";
   }
   html += "<img src='" + icon + "' alt='folder' />" +
           "<span style='vertical-align: 10%;'>&nbsp;" +
           list.array[k] + "</span>";
   td.innerHTML = html;
   tr.appendChild(td);
   return tr;
};

JSDirectoryTree.SELECTED_COLOR = "Highlight";
JSDirectoryTree.FILE_ICON =
   "data:image/png;base64," +
   "iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAABKElEQVR42q2S" +
   "zYuCQByG+/c9eBC6dQ6zLp1NNKUPhD168VIgUYiglGKR2Lu8A7sH3Z0xdgce" +
   "kJ/PPMyIow9g9J/0BlEUYb/f/8rbQW46n88/Mp/PldHeYLfb4XK54Hg89phO" +
   "pyiKAnTeCqZpiiRJesxmM9zvd2m0N9hut8iyDKfTqYdlWWjb9jtKVxncbDbI" +
   "81xcu8tisYCmaQJd10FXGQyCANfrVZyyC08Zx7HgcDiArjLo+z6qqhJX6sKT" +
   "f1GWJegqg+v1Wnyj2+0mhQ5dZdDzPDyfT9R1LYUOXWXQdV00TYPH4yGFDl1l" +
   "0HEc8Wtwgww6dJXB1WoFrtfrJYWLrjJo2/bgIN3BwSFrUDAMQyyXS5imiclk" +
   "gvF4DMMwBHzmjO/o0FUG/8onyCmD8X0UFykAAAAASUVORK5CYII=";

JSDirectoryTree.FOLDER_CLOSED = 
   "data:image/png;base64," +
   "iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAACQ0lEQVR42q2R" +
   "/07TUBiGuU+8Aw0xCqgx6PihCUYEndvIQAMCY3RjY8gQ2MRNNge00E22ruva" +
   "rrVdBhrRyAW8nNN2i6RLTIh/PHnP+XLeJ19yejig539y5bLzhYdnbuMKdHZt" +
   "IRUs5iSLBSfp7FpC72oKd30RzGyxmN3mOvT7IxYDDoMO9xzo7FU0BZfwwXQE" +
   "RfMCRaPNb5SaF+C//QGr/QLbOEdBPUdW+YGM9B27tTOkhVOkqz+JeKW7MCue" +
   "IlNpOhhW7pZN7HzVkSrp2OJ1rPMNJI5UxFkF0QMZsUOdbMx0EQZW8J5vYoOU" +
   "NilFHUlLoGHtqIE418AqKyN6qCBCRCv7MsL7EkIFrfuG9wMMYryJBKeSDRqW" +
   "ZI2jIhWrhypiB4otKchYJoTydSzlyecR4aCvi5AOI6wJhpSYA5u2IFSwy/bv" +
   "1zC/J2LuM4FmTkW/L+wW9vuWMZvT8G7PLsw7SUtvSXk2I+BNpoqZTwKCfxHI" +
   "qhjwhtzCO95l+HclTH+sWAQc/OkKfOkyXqdOCGULb6p9P8HLtIjbpOsS3ppa" +
   "wvi2gIkPJbxos1nChMPzZAnjyaKVFtaMx7OtCmi3q3B4XcBYgsNo4hjDhNF1" +
   "knGScfs8QnhKeEIYo2f6Ling5mQ34eQiHkaP4WFyeMTkMUSwMkwynO/MPA6P" +
   "nRyKHYN2XcK+qQX0jgTROxrEjX/Q22bEpm9ywS1sts7QarVgmiZ0XYeqqpBl" +
   "GZIkQRRFCIKAarWKWq2Ger0ORVGgaRoMw4BumB3hJRx/xEMGKdVJAAAAAElF" +
   "TkSuQmCC";

JSDirectoryTree.FOLDER_OPEN = 
   "data:image/png;base64," +
   "iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAACR0lEQVR42rWU" +
   "cU8SYRzHeZ/2DmqulVqtWYjWZsu0CHBKTVMRAUFMDIUIEkK9k4OEA4674647" +
   "htayli/g2/PcHa7GbW0u//js+zy/3fez3/Zs52ABx//EcaXC3U8cnAtbf0Fn" +
   "lxZSwXJeMFiyks4uJXSvp3DbE8Z8koF/h71gyBs2GLYYsbhjQWcvIin0Ce/N" +
   "hlHWz1HWevxEpXMO7ssvMMoPMO0zFOUz5KRvyApfkWmeIs2fIF3/TsRr9sJc" +
   "4wTZWsdCMzJT1bH7WUWqoiLJqdjk2ogfyYgxEiIHIqKHKtk4ZCP0reEt18EW" +
   "KW1TyioShkDBxlEbMbaNdUZE5FBCmIjW9kUE9wUEior9hnd9IUQ5HXFWJhu0" +
   "DckGS0Uy1g9lRA8kU1IUsUoIFFpYKZDHI8IRj42QDsOMjhAphQ5MeoJA0Syb" +
   "r9/E4l4DCx8JNPMyhjzBfuGQZxX+vII3e2Zh0Upaek3K/iyPV9k65j/wmPsD" +
   "X07GsDvQL7zlXoU3I2D2fc3AZ+FN1+BJV/EydUyoGrhTvfsxnqcbuEm6fcIb" +
   "MyuY3OEx9a6CZz22K5iyeJqoYDJRNtLAmHF4kqyBdm2FY5s8JuIsxuMljBHG" +
   "N0nGSMbMs4vwmPCIMEHP9LsEj+vTdsLpZdyPlOAM5fEgVMAowcggyWDhYua0" +
   "eGjlaLQE2u0TDs4sYcA1h4HxOVz7BwM9XCaD00v9wk73FN1uF7quQ1VVyLIM" +
   "URQhCAIajQZ4nke9Xkez2USr1YIkSVAUBZqmQdV0XNn/8DctJzPiO8LmFwAA" +
   "AABJRU5ErkJggg==";

JSDirectoryTree.SPACER = 
   "data:image/png;base64," +
   "iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAHklEQVR42mM4" +
   "8/8/AzUxw6iBowaOGjhq4KiBtDEQAJU17D60KeKFAAAAAElFTkSuQmCC";

JSDirectoryTree.TRIANGLE_DOWN = 
   "data:image/png;base64," +
   "iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAdUlEQVR42u3T" +
   "MQrAIAwFUE/v5iC4ODm6egbnrA6C4JRzfMGtpS1YpVBw+OuD5CeCALEyYoM/" +
   "ArXWkFLexlqLITCl9AjWWjE8svf+Egsh4PUOz5hSClOlxBgPIBFhumVjTMec" +
   "c1hyNqWUDjIzlt1hzhn79b4BG3ST6z8NEG2zAAAAAElFTkSuQmCC";

JSDirectoryTree.TRIANGLE_RIGHT = 
   "data:image/png;base64," +
   "iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAYklEQVR42mM4" +
   "8/8/AzUxw6iBtDVw0uTJ/y9eufafaga2tbX9B+EVK1f9p6qBINze0fH/wKEj" +
   "/6lmIAxPmzb9/83b9/5TzUAQbmlp+X/p6vX/g8uFVA1DqsUy1dPhaOFAFAYA" +
   "j3HqjtXcj+8AAAAASUVORK5CYII=";
                  
var JSDirectoryTreeListener = function(dialog) {
   this.dialog = dialog;
};

JSDirectoryTreeListener.prototype.mouseClicked = function(e) {
   if (e.getClickCount() === 2) this.dialog.execute("Load");
};

JSDirectoryTreeListener.prototype.mouseEntered = function(e) {
   /* Empty */
};

JSDirectoryTreeListener.prototype.mouseExited = function(e) {
   /* Empty */
};

JSDirectoryTreeListener.prototype.mousePressed = function(e) {
   /* Empty */
};

JSDirectoryTreeListener.prototype.mouseReleased = function(e) {
   /* Empty */
};

return {
   JSElementList : JSElementList,
   JSErrorEvent : JSErrorEvent,
   JSCanvas : JSCanvas,
   JSCookie : JSCookie,
   JSDialog : JSDialog,
   JSErrorDialog : JSErrorDialog,
   JSFile : JSFile,
   JSFrame : JSFrame,
   JSImage : JSImage,
   JSLineReader : JSLineReader,
   JSLoadDialog : JSLoadDialog,
   JSPanel : JSPanel,
   JSPlatform : JSPlatform,
   JSProgram : JSProgram,
   JSSaveDialog : JSSaveDialog,
   JSScrollPane : JSScrollPane,
   JSTitleBar : JSTitleBar
};

});
