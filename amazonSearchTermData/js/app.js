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
        <td id="recordID">${rowData.RecordID}</td>
        <td>${rowData.KeywordorProductTargeting}</td>
        <td id="spend">${rowData.Spend}</td>
        <td id="orders">${rowData.Orders}</td>
        <td id="clicks">${rowData.Clicks}</td>
        <td id="targetACoS">30</td>
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
        let target = row.querySelector("#targetACoS").innerHTML;
        let acos = row.querySelector("#currentAcos").innerHTML;

        let resultHTML = parseFloat(spend) / parseFloat(clicks) * parseFloat(target) / parseFloat(acos);

        let bid = row.querySelector("#bidResult");
        bid.innerHTML = resultHTML.toFixed(2);       
      }
    }
    currentRow.onclick = createClickHandler(currentRow);
  }
}


//   // getting user input 
//   retriveText = () => {

//     // getting the input field
//     var userInput = document.querySelector('#targetACoS').value;
//     // Converting Strings to Numbers
//     inputAsNum = parseFloat(userInput);
//     console.log(inputAsNum)

//     if (inputAsNum === NaN) {
//       return elert("enter a number")
//     } else {
//       return console.log("condition passed")
//     }

//   }
//   retriveText()
// }