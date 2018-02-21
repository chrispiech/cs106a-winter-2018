import acm.graphics.*;
import acm.program.*;
import acm.util.*;
import java.util.*;
import java.io.*;

public class PhoneBookSolution extends ConsoleProgram {
	
	public void run() {
		setFont("Courier-24");
		HashMap<String, Integer> phoneBook = 
				new HashMap<String, Integer>();
		
		phoneBook.put("Chris", 8666586);
		phoneBook.put("Waddie", 6701679);
		phoneBook.put("Jenny", 8675309);
		phoneBook.put("Nick", 1234567);
		phoneBook.put("Nick", 5551212);
		
		runCommandLoop(phoneBook);
		
	}

	private void runCommandLoop(HashMap<String, Integer> phoneBook) {
		while(true) {
			String cmd = readLine("Enter command (printAll, add, lookup): ");
			if(cmd.equals("printAll")) {
				printMap(phoneBook);
			}
			if(cmd.equals("add")){
				addToMap(phoneBook);
			}
			if(cmd.equals("lookup")){
				lookup(phoneBook);
			}
			println("");
		}
	}

	private void lookup(HashMap<String, Integer> phoneBook) {
		String key = readLine("Key: ");
		Integer phoneNumber = phoneBook.get(key);
		if(phoneNumber == null) {
			println("Sorry but there is no number for " + key);
		} else {
			println(key + ": " + phoneNumber);
		}
	}

	private void addToMap(HashMap<String, Integer> phoneBook) {
		String key = readLine("Key: ");
		int phoneNumber = readInt("Phone number: " );
		phoneBook.put(key, phoneNumber);
		println("Added " + key);
	}

	private void printMap(HashMap<String, Integer> phoneBook) {
		// not garunteed to be in order
		for(String key : phoneBook.keySet()) {
			int phoneNumber = phoneBook.get(key);
			println(key + ": " + phoneNumber);
		}
	}
	
	
}
