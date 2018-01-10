/*
 * File: BeeperLine.java
 * ----------------------------
 * This program shows you how to repeat when you
 * don't know how many times.
 */

import stanford.karel.*;

public class BeeperLine extends SuperKarel {

	/**
	 * Method: Run
	 * ------------------
	 * Program execution starts here.
	 */
	public void run() {
		while(frontIsClear()) {
			putBeeper();
			move();
		}
		// need one extra put!
		putBeeper();
	}
}
