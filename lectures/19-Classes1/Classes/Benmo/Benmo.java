
import java.awt.event.ActionEvent;
import java.util.*;

import javax.swing.*;

import acm.program.*;

public class Benmo extends GraphicsProgram {

	public void run() {
		
		// make two "instances" of our new bank account type
		BankAccount chris = new BankAccount();
		BankAccount nick = new BankAccount();
		
		// change a few of the "instance variables" in the bank accounts
		chris.name = "Chris";
		chris.money = 1500;
		
		nick.name = "Nick";
		nick.money = 2600;
		
		// access the "instance variables"
		println("Nick's money: " + nick.money);
		println("Chris's account name: " + chris.name);
	}

	

}