// Constants for required npm packages
const   mysql = require("mysql"),
        inquirer = require("inquirer"),
        colors = require("colors"),
        Table = require("cli-table");

// Defining the mysql connection variable
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazonDB"
});

// Create the connection with the mysql database
connection.connect(function(err) {
    if (err) throw err;
    start(); // begin first function
  });

resultTable = new Table({
  head: ['id', 'name', 'dept', 'price', 'quty'], 
  style: {head:[], border:[], 'padding-left':1, 'padding-right': 1 }
})  

function start() {
  // Show list of products from Database
  connection.query("SELECT * FROM products", function(err, results) {
      console.log(results)
    
    // Begin to ask the customer questions
  inquirer
    .prompt([{
      name: "item",
      type: "input",
      message: "What is the ID of the product you would like to purchase?"
    },
    {
      name: "qty",
      type: "input",
      message: "Great, how many of that product would you like?"
    }])
    .then(function(answers) {
      // Run function to submit a purchase after questions are answered
      if (answers.item === "1") {
        console.log("Awesome Sauce")
      }
      else {
        console.log("Maybe Next Time")
      }
    });
  })
}
