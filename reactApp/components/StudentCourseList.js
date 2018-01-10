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

		// setTimeout(function(){
         //        console.log(this.courseList)
         //        this.courses = (<DropdownButton title={this.dropdownTitle}>{this.courseList.map(this.getCourses)} </DropdownButton>)
		// 		console.log("2ksjdfghksjdfgh");
		// 	},
		// 8000);
	}
	getCourses(title, i){
		return (
			<MenuItem eventKey={i}>
				{title.name}
			</MenuItem>
		);
	}
	renderHelper(callback1, callback2){
		console.log("yoyoyoyoyo");
		callback1(); 
		callback2();
	}
	deepCopy(courseList, results){
		var temp = [];
        for(var i=0; i<results.length; i++){
            temp.push(results[i].name);
        }
        console.log("in query");
        courseList = JSON.parse(JSON.stringify(temp));
        console.log(temp);
        return courseList;
	}
	getCourseDOM(){
		const dropdownTitle = (<Glyphicon glyph="user" />);
		var that = this; 
		var courseList = [];
		// sets up connection 
		var connection = mysql.createConnection(config);
		connection.connect();
		var courses; 

        that.renderHelper(
                dbDriver.getCourses()

        , function(){
        	for(var i=0; i<courseList.length; i++){
        		courseList[i] = courseList[i].name;
			}
            console.log(courseList);
            courses = (<DropdownButton title={dropdownTitle}>{courseList.map(that.getCourses)}</DropdownButton>);
            console.log("second");
            console.log(courses);
            connection.end();
            return (courses);
        });
		//return courses; 
	}
	getCourseList(callback){
		this.courseList = dbDriver.getCourses();
        console.log("getCourseList(callback)");
        //callback && callback();
	}
	getCoursesHelper(){
        setTimeout(() => this.courses = (<DropdownButton title={this.dropdownTitle}>{this.courseList.map(this.getCourses)}</DropdownButton>), 0);

		console.log("getCoursesHelper()");
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
