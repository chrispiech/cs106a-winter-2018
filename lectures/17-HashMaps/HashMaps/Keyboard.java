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
	
	
	/* the mainframe database */
	private HashMap<GRect, AudioClip> pianoKeyMap = new HashMap<GRect, AudioClip>();

	public void run() {
		loadKeyboard();
		addMouseListeners();
	}
	
	public void mousePressed(MouseEvent e) {
		GObject clicked = getElementAt(e.getX(), e.getY());
		AudioClip clip = pianoKeyMap.get(clicked);
		clip.play();
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
				
				// This is the body of the file reading for loop
				// 1. Make a GRect to display the note's key
				GRect pianoKeyRect = new GRect(Double.parseDouble(x),
						Double.parseDouble(y),
						Double.parseDouble(width),
						Double.parseDouble(height));
				// Some keys are filled #musictheory
				if (isWhiteKey.equals("false")) {
					pianoKeyRect.setFilled(true);
				}
				// Adds the key to the screen
				add(pianoKeyRect); 
				
				// 2. Load the audioclip file for the key
				AudioClip sound = MediaTools.loadAudioClip(noteName);
				
				pianoKeyMap.put(pianoKeyRect, sound);
				
				
			}
			scanner.close();			
		} catch (IOException e) {
			println("Duh duh duh duhhhhhh.");
		}
	}
}
