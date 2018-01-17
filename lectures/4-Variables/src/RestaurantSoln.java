/*
 * File: Restaurant.java
 * Name: 
 * Section Leader: 
 * --------------------
 * This file is the starter file for the Hailstone problem.
 */

import acm.program.*;

public class RestaurantSoln extends ConsoleProgram {


	public void run() {
		
		// store the raw cost of the meal.
		double cost = readDouble("What was the meal cost? $");
		
		// Tax is 8%
		// Tip is 20%
		double tax = cost * 0.08;
		double tip = cost * 0.20;
		
		double total = cost + tax + tip;

		println("Tax: $" + tax);
		println("Tip: $" + tip);
		println("Total: $" + total);
	}



	
	
	
	
	
	
	
	










	/**
	 * Method: Init
	 * ------------
	 * This is some special code I added so that the font in
	 * the programs is larger. You can ignore it, and you don't
	 * need an init in your programs!
	 */
	public void init() {
		// used to make the font visible in lecture...
		setFont("Courier-24");
	}
}

