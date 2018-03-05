import acm.program.ConsoleProgram;

public class EchoServer extends ConsoleProgram {

	// this makes an object which can receive server requests
	// it passes those server requests to "this" class.
	// the second parameter is the port to listen on.
	private SimpleServer server = null;
	
	public void run() {
		setFont("Courier-24");
		server.start();
		println("Starting server...");
	}
	
}
