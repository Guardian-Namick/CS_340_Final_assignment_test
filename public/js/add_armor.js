// Get the objects we need to modify
let addArmorForm = document.getElementById('add-armor-form-ajax');

// Modify the objects we need
addArmorForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputArmorName = document.getElementById("input-armor_name");
    let inputImprovementID = document.getElementById("mySelect");
    let inputArmorDefense= document.getElementById("input-armor_defense");
    let inputArmorWeight= document.getElementById("input-armor_weight");
    let inputSpeedChange= document.getElementById("input-speed_change");


    // Get the values from the form fields
    let armorNameValue = inputArmorName.value;
    let improvementIDValue = inputImprovementID.value;
    let armorDefenseValue = inputArmorDefense.value;
    let armornWeightValue = inputArmorWeight.value;
    let speedChangeValue = inputSpeedChange.value;

    // Put our data we want to send in a javascript object
    let data = {
        weapon_name: armorNameValue,
        improvement_id: improvementIDValue,
        weapon_damage: armorDefenseValue,
        weapon_weight: armorWeightValue,
        speed_change: speedChangeValue,
    }
    
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-armor-ajax", true);
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
    let currentTable = document.getElementById("armor-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let armorNameCell = document.createElement("TD");
    let improvementIDCell = document.createElement("TD");
    let armorDefenseCell = document.createElement("TD");
    let armorWeightCell = document.createElement("TD");
    let speedChangeCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.armor_id;
    armorNameCell.innerText = newRow.armor_name;
    improvementIDCell.innerText = newRow.improvement_id;
    armorDefenseCell.innerText = newRow.armor_defense;
    armorWeightCell.innerText = newRow.armor_weight;
    speedChangeCell.innerText = newRow.speed_change;


    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteArmor(newRow.armor_id);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(improvementIDCell);
    row.appendChild(armorNameCell);
    row.appendChild(armorDefenseCell);
    row.appendChild(armorWeightCell);
    row.appendChild(speedChangeCell);
    row.appendChild(deleteCell);
    
    // Add a custom row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.armor_id);

    // Add the row to the table
    currentTable.appendChild(row);

}