DROP DATABASE IF EXISTS DisputifyDB; 
CREATE DATABASE DisputifyDB; 

USE DisputifyDB; 

CREATE TABLE `User`(
	userID INT(11) PRIMARY KEY AUTO_INCREMENT,
    `type` VARCHAR(20),
    username VARCHAR(50),
    `password` VARCHAR(50)
);

CREATE TABLE Courses(
	courseID INT(11) PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(100), 
    assignments VARCHAR(100)
);

CREATE TABLE Assignments(
	assignmentID INT(11) PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(100), 
);