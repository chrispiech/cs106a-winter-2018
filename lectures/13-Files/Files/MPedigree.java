
import acm.graphics.*;
import acm.program.*;
import acm.util.RandomGenerator;

public class MPedigree extends ConsoleProgram {

	private static final int N_BOXES = 100;
	private static final int ID_DIGITS = 4;
	private static final int RAND_DIGITS = 6;
	
	private RandomGenerator rg = new RandomGenerator();
	
	public void run() {
		setFont("Courier-24");
		for(int i = 0; i < N_BOXES; i++) {
			String code = makeCode(i);
			println(code);
		}
	}

	/**
	 * Makes a code to put on a pill box that is both (1) unique and
	 * (2) unguessable. The code will always be of length 10.
	 */
	private String makeCode(int uniqueId) {
		String code = "";
		
		// create the random part
		for(int i = 0; i < RAND_DIGITS; i++) {
			int randDigit = rg.nextInt(0, 9);
			code += randDigit;
		}
		
		// add a string version of the unique Id
		code += makeStringOfLength(uniqueId, ID_DIGITS);
		
		return code;
	}

	/**
	 * Turns the input "num" into a string. Padds the string with
	 * zeros until it is of length strLength.
	 */
	private String makeStringOfLength(int num, int strLength) {
		String str = "" + num;
		while(str.length() < strLength) {
			str = "0" + str;
		}
		return str;
	}

}
