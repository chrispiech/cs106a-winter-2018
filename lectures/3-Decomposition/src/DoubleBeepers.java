/*
 * File: DoubleBeepers.java
 * ------------------------
 * Karel doubles the number of beepers on the corner directly
 * in front of him in the world.  He then returns to his
 * original position/orientation.
 */

import stanford.karel.SuperKarel;

public class DoubleBeepers extends SuperKarel {

	public void run() {
		move();
		doubleBeeperPile();
		moveBackwards();
	}

	private void doubleBeeperPile() {
		while(beepersPresent()) {
			pickBeeper();
			putTwoBeepersNextDoor();
		}
		moveNextDoorPileBack();
	}

	private void moveNextDoorPileBack() {
		move();
		while(beepersPresent()) {
			pickBeeper();
			moveBackwards();
			putBeeper();
			move();
		}
		moveBackwards();
	}

	private void putTwoBeepersNextDoor() {
		move();
		putBeeper();
		putBeeper();
		moveBackwards();
	}

	private void moveBackwards() {
		turnAround();
		move();
		turnAround();
	}


}
