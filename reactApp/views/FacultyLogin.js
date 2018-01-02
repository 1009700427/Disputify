import React from "react"; 
import ReactDOM from "react-dom"; 
import { Link } from "react-router-dom"; 
import FacultyLoginForm from "../components/FacultyLoginForm";
import '../assets/stylesheets/login.less'
export default class FacultyLogin extends React.Component{ 
	constructor(){
		super(); 
		this.state = {
			username: '', 
			password: ''
		}
	}
	render(){
		return (
			<div class="login-page">
				<div class="login-wrapper">
					<img src={require("../img/icon.png")}/>
					<h2>Course Staff</h2>
					<FacultyLoginForm/>
				</div> 
			</div> 
		)
	}
}