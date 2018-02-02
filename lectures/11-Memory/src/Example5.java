
import acm.program.*;
import acm.graphics.*;
import acm.util.*;
import java.awt.*;
import java.awt.event.*;

public class Example5 extends GraphicsProgram {
	
	private GRect brick;
	public void update() {
		GObject collider = getCollidingObject();
		if(collider == brick) {
			remove(brick);
		}
	}
	
	
	
	private GObject getCollidingObject() {
		// TODO Auto-generated method stub
		return null;
	}
}

