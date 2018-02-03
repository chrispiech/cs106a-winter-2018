
import acm.program.*;
import acm.graphics.*;
import acm.util.*;
import java.awt.*;
import java.awt.event.*;

public class Example1 extends GraphicsProgram {
	
	
	public void run() {
		GRect first = new GRect(20, 30);
		GRect second = new GRect(20, 30);
		println(first == second);
	}
}

