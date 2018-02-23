/*
 * File: XKCDColors.java
 * ========================================================
 * A program to plot colors from the xkcd colors file.
 */
import java.awt.*;
import java.awt.event.*;
import java.io.*;
import java.util.*;

import javax.swing.*;
import acm.program.*;
import acm.graphics.*;
import acm.util.*;

public class TextField extends ConsoleProgram {

	
	private static final int TEXT_FIELD_SIZE = 10;

	/* Sets up interactors. */
	public void run() {
		setFont("Courier-24");
		
		// TODO: add JLabel, JTextField, JButton
		
		addActionListeners();
	}
	
	/* Handles button press */
	public void actionPerformed(ActionEvent e) {
		println("Hello, ");
		// TODO: print contents of text field
	}	
}