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


function start() {

  // Query to return a list of products from Database
  connection.query("SELECT * FROM products", function(err, res) {

  // Cli Table to hold the result set
    var table = new Table({
      head: ['id', 'name', 'dept', 'price', 'qty'], 
      style: {head:[], border:[], 'padding-left':1, 'padding-right': 1 }
    })  

  // Looping through the results to build the table
    for(var i = 0; i < res.length; i++){
			table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].offer_price, res[i].stock_quantity+'x'])
		}

    // Sending the table to the console, once populated with results
		console.log(table.toString())    
    
    // Begining to ask the customer questions
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
