/*
 * File: SeeTheUS.java
 * ===============================================================
 * A program to visualize the United States based on US Census
 * records from 2000.
 */

import acm.program.*;
import acm.graphics.*;
import java.awt.*;
import java.io.*;
import java.util.Scanner;

public class SeeTheUsSoln extends GraphicsProgram {	
	/* The name of the cities file. */
	private static final String CITIES_FILE = "us-cities.txt";

	public void run() {
		try {
			int done = 0;
			Scanner rd = new Scanner(new File(CITIES_FILE));
			while(rd.hasNextLine()) {
				
				// first line is the city name
				rd.nextLine();
				// second line is the latitude
				String latStr = rd.nextLine();
				// third line is the longitude
				String longStr = rd.nextLine();
				
				// turn strings into actual numbers
				double latitude = Double.parseDouble(latStr);
				double longitude = Double.parseDouble(longStr);
				
				// plot a single city
				plotOneCity(latitude, longitude);
				
				// add some animation!
				done++;
				if(done % 10 == 0) pause(1);
			}
			// don't forget to close your files!
			rd.close();
		} catch (IOException e) {
			// if something goes wrong, lets crash the program
			throw new RuntimeException(e);
		}
	}

	/**
	 * Given the longitude and latitude of a city (in double form), displays
	 * a dot for that city.
	 * @param cityLat The latitude, in degrees north.
	 * @param cityLong The longitude, in degrees east.
	 */
	private void plotOneCity(double latitude, double longitude) {
		/* Determine where on screen the city should be drawn. */
		double x = longitudeToXCoordinate(longitude);
		double y = latitudeToYCoordinate(latitude);
		plotPixel(x, y);
	}

	/**
	 * Plots a pixel at the specified (x, y) coordinate.
	 * @param x The X coordinate.
	 * @param y The Y coordinate.
	 */
	private void plotPixel(double x, double y) {
		/* Create a 1x1 pixel of the given color. */
		GRect pixel = new GRect(x, y, 1, 1);
		pixel.setFilled(true);
		pixel.setColor(Color.BLUE);
		add(pixel);
	}

	/**
	 * Given a raw longitude, returns the screen x coordinate where
	 * it should be displayed.
	 * @param longitude The longitude in question.
	 * @return Where it maps to as an x coordinate.
	 */
	private double longitudeToXCoordinate(double longitude) {
		return getWidth() * (longitude - MIN_LONGITUDE) / (MAX_LONGITUDE - MIN_LONGITUDE); 
	}

	/**
	 * Given a raw latitude, returns the screen y coordinate where
	 * it should be displayed.
	 * @param latitude The latitude in question.
	 * @return Where it maps to as a y coordinate.
	 */
	private double latitudeToYCoordinate(double latitude) {
		return getHeight() * (1.0 - (latitude - MIN_LATITUDE) / (MAX_LATITUDE - MIN_LATITUDE)); 
	}


	/* * * * * Constants to control the graphics and behavior. * * * * */

	/* Make the window large so that we can see more detail. */
	public static final int APPLICATION_WIDTH = 1000;
	public static final int APPLICATION_HEIGHT = 750;

	/* The viewpoint coordinates - the minimum and maximum longitude
	 * and latitude.
	 */
	private static final double MIN_LONGITUDE = -130;
	private static final double MAX_LONGITUDE = -60;

	private static final double MIN_LATITUDE = +22;
	private static final double MAX_LATITUDE = +55;
}
