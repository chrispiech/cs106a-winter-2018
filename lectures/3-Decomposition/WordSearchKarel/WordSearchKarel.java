/* ************************************************************
File: WordSearchKarel.java

The overall aim of this program is for Karel to create a word
search with a high degree of randomness and then have him find 
the hidden words. In this version which is appended due to 
humanistic limitations, Karel knows four words; KAREL, JAVA, 
CARDINAL and CHRIS (Thats me :p). Once the human user is given
a chance to try and solve the puzzle, Karel will search out all
the words he knows. Overall I found this task especially
challenging due to the high degree of forethought and perspective
of the whole map which is required in creating a word search.

 Watch Karel create and solve his own word search!

 ****To Hide The Words*****
 One of the most interesting parts about creating an algorithm
 for this word search was learning how non-systematic word
 searches actually are. When creating a word search there is no
 simple equation that can be applied. While they can be placed
 completely randomly one at a time, one of the short fallings of 
 this method is that it could allow for the creation of a game
 where there is no space to possibly fit the last few words
 (especially on a 10 by 8 map). To overcome this problem I 
 taught Karel a way of hiding the words which combines
 strategic placing and still maintains a good degree of random-
 ness. Of course this is also helped by the fact that four words
 are not too many to hide :).

 First Karel hides the word CARDINAL. He places it upright and
 randomly chooses a column to put it in. However, because of
 the length of this words I made him strongly favor the sides
 of the game as this caused less disruption in the placing of
 the other words. [note: in order to choose randomly from n
 variables I had the boolean chance of the first variable 1/n
 the boolean chance of the second variable 1/(n-1) and so on
 until the last one is 1. When multiplied out the probability
 becomes (n-1)/n * (n-2)/(n-1) ... 1/2 which = 1/n] 

 To place CHRIS, Karel randomly chooses a row, checks where
 CARDINAL is placed and with his remaining options randomly
 selects a location

 To place JAVA and KAREL, which I made bounded together (this
 decision was made not because placing them randomly separately
 was impossible, but simply because the code was becoming
 outrageously long and without variables etc, it would not have
 been worth the effort), Karel will randomly choose any spot on
 the board (minus spots which are too close to the edge for the
 bounded words to fit) then check if there are any letters
 already in the way. If there are words in the way it will just
 look again (with the algorithm created I can be %100 sure
 there will be space for the JAVA KAREL hybrid). If it finds
 an empty spot it writes in the words.

 The algorithm for finding if the area where Karel is going to
 write the KAREL JAVA hybrid was very interesting to create.
 If I were to make the wordsearch completely random this is
 exactly the algorithm I would use, however I figured If I did
 it once, I could demonstrate I had the ability without
 coding myself to death :). To check for emptiness I introduced
 what I called the error beeper. If Karel ever came across a
 letter in its path it would place an error beeper at the letter
 it stood (one beeper above the identification beeper). The
 continuation of the search is all dependent on the absence
 of this error beeper and if the search ended with an error beeper
 in existence it would look for a brand new location for the words
 while remembering to put the error beeper away first of course :).
 Though this process may seem simple, keeping the error beepers
 in place without Karel confusing an error beeper with the 
 identification beeper of a letter was harder than it seemed
 especially due to Karels lack of coordinates. Its also important
 to note that while Karel places JAVA and KAREL together he is
 oblivious to this fact and will search for both words
 independently.
 ****

 ****To Find The Words****
 As you may notice, in the bottom left hand side of each letter
 is a pile of beepers. Seeing as Karel, until this moment was
 illiterate, this is how he identified letters. Each letter
 has a number equivalent which is represented by the stack.
 However, while this may seem simple, reading and remembering
 what he reads are more challenging. To check if a letter is the
 one Karel is looking for, he will place the beepers temporarily
 to the side. If he is looking for a letter with 8 beepers he
 will repeat the step remove beeper if it exists 7 times. Then if
 there are no more beepers he knows there were 7 or less beepers
 and this is not his letter. If there are still beepers he will
 move one more beeper over. If at this point there are no more
 beepers he knows that before there were exactly 8 beepers on the
 spot and this is the word he was looking for. Being the well 
 trained robot he is, Karel will always return the beepers from
 where he got them.

 The actual searching for specific words was by far the most code
 consuming function. This is because it required large amounts of
 deeply nested codes and while much of the code was similar it could
 not be simplified because of the restrictions placed on this 
 assignment.

 To make life easier I made each word have a designated direction.
 In my mind I can clearly visualize how I would confront the
 problem of not knowing the direction before hand but if I had
 done this the already long codes for searching for words would
 have been increased exponentially not to mention the added
 dilemma of how to be sure these new words would all fit into
 the map. I approximated the added code would be about 7x the
 current code which due to the unfortunate demands of my other
 classes was not my best option.

 Once Karel was sufficiently convinced he had found the word he
 made an attempt to circle it. Due to the very large nature of
 the pixels and my lack of intrinsic aesthetic skills, the circling
 doesnt always look as professional as I would like it to. (see
 jAVA)
 ****

 ****How To Run****
 To run wordsearch Karel you MUST run it on a 49x47 blank world.

 There are two ways of running Word Search Karel; the fast way 
 and the slow way.

 In the slow way you can see Karels general movements and from
 this get an insight into the algorithms which occur behind the
 scenes in creating this puzzle. 

 In the fast version, it is supposed to simulate an actual word
 search game. It will draw the puzzle in what seems to be an
 instant, give the viewer some time to try and solve the problem
 and then show the solution. I also added in a real silly intro
 and end screen shot which makes me smile :). To run this, note
 out the section in run titled "slow run" and run Karel at
 full speed

 ****Final Note****
 A final note on style. In this program I tried my best to keep
 a readable code which was efficient and well programmed. 
 However due to the long nature of a complicated program in
 Karel and the absolute necessity of deeply imbedded clauses
 it was not always as stylistic as I would have liked it to be.

 Moreover, a comment on these notes is that they only cover the
 broader algorithms which dealt with the bigger issues that I
 faced. There are numerous difficulties which were overcome that
 had a more minor role in the overall function of the puzzle.
 (such as how to circle CARDINAL with a rectangle of the same
 width considering its different locations in the game)

 **************************************************************/

import stanford.karel.*;

public class WordSearchKarel extends SuperKarel {

	// This is a non-standard Karel line I used for demo purposes only.
	private static final boolean FAST_RUN = true;
	
	/**
	 * Method: Run
	 * -----------
	 * Creates a puzzle and solves it. Assumes that Karel
	 * starts in the bottom left of a large, empty world.
	 */
	public void run() {		
		displayIntroMessage();
		createPuzzle();
		solvePuzzle();									
		displayEndMessage();
	}

	/**
	 * Method: Create Puzzle:
	 * ---------------------
	 * Hide several words. Assumes that Karel starts and
	 * ends on the bottom-left facing East between each call.
	 */
	private void createPuzzle()	{
		placeCardinal();
		placeChris();
		placeKarelAndJava();
		fillEmptySpaces();
	}

	/**
	 * Method: Solve Puzzle:
	 * ---------------------
	 * Find the hidden words. Assumes that Karel starts and
	 * ends on the bottom-left facing East between each call.
	 */
	private void solvePuzzle(){
		delay();
		checkForKarel();						
		checkForCardinal();						
		checkForChris();					
		checkForJava();
		delay();	
	}
	
	/**
	 * Method: Place Cardinal
	 * ---------------------
	 * Hides the world CARDINAL. The word will be hidden
	 * vertically in the 1st, 2nd, 8th or 9th column with
	 * equal probability. Karel starts and ends on the 
	 * bottom-left facing East. 
	 */
	private void placeCardinal() {
		moveToTopRow();
		if(random(0.25)) { 
			// p = 1/4
			writeCardinal();
		} else {
			if(random(.3333))	{ 
				// p = 3/4 * 1/3 = 1/4
				moveForwardOneLetter();
				writeCardinal();
			}
			else {
				for(int i=0;i<8;i++) { 
					moveForwardOneLetter();
				}
				if(random(.5)){ 
					// p = 3/4 * 1/3 * 1/2 = 1/4
					writeCardinal();
				} else{
					// p = 3/4 * 1/3 * 1/2 = 1/4
					moveForwardOneLetter();
					writeCardinal();
				}
			}
		}
		returnToStart();
	}
	
	/**
	 * Method: Check For Karel
	 * ---------------------
	 * Looks for the word KAREL in the word search.
	 * Assumes that KAREL is hidden horizontally and
	 * that there are 7 rows. Karel begins and ends at
	 * the "home" position.
	 */
	private void checkForKarel(){
		for(int j = 0;j < 7;j++){
			checkRowForKarel();
			moveUpToNextRow();
		}
		checkRowForKarel();
		returnToStart();
		delay();	
	}

	private void checkRowForKarel() {
		for(int i=0;i<6;i++){	
			checkIfKarel();
			moveForwardOneLetter();
		}
	}
	
	private void placeChris(){
		if(random(0.125))
			writeChrisInRow();
		else if(random(0.1429))	{
			moveOneLetterUp();
			writeChrisInRow();
		}
		else if(random(0.1667))	{
			for(int i=0;i<2;i++)
				moveOneLetterUp();
			writeChrisInRow();
		}
		else if(random(0.2)){
			for(int i=0;i<3;i++)
				moveOneLetterUp();
			writeChrisInRow();
		}
		else if(random(0.25)){
			for(int i=0;i<4;i++)
				moveOneLetterUp();
			writeChrisInRow();
		}
		else if(random(0.3333)){
			for(int i=0;i<5;i++)
				moveOneLetterUp();
			writeChrisInRow();
		}
		else if(random(0.5)){
			for(int i=0;i<6;i++)
				moveOneLetterUp();
			writeChrisInRow();
		}
		else{
			moveToTopRow();
			writeChrisInRow();
		}
		returnToStart();
	}

	private void placeKarelAndJava()	{
		do {
			if(beepersPresent()) {
				if(rightIsClear()) {
					pickBeeper();
					returnToStart();
				}
			}
			if(random(0.2000)) {		//place in row 1
				moveToTopRow();
				placeCSInColumn();
			} else {
				if(random(0.2500)) {	//place in row 2
					for(int i=0;i<6;i++)
						moveOneLetterUp();
					placeCSInColumn();
				}
				else {
					if(random(0.3333)) {	//place in row 3
						for(int i=0;i<5;i++)
							moveOneLetterUp();
						placeCSInColumn();
					}
					else {
						if(random(0.5000)) {	//place in row 4
							for(int i=0;i<4;i++)
								moveOneLetterUp();
							placeCSInColumn();
						}
						else {						//place in row 5
							for(int i=0;i<3;i++)
								moveOneLetterUp();
							placeCSInColumn();
						}
					}
				}
			}
		}
		while(beepersPresent());
		returnToStart();
	}

	private void moveToTopRow() {
		for(int i=0;i<7;i++)
			moveOneLetterUp();
	}

	private void writeChrisInRow() {
		if(beepersPresent()) {	
			if(random(.2))
				moveForwardOneLetter();
			else if(random(.25)) {
				for(int i=0;i<2;i++)
					moveForwardOneLetter();
			}
			else if(random(.3333)) {
				for(int i=0;i<3;i++)
					moveForwardOneLetter();
			}
			else if(random(.5))	{
				for(int i=0;i<4;i++)
					moveForwardOneLetter();
			}
			else {
				for(int i=0;i<5;i++)
					moveForwardOneLetter();
			}
		}
		else {
			moveForwardOneLetter();
			if(beepersPresent()) {
				if(random(.25)) {
					moveForwardOneLetter();
				}
				else if(random(.3333)) {
					for(int i=0;i<2;i++)
						moveForwardOneLetter();
				}
				else if(random(.5))	{
					for(int i=0;i<3;i++)
						moveForwardOneLetter();
				}
				else {
					for(int i=0;i<4;i++)
						moveForwardOneLetter();
				}
			}
			else {
				for(int i=0;i<7;i++)
					moveForwardOneLetter();
				if(beepersPresent()) {
					if(random(.25)) {
						for(int i=0;i<8;i++)
							moveBackOneLetter();
					}
					else if(random(.3333)) {
						for(int i=0;i<7;i++)
							moveBackOneLetter();
					}
					else if(random(.5))	{
						for(int i=0;i<6;i++)
							moveBackOneLetter();
					}
					else {
						for(int i=0;i<5;i++)
							moveBackOneLetter();
					}	
				}
				else {
					if(random(.2))	{
						for(int i=0;i<8;i++)
							moveBackOneLetter();
					}
					else if(random(.25)) {
						for(int i=0;i<7;i++)
							moveBackOneLetter();
					}
					else if(random(.3333)) {
						for(int i=0;i<6;i++)
							moveBackOneLetter();
					}
					else if(random(.5))	{
						for(int i=0;i<5;i++)
							moveBackOneLetter();
					}
					else {
						for(int i=0;i<4;i++)
							moveBackOneLetter();
					}
				}
			}				
		}
		writeChris();
	}

	private void checkForCardinal(){
		for(int i=0;i<7;i++) {
			moveOneLetterUp();
		}
		checkIfCardinal();
		moveForwardOneLetter();
		checkIfCardinal();
		for(int i=0;i<7;i++) {
			moveForwardOneLetter();
		}
		checkIfCardinal();
		moveForwardOneLetter();
		checkIfCardinal();
		returnToStart();
		delay();	
	}

	private void moveUpToNextRow() {
		turnLeft();
		move6();
		turnLeft();
		moveToWall();
		turnAround();
	}

	private void moveToWall() {
		while(frontIsClear())
			move();
	}

	private void checkForChris(){
		for(int j=0;j<7;j++){
			checkForChrisInRow();
			moveUpToNextRow();
		}
		checkForChrisInRow();
		returnToStart();
		delay();		
	}



	private void checkForChrisInRow() {
		for(int i=0;i<6;i++){	
			checkIfChris();
			moveForwardOneLetter();
		}
	}

	private void checkForJava(){
		for(int i=0;i<3;i++)
			moveOneLetterUp();
		for(int j=0;j<4;j++){
			for(int i=0;i<7;i++){	
				checkIfJava();
				moveForwardOneLetter();
			}
			turnLeft();
			for(int i=0;i<6;i++)
				move();
			turnLeft();
			moveToWall();
			turnAround();
		}
		for(int i=0;i<7;i++){	
			checkIfJava();
			moveForwardOneLetter();
		}
		returnToStart();
		delay();		
	}

	private void checkIfCardinal()
	{
		if(beepersPresent())
		{
			moveBeeperOver();
			if(beepersPresent())
			{
				moveBeeperOver();
				if(noBeepersPresent()) //C found
				{
					putBeepersBack();
					moveOneLetterDown();
					if(rightIsClear())
					{
						moveBeeperOver();
						if(noBeepersPresent()) //A found
						{
							putBeepersBack();
							moveOneLetterDown();
							if(rightIsClear())
							{
								for(int i=0;i<11;i++)
								{
									safeMoveBeeper();
								}
								if(beepersPresent())
								{
									moveBeeperOver();
									if(noBeepersPresent())	//R found
									{
										putBeepersBack();
										moveOneLetterDown();
										if(rightIsClear())
										{
											for(int i=0;i<2;i++)
											{
												safeMoveBeeper();
											}
											if(beepersPresent())
											{
												moveBeeperOver();
												if(noBeepersPresent())	//D found
												{
													putBeepersBack();
													moveOneLetterDown();
													if(rightIsClear())
													{
														for(int i=0;i<5;i++)
														{
															safeMoveBeeper();
														}
														if(beepersPresent())
														{
															moveBeeperOver();
															if(noBeepersPresent())	//I found
															{
																putBeepersBack();
																moveOneLetterDown();
																if(rightIsClear())
																{
																	for(int i=0;i<9;i++)
																	{
																		safeMoveBeeper();
																	}
																	if(beepersPresent())
																	{
																		moveBeeperOver();
																		if(noBeepersPresent())	//N found
																		{
																			putBeepersBack();
																			moveOneLetterDown();
																			if(rightIsClear())
																			{
																				moveBeeperOver();
																				if(noBeepersPresent()) //A found
																				{
																					putBeepersBack();
																					moveOneLetterDown();	
																					for(int i=0;i<8;i++)
																					{
																						safeMoveBeeper();
																					}
																					if(beepersPresent())
																					{
																						moveBeeperOver();
																						if(noBeepersPresent())	//CARDINAL found
																						{
																							putBeepersBack();
																							circleCardinal();
																						}
																						else {
																							putBeepersBack();
																							moveToTopRow();
																						}
																					}
																					else {
																						putBeepersBack();
																						moveToTopRow();
																					}
																				}
																				else {
																					putBeepersBack();
																					for(int i=0;i<6;i++)
																						moveOneLetterUp();
																				}
																			}
																			else {
																				putBeepersBack();
																				for(int i=0;i<6;i++)
																					moveOneLetterUp();
																			}
																		}
																		else {
																			putBeepersBack();
																			for(int i=0;i<5;i++)
																				moveOneLetterUp();
																		}
																	}
																	else {
																		putBeepersBack();
																		for(int i=0;i<5;i++)
																			moveOneLetterUp();
																	}
																}
																else {
																	putBeepersBack();
																	for(int i=0;i<4;i++)
																		moveOneLetterUp();
																}
															}
															else {
																putBeepersBack();
																for(int i=0;i<4;i++)
																	moveOneLetterUp();
															}
														}
														else {
															putBeepersBack();
															for(int i=0;i<4;i++)
																moveOneLetterUp();
														}
													}
													else {
														putBeepersBack();
														for(int i=0;i<3;i++)
															moveOneLetterUp();
													}
												}
												else {
													putBeepersBack();
													for(int i=0;i<3;i++)
														moveOneLetterUp();
												}
											}
											else {
												putBeepersBack();
												for(int i=0;i<3;i++)
													moveOneLetterUp();
											}
										}
										else {
											putBeepersBack();
											for(int i=0;i<2;i++)
												moveOneLetterUp();
										}
									}
									else {
										putBeepersBack();
										for(int i=0;i<2;i++)
											moveOneLetterUp();
									}
								}
								else {
									putBeepersBack();
									for(int i=0;i<2;i++)
										moveOneLetterUp();
								}
							}
							else {
								putBeepersBack();
								moveOneLetterUp();
							}
						}
						else {
							putBeepersBack();
							moveOneLetterUp();
						}
					}
					else {
						putBeepersBack();
						moveOneLetterUp();
					}
				}
				else
					putBeepersBack();
			}
			else
				putBeepersBack();
		}
		else
			putBeepersBack();
	}

	private void checkIfJava(){
		if(beepersPresent()) {
			for(int i=0;i<6;i++) {
				safeMoveBeeper();
			}
			if(beepersPresent()) {
				moveBeeperOver();
				if(noBeepersPresent()) {	//J found
					putBeepersBack();
					moveForwardOneLetter();
					moveOneLetterDown();
					moveBeeperOver();
					if(noBeepersPresent()) {	// A found
						putBeepersBack();
						moveForwardOneLetter();
						moveOneLetterDown();
						for(int i=0;i<13;i++) {
							safeMoveBeeper();
						}
						if(beepersPresent()) {
							moveBeeperOver();
							if(noBeepersPresent()) {	//V found
								putBeepersBack();
								moveForwardOneLetter();
								moveOneLetterDown();
								moveBeeperOver();
								if(noBeepersPresent()) {	//JAVA found
									putBeepersBack();
									circleJava();
								}
								else {
									putBeepersBack();
									for(int i=0;i<3;i++) {
										moveBackOneLetter();
										moveOneLetterUp();
									}						
								}
							}
							else {
								putBeepersBack();
								for(int i=0;i<2;i++) {
									moveBackOneLetter();
									moveOneLetterUp();
								}						
							}
						}
						else {
							putBeepersBack();
							for(int i=0;i<2;i++) {
								moveBackOneLetter();
								moveOneLetterUp();
							}						
						}
					}
					else {
						putBeepersBack();
						moveBackOneLetter();
						moveOneLetterUp();
					}
				}
				else
					putBeepersBack();
			}
			else
				putBeepersBack();
		}
	}

	private void checkIfChris()
	{
		if(beepersPresent())
		{
			moveBeeperOver();
			if(beepersPresent())
			{
				moveBeeperOver();
				if(noBeepersPresent()) //C found
				{
					putBeepersBack();
					for(int i=0;i<5;i++)
						safeMove();
					if(frontIsClear())
					{
						for(int i=0;i<4;i++)
						{
							safeMoveBeeper();
						}
						if(beepersPresent())
						{
							moveBeeperOver();
							if(noBeepersPresent())	//H found
							{
								putBeepersBack();
								for(int i=0;i<5;i++)
									safeMove();
								if(frontIsClear())
								{
									for(int i=0;i<11;i++)
									{
										safeMoveBeeper();
									}
									if(beepersPresent())
									{
										moveBeeperOver();
										if(noBeepersPresent()) //R found
										{
											putBeepersBack();
											for(int i=0;i<5;i++)
												safeMove();
											if(frontIsClear())
											{
												for(int i=0;i<5;i++)
												{
													safeMoveBeeper();
												}
												if(beepersPresent())
												{
													moveBeeperOver();
													if(noBeepersPresent()) //I found
													{
														putBeepersBack();
														for(int i=0;i<5;i++)
															safeMove();
														for(int i=0;i<12;i++)
														{
															safeMoveBeeper();
														}
														if(beepersPresent())
														{
															moveBeeperOver();
															if(noBeepersPresent()) //CHRIS found
															{
																putBeepersBack();
																circleChris();
															}
															else
															{
																putBeepersBack();
																for(int i=0;i<4;i++)
																	moveBackOneLetter();
															}
														}
														else
														{
															putBeepersBack();
															for(int i=0;i<4;i++)
																moveBackOneLetter();
														}
													}
													else
													{
														putBeepersBack();
														for(int i=0;i<3;i++)
															moveBackOneLetter();
													}	
												}
												else
												{
													putBeepersBack();
													for(int i=0;i<3;i++)
														moveBackOneLetter();
												}
											}
											else
											{
												putBeepersBack();
												for(int i=0;i<3;i++)
													moveBackOneLetter();
											}
										}
										else
										{
											putBeepersBack();
											moveBackOneLetter();
											moveBackOneLetter();
										}
									}
									else
									{
										putBeepersBack();
										moveBackOneLetter();
										moveBackOneLetter();
									}
								}
								else
								{
									putBeepersBack();
									moveBackOneLetter();
									moveBackOneLetter();
								}
							}
							else
							{
								putBeepersBack();
								moveBackOneLetter();
							}
						}
						else
						{
							putBeepersBack();
							moveBackOneLetter();
						}
					}
					else
					{
						putBeepersBack();
						moveBackOneLetter();
					}	
				}
				else
					putBeepersBack();
			}
			else
				putBeepersBack();
		}
	}

	private void checkIfKarel(){
		if(beepersPresent()){
			for(int i=0;i<7;i++) {
				safeMoveBeeper();
			}
			if(beepersPresent()){
				moveBeeperOver();
				if(noBeepersPresent()) {//K found
					putBeepersBack();
					for(int i=0;i<5;i++)
						safeMove();
					if(frontIsClear())	{
						if(beepersPresent()){
							moveBeeperOver();
							if(noBeepersPresent()){	//A found
								putBeepersBack();
								for(int i=0;i<5;i++)
									safeMove();
								if(frontIsClear()){
									for(int i=0;i<11;i++){
										safeMoveBeeper();
									}
									if(beepersPresent()){
										moveBeeperOver();
										if(noBeepersPresent()) {//R found
											putBeepersBack();
											for(int i=0;i<5;i++)
												safeMove();
											if(frontIsClear()){
												for(int i=0;i<3;i++){
													safeMoveBeeper();
												}
												if(beepersPresent()){
													moveBeeperOver();
													if(noBeepersPresent()) {//E found
														putBeepersBack();
														for(int i=0;i<5;i++)
															safeMove();
														for(int i=0;i<8;i++){
															safeMoveBeeper();
														}
														if(beepersPresent()){
															moveBeeperOver();
															if(noBeepersPresent()){ //KAREL found
																putBeepersBack();
																circleKarel();
															}
															else{
																putBeepersBack();
																for(int i=0;i<4;i++)
																	moveBackOneLetter();
															}
														}
														else{
															putBeepersBack();
															for(int i=0;i<4;i++)
																moveBackOneLetter();
														}
													}
													else{
														putBeepersBack();
														for(int i=0;i<3;i++)
															moveBackOneLetter();
													}	
												}
												else{
													putBeepersBack();
													for(int i=0;i<3;i++)
														moveBackOneLetter();
												}
											}
											else{
												putBeepersBack();
												for(int i=0;i<3;i++)
													moveBackOneLetter();
											}
										}
										else{
											putBeepersBack();
											moveBackOneLetter();
											moveBackOneLetter();
										}
									}
									else{
										putBeepersBack();
										moveBackOneLetter();
										moveBackOneLetter();
									}
								}
								else{
									putBeepersBack();
									moveBackOneLetter();
									moveBackOneLetter();
								}
							}
							else{
								putBeepersBack();
								moveBackOneLetter();
							}
						}
						else{
							putBeepersBack();
							moveBackOneLetter();
						}
					}
					else{
						putBeepersBack();
						moveBackOneLetter();
					}	
				}
				else
					putBeepersBack();
			}
			else
				putBeepersBack();
		}
	}

	private void safeMoveBeeper() {
		if(beepersPresent())
			moveBeeperOver();
	}

	private void fillEmptySpaces(){
		for(int i=0;i<9;i++){
			if(noBeepersPresent())
				randomLeter();
			else{
				for(int j=0;j<3;j++)
					move();
			}
			move2();
		}
		if(noBeepersPresent())
			randomLeter();
		else{
			for(int j=0;j<3;j++)
				move();
		}
		for(int i=0;i<7;i++){
			turnLeft();
			for(int j=0;j<6;j++)
				move();
			turnLeft();
			moveToWall();
			turnAround();

			for(int j=0;j<9;j++){
				if(noBeepersPresent())
					randomLeter();
				else{
					for(int k=0;k<3;k++)
						move();
				}
				move2();
			}
			if(noBeepersPresent())
				randomLeter();
		}
		returnToStart();
	}

	private void safeMove(){
		if(frontIsClear())
			move();
	}

	private void randomLeter(){
		if(random(0.0714))		drawA();
		else if(random(.0769))	drawC();
		else if(random(.0833))	drawD();
		else if(random(.0909))	drawE();
		else if(random(.1000))	drawH();
		else if(random(.1111))	drawI();
		else if(random(.1250))	drawJ();
		else if(random(.1429))	drawK();
		else if(random(.1667))	drawL();
		else if(random(.2000))	drawN();
		else if(random(.2500))	drawP();
		else if(random(.3333))	drawR();
		else if(random(.5000))	drawS();
		else 					drawV();
	}
	
	private void displayIntroMessage() {
		if(FAST_RUN) {
			clearScrean();					//FAST RUN
			intro();						//FAST RUN
			delay();
			clearScrean();					//FAST RUN
		}
	}

	private void delay(){
		if(FAST_RUN) {
			for(int j = 0; j < 5; j++) {
				for(int i=0;i<500000;i++) {	
					turnLeft();
				}
			}
		}
	}

	private void putBeepersBack(){
		move();
		while(beepersPresent())	{
			pickBeeper();
			turnAround();
			move();
			putBeeper();
			turnAround();
			move();
		}
		turnAround();
		move();
		turnAround();
	}

	private void moveBeeperOver(){
		pickBeeper();
		move();
		putBeeper();
		turnAround();
		move();
		turnAround();
	}

	private void moveForwardOneLetter(){
		for(int i=0;i<5;i++)
			move();
	}

	private void moveBackOneLetter(){
		turnAround();
		for(int i=0;i<5;i++)
			move();
		turnAround();
	}

	private void returnToStart(){
		turnAround();
		moveToWall();
		turnLeft();
		moveToWall();
		turnLeft();
	}

	private void moveOneLetterUp(){
		turnLeft();
		for(int i=0;i<6;i++)
			move();
		turnRight();
	}

	private void moveOneLetterDown(){
		turnRight();
		for(int i=0;i<6;i++)
			move();
		turnLeft();
	}

	private void writeChris(){
		drawC();
		move2();
		drawH();
		move2();
		drawR();
		move2();
		drawI();
		move2();
		drawS();
	}

	private void writeCS(){
		drawJ();
		move2();
		moveOneLetterDown();
		drawA();
		move2();
		moveOneLetterDown();
		drawV();
		move2();
		moveOneLetterDown();
		drawA();
		moveOneLetterUp();
		moveOneLetterUp();
		for(int i=0;i<3;i++)
			moveBackOneLetter();
		turnAround();
		for(int i=0;i<3;i++)
			move();
		turnAround();
		drawK();
		move2();
		moveForwardOneLetter();
		drawR();
		move2();
		drawE();
		move2();
		drawL();
	}

	private void writeCardinal(){
		drawC();
		turnAround();
		for(int i=0;i<3;i++)
			move();
		turnAround();
		moveOneLetterDown();
		drawA();
		turnAround();
		for(int i=0;i<3;i++)
			move();
		turnAround();
		moveOneLetterDown();
		drawR();
		turnAround();
		for(int i=0;i<3;i++)
			move();
		turnAround();
		moveOneLetterDown();
		drawD();
		turnAround();
		for(int i=0;i<3;i++)
			move();
		turnAround();
		moveOneLetterDown();
		drawI();
		turnAround();
		for(int i=0;i<3;i++)
			move();
		turnAround();
		moveOneLetterDown();
		drawN();
		turnAround();
		for(int i=0;i<3;i++)
			move();
		turnAround();
		moveOneLetterDown();
		drawA();
		turnAround();
		for(int i=0;i<3;i++)
			move();
		turnAround();
		moveOneLetterDown();
		drawL();
	}

	private void moveToErrorMarker(){
		turnLeft();
		move();
	}

	private void returnFromErrorMarker(){
		turnAround();
		move();
		turnLeft();
	}

	private void checkForSpace() {
		if(beepersPresent()) {
			moveToErrorMarker();
			putBeeper();
			returnFromErrorMarker();
		}
		moveToErrorMarker();
		for(int j=0;j<3;j++) {
			if(noBeepersPresent()) {
				for(int i=0;i<4;i++){
					if(noBeepersPresent()) {
						returnFromErrorMarker();
						if(noBeepersPresent()) {
							moveForwardOneLetter();
							if(beepersPresent()) {
								moveToErrorMarker();
								putBeeper();
							}
							else
								moveToErrorMarker();
						}
						else {
							moveToErrorMarker();
							putBeeper();
						}
					}
				}
				if(noBeepersPresent()) {
					turnRight();
					for(int i=0;i<4;i++)
						moveBackOneLetter();
					moveOneLetterDown();	
					turnLeft();
				}
			}
		}
		for(int i=0;i<4;i++){
			if(noBeepersPresent()) {
				returnFromErrorMarker();
				if(noBeepersPresent()) {
					moveForwardOneLetter();
					if(beepersPresent()) {
						moveToErrorMarker();
						putBeeper();
					}
					else
						moveToErrorMarker();
				}
				else {
					moveToErrorMarker();
					putBeeper();
				}
			}
		}
		if(noBeepersPresent()) {
			turnAround();
			move();
			turnLeft();
		}
	}

	private void placeCSInColumn()
	{
		if(random(0.1667)) {		// column 1
			checkForSpace();
			writeCSIfFree();
		}
		else {
			if(random(0.2)) {
				moveForwardOneLetter();
				checkForSpace();
				writeCSIfFree();
			}
			else {
				if(random(0.25)){
					for(int i=0;i<2;i++)
						moveForwardOneLetter();
					checkForSpace();
					writeCSIfFree();
				}
				else {
					if(random(0.3333)){
						for(int i=0;i<3;i++)
							moveForwardOneLetter();
						checkForSpace();
						writeCSIfFree();
					}
					else {
						if(random(0.5)){
							for(int i=0;i<4;i++)
								moveForwardOneLetter();
							checkForSpace();
							writeCSIfFree();
						}
						else {
							for(int i=0;i<5;i++)
								moveForwardOneLetter();
							checkForSpace();
							writeCSIfFree();
						}
					}
				}
			}
		}
	}

	private void writeCSIfFree()
	{
		if(noBeepersPresent()) {
			for(int i=0;i<4;i++)
				moveBackOneLetter();
			for(int i=0;i<3;i++)
				moveOneLetterUp();
			writeCS();
			turnLeft();
			move();
		}
		else {
			while(beepersPresent())
				pickBeeper();
			putBeeper();
		}	
		turnRight();
	}

	private void intro() {
		moveToTopRow();
		turnRight();
		move2();
		turnLeft();
		for(int i=0;i<3;i++)
			moveForwardOneLetter();
		turnAround();
		move2();
		turnAround();
		drawK();
		move2();
		drawA();
		move2();
		drawR();
		move2();
		drawE();
		move2();
		drawL();
		move2();
		moveOneLetterDown();
		for(int i=0;i<4;i++)
			moveBackOneLetter();
		drawC();
		move2();
		drawA();
		move2();
		drawN();
		move2();
		moveOneLetterDown();
		for(int i=0;i<4;i++)
			moveBackOneLetter();
		drawS();
		move2();
		drawP();
		move2();
		drawE();
		move2();
		drawL();
		move2();
		drawL();
		move2();
		moveOneLetterDown();
		moveOneLetterDown();
		for(int i=0;i<4;i++)
			moveBackOneLetter();
		move2();
		drawB();
		moveForwardOneLetter();
		drawY();
		move2();
		moveOneLetterDown();
		for(int i=0;i<3;i++)
			moveBackOneLetter();
		drawC();
		move2();
		drawH();
		move2();
		drawR();
		move2();
		drawI();
		move2();
		drawS();
		move2();
		moveOneLetterDown();
		for(int i=0;i<5;i++)
			moveBackOneLetter();
		drawP();
		move2();
		drawI();
		move2();
		drawE();
		move2();
		drawC();
		move2();
		drawH();
		returnToStart();
	}
	private void displayEndMessage(){
		clearScrean();
		for(int i=0;i<4;i++)
			moveOneLetterUp();
		for(int i=0;i<3;i++)
			moveForwardOneLetter();
		move2();
		move();
		drawE();
		move2();
		drawN();
		move2();
		drawD();
		returnToStart();
		delay();
		clearScrean();
	}
	private void clearScrean(){
		for(int i=0;i<46;i++){
			for(int j=0;j<48;j++){
				paintCorner(WHITE);
				if(beepersPresent()){
					while(beepersPresent())
						pickBeeper();
				}
				move();
			}
			paintCorner(WHITE);
			if(beepersPresent()){
				while(beepersPresent())
					pickBeeper();
			}
			if(facingEast()){
				turnLeft();
				move();
				turnLeft();
			}
			else {
				turnRight();
				move();
				turnRight();
			}
		}
		for(int j=0;j<48;j++){
			paintCorner(WHITE);
			if(beepersPresent()){
				while(beepersPresent())
					pickBeeper();
			}
			move();
		}
		paintCorner(WHITE);
		if(beepersPresent()){
			while(beepersPresent())
				pickBeeper();
		}
		returnToStart();
	}

	private void circleChris()
	{
		for(int i=0;i<3;i++)
			move();
		turnLeft();
		for(int i=0;i<3;i++){
			move();
			paintCorner(BLACK);
		}
		move();
		turnLeft();
		paintCorner(BLACK);
		for(int i=0;i<22;i++){
			move();
			paintCorner(BLACK);
		}
		move();
		turnLeft();
		paintCorner(BLACK);
		for(int i=0;i<3;i++){
			move();
			paintCorner(BLACK);
		}
		move();
		turnLeft();
		paintCorner(BLACK);
		for(int i=0;i<23;i++){
			move();
			paintCorner(BLACK);
		}
		turnAround();
		for(int i=0;i<23;i++)
			move();
		turnAround();
	}

	private void circleJava()
	{
		for(int i=0;i<3;i++) {
			moveBackOneLetter();
			moveOneLetterUp();
		}		
		for(int j=0;j<2;j++) {
			for(int i=0;i<5;i++) {
				paintCorner(BLACK);
				move();
				turnRight();
				move();
				turnLeft();
			}
			paintCorner(BLACK);
			turnRight();
			move();
			paintCorner(BLACK);
			turnLeft();
		}
		for(int i=0;i<6;i++) {
			paintCorner(BLACK);
			move();
			turnRight();
			move();
			turnLeft();
		}
		paintCorner(BLACK);
		move();
		paintCorner(BLACK);
		move();
		turnLeft();
		for(int i=0;i<4;i++) {
			move();
			paintCorner(BLACK);
		}
		for(int j=0;j<3;j++) {
			for(int i=0;i<5;i++) {
				paintCorner(BLACK);
				move();
				turnLeft();
				move();
				turnRight();
			}
			paintCorner(BLACK);
			move();
		}

		turnLeft();
		move();
		for(int i=0;i<2;i++) {
			paintCorner(BLACK);
			move();
		}
		turnLeft();
		for(int i=0;i<3;i++) {
			move();
			paintCorner(BLACK);
		}
		move();
		turnLeft();
	}

	private void circleKarel(){
		for(int i=0;i<3;i++)
			move();
		turnLeft();
		for(int i=0;i<3;i++){
			move();
			paintCorner(BLACK);
		}
		move();
		turnLeft();
		paintCorner(BLACK);
		for(int i=0;i<22;i++){
			move();
			paintCorner(BLACK);
		}
		move();
		turnLeft();
		paintCorner(BLACK);
		for(int i=0;i<3;i++){
			move();
			paintCorner(BLACK);
		}
		move();
		turnLeft();
		paintCorner(BLACK);
		for(int i=0;i<23;i++){
			move();
			paintCorner(BLACK);
		}
		turnAround();
		for(int i=0;i<23;i++)
			move();
		turnAround();
	}

	private void circleCardinal(){
		paintCorner(BLACK);
		for(int i=0;i<3;i++){
			move();
			paintCorner(BLACK);
		}
		if(frontIsBlocked()) {
			turnLeft();
			for(int i=0;i<46;i++){
				move();
				paintCorner(BLACK);
			}
			turnLeft();
			for(int i=0;i<4;i++){
				move();
				paintCorner(BLACK);
			}
			turnLeft();
			for(int i=0;i<46;i++){
				move();
				paintCorner(BLACK);
			}
			turnAround();
			for(int i=0;i<46;i++)
				move();
			turnRight();
			move();
		}
		else {
			move();		
			paintCorner(BLACK);
			turnLeft();
			for(int i=0;i<46;i++){
				move();
				paintCorner(BLACK);
			}
			turnLeft();
			for(int i=0;i<4;i++){
				move();
				paintCorner(BLACK);
			}
			turnLeft();
			for(int i=0;i<46;i++){
				move();
				paintCorner(BLACK);
			}
			turnAround();
			for(int i=0;i<46;i++)
				move();
			turnRight();
		}
	}
	
	private void move2() {
		move();
		move();
	}

	private void move3() {
		for(int i=0; i<3; i++) {
			move();
		}
	}

	private void move4() {
		for(int i=0;i<4;i++)
			move();
	}

	private void move6() {
		for(int i=0;i<6;i++) {
			move();
		}
	}
	
	private void drawA()
	{
		putBeeper();
		turnLeft();
		for(int i=0; i<4;i++){
			paintCorner(GREEN);
			move();
		}
		turnRight();
		move();
		for(int i=0; i<2;i++){
			paintCorner(GREEN);
			move();
		}
		turnRight();
		move();
		for(int i=0; i<3;i++){
			paintCorner(GREEN);
			move();
		}
		paintCorner(GREEN);
		turnAround();
		move2();
		turnLeft();
		for(int i=0; i<2;i++){
			move();
			paintCorner(GREEN);
		}
		turnAround();
		move2();
		turnRight();
		move2();
		turnLeft();
	}
	private void drawC()
	{
		for(int i=0;i<2;i++)
			putBeeper();
		move2();
		turnAround();
		for(int i=0; i<2;i++){
			paintCorner(BLUE);
			move();
		}
		turnRight();
		move();
		for(int i=0; i<3;i++){
			paintCorner(BLUE);
			move();
		}
		turnRight();
		move();
		for(int i=0; i<2;i++){
			paintCorner(BLUE);
			move();
		}
		turnRight();
		move();
		paintCorner(BLUE);
		move2();
		paintCorner(BLUE);
		move();
		turnLeft();
	}

	private void drawD()
	{
		for(int i=0;i<3;i++)
			putBeeper();
		for(int i=0;i<3;i++){
			paintCorner(CYAN);
			move();
		}
		turnLeft();
		move();
		for(int i=0;i<3;i++){
			paintCorner(CYAN);
			move();
		}
		turnLeft();
		move();
		for(int i=0;i<2;i++){
			paintCorner(CYAN);
			move();
		}
		turnLeft();
		for(int i=0;i<4;i++){
			paintCorner(CYAN);
			move();
		}
		turnLeft();
		for(int i=0;i<3;i++){
			paintCorner(CYAN);
			move();
		}
	}

	private void drawE()
	{
		for(int i=0;i<4;i++)
			putBeeper();
		turnLeft();
		for(int i=0; i<4;i++){
			paintCorner(GREEN);
			move();
		}
		paintCorner(GREEN);
		turnRight();
		for(int i=0; i<3;i++){
			move();
			paintCorner(GREEN);
		}
		turnRight();
		move2();
		turnRight();
		for(int i=0; i<2;i++){
			move();
			paintCorner(GREEN);
		}
		move();
		turnLeft();
		move2();
		turnLeft();
		for(int i=0; i<3;i++){
			move();
			paintCorner(GREEN);
		}

	}

	private void drawH()
	{
		for(int i=0;i<5;i++)
			putBeeper();
		turnLeft();
		for(int i=0; i<4;i++){
			paintCorner(MAGENTA);
			move();
		}
		paintCorner(MAGENTA);
		turnAround();
		move2();
		turnLeft();
		for(int i=0; i<2;i++){
			move();
			paintCorner(MAGENTA);
		}
		move();
		turnLeft();
		move2();
		turnAround();
		for(int i=0; i<4;i++){
			paintCorner(MAGENTA);
			move();
		}
		paintCorner(MAGENTA);
		turnLeft();
	}

	private void drawB()
	{
		for(int i=0;i<2;i++)
			putBeeper();
		turnLeft();
		for(int i=0; i<4;i++){
			paintCorner(BLACK);
			move();
		}
		paintCorner(BLACK);
		turnRight();
		for(int i=0; i<2; i++) {
			move();
			paintCorner(BLACK);
		}
		move();
		turnRight();
		move();
		paintCorner(BLACK);
		move();
		turnRight();
		for(int i=0; i<2; i++) {
			move();
			paintCorner(BLACK);
		}
		turnAround();
		move2();
		turnRight();
		move();
		paintCorner(BLACK);
		move();
		turnRight();
		move();
		for(int i=0; i<2; i++) {
			paintCorner(BLACK);
			move();
		}
		turnAround();
	}

	private void drawY()
	{
		for(int i=0;i<6;i++)
			putBeeper();
		move();
		turnLeft();
		for(int i=0; i<3;i++){
			paintCorner(BLACK);
			move();
		}
		turnLeft();
		move();
		turnRight();
		paintCorner(BLACK);
		move();
		paintCorner(BLACK);
		turnRight();
		move2();
		turnRight();
		for(int i=0; i<2;i++){
			paintCorner(BLACK);
			move();
		}
		move2();
		turnRight();
		move2();
		turnAround();
	}

	private void drawI()
	{
		for(int i=0;i<6;i++)
			putBeeper();
		move2();
		turnLeft();
		for(int i=0; i<4;i++){
			paintCorner(ORANGE);
			move();
		}
		paintCorner(ORANGE);
		turnAround();
		move4();
		turnLeft();
		move();
	}

	private void drawJ()
	{
		for(int i=0;i<7;i++)
			putBeeper();
		turnLeft();
		move();
		paintCorner(PINK);
		turnRight();
		move();
		turnRight();
		move();
		paintCorner(PINK);
		turnLeft();
		move();
		turnLeft();
		for(int i=0; i<3;i++){
			move();
			paintCorner(PINK);
		}
		turnLeft();
		move2();
		turnRight();
		move();
		turnRight();
		for(int i=0; i<3;i++){
			paintCorner(PINK);
			move();
		}
		paintCorner(PINK);
		turnRight();
		move4();
		turnLeft();
	}

	private void drawK()
	{
		for(int i=0;i<8;i++)
			putBeeper();
		turnLeft();
		for(int i=0; i<4;i++){
			paintCorner(RED);
			move();
		}
		paintCorner(RED);
		turnRight();
		move3();
		paintCorner(RED);
		turnRight();
		move();
		turnRight();
		move();
		paintCorner(RED);
		turnLeft();
		move();
		turnRight();
		move();
		paintCorner(RED);
		turnLeft();
		move();
		turnLeft();
		move();
		paintCorner(RED);
		turnRight();
		move();
		turnLeft();
		move();
		paintCorner(RED);
	}


	private void drawN()
	{
		for(int i=0;i<10;i++) {
			putBeeper();
		}
		turnLeft();
		for(int i=0;i<4;i++){
			paintCorner(BLUE);
			move();
		}
		paintCorner(BLUE);
		turnRight();
		move();
		turnRight();
		move();
		paintCorner(BLUE);
		turnLeft();
		move();
		turnRight();
		move();
		paintCorner(BLUE);
		move2();
		turnLeft();
		move();
		turnLeft();
		for(int i=0;i<4;i++){
			paintCorner(BLUE);
			move();
		}
		paintCorner(BLUE);
		turnAround();
		move4();
		turnLeft();
	}

	private void drawP()
	{
		for(int i=0;i<11;i++) {
			putBeeper();
		}
		turnLeft();
		for(int i=0;i<4;i++){
			paintCorner(BLUE);
			move();
		}
		paintCorner(BLUE);
		turnRight();
		move();
		for(int i=0;i<2;i++){
			paintCorner(BLUE);
			move();
		}
		turnRight();
		move();
		paintCorner(BLUE);
		move();
		turnRight();
		for(int i=0;i<2;i++){
			move();
			paintCorner(BLUE);
		}
		turnLeft();
		move2();
		turnLeft();
		move2();		
	}

	private void drawR() {
		for(int i=0;i<12;i++) {
			putBeeper();
		}
		turnLeft();
		for(int i=0;i<4;i++){
			paintCorner(CYAN);
			move();
		}
		paintCorner(CYAN);
		turnRight();
		move();
		for(int i=0;i<2;i++){
			paintCorner(CYAN);
			move();
		}
		turnRight();
		move();
		paintCorner(CYAN);
		move();
		turnRight();
		for(int i=0;i<2;i++){
			move();
			paintCorner(CYAN);
		}
		turnAround();
		move2();
		turnRight();
		move();
		paintCorner(CYAN);
		move();
		paintCorner(CYAN);
		turnLeft();
	}

	private void drawS()
	{
		for(int i=0;i<13;i++) {
			putBeeper();
		}
		for(int i=0;i<3;i++){
			paintCorner(RED);
			move();
		}
		turnLeft();
		move();
		paintCorner(RED);
		move();
		turnLeft();
		move();
		for(int i=0;i<2;i++){
			paintCorner(RED);
			move();
		}
		turnRight();
		move();
		paintCorner(RED);
		move();
		turnRight();
		for(int i=0;i<3;i++){
			move();
			paintCorner(RED);
		}
		turnRight();
		move4();
		turnLeft();
	}

	/** 
	 * Method: Draw V
	 * --------------
	 * Makes a letter V which is 5 rows and 4 columns.
	 * The letter is indicated by a pile of 14 beepers,
	 * which is unique to V. Karel starts and ends at
	 * the bottom-left corner of the letter.
	 */
	private void drawV(){
		// unique beeper pile for V
		for(int i=0;i<14;i++) {
			putBeeper();
		}
		
		turnLeft();
		move();
		for(int i=0;i<3;i++){
			move();
			paintCorner(GREEN);
		}
		turnAround();
		move4();
		turnLeft();
		move();
		paintCorner(GREEN);
		turnLeft();
		move();
		turnRight();
		for(int i=0;i<2;i++){
			paintCorner(GREEN);
			move();
		}
		turnLeft();
		for(int i=0;i<3;i++){
			move();
			paintCorner(GREEN);
		}
		turnAround();
		move4();
		turnLeft();
	}
	
	/** 
	 * Method: Draw L
	 * --------------
	 * Makes a letter L which is 5 rows and 4 columns.
	 * The letter is indicated by a pile of 9 beepers,
	 * which is unique to L. Karel starts at the bottom-left 
	 * corner of the letter. Karel ends at the bottom-right
	 */
	private void drawL(){
		// unique beeper pile for L
		for(int i = 0; i < 9; i++) {
			putBeeper();
		}
		drawStem();
		drawLeg();
	}

	/** 
	 * Method: Draw Leg
	 * --------------
	 * Makes the leg of an L (the horizontal line). 
	 * Karel starts at the bottom-left corner of 
	 * the letter. Karel ends at the bottom-right
	 */
	private void drawLeg() {
		for(int i = 0; i < 3; i++){
			move();
			paintCorner(YELLOW);
		}
	}

	/** 
	 * Method: Draw step
	 * --------------
	 * Makes the stem of an L (the vertial line). 
	 * Karel starts and ends at the bottom-left 
	 * corner of the letter facing East.
	 */
	private void drawStem() {
		turnLeft();
		move4();
		turnAround();
		for(int i = 0; i < 4; i++){
			paintCorner(YELLOW);
			move();
		}
		paintCorner(YELLOW);
		turnLeft();
	}

}


