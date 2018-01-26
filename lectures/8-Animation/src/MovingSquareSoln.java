/*
 * File: DrawFlag.java
 * -----------------------------
 * Draws various flags from around the world (that have
 * only horizontal bands)
 */

import java.awt.Color;

import acm.graphics.*;
import acm.program.*;

public class MovingSquareSoln extends GraphicsProgram {

	// ms to pause between heart-beats
	private static final int DELAY = 5;
	// width and the height of our moving square
	private static final int SQUARE_SIZE = 100;

	public void run() {	
		// setup
		GRect square = makeSquare();
		while(!isPastCenter(square)) {
			// update world
			square.move(1, 0);
			// pause
			pause(DELAY);
		}
	}

	// test if the rectangle given is in the right
	// half of the screen.
	private boolean isPastCenter(GRect rect) {
		double currX = rect.getX();
		double maxX = getWidth()/2 - SQUARE_SIZE/2;
		return currX > maxX;
	}

	// Make a square and add it to the screen. 
	// Return the square so that the caller can animate it!
	private GRect makeSquare() {
		double x = 0;
		double y = getHeight()/2 - SQUARE_SIZE/2;
		GRect rect = new GRect(x, y, SQUARE_SIZE, SQUARE_SIZE);
		rect.setFilled(true);
		rect.setFillColor(Color.BLUE);
		add(rect);
		return rect;
	}

}
