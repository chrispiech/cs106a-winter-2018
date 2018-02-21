import acm.graphics.*;
import acm.program.*;
import acm.util.*;
import java.util.*;
import java.io.*;

public class DiceGameFixed extends ConsoleProgram {

	private static final int N_PLAYERS = 2;
	private static final int START_MONEY = 100;
	private static final int BET_AMOUNT = 10;

	private RandomGenerator rg = new RandomGenerator();

	public void run() {
		setFont("Courier-24");
		int[] scores = new int[N_PLAYERS];
		for(int i = 0; i < scores.length; i++) {
			scores[i] = START_MONEY;
		}
		while(true) {
			for(int i = 0; i < scores.length; i++) {
				playTurn(scores, i);
				if(scores[i] <= 0) break;
			}
		}

	}

	private void playTurn(int[] scores, int i) {
		println("Player " + (i+1) + "'s turn. $" + scores[i]);
		String category = readLine("even or odd: ");
		int roll = getRoll();
		if(isWinningCategory(roll, category)) {
			println("You won");
			scores[i] += BET_AMOUNT;
		} else {
			println("You lost");
			scores[i] -= BET_AMOUNT;
		}
		println("");
	}

	private boolean isWinningCategory(int roll, String category) {
		if(category.equals("odd")) {
			return roll % 2 == 1;
		} else {
			return roll % 2 == 0;
		}
	}

	private int getRoll() {
		int roll = rg.nextInt(1, 6);
		println("You rolled a: " + roll);
		return roll;
	}

}
