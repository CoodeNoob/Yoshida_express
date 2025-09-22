document.addEventListener("DOMContentLoaded", () => {
    // Get the full query string part from the URL
    let params = new URLSearchParams(window.location.search);

    let routes = JSON.parse(localStorage.getItem("Locations"));
    let buses = JSON.parse(localStorage.getItem("Buses"));

    let busResults = document.getElementById("busResults");

    // Check if "date", "fromLocation", "toLocation" exist
    if (params.has("date") && params.has("fromLocation") && params.has("toLocation")) {
        let date = params.get("date");
        let fromLocation = params.get("fromLocation");
        let toLocation = params.get("toLocation");

        //STORE TO  THE LOCALSTORAGE FOR 
        localStorage.setItem("lastSearchParams", JSON.stringify({
            date: date,
            fromLocation: fromLocation,
            toLocation: toLocation
        }));

        let from = routes[fromLocation];
        let to = routes[toLocation];

        document.getElementById("fromLocation").textContent = from;
        document.getElementById("toLocation").textContent = to;
        document.getElementById("date").textContent = date;

        // Find buses that match
        let foundBuses = Object.entries(buses).filter(([id, bus]) => {
            let busDate = bus.DepartureTime.split(",")[0].trim();
            return (
                bus.Route.From === from &&
                bus.Route.To === to &&
                busDate === date
            );
        });

        if (foundBuses.length > 0) {
            document.getElementById("totalBuses").textContent = foundBuses.length;
            document.getElementById("carsNotFound").classList.add("d-none");

            foundBuses.forEach(([id, bus]) => {
                busResults.innerHTML += `
                <div class="col-md-6 col-lg-4 mb-4 bus-data">
                  <div class="card shadow-sm h-100">
                    <div class="card-body">
                      <h5 class="card-title fw-bold busName">${bus.BusName}</h5>
                      <p class="card-text mb-1"><strong>Type:</strong> ${bus.BusType}</p>
                      <p class="card-text mb-1"><strong>From:</strong> ${bus.Route.From} → <strong>To:</strong> ${bus.Route.To}</p>
                      <p class="card-text mb-1"><strong>Total Seats:</strong> ${bus.TotalSeat}</p>
                      <p class="card-text mb-1"><strong>Available:</strong> ${bus.AvailableSeats}</p>
                      <p class="card-text text-success fw-bold"><strong>Price:</strong> ${bus.UnitSeatPrice.toLocaleString()} MMK</p>
                      <button class="btn btn-sm text-white  mt-2 reserve-btn" data-bus-id="${id}">
                        Reserve Seat
                      </button>
                    </div>
                  </div>
                </div>`;


                setTimeout(() => {
                    const busCards = document.querySelectorAll(".bus-data");
                    busCards.forEach((card, index) => {
                        setTimeout(() => card.classList.add("show"), index * 170);
                    });
                }, 120);
            });
        } else {
            document.getElementById("carsNotFound").classList.remove("d-none");
            document.getElementById("totalToggle").classList.add("d-none");
        }
    } else {
        window.history.back();
    }

    // Handle Reserve Seat button click
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("reserve-btn")) {
            let busId = e.target.getAttribute("data-bus-id");
            let buses = JSON.parse(localStorage.getItem("Buses"));
            let selectedBus = buses[busId]; // ✅ full bus object

            // Save full object to localStorage
            localStorage.setItem("reservedBus", JSON.stringify(selectedBus));

            // Redirect to booking page
            window.location.href = "./booking.html";
        }
    });
});