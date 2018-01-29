/*
 * File: DribbleCastle.java
 * ================================================================
 * A program that simulates building of a dribble castle which is
 * made by dropping sand one dribble at a time.
 */
import acm.program.*;
import acm.graphics.*;
import acm.util.*;
import java.awt.*;
import java.awt.event.*;

public class DribbleCastle extends GraphicsProgram {
	
	/* Number of dribbles to drop */
	private static final int N_DRIBBLES = 200;

	/* Preferred window size. */
	public static final int APPLICATION_WIDTH = 500;
	
	/* The delay between frames. */
	private static final double PAUSE_TIME = 1;
	
	/* How fast the dribble fall. */
	private static final double Y_VELOCITY = 7;
	
	/* The color of a dribble. */
	private static final Color SAND_COLOR = Color.ORANGE;
	
	/* The size of a dribble. */
	private static final double DRIBBLE_SIZE = 20;
	
	/* Random number generator */
	private RandomGenerator rg = new RandomGenerator();
	
	public void run() {
		for(int i = 0; i < N_DRIBBLES; i++) {
			dropOneDribble();
		}
	}
	
	/**
	 * Simulates dropping one dribble on the screen.
	 */
	private void dropOneDribble() {
		/* Create and add a new dribble. */
		GOval dribble = makeDribble();
		add(dribble);
		
		/* Move the dribble until it hits something. */
		while (!hasHitBottom(dribble) && !hasHitSomethingElse(dribble)) {
			dribble.move(0, Y_VELOCITY);
			pause(PAUSE_TIME);
		}
	}
	
	/**
	 * Given a dribble, returns whether that dribble has hit the
	 * bottom of the screen.
	 * @param dribble The dribble in question.
	 * @return Whether it's hit the bottom of the screen.
	 */
	private boolean hasHitBottom(GOval dribble) {
		double bottomY = dribble.getY() + dribble.getHeight();
		return bottomY >= getHeight();
	}
	
	/**
	 * Generates a random X coordinate at which to place the dribble.
	 */
	private double getRandomX() {
		double x = getWidth()/2 + rg.nextGaussian() * getWidth()/10;
		return x;
	}
	
	/**
	 * Creates and returns a new, randomly-positioned dribble.
	 * @return A dribble.
	 */
	private GOval makeDribble() {
		GOval result = new GOval(DRIBBLE_SIZE, DRIBBLE_SIZE);
		result.setFilled(true);
		result.setColor(SAND_COLOR);
		result.setLocation(getRandomX(), 0);
		return result;
	}
	
	/**
	 * Given a dribble, returns whether that dribble has collided
	 * with any other objects on screen.
	 * @param blob The dribble in question.
	 * @return Whether the dribble has hit anything else on screen.
	 */
	private boolean hasHitSomethingElse(GOval blob) {
		double checkX = blob.getX() + blob.getWidth() / 2.0;
		double checkY = blob.getY() + blob.getHeight() + 1;
		GObject hit = getElementAt(checkX, checkY);
		return hit != null;
	}

}