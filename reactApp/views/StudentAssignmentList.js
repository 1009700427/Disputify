import React from "react"; 
import ReactDOM from "react-dom"; 
import { Link } from 'react-router-dom';
import { FormGroup, FormControl, ControlLabel, Button, DropdownButton, MenuItem, Glyphicon} from "react-bootstrap"; 
import StudentCourseList from "../components/StudentCourseList";
const dbDriver = require("../../backend/database/dbDriver.js");

export default class StudentAssignmentList extends React.Component{
	constructor(props){
		super(props); 
		this.state = {
			disputeAssignmentTitle: '', 
			viewAssignmentTitle: ''
		}
	}
	logOutUser(){

	}
	searchAssignment(assignmentName){

	}
	render(){
		return(
			<div class="student-assignment-list-page">
				<div class="student-assignment-list-header">
					<h2>
						Assignment List 
					</h2> 
					<Link to='/'>
						<Button bsStyle="danger" onClick={()=>logOutUser()}>Log Out</Button> 
					</Link>					
					<div class="labels">
						<h5>Raise New Disputes</h5>  
						<h5>Show Assignments by Courses</h5> 
						<h5>View Assignments</h5> 
					</div> 
					<div class="space"></div>
				</div> 
				<div class="student-assignment-list-options">
					<FormControl
						type="text"
						placeholder="Enter Assignment Title"
						onChange={(e) => this.setState({disputeAssignmentTitle: e.target.value})}
					/>
					<Button bsStyle="success" onClick={()=>searchAssignment(this.state.disputeAssignmentTitle)}><Glyphicon glyph="search" /></Button> 
					<StudentCourseList/>
					<FormControl
						type="text"
						placeholder="Enter Assignment Title"
						onChange={(e) => this.setState({viewAssignmentTitle: e.target.value})}
					/>
					<Button bsStyle="success" onClick={()=>searchAssignment(this.state.viewAssignmentTitle)}><Glyphicon glyph="th" /></Button> 
				</div> 
			</div> 
		);
	}
}