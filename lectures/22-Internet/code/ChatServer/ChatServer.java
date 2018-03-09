/* 
 * File: FacePamphlet.java
 * -----------------------
 * When it is finished, this program will implement a basic social network
 * management system.
 */

import java.util.ArrayList;
import java.util.List;

import acm.program.*;

public class ChatServer extends ConsoleProgram implements SimpleServerListener {

	// my computer is like a big electronic ship yard
	private static final int PORT = 8080;

	// the server variable
	private SimpleServer server = null;

	// good old run...
	public void run() {
		// print some stuff
		setFont("Courier-24");
		println("Starting server on port "+PORT+"...");
		
		// make + start the server
		server = new SimpleServer(this, PORT);
		server.start();
	}

	// good old requestMade...
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

	// ever growin list of messages
	private ArrayList<String> allMessages = new ArrayList<String>();
	
	// respond to a "getMsgs" command
	private String getMessages(Request request) {
		
		int index = Integer.parseInt(request.getParam("index"));
		List<String> sub = allMessages.subList(index, allMessages.size());
		
		return sub.toString();
	}

	// respond to a "newMsg" command
	private String addMessage(Request request) {
		String newMessage = request.getParam("msg");
		
		allMessages.add(newMessage);
		
		return "success";
	}


}
