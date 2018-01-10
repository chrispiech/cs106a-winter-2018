/*
 * File: PaintByBeeper.java
 * ----------------------------
 * This program implements the paint by beeper program as
 * described in lecture 2 of CS106A.
 */

import stanford.karel.*;

public class PaintByBeeper extends SuperKarel {

	/**
	 * Method: Run
	 * --------------------
	 * Execution starts here
	 */
	public void run() {
		while(frontIsClear()) {
			colorCorner();
			move();
		}
		colorCorner();
	}

	/**
	 * Method: Color Corner
	 * --------------------
	 * This method paints a corner based on whether
	 * or not a beeper was present. If a beeper is
	 * present, paint the corner blue. Otherwise, paint
	 * the corner green.
	 * Precondition: the corner may have a beeper
	 * Postcondition: the corner is painted and 
	 *     any beepers are picked up
	 */
	private void colorCorner() {
		if(beepersPresent()) {
			paintCorner(BLUE);
			pickBeeper();
		} else {
			paintCorner(GREEN);
		}
	}

}
