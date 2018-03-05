import acm.program.ConsoleProgram;

public class EchoServerSoln extends ConsoleProgram implements SimpleServerListener{

	private SimpleServer server = new SimpleServer(this, 8090);
	
	public void run() {
		setFont("Courier-24");
		server.start();
		println("Starting server...");
	}

	public String requestMade(Request request) {
		// get the command and print it
		String cmd = request.getCommand();
		println("Command received on server: " + cmd);
		
		// look for a secret message
		if(request.hasParam("secret")) {
			String secretParam = request.getParam("secret");
			println("secret message: " + secretParam);
		} else {
			println("no secret message");
		}
		
		// return a message
		int cmdLength = cmd.length();
		String toReturn = "Your command was " + cmdLength + " chars long.";
		println("Response: " + toReturn);
		println("---\n");
		return toReturn;
	}
	
}
