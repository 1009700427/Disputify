import React from "react"; 
import ReactDOM from "react-dom"; 
import { Link } from 'react-router-dom';
import { FormGroup, FormControl, ControlLabel, Button, DropdownButton, MenuItem} from "react-bootstrap"; 
const dbDriver = require("../../backend/database/dbDriver.js");
const mysql = require('mysql');
const config = {
	host: 'localhost', 
	user: 'root', 
	password: 'abc', 
	database: 'DisputifyDB'
}
export default class StudentCourseList extends React.Component{
	constructor(){
		super(); 
	}
	getCourses(title, i){
		return (
			<MenuItem eventKey={i}>
				{title}
			</MenuItem>
		);
	}
	render(){
		var courseList = [];
		// sets up connection 
		var connection = mysql.createConnection(config);
		connection.connect();
		connection.query("SELECT * FROM DisputifyDB.Courses", function(error, results, fields){
			if(error){
				throw error; 
			}
			courseList = results; 
		});
		courseList = ["abc", "dfe", "123"];
		const courses = (<DropdownButton>{courseList.map(this.getCourses)}</DropdownButton>);
		connection.end(); 
		return (courses);
	}
}
