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
	private static final int WAITING_FOR_FIRST_CLICK = 0;
	private static final int WAITING_FOR_SECOND_CLICK = 1;
	private static final int WAITING_TO_RESOLVE_MATCH = 2;
	
	/************************************************
	 *             Instance Variables               *
	 ************************************************/

	

	public void run() {
		drawCard(0, 0, Color.RED);
		drawCard(1, 3, Color.BLUE);
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