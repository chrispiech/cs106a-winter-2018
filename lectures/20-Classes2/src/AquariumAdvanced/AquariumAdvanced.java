/*
 * File: BlankClass.java
 * ---------------------
 * This class is a blank one that you can change at will. Remember, if you change
 * the class name, you'll need to change the filename so that it matches.
 * Then you can extend GraphicsProgram, ConsoleProgram, or DialogProgram as you like.
 */

import java.util.ArrayList;

import acm.graphics.GImage;
import acm.program.*;

public class AquariumAdvanced extends Program {
	
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

