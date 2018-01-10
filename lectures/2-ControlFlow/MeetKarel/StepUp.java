/*
 * File: PaintByBeeper.java
 * ----------------------------
 * This program makes karel pick up a beeper and
 * place it on a ledge (where it will be safe).
 */

import stanford.karel.*;

public class StepUp extends Karel {
	
	/**
	 * Method: Run
	 * ------------------
	 * Program execution starts here.
	 */
	public void run() {
		move();
		pickBeeper();
		turnLeft();
		move();
		
		// turn right
		turnRight();
		
		move();
		putBeeper();
		move();
	}
	
	/**
	 * Method: Turn Right
	 * ------------------
	 * Our first user defined method.
	 */
	public void turnRight() {
		turnLeft();
		turnLeft();
		turnLeft();
	}
	
	
}
