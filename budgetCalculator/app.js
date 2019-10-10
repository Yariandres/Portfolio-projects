// BUDGET CONTROLLER
var budgetController = (function () {

  // function constructors
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  // data structure of the budget controller

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  }

  return {
    addItem: function (type, des, val) {
      var newItem, ID;

      // Create new ID based on selecting the last element's ID in the Array
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Create new item based on inc on exp type 
      if (type === "exp") {
        newItem = new Expense(ID, des, val);
      } else if (type === "inc") {
        newItem = new Income(ID, des, val);
      }

      // Push it into data structure
      data.allItems[type].push(newItem);

      // Retrun the new element
      return newItem;
    },

    calculateBudget: function () {

    },

    testing: function () {
      console.log(data);
    }
  }
})();

// UI CONTROLLER 
var UIController = (function () {

  // DOMstrings returns an object. A central place for all the strings 
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: '.add__btn',
    incomeContainer: ".income__list",
    expensesContainer: ".expenses__list"

  }

  return {
    getInput: function () {
      // Returning an object from the getInput function as there is more than one value
      return {
        type: document.querySelector(DOMstrings.inputType).value, // Will be either Inc or Exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value),
      }
    },

    addListItem: function (obj, type) {
      var html, newHtml, element;
      // create html string with placeholder text
      if (type === "inc") {
        element = DOMstrings.incomeContainer;

        html = `<div class="item clearfix" id="income-%id%">
                  <div class="item__description">%description%</div>
                  <div class="right clearfix">
                      <div class="item__value">%value%</div>
                      <div class="item__delete">
                          <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                      </div>
                  </div>
                </div>`;
      } else if (type === "exp") {
        element = DOMstrings.expensesContainer;

        html = `<div class="item clearfix" id="expense-0">
                  <div class="item__description">%description%</div>
                  <div class="right clearfix">
                      <div class="item__value">%value%</div>
                      <div class="item__percentage">21%</div>
                      <div class="item__delete">
                          <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                      </div>
                  </div>
              </div>`;
      }
      // replace the placeholder text with actual data
      newHtml = html.replace("%id%", obj.id);
      newHtml = newHtml.replace("%description%", obj.description);
      newHtml = newHtml.replace("%value%", obj.value);

      // insert the html into DOM
      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },

    clearFields: function () {
      var fields, fieldsArr;

      fields = document.querySelectorAll(DOMstrings.inputDescription + ", " + DOMstrings.inputValue);

      fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach((current, index, array) => {
        current.value = "";
      });

      // sets the focus to the description field
      fieldsArr[0].focus();
    },

    // Exposing DOMstrings into the public
    getDOMstring: function () {
      return DOMstrings;
    }
  };

})();

// GLOBAL APP CONTROLLER THE PLACE WHERE WE TELL THE OTHER MODULES WHAT TO DO
var controller = (function (budgetCtrl, UICtrl) {

  var setUpEventListeners = function () {
    var DOM = UICtrl.getDOMstring();

    document.querySelector(DOM.inputBtn).addEventListener("click", ctrLAddItem);
    // keypress event on "enter"
    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrLAddItem();
      }
    });
  };

  var updateBudget = function () {
    // 1. Calculate the budged    

    // 2. return the budget

    // 3. Display the budget on the UI
  }

  var ctrLAddItem = function () {
    var input, newItem;

    // 1. get the field input data from the UIController
    input = UICtrl.getInput();
    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      // 2. Add the item to the budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);
      // 3. Add the item to the UI 
      UICtrl.addListItem(newItem, input.type);
      // 4. clear the fileds
      UICtrl.clearFields();
      // 5. calculate and update budget
      updateBudget();
    }
  };

  // Public initializacion function
  return {
    init: function () {
      console.log("app has started");
      setUpEventListeners()
    }
  }
})(budgetController, UIController);
controller.init();  