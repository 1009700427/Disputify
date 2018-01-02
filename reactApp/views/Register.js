import React from "react"; 
import ReactDOM from "react-dom"; 
import { Link } from "react-router-dom"; 
import { FormGroup, FormControl, ControlLabel, Button} from "react-bootstrap"; 

export default class Register extends React.Component{
	constructor(){
		super(); 
		this.state = {
			username: '',
			password: '',
			repeatPassword: ''
		}
	}

	onSubmit(event){
		event.preventDefault(); 
		if(password!=repeatPassword){
			console.log("password and repeatPassword are not equal!");
			return; 
		}

	}

	render(){
		return(
			<div class="register-page">
				<div class="login-wrapper">
					<h2>Register</h2> 
					<form action="/" method="POST" onSubmit={(event) => this.onSubmit(event)}>
						<ControlLabel>Username <FormControl
				            type="text"
				            placeholder="Enter Username"
				            value={this.state.username}
				            onChange={(event) => this.setState(username: e.target.value)}
				          />
		          		</ControlLabel><br/>
		          		<ControlLabel>
		          			Password <FormControl 
		          			type="password"
		          			placeholder="Enter Password"
		          			value={this.state.password}
		          			onChange={(event)=>this.setState(password: e.target.value)}
		          			/>
		          		</ControlLabel><br/>
		          		<ControlLabel>
		          			Password Again<FormControl 
		          			type="password"
		          			placeholder="Enter Password"
		          			value={this.state.repeatPassword}
		          			onChange={(event)=>this.setState(repeatPassword: e.target.value)}
		          			/>
		          		</ControlLabel>
		          		<br/>
					    <Button type="submit" bsStyle="success">
					      Register
					    </Button>
		          		<br/>
		          		<Link to='/'>
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