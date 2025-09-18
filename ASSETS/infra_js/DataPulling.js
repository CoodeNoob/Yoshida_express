let locations = JSON.parse(localStorage.getItem("Locations"));

console.log(locations);
// OUTPUT => {"1":"Yangon","2":"Mandalay","3":"Magway","4":"NayPyiDaw","5":"Saging","6":"Bagan","7":"Taunggyi","8":"Myeik"}

// LOADING OF FROM AND TO LOCATIONS
let fromLocation = document.getElementById("fromLocation");
let toLocation = document.getElementById("toLocation");

function loadLocationList(selectElement, ary,key) {
    selectElement.innerHTML = "";

    let defaultOption = document.createElement("option");
    defaultOption.text = key;
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
