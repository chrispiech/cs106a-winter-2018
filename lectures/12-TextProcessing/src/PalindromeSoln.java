/*
 * File: PythagoreanTheorem.java
 * Name: 
 * Section Leader: 
 * -----------------------------
 * This file is the starter file for the PythagoreanTheorem problem.
 */

import acm.graphics.*;
import acm.program.*;

public class PalindromeSoln extends ConsoleProgram {


	public void run() {
		setFont("Courier-24");
		while(true) {
			runPalindromeCheck();
		}
	}

	private void runPalindromeCheck() {
		String original = readLine("Enter text: ");
		if(isPalindrome(original)) {
			println("Is a palindrome!");
		} else {
			println("Is not a palindrome");
		}
	}

	private boolean isPalindrome(String original) {
		original = normalize(original);
		String reversed = reverse(original);
		return reversed.equals(original);
	}

	private String normalize(String original) {
		String toReturn = "";
		for(int i = 0; i < original.length(); i++) {
			char ch = original.charAt(i);
			if(Character.isLetter(ch)) {
				toReturn += Character.toLowerCase(ch);
			}
		}
		return toReturn;
	}

	private String reverse(String original) {
		String toReturn = "";
		for(int i = 0; i < original.length(); i++) {
			toReturn = original.charAt(i) + toReturn;
		}
		return toReturn;
	}

}
