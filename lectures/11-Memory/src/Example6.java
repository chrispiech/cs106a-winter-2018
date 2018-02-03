
import acm.program.*;
import acm.graphics.*;
import acm.util.*;
import java.awt.*;
import java.awt.event.*;

public class Example6 extends GraphicsProgram {
	
	public void run() {
		GRect first = new GRect(20, 20);
		GRect second = first;
		second.setColor(Color.BLUE);
		add(first, 0, 0);
	}
	

	
	
}

