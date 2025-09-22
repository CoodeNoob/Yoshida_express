// New file: ASSETS/infra_js/checkout.js

let selectedPayment = null;
let bookedBusInfo = null;

// Listen for the page to load to retrieve the data
document.addEventListener("DOMContentLoaded", () => {
    const bookedInfoString = localStorage.getItem("bookedBusInfo");
    bookedBusInfo = JSON.parse(bookedInfoString);

});

function selectPayment(card, type) {
    document
        .querySelectorAll(".payment-card")
        .forEach((c) => c.classList.remove("selected"));
    card.classList.add("selected");
    selectedPayment = type;
    document.getElementById("confirmBtn").disabled = false;
}

function validatePassengerInfo() {
    const name = document.getElementById("nameInput").value;
    const phone = document.getElementById("phoneInput").value;

    if (name === "" || phone === "") {
        alert("⚠️ Please fill in all passenger information fields!");
        return false;
    }
    return {
        name,
        phone
    };
}

function confirmPayment() {
    if (!selectedPayment) {
        alert("⚠️ Please select a payment method before confirming!");
        return;
    }

    const passengerData = validatePassengerInfo();
    if (!passengerData) {
        return;
    }

    // Hide payment form and show receipt
    document.getElementById("form2").classList.remove("active");
    const receipt = document.getElementById("receiptBox");
    setTimeout(() => receipt.classList.add("active"), 200);

    // Update progress bar
    document.   All(".progress-step")[2].classList.add("active");

    // Create a single object with all booking data
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
    
    // Save the new booking to history
    saveToHistory(newBooking);

    // Populate the receipt with the newly created booking object
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

// Function to save booking data to localStorage
function saveToHistory(bookingData) {
    // Get existing history from localStorage, or initialize an empty array if none exists
    const history = JSON.parse(localStorage.getItem('bookingHistory')) || [];
    
    // Add the new booking data to the history array
    history.push(bookingData);
    
    // Save the updated array back to localStorage
    localStorage.setItem('bookingHistory', JSON.stringify(history));
}

// Helper function to convert the payment type to a readable name
function getPaymentName(type) {
    switch(type) {
        case 'kbz':
            return 'KBZPay';
        case 'wave':
            return 'WavePay';
        case 'aya':
            return 'APay';
        case 'cash':
            return 'Cash';
        default:
            return '';
    }
}

function nextStep(step) {
    if (step === 1) {
        const passengerData = validatePassengerInfo();
        if (!passengerData) {
            return;
        }

        document.getElementById("form1").classList.remove("active");
        setTimeout(
            () => document.getElementById("form2").classList.add("active"),
            200
        );

        document
            .querySelectorAll(".progress-step")[1]
            .classList.add("active");
    }
}

function prevStep(step) {
    if (step === 2) {
        document.getElementById("form2").classList.remove("active");
        setTimeout(
            () => document.getElementById("form1").classList.add("active"),
            200
        );

        document
            .querySelectorAll(".progress-step")[1]
            .classList.remove("active");
    }
}

function goToHome() {
    localStorage.removeItem("reservedBus");
    localStorage.removeItem("bookedBusInfo");
    window.location.href = "../index.html";
}