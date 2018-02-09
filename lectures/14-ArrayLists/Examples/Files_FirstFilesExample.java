/* 
 * FilesExample.java
 * -----------------
 * This program shows an example of reading a file.
 */

import acm.program.*;
import acm.util.*;
import java.io.*;

public class Files_FirstFilesExample extends ConsoleProgram {
    
    public void run() {
    	setFont("Times New Roman-24");
    	
    	try {
    		
    		BufferedReader rd = new BufferedReader(new FileReader("file.txt"));
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
    
}
