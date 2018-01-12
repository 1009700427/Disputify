/**
 * Created by siyuanxu on 1/11/18.
 */
import React from "react";
import axios from "axios";
import { FormGroup, FormControl, ControlLabel, Button, Modal} from "react-bootstrap";

import ReactDOM from "react-dom";

export default class Assignment extends React.Component{
    constructor(){
        super();
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            name: "",
            description: "",
            showModal: false,
            disputeDescription: ""
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
                disputeDescription: that.state.disputeDescription
            }
        })
            .then(resp => {
                that.setState({
                    showModal: false
                });
                alert("Successfully Submitted Your Dispute!");
            })
            .catch(err => {
                alert("Failed to Submit Your Dispute.");
                console.log("ERROR: Cannot send dispute data to database from handleSubmit()", err);
            })
    }
    componentWillMount(){
        console.log(this.props);
        console.log(this.props.match.params.name);
        var that = this;
        axios.get("http://localhost:3000/assignment", {
            params: {
                name: this.props.match.params.name
            }
        })
            .then(resp => {
                console.log(resp);
                that.setState({
                    name: resp.data[0].name,
                    description: resp.data[0].description
                });
            })
            .catch(err => {
                console.log("ERROR: Cannot retrieve assignment from componentWillMount() ", err);
            });
    }
    render(){
        console.log(this.props);
        var that = this;
        return(
            <div class="Assignment">
                {this.state.name}<br/>{this.state.description}
                <Button bsStyle="success" onClick={() => this.handleShow()}>
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
                        <Button bsStyle="success" onClick={() => this.handleSubmit()}>Submit Dispute</Button>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}