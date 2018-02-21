import acm.graphics.*;
import acm.program.*;
import acm.util.*;
import java.util.*;
import java.io.*;

public class StressTest extends ConsoleProgram {
	
	private static final int N_ITEMS = 10000000; // 10 million
	private static final int N_GETS = 1000;

	private RandomGenerator rg = new RandomGenerator();
	
	public void run() {
		println("Creating google database");
		Map<String, String> google = new HashMap<String, String>(N_ITEMS);
		for(int i = 0; i < N_ITEMS; i++) {
			if( i % 1000000 == 0) println(i);
			String key = "http://www.site" + i + ".com";
			String value = makeRandomValue();
			google.put(key, value);
		}
		
		println("Testing google database");
		long startTime = System.currentTimeMillis();
		for(int i = 0; i < N_GETS; i++) {
			String key = "http://www.site" + rg.nextInt(N_ITEMS) + ".com";
			String value = google.get(key);
		}
		long endTime = System.currentTimeMillis();
		long elapsedTime = endTime - startTime;
		double averageTime = (double) elapsedTime/N_GETS;
		println("Average get time: " + averageTime);
	}

	private String makeRandomValue() {
		return "Test";
	}
	
	
}
