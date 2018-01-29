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

public class MemorySoln extends GraphicsProgram {
	
	/************************************************
	 *                  Constants                   *
	 ************************************************/
	
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

	/* Object which can give us random numbers */
	private RandomGenerator rg = new RandomGenerator();
	/* Graphical label showing how much time has passed */
	private GLabel timeLabel = null;
	
	/* The card, and its cover, from the first click */
	private GObject firstCover;
	private GObject firstCard;
	
	/* The card, and its cover, from the second click */
	private GObject secondCover;
	private GObject secondCard;
	
	/* The state of the game */
	int state = WAITING_FOR_FIRST_CLICK;

	public void run() {
		setupGame();
		addMouseListeners();
		runAnimationLoop();
	}

	/**
	 * Run the heartbeat of the game. Update the clock and
	 * if the game is waiting to resolve a match, resolve it!
	 */
	private void runAnimationLoop() {
		int time = 0;
		while(true) {
			if(state == WAITING_TO_RESOLVE_MATCH) {
				resolveMatch();
			}
			pause(MS_IN_SEC);
			time += 1;
			timeLabel.setLabel(time +"s");
		}
	}

	/**
	 * Check if the two cards clicked have the same color
	 */
	private void resolveMatch() {
		if(colorsMatch(firstCard, secondCard)) {
			remove(firstCard);
			remove(secondCard);
		} else {
			add(firstCover);
			add(secondCover);
		}
		state = WAITING_FOR_FIRST_CLICK;
	}
	
	/**
	 * Mouse clicked method. Get the card clicked (which is under
	 * a cover) and update instance the state of the game, including
	 * relevant instance variables.
	 */
	public void mouseClicked(MouseEvent e) {
		// get the relevant elements
		GObject cover = getElementAt(e.getX(), e.getY());
		if(cover == null || state == WAITING_TO_RESOLVE_MATCH) {
			return;
		}
		remove(cover);
		GObject card = getElementAt(e.getX(), e.getY());
		if(card == null) {
			add(cover);
			return;
		}
		
		// update the instance variables
		if(state == WAITING_FOR_FIRST_CLICK) {
			firstCover = cover;
			firstCard = card;
			state = WAITING_FOR_SECOND_CLICK;
		} else {
			secondCover = cover;
			secondCard = card;
			state = WAITING_TO_RESOLVE_MATCH;
		}
	}

	/**
	 * Check if two GObjects have the same color
	 */
	private boolean colorsMatch(GObject a, GObject b) {
		return a.getColor() == b.getColor();
	}

	/**
	 * Make a game of memory.
	 */
	private void setupGame() {
		for(int i = 0; i < N_CARDS/2; i++) {
			placePair();
		}
		placeCovers();
		addTimeLabel();
	}

	/**
	 * Put black sqaure on top of all the colored cards to 
	 * hide them.
	 */
	private void placeCovers() {
		for(int r = 0; r < N_ROWS; r++) {
			for(int c = 0; c < N_COLS; c++) {
				drawCard(r, c, Color.BLACK);
			}
		}
	}

	/**
	 * Add the label which displays the time left
	 */
	private void addTimeLabel() {
		timeLabel = new GLabel("0s");
		timeLabel.setFont("Courier-36");
		add(timeLabel, 10, getHeight() - 10);
	}

	/**
	 * Place a pair of cards
	 */
	private void placePair() {
		Color underColor = rg.nextColor();
		placeCard(underColor);
		placeCard(underColor);
	}

	/**
	 * Place a single card with a given color. Repeatedly
	 * chose a random spot and check if there is already
	 * a card present.
	 */
	private void placeCard(Color underColor) {
		while(true) {
			int r = rg.nextInt(0, N_ROWS - 1);
			int c = rg.nextInt(0, N_COLS - 1);
			if(!isCardPresent(r, c)) {
				drawCard(r, c, underColor);
				return;
			}
		}
	}
	
	/**
	 * Returns true if a given row, column is occupied
	 */
	private boolean isCardPresent(int r, int c) {
		double x = getCardX(c);
		double y = getCardY(r);
		return getElementAt(x, y) != null;
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