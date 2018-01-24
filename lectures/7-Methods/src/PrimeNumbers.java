/*
 * File: PrimeNumbers.java
 * --------------------
 * Finds and prints out prime numbers
 */

import acm.program.*;

public class PrimeNumbers extends ConsoleProgram {

	/* Number to start on */
	private static final int MIN_NUM = 3;
	
	/* Number to stop on */
	private static final int MAX_NUM = 10000;

	public void run() {
		// used to make the font visible in lecture...
		setFont("Courier-18");

		for(int i = MIN_NUM; i <= MAX_NUM; i++) {
			if(isPrime(i)) {
				println(i);
			}
		}
		println("Done");
	}

	/**
	 * Method: IsPrime
	 * ---------------
	 * Returns true if the number passed in is prime. Returns
	 * false otherwise.
	 */
	private boolean isPrime(int num) {
		// numbers less than 2 are not prime
		if(num <= 2) {
			return false;
		}
		// are any values between 2 and one less
		// than num divisible by num?
		for(int i = 2; i < num; i++) {
			if(isDivisible(num, i)) {
				return false;
			}
		}
		// if you get here, all tests passed!
		return true;
	}

	/**
	 * Method: IsDivisible
	 * ---------------
	 * Returns true if the first parameter is divisible by
	 * the second. Returns false otherwise.
	 */
	private boolean isDivisible(int a, int b) {
		if(b == 0) {
			return false;
		}
		return a % b == 0;
	}
}

