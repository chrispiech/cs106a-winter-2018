/* 
 * SimpleArrayListExample.java
 * ---------------------------
 * This program shows an example of using an ArrayList.
 */

import acm.program.*;
import java.util.*;

public class SimpleArrayListExample extends ConsoleProgram {
	
	public void run() {
    	setFont("Courier New-bold-24");

    	ArrayList<String> strList = new ArrayList<String>();
		
    	readList(strList);
		printArrayList(strList);
	}
	
	private void readList(ArrayList<String> list) {
		String line = readLine("Next line: ");
		while (!line.equals("")) {
			list.add(line);
			line = readLine("Next line: ");
		}
	}
	
	private void printArrayList(ArrayList<String> list) {
		println("List contains "  + list.size() + " elements");
		for(int i = 0; i < list.size(); i++) {
			println(list.get(i));
		}
	}

} 	
 