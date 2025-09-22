// New file: ASSETS/infra_js/checkout.js

let selectedPayment = null;
let bookedBusInfo = null;
let busData = null;

// Listen for the page to load to retrieve the data
document.addEventListener("DOMContentLoaded", () => {

    //PREPARE  FOR BREAD CRUMD
    let lastSearch = JSON.parse(localStorage.getItem("lastSearchParams"));

    if (lastSearch) {
        let searchLink = document.querySelector(".breadcrumb .search-buses a");
        if (searchLink) {
            searchLink.href = `../TEMPLATE/searchBus.html?date=${lastSearch.date}&fromLocation=${lastSearch.fromLocation}&toLocation=${lastSearch.toLocation}`;
        }
    }

    const bookedInfoString = localStorage.getItem("bookedBusInfo");
    bookedBusInfo = bookedInfoString ? JSON.parse(bookedInfoString) : null;

    // Load bus data from localStorage, fallback to empty array
    const busesString = localStorage.getItem("Buses");
    busData = busesString ? JSON.parse(busesString) : [];

    if (bookedBusInfo) {
        document.getElementById("bus-name").textContent = bookedBusInfo.busName;
        const busRoute = bookedBusInfo.from + " - " + bookedBusInfo.to;
        document.getElementById("bus-route").textContent = busRoute;
        const busSeat = bookedBusInfo.bookedSeat;
        document.getElementById("booked-seats").textContent = busSeat;
        document.getElementById("total-price").textContent = bookedBusInfo.grandPrice + " MMK";
    }

    // Format today's date: 21 Sept 2025
    const today = new Date();
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    document.getElementById("todayDate").textContent = today.toLocaleDateString('en-GB', options);
});

// Select payment method
function selectPayment(card, type) {
    document
        .querySelectorAll(".payment-card")
        .forEach((c) => c.classList.remove("selected"));
    card.classList.add("selected");
    selectedPayment = type;
    document.getElementById("confirmBtn").disabled = false;
}

// Validate passenger info
function validatePassengerInfo() {
    const name = document.getElementById("nameInput").value;
    const phone = document.getElementById("phoneInput").value;

    if (name === "" || phone === "") {
        alert("⚠️ Please fill in all passenger information fields!");
        return false;
    }
    return { name, phone };
}

// Confirm payment
function confirmPayment() {
    if (!selectedPayment) {
        alert("⚠️ Please select a payment method before confirming!");
        return;
    }

    const passengerData = validatePassengerInfo();
    if (!passengerData) return;

    // Hide payment form and show receipt
    document.getElementById("form2").classList.remove("active");
    const receipt = document.getElementById("receiptBox");
    setTimeout(() => receipt.classList.add("active"), 200);

    // Update progress bar
    document.querySelectorAll(".progress-step")[2].classList.add("active");

    // Create booking object
    const newBooking = {
        name: passengerData.name,
        phone: passengerData.phone,
        busName: bookedBusInfo.busName,
        from: bookedBusInfo.from,
        to: bookedBusInfo.to,
        date: bookedBusInfo.bookedDate,
        time: bookedBusInfo.bookedTime,
        seats: bookedBusInfo.bookedSeat.join(", "),
        totalPrice: bookedBusInfo.grandPrice,
        paymentMethod: selectedPayment
    };

    console.log("hello");

    // Update bus data in localStorage
    for (let key in busData) {
        if (busData.hasOwnProperty(key)) {  // make sure it's own property
            const bus = busData[key];
            if (bus.BusId == bookedBusInfo.busId) {
                // Initialize OcupiedSeat
                if (!Array.isArray(bus.OcupiedSeat)) bus.OcupiedSeat = [];

                // Add booked seats
                bookedBusInfo.bookedSeat.forEach(seat => {
                    if (!bus.OcupiedSeat.includes(seat)) {
                        bus.OcupiedSeat.push(seat);
                    }
                });

                // Update AvailableSeats
                bus.AvailableSeats = bus.TotalSeat - bus.OcupiedSeat.length;
            }
        }
    }


    console.log("+++++++++++");
    console.log(busData);

    localStorage.setItem("Buses", JSON.stringify(busData));

    // Save to booking history
    saveToHistory(newBooking);

    // Populate receipt
    document.getElementById("receiptName").textContent = newBooking.name;
    document.getElementById("receiptPhone").textContent = newBooking.phone;
    document.getElementById("receiptBusName").textContent = newBooking.busName;
    document.getElementById("receiptFrom").textContent = newBooking.from;
    document.getElementById("receiptTo").textContent = newBooking.to;
    document.getElementById("receiptDate").textContent = newBooking.date;
    document.getElementById("receiptTime").textContent = newBooking.time;
    document.getElementById("receiptSeats").textContent = newBooking.seats;
    document.getElementById("receiptGrandPrice").textContent = newBooking.totalPrice;
    document.getElementById("receiptPaymentMethod").textContent = getPaymentName(selectedPayment);
}

// Save booking history to localStorage
function saveToHistory(bookingData) {
    const history = JSON.parse(localStorage.getItem('bookingHistory')) || [];
    history.push(bookingData);
    localStorage.setItem('bookingHistory', JSON.stringify(history));
}

// Convert payment type to readable name
function getPaymentName(type) {
    switch (type) {
        case 'kbz': return 'KBZPay';
        case 'wave': return 'WavePay';
        case 'aya': return 'APay';
        case 'cash': return 'Cash';
        default: return '';
    }
}

// Go to next step
function nextStep(step) {
    if (step === 1) {
        const passengerData = validatePassengerInfo();
        if (!passengerData) return;

        document.getElementById("form1").classList.remove("active");
        setTimeout(() => document.getElementById("form2").classList.add("active"), 200);
        document.querySelectorAll(".progress-step")[1].classList.add("active");
    }
}

// Go to previous step
function prevStep(step) {
    if (step === 2) {
        document.getElementById("form2").classList.remove("active");
        setTimeout(() => document.getElementById("form1").classList.add("active"), 200);
        document.querySelectorAll(".progress-step")[1].classList.remove("active");
    }
}

// Go back to home
function goToHome() {
    localStorage.removeItem("reservedBus");
    localStorage.removeItem("bookedBusInfo");
    window.location.href = "../index.html";
}
