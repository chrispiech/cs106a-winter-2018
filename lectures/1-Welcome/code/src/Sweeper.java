/*
 * File: Sweeper.java
 * ---------------------
 * Karel picks up any beepers it finds to its right.
 * Assumes there is at most 1 beeper on each corner.
 */

import stanford.karel.*;

public class Sweeper extends SuperKarel {
	public void run() {
		while (frontIsClear()) {
			move();
			if (beepersPresent()) {
				pickBeeper();
			}
		}
	}
}

