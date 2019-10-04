// BUDGET CONTROLLER
var budgetController = (function () {


})();

// UI CONTROLLER 
var UIController = (function () {

  // DOMstrings returns an object. A central place for all the strings 
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: '.add__btn'
  }

  return {
    getInput: function () {
      // Returning an object from the getInput function as there is more than one value
      return {
        type: document.querySelector(DOMstrings.inputType).value, // Will be either Inc or Exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value,
      }
    },

    // Exposing DOMstrings into the public
    getDOMstring: function () {
      return DOMstrings;
    }
  };

})();

// GLOBAL APP CONTROLLER THE PLACE WHERE WE TELL THE OTHER MODULES WHAT TO DO
var controller = (function (budgetCtrl, UICtrl) {

  var DOM = UICtrl.getDOMstring();

  var ctrLAddItem = function () {
    // 1. get the field input data from the UIController
    var input = UICtrl.getInput()
    console.log(input);

    // 2. Add the item to the budget controller

    // 3. Add the item to the UI 

    // 4. Calculate the budged 

    // 5. Display the budget on the UI

  }

  document.querySelector(DOM.inputBtn).addEventListener("click", ctrLAddItem);

  // keypress event on "enter"
  document.addEventListener("keypress", function (event) {

    if (event.keyCode === 13 || event.which === 13) {
      ctrLAddItem();
    }
  });

})(budgetController, UIController);

