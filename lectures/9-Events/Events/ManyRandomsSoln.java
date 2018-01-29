/*
 * File: ManyRandoms.java
 * --------------------
 * Generate many dice role outcomes.
 */

import acm.program.*;
import acm.util.RandomGenerator;

public class ManyRandomsSoln extends ConsoleProgram {
	
	/* An "instance" variable is accessible in the entire program" */
	private RandomGenerator rg = new RandomGenerator();
	
	/* How many random numbers to generate */
	private static final int NUM_RANDOMS = 100;
	
	public void run() {
		// used to make the font visible in lecture...
		setFont("Courier-24");

		println("Generating random numbers");
		for(int i = 0; i < NUM_RANDOMS; i++) {
			// simulate rolling a dice
			int randNum = rg.nextInt(1, 6);
			println(randNum);
		}
		
	}
	
}

