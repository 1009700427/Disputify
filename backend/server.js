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
    console.log("req.query: "+req.query);
    console.log("in server: "+req.query.assignmentTitle);
    dbDriver.getAssignmentsByName(req.query.assignmentTitle, (result)=>{
        console.log("In /searchAssignment");
        console.log(result);
        res.send(result);
    });
});
// returns the particular assignment according to the given id
app.get('/assignment', function(req, res){
    dbDriver.getAssignmentByExactName(req.query.name, (result)=>{
        console.log("In /assignment");
        console.log(result);
        res.send(result);
    });
});
// sends dispute data to database
app.get('/disputeSubmit', function(req, res){
    var assignmentName = req.query.assignmentName;
    var assignmentDescription = req.query.assignmentDescription;
    var disputeDescription = req.query.disputeDescription;
    var username = req.query.username;
    dbDriver.insertDisputeData(assignmentName, assignmentDescription, disputeDescription, username, () => {
        res.send("succeed");
    });
});
// returns assignments by course name
app.get('/searchAssignmentByCourse', (req, res) => {
    var courseName = req.query.courseName;
    console.log("course name: " + courseName);
    dbDriver.getAssignmentByCourse(courseName, (result) => {
        res.send(result);
    });
});
// get courses by coursename
app.get("/searchCourseByName", (req, res) => {
    var courseName = req.query.courseName;
    dbDriver.getCoursesByCourseName(courseName, (result) => {
        res.send(result);
    });
});
// Returns a list of all courses
app.get("/showAllCourses", (req, res) => {
    dbDriver.getAllCourses((result) => {
        res.send(result);
    });
});
app.get('/getDisputes', (req, res) => {
    var courseName = req.query.courseName;
    dbDriver.getDisputes(courseName, (result) => {
        res.send(result);
    });
});
// listens to port 3000
http.listen(3000, function(){
    console.log("Express app listening on port 3000.");
});