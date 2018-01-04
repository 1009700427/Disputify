import React from "react"; 
import ReactDOM from "react-dom"; 
import { Link } from 'react-router-dom';
import { FormGroup, FormControl, ControlLabel, Button, DropdownButton, MenuItem} from "react-bootstrap"; 
import StudentCourseList from "../components/StudentCourseList";
const dbDriver = require("../../backend/database/dbDriver.js");

export default class StudentAssignmentList extends React.Component{
	constructor(){
		super(); 
	}
	render(){
		return(
			<div class="student-assignment-list-page">
				<div class="student-assignment-list-header">
					<h2>
						Assignment List 
					</h2> 
					<Button bsStyle="danger" onClick={() => this.userSignOut()}></Button> 
					<div class="labels">
						<h5>Raise New Disputes</h5>  
						<h5>Show Assignments by Courses</h5> 
						<h5>Filter Assignments</h5> 
					</div> 
					<div class="space"></div>
				</div> 
				<div class="student-assignment-list-options">
					<FormControl
						type="text"
						placeholder="Enter Assignment Title"
						onChange={}
					/>
					<Button bsStyle="success" onChange={}></Button> 
					<StudentCourseList/>
					<FormControl
						type="text"
						placeholder="Enter Assignment Title"
						onChange={}
					/>
					<Button bsStyle="success" onChange={}></Button> 
				</div> 
			</div> 
		);
	}
}