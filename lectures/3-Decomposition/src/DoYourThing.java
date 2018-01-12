/*
 * File: DoubleBeepers.java
 * ------------------------
 * Karel doubles the number of beepers on the corner directly
 * in front of him in the world.  He then returns to his
 * original position/orientation.
 */

import stanford.karel.SuperKarel;

public class DoYourThing extends SuperKarel {

	public void run() {
		move();
		while (beepersPresent()) {
		pickBeeper();
		move();
		putBeeper();
		putBeeper();
		turnAround();
		move();
		turnAround();
		}
		move();
		while (beepersPresent()) {
		pickBeeper();
		turnAround();
		move();
	turnAround();
		putBeeper();
		move();
			}
			turnAround();
		move();
		turnAround();
		turnAround();
		move();
		turnAround();
	}


	/*
	 * Place two beepers on corner one avenue ahead of Karel
	 * and move back to starting position/orientation
	 */
	private void putTwoBeepersNextDoor() {
		
	}


	/*
	 * Move all the beepers on the corner in front of Karel
	 * the the corner Karel is currently on.
	 */
	private void movePileNextDoorBack() {
		move();
		while (beepersPresent()) {
			moveOneBeeperBack();
		}
		moveBackward();
	}



	/*
	 * Move one beeper from the current corner back one avenue
	 * and return to the original position/orientation.
	 */
	private void moveOneBeeperBack() {
		
	}


	/*
	 * Move Karel back one avenue, but have the same 
	 * final orientation.
	 */
	private void moveBackward() {
		turnAround();
		move();
		turnAround();
	}

}
