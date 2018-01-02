const mysql = require('mysql');

const config = {
	host: 'localhost', 
	user: 'root', 
	password: 'abc', 
	database: 'DisputifyDB'
}
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
}
// checks for username and password 
module.exports.checkUser = function(data){
	// sets up connection 
	var connection = mysql.createConnection(config);
	connection.connect();
	connection.query("SELECT FROM DisputifyDB.User WHERE type=?, username=?, password=?", data, function(error, results, fields){
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
		return false; 
	});
}