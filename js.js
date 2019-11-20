const WMSCapabilities =ol.format.WMSCapabilities;

var parser = new WMSCapabilities();

function Fun() {  
fetch('http://localhost:8080/geoserver/ows?service=wms&version=1.3.0&request=GetCapabilities',{mode:'cors'})
.then(function(response) {
  return response.text();
})
.then(function(text) {
    appendData(text); 
});

function appendData(text){
    var result = parser.read(text);
    console.log(result);
    var main =document.getElementById("final_table");
  

    // Vyselektovanie potrebnych udajov z Capa XML
      var col = [];
      for (var i = 0; i < result.Capability.Layer.Layer.length; i++) {
          for (var key in result.Capability.Layer.Layer[i]) {
              if (col.indexOf(key) === -1) {
                if(key=="Name" || key=="Title" || key=="queryable")
                  col.push(key);
              }
          }
      }

      var tablearea;
      var table;
      var thead;
      var tr;
      var th;

      var data=[]; 

      tablearea = document.getElementById('final_table');
      table = document.createElement('table');
      thead = document.createElement('thead');
      tr = document.createElement('tr');

      //naplnenie hlavicky tabukly
      for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      
            data[i]= col[i];
          }
          data.push("checkbox");

        
      for (var i = 0; i < data.length; i++) {
          var headerTxt = document.createTextNode(data[i]);
          th = document.createElement('th');
          th.appendChild(headerTxt);
          tr.appendChild(th);
          thead.appendChild(tr);
      }

      table.appendChild(thead);

      for (var i = 0; i < result.Capability.Layer.Layer.length; i++) {
        tr = document.createElement('tr');

        // vytvorenie stplcov
        for (var j = 0; j <= col.length; j++) {
          tr.appendChild(document.createElement('td'));
        }
       
        //create checkbox and default value "false"
        var checkbox = document.createElement("INPUT"); //Added for checkbox
        checkbox.type = "checkbox"; //Added for checkbox
        //naplnenie hodnotami z geoserveru
        for (var j = 0; j < col.length; j++) {
          var item = result.Capability.Layer.Layer[i][col[j]];
          tr.cells[j].appendChild(document.createTextNode(item));
          tr.cells[3].appendChild(checkbox); //Add checkbox to table
       }
        table.appendChild(tr);
    }
    tablearea.appendChild(table);
}
}
