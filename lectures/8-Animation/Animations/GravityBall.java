/*
 * File: GravityBall.java
 * -----------------------------
 * Has a ball bounce around the screen and applies a downward
 * force on the ball (gravity).
 */

import java.awt.Color;

import acm.graphics.*;
import acm.program.*;

public class GravityBall extends GraphicsProgram {

	/* How many ms to pause between "heartbeats" */
	private static final int DELAY = 2;
	/* How much to reduce velocity after a collision */
	private static final double DAMPING = 0.85;
	/* Initial speed in the x direction */
	private static final double INITIAL_VY = 1;
	/* Initial speed in the y direction */
	private static final double INITIAL_VX = 2;
	/* The amount of acceleration in the y direction */
	private static final double DELTA_VY = 0.05;
	/* The size of the ball (in pixels) */
	private static final int BALL_RADIUS = 15;
	/* The color of the ball */
	private static final Color BALL_COLOR = Color.BLUE;
	/* The damping from the force of static friction */
	private static final double STATIC_FRICTION = 0.05;
	/* The damping from the force of friction */
	private static final double FRICTION = 0.999;

	public void run() {	
		GOval ball = makeBall();
		waitForClick();
		double vx = INITIAL_VX;
		double vy = INITIAL_VY;
		while(true) {
			// update vizualization
			ball.move(vx, vy);
			vy += DELTA_VY;

			// update parameters
			if(hitLeftWall(ball, vx) || hitRightWall(ball, vx)) {
				vx = -(vx * DAMPING);
			}
			if(hitTopWall(ball, vy)) {
				vy = -(vy * DAMPING);
			}
			if(hitBottomWall(ball, vy)) {
				vy = -(vy * DAMPING);
				// if the ball is rolling on the ground.
				if(Math.abs(vy) < 0.5) {
					vy = 0.0;
					vx = vx * FRICTION;
					if(Math.abs(vx) < STATIC_FRICTION) {
						vx = 0.0;
					}
				}
			}

			// pause
			pause(DELAY);
		}
	}

	/**
	 * Method: Hit Bottom Wall
	 * -----------------------
	 * Returns whether or not the given ball should bounce off
	 * of the bottom wall of the window.
	 */
	private boolean hitBottomWall(GOval ball, double vy) {
		if(vy < 0) return false;
		return ball.getY() > getHeight() - ball.getHeight();
	}

	/**
	 * Method: Hit Top Wall
	 * -----------------------
	 * Returns whether or not the given ball should bounce off
	 * of the top wall of the window.
	 */
	private boolean hitTopWall(GOval ball, double vy) {
		if(vy > 0) return false;
		return ball.getY() <= 0;
	}

	/**
	 * Method: Hit Right Wall
	 * -----------------------
	 * Returns whether or not the given ball should bounce off
	 * of the right wall of the window.
	 */
	private boolean hitRightWall(GOval ball, double vx) {
		if(vx < 0) return false;
		return ball.getX() >= getWidth() - ball.getWidth();
	}

	/**
	 * Method: Hit Left Wall
	 * -----------------------
	 * Returns whether or not the given ball should bounce off
	 * of the left wall of the window.
	 */
	private boolean hitLeftWall(GOval ball, double vx) {
		if(vx > 0) return false;
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
		add(r, 0, 0);
		return r;
	}

}
