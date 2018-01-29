/*
 * File: StampTool.java
 * -----------------------------
 * Draws a rectangle where the user clicks
 */

import java.awt.Color;
import java.awt.event.MouseEvent;

import acm.graphics.*;
import acm.program.*;
import acm.util.RandomGenerator;

public class StampTool extends GraphicsProgram {

	private static final int SQUARE_SIZE = 40;
	
	private GRect stamp = null;
	
	public void run() {	
		addStamp();
		addMouseListeners();
	}
	
	public void mouseMoved(MouseEvent e) {
		int x = e.getX() - SQUARE_SIZE/2;
		int y = e.getY() - SQUARE_SIZE/2;
		stamp.setLocation(x, y);
	}
	
	public void mouseClicked(MouseEvent e) {
		int mouseX = e.getX();
		int mouseY = e.getY();
		addSquare(mouseX, mouseY);
		stamp.sendToFront();
	}
	
	private void addStamp() {
		stamp = new GRect(SQUARE_SIZE, SQUARE_SIZE);
		stamp.setFilled(true);
		stamp.setColor(Color.BLUE);
		int x = getWidth()/2 - SQUARE_SIZE/2;
		int y = getHeight()/2 - SQUARE_SIZE/2;
		add(stamp, x, y);
	}

	private void addSquare(int centerX, int centerY) {
		GRect r = new GRect(SQUARE_SIZE, SQUARE_SIZE);
		r.setFilled(true);
		int x = centerX - SQUARE_SIZE/2;
		int y = centerY - SQUARE_SIZE/2;
		add(r, x, y);
	}
}
