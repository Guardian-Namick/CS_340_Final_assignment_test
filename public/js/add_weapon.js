// Get the objects we need to modify
let addWeaponForm = document.getElementById('add-weapon-form-ajax');

// Modify the objects we need
addWeaponForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputWeaponName = document.getElementById("input-weapon_name");
    let inputImprovementID = document.getElementById("mySelect");
    let inputWeaponDamage= document.getElementById("input-weapon_damage");
    let inputWeaponWeight= document.getElementById("input-weapon_weight");
    let inputSpeedChange= document.getElementById("input-speed_change");


    // Get the values from the form fields
    let weaponNameValue = inputWeaponName.value;
    let improvementIDValue = inputImprovementID.value;
    let weaponDamageValue = inputWeaponDamage.value;
    let weaponWeightValue = inputWeaponWeight.value;
    let speedChangeValue = inputSpeedChange.value;

    // Put our data we want to send in a javascript object
    let data = {
        weapon_name: weaponNameValue,
        improvement_id: improvementIDValue,
        weapon_damage: weaponDamageValue,
        weapon_weight: weaponWeightValue,
        speed_change: speedChangeValue,
    }
    
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-weapon-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputFirstName.value = '';
            inputLastName.value = '';
            inputHomeworld.value = '';
            inputAge.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("weapon-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let weaponNameCell = document.createElement("TD");
    let improvementIDCell = document.createElement("TD");
    let weaponDamageCell = document.createElement("TD");
    let weaponWeightCell = document.createElement("TD");
    let speedChangeCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.weapon_id;
    weaponNameCell.innerText = newRow.weapon_name;
    improvementIDCell.innerText = newRow.improvement_id;
    weaponDamageCell.innerText = newRow.weapon_damage;
    weaponWeightCell.innerText = newRow.weapon_weight;
    speedChangeCell.innerText = newRow.speed_change;


    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteWeapon(newRow.weapon_id);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(improvementIDCell);
    row.appendChild(weaponNameCell);
    row.appendChild(weaponDamageCell);
    row.appendChild(weaponWeightCell);
    row.appendChild(speedChangeCell);
    row.appendChild(deleteCell);
    
    // Add a custom row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.weapon_id);

    // Add the row to the table
    currentTable.appendChild(row);

}