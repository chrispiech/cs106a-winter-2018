/*
 * File: MoveToWall.java
 * ---------------------
 * Karel moves until it reaches a wall.
 */

import stanford.karel.*;

public class MoveToWall extends SuperKarel {
	public void run() {
		while (frontIsClear()) {
			move();
		}
	}
}