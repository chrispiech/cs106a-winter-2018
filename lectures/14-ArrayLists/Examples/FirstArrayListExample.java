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

     	ArrayList<String> strList = new ArrayList<String>();

     	strList.add("hi");
     	strList.add("there");
     	
     	println(strList.get(0));
     	println(strList.get(1));
 	}

} 	
 