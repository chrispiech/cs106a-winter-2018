/*
 * File: graphics.js
 * -----------------
 * This file is a stub for a full implementation of the ACM Graphics
 * Library.
 */

/* Standard header for requirejs */

define([ "jslib",
         "edu/stanford/cs/java2js",
         "acm/util",
         "java/awt",
         "java/util" ],

function(jslib,
         edu_stanford_cs_java2js,
         acm_util,
         java_awt,
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
var ErrorException = acm_util.ErrorException;
var Color = java_awt.Color;
var Font = java_awt.Font;
var Graphics = java_awt.Graphics;
var Image = java_awt.Image;
var ArrayList = java_util.ArrayList;

/* GCanvas */

var GCanvas = function(id) {
   JSCanvas.prototype.constructor.call(this, id);
   this.elements = [];
};

GCanvas.prototype.add = function(gobj, x, y) {
   this.elements.push(gobj);
   if (x !== undefined) gobj.setLocation(x, y);
   gobj.parent = this;
};

GCanvas.prototype.paintComponent = function(g) {
   var n = this.elements.length;
   for (var i = 0; i < n; i++) {
      this.elements[i].paint(g);
   }
};

GCanvas.prototype.getElementAt = function(x, y) {
   var n = this.elements.length;
   for (var i = n - 1; i >= 0; i--) {
      if (this.elements[i].contains(x, y)) return this.elements[i];
   }
   return null;
};

/* GObject */

var GObject = function() {
   this.x = 0;
   this.y = 0;
   this.width = 0;
   this.height = 0;
   this.isFilled = false;
   this.color = "black";
   this.parent = null;
   this.rotation = 0;
   this.sf = 1;
   this.visible = true;
};

GObject.prototype.getCanvas = function() {
   var comp = this;
   while (comp.parent) {
      comp = comp.parent;
   }
   return comp;
}

GObject.prototype.paint = function(g) {
   this.paintContext(g.ctx);
};

GObject.prototype.paintContext = function(ctx) {
   if (this.visible) {
      ctx.save();
      ctx.translate(this.x, this.y);
      if (this.rotation !== 0) ctx.rotate(-GMath.toRadians(this.rotation));
      if (this.sf != 1.0) ctx.scale(this.sf, this.sf);
      this.paintTransformed(ctx);
      ctx.restore();
   }
};

GObject.prototype.getX = function() {
   return this.x;
};

GObject.prototype.getY = function() {
   return this.y;
};

GObject.prototype.getLocation = function() {
   return new GPoint(this.x, this.y);
};

GObject.prototype.setLocation = function(x, y) {
   this.x = x;
   this.y = y;
};

GObject.prototype.setVisible = function(flag) {
   this.visible = flag;
};

GObject.prototype.move = function(dx, dy) {
   this.x += dx;
   this.y += dy;
};

GObject.prototype.setColor = function(color) {
   this.color = color;
};

GObject.prototype.setFilled = function(isFilled) {
   this.isFilled = isFilled;
};

GObject.prototype.scale = function(sf) {
   this.sf *= sf;  // Make affine later on
}

GObject.prototype.rotate = function(theta) {
   this.rotation += theta;  // Make affine later on
}

GObject.prototype.repaint = function() {
   if (this.parent) this.parent.repaint();
};

/* GCompound */

var GCompound = function() {
   GObject.prototype.constructor.call(this);
   this.elements = [];
};

GCompound.prototype =
   jslib.inheritPrototype(GObject, "GCompound extends GObject");
GCompound.prototype.constructor = GCompound;

GCompound.prototype.add = function(gobj, x, y) {
   this.elements.push(gobj);
   if (x !== undefined) gobj.setLocation(x, y);
   gobj.parent = this.parent;
};

GCompound.prototype.contains = function(x, y) {
   x -= this.x; // Transformation needed here
   y -= this.y;
   var n = this.elements.length;
   for (var i = 0; i < n; i++) {
      if (this.elements[i].contains(x, y)) return true;
   }
   return false;
};

GCompound.prototype.paintTransformed = function(ctx) {
   var n = this.elements.length;
   for (var i = 0; i < n; i++) {
      this.elements[i].paintContext(ctx);
   }
};

/* GRect */

var GRect = function(a1, a2, a3, a4) {
   jslib.inherits(this, new GObject());
   if (a3) {
      this.x = a1;
      this.y = a2;
      this.width = a3;
      this.height = a4;
   } else {
      this.x = 0;
      this.y = 0;
      this.width = a1;
      this.height = a2;
   }
};

GRect.prototype.contains = function(x, y) {
   if (x < this.x || x > this.x + this.width) return false;
   if (y < this.y || y > this.y + this.height) return false;
   return true;
};

GRect.prototype.paintTransformed = function(ctx) {
   if (this.isFilled) {
      ctx.fillStyle = this.color.getColorTag();
      ctx.fillRect(0, 0, this.width, this.height);
   } else {
      ctx.strokeStyle = this.color.getColorTag();
      ctx.strokeRect(0, 0, this.width, this.height);
   }
};

/* GOval */

var GOval = function(a1, a2, a3, a4) {
   jslib.inherits(this, new GObject());
   if (a3) {
      this.x = a1;
      this.y = a2;
      this.width = a3;
      this.height = a4;
   } else {
      this.x = 0;
      this.y = 0;
      this.width = a1;
      this.height = a2;
   }
};

GOval.prototype.contains = function(x, y) {
   var rx = this.width / 2;
   var ry = this.height / 2;
   if (rx <= 0 || ry <= 0) return false;
   var dx = x - (this.x + rx);
   var dy = y - (this.y + ry);
   return (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry) <= 1.0;
};

GOval.prototype.paintTransformed = function(ctx) {
   ctx.translate(this.width / 2, this.height / 2);
   ctx.scale(1, this.height / this.width);
   ctx.beginPath();
   ctx.arc(0, 0, this.width / 2, 0, 2 * Math.PI, true);
   ctx.closePath();
   if (this.isFilled) {
      ctx.fillStyle = this.color.getColorTag();
      ctx.fill();
   } else {
      ctx.strokeStyle = this.color.getColorTag();
      ctx.stroke();
   }
};

/* GImage */

var GImage = function(name, x, y) {
   jslib.inherits(this, new GObject());
   this.image = new JSImage(name);
   this.x = x || 0;
   this.y = y || 0;
};

GImage.prototype.getWidth = function() {
   return this.image.getWidth();
};

GImage.prototype.getHeight = function() {
   return this.image.getHeight();
};

GImage.prototype.contains = function(x, y) {
   var width = this.image.getWidth();
   var height = this.image.getHeight();
   if (x < this.x || x > this.x + width) return false;
   if (y < this.y || y > this.y + height) return false;
   return true;
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

/* GLine */

var GLine = function(x0, y0, x1, y1) {
   jslib.inherits(this, new GObject());
   this.x = x0;
   this.y = y0;
   this.dx = x1 - x0;
   this.dy = y1 - y0;
};

GLine.prototype.paintTransformed = function(ctx) {
   ctx.beginPath();
   ctx.moveTo(0, 0);
   ctx.lineTo(this.dx, this.dy);
   ctx.strokeStyle = this.color.getColorTag();
   ctx.stroke();
   ctx.restore();
};

GLine.prototype.setStartPoint = function(x, y) {
   this.dx += this.getX() - x;
   this.dy += this.getY() - y;
   this.setLocation(x, y);
};

GLine.prototype.contains = function(x, y) {
   return false;
};

GLine.prototype.getStartPoint = function() {
   return new GPoint(this.getX(), this.getY());
};

GLine.prototype.setEndPoint = function(x, y) {
   this.dx = x - this.getX();
   this.dy = y - this.getY();
   this.repaint();
};

GLine.prototype.getEndPoint = function() {
   return new GPoint(this.getX() + this.dx, this.getY() + this.dy);
};

/* GPoint */

var GPoint = function(x, y) {
   this.xc = x || 0;
   this.yc = y || 0;
};

GPoint.prototype.getX = function() {
   return this.xc;
};

GPoint.prototype.getY = function() {
   return this.yc;
};

GPoint.prototype.setLocation = function(x, y) {
   this.xc = x;
   this.yc = y;
};

GPoint.prototype.setLocation = function(p) {
   this.setLocation(p.xc, p.yc);
};

GPoint.prototype.getLocation = function() {
   return new GPoint(this.xc, this.yc);
};

GPoint.prototype.translate = function(dx, dy) {
   this.xc += dx;
   this.yc += dy;
};

GPoint.prototype.toPoint = function() {
   return new Point(toInt(Math.round(this.xc)), toInt(Math.round(this.yc)));
};

/* GMath */

var GMath = function() {
   /* Empty */
};

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

GMath.distance = function(x, y) {
   return Math.sqrt(x * x + y * y);
};

GMath.distance = function(x0, y0, x1, y1) {
   return GMath.distance(x1 - x0, y1 - y0);
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

GCanvas.prototype = jslib.inherit-Prototype(JSCanvas);
GCanvas.prototype.constructor = GCanvas;

/* Exports */

return {
   GCanvas : GCanvas,
   GCompound : GCompound,
   GImage : GImage,
   GLine : GLine,
   GMath : GMath,
   GObject : GObject,
   GOval : GOval,
   GPoint : GPoint,
   GRect : GRect
};

});
