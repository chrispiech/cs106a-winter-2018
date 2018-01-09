/*
 * File: StepUp.java
 * ---------------------
 * This is our first Karel program!  Karel starts at (1, 1),
 * picks up a beeper in front of it and moves it to the
 * 2nd row, 5th column, while avoiding all walls.
 */

import stanford.karel.*;

// Define a program called StepUp
public class StepUp extends Karel {
	
	// The program starts executing from the "run" method.
	public void run() {
		move();
		pickBeeper();
		move();
		turnLeft();
		move();
		
		// This makes Karel turnRight
		turnRight();
		
		move();
		move();
		putBeeper();
		move();
	}
	
	private void turnRight() {
		turnLeft();
		turnLeft();
		turnLeft();
	}
	
	
}

