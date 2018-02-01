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
	private static final int NOT_WAITING = 0;
	private static final int WAITING_TO_ADD_COVER = 1;

	/************************************************
	 *             Instance Variables               *
	 ************************************************/

	/* Object which can give us random numbers */
	private RandomGenerator rg = new RandomGenerator();

	private GObject firstCard = null;
	private GObject firstCardCover = null;
	private GObject secondCardCover = null;
	
	/* Graphical label showing how much time has passed */
	private GLabel timeLabel = null;

	private int state = NOT_WAITING;

	public void run() {
		addTimeLabel();
		for(int i = 0; i < N_CARDS / 2; i ++) {
			Color color = rg.nextColor();
			placeCardRandomly(color);
			placeCardRandomly(color);
		}

		placeCovers();
		addMouseListeners();
		
		int secondsPassed = 0;
		while(true) {
			timeLabel.setLabel(secondsPassed + "s");
			pause(MS_IN_SEC);
			secondsPassed++;
		}

	}

	public void mousePressed(MouseEvent e) {
		int x = e.getX();
		int y = e.getY();
		GObject currCover = getElementAt(x, y);
		if(currCover != null) {
			// take the cover off and see whats under
			remove(currCover);
			GObject currCard = getElementAt(x, y);
			
			if(firstCard == null) {
				// select the first card
				firstCard = currCard;
				firstCardCover = currCover;
			} else {
				// or test for a match
				resolveMatch(currCover, currCard);
			}

		}
	}

	private void resolveMatch(GObject currCover, GObject currCard) {
		if(firstCard.getColor() == currCard.getColor()) {
			remove(firstCard);
			remove(currCard);
		} else {
			add(currCover);
			add(firstCardCover);
		}
		firstCard = null;
	}

	private void placeCovers() {
		for(int r = 0; r < N_ROWS; r++) {
			for(int c = 0; c < N_COLS; c++) {
				GRect card = addCard(r, c, Color.BLACK);
				card.move(10, 10);
			}
		}

	}

	/**
	 * Place a single card with a given color. Returns 
	 * after the card has been placed in a randomly 
	 * chosen spot. Repeatedly chose a random spot and 
	 * check if there is already a card present. 
	 */
	private void placeCardRandomly(Color underColor) {
		while(true) {
			int r = rg.nextInt(0, N_ROWS - 1);
			int c = rg.nextInt(0, N_COLS - 1);
			if(!isCardPresent(r, c)) {
				addCard(r, c, underColor);
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
	private GRect addCard(int r, int c, Color color) {
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
	
	/**
	 * Add the label which displays the time left
	 */
	private void addTimeLabel() {
		timeLabel = new GLabel("0s");
		timeLabel.setFont("Courier-36");
		add(timeLabel, 10, getHeight() - 10);
	}
}