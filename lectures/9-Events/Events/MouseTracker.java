/*
 * File: MouseTracker.java
 * -----------------------------
 * A square follows the mouse around the screen
 */

import java.awt.Color;
import java.awt.event.MouseEvent;

import acm.graphics.*;
import acm.program.*;

public class MouseTracker extends GraphicsProgram {

	/* The size (in pixels) of a single hole punch */
	private static final int SQUARE_SIZE = 40;
	
	/* The color of the square */
	private static final Color SQUARE_COLOR = Color.BLUE;
	
	private GRect square = null;
	
	public void run() {	
		square = makeSquare();
		addSquareToCenter(square);
		addMouseListeners();
	}
	
	public void mouseMoved(MouseEvent e) {
		int x = e.getX();
		int y = e.getY();
		square.setLocation(x, y);
	}
	
	/**
	 * Method: Add Square To Center
	 * -------------------
	 * Adds the instance variable square to the center of the
	 * screen.
	 */
	private void addSquareToCenter(GRect square) {
		int x = (getWidth() - SQUARE_SIZE) / 2;
		int y = (getHeight() - SQUARE_SIZE) / 2;
		add(square, x, y);
	}

	/**
	 * Method: Make Square
	 * ----------------
	 * Constructs a new blue, filled square.
	 */
	private GRect makeSquare() {
		GRect square = new GRect(SQUARE_SIZE, SQUARE_SIZE);
		square.setFilled(true);
		square.setColor(SQUARE_COLOR);
		return square;
	}


}
