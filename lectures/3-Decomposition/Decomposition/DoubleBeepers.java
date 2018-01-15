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
		moveToPile();
		makeDoublePile();
		returnNeighborPile();
	}
	
	private void returnNeighborPile() {
		move();
		while(beepersPresent()) {
			pickBeeper();
			putBeeperBehind();
		}
	}

	private void putBeeperBehind() {
		moveBackwards();
		putBeeper();
		move();
	}

	private void makeDoublePile() {
		while(beepersPresent()) {
			pickBeeper();
			putTwoNextDoor();
			moveBackwards();
		}
	}

	private void moveBackwards() {
		turnAround();
		move();
		turnAround();
	}

	private void putTwoNextDoor() {
		move();
		putBeeper();
		putBeeper();
	}

	private void moveToPile() {
		move();
	}
	


}
