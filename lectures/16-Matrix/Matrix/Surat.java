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

public class Surat extends GraphicsProgram {

	private static final int NUM_POINTS = 30000;
	private static final int CIRCLE_RADIUS = 6;
	RandomGenerator rg = new RandomGenerator();

	private static final String IMG_NAME = "greenEyes.jpg";

	public void run() {	
		setBackground(Color.BLACK);

		// make a new GImage
		GImage img = new GImage(IMG_NAME);

		// get the matrix of pixels for the image
		int[][] pixels = img.getPixelArray();

		// just for understanding
		add(img, 0, 0);
		addColoredCircle(20, 20, Color.BLUE);
		printMatrix(pixels);

		// make the surat filter image
		// TODO: implement
	}

	private void addColoredCircle(int row, int col, Color c) {
		double size = CIRCLE_RADIUS * 2;
		GOval oval = new GOval(size, size);
		oval.setFilled(true);
		oval.setColor(c);
		add(oval, col - CIRCLE_RADIUS, row - CIRCLE_RADIUS);
	}

	private void printMatrix(int[][] matrix) {
		println("Num rows: " + matrix.length);
		println("Num cols: " + matrix[0].length);
		println("[");
		// print the first three rows
		for(int r = 0; r < 3; r++) {
			printRow(matrix[r]);
		}
		println(" ...");
		// print the last three rows
		for(int r = matrix.length - 3; r < matrix.length; r++) {
			printRow(matrix[r]);
		}
		println("]");
	}

	private void printRow(int[] row) {
		String line = "";
		// print first three elems
		for(int c = 0; c < 3; c++) {
			line += row[c];
			line += ", ";
		}
		line += "...";
		// print last three elems
		for(int c = row.length - 3; c < row.length; c++) {
			if(c != 0) line += ", ";
			line += row[c];
		}
		println(" [" + line + "],");
	}

	public static final int APPLICATION_WIDTH = 800;
	public static final int APPLICATION_HEIGHT = 600;

}
