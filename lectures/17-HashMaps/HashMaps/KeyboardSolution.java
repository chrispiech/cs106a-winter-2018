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

public class KeyboardSolution extends GraphicsProgram {
	/* A nice window size. */
	public static final int APPLICATION_WIDTH = 700;
	public static final int APPLICATION_HEIGHT = 235;

	/* The file containing the keyboard layout. */
	private static final String KEYBOARD_FILE = "keyboardC.txt";

	private HashMap<GRect, AudioClip> noteMap = 
			new HashMap<GRect, AudioClip>();

	public void run() {
		loadKeyboard();
		addMouseListeners();
	}


	public void mousePressed(MouseEvent e) {
		//unhighlightKeys();
		GRect hit = (GRect) getElementAt(e.getX(), e.getY());
		if (hit != null) {
			playKey(hit);
		}
	}

	private void unhighlightKeys() {
		for(GRect key : noteMap.keySet()) {
			if(key.getFillColor() == Color.BLUE) {
				key.setFilled(false);
			}
		}
	}

	private void playKey(GRect hit) {
		AudioClip note = noteMap.get(hit);
		note.play();
		//highlightKey(hit);
	}


	private void highlightKey(GRect hit) {
		if(!hit.isFilled()) {
			hit.setFilled(true);
			hit.setFillColor(Color.BLUE);
		}
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
				AudioClip sound = MediaTools.loadAudioClip(noteName);
				add(key);
				noteMap.put(key, sound);
			}
			br.close();			
		} catch (IOException e) {
			println("Duh duh duh duhhhhhh.");
		}
	}
}
