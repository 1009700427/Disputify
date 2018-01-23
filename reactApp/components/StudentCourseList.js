import React from "react"; 
import { DropdownButton, MenuItem } from "react-bootstrap";
const dbDriver = require("../../backend/database/dbDriver.js");
const mysql = require('mysql');
const config = {
	host: 'localhost', 
	user: 'root', 
	password: 'abc', 
	database: 'DisputifyDB'
}
export default class StudentCourseList extends React.Component{
	constructor(props){
		super(props);
		var that = this;
		this.state = {
			courseList: [""],
            // dropdownTitle: (<Glyphicon glyph="user" title="Dropdown"/>),
            dropdownTitle: "",
			finalResult: null,
			fireReturn: false
		};
        var connection = mysql.createConnection(config);
        connection.connect();
        var that = this;
        dbDriver.getCourses((result) => {
            that.setState({finalResult: result,
				fireReturn: true,
				dropdownTitle: result[0].name});
            this.props.handler(result[0].name);
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
		this.props.handler(val);
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
