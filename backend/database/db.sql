DROP DATABASE IF EXISTS DisputifyDB; 
CREATE DATABASE DisputifyDB; 

USE DisputifyDB; 

CREATE TABLE `User`(
	userID INT(11) PRIMARY KEY AUTO_INCREMENT,
    `type` VARCHAR(20),
    username VARCHAR(50),
    `password` VARCHAR(50)
);