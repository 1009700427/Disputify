import React from "react"; 
import ReactDOM from "react-dom"; 
import { Link } from "react-router-dom"; 
import { FormGroup, FormControl, ControlLabel, Button} from "react-bootstrap"; 

export default class Login extends React.Component{
	constructor(){
		super(); 
	}
	render(){
		return(
			<div class="account-page">
				<div class="account-wrapper">
					<h2>Account Type</h2>
					<Link to='/facultyLogin'>
						<Button bsStyle="success">
							Course Staff 
						</Button> 
					</Link> 
					<Link to='/studentLogin'>
						<Button bsStyle="success">
							Student 
						</Button> 
					</Link> 
				</div> 
			</div> 
		)
	}
}