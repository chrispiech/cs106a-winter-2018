
import acm.program.*;
import acm.graphics.*;
import acm.util.*;
import java.awt.*;
import java.awt.event.*;

public class Example4 extends GraphicsProgram {
	public void run() {
		GRect paddle = new GRect(50, 50);
		makeBlue(paddle);
		add(paddle, 0, 0);
	}
	private void makeBlue(GRect object) {
		object.setColor(Color.BLUE);
		object.setFilled(true);
	}
}

