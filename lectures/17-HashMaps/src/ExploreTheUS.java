import acm.graphics.*;
import acm.program.*;
import acm.util.*;
import java.util.*;
import java.io.*;

public class ExploreTheUS extends ConsoleProgram {
	/* The name of the US cities file. */
	private static final String CITIES_FILE = "us-cities.txt";
	
	public void run() {
		HashMap<String, GPoint> citiesMap = readUSCities();
		
		while (true) {
			String cityName = readLine("Enter a US city: ").toLowerCase();
			if (citiesMap.containsKey(cityName)) {
				println("  That city is at " + citiesMap.get(cityName));
			} else {
				println("  I am so deeply, deeply sorry. I don't know where that is.");
			}
		}
	}
	
	private HashMap<String, GPoint> readUSCities() {
		HashMap<String, GPoint> result = new HashMap<String, GPoint>();
		try {
			BufferedReader br = new BufferedReader(new FileReader(CITIES_FILE));
			
			while (true) {
				String cityName = br.readLine();
				String latitude = br.readLine();
				String longitude = br.readLine();
				if (longitude == null) break;
				
				GPoint pt = new GPoint(Double.parseDouble(longitude),
						               Double.parseDouble(latitude));
				result.put(cityName.toLowerCase(), pt);
			}
			
			br.close();			
		} catch (IOException e) {
			println(":-(");
		}
		return result;
	}
}
