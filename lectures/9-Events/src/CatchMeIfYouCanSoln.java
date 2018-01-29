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

public class CatchMeIfYouCanSoln extends GraphicsProgram {

	private static final int DISTRACTOR_SIZE = 40;
	private static final int SQ_SIZE = 45;
	private static final int N_DISTRACTORS = 50;
	
	// A new type of variable that can make random numbers
	private RandomGenerator rg = new RandomGenerator();
	
	private GRect blueSquare = null;
	
	public void run() {	
		addMouseListeners();
		addBlueSquare();
		addDistractors();
	}
	
	public void mouseMoved(MouseEvent e) {
		GObject obj = getElementAt(e.getX(), e.getY());
		if(obj == blueSquare) {
			int x = getRandomX(SQ_SIZE);
			int y = getRandomY(SQ_SIZE);
			blueSquare.setLocation(x, y);
		}
	}
	
	private void addBlueSquare() {
		blueSquare = new GRect(SQ_SIZE, SQ_SIZE);
		blueSquare.setFilled(true);
		blueSquare.setColor(Color.BLUE);
		int x = getRandomX(SQ_SIZE);
		int y = getRandomY(SQ_SIZE);
		add(blueSquare, x, y);
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
		int x = getRandomX(DISTRACTOR_SIZE);
		int y = getRandomY(DISTRACTOR_SIZE);
		add(r, x, y);
	}

	private int getRandomY(int size) {
		return rg.nextInt(getHeight() - size);
	}

	private int getRandomX(int size) {
		return rg.nextInt(getWidth() - size);
	}

}
