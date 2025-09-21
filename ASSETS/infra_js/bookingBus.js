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

    
        let ocupiedSeat = reservedBus.OcupiedSeat || [] ;
        console.log(ocupiedSeat);
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

                // Check if seat is already occupied
                if (ocupiedSeat.includes(seatId)) seat.classList.add("disable");
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

                if (ocupiedSeat.includes(seatId)) seat.classList.add("disable");
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


        document.getElementById("go-checkout").addEventListener("click",()=>
        {
            let grandPrice = selectedSeats.length * reservedBus.UnitSeatPrice;
            let bookedBusInfo = {
                "busName" : reservedBus.BusName,
                "busId" : reservedBus.BusId,
                "bookedSeat" : selectedSeats,
                "bookedDate" : new Date().toLocaleDateString(),
                "bookedTime" : new Date().toLocaleTimeString(),
                "from":reservedBus.Route.From,
                "to":reservedBus.Route.To,
                "grandPrice": grandPrice
            }

            localStorage.setItem(
               "bookedBusInfo", JSON.stringify(bookedBusInfo) 
            );


            document.getElementById("loader-container").classList.remove("d-none");
            //set timeout
            setTimeout(()=>
            {   
                document.getElementById("loader-container").classList.add("d-none");
                window.location.href = "./checkout.html"; 
            },2000)
            
            console.log(bookedBusInfo);
        });


        


    }
    else {
        window.history.back();
    }



    function updatedSeat() {
        const desDiv = document.getElementById("selectedSeatId");
        if (selectedSeats.length > 0) {
            desDiv.innerHTML = selectedSeats
                .map(seat => `<div class="badge m-2 p-3 px-4 " style="background:#122C4F">${seat}</div>`)
                .join("");
            document.getElementById("continue-btn").classList.remove("d-none"); 
            document.getElementById("head-selected-seat").classList.remove("d-none");     
            
        } else {
            desDiv.innerHTML = "";
            document.getElementById("continue-btn").classList.add("d-none");   
            document.getElementById("head-selected-seat").classList.add("d-none");   
        }
    }

    document.getElementById("goBackSearch").addEventListener("click",()=>{window.history.back();})

});



