
import acm.graphics.*;
import acm.program.*;

public class HumanGenomeRedux extends ConsoleProgram {
	
	public void run() {
		setFont("Courier-24");
		String strand1 = "ATGCCAGGAG";
		String strand2 = "GGAGTTACATCCTT";
		String composed = compose(strand1, strand2);
		println("s1      : " + strand1);
		println("s2      : " + strand2);
		println("composed: " + composed);
		println("expect  : " + "ATGCCAGGAGTTACATCCTT");
	}
	
	/**
	 * Finds the overlap region between strand1 and strand2, assumes
	 * they form a longer sequence, and returns the longer sequence.
	 * For now, only works if strand1 is before strand2 in the longer
	 * sequence.
	 * @param strand1  DNA snippet
	 * @param strand2  DNA snippet
	 * @return A longer DNA snippet resulting from merging the inputs.
	 */
	private String compose(String strand1, String strand2) {
		// loop over the first strand of DNA
		for(int i = 0; i < strand1.length(); i++) {
			
			// substring returns the part of a string after a given index
			String rest = getSuffix(strand1, i);
			
			// if the two strings overlap
			if(overlaps(rest, strand2)) {
				// return the start of the first string, plus the entire second
				return getPrefix(strand1, i) + strand2;
			}
		}
		return strand1 + strand2;
	}

	// Returns the string starting up until (not including) index i
	private String getPrefix(String str, int i) {
		return str.substring(0, i);
	}

	// Returns the string starting at index i
	private String getSuffix(String str, int i) {
		return str.substring(i);
	}

	// Returns true if the second input starts with the first
	private boolean overlaps(String prefix, String longString) {
		return longString.startsWith(prefix);
	}

	
}
