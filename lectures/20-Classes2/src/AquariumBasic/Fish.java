import acm.graphics.*;
import acm.util.RandomGenerator;

public class Fish {

	// A constant which controls how much the fish moves each heartbeat
	private static final double MOVE_AMT = 3.0;

	// Each fish has its own GImage
	private GImage img = null;

	/**
	 * Constructor: Fish
	 * When you make a new fish, load the image
	 */
	public Fish() {
		// TODO: your code here...
	}

	/**
	 * Public Method: Get Image
	 * Return the fish's GImage.
	 */
	public GImage getImage() {
		// TODO: your code here...
		return null;
	}

	/**
	 * Public Method: Heartbeat
	 * Allow the fish to move slightly
	 */
	public void heartbeat() {
		// TODO: your code here
	}

	/******************************************************************** 
	 *                         WARNING: private                         *
	 ********************************************************************/

	/**
	 * Method: Move Toward Goal
	 * -----------------
	 * Move the fish image MOVE_AMT number of pixels in the
	 * straight line between where the image currently is, and
	 * the point passed in. Returns whether or not the fish has arrived
	 */
	private boolean moveTowardsPoint(GPoint pt) {
		double dy = pt.getY() - img.getY();
		double dx = pt.getX() - img.getX();
		double dist = Math.sqrt(dx * dx + dy * dy);
		boolean arrived = false;
		if(dist > MOVE_AMT) {
			// move MOVE_AMT pixels towards the goal
			double moveX = MOVE_AMT / dist * dx;
			double moveY = MOVE_AMT / dist * dy;
			img.move(moveX, moveY);
		} else {
			// you reached your goal! You no longer have a goal.
			arrived = true;
		}
		return arrived;
	}

	/**
	 * Method: Get Random Goal
	 * -----------------
	 * Returns a random point in the screen
	 */
	private GPoint getRandomGoal() {
		RandomGenerator rg = RandomGenerator.getInstance();
		double maxX = Tank.SCREEN_WIDTH - img.getWidth();
		double maxY = Tank.SCREEN_HEIGHT - img.getHeight();
		double goalX = rg.nextDouble(0, maxX);
		double goalY = rg.nextDouble(0, maxY);
		return new GPoint(goalX, goalY);
	}



}
