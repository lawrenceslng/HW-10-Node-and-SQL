CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    price FLOAT(5,2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("laptop","Electronics",500.50,10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("projector","Electronics",130.00,15);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("car stereo","Electronics",79.95,7);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("shovel","Gardening",19.99,52);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("memory foam pillow","Home",10.99,100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("comforter","Home",75.00,80);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("bath towel","Home",20.50,55);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("outdoor chair","Gardening",24.95,33);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("smart phone","Electronics",299.98,8);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("wok","Home",10.25,30);