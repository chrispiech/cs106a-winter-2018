/*
 * File: BeeperRow.java
 * ---------------------
 * Karel puts down beepers in a row until it reaches a wall.
 */

import stanford.karel.*;

public class BeeperRow extends SuperKarel {
	public void run() {
		putBeeper();
		while (frontIsClear()) {
			move();
			putBeeper();
		}
	}
}