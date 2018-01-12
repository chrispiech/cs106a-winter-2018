import java.awt.Color;

import stanford.karel.*;

public class RandomPainter extends SuperKarel {

	public void run() {
		while(leftIsClear()) {
			paintRow();
			changeRow();
			// post: karel is on the next
			// row FACING EAST!!!
		}
		paintRow();
	}
	
	// pre: karel is at the end of a row
	// post: karel is at the start of a
	// next row, facing east!
	private void changeRow() {
		returnToStart();
		turnRight();
		move();
		turnRight();
	}

	// Karel turns around and goes to the
	// start of the same row.
	// pre: karel at end of row facing East
	// post: karel at start of row facing West
	private void returnToStart() {
		turnAround();
		moveToWall();
	}

	// Karel moves until she hits a wall.
	private void moveToWall() {
		while(frontIsClear()) {
			move();
		}
	}

	// completely fills the current row with color
	// pre: karel is facing an empty row
	// post: karel is at the end of the row and it
	// has color
	private void paintRow() {
		while(frontIsClear()){
			paintSquare();
			move();
		}
		paintSquare();
	}

	// paints a single square either green or blue
	// pre: no color
	// post: color!!!
	private void paintSquare() {
		if(random()) {
			paintCorner(Color.BLUE);
		} else {
			paintCorner(Color.GREEN);
		}
	}

}
