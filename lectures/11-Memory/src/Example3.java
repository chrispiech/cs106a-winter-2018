
import acm.program.*;
import acm.graphics.*;
import acm.util.*;
import java.awt.*;
import java.awt.event.*;

public class Example3 extends GraphicsProgram {
	
	
	GRect paddle = new GRect(getWidth(), getHeight());
	public void run() {
		paddle.setColor(Color.BLUE);
		add(paddle, 0, 0);
	}
	
	
}

