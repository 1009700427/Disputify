/**
 * Created by siyuanxu on 1/15/18.
 */
import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FormGroup, FormControl, ControlLabel, Button, DropdownButton, MenuItem, Glyphicon} from "react-bootstrap";
import FacultyCourses from "../components/FacultyCourses.js";
export default class FacultyCourseList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            courseTitle: "",
            courses: [],
            assignments: [],
            facultyUsername: this.props.location.state.username,
            name: this.props.location.state.name
        }
    }
    logOutUser(){

    }
    searchCourseByName(title){

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
    showAll(){
        var that = this;
        axios.get("http://localhost:3000/showAllCourses")
            .then(resp => {
                console.log(resp);
                console.log(resp.data[0]);
                that.setState({
                    courses: resp.data
                });
            })
            .catch(err => {
                console.log("Error: cannot retrieve assignments in showAll() ", err);
            });
    }
    render(){
        return(
            <div class="faculty-course-list-page">
                <div class="faculty-course-list-header">
                    <h2>Welcome, {this.state.name}</h2>
                    <Link to='/'>
                        <Button bsStyle="danger" onClick={()=>this.logOutUser()}>Log Out</Button>
                    </Link>
                    <div class="labels">
                        <h5>Filter Courses</h5>
                        <h5>Show Assignments by Courses</h5>
                        <div class="space"></div>
                    </div>
                    <div class="faculty-course-list-options">
                        <FormControl
                            type="text"
                            placeholder="Enter Course Title"
                            onChange={(e) => this.setState({courseTitle: e.target.value})}
                        />
                        <Button bsStyle="success" onClick={()=>this.searchCourseByName(this.state.courseTitle)}>Search {' '}<Glyphicon glyph="search" /></Button>
                        <FacultyCourses/>
                        <Button bsStyle="success" onClick={()=>this.searchAssignmentByCourse(courseName)}>Search {' '}<Glyphicon glyph="search" /></Button>
                        <Button bsStyle="success" onClick={()=>this.showAll()}>Show All {' '}<Glyphicon glyph="th" /></Button>
                        {
                            this.state.courses.map((courseObj, i) => {
                                return(
                                    <div key={i} class="list-item" onClick={()=>this.props.history.push('/course/'+courseObj.name)}>
                                        <div className="list-header">
                                            {courseObj.name}
                                        </div>
                                        {
                                            courseObj.description
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}