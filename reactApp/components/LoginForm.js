import React from "react"; 
import ReactDOM from "react-dom"; 
import { FormGroup, FormControl, ControlLabel, Button} from "react-bootstrap"; 
import { Link } from 'react-router-dom';
 
export default class LoginForm extends React.Component{
	constructor(){
		super(); 
	}
	render(){
		return (
			<form action='/login'>
				<FormGroup controlId="formBasicText">
				</FormGroup> 
				<ControlLabel>Username <FormControl
		            type="text"
		            placeholder="Enter Username"
		          />
          		</ControlLabel><br/>
          		<ControlLabel>
          			Password <FormControl 
          			type="password"
          			placeholder="Enter Password"
          			/>
          		</ControlLabel>
          		<br/>
			    <Button type="submit" bsStyle="success">
			      Login
			    </Button>
			    <br/>
			    <Link to='/#'>
			    	<Button bsStyle="primary">
			    		Register
			    	</Button> 
			    </Link>
			</form> 
		);
	}
}