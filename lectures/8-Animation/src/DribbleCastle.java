/*
 * File: Snowfall.java
 * ================================================================
 * A program that simulates falling snow on a scene.
 */
import acm.program.*;
import acm.graphics.*;
import acm.util.*;
import java.awt.*;
import java.awt.event.*;

public class DribbleCastle extends GraphicsProgram {
	/* Preferred window size. */
	public static final int APPLICATION_WIDTH = 500;
	
	/* The delay between frames. */
	private static final double PAUSE_TIME = 1;
	
	/* How fast the snowflakes fall. */
	private static final double Y_VELOCITY = 5;
	
	/* The color of a snowflake. */
	private static final Color SAND_COLOR = Color.ORANGE;
	
	/* The size of a snowflake. */
	private static final double DRIBBLE_SIZE = 20;
	
	public void run() {
		for(int i = 0; i < 200; i++) {
			dropOneSnowflake();
		}
	}
	
	/**
	 * Given a snowflake, returns whether that snowflake has hit the
	 * bottom of the screen.
	 *
	 * @param snowflake The snowflake in question.
	 * @return Whether it's hit the bottom of the screen.
	 */
	private boolean hasHitBottom(GOval snowflake) {
		double bottomY = snowflake.getY() + snowflake.getHeight();
		return bottomY >= getHeight();
	}
	
	/**
	 * Given a snowflake, generates a random X coordinate at which to
	 * place that snowflake.
	 *
	 * @param snowflake The snowflake in question.
	 * @return A random X coordinate for that snowflake.
	 */
	private double getRandomX(GOval snowflake) {
		RandomGenerator rgen = RandomGenerator.getInstance();
		double x = getWidth()/2 + rgen.nextGaussian() * getWidth()/8;
		return x;
	}
	
	/**
	 * Creates and returns a new, randomly-positioned snowflake.
	 *
	 * @return A snowflake.
	 */
	private GOval makeSnowflake() {
		GOval result = new GOval(DRIBBLE_SIZE, DRIBBLE_SIZE);
		result.setFilled(true);
		result.setColor(SAND_COLOR);
		result.setLocation(getRandomX(result), 0);
		return result;
	}
	
	/**
	 * Given a snowflake, returns whether that snowflake has collided
	 * with any other objects on screen.
	 *
	 * @param snowflake The snowflake in question.
	 * @return Whether the snowflake has hit anything else on screen.
	 */
	private boolean hasHitSomethingElse(GOval snowflake) {
		GObject hit =
		  getElementAt(snowflake.getX() + snowflake.getWidth() / 2.0,
				       snowflake.getY() + snowflake.getHeight() + 1);
		return hit != null;
	}
	
	/**
	 * Simulates dropping one snowflake on the screen.
	 */
	private void dropOneSnowflake() {
		/* Create and add the snowflake. */
		GOval snowflake = makeSnowflake();
		add(snowflake);
		
		/* Move the snowflake until it hits something. */
		while (!hasHitBottom(snowflake) && !hasHitSomethingElse(snowflake)) {
			snowflake.move(0, Y_VELOCITY);
			pause(PAUSE_TIME);
		}
	}
}