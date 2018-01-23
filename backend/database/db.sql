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
    courseID INT(11), 
    userID INT(11), 
    assignmentID INT(11), 
    `status` VARCHAR(50), 
    FOREIGN KEY fk1(courseID) REFERENCES Courses(courseID),
    FOREIGN KEY fk2(userID) REFERENCES `User`(userID),
	FOREIGN KEY fk3(assignmentID) REFERENCES Assignments(assignmentID)
    
);
INSERT INTO DisputifyDB.Courses (name) VALUES ('CSCI103');
INSERT INTO DisputifyDB.Courses (name) VALUES ('CSCI109');
INSERT INTO DisputifyDB.Courses (name) VALUES ('CSCI104');
INSERT INTO DisputifyDB.Courses (name) VALUES ('CSCI170');
INSERT INTO DisputifyDB.Courses (name) VALUES ('CSCI201');
INSERT INTO DisputifyDB.Courses (name) VALUES ('CSCI270');
INSERT INTO DisputifyDB.Courses (name) VALUES ('CSCI356');
INSERT INTO DisputifyDB.Courses (name) VALUES ('CSCI360');
INSERT INTO DisputifyDB.Courses (name) VALUES ('CSCI350');


INSERT INTO DisputifyDB.User (type, username, password, `name`) VALUES ('student', 'steve', 123, 'Tony');
INSERT INTO DisputifyDB.User (type, username, password, `name`) VALUES ('student', '111', 111, 'Steven');
INSERT INTO DisputifyDB.User (type, username, password, `name`) VALUES ('student', 'leo', 123, 'Leo');
INSERT INTO DisputifyDB.User (type, username, password, `name`) VALUES ('faculty', '111', 111, 'Miller');

INSERT INTO DisputifyDB.Assignments (name, description, courseID, userID) VALUES ('HW#1', 'Linked List', 1, 2);
INSERT INTO DisputifyDB.Assignments (name, description, courseID, userID) VALUES ('HW#2', 'Recursion', 1, 2);
INSERT INTO DisputifyDB.Assignments (name, description, courseID, userID) VALUES ('HW#3', 'Dynamic Memory Allocation', 1, 2);

INSERT INTO DisputifyDB.Dispute (description, courseID, userID, assignmentID, `status`) VALUES ('Part #2 Constructor was correct',1, 2, 1, 'unresolved');
INSERT INTO DisputifyDB.Dispute (description, courseID, userID, assignmentID, `status`) VALUES ('Line #35 memory allocation was done correctly',1, 1, 1, 'unresolved');
INSERT INTO DisputifyDB.Dispute (description, courseID, userID, assignmentID, `status`) VALUES ('Line #21 there is no out of bound error',1, 3, 1, 'unresolved');


