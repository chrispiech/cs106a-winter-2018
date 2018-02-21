/*
 * File: Keyboard.java
 * ======================================================================
 * A program that displays a keyboard that the user can play!
 */

import java.applet.*;
import java.awt.*;
import java.awt.event.*;
import java.util.*;
import java.io.*;
import acm.program.*;
import acm.util.*;
import acm.graphics.*;

public class Keyboard extends GraphicsProgram {
	/* A nice window size. */
	public static final int APPLICATION_WIDTH = 700;
	public static final int APPLICATION_HEIGHT = 235;

	/* The file containing the keyboard layout. */
	private static final String KEYBOARD_FILE = "keyboardC.txt";
	

	public void run() {
		loadKeyboard();
	}

	private void loadKeyboard() {
		try {
			// This is an old school version of a scanner. Pretty much the same..
			BufferedReader scanner = new BufferedReader(new FileReader(KEYBOARD_FILE));

			while (true) {
				// Get the data for one note from the file
				String noteName   = scanner.readLine();
				String x          = scanner.readLine();
				String y          = scanner.readLine();
				String width      = scanner.readLine();
				String height     = scanner.readLine();
				String isWhiteKey = scanner.readLine();
				String keyBinding = scanner.readLine();
				if (keyBinding == null) break;
				
				// Make a GRect to display the note's key
				GRect key = new GRect(Double.parseDouble(x),
						Double.parseDouble(y),
						Double.parseDouble(width),
						Double.parseDouble(height));
				// Some keys are filled #musictheory
				if (isWhiteKey.equals("false")) {
					key.setFilled(true);
				}
				// Adds the key to the screen
				add(key); 
				
				// Load the audioclip file for the key
				AudioClip sound = MediaTools.loadAudioClip(noteName);
				
				/*
				 *  TODO: Your code here
				 *  --------------
				 *  At this point you have:
				 *  GRect key
				 *  AudioClip sound
				 *  And you need to store them in a way that will allow
				 *  you to play the sound when a key is pressed.
				 */
				
			}
			scanner.close();			
		} catch (IOException e) {
			println("Duh duh duh duhhhhhh.");
		}
	}
}
