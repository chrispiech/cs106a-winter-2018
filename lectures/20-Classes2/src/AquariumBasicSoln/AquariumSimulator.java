/*
 * File: AquariumSimulator.java
 * ---------------------
 */

import acm.program.*;

public class AquariumSimulator extends Program {
	
	// The animation constant.
	private static final double DELAY = 1000.0 / 50;

	// The aquarium "has a" fishTank
	private Tank fishTank = new Tank();
	
	public void run() {
		// sets the size of the screen
		setSize(Tank.SCREEN_WIDTH, Tank.SCREEN_HEIGHT);
		
		// adds the fishtank (which is a GCanvas) to the screen
		add(fishTank);
		
		// calls a public method "init" on the fishTank
		fishTank.init();
		
		// animates the fishTank
		while(true) {
			fishTank.heartbeat();
			pause(DELAY);
		}
	}
}

