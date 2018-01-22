import React from "react"; 
import { Button, Navbar } from "react-bootstrap"; 
export default class Layout extends React.Component{ 
	constructor(){
		super(); 
	}
	render(){
		return (
				<div class="navbar navbar-expand-lg navbar-light text-center" styles="background-color: #e3f2fd;">
				<a class="navbar-brand center">Hello World!</a>
				<Button class="button" bsStyle="primary">Primary</Button>
				</div>
		);
	}
}