// BUDGET CONTROLLER
var budgetController = (function () {


})();

// UI CONTROLLER 
var UIController = (function () {

  return {
    getInput: function () {
      // Returning an object from the getInput function as there is more than one value
      return {
        type: document.querySelector(".add__type").value, // Will be either Inc or Exp
        description: document.querySelector(".add__description").value,
        value: document.querySelector(".add__value").value,
      }
    }
  };

})();

// GLOBAL APP CONTROLLER THE PLACE WHERE WE TELL THE OTHER MODULES WHAT TO DO
var controller = (function (budgetCtrl, UICtrl) {

  var ctrLAddItem = function () {
    // 1. get the field input data from the UIController
    var input = UICtrl.getInput()
    console.log(input);

    // 2. Add the item to the budget controller

    // 3. Add the item to the UI 

    // 4. Calculate the budged 

    // 5. Display the budget on the UI

  }

  document.querySelector('.add__btn').addEventListener("click", ctrLAddItem);

  // keypress event on "enter"
  document.addEventListener("keypress", function (event) {

    if (event.keyCode === 13 || event.which === 13) {
      ctrLAddItem();
    }
  });

})(budgetController, UIController);

