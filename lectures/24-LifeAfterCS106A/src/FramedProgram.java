import java.awt.Color;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.ArrayList;
import java.util.HashMap;

import javax.swing.JButton;
import javax.swing.JFrame;

public class FramedProgram implements ActionListener {

	// most programs still have a run
	public void run() {
		JFrame frame = new JFrame();
		frame.setSize(800, 600);
		JButton button = new JButton("Example");
		button.addActionListener(this);
		frame.add(button, "South");
		frame.setVisible(true);
		System.out.println("Hello, world");
	}
	
	@Override
	public void actionPerformed(ActionEvent e) {
		System.out.println("button pressed");
	}

	// all programs must have a main
	public static void main(String[] args) {
		// the main job of main is to create an instance...
		FramedProgram programInstance = new FramedProgram();
		programInstance.run();
	}

	
}
