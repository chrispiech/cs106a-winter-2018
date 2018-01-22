/*
 * File: CheckerBoard.java
 * -----------------
 * Draws a checkerboard with alternating black and white tiles.
 */

import acm.graphics.*;
import acm.program.*;
import java.awt.*;

public class CheckerboardSoln extends GraphicsProgram {	

	/* The size of a single square on the board */
	private static final int SQUARE_SIZE = 50;
	
	/* Number of rows */
	private static final int NROWS = 8;
	
	/* Number of cols */
	private static final int NCOLS = 8;

	public void run() {
		for(int r = 0; r < NROWS; r++) {
			for(int c = 0; c < NCOLS; c++) {
				double x = c * SQUARE_SIZE;
				double y = r * SQUARE_SIZE;
				GRect square = new GRect(SQUARE_SIZE, SQUARE_SIZE);
				// in this line we evaluate a boolean which we pass
				// to set filled. Filled if the row + col is odd
				square.setFilled((r + c) % 2 != 0);
				add(square, x, y);
			}
		}
	}
}
