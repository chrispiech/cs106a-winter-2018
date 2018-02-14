/*
 * File: CountLetterFrequencies.java
 * ---------------------------------
 * This program counts the frequency of letters in user-entered text.
 */

import acm.program.*;

/**
 * This program creates a table of the letter frequencies in a 
 * paragraph of input text terminated by a blank line.
 */
public class CountLetterFrequencies extends ConsoleProgram {

	/* Private instance variables */
	private int[] frequencyTable;

	public void run() {
		println("This program counts letter frequencies.");
		initFrequencyTable();
		String line = readLine("Enter a line: ");
		countLetterFrequencies(line);
		printFrequencyTable();
	}
	
	/* Counts the letter frequencies in a line of text */
	private void countLetterFrequencies(String line) {
		// TODO: this is your job.
		int x = 5;
		char r = (char)(x + 'a');
	}

	/* Initializes the frequency table to contain zeros */
	private void initFrequencyTable() {
		frequencyTable = new int[26];
		for (int i = 0; i < 26; i++) {
			frequencyTable[i] = 0;
		}
	}

	/* Displays the frequency table */
	private void printFrequencyTable() {
		for (char ch = 'A'; ch <= 'Z'; ch++) {
			int index = ch - 'A';
			println(ch + ": " + frequencyTable[index]);
		}
	}


}
