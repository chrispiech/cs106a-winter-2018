
public class Email {

	// every email has an address
	private String toAddress;
	
	// every email has a subject
	private String subject;
	
	// every email has text
	private String body;

	// this is how you make a new email
	public Email(String toAddress, String subject) {
		this.toAddress = toAddress;
		this.subject = subject;
		this.body = "Email body is blank (sortof)";
	}

	// for testing purposes it is useful to have a "toString" method
	public String toString() {
		String str = "";
		str += "To: " + toAddress + "\n";
		str += "Subject: " + subject + "\n";
		str += "Text:\n" + body;
		return str;
	}

	// warning: actually sends an email!
	public void send() {
		EmailSender sender = new EmailSender();
		sender.send(toAddress, subject, body);
	}
	
	// sets the body of the email
	public void setBody(String newBody) {
		this.body = newBody;
	}

}