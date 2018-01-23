/**
 * Created by siyuanxu on 1/15/18.
 */
import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FormGroup, FormControl, ControlLabel, Button, DropdownButton, MenuItem, Glyphicon, Modal, OverlayTrigger, Popover} from "react-bootstrap";
import FacultyCourses from "../components/FacultyCourses.js";
import StudentCourseList from "../components/StudentCourseList.js";
import '../assets/stylesheets/facultyCourseList.less';

export default class FacultyCourseList extends React.Component{
    constructor(props){
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            courseTitle: "",
            courses: [],
            assignments: [],
            facultyUsername: this.props.location.state.username,
            name: this.props.location.state.name,
            showModal: false,
            courseName: "",
            currentCourseName: "",
            disputeList: [],
            currentCourseName: "",
            disputePopover: (
                <Popover>
                    <strong>Click to Indicate Resolve/Unresolve!</strong>
                </Popover>
            )
        };
        this.handler = this.handler.bind(this);

    }
    // handles showing the moda
    handleShow(){
        this.setState({
            showModal: true
        });
    }
    // handles hiding the modal
    handleClose(){
        this.setState({
            showModal: false
        });
    }
    logOutUser(){

    }
    searchCourseByName(title){
        var that = this;
        axios.get("http://localhost:3000/searchCourseByName", {
            params: {
                courseName: title
            }
        })
            .then(resp => {
                that.setState({
                    courses: resp.data
                });
            })
            .catch(err => {
                console.log("Error: Cannot retrieve courses in searchCourseByName(title)");
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
    getDisputes(courseName, callback){
        var that = this;
        axios.get("http://localhost:3000/getDisputes", {
            params: {
                courseName: courseName
            }
        })
            .then(resp => {
                that.setState({
                    disputeList: resp.data,
                    currentCourseName: courseName
                });
                callback && callback();
            })
            .catch(err => {
                console.log("Error: cannot retrieve disputes in getDisputes(courseName)", err);
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
                    courses: resp.data
                });
            })
            .catch(err => {
                console.log("Error: Cannot retrieve assignments in searchAssignmentByCourse(courseName)", err);
            });
    }
    handler(coursename) {
        this.setState({
            courseName: coursename
        });
    }
    handleResolve(disputeID, status){
        var that = this;
        axios.get("http://localhost:3000/handleResolve", {
            params: {
                disputeID: disputeID,
                currentCourseName: that.state.currentCourseName,
                currentResolveStatus: status
            }
        })
            .then(resp => {
                that.setState({
                    disputeList: resp.data
                });
            })
            .catch(err => {
                console.log("Error: Cannot retrieve updated dispute list", err);
            });
    }
    render(){
        return(
            <div class="faculty-course-list-page">
                <div class="faculty-course-list-header">
                    <div class="title">
                        <h2>Welcome, {this.state.name}
                            <Link to='/'>
                                <Button bsStyle="danger" class="button logout" onClick={()=>this.logOutUser()}>Log Out</Button>
                            </Link>
                        </h2>
                    </div>
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
                            class="item"
                        />
                        <Button class="button short-button margin-button1 item" bsStyle="success" onClick={()=>this.searchCourseByName(this.state.courseTitle)}>Search {' '}<Glyphicon glyph="search" /></Button>
                        <StudentCourseList handler={this.handler}/>
                        <Button class="button short-button margin-button2 item" bsStyle="success" onClick={()=>this.searchAssignmentByCourse(this.state.courseName)}>Search {' '}<Glyphicon glyph="search" /></Button><br/>
                        <Button class="button short-button item" bsStyle="success" onClick={()=>this.showAll()}>Show All {' '}<Glyphicon glyph="th" /></Button>
                    </div>
                    <div class="info">
                        {
                            this.state.courses.map((courseObj, i) => {
                                return(
                                    <div key={i} class="list-item" onClick={() => {
                                        this.setState({
                                            currentCourseName: courseObj.name
                                        });
                                        var that = this;
                                        this.getDisputes(courseObj.name, ()=>that.handleShow());
                                    }}>
                                        <div className="list-header">
                                            <span> {courseObj.name} </span>
                                        </div>
                                        <span>
                                        {
                                            courseObj.description
                                        }
                                        </span>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <Modal show={this.state.showModal} onHide={() => this.handleClose()}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                {this.state.currentCourseName} Disputes
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {
                                this.state.disputeList.map((disputeObj, i) => {
                                    return (
                                        <div key={i} class="dispute-item">
                                            <div class="dispute-header">
                                                From {disputeObj.name}:
                                            </div>
                                            <div class="dispute-description">
                                                {disputeObj.description}
                                            </div>
                                            <OverlayTrigger trigger="hover" placement="right" overlay={this.state.disputePopover}>
                                                <Button class="button" onClick={() => this.handleResolve(disputeObj.disputeID, disputeObj.status)}>{disputeObj.status}</Button>
                                            </OverlayTrigger>
                                        </div>
                                    )
                                })
                            }
                        </Modal.Body>
                        <Modal.Footer>
                            <Button class="button" onClick={this.handleClose}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        );
    }
}