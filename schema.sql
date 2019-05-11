DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
item_id INTEGER AUTO_INCREMENT NOT NULL,
product_name VARCHAR (45) NOT NULL,
department_name VARCHAR (45) NOT NULL,
price DECIMAL (10,4) NOT NULL,
stock_quantity INTEGER(10) NOT NULL,
primary key (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Keurig Coffee Maker", "Electronics", 149.99, 50),
("iRobot Roomba", "Electronics", 250, 5),
("Timex Watch", "Jewelry", 99.99, 12),
("Ray-Ban Sunglasses", "Accessories", 153, 50),
("Nike Air", "Shoes", 170, 10),
("Schwinn Beach Cruiser", "Recreation", 153.99, 2),
("10 Foot Kayak", "Recreation", 179.99, 15),
("Louis Vuitton Handbag", "Accessories", 2550, 1),
("3-Piece Sectional", "Furniture", 6495, 3),
("Reclaimed Wood Coffee Table", "Furniture", 769, 100)

SELECT * FROM bamazon.products;
