function deleteCharacter(characterID) {
    let link = '/delete-character-ajax/';
    let data = {
      id: characterID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(characterID);
      }
    });
  }
  
  function deleteRow(characterID){
      let table = document.getElementById("character-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == characterID) {
              table.deleteRow(i);
              break;
         }
      }
  }