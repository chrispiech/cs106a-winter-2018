/* 
 * File: FacePamphlet.java
 * -----------------------
 * When it is finished, this program will implement a basic social network
 * management system.
 */

import acm.program.*;
import java.awt.event.*;
import java.io.IOException;
import java.util.*;
import javax.swing.*;

public class ChatClient extends ConsoleProgram{

	private static final String HOST = "http://localhost:8080/";

	private String userName = "";
	private JTextField msgField = new JTextField(15);
	private int currMessageIndex = 0;

	public void init() {
		// add all your interactors...
		setFont("Courier-24");
		add(new JLabel("Message: "), SOUTH);
		add(msgField, SOUTH);
		add(new JButton("Send"), SOUTH);
		add(new JButton("Refresh"), SOUTH);
		addActionListeners();
	}
	
	// good old run...
	public void run() {
		userName = readLine("Enter username: ");
		loadMessages();
	}

	// gotta handle those buttons
	public void actionPerformed(ActionEvent actionEvent) {
		String buttonStr = actionEvent.getActionCommand();
		if(buttonStr.equals("Send")) {
			// do something...
		} 
		if(buttonStr.equals("Refresh")) {
			// do something...
		}
		
	}

	// the send button method
	private void send() {
		try {
			// construct a request
			Request request = new Request("newMsg");
			String msg = userName + ": " + msgField.getText();
			request.addParam("msg", msg);
			
			// send the request
			SimpleClient.makeRequest(HOST, request);
		} catch (IOException e) {
			// live wild on the internet.
			e.printStackTrace();
		}
	}
	
	// the load messages button
	private void loadMessages() {
		try {
			// construct the request
			Request request = new Request("getMsgs");
			request.addParam("index", "" +currMessageIndex);
			
			// make the request
			String str = SimpleClient.makeRequest(HOST, request);
			
			// process the response
			ArrayList<String> newMessages = makeListFromString(str);
			for(String msg : newMessages) {
				println("> " + msg);
			}
			currMessageIndex += newMessages.size();
		} catch (IOException e) {
			// live wild on the internet.
			e.printStackTrace();
		}
	}

	private ArrayList<String> makeListFromString(String listStr) {
		// construct this list to return
		ArrayList<String> list = new ArrayList<String>();
		// remove the [ and ] characters
		String raw = listStr.substring(1, listStr.length() - 1);
		// split is useful!
		String[] parts = raw.split(",");
		for(String part : parts) {
			// get rid of white space
			String str = part.trim();
			if(!str.isEmpty()){
				// don't add empty strings
				list.add(str);
			}
		}
		// return the list
		return list;
	}


}
