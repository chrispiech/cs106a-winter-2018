/*
 * File: Tank.java
 * ---------------------
 * This class extends GCanvas which means that it is a super GCanvas, 
 * with some extra methods (setUp and heartbeat).
 */

import acm.graphics.GCanvas;
import acm.graphics.GImage;

// Tank is a canvas!
public class Tank extends GCanvas {
	
	public static final int SCREEN_WIDTH = 800;
	public static final int SCREEN_HEIGHT = 600;
	private static final int N_FISH = 3;

	// executed once at the start
	public void setUp() {
		addBackground();
		addFishes();
	}

	// executed 50 times a second
	public void heartbeat() {
		// TODO: your code here
	}
	
	/******************************************************************** 
	 *                         WARNING: private                         *
	 ********************************************************************/
	
	private void addFishes() {
		for(int i = 0; i < N_FISH; i++) {
			Fish fish = new Fish();
			// put the fish on the screen
			add(fish.getImage());
		}
	}
	
	private void addBackground() {
		GImage img = new GImage("background.jpg");
		img.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
		add(img);
	}
	
}

