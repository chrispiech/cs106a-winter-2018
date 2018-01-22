/*
 * File: PrintEvenNumbers.java
 * --------------------
 * Print out the first 100 even numbers starting at 0
 */

import acm.program.*;

public class PrintEvenNumbers extends ConsoleProgram {


	public void run() {
		// used to make the font visible in lecture...
		setFont("Courier-24");

		for(int i = 0; i < 100; i++) {
			println(i * 2);
		}

	}
}

