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

public class UFO extends GraphicsProgram {

	/** Size and speed of UFO */
	private static final int UFO_WIDTH = 40;
	private static final int UFO_HEIGHT = UFO_WIDTH / 2;
	private static final int UFO_SPEED = 5;

	/** Size and speed of bullets */
	private static final int BULLET_SPEED = 10;
	private static final int BULLET_DIAM = 5;

	/** Animation cycle delay */
	private static final int DELAY = 5;

	/* private instance variables */
	private GRect ufo = null;
	private boolean isUfoMovingLeft = false;
	private GOval bullet = null;

	public void run() {
		// do your thing
		setup();
		// 1. add listeners
		addMouseListeners();
		while(true) {
			//update 
			moveUfo();
			moveBullet();

			// animation loop pause
			pause(DELAY);
		}
	}

	private void moveBullet() {
		if(bullet != null) {
			bullet.move(0, -BULLET_SPEED);
			if(bullet.getY() < 0) {
				remove(bullet);
				bullet = null;
			}
		}
		
	}

	// 2. define method
	public void mousePressed(MouseEvent e) {
		if(bullet == null) {
			bullet = new GOval(BULLET_DIAM, BULLET_DIAM);
			bullet.setFilled(true);
			add(bullet, getWidth() / 2, getHeight());
		}
	}

	private void moveUfo() {
		if(!isUfoMovingLeft) {
			ufo.move(UFO_SPEED, 0);
		} else {
			ufo.move(-UFO_SPEED, 0);
		}

		if(ufo.getX() > getWidth() - UFO_WIDTH) {
			isUfoMovingLeft = true;
			ufo.move(0, UFO_HEIGHT);
		}
		if(ufo.getX() < 0) {
			isUfoMovingLeft = false;
			ufo.move(0, UFO_HEIGHT);
		}
	}

	// creates the ufo and adds it to the screen!
	private void setup() {
		ufo = new GRect(UFO_WIDTH, UFO_HEIGHT);
		ufo.setColor(Color.RED);
		ufo.setFilled(true);
		add(ufo);
	}

}