/*
 * File: PrimeNumbers.java
 * --------------------
 * Finds and prints out prime numbers
 */

import acm.program.*;

public class Example extends ConsoleProgram {
	
	private boolean printOpinion(int num) {
		if(num == 5) {
			println("I love 5!");
			return true;
		} else {
			println("Whattever");
			return false;
		}
	}

	public void run() {
		boolean printedOut = printOpinion(5);
		println(printedOut);
	}


}

