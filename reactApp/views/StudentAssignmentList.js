import React from "react";
import axios from 'axios';
import { Link, Redirect} from 'react-router-dom';
import { FormControl, ControlLabel, Button, Glyphicon} from "react-bootstrap";
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
		axios.get("http://localhost:3000/searchAssignment", {
			params: {
                assignmentTitle: assignmentName
            }
		})
			.then(resp => {
				that.setState({
					assignments: resp.data
				});
			})
			.catch(err => {
				console.log("Error: cannot retrieve assignments in searchAssignment(assignmentName) ", err);
			});
	}
	searchAssignmentByCourse(courseName){
		var that = this;
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
                            return(
								<div key={i} class="list-item" onClick={()=>{
									this.setState({
										fireRedirect: true,
										objName: assignmentObj.name,
										objCourseID: assignmentObj.courseID
									});
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
				{
					this.state.fireRedirect && (<Redirect to={{pathname: '/assignment/'+this.state.objName+'/'+this.state.username+'/'+this.state.name+'/'+this.state.objCourseID}}></Redirect>)
                }
			</div> 
		);
	}
}