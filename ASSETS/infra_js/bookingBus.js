// Wait Until 
document.addEventListener("DOMContentLoaded", () => {
    //check the booked bus is exit or not

    let reservedBus = JSON.parse(localStorage.getItem("reservedBus"));
    let selectedSeats = [];

    if (reservedBus) {
        //1 Load the bus layout

        document.getElementById("selectedBusName").textContent = reservedBus.BusName;
        document.getElementById("busName").textContent = reservedBus.BusName;
        document.getElementById("selectedBusDate").textContent = reservedBus.DepartureTime;

        document.getElementById("fromLocation").textContent = reservedBus.Route.From;
        document.getElementById("toLocation").textContent = reservedBus.Route.To;

        document.getElementById("seatPrice").textContent = reservedBus.UnitSeatPrice;



        const busContainer = document.getElementById("bus");
        //sure clear
        busContainer.innerHTML = "";

        //get the total seats
        let seatTotal = reservedBus.TotalSeat;

        let seatNumber = 1;
        let BusCode = reservedBus.BusName.split(" ")[0];

        for (let row = 0; row < seatTotal / 4; row++) {
            const rowDiv = document.createElement("div");
            rowDiv.classList.add("seat-container");


            //left seats
            for (let i = 0; i < 2; i++) {
                const seatId = `${BusCode}-${seatNumber}`;
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
                const seatId = `${BusCode}-${seatNumber}`;
                const seat = document.createElement("div");
                seat.classList.add("seat");
                seat.setAttribute("data-seat-id", seatId);
                seat.innerHTML = `<p>${seatNumber}</p>`;
                rowDiv.appendChild(seat);
                seatNumber++;
            }

            busContainer.appendChild(rowDiv);
        }


        //clecok
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

                document.getElementById("totalSeatSelected").textContent = selectedSeats.length;

                document.getElementById("grandPrice").textContent = selectedSeats.length * reservedBus.UnitSeatPrice;
                updatedSeat();
            });
        });




    }
    else {
        window.history.back();
    }



    function updatedSeat() {
        const desDiv = document.getElementById("selectedSeatId");
        if (selectedSeats.length > 0) {
            desDiv.innerHTML = selectedSeats
                .map(seat => `<div class="badge bg-dark m-2 p-3 px-4">${seat}</div>`)
                .join("");
        } else {
            desDiv.innerHTML = "";
        }
    }


});


