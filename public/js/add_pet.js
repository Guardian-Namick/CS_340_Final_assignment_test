// Get the objects we need to modify
let addPetForm = document.getElementById('add-pet-form-ajax');

// Modify the objects we need
addPetForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputPetName = document.getElementById("input-pet_name");
    let inputCharacterID = document.getElementById("mySelect");
    let inputPetAge= document.getElementById("input-pet_age");

    // Get the values from the form fields
    let petNameValue = inputPetName.value;
    let characterIDValue = inputCharacterID.value;
    let petAgeValue = inputPetAge.value;

    // Put our data we want to send in a javascript object
    let data = {
        pet_name: petNameValue,
        character_id: characterIDValue,
        pet_age: petAgeValue,
    }
    
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-pet-ajax", true);
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
    let currentTable = document.getElementById("pet-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let petNameCell = document.createElement("TD");
    let characterIDCell = document.createElement("TD");
    let petAgeCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.pet_id;
    petNameCell.innerText = newRow.pet_name;
    characterIDCell.innerText = newRow.character_id;
    petAgeCell.innerText = newRow.pet_age;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deletePet(newRow.pet_id);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(characterIDCell);
    row.appendChild(petNameCell);
    row.appendChild(petAgeCell);
    row.appendChild(deleteCell);
    
    // Add a custom row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.pet_id);

    // Add the row to the table
    currentTable.appendChild(row);
}