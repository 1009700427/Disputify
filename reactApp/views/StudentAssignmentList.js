import React from "react"; 
import ReactDOM from "react-dom";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FormGroup, FormControl, ControlLabel, Button, DropdownButton, MenuItem, Glyphicon} from "react-bootstrap"; 
import StudentCourseList from "../components/StudentCourseList";
const dbDriver = require("../../backend/database/dbDriver.js");

export default class StudentAssignmentList extends React.Component{
	constructor(props){
		super(props); 
		this.state = {
            assignmentTitle: '',
			viewAssignmentTitle: '',
            assignments: []
		}
	}
	logOutUser(){

	}
	searchAssignmentByName(assignmentName){
		var that = this;
		console.log(assignmentName);
		axios.get("http://localhost:3000/searchAssignment", {
			params: {
                assignmentTitle: assignmentName
            }
		})
			.then(resp => {
				that.setState({
					assignments: resp.data
				});
				console.log(resp.data);
			})
			.catch(err => {
				console.log("Error: cannot retrieve assignments in searchAssignment(assignmentName) ", err);
			});
	}
	searchAssignmentByCourse(courseName){
		var that = this;
		console.log(courseName);
	}
	showAll(){
		var that = this;
		axios.get("http://localhost:3000/showAll")
			.then(resp => {
				console.log(resp);
				console.log(resp.data[0]);
				that.setState({
                    assignments: resp.data
				});
			})
			.catch(err => {
				console.log("Error: cannot retrieve assignments in showAll() ", err);
			});
	}
	render(){
		return(
			<div class="student-assignment-list-page">
				<div class="student-assignment-list-header">
					<h2>
						Assignment List 
					</h2> 
					<Link to='/'>
						<Button bsStyle="danger" onClick={()=>this.logOutUser()}>Log Out</Button>
					</Link>					
					<div class="labels">
						<h5>View Assignments</h5>
						<h5>Show Assignments by Courses</h5>
					</div> 
					<div class="space"></div>
				</div> 
				<div class="student-assignment-list-options">
					<FormControl
						type="text"
						placeholder="Enter Assignment Title"
						onChange={(e) => this.setState({assignmentTitle: e.target.value})}
					/>
					<Button bsStyle="success" onClick={()=>this.searchAssignmentByName(this.state.assignmentTitle)}>Search {' '}<Glyphicon glyph="search" /></Button>
					<StudentCourseList/>
					<Button bsStyle="success" onClick={()=>this.searchAssignmentByCourse(courseName)}>Search {' '}<Glyphicon glyph="search" /></Button>
					<Button bsStyle="success" onClick={()=>this.showAll()}>Show All {' '}<Glyphicon glyph="th" /></Button>
					{
						this.state.assignments.map((assignmentObj, i) => {
							return(
								<div key={i} class="list-item" onClick={()=>this.props.history.push('/assignment/'+assignmentObj.name)}>
									<div className="list-header">
										{assignmentObj.name}
									</div>
									{
										assignmentObj.description
									}
								</div>
							)
						})
					}
				</div> 
			</div> 
		);
	}
}