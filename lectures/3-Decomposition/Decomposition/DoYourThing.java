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

}
