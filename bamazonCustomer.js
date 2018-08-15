var inquirer = require('inquirer');
var mysql = require("mysql");
const cTable = require('console.table');
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "ASDFJKL",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId + "\n");
    displayItems();
    // connection.end();
});


function displayItems(){
    console.log("retrieving data...");
    connection.query("SELECT item_id, product_name, price FROM products", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        var inventory = [];
        for(var i = 0; i < res.length; i++)
        {
            inventory.push(res[i]);
        }
        console.table(inventory);
        promptUser();
    });
    
}

function promptUser(){
    inquirer
        .prompt([
          // Here we create a basic text prompt.
          {
            type: "input",
            message: "Insert the id of the item you wish to purchase:",
            name: "itemID"
          },
          {
            type: "input",
            message: "How many of this product would you like to purchase?",
            name: "itemAmt"
          }])
          .then(function(data) {
            // console.log(data.itemID + data.itemAmt);
            placeOrder(data.itemID, data.itemAmt);
          })
}

function placeOrder(item,quantity){
    // console.log(item + " " + quantity);
    var id = item;
    // console.log(id);
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products WHERE ?",
    {
        item_id: id
    }
    , function(err, res) {
        if (err) throw err;
        // console.table(res);
        // console.log(parseInt(res[0].stock_quantity));
        if(parseInt(res[0].stock_quantity)<quantity)
        {
            console.log("In stock quantity Insufficient! There are only " + res[0].stock_quantity + " in stock.");
            //
                inquirer
                .prompt([
                // Here we create a basic text prompt.
                {
                    type: "list",
                    message: "What would you like to do?",
                    choices: ["GO BACK TO ITEM LIST", "EXIT"],
                    name: "action"
                }
                ])
                .then(function(data) {
                  if(data.action == "GO BACK TO ITEM LIST")
                  {
                    console.log("Returning to Home...");
                    displayItems();
                  }
                  else
                  {
                    console.log("Bye!");
                    connection.end();
                  }
                })
                //
        }
        else{
            console.log("Order Processing...");
            var newStockQuant = res[0].stock_quantity - quantity;
            var price = Math.round(res[0].price*100);
            var cost = (quantity*price)/100;
            updateData(id, newStockQuant,cost);

        }
    })
}

function updateData(item, quantity,total){
    connection.query("UPDATE products SET ? WHERE ?",
    [{
        stock_quantity: quantity
    },
    {
        item_id: item
    }], function(err, res){
        if (err) throw err;
        connection.end();
    })
    console.log("Your total comes out to: $" + total);
}