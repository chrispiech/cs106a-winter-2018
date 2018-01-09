/*
 * File: PlaceFiveBeepers.java
 * ---------------------
 * Karel places 99 beepers on the square in front of it, and then moves.
 */

import stanford.karel.*;

public class Place99Beepers extends SuperKarel {
	public void run() {
		move();
		for (int i = 0; i < 99; i++) {
			putBeeper();
		}
		move();
	}
}
