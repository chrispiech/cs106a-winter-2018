/*
 * File: WeightOnMoon.java
 * --------------------
 * A tool to turn earth weight into moon weight.
 * Moon weight is 0.165 earth weight
 */

import acm.program.*;

public class WeightOnMoon extends ConsoleProgram {

	private static final double EARTH_TO_MOON_FRACTION = 0.165;

	public void run() {
		// used to make the font visible in lecture...
		setFont("Courier-24");

		// get earth weight from a user
		double weightOnEarth = readDouble("Enter a weight on earth: ");
		
		// turn that into a moon weight
		double weightOnMoon = getMoonWeight(weightOnEarth);
		
		// print the result on the screen.
		println("Weight on moon " + weightOnMoon);
	}
	
	private double getMoonWeight(double weightOnEarth) {
		return weightOnEarth * EARTH_TO_MOON_FRACTION;
	}

	
}

