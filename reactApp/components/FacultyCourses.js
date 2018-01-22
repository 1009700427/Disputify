/**
 * Created by siyuanxu on 1/15/18.
 */
import React from "react";
import ReactDOM from "react-dom";
import { Link } from 'react-router-dom';
import { FormGroup, FormControl, ControlLabel, Button, DropdownButton, MenuItem, Glyphicon} from "react-bootstrap";
const dbDriver = require("../../backend/database/dbDriver.js");
export default class StudentCourseList extends React.Component{
    constructor(){
        super();
        var that = this;
        this.state = {
            courseList: [""],
            dropdownTitle: "",
            finalResult: null,
            fireReturn: false
        }
    }
    componentWillMount(){
        var that = this;
        dbDriver.getFacultyCourses((result) => {
            that.setState({finalResult: result,
                fireReturn: true,
                dropdownTitle: result[0].name});
            console.log(result);
        });
    }
    getCourses(title, i){
        return (
            <MenuItem eventKey={i} key={i}>
                {title.name}
            </MenuItem>
        );
    }
    handleSelect(e){
    		var val = this.state.finalResult[e].name;
        this.setState({
            dropdownTitle: val
        });
        console.log(e);
    }
    render(){
        var that = this;
        return(
            <div class="dropdown">
                {
                    this.state.fireReturn &&
                    <DropdownButton class="button" title={this.state.dropdownTitle} key={1}
                                    id="courseDropdown"
                                    onSelect={(e) => this.handleSelect(e)}>{JSON.parse(JSON.stringify(this.state.finalResult)).map(that.getCourses)}
                    </DropdownButton>
                }
            </div>
        );
    }
}
