/*
 * File: BinaryExpressions.java
 * Name: 
 * Section Leader: 
 * -----------------------------
 * This file is the starter file for the PythagoreanTheorem problem.
 */

import acm.program.*;

public class BinaryExpressions extends ConsoleProgram {
	
	public void run() {	
		println("Operation examples");
		
		double weight = 180.0;
		int age = 29;
		
		println("age is an integer: " + age);
		println("weight is a double: " + weight);
		println("1/2 = " + (1 / 2));
		println("21/5 = " + (21 / 5));
		println("9/9 = " + (9 / 9));
		println("1.0/2 = " + (1.0 / 2));
		println("1/2.0 = " + (1 / 2.0));
		println("weight/age = " + (weight / age));
		println("weight + 10 = " + (weight + 10));
		println("'c' + 10 = " + ('c' + 10));
	}

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	/**
	 * Method: Init
	 * ------------
	 * This is some special code I added so that the font in
	 * the programs is larger. You can ignore it, and you don't
	 * need an init in your programs!
	 */
	public void init() {
		// this makes the font viewable in lecture
		setFont("Courier-24");
	}

}
