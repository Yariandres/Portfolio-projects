#Presenting, using async / await pattern the users from: https://jsonplaceholder.typicode.com/users

## Create a dropdown (<select>) that allows the user to select between name, username and email.

           -Create then a filter. When the user types in something, you should: 1. filter the user based on the input and on the value of the select.
           2. Es.: select on NAME. Filter input = Glenna, only user id number 9 should remain

## Create a function that, from the list of users, extracts only the name

## Create a function that, from the list of users, creates an array of addresses as string and not as an object. Like:

              {
              "street": "Victor Plains",
              "suite": "Suite 879",
              "city": "Wisokyburgh",
              "zipcode": "90566-7771",
              "geo": {
                "lat": "-43.9509",
                "lng": "-34.4618"
              }

## Should become Victor Plains, Suite 879, Wisokyburgh (90566-7771)

      1. Add a button that sorts the list by name ascending / descending (ONE button)
      2.  Add a link on each user, when clicked it must go to a detail page, where to user information are presented (from the API)
