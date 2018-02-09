/* 
 * FirstFilesExample.java
 * ----------------------
 * This program shows an example of reading a file.
 */

import acm.program.*;
import acm.util.*;
import java.io.*;

public class Files_AnotherFilesExample extends ConsoleProgram {
    
    public void run() {
    	setFont("Times New Roman-24");

    	BufferedReader rd = openFile("File to open: ");

		try {
    		while (true) {
    			String line = rd.readLine();
    			if (line == null) break;
    			println("Read line: [" + line + "]");
    		}
    		rd.close();
    	} catch (IOException ex) {
    		throw new ErrorException(ex);
    	}
   
    }
    
    private BufferedReader openFile(String prompt) {
    	BufferedReader rd = null;
    	
    	while (rd == null) {
    		try {
    			String name = readLine(prompt);
    			rd = new BufferedReader(new FileReader(name));
    		} catch (IOException ex) {
				// key: rd is still null here, so the loop does not end!
    			println("Can't open that file, chief.");
    		}
    	}
    	
    	return rd;
    }
    
}
