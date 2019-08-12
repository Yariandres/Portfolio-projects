var Http = new XMLHttpRequest();
Http.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    // parsing the response to a javascript object
    var response = JSON.parse(Http.responseText);

    // get books under 10$
    var cheapBook = response.filter(prices => prices.price <= 10);

    // map throu 
    var details = cheapBook.slice(1, 4).map(function(book) {

      // return display 
      return ` 
                <div class="col">
                  <div class="card my-5 shadow-sm">
                    <img src="${book.img}" class="bd-placeholder-img card-img-top">

                    <div class="card-body">
                      <p class="card-text">${book.title}</p>
                      <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                          <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                          <button type="button" class="btn btn-sm btn-outline-secondary">Buy</button>
                        </div>
                        <small class="text-muted">${book.price}$</small>
                      </div>
                    </div>
                  </div>
                </div>
          
              
            `;
    })
      // get card div
      var bookContainer = document.querySelector('.bookConatiner');
      //  set html
      bookContainer.innerHTML = details;
      console.log(details.title); 
  }
};
Http.open("GET", "../data/horror.json", true);
Http.send()