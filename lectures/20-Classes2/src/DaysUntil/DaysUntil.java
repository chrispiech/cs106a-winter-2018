/*
 * File: BlankClass.java
 * ---------------------
 * This class is a blank one that you can change at will. Remember, if you change
 * the class name, you'll need to change the filename so that it matches.
 * Then you can extend GraphicsProgram, ConsoleProgram, or DialogProgram as you like.
 */

import java.util.ArrayList;

import acm.graphics.GImage;
import acm.program.*;

public class DaysUntil extends ConsoleProgram {
	
	public void run() {
		Date today = new Date(2017, 3, 1);
		Date summer = new Date(2017, 6, 14);
		print(today.daysUntil(summer));
	}
	
	public void init() {
		setFont("Courier-24");
	}
}

