import java.util.Scanner;

public class Age {
	
	private void run() {
		Scanner console = new Scanner(System.in);
        System.out.print("What's your name? ");
        String name = console.nextLine();
        System.out.print("How old are you? ");
        int age = console.nextInt();
        int years = 65 - age;
        System.out.println(name + " has " + years
                + " years until retirement!");
        console.close();
	}
	
    public static void main(String[] args) {
        Age program = new Age();
        program.run();
    }
}
