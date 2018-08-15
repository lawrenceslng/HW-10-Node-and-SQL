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
  });



  inquirer
  .prompt([
    // Here we create a basic text prompt.
    {
      type: "list",
      message: "What would you like to do?",
      choices: ["VIEW PRODUCTS FOR SALE", "VIEW LOW INVENTORY", "ADD TO INVENTORY", "ADD NEW PRODUCT"],
      name: "action"
    }
  ])
  .then(function(inquirerResponse) {
    //   console.log(inquirerResponse.action);
    if(inquirerResponse.action == "VIEW PRODUCTS FOR SALE")
    {
        listProducts(true);
    }
    else if(inquirerResponse.action == "VIEW LOW INVENTORY")
    {
        lowInventory();
    }
    else if(inquirerResponse.action == "ADD TO INVENTORY")
    {
        addInventory();
    }
    else if(inquirerResponse.action == "ADD NEW PRODUCT")
    {
        newProduct();
    }
  });


function listProducts(bool){
    //list the item IDs, names, prices, and quantities.
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err,res){
        if(err) throw err;
        var inventory = [];
        for(var i = 0; i < res.length; i++)
        {
            inventory.push(res[i]);
        }
        console.table(inventory);
    })
    if(bool) connection.end();
}

function lowInventory()
{
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity < 5", function(err,res){
        if(err) throw err;
        if(res.length < 1)
        {
            console.log("No low inventory in database.");
        }
        else{
            var inventory = [];
            for(var i = 0; i < res.length; i++)
            {
                inventory.push(res[i]);
            }
            console.table(inventory);
        }
        
    })
    connection.end();
}

function addInventory()
{
    // display a prompt that will let the manager "add more" of any item currently in the store.
    // listProducts(false);

    inquirer
    .prompt([
      // Here we create a basic text prompt.
      {
        type: "input",
        message: "Which item would you like to add inventory to?",
        name: "item"
      },
      {
        type: "input",
        message: "How many of this item are you adding to the inventory?",
        name: "amount"
      }
    ]).then(function(data){
        // console.log(data.item + data.amount);
        connection.query("SELECT item_id, product_name, price, stock_quantity FROM products WHERE ?",
        {
            product_name: data.item
        }, function(err,res){
            if(err) throw err;
            var currentQuant = parseInt(res[0].stock_quantity);
            // console.log(currentQuant);
            var newQuant = currentQuant + parseInt(data.amount);
            // console.log(newQuant);
            connection.query("UPDATE products SET ? WHERE ?", 
            [{
                stock_quantity: newQuant
            },
            {
                product_name: data.item
            }]
            ,function(err,res){
                if(err) throw err;
                console.log("Update Completed");
                connection.end();
            })
        })
       
    })
}

function newProduct(){
    inquirer
    .prompt([
      // Here we create a basic text prompt.
      {
        type: "input",
        message: "What is the product name?",
        name: "name"
      },
      {
        type: "input",
        message: "Which department does the product belong in?",
        name: "department"
      },
    {
        type: "input",
        message: "What is the price of this product?",
        name: "price"
    },
    {
        type: "input",
        message: "How many of these products are available?",
        name: "quantity"
    }]).then(function(data){
        // console.log(data.name + data.department + data.price + data.quantity);
        var name = data.name;
        var dept = data.department;
        var sql = "INSERT INTO products SET ?";
        var values = {product_name: name, department_name: dept, price: parseFloat(data.price), stock_quantity: parseInt(data.quantity)};
        connection.query(sql, values, function(err, res) {
            if(err) throw err;
            console.log("New Product Inserted!");
            listProducts(true);
        })

        // connection.end();
    })
}