document.title = "Amazon Bulk file Keyword Editor";

var Http = new XMLHttpRequest();

Http.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {

    // parsing the response to a javascript object
    var response = JSON.parse(Http.responseText);

    console.log(response[0].Campaign)

    var output = '';
    for (var i = 0; i < response.length; i++) {
      // console.log(response[i].Campaign)
      output += `
        <tr>
          <th scope="row">${response[i].Campaign}</th>
          <td>${response[i].Spend}</td>
          <td>${response[i].Clicks}</td>
          <td>${response[i].ACoS}</td>
        </tr>
      `;
    }
    // getting the table body for displaying the campaign name
    document.querySelector('#tableColumn').innerHTML = output;




    // console.log(response)
  }

}

Http.open("GET", "data/bulk-template.json", true);
Http.send()