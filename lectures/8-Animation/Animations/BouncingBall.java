/*
 * File: GravityBall.java
 * -----------------------------
 * Has a ball bounce around the screen and applies a downward
 * force on the ball (gravity).
 */

import java.awt.Color;

import acm.graphics.*;
import acm.program.*;

public class BouncingBall extends GraphicsProgram {

	/* How many ms to pause between "heartbeats" */
	private static final int DELAY = 2;
	/* Initial speed in the x direction */
	private static final double INITIAL_VY = 2;
	/* Initial speed in the y direction */
	private static final double INITIAL_VX = 2;
	/* The size of the ball (in pixels) */
	private static final int BALL_RADIUS = 15;
	/* The color of the ball */
	private static final Color BALL_COLOR = Color.BLUE;

	public void run() {	
		// setup
		GOval ball = makeBall();
		
		waitForClick();
		double vx = 1;
		double vy = 1;
		
		while(true) {
			// update world
			ball.move(vx,vy);
			
			if(ball.getY() > getHeight() - ball.getHeight()) {
				vy = -vy;
			}
			
			// pause
			pause(DELAY);
		}
	}
	
	/**
	 * Method: Make Ball
	 * -----------------------
	 * Creates a ball, adds it to the screen, and returns it so
	 * that the ball can be used for animation.
	 */
	public GOval makeBall() {
		double size = BALL_RADIUS * 2;
		GOval r = new GOval(size, size);
		r.setFilled(true);
		r.setColor(BALL_COLOR);
		add(r, 1, 1);
		return r;
	}
	
	/**
	 * Method: Make Shadow
	 * -----------------------
	 * Leave a shadow of a ball everywhere it has been so that we
	 * can make pretty screenshots.
	 */
	private void makeShadow(GOval ball) {
		GOval shadow = new GOval(ball.getWidth(), ball.getHeight());
		shadow.setColor(Color.LIGHT_GRAY);
		shadow.setFilled(true);
		add(shadow, ball.getX(), ball.getY());
		shadow.sendToBack();
	}
}
