export class Ticket {
  constructor(id, passengerName, busNumber, date, seatNumber) {
    this.id = id;
    this.passengerName = passengerName;
    this.busNumber = busNumber;
    this.date = date;
    this.seatNumber = seatNumber;
  }

  // Getters
  get getId() {
    return this.id;
  }

  get getPassengerName() {
    return this.passengerName;
  }

  get getBusNumber() {
    return this.busNumber;
  }

  get getDate() {
    return this.date;
  }

  get getSeatNumber() {
    return this.seatNumber;
  }

  showDetails() {
    console.log(`${this.passengerName} - ${this.busNumber} - Seat ${this.seatNumber}`);
  }
}