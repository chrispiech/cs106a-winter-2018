import acm.graphics.*;
import acm.util.RandomGenerator;

public class Fish {

	// A constant which controls how much the fish moves each heartbeat
	private static final double MOVE_AMT = 3.0;

	// Each fish has its own GImage
	private GImage img = null;

	// Each fish has its own goal
	private GPoint goal = null;

	// Each fish has a boolean to keep track of the direction it is facing
	private boolean isLeftImgShown = false;

	/**
	 * Constructor: Fish
	 * -----------------
	 * When you make a new fish, load the image
	 */
	public Fish() {
		img = new GImage("blueFishRight.png");
		isLeftImgShown = false;
	}

	/**
	 * Public Method: Heartbeat
	 * -----------------
	 * Allow the fish to move slightly
	 */
	public void heartbeat() {
		if(goal == null) {
			goal = getRandomGoal();
		}
		moveTowardsGoal();
	}

	/**
	 * Public Method: Get Image
	 * -----------------
	 * Return the fish's GImage.
	 */
	public GImage getImage() {
		return img;
	}

	/**
	 * Method: Move Toward Goal
	 * -----------------
	 * Move the fish image MOVE_AMT number of pixels in the
	 * straight line between where the image currently is, and
	 * the goal point.
	 */
	private void moveTowardsGoal() {
		double dy = goal.getY() - img.getY();
		double dx = goal.getX() - img.getX();
		double dist = Math.sqrt(dx * dx + dy * dy);
		if(dist > MOVE_AMT) {
			// move MOVE_AMT pixels towards the goal
			double moveX = MOVE_AMT / dist * dx;
			double moveY = MOVE_AMT / dist * dy;
			img.move(moveX, moveY);
		} else {
			// you reached your goal! You no longer have a goal.
			goal = null;
		}
		makeImageMatchDirection(dx);
	}

	private void makeImageMatchDirection(double dx) {
		boolean shouldFaceLeft = dx < 0;
		if(shouldFaceLeft != isLeftImgShown) {
			isLeftImgShown = shouldFaceLeft;
			if(isLeftImgShown) {
				img.setImage("blueFishLeft.png");
			} else {
				img.setImage("blueFishRight.png");
			}
		}
	}

	private GPoint getRandomGoal() {
		RandomGenerator rg = RandomGenerator.getInstance();
		double maxX = Tank.SCREEN_WIDTH - img.getWidth();
		double maxY = Tank.SCREEN_HEIGHT - img.getHeight();
		double goalX = rg.nextDouble(0, maxX);
		double goalY = rg.nextDouble(0, maxY);
		return new GPoint(goalX, goalY);
	}



}
