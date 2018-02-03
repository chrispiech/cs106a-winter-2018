/*
 * File: Memory.java
 * -----------------
 * Plays a game of memory where you have to find cards
 * with matching colors.
 */
import acm.program.*;
import acm.graphics.*;
import acm.util.*;
import java.awt.*;
import java.awt.event.*;

public class Memory extends GraphicsProgram {
	
	/************************************************
	 *                  Constants                   *
	 ************************************************/
	
	// method you can use
	// drawCard(row, col, color);
	
	/* Milliseconds in a second */
	private static final int MS_IN_SEC = 1000;
	/* Number of rows of cards */
	private static final int N_ROWS = 4;
	/* Number of columns of cards */
	private static final int N_COLS = 4;
	/* Total number of cards */
	private static final int N_CARDS = N_ROWS * N_COLS;
	/* Width of one card */
	private static final int CARD_WIDTH = 60;
	/* Height of rows of cards */
	private static final int CARD_HEIGHT = 80;
	/* Space between cards */
	private static final int CARD_GAP = 15;
	/* Game states */
	private static final int WAITING_FOR_FIRST_CLICK = 0;
	private static final int WAITING_FOR_SECOND_CLICK = 1;
	private static final int WAITING_TO_RESOLVE_MATCH = 2;
	
	/************************************************
	 *             Instance Variables               *
	 ************************************************/
	
	private RandomGenerator rg = new RandomGenerator();

	private GLabel timerLabel = null;
	private int status = WAITING_FOR_FIRST_CLICK;

	public void run() {
		setUpGame();
		addMouseListeners();
		int time = 0;
		while(true) {
			// update world
			time += 1;
			timerLabel.setLabel(time + "s");
			
			//pause
			pause(MS_IN_SEC);
		}
	}
	
	private GObject firstCard = null;
	private GObject firstCover = null;
	
	public void mouseClicked(MouseEvent e) {
		GObject cover = getElementAt(e.getX(), e.getY());
		remove(cover);
		GObject card = getElementAt(e.getX(), e.getY());
		
	}


	private boolean sameColor(GObject a, GObject b) {
		return a.getColor() == b.getColor();
	}


	private void setUpGame() {
		for(int i = 0; i < N_CARDS / 2; i++) {
			placePair();
		}
		placeCovers();
		addTimeLabel();
	}


	private void placeCovers() {
		for(int r = 0; r < N_ROWS; r++) {
			for(int c = 0; c < N_COLS; c++) {
				GRect card = drawCard(r, c, Color.BLACK);
				card.move(-10, -10);
			}
		}
	}


	private void addTimeLabel() {
		timerLabel = new GLabel("0s");
		timerLabel.setFont("Courier-36");
		add(timerLabel, 10, getHeight() - 10);
	}


	private void placePair() {
		// 1. get a random color
		Color pairColor = rg.nextColor();
		// 2. place two cards
		placeCard(pairColor);
		placeCard(pairColor);
	}


	private void placeCard(Color pairColor) {
		while(true) {
			// chose a random location
			int row = rg.nextInt(N_ROWS);
			int col = rg.nextInt(N_COLS);
			// if the location is free
			if(!spotTaken(row, col)) {
				// add the card
				drawCard(row, col, pairColor);
				return;
			}
		}
	}


	private boolean spotTaken(int row, int col) {
		double x = getCardX(col);
		double y = getCardY(row);
		GObject obj = getElementAt(x, y);
		return obj != null;
	}


	/**
	 * Draw one card at a given row, column location, with
	 * a given color. Adds the card to the screen and returns it
	 */
	private GRect drawCard(int r, int c, Color color) {
		double x = getCardX(c);
		double y = getCardY(r);
		GRect card = new GRect(CARD_WIDTH, CARD_HEIGHT);
		card.setColor(color);
		card.setFilled(true);
		add(card, x, y);
		return card;
	}

	/**
	 * Translates a row number into a pixel value
	 */
	private double getCardY(int r) {
		return r * CARD_HEIGHT + (r + 1) * CARD_GAP;
	}

	/**
	 * Translates a column number into a pixel value
	 */
	private double getCardX(int c) {
		return c * CARD_WIDTH + (c + 1) * CARD_GAP;
	}
}