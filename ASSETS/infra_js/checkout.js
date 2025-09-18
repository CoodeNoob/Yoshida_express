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
    document.querySelectorAll(".progress-step")[2].classList.add("active");

    // Use the data retrieved from localStorage to populate the receipt
    if (bookedBusInfo) {
        document.getElementById("receiptName").textContent = passengerData.name;
        document.getElementById("receiptPhone").textContent = passengerData.phone;
        document.getElementById("receiptBusName").textContent = bookedBusInfo.busName;
        document.getElementById("receiptFrom").textContent = bookedBusInfo.from;
        document.getElementById("receiptTo").textContent = bookedBusInfo.to;
        document.getElementById("receiptDate").textContent = bookedBusInfo.bookedDate;
        document.getElementById("receiptSeats").textContent = bookedBusInfo.bookedSeat.join(", ");
        document.getElementById("receiptGrandPrice").textContent = bookedBusInfo.grandPrice;
    }

    console.log("Payment method selected:", selectedPayment);
    console.log("Passenger info:", passengerData);
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