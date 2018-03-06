import acm.program.ConsoleProgram;

public class EchoServer extends ConsoleProgram implements SimpleServerListener{

	// this makes an object which can receive server requests
	// it passes those server requests to "this" class.
	// the second parameter is the port to listen on.
	private SimpleServer server = new SimpleServer(this, 8090);
	
	public void run() {
		setFont("Courier-24");
		server.start();
		println("Starting server...");
	}

	public String requestMade(Request request) {
		println("I received a request!!!!");
		String cmd = request.getCommand();
		if(request.hasParam("secret")) {
			String secret = request.getParam("secret");
			println("SHH I got a secret: " + secret);
		}
		
		int n = cmd.length();
		println("Cmd is: " + cmd);
		return "The length of the command is: " + n;
	}
	
}
