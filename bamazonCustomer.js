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
})