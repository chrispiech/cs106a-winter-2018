/*
 * File: GravityBall.java
 * -----------------------------
 * Has a ball bounce around the screen and applies a downward
 * force on the ball (gravity).
 */

import java.awt.Color;

import acm.graphics.*;
import acm.program.*;

public class BouncingBallSoln extends GraphicsProgram {

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
		double vx = INITIAL_VX;
		double vy = INITIAL_VY;
		
		waitForClick();
		while(true) {

			// update velocity
			if(hitLeftWall(ball) || hitRightWall(ball)) {
				vx = -vx;
			}
			if(hitTopWall(ball) || hitBottomWall(ball)) {
				vy = -vy;
			}

			// update visualization
			ball.move(vx, vy);

			// pause
			pause(DELAY);
		}
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

	/**
	 * Method: Hit Bottom Wall
	 * -----------------------
	 * Returns whether or not the given ball should bounce off
	 * of the bottom wall of the window.
	 */
	private boolean hitBottomWall(GOval ball) {
		return ball.getY() > getHeight() - ball.getHeight();
	}

	/**
	 * Method: Hit Top Wall
	 * -----------------------
	 * Returns whether or not the given ball should bounce off
	 * of the top wall of the window.
	 */
	private boolean hitTopWall(GOval ball) {
		return ball.getY() <= 0;
	}

	/**
	 * Method: Hit Right Wall
	 * -----------------------
	 * Returns whether or not the given ball should bounce off
	 * of the right wall of the window.
	 */
	private boolean hitRightWall(GOval ball) {
		return ball.getX() >= getWidth() - ball.getWidth();
	}

	/**
	 * Method: Hit Left Wall
	 * -----------------------
	 * Returns whether or not the given ball should bounce off
	 * of the left wall of the window.
	 */
	private boolean hitLeftWall(GOval ball) {
		return ball.getX() <= 0;
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

}
