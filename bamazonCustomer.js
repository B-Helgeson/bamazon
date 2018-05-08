// Constants for required npm packages
const   mysql = require("mysql"),
        inquirer = require("inquirer"),
        colors = require("colors"),
        Table = require("cli-table");

// Defining the mysql connection variable
var connection = mysql.createConnection({
  host: "localhost",
  port: 3307,
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
    // Return product based on input
    getPrice(answers.item,answers.qty);
    });
  })
}



function getPrice(item,qty) {
  console.log("Getting your total...\n");
  connection.query("SELECT * FROM products WHERE item_id = ?", item, function(err, res) {
   
  // error handling
    if (err) throw err;

  // check that the item exists
    if (res.length < 1) {
			console.log('That product ID is not in our databse, try again');
			start();
    }
  
  // check for quantity available
    else if (qty > res[0].stock_quantity) { 
      console.log('Not enough inventory, please try again');
      start();
    }

    else {

      let sum = res[0].offer_price * parseInt(qty)

      inquirer
      .prompt({
        name: "purchaseok",
        type: "confirm",
        message: "The total is " + sum + " , is that OK?",
      })
      .then(function(response) {
      
        // If they say no to the price...
        if (response === "No") {
          console.log("sorry to hear that, please come again soon!");
          start();
        } 

        // Otherwise reduce inventory for the purchased item
        reduceInventory(res[0].item_id, parseInt(qty))

      });
    };
  });
};

function reduceInventory(itemId, qtyReduce) {
  connection.query('SELECT stock_quantity from products where item_id = ?', itemId, function(err, result){
    
    if (err) throw err;

    let currentQty = result[0].stock_quantity;
    let newQty = currentQty - qtyReduce;
    updateFunction(newQty);
  })

  function updateFunction(newQty){
    connection.query('UPDATE products SET stock_quantity = ? where item_id = ?', [newQty, itemId], function(err,result){

      if (err) throw err;

      console.log("updating quantities...");

      start();
    })
  }
}