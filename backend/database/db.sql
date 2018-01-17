DROP DATABASE IF EXISTS DisputifyDB; 
CREATE DATABASE DisputifyDB; 

USE DisputifyDB; 

CREATE TABLE `User`(
	userID INT(11) PRIMARY KEY AUTO_INCREMENT,
    `type` VARCHAR(20),
    username VARCHAR(50),
    `password` VARCHAR(50),
    `name` VARCHAR(100)
);

CREATE TABLE Courses(
	courseID INT(11) PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(100)
);

CREATE TABLE Assignments(
	assignmentID INT(11) PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(100), 
    description VARCHAR(500), 
	courseID INT(11),
    userID INT(11), 
    FOREIGN KEY fk1(courseID) REFERENCES Courses(courseID),
    FOREIGN KEY fk2(userID) REFERENCES `User`(userID)
);	

CREATE TABLE Dispute(
	disputeID INT(11)  PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(500),
    assignmentID INT(11), 
    userID INT(11), 
    `status` VARCHAR(50), 
    FOREIGN KEY fk1(assignmentID) REFERENCES Assignments(assignmentID),
    FOREIGN KEY fk2(userID) REFERENCES `User`(userID)
);