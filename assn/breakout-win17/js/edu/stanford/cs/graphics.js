/*
 * File: graphics.js
 * -----------------
 * This file implements the Stanford graphics package.
 */

/* Standard header for requirejs */

define([ "jslib",
         "edu/stanford/cs/java2js",
         "java/awt",
         "java/lang",
         "java/util" ],

function(jslib,
         edu_stanford_cs_java2js,
         java_awt,
         java_lang,
         java_util) {

/* Imports */

var inheritPrototype = jslib.inheritPrototype;
var toInt = jslib.toInt;
var toStr = jslib.toStr;
var Integer = jslib.Integer;
var Double = jslib.Double;
var Character = jslib.Character;
var JSCanvas = edu_stanford_cs_java2js.JSCanvas;
var JSImage = edu_stanford_cs_java2js.JSImage;
var AffineTransform = java_awt.AffineTransform;
var Color = java_awt.Color;
var Font = java_awt.Font;
var Graphics = java_awt.Graphics;
var Image = java_awt.Image;
var Point = java_awt.Point;
var Class = java_lang.Class;
var RuntimeException = java_lang.RuntimeException;
var ArrayList = java_util.ArrayList;

/* GCanvas */

var GCanvas = function(width, height) {
   JSCanvas.call(this);
   if (width === undefined) width = GCanvas.DEFAULT_WIDTH;
   if (height === undefined) width = GCanvas.DEFAULT_HEIGHT;
   this.elements = [];
   this.autoRepaintFlag = true;
};

GCanvas.prototype =
   jslib.inheritPrototype(JSCanvas, "GCanvas extends JSCanvas");
GCanvas.prototype.constructor = GCanvas;
GCanvas.prototype.$class = new Class("GCanvas", GCanvas);

GCanvas.prototype.clear = function() {
   this.removeAll();
};

GCanvas.prototype.removeAll = function() {
   this.elements = [];
   this.conditionalRepaint();
};

GCanvas.prototype.add = function(gobj, x, y) {
   this.elements.push(gobj);
   if (x !== undefined) {
      if (y === undefined) {
         y = x.y;
         x = x.x;
      }
      gobj.setLocation(x, y);
   }
   gobj.parent = this;
   this.conditionalRepaint();
};

GCanvas.prototype.remove = function(gobj) {
   var k = this.elements.indexOf(gobj);
   if (k >= 0) this.elements.splice(k, 1);
   gobj.parent = null;
   this.conditionalRepaint();
};

GCanvas.prototype.getElementCount = function() {
   return this.elements.length;
};

GCanvas.prototype.getElement = function(index) {
   return this.elements[index];
};

GCanvas.prototype.getElementAt = function(x, y) {
   if (y === undefined) {
      y = x.y;
      x = x.x;
   }
   var n = this.elements.length;
   for (var i = n - 1; i >= 0; i--) {
      if (this.elements[i].contains(x, y)) return this.elements[i];
   }
   return null;
};

GCanvas.prototype.sendObjectToFront = function(gobj) {
   var k = this.elements.indexOf(gobj);
   if (k >= 0) {
      this.elements.splice(k, 1);
      this.elements.push(gobj);
      this.conditionalRepaint();
   }
};

GCanvas.prototype.sendObjectToBack = function(gobj) {
   var k = this.elements.indexOf(gobj);
   if (k >= 0) {
      this.elements.splice(k, 1);
      this.elements.unshift(gobj);
      this.conditionalRepaint();
   }
};

GCanvas.prototype.sendObjectForward = function(gobj) {
   var k = this.elements.indexOf(gobj);
   if (k >= 0 && k < this.elements.length - 1) {
      this.elements.splice(k, 1);
      this.elements.splice(k + 1, 0, gobj);
      this.conditionalRepaint();
   }
};

GCanvas.prototype.sendObjectBackward = function(gobj) {
   var k = this.elements.indexOf(gobj);
   if (k >= 1) {
      this.elements.splice(k, 1);
      this.elements.splice(k - 1, 0, gobj);
      this.conditionalRepaint();
   }
};

GCanvas.prototype.paintComponent = function(g) {
   var n = this.elements.length;
   for (var i = 0; i < n; i++) {
      this.elements[i].paint(g);
   }
};

GCanvas.prototype.setAutoRepaintFlag = function(flag) {
   this.autoRepaintFlag = flag;
};

GCanvas.prototype.getAutoRepaintFlag = function() {
   return this.autoRepaintFlag;
};

GCanvas.prototype.conditionalRepaint = function() {
   if (this.autoRepaintFlag) this.repaint();
};

/* GObject */

var GObject = function() {
   this.ctm = new GTransform();
   this.transformed = false;
   this.x = 0;
   this.y = 0;
   this.width = 0;
   this.height = 0;
   this.fillFlag = false;
   this.color = Color.BLACK;
   this.fillColor = null;
   this.parent = null;
   this.lineWidth = 1;
   this.visible = true;
   this.mouseListenersEnabled = false;
};
GObject.prototype.$class = new Class("GObject", GObject);

GObject.prototype.paint = function(g) {
   this.paintContext(g.ctx);
};

GObject.prototype.getBounds = function() {
   var r = this.localBounds(this.ctm);
   r.translate(this.x, this.y);
   return r;
};

GObject.prototype.setLocation = function(x, y) {
   if (y === undefined) {
      this.y = x.y;
      this.x = x.x;
   } else {
      this.x = x;
      this.y = y;
   }
   this.repaint();
};

GObject.prototype.getLocation = function() {
   return new GPoint(this.x, this.y);
};

GObject.prototype.getX = function() {
   return this.x;
};

GObject.prototype.getY = function() {
   return this.y;
};

GObject.prototype.move = function(dx, dy) {
   this.x += dx;
   this.y += dy;
   this.repaint();
};

GObject.prototype.movePolar = function(r, theta) {
   var radians = theta * Math.PI / 180;
   this.move(r * Math.cos(radians), -r * Math.sin(radians));
};

GObject.prototype.getSize = function() {
   var bounds = this.getBounds();
   return new GDimension(bounds.width, bounds.height);
};

GObject.prototype.getWidth = function() {
   return this.getBounds().width;
};

GObject.prototype.getHeight = function() {
   return this.getBounds().height;
};

GObject.prototype.contains = function(x, y) {
   if (y === undefined) {
      y = x.y;
      x = x.x;
   }
   var t = new GTransform();
   t.translate(this.x, this.y);
   t.concatenate(this.ctm);
   var pt = t.inverseTransform(x, y);
   return this.localContains(pt.getX(), pt.getY());
};

GObject.prototype.sendToFront = function() {
   this.parent.sendToFront(this);
   if (this.mouseListenersEnabled) this.updateEnabledList();
};

GObject.prototype.sendToBack = function() {
   this.parent.sendToBack(this);
   if (this.mouseListenersEnabled) this.updateEnabledList();
};

GObject.prototype.sendForward = function() {
   this.parent.sendForward(this);
   if (this.mouseListenersEnabled) this.updateEnabledList();
};

GObject.prototype.sendBackward = function() {
   this.parent.sendBackward(this);
   if (this.mouseListenersEnabled) this.updateEnabledList();
};

GObject.prototype.setColor = function(color) {
   this.color = color;
   this.repaint();
};

GObject.prototype.getColor = function() {
   // Fix to climb object chain
   return this.color;
};

GObject.prototype.setFillColor = function(color) {
   this.fillColor = color;
   this.repaint();
};

GObject.prototype.getFillColor = function() {
   return this.fillColor;
};

GObject.prototype.setFilled = function(fillFlag) {
   this.fillFlag = fillFlag;
   this.repaint();
};

GObject.prototype.isFilled = function() {
   return this.fillFlag;
};

GObject.prototype.setLineWidth = function(width) {
   this.lineWidth = width;
   this.repaint();
}

GObject.prototype.getLineWidth = function() {
   return this.lineWidth;
}

GObject.prototype.rotate = function(theta) {
   this.ctm.rotate(theta);
   this.transformed = true;
   this.repaint();
}

GObject.prototype.scale = function(sx, sy) {
   if (sy === undefined) {
      this.ctm.scale(sx, sx);
   } else {
      this.ctm.scale(sx, sy);
   }
   this.transformed = true;
   this.repaint();
}

GObject.prototype.shear = function(sx, sy) {
   if (sy === undefined) {
      this.ctm.shear(sx, sx);
   } else {
      this.ctm.shear(sx, sy);
   }
   this.transformed = true;
   this.repaint();
}

GObject.prototype.translate = function(tx, ty) {
   this.ctm.translate(tx, ty);
   this.transformed = true;
   this.repaint();
};

GObject.prototype.setVisible = function(flag) {
   this.visible = flag;
   this.repaint();
};

GObject.prototype.isVisible = function() {
   return this.visible;
};

GObject.prototype.repaint = function() {
   if (this.parent) {
      if (this.parent.conditionalRepaint) {
         this.parent.conditionalRepaint();
      } else {
         this.parent.repaint();
      }
   }
};

GObject.getColorTag = function(color) {
   return (color.getColorTag) ? color.getColorTag() : color;
};

GObject.prototype.getCanvas = function() {
   var comp = this;
   while (comp.parent) {
      comp = comp.parent;
   }
   return comp;
}

GObject.prototype.localBounds = function(ctm) {
   throw new RuntimeException("No localBounds defined");
};

GObject.prototype.localContains = function(x, y) {
   throw new RuntimeException("No localContains defined");
};

GObject.prototype.paintContext = function(ctx) {
   if (this.visible) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.transform(this.ctm.a, this.ctm.b, this.ctm.c, this.ctm.d,
                    this.ctm.tx, this.ctm.ty);
      ctx.lineWidth = this.lineWidth;
      this.paintTransformed(ctx);
      ctx.restore();
   }
};

/* GArc */

var GArc = function(a1, a2, a3, a4, a5, a6) {
   GObject.call(this);
   if (a5 === undefined) {
      this.width = a1;
      this.height = a2;
      this.start = a3;
      this.sweep = a4;
   } else {
      this.setLocation(a1, a2);
      this.width = a3;
      this.height = a4;
      this.start = a5;
      this.sweep = a6;
   }
};

GArc.prototype = 
   jslib.inheritPrototype(GObject, "GArc extends GObject");
GArc.prototype.constructor = GArc;
GArc.prototype.$class = 
   new Class("GArc", GArc);

GArc.prototype.setStartAngle = function(start) {
   this.start = start;
   this.repaint();
};

GArc.prototype.getStartAngle = function() {
   return this.start;
};

GArc.prototype.setSweepAngle = function(sweep) {
   this.sweep = sweep;
   this.repaint();
};

GArc.prototype.getSweepAngle = function() {
   return this.sweep;
};

GArc.prototype.getStartPoint = function() {
   var pt = this.ctm.transform(this.getArcPoint(this.start));
   pt.translate(this.x, this.y);
   return pt;
};

GArc.prototype.getEndPoint = function() {
   var pt = this.ctm.transform(this.getArcPoint(this.start + this.sweep));
   pt.translate(this.x, this.y);
   return pt;
};

GArc.prototype.setFrameRectangle = function(x, y, width, height) {
   this.width = width;
   this.height = height;
   this.setLocation(x, y);
};

GArc.prototype.setFrameRectangle = function(bounds) {
   this.setFrameRectangle(bounds.x, bounds.y, bounds.width, bounds.height);
};

GArc.prototype.getFrameRectangle = function() {
   return new GRectangle(this.x, this.y, this.width, this.height);
};

GArc.prototype.localBounds = function(ctm) {
   var bb = new GRectangle(ctm.transform(this.getArcPoint(this.start)));
   bb.add(ctm.transform(this.getArcPoint(this.start + this.sweep)));
   var rx = this.width / 2;
   var ry = this.height / 2;
   var a = ctm.getScaleX();
   var b = ctm.getShearY();
   var c = ctm.getShearX();
   var d = ctm.getScaleY();
   var tx = Math.atan2(c * this.height, a * this.width);
   var ty = Math.atan2(d * this.height, b * this.width);
   for (var i = 0; i < 4; i++) {
      var t1 = tx + i * Math.PI / 2;
      var t2 = ty + i * Math.PI / 2;
      if (this.containsAngle(GMath.toDegrees(t1))) {
         bb.add(ctm.transform(rx + rx * Math.cos(t1), ry - ry * Math.sin(t1)));
      }
      if (this.containsAngle(GMath.toDegrees(t2))) {
         bb.add(ctm.transform(rx + rx * Math.cos(t2), ry - ry * Math.sin(t2)));
      }
   }
   if (this.fillFlag) bb.add(ctm.transform(rx, ry));
   return bb;
};

GArc.prototype.localContains = function(x, y) {
   var rx = this.width / 2;
   var ry = this.height / 2;
   if (rx === 0 || ry === 0) return false;
   var dx = x - rx;
   var dy = y - ry;
   var r = (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry);
   if (this.fillFlag) {
      if (r > 1.0) return false;
   } else {
      var t = GArc.ARC_TOLERANCE / ((rx + ry) / 2);
      if (Math.abs(1.0 - r) > t) return false;
   }
   return this.containsAngle(GMath.toDegrees(Math.atan2(-dy, dx)));
};

GArc.prototype.paintTransformed = function(ctx) {
   ctx.translate(this.width / 2, this.height / 2);
   ctx.scale(1, this.height / this.width);
   ctx.beginPath();
   var t1 = -GMath.toRadians(this.start);
   var t2 = -GMath.toRadians(this.start + this.sweep);
   ctx.arc(0, 0, this.width / 2, t1, t2, true);
   if (this.fillFlag) {
      ctx.lineTo(0, 0);
      ctx.closePath();
   }
   ctx.scale(1, this.width / this.height);
   if (this.fillFlag) {
      var fillColor = this.fillColor || this.color;
      ctx.fillStyle = GObject.getColorTag(fillColor);
      ctx.fill();
   }
   ctx.strokeStyle = GObject.getColorTag(this.color);
   ctx.stroke();
};

GArc.prototype.getArcPoint = function(angle) {
   var rx = this.width / 2;
   var ry = this.height / 2;
   return new GPoint(rx + rx * GMath.cosDegrees(angle),
                     ry - ry * GMath.sinDegrees(angle));
};

GArc.prototype.containsAngle = function(theta) {
   var start = Math.min(this.start, this.start + this.sweep);
   var sweep = Math.abs(this.sweep);
   if (sweep >= 360) return true;
   theta = (theta < 0) ? 360 - (-theta % 360) : theta % 360;
   start = (start < 0) ? 360 - (-start % 360) : start % 360;
   if (start + sweep > 360) {
      return theta >= start || theta <= start + sweep - 360;
   } else {
      return theta >= start && theta <= start + sweep;
   }
};

GArc.prototype.toString = function() {
  return "GArc(" + this.x + ", " + this.y + ", " + this.rx + ", " + this.ry +
         ", " + this.start + ", " + this.sweep + ")";
};
 
GArc.ARC_TOLERANCE = 2.5;

/* GCompound */

var GCompound = function(a1, a2) {
   GObject.call(this);
   this.elements = [];
   if (a1 !== undefined) this.setLocation(a1, a2);
};

GCompound.prototype =
   jslib.inheritPrototype(GObject, "GCompound extends GObject");
GCompound.prototype.constructor = GCompound;
GCompound.prototype.$class = new Class("GCompound", GCompound);

GCompound.prototype.add = function(gobj, x, y) {
   this.elements.push(gobj);
   if (x !== undefined) {
      if (y === undefined) {
         y = x.y;
         x = x.x;
      }
      gobj.setLocation(x, y);
   }
   gobj.parent = this.parent;
   this.repaint();
};

GCompound.prototype.remove = function(gobj) {
   var k = this.elements.indexOf(gobj);
   if (k >= 0) this.elements.splice(k, 1);
   gobj.parent = null;
   this.repaint();
};

GCompound.prototype.removeAll = function() {
   for (var i = 0; i < this.elements.length; i++) {
      this.elements[i].parent = null;
   }
   this.elements = [];
   this.repaint();
};

GCompound.prototype.getElementCount = function() {
   return this.elements.length;
};

GCompound.prototype.getElement = function(index) {
   return this.elements[index];
};

GCompound.prototype.getElementAt = function(x, y) {
   if (y === undefined) {
      y = x.y;
      x = x.x;
   }
   var n = this.elements.length;
   for (var i = n - 1; i >= 0; i--) {
      if (this.elements[i].contains(x, y)) return this.elements[i];
   }
   return null;
};

GCompound.prototype.localBounds = function(ctm) {
   var bb = new GRectangle();
   if (this.elements) {
      var n = this.elements.length;
      for (var i = 0; i < n; i++) {
         var obj = this.elements[i];
         var t = new GTransform(ctm);
         t.translate(obj.x, obj.y);
         t.concatenate(obj.ctm);
         var r = obj.localBounds(t);
         if (i === 0) {
            bb = r;
         } else {
            bb.add(r);
         }
      }
   }
   return bb;
};

GCompound.prototype.localContains = function(x, y) {
   var n = this.elements.length;
   for (var i = 0; i < n; i++) {
      if (this.elements[i].contains(x, y)) return true;
   }
   return false;
};

GCompound.prototype.sendObjectToFront = function(gobj) {
   var k = this.elements.indexOf(gobj);
   if (k >= 0) {
      this.elements.splice(k, 1);
      this.elements.push(gobj);
   }
};

GCompound.prototype.sendObjectToBack = function(gobj) {
   var k = this.elements.indexOf(gobj);
   if (k >= 0) {
      this.elements.splice(k, 1);
      this.elements.unshift(gobj);
   }
};

GCompound.prototype.sendObjectForward = function(gobj) {
   var k = this.elements.indexOf(gobj);
   if (k >= 0 && k < this.elements.length - 1) {
      this.elements.splice(k, 1);
      this.elements.splice(k + 1, 0, gobj);
   }
};

GCompound.prototype.sendObjectBackward = function(gobj) {
   var k = this.elements.indexOf(gobj);
   if (k >= 1) {
      this.elements.splice(k, 1);
      this.elements.splice(k - 1, 0, gobj);
   }
};

GCompound.prototype.paintTransformed = function(ctx) {
   var n = this.elements.length;
   for (var i = 0; i < n; i++) {
      this.elements[i].paintContext(ctx);
   }
};

GCompound.prototype.toString = function() {
  var str = "";
  for (var i = 0; i < this.elements.length; i++) {
     if (i > 0) str += ", ";
     str += this.elements[i];
  }
  return "GCompound(" + str + ")";
};

/* GPolygon */

var GPolygon = function(x, y) {
   GObject.call(this);
   this.vertices = [];
   this.cx = 0;
   this.cy = 0;
   if (x !== undefined) {
      if (y === undefined) {
         y = x.y;
         x = x.x;
      }
      this.setLocation(x, y);
   }
};

GPolygon.prototype =
   jslib.inheritPrototype(GObject, "GPolygon extends GObject");
GPolygon.prototype.constructor = GPolygon;
GPolygon.prototype.$class = new Class("GPolygon", GPolygon);

GPolygon.prototype.addVertex = function(x, y) {
   if (y === undefined) {
      y = x.y;
      x = x.x;
   }
   this.cx = x;
   this.cy = y;
   this.vertices.push(new GPoint(x, y));
};

GPolygon.prototype.addEdge = function(dx, dy) {
   this.addVertex(this.cx + dx, this.cy + dy);
};

GPolygon.prototype.addPolarEdge = function(r, theta) {
   this.addEdge(r * GMath.cosDegrees(theta), -r * GMath.sinDegrees(theta));
};

GPolygon.prototype.getCurrentPoint = function() {
   return new GPoint(this.cx, this.cy);
};

GPolygon.prototype.localBounds = function(ctm) {
   var nPoints = this.vertices.length;
   if (nPoints === 0) return new GRectangle();
   var bb = new GRectangle(ctm.transform(this.vertices[0]));
   for (var i = 1; i < nPoints; i++) {
      bb.add(ctm.transform(this.vertices[i]));
   }
   return bb;
};

GPolygon.prototype.localContains = function(x, y) {
   var nPoints = this.vertices.length;
   var isContained = false;
   for (var i = 0; i < nPoints; i++) {
      var v1 = this.vertices[i];
      var v2 = this.vertices[(i + 1) % nPoints];
      if (((v1.y < y) && (v2.y >= y)) || ((v2.y < y) && (v1.y >= y))) {
         var t = (y - v1.y) / (v2.y - v1.y);
         var xp = v1.x + t * (v2.x - v1.x);
         if (xp < x) isContained = !isContained;
      }
   }
   return isContained;
};

GPolygon.prototype.paintTransformed = function(ctx) {
   ctx.beginPath();
   for (var i = 0; i < this.vertices.length; i++) {
      var pt = this.vertices[i];
      if (i === 0) {
         ctx.moveTo(pt.x, pt.y);
      } else {
         ctx.lineTo(pt.x, pt.y);
      }
   }
   ctx.closePath();
   if (this.fillFlag) {
      var fillColor = this.fillColor || this.color;
      ctx.fillStyle = GObject.getColorTag(fillColor);
      ctx.mozFillRule = 'evenodd';
      ctx.fill(ctx.mozFillRule);
   }
   ctx.strokeStyle = GObject.getColorTag(this.color);
   ctx.stroke();
};

GPolygon.prototype.toString = function() {
  return "GPolygon(" + this.vertices.length + ")";
};

/* GLabel */

var GLabel = function(str, x, y) {
   GObject.call(this);
   if (x !== undefined) {
      if (y === undefined) {
         y = x.y;
         x = x.x;
      }
      gobj.setLocation(x, y);
   }
   this.label = str;
   this.setFont(GLabel.DEFAULT_FONT);
};

GLabel.prototype =
   jslib.inheritPrototype(GObject, "GLabel extends GObject");
GLabel.prototype.constructor = GLabel;
GLabel.prototype.$class = new Class("GLabel", GLabel);

GLabel.prototype.setFont = function(font) {
   this.font = (typeof(font) === "string") ? Font.decode(font) : font;
   this.repaint();
};

GLabel.prototype.getFont = function() {
   return this.font;
};

GLabel.prototype.setLabel = function(str) {
   this.label = str;
   this.repaint();
};

GLabel.prototype.getLabel = function() {
   return this.label;
};

GLabel.prototype.getAscent = function() {
   return this.font.getFontMetrics().getAscent();
};

GLabel.prototype.getDescent = function() {
   return this.font.getFontMetrics().getDescent();
};


GLabel.prototype.paintTransformed = function(ctx) {
   ctx.font = this.font.getFontTag();
   ctx.fillStyle = GObject.getColorTag(this.color);
   ctx.fillText(this.label, 0, 0);
};

GLabel.prototype.localBounds = function(ctm) {
   var fm = this.font.getFontMetrics();
   var y0 = -fm.getAscent();
   var width = fm.stringWidth(this.label);
   var height = fm.getHeight();
   var bb = new GRectangle(ctm.transform(0, y0));
   bb.add(ctm.transform(width, y0));
   bb.add(ctm.transform(0, y0 + height));
   bb.add(ctm.transform(width, y0 + height));
   return bb;
};

GLabel.prototype.localContains = function(x, y) {
   var fm = this.font.getFontMetrics();
   var y0 = -fm.getAscent();
   var width = fm.stringWidth(this.label);
   var height = fm.getHeight();
   return x >= 0 && x < width && y >= y0 && y < y0 + height;
};

GLabel.prototype.toString = function() {
  return "GLabel(" + this.label + ", " + this.x + ", " + this.y + ")";
};

GLabel.DEFAULT_FONT = new Font("Default", Font.PLAIN, 12);

/* GRect */

var GRect = function(x, y, width, height) {
   GObject.call(this);
   this.setBounds(x, y, width, height);
};

GRect.prototype =
   jslib.inheritPrototype(GObject, "GRect extends GObject");
GRect.prototype.constructor = GRect;
GRect.prototype.$class = new Class("GRect", GRect);

GRect.prototype.setSize = function(a1, a2) {
   if (this.transformed) {
      throw new RuntimeException("setSize called on transformed object");
   }
   if (a2 === undefined) {
      this.width = a1.width;
      this.height = a1.height;
   } else {
      this.width = a1;
      this.height = a2;
   }
};

GRect.prototype.setBounds = function(a1, a2, a3, a4) {
   if (this.transformed) {
      throw new RuntimeException("setBounds called on transformed object");
   }
   if (a3 === undefined) {
      this.x = 0;
      this.y = 0;
      this.width = a1;
      this.height = a2;
   } else {
      this.x = a1;
      this.y = a2;
      this.width = a3;
      this.height = a4;
   }
};

GRect.prototype.paintTransformed = function(ctx) {
   if (this.fillFlag) {
      var fillColor = this.fillColor || this.color;
      ctx.fillStyle = GObject.getColorTag(fillColor);
      ctx.fillRect(0, 0, this.width, this.height);
   }
   ctx.strokeStyle = GObject.getColorTag(this.color);
   ctx.strokeRect(0, 0, this.width, this.height);
};

GRect.prototype.localBounds = function(ctm) {
   var bb = new GRectangle(ctm.transform(0, 0));
   bb.add(ctm.transform(this.width, 0));
   bb.add(ctm.transform(0, this.height));
   bb.add(ctm.transform(this.width, this.height));
   return bb;
};

GRect.prototype.localContains = function(x, y) {
   return (x > 0) && (x <= this.width) && (y > 0) && (y <= this.height);
};

GRect.prototype.toString = function() {
  return "GRect(" + this.x + ", " + this.y + ", " + this.width +
         ", " + this.height + ")";
};

/* GOval */

var GOval = function(x, y, width, height) {
   GObject.call(this);
   this.setBounds(x, y, width, height);
};

GOval.prototype =
   jslib.inheritPrototype(GObject, "GOval extends GObject");
GOval.prototype.constructor = GOval;
GOval.prototype.$class = new Class("GOval", GOval);

GOval.prototype.setSize = function(a1, a2) {
   if (this.transformed) {
      throw new RuntimeException("setSize called on transformed object");
   }
   if (a2 === undefined) {
      this.width = a1.width;
      this.height = a1.height;
   } else {
      this.width = a1;
      this.height = a2;
   }
};

GOval.prototype.setBounds = function(a1, a2, a3, a4) {
   if (this.transformed) {
      throw new RuntimeException("setBounds called on transformed object");
   }
   if (a3 === undefined) {
      this.x = 0;
      this.y = 0;
      this.width = a1;
      this.height = a2;
   } else {
      this.x = a1;
      this.y = a2;
      this.width = a3;
      this.height = a4;
   }
};

GOval.prototype.paintTransformed = function(ctx) {
   ctx.translate(this.width / 2, this.height / 2);
   ctx.scale(1, this.height / this.width);
   ctx.beginPath();
   ctx.arc(0, 0, this.width / 2, 0, 2 * Math.PI, true);
   ctx.closePath();
   ctx.scale(1, this.width / this.height);
   if (this.fillFlag) {
      var fillColor = this.fillColor || this.color;
      ctx.fillStyle = GObject.getColorTag(fillColor);
      ctx.fill();
   }
   ctx.strokeStyle = GObject.getColorTag(this.color);
   ctx.stroke();
};

GOval.prototype.localBounds = function(ctm) {
   var rx = this.width / 2;
   var ry = this.height / 2;
   var a = ctm.getScaleX();
   var b = ctm.getShearY();
   var c = ctm.getShearX();
   var d = ctm.getScaleY();
   var tx = Math.atan2(c * this.height, a * this.width);
   var ty = Math.atan2(d * this.height, b * this.width);
   var bb = new GRectangle(ctm.transform(rx, ry));
   for (var i = 0; i < 4; i++) {
      var t1 = tx + i * Math.PI / 2;
      var t2 = ty + i * Math.PI / 2;
      bb.add(ctm.transform(rx + rx * Math.cos(t1), ry - ry * Math.sin(t1)));
      bb.add(ctm.transform(rx + rx * Math.cos(t2), ry - ry * Math.sin(t2)));
   }
   return bb;
};

GOval.prototype.localContains = function(x, y) {
   var rx = this.width / 2;
   var ry = this.height / 2;
   var tx = x - rx;
   var ty = y - ry;
   return (tx * tx) / (rx * rx) + (ty * ty) / (ry * ry) <= 1.0;
};

GOval.prototype.toString = function() {
  return "GOval(" + this.x + ", " + this.y + ", " + this.width +
         ", " + this.height + ")";
};

/* GRoundRect */

var GRoundRect = function(a1, a2, a3, a4, a5) {
   if (a2 === undefined) {
      GRect.call(this, 0, 0, a1.width, a1.height);
      this.arc = GRoundRect.DEFAULT_ARC;
   } else if (a3 === undefined) {
      if (typeof(a1) === "object") {
         if (typeof(a2) === "object") {
            GRect.call(this, a1.x, a1.y, a2.width, a2.height);
            this.arc = GRoundRect.DEFAULT_ARC;
         } else {
            GRect.call(this, 0, 0, a1.width, a1.height);
            this.arc = a2;
         }
      } else {
         GRect.call(this, 0, 0, a1, a2);
         this.arc = GRoundRect.DEFAULT_ARC;
      }
   } else if (a4 === undefined) {
      if (typeof(a1) === "object") {
         if (typeof(a2) === "object") {
            GRect.call(this, a1.x, a1.y, a2.width, a2.height);
            this.arc = a3;
         } else {
            GRect.call(this, a1.x, a1.y, a2, a3);
            this.arc = GRoundRect.DEFAULT_ARC;
         }
      } else {
         if (typeof(a3) === "object") {
            GRect.call(this, a1, a2, a3.width, a3.height);
            this.arc = GRoundRect.DEFAULT_ARC;
         } else {
            GRect.call(this, 0, 0, a1, a2);
            this.arc = a3;
         }
      }
   } else {
      GRect.call(this, a1, a2, a3, a4);
      this.arc = (a5 === undefined) ? GRoundRect.DEFAULT_ARC : a5;
   }
};

GRoundRect.prototype =
   jslib.inheritPrototype(GRect, "GRoundRect extends GRect");
GRoundRect.prototype.constructor = GRoundRect;
GRoundRect.prototype.$class = new Class("GRoundRect", GRoundRect);

GRoundRect.prototype.getWidth = function() {
   return this.image.getWidth();
};

GRoundRect.prototype.getHeight = function() {
   return this.image.getHeight();
};

GRoundRect.prototype.paintTransformed = function(ctx) {
   var r = this.arc / 2;
   ctx.beginPath();
   ctx.moveTo(r, 0);
   ctx.arc(this.width - r, r, r, 1.5 * Math.PI, 0);
   ctx.arc(this.width - r, this.height - r, r, 0, 0.5 * Math.PI);
   ctx.arc(r, this.height - r, r, 0.5 * Math.PI, Math.PI);
   ctx.arc(r, r, r, Math.PI, 1.5 * Math.PI);
   ctx.closePath();
   if (this.fillFlag) {
      var fillColor = this.fillColor || this.color;
      ctx.fillStyle = GObject.getColorTag(fillColor);
      ctx.fill();
   }
   ctx.strokeStyle = GObject.getColorTag(this.color);
   ctx.stroke();
}

GRoundRect.prototype.toString = function() {
  return "GRoundRect(" + this.x + ", " + this.y + ", " + this.width +
         ", " + this.height + ")";
};

GRoundRect.DEFAULT_ARC = 10;

/* GImage */

var GImage = function(name, x, y) {
   GObject.call(this);
   this.sizeDetermined = false;
   this.image = (typeof(name) === "string") ? new JSImage(name) : name;
   if (x !== undefined) {
      if (y === undefined) {
         this.x = x.x;
         this.y = x.y;
      } else {
         this.x = x;
         this.y = y;
      }
   }
};

GImage.prototype =
   jslib.inheritPrototype(GObject, "GImage extends GObject");
GImage.prototype.constructor = GImage;
GImage.prototype.$class = new Class("GImage", GImage);

GOval.prototype.setSize = function(a1, a2) {
   if (this.transformed) {
      throw new RuntimeException("setSize called on transformed object");
   }
   if (a2 === undefined) {
      this.width = a1.width;
      this.height = a1.height;
   } else {
      this.width = a1;
      this.height = a2;
   }
};

GOval.prototype.setBounds = function(a1, a2, a3, a4) {
   if (this.transformed) {
      throw new RuntimeException("setBounds called on transformed object");
   }
   if (a3 === undefined) {
      this.x = 0;
      this.y = 0;
      this.width = a1;
      this.height = a2;
   } else {
      this.x = a1;
      this.y = a2;
      this.width = a3;
      this.height = a4;
   }
};

GImage.prototype.paintTransformed = function(ctx) {
   var img = this.image.getImage();
   if (img.complete) {
      ctx.drawImage(img, 0, 0);
   } else if (this.parent) {
      var observer = this.getCanvas();
      var callback = function() {
         if (observer && observer.repaint) observer.repaint();
         img.onload = null;
      }
      img.onload = callback;
   }
};

GImage.getAlpha = function(pixel) {
   return (pixel >> 24) & 0xFF;
};

GImage.getRed = function(pixel) {
   return (pixel >> 16) & 0xFF;
};

GImage.getGreen = function(pixel) {
   return (pixel >> 8) & 0xFF;
};

GImage.getBlue = function(pixel) {
   return pixel & 0xFF;
};

GImage.createRGBPixel = function(red, green, blue) {
   return GImage.createRGBPixel(red, green, blue, 0xFF);
};

GImage.createRGBPixel = function(red, green, blue, alpha) {
   return (alpha << 24) | (red << 16) | (green << 8) | blue;
};

GImage.prototype.localBounds = function(ctm) {
   this.determineSize();
   var bb = new GRectangle(ctm.transform(0, 0));
   bb.add(ctm.transform(this.width, 0));
   bb.add(ctm.transform(0, this.height));
   bb.add(ctm.transform(this.width, this.height));
   return bb;
};

GImage.prototype.localContains = function(x, y) {
   this.determineSize();
   return x >= 0 && x < this.width && y >= 0 && y < this.height;
};

GImage.prototype.determineSize = function() {
   if (!this.sizeDetermined) {
      this.width = this.image.width;
      this.height = this.image.height;
      this.sizeDetermined = true;
   }
};

GImage.prototype.toString = function() {
  return "GRect(" + this.x + ", " + this.y + ", " + this.width +
         ", " + this.height + ")";
};

/* GLine */

var GLine = function(x0, y0, x1, y1) {
   GObject.call(this);
   this.x = x0;
   this.y = y0;
   this.dx = x1 - x0;
   this.dy = y1 - y0;
};

GLine.prototype =
   jslib.inheritPrototype(GObject, "GLine extends GObject");
GLine.prototype.constructor = GLine;
GLine.prototype.$class = new Class("GLine", GLine);

GLine.prototype.paintTransformed = function(ctx) {
   ctx.save();
   ctx.beginPath();
   ctx.moveTo(0, 0);
   ctx.lineTo(this.dx, this.dy);
   ctx.strokeStyle = GObject.getColorTag(this.color);
   ctx.stroke();
   ctx.restore();
};

GLine.prototype.setStartPoint = function(x, y) {
   if (y === undefined) {
      y = x.y;
      x = x.x;
   }
   var pt = this.ctm.transform(this.dx, this.dy);
   pt.setLocation(pt.x - x, pt.y - y);
   pt = this.ctm.inverseTransform(pt);
   this.dx = pt.x;
   this.dy = pt.y;
   this.setLocation(x, y);
};

GLine.prototype.getStartPoint = function() {
   return this.getLocation();
};

GLine.prototype.setEndPoint = function(x, y) {
   if (y === undefined) {
      y = x.y;
      x = x.x;
   }
   var pt = this.ctm.inverseTransform(x - this.x, y - this.y);
   this.dx = pt.x;
   this.dy = pt.y;
   this.repaint();
};

GLine.prototype.getEndPoint = function() {
   var pt = this.ctm.transform(this.dx, this.dy);
   return new GPoint(this.x + pt.x, this.y + pt.y);
};

GLine.prototype.localBounds = function(ctm) {
   var bb = new GRectangle(ctm.transform(0, 0));
   bb.add(ctm.transform(this.dx, this.dy));
   return bb;
};

GLine.prototype.localContains = function(x, y) {
   var tSquared = GLine.LINE_TOLERANCE * GLine.LINE_TOLERANCE;
   if (this.distanceSquared(x, y, 0, 0) < tSquared) return true;
   if (this.distanceSquared(x, y, this.dx, this.dy) < tSquared) return true;
   if (x < Math.min(0, this.dx) - GLine.LINE_TOLERANCE) return false;
   if (x > Math.max(0, this.dx) + GLine.LINE_TOLERANCE) return false;
   if (y < Math.min(0, this.dy) - GLine.LINE_TOLERANCE) return false;
   if (y > Math.max(0, this.dy) + GLine.LINE_TOLERANCE) return false;
   if (this.dx === 0 && this.dy === 0) return false;
   var u = (x * this.dx + y * this.dy) /
           this.distanceSquared(0, 0, this.dx, this.dy);
   return this.distanceSquared(x, y, u * this.dx, u * this.dy) <= tSquared;
};

GLine.prototype.distanceSquared = function(x0, y0, x1, y1) {
   return (x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0);
};

GLine.prototype.toString = function() {
  return "GLine(" + this.x + ", " + this.y + ", " + (this.x + this.dx) +
         ", " + (this.y + this.dy) + ")";
};

GLine.LINE_TOLERANCE = 1.5;

/* GPoint */

var GPoint = function(x, y) {
   this.setLocation(x, y);
};
GPoint.prototype.$class = new Class("GPoint", GPoint);

GPoint.prototype.getX = function() {
   return this.x;
};

GPoint.prototype.getY = function() {
   return this.y;
};

GPoint.prototype.setLocation = function(x, y) {
   if (y === undefined) {
      this.x = x.x;
      this.y = x.y;
   } else {
      this.x = x;
      this.y = y;
   }
};

GPoint.prototype.getLocation = function() {
   return new GPoint(this.xc, this.yc);
};

GPoint.prototype.translate = function(dx, dy) {
   this.x += dx;
   this.y += dy;
};

GPoint.prototype.toString = function() {
   return "GPoint(" + this.x + ", " + this.y + ")";
};

/* GDimension */

var GDimension = function(width, height) {
   this.setSize(width, height);
};
GDimension.prototype.$class = new Class("GDimension", GDimension);

GDimension.prototype.getWidth = function() {
   return this.width;
};

GDimension.prototype.getHeight = function() {
   return this.height;
};

GDimension.prototype.getSize = function() {
   return new GDimension(this.width, this.height);
};

GDimension.prototype.setSize = function(width, height) {
   if (height === undefined) {
      this.width = width.width;
      this.height = width.height;
   } else {
      this.width = width;
      this.height = height;
   }
};

GDimension.prototype.setLocation = function(p) {
   this.setLocation(p.width, p.height);
};

GDimension.prototype.translate = function(dx, dy) {
   this.width += dx;
   this.height += dy;
};

GDimension.prototype.toString = function() {
   return "GDimension(" + this.width + ", " + this.height + ")";
};

/* GRectangle */

var GRectangle = function(a1, a2, a3, a4) {
   if (a1 === undefined) {
      this.setBounds(0, 0, 0, 0);
   } else if (a2 === undefined) {
      if (a1.width === undefined) {
         this.setBounds(a1.x, a1.y, 0, 0);
      } else {
         this.setBounds(a1.x, a1.y, a1.width, a1.height);
      }
   } else {
      this.setBounds(a1, a2, a3, a4);
   }
};
GRectangle.prototype.$class = new Class("GRectangle", GRectangle);

GRectangle.prototype.getX = function() {
   return this.x;
};

GRectangle.prototype.getY = function() {
   return this.y;
};

GRectangle.prototype.getWidth = function() {
   return this.width;
};

GRectangle.prototype.getHeight = function() {
   return this.height;
};

GRectangle.prototype.getSize = function() {
   return new GDimension(this.width, this.height);
};

GRectangle.prototype.setLocation = function(x, y) {
   if (y === undefined) {
      this.x = x.x;
      this.y = x.y;
   } else {
      this.x = x;
      this.y = y;
   }
};

GRectangle.prototype.getLocation = function() {
   return new GPoint(this.x, this.y);
};

GRectangle.prototype.getSize = function() {
   return new GDimension(this.width, this.height);
};

GRectangle.prototype.setSize = function(width, height) {
   if (height === undefined) {
      this.width = width.width;
      this.height = width.height;
   } else {
      this.width = width;
      this.height = height;
   }
};

GRectangle.prototype.setBounds = function(a1, a2, a3, a4) {
   if (a2 === undefined) {
      this.x = a1.x;
      this.y = a1.y;
      this.width = a1.width;
      this.height = a1.height;
   } else if (a3 === undefined) {
      this.x = a1.x;
      this.y = a1.y;
      this.width = a2.width;
      this.height = a2.height;
   } else if (a4 === undefined) {
      if (typeof(a1) === "object") {
         this.x = a1.x;
         this.y = a1.y;
         this.width = a2;
         this.height = a3;
      } else {
         this.x = a1;
         this.y = a2;
         this.width = a3.width;
         this.height = a3.height;
      }
   } else {
      this.x = a1;
      this.y = a2;
      this.width = a3;
      this.height = a4;
   }
};

GRectangle.prototype.contains = function(x, y) {
   return this.x <= x && x < this.x + this.width &&
          this.y <= y && y < this.y + this.height;
};

// Add rectangle

GRectangle.prototype.add = function(a1, a2) {
   if (a2 === undefined) {
      this.add(a1.x, a1.y);
      if (a1.width !== undefined) {
         this.add(a1.x + a1.width, a1.y + a1.height);
      }
   } else {
      if (a1 < this.x) {
         this.width += this.x - a1;
         this.x = a1;
      } else if (a1 > this.x + this.width) {
         this.width = a1 - this.x;
      }
      if (a2 < this.y) {
         this.height += this.y - a2;
         this.y = a2;
      } else if (a2 > this.y + this.height) {
         this.height = a2 - this.y;
      }
   }
};

GRectangle.prototype.translate = function(dx, dy) {
   this.x += dx;
   this.y += dy;
};

GRectangle.prototype.toString = function() {
   return "GRectangle(" + this.x + ", " + this.y + ", " +
                          this.width + ", " + this.height + ")";
};

/* GMath */

var GMath = function() {
   /* Empty */
};
GMath.prototype.$class = new Class("GMath", GMath);

GMath.round = function(x) {
   return toInt(Math.round(x));
};

GMath.sinDegrees = function(angle) {
   return Math.sin(GMath.toRadians(angle));
};

GMath.cosDegrees = function(angle) {
   return Math.cos(GMath.toRadians(angle));
};

GMath.tanDegrees = function(angle) {
   return GMath.sinDegrees(angle) / GMath.cosDegrees(angle);
};

GMath.toDegrees = function(radians) {
   return radians * 180 / Math.PI;
};

GMath.toRadians = function(degrees) {
   return degrees * Math.PI / 180;
};

GMath.distance = function(x0, y0, x1, y1) {
   if (x1 === undefined) {
      return Math.sqrt(x0 * x0 + y0 * y0);
   } else {
      return GMath.distance(x1 - x0, y1 - y0);
   }
};

GMath.angle = function(x0, y0, x1, y1) {
   var x = x0;
   var y = y0;
   if (x1 !== undefined) {
      x = x1 - x0;
      y = y1 - y0;
   }
   if (x === 0 && y === 0) return 0;
   return GMath.toDegrees(Math.atan2(-y, x));
};

/* GTransform.js */

var GTransform = function(a1, a2, a3, a4, a5, a6) {
   if (a1 === undefined) {
      this.setTransform(1, 0, 0, 1, 0, 0);
   } else if (a2 === undefined) {
      this.setTransform(a1.a, a1.b, a1.c, a1.d, a1.tx, a1.ty);
   } else if (a5 === undefined) {
      this.setTransform(a1, a2, a3, a4, 0, 0);
   } else {
      this.setTransform(a1, a2, a3, a4, a5, a6);
   }
};

GTransform.prototype.concatenate = function(t) {
   this.setTransform(this.a * t.a + this.c * t.b,
                     this.b * t.a + this.d * t.b,
                     this.a * t.c + this.c * t.d,
                     this.b * t.c + this.d * t.d,
                     this.a * t.tx + this.c * t.ty + this.tx,
                     this.b * t.tx + this.d * t.ty + this.ty);
};

GTransform.prototype.createInverse = function() {
   var det = this.getDeterminant();
   if (det === 0) throw new RuntimeException("Noninvertible transform");
   return new GTransform(this.d / det,
                         -this.b / det,
                         -this.c / det,
                         this.a / det,
                         (this.c * this.ty - this.tx * this.d) / det,
                         (this.b * this.tx - this.a * this.ty) / det);
};

GTransform.prototype.getDeterminant = function() {
   return this.a * this.d - this.b * this.c;
};

GTransform.prototype.getScaleX = function() {
   return this.a;
};

GTransform.prototype.getScaleY = function() {
   return this.d;
};

GTransform.prototype.getShearX = function() {
   return this.c;
};

GTransform.prototype.getShearY = function() {
   return this.b;
};

GTransform.prototype.getTranslateX = function() {
   return this.tx;
};

GTransform.prototype.getTranslateY = function() {
   return this.ty;
};

GTransform.prototype.inverseTransform = function(a1, a2) {
   if (a2 === undefined) {
      return this.createInverse().transform(a1);
   } else {
      return this.createInverse().transform(a1, a2);
   }
};

GTransform.prototype.rotate = function(theta) {
   var cosTheta = GMath.cosDegrees(-theta);
   var sinTheta = GMath.sinDegrees(-theta);
   if (Math.abs(cosTheta) < GTransform.ZERO_RADIUS) cosTheta = 0;
   if (Math.abs(sinTheta) < GTransform.ZERO_RADIUS) sinTheta = 0;
   this.setTransform(this.a * cosTheta + this.c * sinTheta,
                     this.b * cosTheta + this.d * sinTheta,
                     this.c * cosTheta - this.a * sinTheta,
                     this.d * cosTheta - this.b * sinTheta,
                     this.tx, this.ty);
};

GTransform.prototype.scale = function(sx, sy) {
   this.a *= sx;
   this.b *= sx;
   this.c *= sy;
   this.d *= sy;
};

GTransform.prototype.setTransform = function(a, b, c, d, tx, ty) {
   this.a = a;
   this.b = b;
   this.c = c;
   this.d = d;
   this.tx = tx;
   this.ty = ty;
};

GTransform.prototype.shear = function(sx, sy) {
   this.setTransform(this.a + (sy * this.c),
                     this.b + (sx * this.a),
                     this.c + (sy * this.d),
                     this.d + (sx * this.b),
                     this.tx, this.ty);
};

GTransform.prototype.transform = function(a1, a2) {
   if (a2 === undefined) {
      return this.transform(a1.getX(), a1.getY());
   } else {
      return new GPoint(this.a * a1 + this.c * a2 + this.tx,
                        this.b * a1 + this.d * a2 + this.ty);
   }
};

GTransform.prototype.translate = function(tx, ty) {
   this.tx += tx * this.a + ty * this.c;
   this.ty += tx * this.b + ty * this.d;
};

GTransform.prototype.toString = function() {
   return "[" + this.a + ", " + this.b + ", " + this.c + ", " + this.d + ", " +
   this.tx + ", " + this.ty + "]";
};

GTransform.ZERO_RADIUS = 1.0E-10;

/* Exports */

return {
   GArc : GArc,
   GCanvas : GCanvas,
   GCompound : GCompound,
   GDimension : GDimension,
   GImage : GImage,
   GLabel : GLabel,
   GLine : GLine,
   GMath : GMath,
   GObject : GObject,
   GOval : GOval,
   GPoint : GPoint,
   GPolygon : GPolygon,
   GRect : GRect,
   GRectangle : GRectangle,
   GRoundRect : GRoundRect,
   GTransform : GTransform
};

});
