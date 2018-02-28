
public class Date {

	private int year;
	private int month;
	private int day;

	public Date(int y, int m, int d) {
		this.year = y;
		this.month = m;
		this.day = d;
	}

	public Date(Date other) {
		this.year = other.year;
		this.month = other.month;
		this.day = other.day;
	}
	
	public int daysUntil(Date other) {
		Date copy = new Date(this);
		int count = 0;
		while(!copy.equals(other)) {
			copy.incrementDay();
			count++;
		}
		return count;
	}

	public void incrementDay() {
		this.day += 1;
		if(this.day > numberOfDaysInCurrentMonth()) {
			this.day = 1;
			this.month += 1;
			if(this.month == 13) {
				this.month = 1;
				this.year += 1;
			}
		}
	}

	public String toString() {
		return this.day + "/" + this.month + "/" + this.year;
	}
	
	public boolean equals(Date other) {
		if(this.year != other.year) return false;
		if(this.month != other.month) return false;
		if(this.day != other.day) return false;
		return true;
	}

	private int numberOfDaysInCurrentMonth() {
		if(month == 2) {
			if(isLeapYear()) {
				return 29;
			} else {
				return 28;
			}
		}
		if(month % 2 == 1 && month <= 7) {
			return 31;
		}
		return 30;
	}

	private boolean isLeapYear() {
		if(year % 4 != 0) return false;
		if(year % 100 != 0) return true;
		if(year % 400 != 0) return false;
		return true;
	}

}
