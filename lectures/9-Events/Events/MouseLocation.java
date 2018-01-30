/*
 * File: MouseLocation.java
 * -----------------------------
 * Output the location of the mouse to the console
 */

import java.awt.event.MouseEvent;

import acm.graphics.GOval;
import acm.program.*;

public class MouseLocation extends GraphicsProgram {

	public void run() {	
		// 1. add mouse listeners
		addMouseListeners();
		
	}

	// 2. define the mouse moved method
	// and it has to have exactly this "prototype"
	public void mouseClicked(MouseEvent e) {
		// 3. get the mouse location
		double mouseX = e.getX();
		double mouseY = e.getY();
		
		// 4. do something
		GOval oval = new GOval(15, 15);
		oval.setFilled(true);
		add(oval, mouseX, mouseY);
		
	}
	
	


}
