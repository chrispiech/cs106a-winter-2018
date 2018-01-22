/*
 * File: Target.java
 * Name: 
 * Section Leader: 
 * -----------------
 * This file is the starter file for the Target problem.
 */

import acm.graphics.*;
import acm.program.*;
import java.awt.*;

public class ProgrammingAwesome extends GraphicsProgram {	
	
	
	public void run() {
		// half the height of the screen.
		double centerY = getHeight()/2;
		
		// make and add a blue square
		GRect blueSquare = new GRect(80, 90, 70, 70); // width and height are 70
		blueSquare.setColor(Color.BLUE); // make the square blue
		blueSquare.setFilled(true); // fill the square
		add(blueSquare); // add the square to the screen
		
		// make and add a purple background
		GRect purpleBackground = new GRect(120, centerY, 200, 180);
		purpleBackground.setColor(Color.MAGENTA);
		purpleBackground.setFilled(true);
		add(purpleBackground);
		
		// make and add a red oval in the exact same spot as the purple
		// rect above..
		GOval redOval = new GOval(120, centerY, 200, 180);
		redOval.setColor(Color.RED);
		redOval.setFilled(true);
		add(redOval);
		
		// add a long yellow rectangle
		GRect brahm = new GRect(550, 10, 60, 300);
		brahm.setColor(Color.YELLOW);
		brahm.setFilled(true);
		add(brahm);
		
		// add a piece of text
		GLabel label = new GLabel("Programming is Awesome!");
		label.setFont("Courier-52");
		add(label, 10, centerY);
		
		// this object is never added
		GRect dudeWheresMyRect = new GRect(600, 600);
		dudeWheresMyRect.setFilled(true);
	}

	
}
