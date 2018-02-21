import acm.graphics.*;
import acm.program.*;
import acm.util.*;
import java.util.*;
import java.io.*;

public class WhatDoesTheFoxSay extends ConsoleProgram {
	
	public void run() {
		HashMap<String, String> animalSoundMap = 
				new HashMap<String, String>();
		
		// Put things into the map
		animalSoundMap.put("dog", "woof");
		animalSoundMap.put("cat", "meow");
		animalSoundMap.put("seal", "ow ow ow");
		
		// Get things out of the map
		animalSoundMap.get("dog"); // "woof"
		animalSoundMap.get("fox"); // null
	}
}
