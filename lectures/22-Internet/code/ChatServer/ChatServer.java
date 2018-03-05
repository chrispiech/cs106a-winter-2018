/* 
 * File: FacePamphlet.java
 * -----------------------
 * When it is finished, this program will implement a basic social network
 * management system.
 */


import java.util.ArrayList;
import java.util.List;

import acm.program.*;


public class ChatServer extends ConsoleProgram 
implements SimpleServerListener {

	private static final int PORT = 8080;

	private SimpleServer server = null;

	/* The server database is an ArrayList of Strings */
	private ArrayList<String> messages = new ArrayList<String>();

	public void run() {
		setFont("Courier-24");
		println("Starting server on port "+PORT+"...");
		server = new SimpleServer(this, PORT);
		server.start();
	}

	public String requestMade(Request request) {
		println(request.toString());
		String command = request.getCommand();
		
		String result = "Error: Can't process request " + request.getCommand();
		// we handle newMsg commands
		if(command.equals("newMsg")) {
			result = addMessage(request);
		}
		// we also handle getMsgs commands
		if(command.equals("getMsgs")) {
			result = getMessages(request);
		}
		
		println(" => " + result);
		return result;	
	}

	/**
	 * Get Messages
	 * ------------
	 * This method handles a single internet request with the command cmd.
	 */
	private String getMessages(Request request) {
		int startIndex = Integer.parseInt(request.getParam("index"));
		List<String> toSend = messages.subList(startIndex, messages.size());
		return toSend.toString();
	}

	/**
	 * Add Message
	 * ------------
	 * This method adds a single message to its database
	 */
	private String addMessage(Request request) {
		String msg = request.getParam("msg");
		messages.add(msg);
		return "success";
	}


}
