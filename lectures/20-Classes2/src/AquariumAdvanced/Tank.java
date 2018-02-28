/*
 * File: BlankClass.java
 * ---------------------
 * This class is a blank one that you can change at will. Remember, if you change
 * the class name, you'll need to change the filename so that it matches.
 * Then you can extend GraphicsProgram, ConsoleProgram, or DialogProgram as you like.
 */

import java.util.ArrayList;

import acm.graphics.GCanvas;
import acm.graphics.GImage;
import acm.program.*;
import acm.util.RandomGenerator;

public class Tank extends GCanvas {
	
	private static final int N_FISHES = 7;
	private static final int N_CRABS = 2;
	public static final int SCREEN_WIDTH = 800;
	public static final int SCREEN_HEIGHT = 600;
	private static final double FOOD_CHANCE = 0.02;
	
	private ArrayList<Fish> fishes = new ArrayList<Fish>();
	private ArrayList<Food> foods = new ArrayList<Food>();
	private ArrayList<Crab> crabs = new ArrayList<Crab>();
	

	public void init() {
		addBackground();
		addSeaLife();
	}
	
	private void addBackground() {
		GImage img = new GImage("background.jpg");
		img.setSize(getWidth(), getHeight());
		add(img);
	}

	private void addSeaLife() {
		for(int i = 0; i < N_FISHES; i++) {
			Fish fish = new Fish();
			// put the fish on the screen
			add(fish.getImage());
			// put the fish into an arraylist (for animation)
			fishes.add(fish);
		}
		for(int i = 0; i < N_CRABS; i++) {
			Crab crab = new Crab();
			add(crab.getImage());
			crabs.add(crab);
		}
		
		
	}

	public void heartbeat() {
		maybeAddFood();
		for(Fish fish : fishes) {
			fish.heartbeat(crabs, foods);
		}
		for(Crab crab : crabs) {
			crab.heartbeat();
		}
		foodCollisionDetection();
	}

	private void foodCollisionDetection() {
		ArrayList<Food> remainingFood = new ArrayList<Food>();
		for(Food food : foods) {
			if(noFishCollision(food)) {
				remainingFood.add(food);
			} else {
				remove(food.getOval());
			}
		}
		foods = remainingFood;
	}

	private boolean noFishCollision(Food food) {
		for(Fish f : fishes) {
			if(f.getImage().contains(food.getLocation())) {
				return false;
			}
		}
		return true;
	}

	private void maybeAddFood() {
		boolean addFood = RandomGenerator.getInstance().nextBoolean(FOOD_CHANCE);
		if(addFood) {
			Food f = new Food();
			add(f.getOval());
			foods.add(f);
			
		}
	}
	
}

