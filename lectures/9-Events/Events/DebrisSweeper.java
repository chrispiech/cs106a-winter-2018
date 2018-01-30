/*
 * File: Debris Sweeper.java
 * -----------------------------
 * Makes a bunch of debris (govals) and the user removes
 * them by clicking on them. Program does not crash if the
 * user clicks on empty space.
 */

import java.awt.event.MouseEvent;
import acm.graphics.*;
import acm.program.*;
import acm.util.RandomGenerator;

public class DebrisSweeper extends GraphicsProgram {

	private static final int N_DEBRIS = 100;
	private static final int DEBRIS_MAX_WIDTH = 200;
	private static final int DEBRIS_MAX_HEIGHT = 200;
	
	// special variable to create random numbers
	private RandomGenerator rg = new RandomGenerator();
	
	public void run() {	
		makeDebris();
		addMouseListeners();
	}
	
	// Called when the mouse is clicked
	public void mouseClicked(MouseEvent e) {
		double mouseX = e.getX();
		double mouseY = e.getY();
		GObject clicked = getElementAt(mouseX, mouseY);
		if(clicked != null) {
			remove(clicked);
		}
		
	}
	
	private void makeDebris() {
		for(int i = 0; i < N_DEBRIS; i++) {
			makeSingleDebris();
		}
	}

	// Makes a single piece of debris. Fits inside the 
	// screen, has a random width, random height, random
	// location and a random color.
	private void makeSingleDebris() {
		int w = rg.nextInt(DEBRIS_MAX_WIDTH);
		int h = rg.nextInt(DEBRIS_MAX_HEIGHT);
		int x = rg.nextInt(getWidth() - w);
		int y = rg.nextInt(getHeight() - h);
		GOval debris = new GOval(w, h);
		debris.setFilled(true);
		debris.setColor(rg.nextColor());
		add(debris, x, y);
	}

}
