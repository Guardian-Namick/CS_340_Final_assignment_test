function deleteArmor(armorID) {
    let link = '/delete-armor-ajax/';
    let data = {
      id: armorID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(armorID);
      }
    });
  }
  
  function deleteRow(armorID){
      let table = document.getElementById("armor-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == armorID) {
              table.deleteRow(i);
              break;
         }
      }
  }