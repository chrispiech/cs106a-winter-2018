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

	/**
	 * Method: Init
	 * -----------------------------
	 * Good old init method
	 */
	public void init() {
		setFont("Courier-24");
		add(new JLabel("Message: "), SOUTH);
		add(msgField, SOUTH);
		add(new JButton("Send"), SOUTH);
		add(new JButton("Refresh"), SOUTH);
		addActionListeners();
	}
	
	/**
	 * Method: Run
	 * -----------------------------
	 * Good old run method
	 */
	public void run() {
		userName = readLine("Enter username: ");
	}

	/**
	 * Method: Action Performed
	 * -----------------------------
	 * Called when a button is pressed
	 */
	public void actionPerformed(ActionEvent actionEvent) {
		String buttonTxt = actionEvent.getActionCommand();
		if(buttonTxt.equals("Send")) {
			sendMessage();
		}
		if(buttonTxt.equals("Refresh")) {
			refresh();
		}
	}

	private void refresh() {
		// TODO Auto-generated method stub
		
	}

	private void sendMessage() {
		try {
			Request request = new Request("newMsg");
			request.addParam("msg", msgField.getText());
			SimpleClient.makeRequest(HOST, request);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * Method: Make List From String
	 * -----------------------------
	 * This is a wonderfully useful method that takes a list in string form
	 * and turns it into and ArrayList. For example the string:
	 *   "[cs106a, rocks, socks]" 
	 * Will return an ArrayList with three elements: "cs106a" "rocks" and "socks"
	 */
	private ArrayList<String> makeListFromString(String listStr) {
		ArrayList<String> friends = new ArrayList<String>();
		String raw = listStr.substring(1, listStr.length() - 1);
		String[] parts = raw.split(",");
		for(String part : parts) {
			String str = part.trim();
			if(!str.isEmpty()){
				friends.add(str);
			}
		}
		return friends;
	}


}
