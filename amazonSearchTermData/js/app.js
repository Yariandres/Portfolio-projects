document.title = "Amazon Bulk file Keyword Editor";

var Http = new XMLHttpRequest();

Http.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {

    // parsing the response to a javascript object
    var response = JSON.parse(Http.responseText);
    // console.log(response[0].Campaign)
    var output = '';
    for (var i = 0; i < response.length; i++) {
      // console.log(response[i].Campaign)
      output += `
        <tr>
          <th scope="row">${response[i].Campaign}</th>
          <td>${response[i].KeywordorProductTargeting}</td>
          <td id="spend">${response[i].Spend}</td>
          <td id="clicks">${response[i].Clicks}</td>          
          <td>
            <input 
              type="number" 
              class="form-control" 
              id="targetACoS" 
              placeholder="Target">
          </td>
          <td id="currentAcos">${response[i].ACoS}</td>
          <td>
            <button 
              type="submit" 
              class="btn btn-info"
              onclick="calculate()">
                Fix
            </button>
          </td>
          <td>1.09</td>          
        </tr>
      `;
    }

    // getting the table body for displaying the campaign name
    document.querySelector('#tableColumn').innerHTML = output;
  }

}
Http.open("GET", "data/bulk-template.json", true);
Http.send();

calculate = () => {
  // getting spen value
  spendValue = document.querySelector('#spend').innerText;
  // Converting Strings to Numbers

  // Converting Strings to Numbers
  valueAsNum = parseFloat(spendValue);
  console.log(valueAsNum);

  // getting the number of clicks
  numOfClicks = document.querySelector('#clicks').innerText;
  // Converting Strings to Numbers
  clickAsNum = parseFloat(numOfClicks);
  console.log(clickAsNum);

  // getting user input 
  retriveText = () => {

    // getting the input field
    var userInput = document.querySelector('#targetACoS').value;
    // Converting Strings to Numbers
    inputAsNum = parseFloat(userInput);
    console.log(inputAsNum)

    if (inputAsNum === NaN) {
      return elert("enter a number")
    } else {
      return console.log("condition passed")
    }


  }
  retriveText()
}