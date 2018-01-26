/*
 * File: DrawFlag.java
 * -----------------------------
 * Draws various flags from around the world (that have
 * only horizontal bands)
 */

import java.awt.Color;

import acm.graphics.*;
import acm.program.*;

public class MovingSquare extends GraphicsProgram {

	private static final int DELAY = 5;
	private static final int SQUARE_SIZE = 100;

	public void run() {	
		// setup
		GRect r = makeSquare();
		
	}

	/**
	 * Method: Make Square
	 * -----------------------
	 * Creates a square of size SQUARE_SIZE and adds it 
	 * to the screen center-left.
	 */
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
