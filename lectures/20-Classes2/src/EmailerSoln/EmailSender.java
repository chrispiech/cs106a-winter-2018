import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class EmailSender {


	/******************************************************************** 
	 *       WARNING: You are breaking the "wall of abstraction"        *
	 *       ---------------------------------------------------        *
	 *  By design, the only thing that I want you to know about         *
	 *  EmailSender is that you can make one (using a constructor with  *
	 *  no parameters) and it exposes a single method "send":           *
	 *                                                                  *
	 *    public void send(String toEmail, String subject, String body) *
	 *                                                                  *   
	 *  Which sends an email to the toEmail address, with the given     *
	 *  subject and body, from cs106a.winter.18@gmail.com. You can look *
	 *  into how the class is implemented.... but you should be able to *
	 *  use the class without knowing the details.                      *
	 *                                                                  *
	 ********************************************************************/

	private static final String FROM_ADDRESS = "cs106a.winter.18@gmail.com";
	private static final String FROM_PASSWORD = "radiantPillow";


	// This is top secret code. But you can check out the "API"
	public void send(String toEmail, String subject, String body) {
		Session session = getSession();
		try {
			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress(FROM_ADDRESS));
			message.setRecipients(Message.RecipientType.TO,
					InternetAddress.parse(toEmail));
			message.setSubject(subject);
			message.setText(body);
			Transport.send(message);
		} catch (MessagingException e) {
			throw new RuntimeException(e);
		}
	}

	// returns a gmail session which can be used to send an email
	private Session getSession() {
		// if you already made a session, use it!
		if(cachedSession != null) {
			return cachedSession;
		}
		Properties props = new Properties();
		props.put("mail.smtp.host", "smtp.gmail.com");
		props.put("mail.smtp.socketFactory.port", "465");
		props.put("mail.smtp.socketFactory.class",
				"javax.net.ssl.SSLSocketFactory");
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.port", "465");

		// super complex java! uses an anonymous function :-)
		Session session = Session.getDefaultInstance(props,
				new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(FROM_ADDRESS,getTopSecretPassword());
			}
		});
		
		// back up the session for future use
		cachedSession = session;
		return session;
	}

	protected String getTopSecretPassword() {
		return FROM_PASSWORD;
	}

	// some advanced java to make my emails send faster
	private static Session cachedSession = null;
}
