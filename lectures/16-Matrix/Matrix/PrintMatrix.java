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
		int[][] matrix = new int[4][3];
		printMatrix(matrix);
	}

	private void printMatrix(int[][] matrix) {
		for(int r = 0; r < matrix.length; r++) {
			String line = "";
			for(int c = 0; c < matrix[0].length; c++) {
				if(c != 0) {
					line += ", ";
				}
				line += matrix[r][c];
			}
			println("[" + line + "]");
		}
	}




}
