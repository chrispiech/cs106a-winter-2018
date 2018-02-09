/* 
 * FirstArrayListExample.java
 * ---------------------------
 * This program shows an example of using an ArrayList.
 */

import acm.program.*;
import java.util.*;

public class FirstArrayListExample extends ConsoleProgram {

	public void run() {
		setFont("Courier New-bold-24");

		// Make a new list (initially empty)
		ArrayList<String> strList = new ArrayList<String>();

		// Put two strings into your list
		strList.add("hi");
		strList.add("there");

		// Get elements from the list
		println("You can get elements by index: ");
		println(strList.get(1));
		println(strList.get(0));

		// Loop over the list
		println("\nYou can loop over elements: ");
		for(String str : strList) {
			// This gives you the elements one at a time
			// each time it puts the current element into
			// a variable called str
			println(str);
		}

		// A second way to loop over the list
		println("\nA second way to loop: ");
		for(int i = 0; i < strList.size(); i++) {
			String str = strList.get(i);
			// This gives you the elements one at a time
			// each time it puts the current element into
			// a variable called str
			println(str);
		}
	}

} 	
