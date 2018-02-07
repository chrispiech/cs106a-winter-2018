
import acm.graphics.*;
import acm.program.*;

public class PalindromeSoln extends ConsoleProgram {


	public void run() {
		setFont("Courier-24");
		testPalindrome("abba", true);
		testPalindrome("racecar", true);
		testPalindrome("racecars", false);
		testPalindrome("chris piech", false);
		testPalindrome("stressed desserts", true);
		testPalindrome("Go hang a salami!  I'm a lasagna hog", true);
		testPalindrome("Mr. Owl ate my metal worm.", true);
		testPalindrome("여보, 안경 안보여", true);
		testPalindrome("여보, 안경 안보", false);
		testPalindrome("بلح تعلق تحت قلعة حلب", false);
		testPalindrome("بلح تعلق تحت قلعت حلب", true);
		testPalindrome("कड़क", true);
		testPalindrome("上海自來水來自海上", true);
	}

	private void testPalindrome(String string, boolean solution) {
		if(isPalindrome(string) != solution) {
			println("Test failed:");
		} else {
			println("Test passed:");
		}
		println(string);
		if(solution) {
			println("It is a palindrome.");
		} else {
			println("It is not a palindrome.");
		}
		println("");
	}

	private boolean isPalindrome(String original) {
		String normalized = normalize(original);
		String reversed = reverse(normalized);
		return reversed.equals(normalized);
	}
	
	private boolean isPalindrome2(String original) {
		String normalized = normalize(original);
		println(normalized);
		for(int i = 0; i < normalized.length(); i++) {
			char a = normalized.charAt(i);
			char b = normalized.charAt(normalized.length() - 1 - i);
			println(a + "\t" + b);
			if(a != b) {
				return false;
			}
		}
		return true;
	}

	private String normalize(String original) {
		String toReturn = "";
		for(int i = 0; i < original.length(); i++) {
			char ch = original.charAt(i);
			if(Character.isLetter(ch)) {
				toReturn += Character.toLowerCase(ch);
			}
		}
		return toReturn;
	}

	private String reverse(String original) {
		String toReturn = "";
		for(int i = 0; i < original.length(); i++) {
			toReturn = original.charAt(i) + toReturn;
		}
		return toReturn;
	}

}
