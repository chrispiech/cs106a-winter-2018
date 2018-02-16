/*
 * File: DrawFlag.java
 * -----------------------------
 * Draws various flags from around the world (that have
 * only horizontal bands)
 */

import java.awt.Color;

import acm.graphics.*;
import acm.program.*;
import acm.util.RandomGenerator;

public class SuratSoln extends GraphicsProgram {

	private static final int NUM_POINTS = 15000;
	private static final int CIRCLE_RADIUS = 7; // 6 is good
	RandomGenerator rgen = new RandomGenerator();

	private static final String IMG_NAME = "greenEyes.jpg";
	
	public void run() {	
		setBackground(Color.BLACK);
		
		GImage img = new GImage(IMG_NAME);
		int[][] pixels = img.getPixelArray();
		for(int i = 0; i < NUM_POINTS; i++) {
			int c = rgen.nextInt(pixels[0].length);
			int r = rgen.nextInt(pixels.length);
			int rgb = pixels[r][c];
			Color color = new Color(rgb);
			addColoredCircle(r, c, color);
			if(i < 2000) pause(1);
		}
	}

	private void addColoredCircle(int row, int col, Color c) {
		double size = CIRCLE_RADIUS * 2;
		GOval oval = new GOval(size, size);
		oval.setFilled(true);
		oval.setColor(c);
		add(oval, col - CIRCLE_RADIUS, row - CIRCLE_RADIUS);
	}

	public static final int APPLICATION_WIDTH = 800;
	public static final int APPLICATION_HEIGHT = 600;

}
