--Use this Schema File to create the database required for the bamazon app

DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (item_id),
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  offer_price DECIMAL(10,2) NULL,
  stock_quantity INT default 0
);

INSERT INTO products(product_name,department_name,offer_price,stock_quantity)
 VALUES('Porsche 911 Turbo','Automotive',150000.00,2), 
       ('Baby Green Iguana','Pets',35.75,20), 
       ('Super Swaddle Diapers','Infants',20.25,100), 
       ('Milk Whole Gallon','Grocery',2.50,50), 
       ('Bread, Whole Grain','Grocery',1.25,40), 
       ('Bananas','Grocery',0.15,75), 
       ('Hypo-Alergenic Cat','Pets',159.45,4), 
       ('Greater Chimpanzee','Pets',2575.30,1), 
       ('Chevy Silverado 4x4','Automotive',35000.00,4), 
       ('Honda Civic','Automotive',9998.98,10);
       
SELECT * FROM products;