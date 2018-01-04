import React from "react"; 
import ReactDOM from "react-dom"; 
import { Link } from 'react-router-dom';
import { FormGroup, FormControl, ControlLabel, Button, DropdownButton, MenuItem} from "react-bootstrap"; 
const dbDriver = require("../../backend/database/dbDriver.js");

export default class StudentCourseList extends React.Component{
	constructor(){
		super(); 
	}
	function getCourses(title, i){
		return (
			<MenuItem eventKey={i}>
				{title}
			</MenuItem>
		);
	}
	const courses = (<DropdownButton>{courseList.map(getCourses)}</DropdownButton> );
	render(){
		return(courses);
	}

}
