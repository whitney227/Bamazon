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
  password: "whit1982",
  database: "bamazon_db"
});

// connect to the mysql server
connection.connect(function(err){
  if (err) throw (err);
  console.log("connection successful");

  //create a table that will display all the items for sale
  //run table in the terminal
  connection.query("SELECT * FROM bamazon_db.products", function (err, res){
    if (err) {throw err};
    console.table(res)
  //close connection
  connection.end();
  });
});
