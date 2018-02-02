
import acm.program.*;
import acm.graphics.*;
import acm.util.*;
import java.awt.*;
import java.awt.event.*;

public class ExampleImg extends GraphicsProgram {
	public void run() {
		GImage img = new GImage("mountain.jpg");
		add(img, 0, 0);
	}
}

