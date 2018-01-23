/**
 * Created by siyuanxu on 1/11/18.
 */
import React from "react";
import axios from "axios";
import { FormGroup, FormControl, ControlLabel, Button, Modal} from "react-bootstrap";
import { Redirect } from 'react-router-dom';
import '../assets/stylesheets/assignment.less'

export default class Assignment extends React.Component{
    constructor(props){
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            name: "",
            description: "",
            showModal: false,
            disputeDescription: "",
            username: "",
            realName: "",
            fireRedirect: false,
            courseID: ""
        }
    }
    // handles showing the modal
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
    // handles dispute submission
    handleSubmit(){
        var that = this;
        axios.get("http://localhost:3000/disputeSubmit", {
            params: {
                assignmentName: that.state.name,
                assignmentDescription: that.state.description,
                disputeDescription: that.state.disputeDescription,
                username: that.state.username,
                courseID: that.state.courseID
            }
        })
            .then(resp => {
                that.setState({
                    showModal: false
                });
                alert("Successfully Submitted Your Dispute!");
                document.getElementById("dispute-status").innerHTML = "Dispute Unresolved";
                document.getElementById("dispute-status").style.color = "red";
            })
            .catch(err => {
                alert("Failed to Submit Your Dispute.");
                console.log("ERROR: Cannot send dispute data to database from handleSubmit()", err);
            })
    }
    componentWillMount(){
        var that = this;
        axios.get("http://localhost:3000/assignment", {
            params: {
                name: this.props.match.params.name
            }
        })
            .then(resp => {
                that.setState({
                    name: resp.data[0].name,
                    description: resp.data[0].description,
                    username: that.props.match.params.username,
                    realName: that.props.match.params.realName,
                    courseID: that.props.match.params.courseID
                });
            })
            .catch(err => {
                console.log("ERROR: Cannot retrieve assignment from componentWillMount() ", err);
            });
    }
    render(){
        var that = this;
        return(
            <div class="assignment">
                <div class="assignment-wrapper">
                    <Button bsStyle="success"  class="button" onClick={() => {
                        this.setState({
                            fireRedirect: true
                        });
                    }}>
                        Go Back
                    </Button><br/>
                    <h2 id="dispute-status">No Dispute Submitted</h2>

                    {this.state.name}<br/>{this.state.description}<br/>
                    <Button bsStyle="success" class="button" onClick={() => this.handleShow()}>
                        Raise Dispute
                    </Button>
                    <Modal show={this.state.showModal} onHide={() => this.handleClose()}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Raise Dispute
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h5>What is your problem?</h5>
                            <FormGroup controlId="disputeTextArea">
                                <ControlLabel>Description</ControlLabel>
                                <FormControl componentClass="textarea" placeholder="Dispute Description" onChange={(e) => {
                                    this.setState({disputeDescription: e.target.value});
                                }}/>
                            </FormGroup>
                            <Button bsStyle="success" class="button" onClick={() => this.handleSubmit()}>Submit Dispute</Button>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button class="button" onClick={this.handleClose}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                    {
                        this.state.fireRedirect && (<Redirect to={{
                            pathname: '/studentAssignmentList',
                            state: {
                                username: this.state.username,
                                name: this.state.realName
                            }
                        }}/>)
                    }
                </div>
            </div>
        );
    }
}
