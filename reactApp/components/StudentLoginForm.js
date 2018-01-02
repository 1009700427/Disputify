import React from "react"; 
import ReactDOM from "react-dom"; 
import { FormGroup, FormControl, ControlLabel, Button} from "react-bootstrap"; 
import { Link } from 'react-router-dom';
import '../assets/stylesheets/login.less'
const dbDriver = require("../../backend/database/dbDriver.js");

export default class LoginForm extends React.Component{
	constructor(){
		super(); 
		this.state = {
			username: '', 
			password: ''
		}
	}
	// checks for submit 
	onSubmit(event){ 
		event.preventDefault();
		if(this.state.username==null || this.state.username=="" || this.state.password=="" || this.state.password==null){
			return false; 
		}
		// checks for user provided data 
		const loginData = ["student", this.state.username, this.state.password];
		console.log(loginData);
		if(dbDriver.checkUser(loginData)){
			return true; 
		}
		else{
			return false; 
		}
	}
	render(){
		return (
			<form onSubmit={(event) => this.onSubmit(event)}>
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
			    <Button type="submit" bsStyle="success">
			      Login
			    </Button>
			    <br/>
			    <Link to='/studentRegister'>
			    	<Button bsStyle="primary">
			    		Register
			    	</Button> 
			    </Link>
			    <br/>
			    <Link to='/'>
			    	<Button bsStyle="primary">
			    		Cancel
			    	</Button> 
			    </Link>
			</form> 
		);
	}
}