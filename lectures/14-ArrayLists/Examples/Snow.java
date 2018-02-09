import acm.program.*;
import acm.util.*;
import java.applet.*;
import java.awt.Color;
import java.io.*;
import java.util.*;

import acm.graphics.*;

public class Snow extends GraphicsProgram {

	// snow is so tiny!
	private static final int SNOW_SIZE = 5;
	
	// each snowflake is unique :-)
	private RandomGenerator rg = new RandomGenerator();

	public void run() {
		// typical animation loop
		while(true) {
			// update world
			makeNewSnow();

			// pause
			pause(10);
		}

	}

	private void makeNewSnow() {
		// make a new snowflake with 10% probability
		if(rg.nextBoolean(0.10)) {
			// get a random x location
			double x = rg.nextInt(getWidth() - SNOW_SIZE);
			
			// make the new oval
			GOval flake = new GOval(SNOW_SIZE, SNOW_SIZE);
			
			// put the filled, blue, oval on the screen
			flake.setFilled(true);
			flake.setColor(Color.BLUE);
			add(flake, x, 0);
		}

	}
}
