/*
 * File: GameShow.java
 * --------------------
 * Review of concepts from the first two days of Java
 */
import acm.program.*;

public class GameShow extends ConsoleProgram {

	public void run() {
		// makes the display font size large so you can see it!
		setFont("Courier-24");
		println("Welcome to the CS106A game show!");
		println("Choose a door and win a prize");
		
		int door = readInt("Door: ");
		// while the input is invalid
		while(door < 1 || door > 3) {
			// tell the user the input was invalid
			println("Invalid door!");
			// ask for a new input
			door = readInt("Door: ");
		}
		println("You chose door " + door);
		
		// door logic
		int prize = 3;
		if(door == 1) {
			prize = 2 + 9 / 10 * 100;
		} else if(door == 2) {
			boolean locked = prize % 2 != 1;
			if(!locked) {
				prize += 7;
			}
		} else {
			prize++;
		}
		
		println("You win $" + prize);
	}
}

