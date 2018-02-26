import java.awt.Color;

import acm.graphics.GOval;
import acm.util.RandomGenerator;

public class Ball {
	
	private static final int BALL_SIZE = 20;
	
	// 1: what variables make up a ball?
	private GOval circle;
	private double dx;
	private double dy;
	
	// 2. what happens when you make a new ball?
	public Ball(int screenWidth, int screenHeight) {
		RandomGenerator rg = RandomGenerator.getInstance();
		double x = rg.nextInt(screenWidth - BALL_SIZE);
		double y = rg.nextInt(screenHeight - BALL_SIZE);
		
		// make the ball's circle
		this.circle = new GOval(x, y, BALL_SIZE, BALL_SIZE);
		this.circle.setFilled(true);
		this.circle.setColor(Color.BLUE);
		
		// gets a random dx and a random dy
		this.dx = getRandomSpeed();
		this.dy = getRandomSpeed();
	}
	
	// 3. what methods can you call on a ball?
	public GOval getGOval() {
		return circle;
	}
	
	public void heartbeat(int screenWidth, int screenHeight) {
		this.circle.move(this.dx, this.dy);
		reflectOffWalls(screenWidth, screenHeight);
	}

	// look out for the keyword private!
	private void reflectOffWalls(int screenWidth, int screenHeight) {
		if(this.circle.getY() < 0) {
			this.dy *= -1;
		}
		if(this.circle.getY() > screenHeight - BALL_SIZE) {
			this.dy *= -1;
		}
		if(this.circle.getX() < 0) {
			this.dx *= -1;
		}
		if(this.circle.getX() > screenWidth - BALL_SIZE) {
			this.dx *= -1;
		}
	}
	
	private double getRandomSpeed() {
		RandomGenerator rg = RandomGenerator.getInstance();
		double speed = rg.nextDouble(1,3);
		if(rg.nextBoolean()) {
			speed *= -1;
		}
		return speed;
	}
}
