// Get the objects we need to modify
let addCharacterForm = document.getElementById('add-character-form-ajax');

// Modify the objects we need
addCharacterForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputCharacterName = document.getElementById("input-character_name");
    let inputCharacterSpeed = document.getElementById("input-character_speed");
    let inputCreationAge= document.getElementById("input-creation_age");

    // Get the values from the form fields
    let characterNameValue = inputCharacterName.value;
    let characterSpeedValue = inputCharacterSpeed.value;
    let creationAgeValue = inputCreationAge.value;

    // Put our data we want to send in a javascript object
    let data = {
        character_name: characterNameValue,
        character_speed: characterSpeedValue,
        creation_age: creationAgeValue,
    }
    
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-character-ajax", true);
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
    let currentTable = document.getElementById("character-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let characterNameCell = document.createElement("TD");
    let characterSpeedCell = document.createElement("TD");
    let creationAgeCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.character_id;
    characterNameCell.innerText = newRow.character_name;
    characterSpeedCell.innerText = newRow.character_speed;
    creationAgeCell.innerText = newRow.creation_age;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteCharacter(newRow.character_id);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(characterNameCell);
    row.appendChild(characterSpeedCell);
    row.appendChild(creationAgeCell);
    row.appendChild(deleteCell);
    
    // Add a custom row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.character_id);

    // Add the row to the table
    currentTable.appendChild(row);
}