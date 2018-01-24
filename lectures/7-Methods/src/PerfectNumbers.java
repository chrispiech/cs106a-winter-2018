/*
 * File: PerfectNumbers.java
 * --------------------
 * Print out all perfect numbers less than 10,000
 */

import acm.program.*;

public class PerfectNumbers extends ConsoleProgram {
	/* Min value to check */
	private static final int MIN_NUM = 1;
	
	/* Max value to check */
	private static final int MAX_NUM = 10000;

	public void run() {
		// used to make the font visible in lecture...
		setFont("Courier-24");

		for(int i = MIN_NUM; i <= MAX_NUM; i++) {
			if(isPerfect(i)) {
				println(i);
			}
		}
		println("Done");
	}

	/**
	 * Method: IsPerfect
	 * ---------------
	 * Returns true if the number is "perfect" meaning the sum
	 * of its divisors equals the number itself.
	 */
	private boolean isPerfect(int num) {
		int sumDivisors = 0;
		for(int i = 0; i < num; i++) {
			if(isDivisible(num, i)) {
				sumDivisors += i;
			}
		}
		return sumDivisors == num;
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

