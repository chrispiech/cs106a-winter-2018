/*
 * File: CatchMeIfYouCan.java
 * -----------------------------
 * Makes a program with one magic blue square and many
 * distractors. The user tries (in vain) to touch the
 * blue square with her mouse.
 */

import java.awt.Color;
import java.awt.event.MouseEvent;

import acm.graphics.*;
import acm.program.*;
import acm.util.RandomGenerator;

public class CatchMeIfYouCan extends GraphicsProgram {

	private static final int DISTRACTOR_SIZE = 40;
	private static final int SQ_SIZE = 45;
	private static final int N_DISTRACTORS = 50;
	
	// A new type of variable that can make random numbers
	private RandomGenerator rg = new RandomGenerator();
	
	public void run() {
		addDistractors();
	}
	
	private void addDistractors() {
		for(int i = 0; i < N_DISTRACTORS; i++) {
			addDistractor();
		}
	}

	// Adds a single distractor at a random location.
	private void addDistractor() {
		GRect r = new GRect(DISTRACTOR_SIZE, DISTRACTOR_SIZE);
		r.setFilled(true);
		
		// Get a random number between 0 and maxX - 1
		int maxX = getWidth() - DISTRACTOR_SIZE;
		int x = rg.nextInt(maxX);
		
		// Get a random number between 0 and maxY - 1
		int maxY = getHeight() - DISTRACTOR_SIZE;
		int y = rg.nextInt(maxY);
		
		add(r, x, y);
	}
	
}
