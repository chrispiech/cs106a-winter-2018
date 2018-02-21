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

public class KeyboardAdvanced extends GraphicsProgram {
	/* A nice window size. */
	public static final int APPLICATION_WIDTH = 700;
	public static final int APPLICATION_HEIGHT = 235;

	/* The file containing the keyboard layout. */
	private static final String KEYBOARD_FILE = "keyboardC.txt";


	private HashMap<GRect, AudioClip> noteMap = 
			new HashMap<GRect, AudioClip>();

	private HashMap<Character, GRect> compKeyMap =
			new HashMap<Character, GRect>();

	private HashMap<GRect, Integer> fadeTime =
			new HashMap<GRect, Integer>();

	public void run() {
		loadKeyboard();
		addMouseListeners();
		addKeyListeners();
		while(true) {
			fadeKeys();
			pause(100);
		}
	}

	private void fadeKeys() {
		for(GRect key : fadeTime.keySet()) {
			int timeToLive = fadeTime.get(key);
			if(timeToLive > 0) {
				timeToLive -= 1;
				fadeTime.put(key, timeToLive);
				if(timeToLive == 0) {
					if(isWhiteKey(key)) {
						key.setFilled(false);
					} else {
						key.setFillColor(Color.BLACK);
					}
				}
			}
		}
	}

	private boolean isWhiteKey(GRect key) {
		if(key.getFillColor() == Color.BLUE) return true;
		if(key.isFilled() == false) return true;
		return false;
	}

	@Override
	public void keyPressed(KeyEvent e) {
		char ch = Character.toUpperCase(e.getKeyChar());
		println(ch + " pressed");
		if(compKeyMap.containsKey(ch)) {
			GRect key = compKeyMap.get(ch);
			playKey(key);
		}
	}

	public void mousePressed(MouseEvent e) {
		GRect hit = (GRect) getElementAt(e.getX(), e.getY());
		if (hit != null) {
			playKey(hit);
		}
	}

	private void playKey(GRect hit) {
		AudioClip note = noteMap.get(hit);
		note.play();
		if(isWhiteKey(hit)) {
			hit.setFilled(true);
			hit.setFillColor(Color.BLUE);	
		} else {
			hit.setFillColor(Color.GREEN);
		}
		fadeTime.put(hit, 3);
	}

	private void loadKeyboard() {
		try {
			BufferedReader scanner = new BufferedReader(new FileReader(KEYBOARD_FILE));

			while (true) {
				String noteName   = scanner.readLine();
				String x          = scanner.readLine();
				String y          = scanner.readLine();
				String width      = scanner.readLine();
				String height     = scanner.readLine();
				String isWhiteKey = scanner.readLine();
				String computerKey = scanner.readLine();
				if (computerKey == null) break;

				GRect key = new GRect(Double.parseDouble(x),
						Double.parseDouble(y),
						Double.parseDouble(width),
						Double.parseDouble(height));
				if (isWhiteKey.equals("false")) {
					key.setFilled(true);
				}
				add(key);

				noteMap.put(key, MediaTools.loadAudioClip(noteName));
				compKeyMap.put(computerKey.charAt(0), key);
			}
			scanner.close();			
		} catch (IOException e) {
			println("Duh duh duh duhhhhhh.");
		}
	}
}
