const mysql = require('mysql');

const config = {
	host: 'localhost', 
	user: 'root', 
	password: 'abc', 
	database: 'DisputifyDB'
};
// adds user into database 
module.exports.addUser = function(data){
	// sets up connection 
	var connection = mysql.createConnection(config);
	connection.connect();
	connection.query("INSERT INTO DisputifyDB.User SET ?", 
		data, function (error, results, fields){
			if (error) {
				throw error;
			}
	});
	connection.end(); 
};
// checks for username and password 
module.exports.checkUser = function(data, callback){
	// sets up connection 
	var connection = mysql.createConnection(config);
	connection.connect();
	console.log(data);
	connection.query("SELECT * FROM DisputifyDB.User WHERE type=? AND username=? AND password=?", data, function(error, results, fields){
		console.log(connection.sql);
		if(error){
			throw error; 
		}
		if(results.length==0){
			connection.end();
			console.log("return false!"); 
			callback(false, results);
		}
		connection.end(); 
		console.log("return true!");
		console.log(results);
		callback(true, results);
	});
	connection.end(); 
};
// returns an array of courses 
module.exports.getCourses = function(callback){
	// sets up connection 
	var connection = mysql.createConnection(config);
	var temp = [];
	connection.connect();
	connection.query("SELECT name FROM DisputifyDB.Courses", function(error, results, fields){
		if(error){
			throw error; 
		}
		temp = JSON.parse(JSON.stringify(results));
        callback & callback(temp);
        console.log(JSON.stringify(results));
	});
	connection.end();
};
// returns an array of all assignments of a particular user
module.exports.getAllAssignments = function(callback){
	// sets up connection
	var connection = mysql.createConnection(config);
	connection.connect();
	var temp = [];
	connection.query("SELECT name, description FROM DisputifyDB.Assignments", function(error, results, fields){
		if(error){
			throw error;
		}
		temp = JSON.stringify(results);
        callback & callback(temp);
	});
    connection.end();
};
// returns an array of all assignments that contains a particular string title
module.exports.getAssignmentsByName = function(assignmentName, callback){
	// sets up connection
	var connection = mysql.createConnection(config);
	connection.connect();
	var temp = [];
	console.log("Assignmentname: "+assignmentName);
	connection.query("SELECT name, description FROM DisputifyDB.Assignments WHERE name LIKE '%"+assignmentName+"%'", function(error, results, fields){
		if(error){
			throw error;
		}
		temp = JSON.stringify(results);
		callback & callback(temp);
	});
	connection.end();
};
// returns the assignment that contains the given id number
module.exports.getAssignmentByExactName = function(name,callback){
	// sets up connection
	var connection = mysql.createConnection(config);
	connection.connect();
	var temp = [];
	temp.push(name);
	console.log("Name: "+name);
	connection.query("SELECT name, description, courseID FROM DisputifyDB.Assignments WHERE name =?", temp, function(error, results, fields){
		if(error){
			throw error;
		}
		callback & callback(JSON.stringify(results));
	});
	connection.end();
};
// inserts dispute description to assignment
module.exports.insertDisputeData = function (name, description, callback){
	// sets yo connection
	var connection = mysql.createConnection(config);
	connection.connect();
	var temp = [name, description];
	conn
};
// returns an array of courses
module.exports.getFacultyCourses = function(callback){
    // sets up connection
    var connection = mysql.createConnection(config);
    var temp = [];
    connection.connect();
    connection.query("SELECT name FROM DisputifyDB.Courses", function(error, results, fields){
        if(error){
            throw error;
        }
        temp = JSON.parse(JSON.stringify(results));
        callback & callback(temp);
        console.log(JSON.stringify(results));
    });
    connection.end();
};