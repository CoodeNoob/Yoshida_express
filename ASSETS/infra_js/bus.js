export class Bus {
  constructor(busNumber, busName, totalSeats) {
    this.busNumber = busNumber;
    this.busName = busName;
    this.totalSeats = totalSeats;
  }

  showInfo() {
    console.log(`Bus: ${this.busName} (${this.busNumber}) - Seats: ${this.totalSeats}`);
  }
}

