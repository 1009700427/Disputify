const mysql = require('mysql');
const express = require('express');
// adds app 
const app = express(); 
// now gets the http 
const http = require('http').Server(app);
var io = require('socket.io')(http);

const config = {
    host: 'localhost',
    user: 'root',
    password: 'abc',
    database: 'DisputifyDB'
}

app.get('/test', function(req, res){
    this.courseList = [];
    this.courses = null;
    this.dropdownTitle = (<Glyphicon glyph="user" />);
    //this.courseList = dbDriver.getCourses();
    var connection = mysql.createConnection(config);
    connection.connect();
    var that = this;
    connection.query("SELECT name FROM DisputifyDB.Courses", function(error, results, fields){
        if(error){
            throw error;
        }
        this.courseList = JSON.parse(JSON.stringify(results));
        console.log("temp: "+this.courseList);
        console.log(JSON.stringify(results));
        setTimeout(function(){
                console.log(JSON.parse(JSON.stringify(results)));
                this.courses = (<DropdownButton title={this.dropdownTitle}>{JSON.parse(JSON.stringify(results)).map(that.getCourses)} </DropdownButton>)
                console.log(this.courses);
            },
            0);
    });
});

// listens to port 3000
http.listen(3000, function(){
    console.log("Express app listening on port 3000.");
});