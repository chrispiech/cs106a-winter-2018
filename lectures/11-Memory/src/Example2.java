
import acm.program.*;
import acm.graphics.*;
import acm.util.*;
import java.awt.*;
import java.awt.event.*;

public class Example2 extends GraphicsProgram {
	
	
	private GRect first = new GRect(20, 30);
	public void run() {
		first.setFilled(true);
		add(first, 0, 0);
		GObject second = getElementAt(1, 1);
		println(first == second);
	}
}

