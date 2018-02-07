
import acm.graphics.*;
import acm.program.*;

public class RNAtoDNA extends ConsoleProgram {
	
	//U, C, A, G

	public void run() {
		setFont("Courier-24");
		String rna = readLine("rna: ");
		String dna = dnaMatch(rna);
		println("dna: " + dna);
	}

	private String dnaMatch(String rna) {
		String dna = "";
		for(int i = 0; i < rna.length(); i++) {
			char rnaBase = rna.charAt(i);
			dna += basePairMatch(rnaBase);
		}
		return dna;
	}

	private char basePairMatch(char basePair) {
		if(basePair == 'U') return 'A';
		if(basePair == 'C') return 'G';
		if(basePair == 'A') return 'T';
		if(basePair == 'G') return 'C';
		throw new RuntimeException("Never hear of a " + basePair);
	}

}
