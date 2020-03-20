let rowData = [];

window.onload = async () => {
  let response = await fetch('../data/bulk-template.json');
  rowData = await response.json();
  createDataList(rowData)
}


handleBidCalculation = () => {   
  let spend = document.querySelector('#spend').innerHTML;
  let clicks = document.querySelector('#clicks').innerHTML;
  let target = document.querySelector('#targetACoS').innerHTML;
  let acos = document.querySelector('#currentAcos').innerHTML;
  let result = spend / clicks * target / parseFloat(acos);
  
  document.querySelector("#bidResult").innerHTML = result.toFixed(2);
}


createDataList =  rowList => {
  console.log(rowData);
  const html = rowList.map(rowData => `
    <tr>
      <th scope="row">${rowData.Campaign}</th>
      <td>${rowData.KeywordorProductTargeting}</td>
      <td id="spend">${rowData.Spend}</td>
      <td id="clicks">${rowData.Clicks}</td>
      <td id="targetACoS">25</td>
      <td id="currentAcos">${rowData.ACoS}</td>
      <td>
        <p id="btnAction" class="btn btn-info" onclick="handleBidCalculation()">
          Fix
        </p>
      </td>
      <td id="bidResult"></td>
    </tr>
    `);

    document.querySelector('#tableColumn').innerHTML = html;
}



  // let spendValue, clicksValue, targetValue, acosValue;
  // spendValue = parseFloat(spend);
  // clicksValue = parseFloat(clicks);
  // targetValue = parseFloat(target);
  // acosValue = parseFloat(acos);  
  // let result = spendValue / clicksValue * targetValue / acosValue;



// Http.open("GET", "data/bulk-template.json", true);
// Http.send();

// calculate = () => {

//  preventDefault();

//   // getting spen value
//   spendValue = document.querySelector('#spend').innerText;

//   // Converting Strings to Numbers
//   valueAsNum = parseFloat(spendValue);
//   console.log(valueAsNum);

//   // getting the number of clicks
//   numOfClicks = document.querySelector('#clicks').innerText;

//   // Converting Strings to Numbers
//   clickAsNum = parseFloat(numOfClicks);

//   console.log(clickAsNum);

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