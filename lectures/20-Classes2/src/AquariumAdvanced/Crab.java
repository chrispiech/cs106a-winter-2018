import java.awt.Image;
import java.util.List;

import acm.graphics.*;
import acm.util.RandomGenerator;

public class Crab {

	protected static final String IMG = "crab.png";

	// A constant which controls how much the fish moves each heartbeat
	private static final double MOVE_AMT = 0.5;

	// Each fish has its own GImage
	protected GImage img = null;

	// Each fish has its own goal
	protected Double goalX = null;


	/**
	 * Constructor: Fish
	 * -----------------
	 * When you make a new fish load the image
	 */
	public Crab() {
		img = new GImage(IMG);
		RandomGenerator rg = RandomGenerator.getInstance();
		double startX = rg.nextDouble(0,Tank.SCREEN_WIDTH - img.getWidth());
		double startY = Tank.SCREEN_HEIGHT - img.getHeight();
		img.setLocation(startX, startY);
	}

	/**
	 * Public Method: Heartbeat
	 * -----------------
	 * Allow the fish to move slightly
	 */
	public void heartbeat() {
		if(goalX == null) {
			setGoal();
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
	
	public double getX() {
		return img.getX() + img.getWidth()/2;
	}
	
	public double getY() {
		return img.getY();
	}

	/**
	 * Method: Move Toward Goal
	 * -----------------
	 * Move the fish image MOVE_AMT number of pixels in the
	 * straight line between where the image currently is, and
	 * the goal point.
	 */
	private void moveTowardsGoal() {
		double dx = goalX - getCrabX();
		if(Math.abs(dx) > MOVE_AMT) {
			if(dx < 0) {
				img.move(-MOVE_AMT, 0);
			} else {
				img.move(MOVE_AMT, 0);
			}
		} else {
			// you reached your goal! You no longer have a goal.
			goalX = null;
		}
	}

	private double getCrabX() {
		return img.getX() + img.getWidth()/2;
	}

	protected void setGoal() {
		double minX = img.getWidth()/2;
		double maxX = Tank.SCREEN_WIDTH - img.getWidth()/2;
		RandomGenerator rg = RandomGenerator.getInstance();
		goalX = rg.nextDouble(minX, maxX);
			
	}



}
