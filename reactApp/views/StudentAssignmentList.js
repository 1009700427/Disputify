import React from "react"; 
import ReactDOM from "react-dom";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FormGroup, FormControl, ControlLabel, Button, DropdownButton, MenuItem, Glyphicon} from "react-bootstrap"; 
import StudentCourseList from "../components/StudentCourseList";
const dbDriver = require("../../backend/database/dbDriver.js");
import '../assets/stylesheets/studentAssignmentList.less'
export default class StudentAssignmentList extends React.Component{
	constructor(props){
		super(props); 
		this.state = {
            assignmentTitle: '',
			viewAssignmentTitle: '',
            assignments: [],
			username: this.props.location.state.username,
			name: this.props.location.state.name,
			courseName: ""
		};
        this.handler = this.handler.bind(this);
	}
	handler(coursename) {
		this.setState({
			courseName: coursename
		});
	}
	logOutUser(){
		var that = this;
		axios.get("http://localhost:3000/logout", {
			params: {
				userType: "student"
			}
		})
			.then(resp => {
				console.log("Logged out");
			})
			.catch(err => {
				console.log("Error: Failed to logout");
			});
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
		axios.get("http://localhost:3000/searchAssignmentByCourse", {
			params: {
				courseName: courseName
			}
		})
			.then(resp => {
                that.setState({
					assignments: resp.data
				});
            })
			.catch(err => {
				console.log("Error: Cannot retrieve assignments in searchAssignmentByCourse(courseName)");
			});
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
					<div class="title">
						<h2>
							Welcome, {this.state.name}
							<Link to='/'>
								<Button class="button logout" bsStyle="danger" onClick={()=>this.logOutUser()}>Log Out</Button>
							</Link>
						</h2>
					</div>
					<div class="labels">
						<h5>Filter Assignments</h5>
						<h5>Show Assignments by Courses</h5>
					</div> 
					<div class="space"></div>
				</div> 
				<div class="student-assignment-list-options">
					<ControlLabel class="item">
						<FormControl
							type="text"
							placeholder="Enter Assignment Title"
							onChange={(e) => this.setState({assignmentTitle: e.target.value})}
							class="assignment-title-input"
						/>
					</ControlLabel>
					<Button class="button item short-button margin-button1" bsStyle="success" onClick={()=>this.searchAssignmentByName(this.state.assignmentTitle)}>Search {' '}<Glyphicon glyph="search" /></Button>
					<StudentCourseList class="item" handler={this.handler}/>
					<Button class="button item short-button margin-button2" bsStyle="success" onClick={()=>this.searchAssignmentByCourse(this.state.courseName)}>Search {' '}<Glyphicon glyph="search" /></Button><br/>
					<Button class="button item short-button" bsStyle="success" onClick={()=>this.showAll()}>Show All {' '}<Glyphicon glyph="th" /></Button><br/>
				</div>
				<div class="assignment-info">
                    {
                        this.state.assignments.map((assignmentObj, i) => {
                            console.log(this.state.name);
                            return(
								<div key={i} class="list-item" onClick={()=>{
                                    console.log(this.state.name);
                                    console.log('/assignment/'+assignmentObj.name+'/'+this.state.username+'/'+this.state.name+'/'+assignmentObj.courseID);
                                    this.props.history.push('/assignment/'+assignmentObj.name+'/'+this.state.username+'/1/'+this.state.name)
                                }}>
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