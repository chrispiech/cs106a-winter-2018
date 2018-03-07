

import acm.program.*;
import java.awt.event.*;
import javax.swing.*;

public class Mindset extends Program implements MindsetConstants {

	private MindsetGraph graph;
	private MindsetDataBase db;
	
	public void run() {
		db.loadYourself();
		graph.setupAxis();
		for(int year = START_YEAR; year <= END_YEAR; year++) {
			graph.clearBubbles();
			drawYear(year);
			pause(50);
		}
	}

	private void drawYear(int year) {
		for(String countryName : db.getAllCountryNames()) {
			double x = 0;
			double y = 0;
			graph.addBubble(x, y, countryName);
		}
		
	}

	
	
}
