document.addEventListener("DOMContentLoaded", () => {
    let checkoutHistory = JSON.parse(localStorage.getItem("bookingHistory")) || [];
    let tBody = document.getElementById("history-table");

    const searchInput = document.getElementById("searchInput");
    const sortSelect = document.getElementById("sortSelect");

    // table render
    function renderTable(data) {
        tBody.innerHTML = ""; 
        data.forEach(booking => {
            let seatBadges = booking.seats
                .split(",")
                .map(seat => `<span class="badge m-1 p-2" style="background:#122C4F; color:#fff;">${seat.trim()}</span>`)
                .join(" "); 

            let tRow = document.createElement("tr");
            tRow.innerHTML = `
                <td>${booking.name}</td>
                <td>${booking.busName}</td>
                <td>${booking.from} → ${booking.to}</td>
                <td>${booking.date} ${booking.time}</td>
                <td>${booking.seats.split(",").length}</td>
                <td>${seatBadges}</td>
                <td>MMK ${booking.totalPrice}</td>
                <td>${booking.paymentMethod}</td>
            `;
            tBody.appendChild(tRow);
        });
    }

    // render
    renderTable(checkoutHistory);

    // Sort 
    sortSelect.addEventListener("change", () => {
        let sortedData = [...checkoutHistory]; // clone array

        if (sortSelect.value === "seat") {
            sortedData.sort((a, b) => b.seats.split(",").length - a.seats.split(",").length);
        } else if (sortSelect.value === "price") {
            sortedData.sort((a, b) => b.totalPrice - a.totalPrice);
        } else if (sortSelect.value === "date") {
            sortedData.sort((a, b) => new Date(b.date + " " + b.time) - new Date(a.date + " " + a.time));
        }

        renderTable(sortedData);
    });

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const filtered = checkoutHistory.filter(b =>
            b.name.toLowerCase().includes(query) ||
            b.busName.toLowerCase().includes(query) ||
            b.from.toLowerCase().includes(query) ||
            b.to.toLowerCase().includes(query) ||
            b.seats.toLowerCase().includes(query)
        );
        renderTable(filtered);
    });
});
