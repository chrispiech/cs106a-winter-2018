/*
 * File: Hailstone.java
 * Name: 
 * Section Leader: 
 * --------------------
 * This file is the starter file for the Hailstone problem.
 */

import acm.program.*;

public class CarbonDatingFancy extends ConsoleProgram {

	private static final double LIVING_C14 = 13.6;
	private static final int HALF_LIFE = 5730;

	public void run() {

		// print some introduction information
		println("Radioactive molecule = C14");
		println("Halflife = " + HALF_LIFE + " years");
		println("C14 in living organisms = " + LIVING_C14 + " dpm");
		println("-----");
		println(""); // adds an extra new-line

		// read the amount of C14 from the user
		double amountLeft = readDouble("Amount of C14 in your sample: ");

		// Half life formula to calculate the age:
		double fractionLeft = amountLeft / LIVING_C14;
		double age = Math.log(fractionLeft) / Math.log(0.5) * HALF_LIFE;

		// this is called a cast. It forces the expression to become an int
		int roundedAge = (int)(age / 100) * 100;
		println("Your sample is: " + roundedAge +" years old.");

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

