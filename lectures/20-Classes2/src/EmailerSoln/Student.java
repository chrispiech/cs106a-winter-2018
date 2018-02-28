
public class Student {

	// each student has an email
	private String email;
	
	// each student has a name
	private String name;
	
	// make a student by giving the name and email
	public Student(String name, String emailAddress) {
		this.email = emailAddress;
		this.name = name;
	}

	// a "getter" for email
	public String getEmail() {
		return email;
	}

	// a "getter" for name
	public String getName() {
		return name;
	}
	
	// overrides the default to string
	public String toString() {
		return name;
	}
	
}
