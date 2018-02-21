/*
 * File: DrawFlag.java
 * -----------------------------
 * Draws various flags from around the world (that have
 * only horizontal bands)
 */

import java.awt.Color;

import acm.graphics.*;
import acm.program.*;
import acm.util.RandomGenerator;

public class PrintMatrix extends ConsoleProgram {


	public void run() {
		setFont("Courier-24");
		int[][] matrix = new int[4][3];
		matrix[1][2] = 9;
		printMatrix(matrix);
	}

	private void printMatrix(int[][] matrix) {
		// loop over all rows
		for(int r = 0; r < matrix.length; r++) {
			
			// make row string
			String line = "";
			
			// loop over all the columns 
			for(int c = 0; c < matrix[0].length; c++) {
				if(c != 0) {
					line += ", ";
				}
				line += matrix[r][c];
			}
			
			// have a line ready to output
			println("[" + line + "]");
		}
	}




}
