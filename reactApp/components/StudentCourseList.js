import React from "react"; 
import ReactDOM from "react-dom"; 
import { Link } from 'react-router-dom';
import { FormGroup, FormControl, ControlLabel, Button, DropdownButton, MenuItem, Glyphicon} from "react-bootstrap"; 
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
		this.state = {
			courseList: [],
            dropdownTitle: (<Glyphicon glyph="user" />),
			finalResult: null,
			fireReturn: false
		}
        var connection = mysql.createConnection(config);
        connection.connect();
        var that = this;
        connection.query("SELECT name FROM DisputifyDB.Courses", function(error, results, fields){
            if(error){
                throw error;
            }
            console.log("this is not right");
            this.courseList = JSON.parse(JSON.stringify(results));
            console.log("temp: "+this.courseList);
            console.log(JSON.stringify(results));
            setTimeout(function(){
            		console.log(JSON.parse(JSON.stringify(results)));
            		that.setState({finalResult: results,
									fireReturn: true});
                    //this.courses = (<DropdownButton title={this.dropdownTitle}>{JSON.parse(JSON.stringify(results)).map(that.getCourses)} </DropdownButton>)
                    console.log("2ksjdfghksjdfgh");
                },
                0);
        });
	}
	getCourses(title, i){
		return (
			<MenuItem eventKey={i}>
				{title.name}
			</MenuItem>
		);
	}
	render(){
		var that = this;
		return(
			<div>
				{
                    this.state.fireReturn && 	<DropdownButton title={this.state.dropdownTitle}>{JSON.parse(JSON.stringify(this.state.finalResult)).map(that.getCourses)} </DropdownButton>
                }
			</div>
		);
		//this.getCourseList();
        //setTimeout(() => this.getCoursesHelper(), 0);
		//var courseList = ["CSCI103", "CSCI104", "CSCI201", "EE109"];

		// this.renderHelper(()=>(that.courseList = dbDriver.getCourses()),
		// 	()=>(courses = (<DropdownButton title={dropdownTitle}>{that.courseList.map(this.getCourses)}</DropdownButton>))
		// );
        //this.courses = (<DropdownButton title={dropdownTitle}>{that.courseList.map(this.getCourses)}</DropdownButton>)
		// courseList = dbDriver.getCourses();
		// var courses = (<DropdownButton title={dropdownTitle}>{courseList.map(this.getCourses)}</DropdownButton>);

		//return (this.getCourseDOM());
		//return (<h5>123</h5>);
	}
}
