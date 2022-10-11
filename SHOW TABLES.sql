CREATE TABLE User(
    userId int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(255) NOT NULL UNIQUE
);

CREATE TABLE Food(
    foodId int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(255),
    price int(11)
);

CREATE TABLE Order(
    orderId int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userId int(11) NOT NULL, 
    foodId int(11) NOT NULL, 
    createdAt datetime NOT NULL DEFAULT NOW(),
    FOREIGN KEY (foodId) REFERENCES Food(foodId) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES User(userId) ON DELETE CASCADE
);