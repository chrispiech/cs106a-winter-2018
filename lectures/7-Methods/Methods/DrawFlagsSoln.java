/*
 * File: DrawFlag.java
 * -----------------------------
 * Draws various flags from around the world (that have
 * only horizontal bands)
 */

import java.awt.Color;

import acm.graphics.*;
import acm.program.*;

public class DrawFlagsSoln extends GraphicsProgram {

	public void run() {				
		drawNetherlandsFlag();
		pause(1000); // waits one second
		
		drawIndonesiasFlag();
		pause(1000); // waits one second
		
		drawColombiasFlag();
	}


}
