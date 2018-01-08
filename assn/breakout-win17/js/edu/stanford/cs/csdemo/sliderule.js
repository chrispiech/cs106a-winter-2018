/*
 * File: sliderule.js
 * Created on Sat Oct 17 18:51:59 PDT 2015 by java2js
 * --------------------------------------------------
 * This file was generated mechanically by the java2js utility.
 * Permanent edits must be made in the Java file.
 */

define([ "jslib",
         "edu/stanford/cs/java2js",
         "java/awt",
         "java/lang",
         "java/util",
         "javax/swing" ],

function(jslib,
         edu_stanford_cs_java2js,
         java_awt,
         java_lang,
         java_util,
         javax_swing) {

/* Imports */

var inheritPrototype = jslib.inheritPrototype;
var newArray = jslib.newArray;
var toInt = jslib.toInt;
var toStr = jslib.toStr;
var JSCanvas = edu_stanford_cs_java2js.JSCanvas;
var JSElementList = edu_stanford_cs_java2js.JSElementList;
var JSImage = edu_stanford_cs_java2js.JSImage;
var JSProgram = edu_stanford_cs_java2js.JSProgram;
var Color = java_awt.Color;
var Dimension = java_awt.Dimension;
var Graphics = java_awt.Graphics;
var MouseEvent = java_awt.MouseEvent;
var MouseListener = java_awt.MouseListener;
var MouseMotionListener = java_awt.MouseMotionListener;
var Class = java_lang.Class;
var RuntimeException = java_lang.RuntimeException;
var ArrayList = java_util.ArrayList;
var ChangeEvent = javax_swing.ChangeEvent;
var ChangeListener = javax_swing.ChangeListener;

/* SlideRule.js */

var SlideRule = function() {
   JSProgram.call(this);
   this.createProgramFrame();
   this.setTitle("Slide Rule");
   this.listeners = new ArrayList();
   this.canvas = new SRCanvas(this);
   this.sliderOffset = 0;
   this.cursorOffset = 0;
   this.add(this.canvas, "canvas");
   this.addChangeListener(this.canvas);
   this.setPreferredSize(new Dimension(SRC.APPLICATION_WIDTH, SRC.APPLICATION_HEIGHT));
   this.pack();
   this.setVisible(true);
};

SlideRule.prototype = 
   jslib.inheritPrototype(JSProgram, "SlideRule extends JSProgram");
SlideRule.prototype.constructor = SlideRule;
SlideRule.prototype.$class = 
   new Class("SlideRule", SlideRule);

SlideRule.prototype.run = function() {
   this.canvas.repaint();
};

SlideRule.prototype.getSliderOffset = function() {
   return this.sliderOffset;
};

SlideRule.prototype.setSliderOffset = function(offset) {
   this.sliderOffset = offset;
   this.fireChangeListeners();
};

SlideRule.prototype.getCursorOffset = function() {
   return this.cursorOffset;
};

SlideRule.prototype.setCursorOffset = function(offset) {
   this.cursorOffset = offset;
   this.fireChangeListeners();
};

SlideRule.prototype.getSliderValue = function() {
   return this.offsetToValue(this.getSliderOffset());
};

SlideRule.prototype.setSliderValue = function(value) {
   this.setSliderOffset(this.valueToOffset(value));
};

SlideRule.prototype.getCursorValue = function() {
   return this.offsetToValue(this.getCursorOffset());
};

SlideRule.prototype.setCursorValue = function(value) {
   this.setCursorOffset(this.valueToOffset(value));
};

SlideRule.prototype.valueToOffset = function(v) {
   if (v < 0.1 || v > 10.0) {
      throw new RuntimeException("Value is out of range");
   }
   if (v < 1.0) v = this.valueToOffset(10 * v) - SRC.SCALE_WIDTH;
   var log10 = Math.log(v) / Math.log(10.0);
   return (log10 - toInt(log10))  * SRC.SCALE_WIDTH;
};

SlideRule.prototype.offsetToValue = function(x) {
   if (x < 0) return this.offsetToValue(SRC.SCALE_WIDTH + x) / 10.0;
   return Math.pow(10, x / SRC.SCALE_WIDTH);
};

SlideRule.prototype.addChangeListener = function(listener) {
   this.listeners.add(listener);
};

SlideRule.prototype.fireChangeListeners = function() {
   var el0 = new JSElementList(this.listeners);
   for (var ei0 = 0; ei0 < el0.size(); ei0++) {
      var listener = el0.get(ei0);
      listener.stateChanged(new ChangeEvent(this));
   }
};

SlideRule.main = function(args) {
   new SlideRule().start();
};


/* SRC.js */

var SRC = function() {
   /* Empty */
};

SRC.APPLICATION_BACKGROUND = new Color(0xCCFFFF);
SRC.APPLICATION_HEIGHT = 300;
SRC.APPLICATION_WIDTH = 1100;
SRC.BOTTOM_HEIGHT = 29;
SRC.BRACKET_HEIGHT = 124;
SRC.BRACKET_WIDTH = 19;
SRC.CURSOR_HEIGHT = 146;
SRC.CURSOR_OFFSET = -11;
SRC.CURSOR_WIDTH = 69;
SRC.END_HEIGHT = 14;
SRC.END_WIDTH = 69;
SRC.LEFT_OFFSET = 54;
SRC.SCALE_WIDTH = 468;
SRC.SLIDER_HEIGHT = 68;
SRC.SR_HEIGHT = 124;
SRC.SR_WIDTH = 577;
SRC.TOP_HEIGHT = 29;

/* SRCanvas.js */

var SRCanvas = function(sr) {
   JSCanvas.call(this);
   this.sr = sr;
   this.setBackground(SRC.APPLICATION_BACKGROUND);
   this.bottom = new JSImage(SRCanvas.BOTTOM);
   this.cursor = new JSImage(SRCanvas.CURSOR);
   this.left = new JSImage(SRCanvas.LEFT);
   this.right = new JSImage(SRCanvas.RIGHT);
   this.slider = new JSImage(SRCanvas.SLIDER);
   this.top = new JSImage(SRCanvas.TOP);
   this.addMouseListener(this);
   this.addMouseMotionListener(this);
};

SRCanvas.prototype = 
   jslib.inheritPrototype(JSCanvas, "SRCanvas extends JSCanvas");
SRCanvas.prototype.constructor = SRCanvas;
SRCanvas.prototype.$class = 
   new Class("SRCanvas", SRCanvas);

SRCanvas.prototype.paintComponent = function(g) {
   var size = this.getSize();
   var x0 = (size.width - SRC.SR_WIDTH) / 2;
   var y0 = (size.height - SRC.SR_HEIGHT) / 2;
   var sx = x0 + toInt(Math.round(this.sr.getSliderOffset()));
   var sy = y0 + SRC.TOP_HEIGHT - 1;
   g.drawImage(this.top, x0, y0, this);
   g.drawImage(this.slider, sx, sy, this);
   g.drawImage(this.bottom, x0, y0 + SRC.TOP_HEIGHT + SRC.SLIDER_HEIGHT - 2, this);
   g.drawImage(this.left, x0, y0, this);
   g.drawImage(this.right, x0 + SRC.SR_WIDTH - SRC.BRACKET_WIDTH, y0, this);
   var cx = x0 + toInt(Math.round(this.sr.getCursorOffset()))+
   SRC.LEFT_OFFSET - SRC.END_WIDTH / 2;
   var cy = y0 + SRC.CURSOR_OFFSET;
   g.drawImage(this.cursor, cx, cy, this);
};

SRCanvas.prototype.stateChanged = function(e) {
   this.repaint();
};

SRCanvas.prototype.mouseClicked = function(e) {
   /* Empty */
};

SRCanvas.prototype.mouseEntered = function(e) {
   /* Empty */
};

SRCanvas.prototype.mouseExited = function(e) {
   /* Empty */
};

SRCanvas.prototype.mousePressed = function(e) {
   if (this.insideCursor(e.getX(), e.getY())) {
      this.startX = e.getX();
      this.startCursor = toInt(Math.round(this.sr.getCursorOffset()));
      this.draggingCursor = true;
   } else if (this.insideSlider(e.getX(), e.getY())) {
      this.startX = e.getX();
      this.startSlider = toInt(Math.round(this.sr.getSliderOffset()));
      this.draggingSlider = true;
   }
};

SRCanvas.prototype.mouseReleased = function(e) {
   this.draggingCursor = false;
   this.draggingSlider = false;
};

SRCanvas.prototype.mouseMoved = function(e) {
   /* Empty */
};

SRCanvas.prototype.mouseDragged = function(e) {
   if (this.draggingCursor) {
      var offset = this.startCursor + e.getX() - this.startX;
      this.sr.setCursorOffset(Math.max(0, Math.min(SRC.SCALE_WIDTH, offset)));
   } else if (this.draggingSlider) {
      var offset = this.startSlider + e.getX() - this.startX;
      this.sr.setSliderOffset(Math.max(-SRC.SCALE_WIDTH, Math.min(SRC.SCALE_WIDTH, offset)));
   }
};

SRCanvas.prototype.insideCursor = function(x, y) {
   var size = this.getSize();
   var x0 = (size.width - SRC.SR_WIDTH) / 2;
   var y0 = (size.height - SRC.SR_HEIGHT) / 2;
   var cx = x0 + toInt(Math.round(this.sr.getCursorOffset()))+
   SRC.LEFT_OFFSET - SRC.END_WIDTH / 2;
   var cy = y0 + SRC.CURSOR_OFFSET;
   return cx < x && x < cx + SRC.CURSOR_WIDTH && cy < y && y < cy + SRC.CURSOR_HEIGHT;
};

SRCanvas.prototype.insideSlider = function(x, y) {
   var size = this.getSize();
   var x0 = (size.width - SRC.SR_WIDTH) / 2;
   var y0 = (size.height - SRC.SR_HEIGHT) / 2;
   var sx = x0 + toInt(Math.round(this.sr.getSliderOffset()));
   var sy = y0 + SRC.TOP_HEIGHT - 1;
   return sx < x && x < sx + SRC.SR_WIDTH && sy < y && y < sy + SRC.SLIDER_HEIGHT;
};

SRCanvas.BOTTOM =
"data:image/png;base64," +
"iVBORw0KGgoAAAANSUhEUgAAAkEAAAAdCAYAAACt17gIAAAC9UlEQVR42u3d" +
"i43qMBBAUVqgFlqgBVqgBWqhFlqgFlrIk5/klRUlEJLY2Mm50mhZiMdjx8R3" +
"s7/D4XDohBBCCCF2GIdui6w5ruv12t3v98V5jsdj93q9Zrc/n8/d4/EoOoY5" +
"7W632/+YSpiTMDc58k89dmoNz+ezO51Oq5yrT8dMqSnUEmqa8/qn/O/qe7cu" +
"3rUbe1+O5Qt5Qr6pz4ccIdeUmsbGP3TsUN6htTD03FCtQ+uyf30Yatc/n/08" +
"Q/3357zfz6fP0/b9/P3+0/r69afz2s9zuVz+2qU5+8eltaX50vWTtk/P27vH" +
"8fg0TzqWOAdpPWm7eGy6ptI6Yt1pv7FNOk9Dx8W+43hDm3h8+lp4PrZL64w5" +
"Y/vweviYPo7tQ5t0DDH/lj2BBJEgEkSCSBAJIkEkiASRIBJEgkgQCSJBJIgE" +
"kaD6Cv3qRJAgEkSCSBAJIkEkKL8EzdmjSdDMuzpT6yVBJIgEkSASRIJIUBkJ" +
"yrH3kqCRSZ1S81Zv35VmLQGsnW9FrBY+SdAvWCLrSxmToBxMFeK5jIner78Y" +
"W/IFzxipBJW+TqUyk7vdnPX5zV72Tf4oQWvUMGePJkEkiASRIBJEgkgQCSJB" +
"JIgEgQRthV9KUElyS1Au1pSgtVgqQUvFeQ2Rq0HSc+UnQRVJELkBAMAevSsJ" +
"avEnzwEA2IME+e2wis0UINpl53BPc9nYrf8qz8+v6ik9J7n7yZXf3wlq9GIM" +
"zHmDWzsumlu81tRaZ20y1up1Jlf+Le+n7gQB1o75WzjOVu8EWStla2lVgrb8" +
"niZBgHWTbaPdyzppdaw11F2TmJXov+S3w0gQCbIjwZoxn0U2mxbHWosE1VBT" +
"KQEq2ScJIkF2IVgvO9zQrJ12zg8JamM8JMiFCRvfxPb4W02555JAOz+t1FSq" +
"71LfDrOfkiAAAAASBAAAQIIAAAAJChJkGgAAwC5FyBQAAAASBAAAQIIAAABI" +
"EAAAAAkCAAAgQQAAAFuUoKF/KSCEEEIIUXt84h/wg+29TNfiRwAAAABJRU5E" +
"rkJggg==";
SRCanvas.CURSOR =
"data:image/png;base64," +
"iVBORw0KGgoAAAANSUhEUgAAAEUAAACSCAYAAAATtge+AAAGOklEQVR42u2W" +
"jZHqOgyFXYJpISWYFrYFSggt0MKWAC1sC7RACUsteTmyj6L8sDP3wszy5p7M" +
"mBjHVo6+SLZSCtfn5+dwuVyG87kf+vN5wH/0cUc7jv3T6TRwXn88D8fjcdUO" +
"h4O10vfDx8fHsN/vh67rrO12O7tjPJUyjK/1MdzxH+N4HuejwQ7GYZfv2Ho/" +
"dEEfdELvMfhAf+Af+pyXHlxmAC82YWgZ9zz9n43XO8WWUoVSCOGx4eVoX19f" +
"DpzjBIk7RVI45nNttBffYR9gfD/hR30r7fAnjGMN7LT/0wVDeKlN3jKUNwy3" +
"cUZC5rPxK+Pr2le3dV2wm63lFh0eGalGgs0Nz3Ka1kw2qj1f36ItNwctAvNC" +
"Z/oBUrML/6EBV3KHAl2+sJTkIRwbDWEtvi7C2Z1o6yF+uc4c75I/mzm30TcA" +
"3QMNwQYhQwf0WLTnuS9RA/yaf7jkdtraZC8GYfRLXzyH2VIzEiMJ/2GAXzuH" +
"KImRxK9Z7dQ7wp3hzz72gfif/bjO7YdIoH1G6lJXhJPaR44N/mKtRVjX/Khf" +
"ri6CEE5kWniedvOwq8R7p2/p98T1vczpP7wY/jXC+5aOQXM37X/Thl1hw2+H" +
"aH7miZ4N5LQKv/VmlRxe27mfcugVUHhYQA+d3dK9TH/rd4FBblBimPEhj0Qu" +
"3oLDE6OdWL8OhXscdG3BIITon4OYn1h1AQzhCLRzfTTMegDkCSSeGDx+0X82" +
"dV4FpenwY3qpGfcaSbV+gp+2n41+Y75/+LhxcRO0umNc2PfFNrMYilx4u93G" +
"drb+/X5/CyhNh+mCvqiX/sEf+AX/4Kdv5vFgYJQwFZCP6IMkGosrFkrX69XO" +
"cqyDCNJ/ByiMaurDBb1e2bbikL7VqrvMqnCHwoKKFR7LaBjzvYXH7tbGldLT" +
"7fsFNh7pySFS4I9XwS1apjl5gsKNNAKK5/5UXa7BjGX4/hXt+4W2toAsq+i8" +
"ADGrbxBi+cUO/jaUvwNZg8HKfPwwTf5lKEwrQREUQREUQREUQREUQREUQREU" +
"QREUQREUQREUQREUQREUQREUQREUQREUQREUQREUQREUQREUQREUQREUQREU" +
"QREUQREUQREUQREUQREUQREUQREUQREUQREUQREUQREUQREUQREUQREUQREU" +
"QREUQREUQREUQREUQREUQREUQREUQREUQREUQREUQREUQREUQREUQREUQREU" +
"QREUQREUQREUQREUQREUQREUQREUQREUQREUQREUQREUQfm/QMmjoJTyPw0F" +
"/oODQdntdsN+vx9wR+PDCir5OP/zzvaOUKK+qHvyMQUfs4+TQ4ogMBkPSt8P" +
"h8PB06rruk0ghJY2xv+0fb/AxiM91A0/mCbwD37C37QAZFAwAe14PI4Ti/Wx" +
"GO1yudj46XQyY9fr1UIM6+73u90xnp68GpSnLuiAHurDBb0Yh374AX/oWwVT" +
"bJwMpkjJE0k8YLT04wLQY6TEL3G73cZ2tj7gvAOUpsN0Qd8ycqof2fxilMBf" +
"9y/7/NrBw/58dqIgiYWknxY5yfRCH/TfAUrT4emx1Myohl/wjxkAvz1Kahol" +
"p4QGasw9I5jTtAEtcpUp1/Ly16FAB1Nha68xnTnN/KOPMw4RROqSQ+DERxsp" +
"5iMfGS3vAIVRAl0x5VcbcV742aU5IAPRJiOU6CxIYhGaA1tCKb2tQ//ZFHoW" +
"Ct4PHdADXSsozXH6VLeHCg9++8evgVE7mIQ+J8aWypxwDMd47qdSvNaZbVyl" +
"fbl2R3hDCBr7/fE8+89+XOf2Geo8QsfxnLZ1zSK+pJVv8Bdr4T84mB0YyGme" +
"U9ycSjPC/75phfCrx3g/FXiecut1U8R1bifaXPYxj194pSHYYGEGHb7H5bkv" +
"UUMp83fR79zqNKtrPfzjhhPbamyKBKaZF3bta04vjBtZ9kIxngqYU8O926ii" +
"65rJRjcHWIpHKtMiRtLPfkyRxPRbbVIIWVZ4YSd+DClPeYo85jHN8EefDS9F" +
"G8twOwLjOE8MFld8hnmYz7XRXnyHFWGln/a//AMEAg4VPOw8PCwo8nzuXTj6" +
"FHIc+xSCedgH4MiysTpkPUCxTAMeifzKHPPIKcWPTD4jfNZPsQpfNugiRKu7" +
"gg/0B/6hz3mRw3+HbdETn8yV8wAAAABJRU5ErkJggg==";
SRCanvas.LEFT =
"data:image/png;base64," +
"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";
SRCanvas.RIGHT =
"data:image/png;base64," +
"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" +
"/vQXI3Bo6q7uV/wAAAAASUVORK5CYII=";
SRCanvas.SLIDER =
"data:image/png;base64," +
"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";
SRCanvas.TOP =
"data:image/png;base64," +
"iVBORw0KGgoAAAANSUhEUgAAAkEAAAAdCAYAAACt17gIAAAC9UlEQVR42u3d" +
"C63qQBSFYSyg5VjAAhawgAUsYAELWMACFrDAzU7uTpqmPFo6pVO+P9kB2pnp" +
"dOhaLAics7q/YLVaKaWUUkpVVy8zzh0AAOAHEYIAAIAQBAAAIAQBAAAIQQAA" +
"AEIQAACAEAQAAFBlCHrnd/QAAAALC0BCEAAAEIIAAACEIAAAACGo0pND5xM+" +
"67UZ8r9f5nzdjH0+Q8f4ZB59+/T6vz10Sqd0SqdCUBmB4vFFXMP6fMNYS5hr" +
"zWP1vW76tKdTOqVTOhWCFiJM61O/sU7xDrM2ky5prnRKp3RKp0KQEGRtnhjS" +
"1OtR+phDxx/7o/qSz0efudIpndIpnQpBQpB1+eJ8p/x+wyfmWmKc0scVguiU" +
"TulUCGIi1mRiE5nLGpUyxRrM1Rej6ZRO6VQI+tKFz1y/9y5qzLku4QVo7F+c" +
"TP2dhaEfs9MpndLpb+m0xk8wFxuCAACA1+hFhKBSvwoAAAC/9xq96BAkLHWz" +
"Xq9nP8fNZnM/n8+TH/fv72/2677f7+/X63Vw/+Px2LvP6XS6Hw6Ht9vHcxd9" +
"6JRO6XQZOn1nzYWg8hNd3F+43O12izLXsczpU3MNAxmytn3nH/Mcc93DOKM+" +
"MdcwwWfG9sxcH+17Zq7b7fZtc71cLnRKp3RaoU5frXlN32WrNgT1NU7mylyZ" +
"qxBEp3RKp9OEoNp0LQT9N7dXHzuGKG6322AjeCbyR/seiSzm0SXSR+27tnX1" +
"77rA28bRPs+uubTHaT5ut2+P11yL9r7mc9l8zqJNzrN5v2muzbHax2+3zfmG" +
"CeT9bNdc4xwn90Xb6JNtmv1z7tmnfRv7s332z/Fy/LgNQw0jS3ONeee2bBfn" +
"keYa+9MUc1vcxvZ8HH3jWDlO7EuzjDHjcY4dfWJfHCO35Rh5jLyf5ppziz5x" +
"PlFxP7fHsemUTul0/joVgiqEuTJX5ioE0Smd0mn5EFRzThCCmCtzZa5CEJ3S" +
"KZ0KQUIQc2WuzFUIolM6pdOfCkFKKaWUUr9W/wA1s/HCSaYMEgAAAABJRU5E" +
"rkJggg==";

/* Exports */

return {
   SRC : SRC,
   SRCanvas : SRCanvas,
   SlideRule : SlideRule
};

});
