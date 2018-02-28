/*
 * File: BlankClass.java
 * ---------------------
 * This class is a blank one that you can change at will. Remember, if you change
 * the class name, you'll need to change the filename so that it matches.
 * Then you can extend GraphicsProgram, ConsoleProgram, or DialogProgram as you like.
 */

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

import acm.program.*;
import acm.util.RandomGenerator;

public class SpreadTheWord extends ConsoleProgram {

	// number of students to include in the email
	private static final int N_STUDENTS_IN_EMAIL = 5;

	// all the students in CS106A!
	private ArrayList<Student> allStudents = new ArrayList<Student>();

	// send those emails!
	public void run() {
		loadEmails();
		println("Sending emails...");
		for(Student student : allStudents) {
			Email email = new Email("chrisjpiech.test@gmail.com", student.getName());
			String body = generateSocialEmailText(student);
			email.setBody(body);
			email.send();
			println(student);
		}
	}

	// sends a single email to chrisjpiech.test
	private void runTest() {
		Email email = new Email("chrisjpiech.test@gmail.com", "Coding rocks");
		email.setBody("hello, world");
		email.send();
	}

	// makes the body for our little experiment
	private String generateSocialEmailText(Student student) {
		// generate text for the email
		String body = "";
		body += "Dear " + student.getName() + ",\n\n";
		body += "I hope this email finds you well.\n\n";
		body += "As you know, CS106A is a huge class with many wonderful people in it. ";
		body += "In lecture today we built a program to help you meet a few fellow students. ";
		body += "Here are five random people in CS106A. ";
		body += "You can (optionally) introduce yourself:\n";

		List<Student> randomStudents = getRandomStudents(N_STUDENTS_IN_EMAIL);
		for(Student other : randomStudents) {
			body += "   " + other.getName() + ", " + other.getEmail() + "\n";
		}

		body += "\n";
		body += "All the best,\n";
		body += "Chris";
		body += "\n\n";
		body += "P.S. Today we covered 'classes' which introduces a whole new way of thinking about programs";
		return body;
	}

	// returns n random students (without replacement) from the list of
	// all students
	private List<Student> getRandomStudents(int n) {
		RandomGenerator rg = RandomGenerator.getInstance();
		List<Student> chosen = new ArrayList<Student>();
		while(chosen.size() < n) {
			int randIndex = rg.nextInt(allStudents.size());
			Student randStudent = allStudents.get(randIndex);
			// make sure the student isn't already in the list!
			if(!chosen.contains(randStudent)) {
				chosen.add(randStudent);
			}
		}
		return chosen;
	}

	// load all students from the file students.csv
	private void loadEmails() {
		try {
			Scanner sc = new Scanner(new File("students.csv"));
			while(sc.hasNextLine()) {
				String line = sc.nextLine();
				String[] cols = line.split(",");
				String name = cols[0];
				String address = cols[1];
				Student studentEmail = new Student(name, address); 
				allStudents.add(studentEmail);
			}
			sc.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}

