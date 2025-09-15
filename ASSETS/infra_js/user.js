export class User {
  constructor(firstName, lastName, userName, phoneNumber, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.phoneNumber = phoneNumber;
    this.password = password;
  }

  // Getters
  get getFirstName() {
    return this.firstName;
  }

  get getLastName() {
    return this.lastName;
  }

  get getUserName() {
    return this.userName;
  }

  get getPhoneNumber() {
    return this.phoneNumber;
  }

  get getPassword() {
    return this.password;
  }

  // Setters
  set setFirstName(name) {
    this.firstName = name;
  }

  set setLastName(name) {
    this.lastName = name;
  }

  set setUserName(name) {
    this.userName = name;
  }

  set setPhoneNumber(number) {
    this.phoneNumber = number;
  }

  set setPassword(pass) {
    this.password = pass;
  }

  // Method to display user info (except password)
  showInfo() {
    console.log(`Name: ${this.firstName} ${this.lastName}`);
    console.log(`Username: ${this.userName}`);
    console.log(`Phone: ${this.phoneNumber}`);
  }
}
