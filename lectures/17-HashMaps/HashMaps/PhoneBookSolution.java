import acm.graphics.*;
import acm.program.*;
import acm.util.*;
import java.util.*;
import java.io.*;

public class PhoneBookSolution extends ConsoleProgram {
	
	public void run() {
		setFont("Courier-24");
		
		// This hash map stores the data of my program
		HashMap<String, Integer> phoneBook = 
				new HashMap<String, Integer>();
		
		// Prefill the database with a few key/value pairs
		phoneBook.put("Chris", 8666586);
		phoneBook.put("Waddie", 6701679);
		phoneBook.put("Jenny", 8675309);
		
		// Run a loop which allows the user to interact with
		// the database
		runCommandLoop(phoneBook);
		
	}

	// Allows the user to printAll, add, or lookup numbers
	private void runCommandLoop(HashMap<String, Integer> phoneBook) {
		while(true) {
			// Get the command from the user
			String cmd = readLine("Enter command (printAll, add, lookup): ");
			
			// Process the command
			if(cmd.equals("printAll")) {
				printMap(phoneBook);
			} else if(cmd.equals("add")){
				addToMap(phoneBook);
			} else if(cmd.equals("lookup")){
				lookup(phoneBook);
			} else {
				println("Unknown command: " + cmd);
			}
			
			// Add an empty line between commands
			println("");
		}
	}

	// Ask the user for the name, and look up the corresponding phone #
	private void lookup(HashMap<String, Integer> phoneBook) {
		String key = readLine("Key: ");
		if(!phoneBook.containsKey(key)) {
			println("Sorry but there is no number for " + key);
		} else {
			int phoneNumber = phoneBook.get(key);
			println(key + ": " + phoneNumber);
		}
	}

	// Adds a new key/value pair to the hashmap
	private void addToMap(HashMap<String, Integer> phoneBook) {
		String key = readLine("Key: ");
		int phoneNumber = readInt("Phone number: " );
		phoneBook.put(key, phoneNumber);
		println("Added " + key);
	}

	// Print out all key value pairs
	private void printMap(HashMap<String, Integer> phoneBook) {
		for(String key : phoneBook.keySet()) {
			println(key + " is " + phoneBook.get(key));
		}
	}
	
	
}
