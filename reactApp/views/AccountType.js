import React from "react"; 
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default class Login extends React.Component{
	constructor(){
		super(); 
	}
	render(){
		return(
			<div class="account-page">
				<div class="account-wrapper">
					<h2>Welcome to Disputify</h2>
					<Link to='/facultyLogin'>
						<Button bsStyle="success" class="button">
							Course Staff 
						</Button> 
					</Link> <br/>
					<Link to='/studentLogin'>
						<Button bsStyle="success" class="button">
							Student 
						</Button> 
					</Link> 
				</div> 
			</div> 
		)
	}
}