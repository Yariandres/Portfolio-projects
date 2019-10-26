// BUDGET CONTROLLER
var budgetController = (function () {

  // function constructors
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1
  };

  Expense.prototype.calcPercentage = function (totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100);
    } else {
      this.percenatge = -1;
    }
  };

  Expense.prototype.getPercentage = function () {
    return this.percentage;
  };

  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var calculateTotal = function (type) {
    var sum = 0;
    // looping with foreach
    data.allItems[type].forEach(function (cur) {
      sum += cur.value;
    });
    data.totals[type] = sum;
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
    },
    budget: 0,
    percentage: -1
  };



  // returning public objects
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

    deleteItem: function (type, id) {
      var ids, index;
      ids = data.allItems[type].map(function (current) {
        // map returns a brand new array 
        return current.id;
      });

      index = ids.indexOf(id);

      if (index !== -1) {
        data.allItems[type].splice(index, 1);
      }
    },

    calculateBudget: function () {

      // calculate total income and expenses
      calculateTotal("exp");
      calculateTotal("inc");

      // calculate the budget: income - expenses
      data.budget = data.totals.inc - data.totals.exp;

      // calculate the percentage of income that we spend
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
        // expense = 100 and income 200 (which means we spent 50%) = 100/200 = 0.5 (so we times it by 100) 0.5 * 100

        // Math.round to round it to th nearest integer
      } else {
        data.percentage = -1;
      }
    },

    calculatePercentages: function () {

      data.allItems.exp.forEach(function (cur) {
        cur.calcPercentage(data.totals.inc);
      });
    },

    getPercentage: function () {
      var allPerc = data.allItems.exp.map(function (cur) {
        return cur.getPercentage();
      });
      return allPerc;
    },

    getBudget: function () {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      }
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
    expensesContainer: ".expenses__list",
    budgetLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expenseLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
    container: ".container"
  }

  return {
    getInput: function () {
      // Returning an object from the getInput function as there is more than one value
      return {
        type: document.querySelector(DOMstrings.inputType).value, // Will be either Inc or Exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        // converting the string to a number with parsFloat
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value),
      }
    },

    addListItem: function (obj, type) {
      var html, newHtml, element;
      // create html string with placeholder text
      if (type === "inc") {
        element = DOMstrings.incomeContainer;

        html = `<div class="item clearfix" id="inc-%id%">
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

        html = `<div class="item clearfix" id="exp-0">
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

    deleteListItem: function (selectorID) {
      var el = document.getElementById(selectorID)
      el.parentNode.removeChild(el);
    },

    clearFields: function () {
      var fields, fieldsArr;
      // getting a ref to the fields
      fields = document.querySelectorAll(DOMstrings.inputDescription + ", " + DOMstrings.inputValue);

      // convert to array trick
      fieldsArr = Array.prototype.slice.call(fields);

      // loop over
      fieldsArr.forEach((current, index, array) => {
        // empty the fields
        current.value = "";
      });

      // sets the focus to the "add description" field
      fieldsArr[0].focus();
    },

    displayBudget: function (obj) {

      document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
      document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
      document.querySelector(DOMstrings.expenseLabel).textContent = obj.totalExp;


      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + "%";
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + "---";
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

  var setUpEventListeners = function () {
    var DOM = UICtrl.getDOMstring();

    document.querySelector(DOM.inputBtn).addEventListener("click", ctrLAddItem);
    // keypress event on "enter"
    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrLAddItem();
      }
    });

    document.querySelector(DOM.container).addEventListener("click", ctrlDeleteItem);
  };

  var updateBudget = function () {
    // 1. Calculate the budged    
    budgetCtrl.calculateBudget();
    // 2. Return the budget
    var budget = budgetCtrl.getBudget();
    // 3. Display the budget on the UI
    UICtrl.displayBudget(budget);
  }

  var updatePercentages = function () {

    // 1. calculate percentages
    budgetCtrl.calculatePercentages();
    // 2. read percentages from the budget controller
    var percentages = budgetCtrl.getPercentage();
    // 3. update the UI the new percentages
    console.log(percentages);
  };

  var ctrLAddItem = function () {
    var input, newItem;

    // 1. get the field input data from the UIController
    input = UICtrl.getInput();
    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      // 2. Add the item to the budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);
      // 3. Add the item to the UI 
      UICtrl.addListItem(newItem, input.type);
      // 4. calling the clear the fileds UI function
      UICtrl.clearFields();
      // 5. calculate and update budget
      updateBudget();
    };
  };

  var ctrlDeleteItem = function (event) {
    var itemID, splitID, type, ID;
    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
    if (itemID) {

      splitID = itemID.split("-");
      type = splitID[0];
      ID = parseInt(splitID[1]);

      // 1. delete the item from the data structure
      budgetCtrl.deleteItem(type, ID);
      // 2. delete the item from UI
      UICtrl.deleteListItem(itemID);
      // 3. Update and show the new budget
      updateBudget();
      // 6. calculate and update percentages
      updatePercentages()
    }

  }

  // Public initializacion function
  return {
    init: function () {
      console.log("app has started");
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      });
      setUpEventListeners()
    }
  }
})(budgetController, UIController);
controller.init();  