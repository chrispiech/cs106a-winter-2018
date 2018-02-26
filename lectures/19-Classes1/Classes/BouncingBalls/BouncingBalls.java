
import java.awt.event.ActionEvent;
import java.util.*;

import javax.swing.*;

import acm.program.*;

public class BouncingBalls extends GraphicsProgram {

	private static final int DELAY = 3;
		
	ArrayList<Ball> balls = new ArrayList<Ball>();
	
	public void init() {
		JButton ballButton = new JButton("Add ball");
		add(ballButton, SOUTH);
		addActionListeners();
	}
	
	public void run() {
		while(true) {
			animateBalls();
			pause(DELAY);
		}
	}
	
	private void animateBalls() {
		for(Ball ball : balls) {
			ball.heartbeat(getWidth(), getHeight());
		}
	}
	
	public void actionPerformed(ActionEvent e) {
		Ball newBall = new Ball(getWidth(), getHeight());
		balls.add(newBall);
		add(newBall.getGOval());
	}

}