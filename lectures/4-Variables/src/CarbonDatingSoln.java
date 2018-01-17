/*
 * File: CarbonDating.java
 * Name: 
 * Section Leader: 
 * --------------------
 * This file is the starter file for the Hailstone problem.
 */

import acm.program.*;

public class CarbonDatingSoln extends ConsoleProgram {


	public void run() {
		// print some introduction information
		println("Radioactive molecule = C14");
		println("Halflife = 5730 years");
		println("C14 in living organisms = 13.6 dpm");
		println("-----");
		println(""); // adds an extra new-line

		// read the amount of C14 from the user
		double amountLeft = readDouble("Amount of C14 in your sample: ");

		// Half life formula to calculate the age:
		// age = log(fractionLeft) / log(0.5) * 5730
		// fractionLeft = amountCO2Left / livingCO2Amount

		double fractionLeft = amountLeft / 13.6;
		double age = Math.log(fractionLeft) / Math.log(0.5) * 5730;
		age = Math.round(age);
		println("Your sample is " + age + " years old.");

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

