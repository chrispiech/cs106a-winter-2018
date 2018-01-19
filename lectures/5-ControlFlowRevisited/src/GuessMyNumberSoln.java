/*
 * File: PythagoreanTheorem.java
 * Name: 
 * Section Leader: 
 * -----------------------------
 * This file is the starter file for the PythagoreanTheorem problem.
 */

import acm.program.*;

public class GuessMyNumberSoln extends ConsoleProgram {

	public void run() {		
		int secretNumber = getHeight() % 100;
		println("I am thinking of a number between 0 and 99...");
		int guess = readInt("Enter a guess: ");
		while(guess != secretNumber) {
			if(guess < secretNumber) {
				println("Your guess is too low");
			} else {
				println("Your guess is too high");
			}
			guess = readInt("Enter a new number: ");
		}
		println("Congrats! The number was: " + secretNumber);
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
