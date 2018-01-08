/*
 * File: mazemaker.js
 * Created on Fri Feb 27 13:48:54 PST 2015 by java2js
 * --------------------------------------------------
 * This file was generated mechanically by the java2js utility.
 * Permanent edits must be made in the Java file.
 */

define([ "jslib",
         "edu/stanford/cs/controller",
         "edu/stanford/cs/direction",
         "edu/stanford/cs/graphics",
         "edu/stanford/cs/java2js",
         "edu/stanford/cs/jscontrols/JSControl",
         "edu/stanford/cs/jscontrols/ResetControl",
         "edu/stanford/cs/jscontrols/RunControl",
         "edu/stanford/cs/jscontrols/SpeedControl",
         "edu/stanford/cs/jscontrols/StepControl",
         "java/awt",
         "java/lang",
         "java/util" ],

function(jslib,
         edu_stanford_cs_controller,
         edu_stanford_cs_direction,
         edu_stanford_cs_graphics,
         edu_stanford_cs_java2js,
         edu_stanford_cs_jscontrols_JSControl,
         edu_stanford_cs_jscontrols_ResetControl,
         edu_stanford_cs_jscontrols_RunControl,
         edu_stanford_cs_jscontrols_SpeedControl,
         edu_stanford_cs_jscontrols_StepControl,
         java_awt,
         java_lang,
         java_util) {

/* Imports */

var inheritPrototype = jslib.inheritPrototype;
var newArray = jslib.newArray;
var toInt = jslib.toInt;
var toStr = jslib.toStr;
var Controller = edu_stanford_cs_controller.Controller;
var Steppable = edu_stanford_cs_controller.Steppable;
var Direction = edu_stanford_cs_direction.Direction;
var GCanvas = edu_stanford_cs_graphics.GCanvas;
var GCompound = edu_stanford_cs_graphics.GCompound;
var GLabel = edu_stanford_cs_graphics.GLabel;
var GLine = edu_stanford_cs_graphics.GLine;
var GRect = edu_stanford_cs_graphics.GRect;
var JSProgram = edu_stanford_cs_java2js.JSProgram;
var JSControl = edu_stanford_cs_jscontrols_JSControl.JSControl;
var ResetControl = edu_stanford_cs_jscontrols_ResetControl.ResetControl;
var RunControl = edu_stanford_cs_jscontrols_RunControl.RunControl;
var SpeedControl = edu_stanford_cs_jscontrols_SpeedControl.SpeedControl;
var StepControl = edu_stanford_cs_jscontrols_StepControl.StepControl;
var Color = java_awt.Color;
var Dimension = java_awt.Dimension;
var Point = java_awt.Point;
var ActionEvent = java_awt.ActionEvent;
var ActionListener = java_awt.ActionListener;
var Class = java_lang.Class;
var RuntimeException = java_lang.RuntimeException;
var ArrayList = java_util.ArrayList;
var Stack = java_util.Stack;

/* GMaze.js */

var GMaze = function(nAcross, nDown, squareSize) {
   GCompound.call(this);
   this.nx = nAcross;
   this.ny = nDown;
   this.sqSize = squareSize;
   this.initMaze();
};

GMaze.prototype = 
   jslib.inheritPrototype(GCompound, "GMaze extends GCompound");
GMaze.prototype.constructor = GMaze;
GMaze.prototype.$class = 
   new Class("GMaze", GMaze);

GMaze.prototype.getMazeSize = function() {
   return new Dimension(this.nx, this.ny);
};

GMaze.prototype.setTheseusLocation = function(x, y) {
   this.tx = x;
   this.ty = y;
   var cx = (x + 0.5) * this.sqSize - this.theseus.getWidth() / 2;
   var cy = (y + 0.5) * this.sqSize + 0.3 * this.theseus.getHeight();
   this.theseus.setLocation(cx, cy);
};

GMaze.prototype.getTheseusLocation = function() {
   return new Point(this.tx, this.ty);
};

GMaze.prototype.recolorSquares = function(oldColor, newColor) {
   for (var ix = 0; ix < this.nx; ix++) {
      for (var iy = 0; iy < this.ny; iy++) {
         if (this.squares[ix][iy].getColor() === oldColor) {
            this.squares[ix][iy].setColor(newColor);
         }
      }
   }
};

GMaze.prototype.getSquare = function(x, y) {
   return this.squares[x][y];
};

GMaze.prototype.getWall = function(x, y, dir) {
   return this.squares[x][y].getWall(dir);
};

GMaze.prototype.isBlocked = function(x, y, dir) {
   return this.squares[x][y].getWall(dir).isVisible();
};

GMaze.prototype.getWalls = function() {
   var result = jslib.newArray(this.walls.size());
   this.walls.toArray(result);
   return result;
};

GMaze.prototype.isInBounds = function(x, y) {
   return x >= 0 && x < this.nx && y >= 0 && y < this.ny;
};

GMaze.prototype.reset = function() {
   this.removeAll();
   this.initMaze();
};

GMaze.prototype.initMaze = function() {
   this.squares = jslib.newArray(this.nx, this.ny);
   this.walls = new ArrayList();
   for (var ix = 0; ix < this.nx; ix++) {
      for (var iy = 0; iy < this.ny; iy++) {
         var sq = new MazeSquare(this.sqSize, ix, iy);
         this.add(sq, ix * this.sqSize, iy * this.sqSize);
         this.squares[ix][iy] = sq;
      }
   }
   for (var ix = 0; ix < this.nx; ix++) {
      for (var iy = 0; iy <= this.ny; iy++) {
         var wall = new MazeWall(this.sqSize, MazeWall.HORIZONTAL);
         this.walls.add(wall);
         if (iy === 0) {
            wall.setColor(Color.BLACK);
            this.squares[ix][iy].setWall(Direction.NORTH, wall);
         } else if (iy === this.ny) {
            wall.setColor(Color.BLACK);
            this.squares[ix][iy - 1].setWall(Direction.SOUTH, wall);
         } else {
            wall.setSquares(this.squares[ix][iy - 1], this.squares[ix][iy]);
            this.squares[ix][iy].setWall(Direction.NORTH, wall);
            this.squares[ix][iy - 1].setWall(Direction.SOUTH, wall);
         }
         this.add(wall, ix * this.sqSize - 1, iy * this.sqSize - 1);
      }
   }
   for (var iy = 0; iy < this.ny; iy++) {
      for (var ix = 0; ix <= this.nx; ix++) {
         var wall = new MazeWall(this.sqSize, MazeWall.VERTICAL);
         this.walls.add(wall);
         if (ix === 0) {
            wall.setColor(Color.BLACK);
            this.squares[ix][iy].setWall(Direction.WEST, wall);
         } else if (ix === this.nx) {
            wall.setColor(Color.BLACK);
            this.squares[ix - 1][iy].setWall(Direction.EAST, wall);
         } else {
            wall.setSquares(this.squares[ix - 1][iy], this.squares[ix][iy]);
            this.squares[ix][iy].setWall(Direction.WEST, wall);
            this.squares[ix - 1][iy].setWall(Direction.EAST, wall);
         }
         this.add(wall, ix * this.sqSize - 1, iy * this.sqSize - 1);
      }
   }
   for (var ix = 0; ix <= this.nx; ix++) {
      for (var iy = 0; iy <= this.ny; iy++) {
         var corner = new GRect(2, 2);
         corner.setFilled(true);
         corner.setColor(Color.BLACK);
         this.add(corner, ix * this.sqSize - 1, iy * this.sqSize - 1);
      }
   }
   this.theseus = new GLabel("\u0398");
   this.theseus.setFont("Serif-24");
   this.add(this.theseus);
   this.setTheseusLocation(toInt((this.nx / 2)), toInt((this.ny / 2)));
   this.getWall(toInt((this.nx / 2)), this.ny - 1, Direction.SOUTH).setVisible(false);
};


/* MazeMaker.js */

var MazeMaker = function() {
   JSProgram.call(this);
   this.setTitle("MazeMaker");
   this.canvas = new MMCanvas();
   this.model = new MMModel(this.canvas);
   this.add(this.canvas, "canvas");
   this.createControlStrip();
   this.pack();
   this.model.initMaze();
   this.setVisible(true);
};

MazeMaker.prototype = 
   jslib.inheritPrototype(JSProgram, "MazeMaker extends JSProgram");
MazeMaker.prototype.constructor = MazeMaker;
MazeMaker.prototype.$class = 
   new Class("MazeMaker", MazeMaker);

MazeMaker.prototype.run = function() {
   /* Empty */
};

MazeMaker.prototype.actionPerformed = function(e) {
   var cmd = e.getActionCommand();
   if (jslib.equals(cmd, "Reset")) {
      this.model.stopAction();
      this.model.clear();
   }
};

MazeMaker.prototype.createControlStrip = function() {
   var resetControl = new ResetControl();
   resetControl.addActionListener(this);
   this.model.addControl(resetControl);
   this.addControl(resetControl);
   var runControl = new RunControl();
   this.model.addControl(runControl);
   this.addControl(runControl);
   var stepControl = new StepControl();
   this.model.addControl(stepControl);
   this.addControl(stepControl);
   var speedControl = new SpeedControl();
   this.model.addControl(speedControl);
   this.addControl(speedControl);
};

MazeMaker.main = function(args) {
   new MazeMaker().start();
};


/* MazeSquare.js */

var MazeSquare = function(size, x, y) {
   GCompound.call(this);
   var square = new GRect(size, size);
   square.setFilled(true);
   this.setColor(Color.WHITE);
   this.add(square);
   this.coordinates = new Point(x, y);
   this.walls = jslib.newArray(4);
   this.cross = new GCompound();
   var xy1 = size * (1 - MazeSquare.CROSS_FRACTION) / 2;
   var xy2 = size * (1 + MazeSquare.CROSS_FRACTION) / 2;
   this.cross.add(new GLine(xy1, xy1, xy2, xy2));
   this.cross.add(new GLine(xy1, xy2, xy2, xy1));
   this.cross.setColor(Color.RED);
   this.add(this.cross);
   this.cross.setVisible(false);
};

MazeSquare.prototype = 
   jslib.inheritPrototype(GCompound, "MazeSquare extends GCompound");
MazeSquare.prototype.constructor = MazeSquare;
MazeSquare.prototype.$class = 
   new Class("MazeSquare", MazeSquare);

MazeSquare.prototype.getCoordinates = function() {
   return this.coordinates;
};

MazeSquare.prototype.setWall = function(dir, wall) {
   this.walls[dir] = wall;
};

MazeSquare.prototype.getWall = function(dir) {
   return this.walls[dir];
};

MazeSquare.prototype.isBlocked = function(dir) {
   return this.getWall(dir).isVisible();
};

MazeSquare.prototype.mark = function() {
   this.cross.setVisible(true);
};

MazeSquare.prototype.unmark = function() {
   this.cross.setVisible(false);
};

MazeSquare.prototype.isMarked = function() {
   return this.cross.isVisible();
};

MazeSquare.CROSS_FRACTION = 0.3;

/* MazeWall.js */

var MazeWall = function(size, orientation) {
   GRect.call(this, (orientation === MazeWall.HORIZONTAL) ? size + 2 : 2, (orientation === MazeWall.HORIZONTAL) ? 2 : size + 2);
   this.setColor(Color.LIGHT_GRAY);
   this.setFilled(true);
};

MazeWall.prototype = 
   jslib.inheritPrototype(GRect, "MazeWall extends GRect");
MazeWall.prototype.constructor = MazeWall;
MazeWall.prototype.$class = 
   new Class("MazeWall", MazeWall);

MazeWall.prototype.setSquares = function(sq1, sq2) {
   this.squares = jslib.newArray(2);
   this.squares[0] = sq1;
   this.squares[1] = sq2;
};

MazeWall.prototype.getSquares = function() {
   return this.squares;
};

MazeWall.HORIZONTAL = 0;
MazeWall.VERTICAL = 1;

/* MMC.js */

var MMC = function() {
   /* Empty */
};

MMC.CANVAS_WIDTH = 800;
MMC.CANVAS_HEIGHT = 500;
MMC.SQUARE_SIZE = 40;

/* MMCanvas.js */

var MMCanvas = function() {
   GCanvas.call(this);
   this.setPreferredSize(MMC.CANVAS_WIDTH, MMC.CANVAS_HEIGHT);
};

MMCanvas.prototype = 
   jslib.inheritPrototype(GCanvas, "MMCanvas extends GCanvas");
MMCanvas.prototype.constructor = MMCanvas;
MMCanvas.prototype.$class = 
   new Class("MMCanvas", MMCanvas);

MMCanvas.prototype.actionPerformed = function(e) {
   /* Empty */
};


/* MMModel.js */

var MMModel = function(canvas) {
   Controller.call(this);
   this.canvas = canvas;
   this.setTarget(this);
};

MMModel.prototype = 
   jslib.inheritPrototype(Controller, "MMModel extends Controller");
MMModel.prototype.constructor = MMModel;
MMModel.prototype.$class = 
   new Class("MMModel", MMModel);

MMModel.prototype.initMaze = function() {
   this.nx = (toInt((this.canvas.getWidth() / MMC.SQUARE_SIZE))- 2) | 1;
   this.ny = (toInt((this.canvas.getHeight() / MMC.SQUARE_SIZE))- 2) | 1;
   var x = (this.canvas.getWidth() - this.nx * MMC.SQUARE_SIZE) / 2;
   var y = (this.canvas.getHeight() - this.ny * MMC.SQUARE_SIZE) / 2;
   this.maze = new GMaze(this.nx, this.ny, MMC.SQUARE_SIZE);
   this.canvas.add(this.maze, x, y);
   this.canvas.repaint();
};

MMModel.prototype.clear = function() {
   this.maze.reset();
   this.fsmState = MMModel.INITIAL_STATE;
};

MMModel.prototype.step = function() {
   switch (this.fsmState) {
    case MMModel.INITIAL_STATE:
      this.colorMazeRandomly();
      this.interiorWalls = this.createWallList();
      this.fsmState = MMModel.CREATING_MAZE;
      break;
    case MMModel.CREATING_MAZE:
      this.creationStep();
      break;
    case MMModel.MAZE_CREATED:
      this.colorMazeWhite();
      this.solutionStack = new Stack();
      this.current = new PathElement(this.maze.getTheseusLocation());
      this.fsmState = MMModel.SOLVING_MAZE;
      break;
    case MMModel.SOLVING_MAZE:
      this.solutionStep();
      break;
    case MMModel.MAZE_SOLVED:
      this.clear();
      break;
   }
   this.canvas.repaint();
};

MMModel.prototype.isCallable = function() {
   return false;
};

MMModel.prototype.getStackDepth = function() {
   return 0;
};

MMModel.prototype.resetAction = function() {
   this.stopAction();
   this.clear();
};

MMModel.prototype.creationStep = function() {
   var wall = this.nextWall();
   if (wall === null) {
      this.fsmState = MMModel.MAZE_CREATED;
      this.stopAction();
      return;
   }
   var squares = wall.getSquares();
   var c0 = squares[0].getColor();
   var c1 = squares[1].getColor();
   if (c0 === Color.WHITE && c1 === Color.WHITE) {
      c0 = this.createRandomColor();
      squares[0].setColor(c0);
      squares[1].setColor(c0);
      wall.setVisible(false);
   } else if (c0 === Color.WHITE) {
      squares[0].setColor(c1);
      wall.setVisible(false);
   } else if (c1 === Color.WHITE) {
      squares[1].setColor(c0);
      wall.setVisible(false);
   } else if (c0 !== c1) {
      if (Math.random() < 0.5) {
         this.maze.recolorSquares(c0, c1);
      } else {
         this.maze.recolorSquares(c1, c0);
      }
      wall.setVisible(false);
   } else {
      wall.setColor(Color.black);
   }
};

MMModel.prototype.solutionStep = function() {
   var pt = this.current.getPoint();
   if (!this.maze.isInBounds(pt.x, pt.y)) {
      this.fsmState = MMModel.MAZE_SOLVED;
      this.stopAction();
      return;
   }
   while (true) {
      var dir = this.current.getDirection();
      var next = this.current.getNextPoint();
      if (next === null) {
         this.current = this.backtrack();
         return;
      } else {
         var ok = !this.maze.isBlocked(pt.x, pt.y, dir);
         if (ok && this.maze.isInBounds(next.x, next.y) && this.maze.getSquare(next.x, next.y).isMarked()) {
            ok = false;
         }
         if (ok) {
            this.maze.getSquare(pt.x, pt.y).mark();
            this.solutionStack.push(this.current);
            this.current = new PathElement(next);
            this.maze.setTheseusLocation(next.x, next.y);
            return;
         }
      }
   }
};

MMModel.prototype.backtrack = function() {
   if (this.solutionStack.isEmpty()) {
      this.fsmState = MMModel.MAZE_SOLVED;
      this.stopAction();
      return null;
   }
   var element = this.solutionStack.pop();
   var pt = element.getPoint();
   this.maze.getSquare(pt.x, pt.y).unmark();
   this.maze.setTheseusLocation(pt.x, pt.y);
   return element;
};

MMModel.prototype.nextWall = function() {
   if (this.interiorWalls.isEmpty()) return null;
   var wall = this.interiorWalls.get(this.interiorWalls.size() - 1);
   this.interiorWalls.remove(wall);
   return wall;
};

MMModel.prototype.setNextWall = function(wall) {
   this.interiorWalls.remove(wall);
   this.interiorWalls.add(wall);
};

MMModel.prototype.colorMazeRandomly = function() {
   for (var x = 0; x < this.nx; x++) {
      for (var y = 0; y < this.ny; y++) {
         this.maze.getSquare(x, y).setColor(this.createRandomColor());
      }
   }
};

MMModel.prototype.colorMazeWhite = function() {
   for (var x = 0; x < this.nx; x++) {
      for (var y = 0; y < this.ny; y++) {
         this.maze.getSquare(x, y).setColor(Color.WHITE);
      }
   }
};

MMModel.prototype.createWallList = function() {
   var walls = this.maze.getWalls();
   var list = new ArrayList();
   for (var i = 0; i < walls.length; i++) {
      var wall = walls[i];
      if (wall.isVisible() && wall.getColor() === Color.LIGHT_GRAY) {
         list.add(wall);
      }
   }
   var n = list.size();
   for (var lh = 0; lh < n - 1; lh++) {
      var rh = lh;
      for (var i = lh + 1; i < n; i++) {
         if (this.compare(list.get(i), list.get(rh)) < 0) {
            rh = i;
         }
      }
      var tmp = list.get(lh);
      list.set(lh, list.get(rh));
      list.set(rh, tmp);
   }
   for (var i = 0; i < n; i++) {
      for (var j = 1; j < n; j++) {
         if (Math.random() < 0.5) {
            var tmp = list.get(j - 1);
            list.set(j - 1, list.get(j));
            list.set(j, tmp);
         }
      }
   }
   return list;
};

MMModel.prototype.compare = function(w1, w2) {
   return this.manhattanDistance(w1) - this.manhattanDistance(w2);
};

MMModel.prototype.manhattanDistance = function(wall) {
   var size = this.maze.getMazeSize();
   var squares = wall.getSquares();
   var sq = (squares[0] === null) ? squares[1] : squares[0];
   var pt = sq.getCoordinates();
   var dx = Math.abs(pt.x - size.width / 2);
   var dy = Math.min(Math.abs(pt.y - size.height / 2), Math.abs(pt.y - size.height));
   return dx + dy;
};

MMModel.prototype.createRandomColor = function() {
   var h = this.randomDouble(0.0, 1.0);
   var s = this.randomDouble(0.3, 0.9);
   var b = this.randomDouble(0.5, 1.0);
   var i = toInt((6 * h));
   var f = 6 * h - i;
   var p = b * (1 - s);
   var q = b * (1 - s * f);
   var t = b * (1 - s * (1 - f));
   switch (i) {
      case 0: return this.createColor(b, t, p);
      case 1: return this.createColor(q, b, p);
      case 2: return this.createColor(p, b, t);
      case 3: return this.createColor(p, q, b);
      case 4: return this.createColor(t, p, b);
      case 5: return this.createColor(b, p, q);
   }
   throw new RuntimeException("Internal error");
};

MMModel.prototype.createColor = function(r, g, b) {
   return new Color(toInt((255 * r)), toInt((255 * g)), toInt((255 * b)));
};

MMModel.prototype.randomDouble = function(min, max) {
   return min + Math.random() * (max - min);
};

MMModel.INITIAL_STATE = 0;
MMModel.CREATING_MAZE = 1;
MMModel.MAZE_CREATED = 2;
MMModel.SOLVING_MAZE = 3;
MMModel.MAZE_SOLVED = 4;
var PathElement = function(pt) {
   this.point = pt;
   this.dir = Direction.NORTH;
   this.triedAllDirections = false;
};

PathElement.prototype.getPoint = function() {
   return this.point;
};

PathElement.prototype.getDirection = function() {
   return this.dir;
};

PathElement.prototype.getNextPoint = function() {
   if (this.triedAllDirections) return null;
   var result = this.patchedAdjacentPoint(this.point, this.dir);
   this.dir = Direction.rightFrom(this.dir);
   this.triedAllDirections = (this.dir === Direction.NORTH);
   return result;
};

PathElement.prototype.patchedAdjacentPoint = function(pt, dir) {
   switch (dir) {
    case Direction.NORTH: case Direction.SOUTH:
      return Direction.adjacentPoint(pt, Direction.oppositeDirection(dir));
    default:
      return Direction.adjacentPoint(pt, dir);
   }
};


/* Exports */

return {
   GMaze : GMaze,
   MMC : MMC,
   MMModel : MMModel,
   MazeMaker : MazeMaker,
   MazeSquare : MazeSquare,
   MazeWall : MazeWall
};

});
