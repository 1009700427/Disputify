const mysql = require('mysql');
const express = require('express');
// adds app 
const app = express(); 
// now gets the http 
const http = require('http').Server(app);
const dbDriver = require("./database/dbDriver");
var io = require('socket.io')(http);

const config = {
    host: 'localhost',
    user: 'root',
    password: 'abc',
    database: 'DisputifyDB'
}
// returns all assignments
app.get('/showAll', function(req, res){
    dbDriver.getAllAssignments((result) => {
        console.log(result);
        res.send(result);
    });
});
// returns assignments of designated names
app.get('/searchAssignment', function(req, res){
    // var temp = [];
    // temp.push(req.query.assignmentTitle);
    console.log("req.query: "+req.query);
    console.log("in server: "+req.query.assignmentTitle);
    dbDriver.getAssignmentsByName(req.query.assignmentTitle, (result)=>{
        console.log("In /searchAssignment");
        console.log(result);
        res.send(result);
    });
});
// listens to port 3000
http.listen(3000, function(){
    console.log("Express app listening on port 3000.");
});