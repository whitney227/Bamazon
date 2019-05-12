var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // My port
  port: 3306,

  //username
  user: "root",

  //password
  password: "",
  database: "bamazon_db"
});

// connect to the mysql server
connection.connect(function(err){
  if (err) throw err;
  console.log("connection successful");
  start();
});

//create start function that displays all the items for sale in a table
//pass the response to the table
var start = function(){
  connection.query("SELECT * FROM bamazon_db.products", function (err, res){
    if (err) throw err;
    console.table(res);
 
  //prompt the user to pick a product by the item_id
    inquirer
      .prompt([
        {
          name: 'choice',
          type: 'rawlist',
          message: 'What is the item_id of the product you would like to buy?',   
          choices: function(value) {
            var choicesArray = [];
            for (var i = 0; i <res.length; i++) {
              choicesArray.push(res[i].item_id);
            }
            return choicesArray;
          },
        },
        //prompt the user to enter the quantity they want to purchase
        {
          name: 'quantity',
          type: 'input',
          message: 'How many units would you like of the product?',
          validate: function(value){
            if (isNaN(value) == false) {
              return true;
            } else {
              return false;
            }
          }
        }
      ]).then(function(answer){
        for (var i = 0; i < res.length; i++) {
          if (res[i].item_id == answer.choice) {
          var chosenItem = res[i];
        }
      }

      //calculate the remaining stock
      var updateStock = parseInt(chosenItem.stock_quantity) - parseInt(answer.quantity);

      //notify user that the item is out of stock
      if(chosenItem.stock_quantity < parseInt(answer.quantity)) {
        console.log("Insufficient quantity.  Please place another order");
        start();
      }
      //update inventory if item is in stock and notify user of total
      else{
        connection.query(
          "UPDATE products SET ? WHERE ?",
          [
            {stock_quantity: updateStock},
            {item_id: chosenItem.item_id}
          ],
          function(err, res){
            console.log("Your order has been placed.");
            var total = (parseInt(answer.quantity) * chosenItem.price).toFixed(2);
            console.log("Your total is $" + total);
            connection.end();
          }
        )
      }


    }); // close .then of inquirer prompt

    }); // close connection.query

  } // close start function
