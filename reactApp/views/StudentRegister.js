import React from "react"; 
import ReactDOM from "react-dom"; 
import { Link } from "react-router-dom"; 
import { FormGroup, FormControl, ControlLabel, Button} from "react-bootstrap"; 
const dbDriver = require("../../backend/database/dbDriver.js"); 

export default class StudentRegister extends React.Component{
	constructor(){
		super(); 
		this.state = {
			username: '',
			password: '',
			repeatPassword: '',
			name: ''
		}
	}

	onSubmit(event){
		event.preventDefault(); 
		if(this.state.password!=this.state.repeatPassword){
			console.log("password and repeatPassword are not equal!");
			return; 
		}
		if(this.state.username==null || this.state.username=="" 
			|| this.state.password=="" || this.state.password==null){
			return; 
		}
		const userData = {type: "student",username: this.state.username,password: this.state.password, name: this.state.name};
		
		dbDriver.addUser(userData);
	}

	render(){
		return(
			<div class="register-page">
				<div class="login-wrapper">
					<h2>Student Register</h2> 
					<form action="/" method="POST" onSubmit={(event) => this.onSubmit(event)}>
						<ControlLabel>Name <FormControl
							type="text"
							placeholder="Enter Name"
							onChange={(e) => this.setState({name: e.target.value})}
						/>
						</ControlLabel><br/>
						<ControlLabel>Username <FormControl
				            type="text"
				            placeholder="Enter Username"
				            value={this.state.username}
				            onChange={(e) => this.setState({username: e.target.value})}
				          />
		          		</ControlLabel><br/>
		          		<ControlLabel>
		          			Password <FormControl 
		          			type="password"
		          			placeholder="Enter Password"
		          			value={this.state.password}
		          			onChange={(e)=>this.setState({password: e.target.value})}
		          			/>
		          		</ControlLabel><br/>
		          		<ControlLabel>
		          			Password Again<FormControl 
		          			type="password"
		          			placeholder="Enter Password"
		          			value={this.state.repeatPassword}
		          			onChange={(e)=>this.setState({repeatPassword: e.target.value})}
		          			/>
		          		</ControlLabel>
		          		<br/>
					    <Button type="submit" bsStyle="success">
					      Register
					    </Button>
		          		<br/>
		          		<Link to='/studentLogin'>
					    	<Button bsStyle="primary">
					    		Cancel
					    	</Button> 
					    </Link>
		          		<br/>
					</form> 
				</div> 
			</div>
		);
	}
}