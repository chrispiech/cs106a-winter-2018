/*
 * File: GraphicNumbers.java
 * -------------------------
 * This program shows an example of using ArrayLists with
 * objects.
 */

import acm.program.*;
import acm.graphics.*;
import java.util.*;
import java.awt.event.*;

public class GraphicNumbers extends GraphicsProgram {
	
	private static final double START_X = 50;
	private static final double START_Y = 100;
	
	public void init() {
		addMouseListeners();
	}
	
	public void mouseClicked(MouseEvent e) {
		// Create a new label
		GLabel lab = new GLabel("#" + labels.size());
		lab.setFont("Courier New-18-Bold");
		
		// Move all existing labels down one row
		double dy = lab.getHeight();
		for(int i = 0; i < labels.size(); i++) {
			labels.get(i).move(0, dy);  // note "chaining" of methods
		}
		
		add(lab, START_X, START_Y); // Add new label to canvas
		labels.add(lab);            // Add new label to ArrayList
	}
	
	private ArrayList<GLabel> labels = new ArrayList<GLabel>();

}
