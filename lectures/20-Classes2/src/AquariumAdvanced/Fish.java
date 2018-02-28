import java.awt.Image;
import java.util.ArrayList;
import java.util.List;

import acm.graphics.*;
import acm.util.RandomGenerator;

public class Fish {

	private static final String RIGHT_IMG = "blueFishRight.png";
	private static final String LEFT_IMG = "blueFishLeft.png";

	// A constant which controls how much the fish moves each heartbeat
	private static final double MOVE_AMT = 2.0;
	
	// How close can you get to a crab before freaking out
	private static final double MIN_CRAB_DIST = 100.0;

	// Each fish has its own GImage
	private GImage img = null;

	// Each fish has its own goal
	private GPoint goal = null;

	// Each fish has a boolean to keep track of the direction it is facing
	private boolean isLeftImgShown = false;

	/**
	 * Constructor: Fish
	 * -----------------
	 * When you make a new fish load the image
	 */
	public Fish() {
		img = new GImage(RIGHT_IMG);
		isLeftImgShown = false;
	}

	/**
	 * Public Method: Heartbeat
	 * -----------------
	 * Allow the fish to move slightly
	 * @param crabs 
	 */
	public void heartbeat(List<Crab> crabs, List<Food> foods) {
		if(closeToCrab(crabs)) {
			panic();
		}
		if(goal == null) {
			setGoal(foods);
		}
		moveTowardsGoal();
	}

	private void panic() {
		RandomGenerator rg = RandomGenerator.getInstance();
		double maxX = Tank.SCREEN_WIDTH - img.getWidth();
		double maxY = Tank.SCREEN_HEIGHT/2;
		double goalX = rg.nextDouble(0, maxX);
		double goalY = rg.nextDouble(0, maxY);
		goal = new GPoint(goalX, goalY);
		makeImageMatchDirection(goalX - img.getX());
	}

	private boolean closeToCrab(List<Crab> crabs) {
		for(Crab crab : crabs) {
			double dist = getDistanceToCrab(crab);
			if(dist < MIN_CRAB_DIST) {
				return true;
			}
		}
		return false;
	}

	private double getDistanceToCrab(Crab crab) {
		double dy = crab.getY() - getMouthY();
		double dx = crab.getX() - getCenterX();
		return Math.sqrt(dx * dx + dy * dy);
	}

	private double getMouthX() {
		if(isLeftImgShown) {
			return img.getX() + 5;
		} else {
			return img.getX() + img.getWidth() - 5;
		}
	}
	
	private double getCenterX() {
		return img.getX() + img.getWidth()/2;
	}

	private double getMouthY() {
		return img.getY() + img.getHeight()/2;
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
		double dy = goal.getY() - getMouthY();
		double dx = goal.getX() - getMouthX();
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
	}

	private void makeImageMatchDirection(double dx) {
		if(dx == 0) return;
		boolean shouldFaceLeft = dx < 0;
		if(shouldFaceLeft != isLeftImgShown) {
			if(shouldFaceLeft) {
				img.setImage(LEFT_IMG);
			} else {
				img.setImage(RIGHT_IMG);
			}
			isLeftImgShown = shouldFaceLeft;
		}
	}

	private void setGoal(List<Food> foods) {
		RandomGenerator rg = RandomGenerator.getInstance();
		if(foods.isEmpty()) {
			double maxX = Tank.SCREEN_WIDTH - img.getWidth();
			double maxY = Tank.SCREEN_HEIGHT - img.getHeight();
			double goalX = rg.nextDouble(0, maxX);
			double goalY = rg.nextDouble(0, maxY);
			goal = new GPoint(goalX, goalY);
		} else {
			int index = rg.nextInt(foods.size());
			Food wantToEat = foods.get(index);
			goal = wantToEat.getLocation();
		}
		double dx = goal.getX() - img.getX();
		makeImageMatchDirection(dx);
	}



}
