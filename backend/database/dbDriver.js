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
module.exports.checkUser = function(data){
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
			return false; 
		}
		connection.end(); 
		console.log("return true!");
		return true; 
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
}