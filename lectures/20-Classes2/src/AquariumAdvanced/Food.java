import java.awt.Color;

import acm.graphics.*;
import acm.util.RandomGenerator;

public class Food {
	
	private static final double SIZE = 20;
	GPoint location;
	GOval oval;
	
	public Food() {
		choseRandomLocation();
		double x = location.getX() - SIZE/2;
		double y = location.getY() - SIZE/2;
		oval = new GOval(x, y, SIZE, SIZE);
		oval.setFilled(true);
		oval.setColor(Color.GREEN);
	}

	private void choseRandomLocation() {
		RandomGenerator rg = RandomGenerator.getInstance();
		double x = rg.nextDouble(SIZE, Tank.SCREEN_WIDTH - SIZE);
		double y = rg.nextDouble(SIZE, Tank.SCREEN_HEIGHT - SIZE);
		location = new GPoint(x, y);
	}

	public GOval getOval() {
		return oval;
	}

	public GPoint getLocation() {
		return location;
	}

	

}
