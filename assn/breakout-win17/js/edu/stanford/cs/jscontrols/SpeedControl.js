/*
 * File: SpeedControl.js
 * ---------------------
 * This file implements the speedometer-like speed control in JavaScript.
 */

// This file was a hack when the img field was the top-level element
// Rewrite this more sensibly now that the element is a div

define([ "jslib",
         "edu/stanford/cs/java2js",
         "edu/stanford/cs/jscontrols/JSControl",
         "java/awt",
         "java/lang",
         "javax/swing" ],

function(jslib,
         edu_stanford_cs_java2js,
         edu_stanford_cs_jscontrols_JSControl,
         java_awt,
         java_lang,
         javax_swing) {

/* Imports */

var inheritPrototype = jslib.inheritPrototype;
var addListener = jslib.addListener;
var toInt = jslib.toInt;
var toStr = jslib.toStr;
var Integer = jslib.Integer;
var Double = jslib.Double;
var Character = jslib.Character;
var AdjustmentEvent = java_awt.AdjustmentEvent;
var Color = java_awt.Color;
var MouseEvent = java_awt.MouseEvent;
var Class = java_lang.Class;
var ChangeEvent = javax_swing.ChangeEvent;
var ChangeListener = javax_swing.ChangeListener;
var JSElementList = edu_stanford_cs_java2js.JSElementList;
var JSCanvas = edu_stanford_cs_java2js.JSCanvas;
var JSControl = edu_stanford_cs_jscontrols_JSControl.JSControl;

/* SpeedControl.js */

var SpeedControl = function() {
   JSControl.call(this, "Speed");
   var control = this;
   control.listeners = [];
   control.img = document.createElement("canvas");
   control.element = control.img;
   control.normalIcon = document.createElement("img");
   control.normalIcon.src = SpeedControl.CONTROL;
   control.normalIcon.width = JSControl.SIZE;
   control.normalIcon.height = JSControl.SIZE;
   control.disabledIcon = document.createElement("img");
   control.disabledIcon.src = SpeedControl.DISABLED;
   control.disabledIcon.width = JSControl.SIZE;
   control.disabledIcon.height = JSControl.SIZE;
   control.bg = control.normalIcon;
   control.width = JSControl.SIZE;
   control.height = JSControl.SIZE;
   control.img.width = JSControl.SIZE;
   control.img.height = JSControl.SIZE;
   control.setSpeed(50);
   control.name = "Speed";
   control.enabled = true;
   control.pressed = false;
   var mouseDown = function(e) {
      if (control.enabled) {
         control.pressed = true;
         control.updateSpeed(new MouseEvent(e, control));
      }
   };
   var mouseUp = function(e) {
      if (control.enabled) {
         control.pressed = false;
      }
   };
   var mouseMove = function(e) {
      if (control.enabled && control.pressed) {
         control.updateSpeed(new MouseEvent(e, control));
      }
   };
   addListener(control.img, "mousedown", mouseDown);
   addListener(control.img, "mouseup", mouseUp);
   addListener(control.img, "mousemove", mouseMove);
   control.img.ondragstart = function() { return false; };
};

SpeedControl.prototype =
   jslib.inheritPrototype(JSControl, "SpeedControl extends JSControl");
SpeedControl.prototype.constructor = SpeedControl;
SpeedControl.prototype.$class = new Class("SpeedControl", SpeedControl);

SpeedControl.prototype.setSpeed = function(speed) {
   this.setValue(speed);
};

SpeedControl.prototype.getSpeed = function() {
   return this.speed;
};

SpeedControl.prototype.setValue = function(value) {
   this.speed = value;
   this.fireAdjustmentListeners();
};

SpeedControl.prototype.getValue = function() {
   return this.speed;
};

SpeedControl.prototype.setValue = function(speed) {
   this.speed = speed;
   this.fireAdjustmentListeners();
};

SpeedControl.prototype.addAdjustmentListener = function(listener) {
   this.listeners.push(listener);
};

SpeedControl.prototype.removeAdjustmentListener = function(listener) {
   /* Not implemented */
};

SpeedControl.prototype.fireAdjustmentListeners = function() {
   var e = new AdjustmentEvent(this, AdjustmentEvent.ADJUSTMENT_VALUE_CHANGED,
                               AdjustmentEvent.TRACK, 0);
   var el = new JSElementList(this.listeners);
   for (var ei = 0; ei < el.size(); ei++) {
      var listener = el.get(ei);
      listener.adjustmentValueChanged(e);
   }
};

SpeedControl.prototype.setEnabled = function(flag) {
   this.enabled = flag;
   this.img.src = (flag) ? this.normalIcon : this.disabledIcon;
};

SpeedControl.prototype.repaint = function() {
   var ctx = this.img.getContext("2d");
   var bg = this.bg;
   if (bg.complete) {
      ctx.save();
      ctx.drawImage(bg, 0, 0, JSControl.SIZE, JSControl.SIZE);
      ctx.fillStyle = SpeedControl.NEEDLE_COLOR.getColorTag();
      ctx.strokeStyle = ctx.fillStyle;
      ctx.translate(JSControl.SIZE / 2, JSControl.SIZE / 2);
      ctx.rotate(Math.PI / 180 * (this.speed - 50) * 2.7);
      ctx.beginPath();
      ctx.moveTo(0, SpeedControl.SHORT_DELTA);
      ctx.lineTo(SpeedControl.SHORT_DELTA, 0);
      ctx.lineTo(0, -SpeedControl.LONG_DELTA);
      ctx.lineTo(-SpeedControl.SHORT_DELTA, 0);
      ctx.lineTo(0, SpeedControl.SHORT_DELTA);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
   } else {
      var observer = this;
      var callback = function() {
         if (observer && observer.repaint) observer.repaint();
         bg.onload = null;
      }
      bg.onload = callback;
   }
};

SpeedControl.prototype.updateSpeed = function(e) {
   var dx = e.getX() - JSControl.SIZE / 2;
   var dy = JSControl.SIZE / 2 - e.getY();
   var theta = Math.atan2(dy, dx) * 180 / Math.PI;
   if (theta < -135) theta = 360 + theta;
   if (theta > -45) {
      this.setSpeed(toInt(Math.round((225 - theta) / 2.7)));
      this.fireAdjustmentListeners();
      this.repaint();
   }
};

SpeedControl.CONTROL = "data:image/png;base64," +
   "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" +
   "FwU1/rZ42G2/oXhn5eDiYjok25gbcIGqCpe159z3mSynR7nuz2IrmosCLlBV" +
   "4eJ61NIUhScqAxcfDmqKdv8HXKCqwWXteX99JqsjSgq7WK5MoxfABXINl6Q9" +
   "W1wpiw2+vSa+fMSvg5r67w/CzwJk6rsQldI1gvr+Ikj3eolM7Ey7vu+Cfh7s" +
   "9SZi8mB/d2WHrZ2a1/ca2J1Utxs+CReL+u43voO7pQviyvTQMOACuFQHLj/K" +
   "6KHsO7hbuiBukv7wEeACuJQbLn0Zjlqy2Nw7syDuhI4gmLMt+9EL4AK4lAku" +
   "Tx/z10fmDgTB9Z3ZfRqQ2fGrjx0Kgp4L3+qVsYZOBsEj+0Ld0xjpzLUc7fz+" +
   "bPhRY0Sf8eoRFEtDN80L+mnEbDDJgyvnBUGfpUspDUHWNl3Qrx/t+lMpu4M6" +
   "106z8bepm83bP/UhUrNPUf8itdrwysnsgruZfPE8q++aszUaUdMxTUfNVYAP" +
   "XQe4AC5lhctPmVXs1I9a4bH6ePiQph0addpV++5sTg7IJIj7xhl9uHANXoQP" +
   "OX3+TsAFcCkvXNqHr8FjJNRVeDTaeOd5jXwV2hWlJ4vrFBouslELOWnc2Q7h" +
   "0p3UAQAXwKXE0yLdtmvarihM4Xv04nXUQnRcdy4INn2aoM8EfVpQ+bAzj7I7" +
   "yHOjoNL4u4jtJudyyuI7hYSL7KvnRbsr0ogAF8ClgnB58qjf0YvXN0Rv/Rlw" +
   "AVwAl6LCxffoJb9RC+ACuAAuuZdz+UF/nwV4G7X89oNwtWGruj6OaoMgOrJV" +
   "FJeGSZqcxDQ2fJIukzS1bVLIk7VbtEH0HXP9BgX/cjawecrKJtrK+UshDxd1" +
   "ai2uXLrlNtCfPgqCG9f7WffiZ9SySw0MunDpAlwAlxrDZYMnG5bu9TN68TZq" +
   "AVwAF8ClHHDxNXpxfhxrc9TiGi5dgAvgAri4t+1jf6MX57v5rzkRLke+qvN6" +
   "Wi/R+O8Jaa7/OCrd3yNpK9qdaGNSeh/r58Hdv97EDttyuchDpT5cS8H/bDvK" +
   "wDe2fWX9efNy/v7DILjB8ejF6ZfPs7fZOTOxw3wMuAAugItPuJB+uNftF9NO" +
   "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" +
   "y8P7AJeywWVFCeAiywdwKTZcVF5DJ8JFFtR9sJHAE4eievwwo0OCdH8/nFMe" +
   "zD1PCIpdL5F4j7YvORs91McTh3g7WV8wNqnkoVR22zq29I20bKJvbNuugp2+" +
   "60v2pogGI1ZwuWcb4AK4AC51h8tDw2rB3FS4iIej3bUFcAFcAJe6w2VOvwO4" +
   "iK+jp3UDLoAL4FJ3uHxnC7+9JQsX2Rujxw4KOiTooJ2WS8TlEbveJA/dcnE2" +
   "HZKIK5cDX3LlWs7osSykWE4t33lul7I0lerzYPay7Q/c9bdtVnsNnQoX+lZA" +
   "hMuP9wMugEs2cIn4EXApDFwmdqq9KUqFiyyou3AQcAFcsoPLuC8Bl0LAhZaj" +
   "qHywaASX2dvcVuLyQ4AL4GJQLsBFyVeuYUTfGKoGc1m4iEe7km7ZGG7OS6BZ" +
   "tLsxVToAuAAufuEidmbAJRu4UP8moNy5Jez3IguuW2cBF1lQV6YbN4SBntlb" +
   "g2BBY+q0dG8QLGtAZ9n+qH5yIK5ljGL37BekmZ5SHkyaur+biLNXpRyc/2P3" +
   "M741qT9d36Xek2SXYLeRHaKvNH3hop2Z5GF7Pf3t0cbU5vu7wv5Le+PeuEGt" +
   "3yct+1eCi2xqpCoK/DSBc//2IFi827wjAS7xtGsJlwOAiy1caIXt/MYA4O6t" +
   "Yf8UA7Q6Sou3eIVLkqhAVLC5jeHWg7sAF9OGVFu4HABcVNKk3xYPh2c6z94a" +
   "f4XsQhw7WLiIi+l8iOZzd/aFTiCHAC5mnbIucFkGuMTSpBEJPbBn9cnjI67F" +
   "xVuU4KIad3EhGqJREOnR/cn6kaBHdTUiEXeN7u+mdiSlOWKoLOzOw3diWra+" +
   "9uVL27Jq2LdoV7haNqu+ysVblODiY2qUpHnbeYfXDi4jgAtrD+CSOWCeGy0R" +
   "XOYNqDm8VnAZAVycqCZwyRIwKtxQgovvuMvVEcsI4OJcgEvt4EL63qDn8EWH" +
   "Q7jIvjNyJVqk88i+UA+raCSqRzjt4/WwrkQbxDQldnBpPpKBdPN82NE9uuXU" +
   "9i/z+8MjfLvRrWOlcmm2RRPfxa65lpdsNa2zwUC/Q7j4mhrd0WvQyQEXwAVw" +
   "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" +
   "gtzq/wFey2EufhX6mAAAAABJRU5ErkJggg==";
SpeedControl.DISABLED = "data:image/png;base64," +
   "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" +
   "6+Wah6k95LoL9dRQ22f7tPyt5VBjKfWJ7ZvbCjaxktpDLyeLhbH/upVb66sa" +
   "cr9xbmOtj7hfH1L/j9Ov6Dz6qirkArl4kcupDJhgIJfiyGX7ZpvlQvthQi6Q" +
   "S6tcFBkwwUAu1ZSLl7tF9K0hyKW6ctFkwOsBuUAuceVCz7lALtWUCxeBWS43" +
   "IRfIJZ5cLl26FNS2thrflxWpMYTjawxzmjWGmkdtKxqxjLUY52zFocbwG0vT" +
   "ObQtRitO5a3HukZpMMLrZZeuVZu7xioOUnwdf5f6Yc1QL7tYOParqD5Qqzm3" +
   "T1i5+DuI9AgL5AK5WInFXS41yKXCcon1VjTkUjG5tMTaXS41yKUiciEvJJZL" +
   "T08P5FIVubBYQy6QS6pyITbrhaKPx2tsRlPbrClox2jp1QxsJqLGsDvHsdw2" +
   "9XCMnUzNApdz4sbKjN+6bfoncV9uQxljXIPOZTTkYWpbyAVysTxn07tcapBL" +
   "peRy5coVyAVyCT/Gt1xqkEuO5LLpVS4XLlzw890iyKWsctmEXCCXWHLx9lG0" +
   "paWlYH1jXWNjnbHB2YhET3NDg74Ip6ClISHnoeXJ68HqKaVprq8QG+c89HiL" +
   "7aO0lR5bm3rIsXODdpSXEMsZpx48j41opDJZ1ZW3EZW1hQ0BY8ylepyWL6SP" +
   "bNjUnZdz3Z9c6ANJkEuJ5HKaJ+QCubjLZXV1VZPL7OxsPLnQo76QS0nkouQJ" +
   "uUAu7nKhwYb06L+1XEZGRiCXMshFy7MNclmHXIouF5v3ikLlwl8BoE81rq2t" +
   "ObO+tq4QJw3gk3WV9TUV6fiCtOE6A+3uFxpsxJYL3bNuPbG7uxtygVwgF9CA" +
   "BhvSA3ShcjE96wK5QC6QCyB6e3vFj9CHysW07nLt2jXIBXKBXIDVbWgnuUxP" +
   "TwerKysqqyorDH78ysrqKXQ7a6XxtxZMaWh5rKpIabTk2cyXo6WhIaSxomJK" +
   "g9dDO0esd3RsV1f4+auGWDjGyoBYTpaGqU3N9XDJI7p9tD5iQO+bjn1Ai4sh" +
   "D63s0f1O/N3Y5rxehvaK6Id6347ue/MLdneKnORC211CLsWQy2m9CiWXFcil" +
   "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" +
   "eJGLafRCn4CsolxmIBfIpYBymZjwP2rxIpeo0Yt/uUznVi4zkAvkkrJctD7h" +
   "SS6mlxldtlZIVS5ho5eqyGUGcimhXKYrIZepqemAb6US5z2i1ORiGr3Q5yOn" +
   "pqYcmTYw5RcKKEc8h8F+n2Zox0+7l3NaIE7dp6dVvMe2VKTU/9pWD3N96MPz" +
   "vh6aS00upo2kxsfHIRfIpQQXZTnlQu/+pTVq8SoXWllOPnqBXCCXYvzHL0M9" +
   "0hy1eJWLn9EL5AK5QC5Z1CPtUYt3uZhGL729vfWKTPxgUmViQoHepOZMTqio" +
   "v09o8DTP8o4iulxKGUznT8jQ7T4FoZ5ambQyGmIj5sHLxFHPN9VVO0Yqg5CH" +
   "sQ15noZ+4RI7Ux5aOqycYW181s+kehvKwWOh1Vsvt1oGU7tH9NUJU7xO8jI9" +
   "jetz1OJdLmGjl8HBKynJZTJbuYSdD7lURi5NwWQhl8mU5DI6Nur1BcXM5GIa" +
   "vXR1ddWDOZ6OXCYykkvU+ZBLpeRivIg9y2UiRbmYNojyPWpJRS5hz71cqg/D" +
   "UpPLRMpykc6HXConlwl2IfuUy0SKcrkyeCWVp3Ezk0vYZlL0aUla4A1lzMD4" +
   "mErk7+M5YcyAUNfxYjDGyGeZxiz6Be9XjHa0V8r9gEYnpmWLtByQmlxM3zii" +
   "4Vi6chmDXCAXyCUE08uJSfZraZtcwhZ3L1++DLlALpBLxgwPD2eyiJuZXEzT" +
   "I1rcHRsbg1wgF8iF1SHNGGW1iJupXEyLu/TkLr3YODo65oFRhbEfhP4+psOP" +
   "kRhjSL+PGeo6phGdpk0eYp7O9ZbjTbc1FXyUO2GaUr1jtbl4viE+Wj1YLH/8" +
   "fczYHyxiPWbXN01vPae1iJupXMIWdwcHB1OVy1kng1wglyzlMuYklzCx+JIL" +
   "3UTJchE3c7mYFne7u7tTl8uYRSeBXCAX/3IZy41caJaQ9IPyuZZL2OLuyfQI" +
   "coFcyiiXMVEuYwJJ5XJ5YMDLN59zL5ew6RHdPaKhWyjDwwrD9b+1Qt9JamV4" +
   "ZFhhhBgeCadxjJonray3opdrmMHLbMonOg2xXlqZhuU0HMutx27EHWN8o3Av" +
   "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";
SpeedControl.NEEDLE_COLOR = Color.WHITE;
SpeedControl.LONG_DELTA = 18;
SpeedControl.SHORT_DELTA = 4;

/* Exports */

return {
   SpeedControl : SpeedControl
};

});
