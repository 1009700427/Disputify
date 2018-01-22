import React from "react";
import axios from 'axios';
import ReactDOM from "react-dom"; 
import { FormGroup, FormControl, ControlLabel, Button} from "react-bootstrap"; 
import { Link, Redirect } from 'react-router-dom';
import '../assets/stylesheets/login.less'
const dbDriver = require("../../backend/database/dbDriver.js");
const mysql = require('mysql');
const config = {
	host: 'localhost', 
	user: 'root', 
	password: 'abc', 
	database: 'DisputifyDB'
}
export default class LoginForm extends React.Component{
	constructor(){
		super(); 
		this.state = {
			username: '', 
			password: '',
			name: '',
			fireRedirect: false
		}
	}
	// checks for submit 
	onSubmit(event){ 
		event.preventDefault();
		this.state.fireRedirect = false; 
		var that = this; 
		if(this.state.username==null || this.state.username=="" || this.state.password=="" || this.state.password==null){
			return false; 
		}
		// checks for user provided data 
		const data = ["student", this.state.username, this.state.password];
		// sets up connection 
		var connection = mysql.createConnection(config);
		connection.connect();
		console.log(data);
		connection.query("SELECT * FROM DisputifyDB.User WHERE type=? AND username=? AND password=?", data, function(error, results, fields){
			console.log(connection.sql);
			if(error){
				throw error; 
			}
			if(results.length==0){
				connection.end();
				console.log("return false!");
				alert("Incorrect Username or Password"); 
				return;
			}
			connection.end(); 
			console.log("return true!");
			that.setState({name: results[0].name});
			that.setState({fireRedirect: true});
			console.log("state: "+that.state.fireRedirect);
		});
	}
	render(){
		const { fireRedirect } = this.state; 
		return (
			<div> 
				<form method="POST" onSubmit={(event) => this.onSubmit(event)}>
					<FormGroup controlId="formBasicText">
					</FormGroup>
					<ControlLabel>Username <FormControl
			            type="text"
			            placeholder="Enter Username"
			            onChange={(e) => this.setState({username: e.target.value})}
			          />
	          		</ControlLabel><br/>
	          		<ControlLabel>
	          			Password <FormControl 
	          			type="password"
	          			placeholder="Enter Password"
	          			onChange={(e) => this.setState({password: e.target.value})}
	          			/>
	          		</ControlLabel>
	          		<br/>
				    <Button class="button" type="submit" bsStyle="success">
				      Login
				    </Button>
				    <br/>
				    <Link to='/studentRegister'>
				    	<Button class="button" bsStyle="primary">
				    		Register
				    	</Button> 
				    </Link>
				    <br/>
				    <Link to='/'>
				    	<Button class="button" bsStyle="primary">
				    		Cancel
				    	</Button> 
				    </Link>
				    <div id="err-message">
				    </div>
				</form> 
				{
					fireRedirect && (<Redirect to={{
						pathname: '/studentAssignmentList',
						state: {
							username: this.state.username,
							name: this.state.name
						}
					}}/>)
				}
			</div> 
		);
	}
}