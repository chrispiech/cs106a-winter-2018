/*
 * File: DrawFlag.java
 * -----------------------------
 * Draws various flags from around the world (that have
 * only horizontal bands)
 */

import java.awt.Color;

import acm.graphics.*;
import acm.program.*;

public class DrawFlags extends GraphicsProgram {

	public void run() {		
		GRect r = new GRect(0, 0, 50, 50);
		
		
		drawColombiasFlag();
		pause(1000); // waits one second
		
		drawIndonesiasFlag();
		pause(1000); // waits one second
		
		drawNetherlandsFlag();
	}

	/**
	 * Method: Draw Netherlands
	 * ----------------------
	 * Draws a full screen Dutch flag
	 */
	private void drawNetherlandsFlag() {
		drawHorizontalStripe(Color.RED, 0);
		drawHorizontalStripe(Color.WHITE, 0.33);
		drawHorizontalStripe(Color.BLUE, 0.66);
	}
	
	/**
	 * Method: Draw Indonesia
	 * ----------------------
	 * Draws a full screen Indonesian flag
	 */
	private void drawIndonesiasFlag() {
		drawHorizontalStripe(Color.RED, 0);
		drawHorizontalStripe(Color.WHITE, 0.5);
	}
	
	/**
	 * Method: Draw Colombia
	 * ----------------------
	 * Draws a full screen Colombian flag
	 */
	private void drawColombiasFlag() {
		drawHorizontalStripe(Color.YELLOW, 0);
		drawHorizontalStripe(Color.BLUE, 0.5);
		drawHorizontalStripe(Color.RED, 0.75);
	}

	/**
	 * Method: Draw Horizontal Stripe
	 * ----------------------
	 * Draws a a horizontal stripe of a given color. The stripe starts
	 * a given fraction down the screen and extends to the bottom of the 
	 * screen.
	 * 
	 * Precondition: all strips above have been drawn 
	 * Usage: drawHorizontalBand(Color.BLUE, 1.0/3);
	 * This example draws a blue band a third of the way down the screen
	 */
	private void drawHorizontalStripe(Color color, double fractionDown) {
		double y = getHeight() * fractionDown;
		GRect rect = new GRect(0, y, getWidth(), getHeight() - y);
		rect.setColor(color);
		rect.setFilled(true);
		add(rect);
	}


}
