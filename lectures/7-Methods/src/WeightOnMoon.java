/*
 * File: WeightOnMoon.java
 * --------------------
 * A tool to turn earth weight into moon weight.
 */

import acm.program.*;

public class WeightOnMoon extends ConsoleProgram {

	public void run() {
		// used to make the font visible in lecture...
		setFont("Courier-24");

		double weightOnEarth = readDouble("Enter a weight on earth: ");
		double weightOnMoon = getMoonWeight(weightOnEarth);
		println("Weight on moon " + weightOnMoon);
	}

	private double getMoonWeight(double earthWeight) {
		return earthWeight * .165;
	}
	
}

