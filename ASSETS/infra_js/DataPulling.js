let locations = JSON.parse(localStorage.getItem("Locations"));
// LOADING OF FROM AND TO LOCATIONS
let fromLocation = document.getElementById("fromLocation");
let toLocation = document.getElementById("toLocation");

function loadLocationList(selectElement, ary,key) {
    selectElement.innerHTML = "";

    let defaultOption = document.createElement("option");
    defaultOption.text = "Location";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    selectElement.appendChild(defaultOption);

    for (let key in ary) {
        let option = document.createElement("option");
        option.value = key;       
        option.text = ary[key];   
        selectElement.appendChild(option);
    }
}

// Call function for both dropdowns
loadLocationList(fromLocation, locations,"From");
loadLocationList(toLocation, locations,"To");
