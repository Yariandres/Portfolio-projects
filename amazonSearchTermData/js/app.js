let rowData = [];

window.onload = async () => {
  let response = await fetch('../data/bulk-template.json');
  rowData = await response.json();
  createDataList(rowData)
}

createDataList =  rowList => {
  const html = rowList.map(rowData => `
      <tr>
        <th scope="row">${rowData.Campaign}</th>
        <td>${rowData.KeywordorProductTargeting}</td>
        <td id="spend" class="text-warning font-weight-bolder">${rowData.Spend}</td>
        <td id="orders" class="text-success font-weight-bolder">${rowData.Orders}</td>
        <td id="clicks" class="text-primary font-weight-bolder">${rowData.Clicks}</td>
        <td>
          <input type="number" class="form-control" id="targetACoS" placeholder="ACoS" required/>         
        </td>
        <td id="currentAcos">${rowData.ACoS}</td>
        <td>
          <p id="btnAction" class="btn btn-info" onclick="addRowHandlers()">
            Fix
          </p>
        </td>
        <td id="bidResult"></td>
      </tr>
    `);
    document.querySelector('#tableColumn').innerHTML = html;
}


addRowHandlers = () => {

  let table = document.getElementById("tableId");

  let rows = table.getElementsByTagName("tr");

  for (i = 0; i < rows.length; i++) {
    let currentRow = table.rows[i];

    let createClickHandler = function(row) {

      return function() {        
        let spend = row.querySelector("#spend").innerHTML;

        let clicks = row.querySelector("#clicks").innerHTML; 

        let target = row.querySelector("#targetACoS").value;        

        let acos = row.querySelector("#currentAcos").innerHTML;

        let resultHTML = parseFloat(spend) / parseFloat(clicks) * target / parseFloat(acos);        

        let bid = row.querySelector("#bidResult");        
        
        if (resultHTML <= 0) {
          bid.innerHTML = `<small class="alert-warning" id="fieldAlert">You target ACoS must be > than 0</small>`
        } else if (isNaN(resultHTML)) {
          bid.innerHTML = `<small class="alert-warning" id="fieldAlert">Keywords with no ACoS can not be calculated</small>`;          
        } else {
          bid.innerHTML = resultHTML.toFixed(2);
        }
      }
    }    
    
    currentRow.onclick = createClickHandler(currentRow);  
    
  }
}

