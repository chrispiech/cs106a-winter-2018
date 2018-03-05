import acm.program.ConsoleProgram;

public class EchoServer extends ConsoleProgram implements SimpleServerListener{

	private SimpleServer server = new SimpleServer(this, 8090);
	
	public void run() {
		server.start();
		println("Starting server...");
	}
	
	public void init() {
		setFont("Courier-24");
	}

	public String requestMade(Request request) {
		String cmd = request.getCommand();
		int cmdLength = cmd.length();
		return "Your command was " + cmdLength + " chars long.";
	}
	
}
