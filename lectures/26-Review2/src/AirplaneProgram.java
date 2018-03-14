/* FILE: AirplaneProgram.java
 * --------------------------
 * This program shows how we can create a new
 * Airplane instance and board/unboard passengers.
 */

import acm.program.*;

public class AirplaneProgram extends ConsoleProgram {
	
	public void run() {
		int capacity = readInt("Capacity? ");
		Airplane plane = new Airplane(capacity);
		
		// Board passengers
		while (!plane.isFull()) {
			String passengerName = readLine("Name: ");
			boolean priority = readBoolean("Priority? (true/false) ");
			plane.boardPassenger(passengerName, priority);
		}
		
		// fly...
		
		// Unboard passengers
		while (!plane.isEmpty()) {
			String passengerName = plane.unboardPassenger();
			println("Unboarded " + passengerName);
		}
	}
}
