import React from "react"; 

export default class Layout extends React.Component{ 
	constructor(){
		super(); 
	}
	render(){
		return (
			<div class="navbar navbar-expand-lg navbar-light text-center" style="background-color: #e3f2fd;">
			<a class="navbar-brand center">Hello World!</a>
			</div>
		);
	}
}