import { Bus } from './bus.js';

// Create bus objects
let Bus1 = new Bus("B1", "LUX", 20);

// Keep track of selected seats
let selectedSeats = [];

// Function to render seats dynamically
function renderBusLayout(bus) {
    const busContainer = document.querySelector('.bus');
    busContainer.innerHTML = ""; // clear old layout

    let seatNumber = 1;
    for (let row = 0; row < bus.totalSeats / 4; row++) {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("seat-container");

        // Left side 2 seats
        for (let i = 0; i < 2; i++) {
            const seatId = `${bus.busNumber}-${seatNumber}`;
            const seat = document.createElement("div");
            seat.classList.add("seat");
            seat.setAttribute("data-seat-id", seatId);
            seat.innerHTML = `<p>${seatNumber}</p>`;
            rowDiv.appendChild(seat);
            seatNumber++;
        }

        // Aisle
        const aisle = document.createElement("div");
        aisle.classList.add("aisle");
        rowDiv.appendChild(aisle);

        // Right side 2 seats
        for (let i = 0; i < 2; i++) {
            const seatId = `${bus.busNumber}-${seatNumber}`;
            const seat = document.createElement("div");
            seat.classList.add("seat");
            seat.setAttribute("data-seat-id", seatId);
            seat.innerHTML = `<p>${seatNumber}</p>`;
            rowDiv.appendChild(seat);
            seatNumber++;
        }

        busContainer.appendChild(rowDiv);
    }

    // ✅ Add click event to select/deselect seat
    document.querySelectorAll('.seat').forEach(seat => {
        seat.addEventListener('click', () => {
            let seatId = seat.getAttribute("data-seat-id");

            if (selectedSeats.includes(seatId)) {
                // If already selected → remove it
                selectedSeats = selectedSeats.filter(id => id !== seatId);
                seat.classList.remove("ocupied");
            } else {
                // If not selected → add it
                selectedSeats.push(seatId);
                seat.classList.add("ocupied");
            }

            updateSelectedDescription();
        });
    });
}

// ✅ Update description card
function updateSelectedDescription() {
    const descDiv = document.querySelector('.selected_description');
    if (selectedSeats.length === 0) {
        descDiv.innerHTML = "You choice: <em>No seats selected</em>";
    } else {
        descDiv.innerHTML = `
            <h3>You choice:</h3>
            <ul>
                ${selectedSeats.map(seat => `<li>${seat}</li>`).join("")}
            </ul>
            <button>Book Now</button>
        `;
    }
}

let bookedData = {
    "userName" : "ExampleUser",
    "bookData" : selectedSeats
}


// Save to localStorage
localStorage.setItem("bookedData", JSON.stringify(bookedData));

// Example: Load Bus1 layout
renderBusLayout(Bus1);
updateSelectedDescription();
