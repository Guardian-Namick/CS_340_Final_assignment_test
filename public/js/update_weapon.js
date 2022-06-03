// Get the objects we need to modify
let updateWeaponForm = document.getElementById('update-weapon-form-ajax');

// Modify the objects we need
updateWeaponForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputWeaponName = document.getElementById("mySelectWeapon");
    let inputWeaponDamage = document.getElementById("input-weapon_damage-update");
    let inputWeaponWeight = document.getElementById("input-weapon_weight-update");
    let inputSpeedChange = document.getElementById("input-speed_change-update");


    // Get the values from the form fields
    let weaponNameValue = inputWeaponName.value;
    let weaponDamageValue = inputWeaponDamage.value;
    let weaponWeightValue = inputWeaponWeight.value;
    let speedChangeValue = inputSpeedChange.value

    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld

    // Put our data we want to send in a javascript object
    let data = {
        weapon_name: weaponNameValue,
        weapon_damage: weaponDamageValue,
        weapon_weight: weaponWeightValue,
        speed_change: speedChangeValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-weapon-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, weaponNameValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, petID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("weapon-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == petID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let td = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign homeworld to our value we updated to
            td.innerHTML = parsedData[0].name; 
       }
    }
}