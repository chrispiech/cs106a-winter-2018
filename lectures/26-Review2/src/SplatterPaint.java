/* FILE: SplatterPaint.java
 * ------------------------
* This program uses interactors to allow the user to draw "splatters"
* of paint of different sizes and colors onscreen.
*/

import acm.graphics.*;
import acm.program.*;
import acm.util.*;
import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.util.*;

public class SplatterPaint extends GraphicsProgram {
	
	// The number of characters wide the diameter field should be
	private static final int DIAMETER_FIELD_WIDTH = 15;
	
	// The text field where the user types in the splatter diameter
	private JTextField diameterField;
	
	// A list of all onscreen splatters
	private ArrayList<GOval> splatters;
	
	public void init() {
		splatters = new ArrayList<GOval>();

		// The text field has the same action command as "Yellow" button
		add(new JLabel("Diameter: "), SOUTH);
		diameterField = new JTextField(DIAMETER_FIELD_WIDTH);
		diameterField.setActionCommand("Yellow");
		diameterField.addActionListener(this);
		add(diameterField, SOUTH);
		
		// Add the buttons
		add(new JButton("Yellow"), SOUTH);
		add(new JButton("Orange"), SOUTH);
		add(new JButton("Randomize"), SOUTH);
		addActionListeners();
	}
	
	public void actionPerformed(ActionEvent e) {
		if (e.getActionCommand().equals("Yellow")) {
			// Add a yellow circle
			int diameter = Integer.parseInt(diameterField.getText());
			addSplatter(diameter, Color.yellow);
		} else if (e.getActionCommand().equals("Orange")) {
			// Add an orange circle
			int diameter = Integer.parseInt(diameterField.getText());
			addSplatter(diameter, Color.orange);
		} else if (e.getActionCommand().equals("Randomize")) {
			// Randomize all existing splatters
			randomizeColors();
		}
	}
	
	/* This method adds a random splatter with the given diameter and color
	 * to the screen, and adds it to our list of onscreen splatters.
	 */
	private void addSplatter(int diameter, Color color) {
		int x = RandomGenerator.getInstance().nextInt(0, getWidth() - diameter);
		int y = RandomGenerator.getInstance().nextInt(0, getHeight() - diameter);
		GOval splatter = new GOval(x, y, diameter, diameter);
		splatter.setFilled(true);
		splatter.setColor(color);
		add(splatter);
		splatters.add(splatter);
	}
	
	// This method randomly changes the color of all onscreen paint splatters.
	private void randomizeColors() {
		for (GOval splatter : splatters) {
			Color newColor = RandomGenerator.getInstance().nextColor();
			splatter.setColor(newColor);
		}
	}
}
