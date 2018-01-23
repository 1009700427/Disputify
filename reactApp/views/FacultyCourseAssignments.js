/**
 * Created by siyuanxu on 1/15/18.
 */
import React from "react";

export default class FacultyCourseAssignments extends React.Component{
    constructor(){
        super();
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            name: "666",
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
    componentWillMount(){

    }
    render(){
        var that = this;
        return(
            <div class="course-assignments">
                {this.state.name}<br/>
            </div>
        );
    }
}