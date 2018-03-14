/* FILE: Airplane.java
 * -------------------
 * This class encapsulates the boarding logic for an Airplane.
 * You create an Airplane with a given capacity, and then can
 * board/unboard passengers based on priority, and check whether
 * the airplane is full or empty.
 */

import java.util.*;

public class Airplane {
	
	/* A list of all passengers.  Low priority passengers are
	 * added to the back, and high priority passengers are added
	 * to the front.
	 */
	private ArrayList<String> passengers;
	
	// The maximum number of people that can board this plane
	private int capacity;
	
	// Creates a new airplane with the given capacity
	public Airplane(int numSeats) {
		capacity = numSeats;
		passengers = new ArrayList<String>();
	}

	/*
	 * This method adds the given passenger to the front if
	 * they are a priority passenger, and otherwise adds them to
	 * the back.
	 */
	public void boardPassenger(String name, boolean priority) {
		if (!isFull()) {
			if (priority) {
				passengers.add(0, name);
			} else {
				passengers.add(name);
			}
		}
	}
	
	/*
	 * This method returns true if there is no more available
	 * space, or false otherwise.
	 */
	public boolean isFull() {
		return capacity == passengers.size();
	}

	/*
	 * This method returns true if there are no more
	 * passengers, or false otherwise. 
	 */
	public boolean isEmpty() {
		return passengers.isEmpty();
	}

	/*
	 * This method returns the next passenger, from front to back,
	 * that should be unboarded, and removes them from our list.
	 */
	public String unboardPassenger() {
		if (!isEmpty()) {
			return passengers.remove(0);
		}
		return null;
	}
}

