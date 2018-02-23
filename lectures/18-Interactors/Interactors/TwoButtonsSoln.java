/*
 * File: TwoButtonsSoln.java
 * ========================================================
 * Prints an affirmative or a negative message to the console
 * depending on which of two buttons is pressed.
 */
import java.awt.*;
import java.awt.event.*;
import java.io.*;
import java.util.*;

import javax.swing.*;
import acm.program.*;
import acm.graphics.*;
import acm.util.*;

public class TwoButtonsSoln extends ConsoleProgram {

	/* Sets up interactors */
	public void run() {
		setFont("Courier-24");
		JButton yayButton = new JButton("Yay");
		JButton nayButton = new JButton("Nay");
		add(yayButton, SOUTH);
		add(nayButton, SOUTH);
		addActionListeners();
		
		// shows that run gets interrupted when button is pressed,
		// but after actionPerformed finishes, run continues
		int i = 0;
		while (true) {
			println(i);
			i++;
			pause(1000);
		}
	}
	
	/* Handles button press */
	public void actionPerformed(ActionEvent e) {
		if (e.getActionCommand().equals("Yay")) {
			println("Oh wow!");
		} else {
			println("Dag, yo.");
		}
	}
}