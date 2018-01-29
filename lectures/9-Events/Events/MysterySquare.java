/*
 * File: MysterySquare.java
 * -----------------------------
 * What color will it be next?! I don't know. Wow. What
 * a mystery...
 */

import java.awt.Color;

import acm.graphics.*;
import acm.program.*;
import acm.util.RandomGenerator;

public class MysterySquare extends GraphicsProgram {

	private static final int DELAY = 1000;
	private static final int SQUARE_SIZE = 400;
	
	private RandomGenerator rg = new RandomGenerator();
	
	public void run() {
		GRect r = makeRect();
		add(r, getSquareX(), getSquareY());
		waitForClick();
		while(true) {
			// update the world
			Color nextColor = rg.nextColor();
			r.setColor(nextColor);
			
			// pause
			pause(DELAY);
		}
	}

	private GRect makeRect() {
		GRect r = new GRect(SQUARE_SIZE, SQUARE_SIZE);
		r.setFilled(true);
		r.setColor(Color.BLUE);
		return r;
	}
	
	private double getSquareX() {
		return (getWidth() - SQUARE_SIZE) /2;
	}
	
	private double getSquareY() {
		return (getHeight() - SQUARE_SIZE) / 2;
	}

}
