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
			BufferedReader br = new BufferedReader(new FileReader(KEYBOARD_FILE));

			while (true) {
				String noteName   = br.readLine();
				String x          = br.readLine();
				String y          = br.readLine();
				String width      = br.readLine();
				String height     = br.readLine();
				String isWhiteKey = br.readLine();
				String keyBinding = br.readLine();
				if (keyBinding == null) break;

				GRect key = new GRect(Double.parseDouble(x),
						Double.parseDouble(y),
						Double.parseDouble(width),
						Double.parseDouble(height));
				if (isWhiteKey.equals("false")) {
					key.setFilled(true);
				}
				AudioClip soundFile = MediaTools.loadAudioClip(noteName);
				
				// add the GRect to the screen
				add(key);
			}
			br.close();			
		} catch (IOException e) {
			println("Duh duh duh duhhhhhh.");
		}
	}
}
