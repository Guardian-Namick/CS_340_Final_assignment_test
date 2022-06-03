function deleteWeapon(weaponID) {
    let link = '/delete-weapon-ajax/';
    let data = {
      id: weaponID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(weaponID);
      }
    });
  }
  
  function deleteRow(weaponID){
      let table = document.getElementById("weapon-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == weaponID) {
              table.deleteRow(i);
              break;
         }
      }
  }