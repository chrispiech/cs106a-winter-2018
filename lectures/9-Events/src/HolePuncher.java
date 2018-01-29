/*
 * File: HolePuncher.java
 * -----------------------------
 * Draws a small circle where the user clicks
 */

import java.awt.Color;
import java.awt.event.MouseEvent;

import acm.graphics.*;
import acm.program.*;
import acm.util.RandomGenerator;

public class HolePuncher extends GraphicsProgram {

	/* The size (in pixels) of a single hole punch */
	private static final int HOLE_SIZE = 15;
	
	public void run() {	
		// 1. You have to add "mouse listener"
		addMouseListeners();
	}
	
	
	// 2. You have to define a mouse method
	// and it has to have exactly this "prototype"
	public void mouseClicked(MouseEvent e) {
		
		// 3. You can use the mouse event variable to get
		// the location of the mouse
		int x = e.getX();
		int y = e.getY();
		
		// 4. You can do something in response to the event
		addHole(x, y);
	}

	/**
	 * Method: Add Hole
	 * ----------------
	 * Places a black circle which is centered around the given
	 * parameters.
	 * @param centerX, the x pixel coordinate for the circle center 
	 * @param centerY, the y pixel coordinate for the circle center
	 */
	private void addHole(int centerX, int centerY) {
		GOval hole = new GOval(HOLE_SIZE, HOLE_SIZE);
		hole.setFilled(true);
		add(hole, centerX - HOLE_SIZE/2, centerY - HOLE_SIZE/2);
	}

}
