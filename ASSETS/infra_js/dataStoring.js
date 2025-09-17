// DATE TIME GENERATING FOR THE BUS DEPARTURE AND ARRIVAL
function generateTimes(hoursDuration) {
    let now = new Date();
    let tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);

    // Departure at 01:30
    let departure = new Date(tomorrow);
    departure.setHours(13, 30, 0); // 1:30 PM

    // Arrival after duration
    let arrival = new Date(departure.getTime() + hoursDuration * 60 * 60 * 1000);

    return {
        DepartureTime: formatDateTime(departure),
        ArrivalTime: formatDateTime(arrival)
    };
}

// Date time formatting
function formatDateTime(date) {
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let day = String(date.getDate()).padStart(2, "0");

    let hours = date.getHours();
    let minutes = String(date.getMinutes()).padStart(2, "0");

    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // convert 0 to 12

    return `${year}-${month}-${day}, ${hours}:${minutes} ${ampm}`;
}

// DataStoring For Bus
fetch("../ASSETS/DATA_ASSETS/bus.json")
    .then(response => response.json())
    .then(buses => {
        Object.keys(buses).forEach(key => {
            let times = generateTimes(7); 
            buses[key].DepartureTime = times.DepartureTime;
        });
        localStorage.setItem("Buses", JSON.stringify(buses));
    })
    .catch(err => console.error("Error loading bus.json:", err));

// DataStoring For Location
fetch("../ASSETS/DATA_ASSETS/locations.json")
    .then(response => response.json())
    .then(loc => {
        Object.keys(loc).forEach(key => {
        });
        localStorage.setItem("Locations", JSON.stringify(loc));
    })
    .catch(err => console.error("Error loading locations.json:", err));