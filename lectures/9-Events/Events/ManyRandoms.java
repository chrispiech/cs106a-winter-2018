/*
 * File: ManyRandoms.java
 * --------------------
 * Generate many dice role outcomes.
 */

import acm.program.*;
import acm.util.RandomGenerator;

public class ManyRandoms extends ConsoleProgram {
	
	/* How many random numbers to generate */
	private static final int NUM_RANDOMS = 100;
	
	public void run() {
		// used to make the font visible in lecture...
		setFont("Courier-24");

		println("Generating random numbers");
		for(int i = 0; i < NUM_RANDOMS; i++) {
			int randNum = getRandomDiceRole();
			println(randNum);
		}
		
	}
	
	private int getRandomDiceRole() {
		// chosen by rolling a fair dice
		return 0;
	}
	
}

