/*
 * File: TwoButtons.java
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

public class TwoButtons extends ConsoleProgram {

	/* Sets up interactors. */
	public void run() {
		setFont("Courier-24");
		// TODO: add buttons
	}
	
	/* Handles button press */
	public void actionPerformed(ActionEvent e) {
		println(e.getActionCommand());
		// TODO: print correct statement
	}
}