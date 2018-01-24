/*
 * File: CheckerBoard.java
 * -----------------
 * Draws a checkerboard with alternating black and white tiles.
 */

import acm.graphics.*;
import acm.program.*;
import java.awt.*;

public class Checkerboard extends GraphicsProgram {	

	/* The size of a single square on the board */
	private static final int SQUARE_SIZE = 50;

	/* Number of rows */
	private static final int NROWS = 8;

	/* Number of cols */
	private static final int NCOLS = 8;

	public void run() {

		for(int row = 0; row < NROWS; row ++) {

			// how can i repeat this 8 times, one for each row??!!!??!!!
			for(int col = 0; col < NCOLS; col++) {
				int x = col * SQUARE_SIZE;
				int y = row * SQUARE_SIZE;
				GRect rect = new GRect(x, y, SQUARE_SIZE, SQUARE_SIZE);

				if((row + col) % 2 == 0) {
					rect.setFilled(true);
				}

				add(rect);
			}
		}

	}
}
