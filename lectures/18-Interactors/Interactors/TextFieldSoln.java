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

public class TextFieldSoln extends ConsoleProgram {

	private JTextField textField = null;
	private static final int TEXT_FIELD_SIZE = 10;

	/* Sets up interactors. */
	public void run() {
		setFont("Courier-24");
		JLabel label = new JLabel("Name ");
		textField = new JTextField(TEXT_FIELD_SIZE);
		JButton button = new JButton("Press me");
		
		add(label, SOUTH);
		add(textField, SOUTH);
		add(button, SOUTH);
		
		addActionListeners();
	}
	
	/* Handles button press */
	public void actionPerformed(ActionEvent e) {
		println("Hello, " + textField.getText());
	}
}