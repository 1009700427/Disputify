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
function getAssignmentIDByName(assignmentName, callback)
{
    var connection = mysql.createConnection(config);
    connection.connect();
    var assignmentIDQuery = 'SELECT assignmentID FROM DisputifyDB.Assignments WHERE name = ' + connection.escape(assignmentName);
    connection.query(assignmentIDQuery, (error, results, fields) => {
        if(error){
            throw error;
        }
        console.log(results);
        console.log(results[0].assignmentID);
        var assignmentID = results[0].assignmentID;
        callback(assignmentID);
    });
    connection.end();
}
function getUserIDByName(assignmentID, username, callback)
{
    var connection = mysql.createConnection(config);
    connection.connect();
    var userIDQuery = 'SELECT userID FROM DisputifyDB.User WHERE username = ' + connection.escape(username);
    connection.query(userIDQuery, (error, results, fields) => {
        if(error){
            throw error;
        }
        console.log(results);
        console.log(results[0].userID);
        userID = results[0].userID;
        callback && callback(assignmentID, userID);
    });
    connection.end();
}
function getCourseIDByName(courseName, callback){
    var connection = mysql.createConnection(config);
    connection.connect();
    var courseIDQuery = 'SELECT courseID FROM DisputifyDB.Courses WHERE name = ' + connection.escape(courseName);
    connection.query(courseIDQuery, (error, results, fields) => {
    	if(error){
    		throw error;
		}
		if(results.length!=0){
            var courseID = results[0].courseID;
		}
		else {
            var courseID = null;
		}
		callback && callback(courseID);
	});
    connection.end();
}
// gets all courses with given name
module.exports.getCoursesByCourseName = function(courseName, callback){
	var connection = mysql.createConnection(config);
	connection.connect();
	var courseQuery = "SELECT * FROM DisputifyDB.Courses WHERE name LIKE '%"+(courseName)+"%'";
	connection.query(courseQuery, (error, results, fields) => {
		if(error){
			throw error;
		}
		callback && callback(results);
	});
};
// returns a list of all courses
module.exports.getAllCourses = function(callback){
    var connection = mysql.createConnection(config);
    connection.connect();
    var courseQuery = "SELECT * FROM DisputifyDB.Courses";
    connection.query(courseQuery, (error, results, fields) => {
        if(error){
            throw error;
        }
        callback && callback(results);
    });
};
module.exports.handleResolve = function(disputeID, currentStatus, callback){
    var connection = mysql.createConnection(config);
    connection.connect();
    var disputeQuery = "UPDATE DisputifyDB.Dispute SET status = ? WHERE disputeID = ?";
    var data = [];
    if(currentStatus=="resolved"){
    	data = ["unresolved", disputeID];
	}
	else {
        data = ["resolved", disputeID];
	}
	console.log(data);
    connection.query(disputeQuery, data, (error, results, fields) => {
    	if(error){
    		throw error;
		}
		callback && callback(results);
	});
};
// gets disputes
module.exports.getDisputes = function(courseName, callback){
    getCourseIDByName(courseName, (courseID) => {
        var connection = mysql.createConnection(config);
        connection.connect();
        var data = [courseID];
        var disputeQuery = "SELECT * FROM DisputifyDB.Dispute d, DisputifyDB.User u WHERE courseID = ? AND d.userID=u.userID";
        console.log("sql: "+mysql.format(disputeQuery));
        connection.query(disputeQuery, data, (error, results, fields) => {
        	if(error){
        		throw error;
			}
			callback && callback(results);
		});
        connection.end();
	});
};
// inserts dispute description to assignment
module.exports.insertDisputeData = function (assignmentName, assignmentDescription, disputeDescription, username, courseID, callback){
    // sets yo connection
    var connection = mysql.createConnection(config);
    connection.connect();


	var assignmentID = -1;
	var userID = -1;

	getAssignmentIDByName(assignmentName, (assignmentID) => getUserIDByName(assignmentID, username, (assignmentID, userID) => {
        var data = {
            description: disputeDescription,
            assignmentID: assignmentID,
            userID: userID,
			status: "unresolved",
            courseID: courseID
        };
        var connection = mysql.createConnection(config);
        connection.connect();
        connection.query("INSERT INTO DisputifyDB.Dispute SET ?", data ,(error, results, fields) => {
            console.log(data);
            if (error) {
                throw error;
            }
            callback();
        });

        connection.end();
	}));
};
// returns a list of assignments by course name
module.exports.getAssignmentByCourse = function(courseName, callback){
    getCourseIDByName(courseName, (courseID) => {
    	var data = [courseID];
        var connection = mysql.createConnection(config);
        connection.connect();
		connection.query("SELECT * FROM DisputifyDB.Assignments WHERE courseID = ?", data, (error, results, fields) => {
			if(error){
				throw error;
			}
			callback && callback(results);
		});
	});

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
	connection.query("SELECT * FROM DisputifyDB.Assignments", function(error, results, fields){
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
	connection.query("SELECT * FROM DisputifyDB.Assignments WHERE name LIKE '%"+assignmentName+"%'", function(error, results, fields){
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