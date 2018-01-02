import React from "react"; 
import ReactDOM from "react-dom"; 
import { Link } from "react-router-dom"; 
import StudentLoginForm from "../components/StudentLoginForm";
import '../assets/stylesheets/login.less'
export default class StudentLogin extends React.Component{ 
	constructor(){
		super(); 
		this.state = {
			username: '', 
			password: ''
		}
	}

	onSubmit(event){ 

	}

	render(){
		return (
			<div class="login-page">
				<div class="login-wrapper">
					<img src={require("../img/icon.png")}/>
					<h2>Student</h2>
					<StudentLoginForm/>
				</div> 
			</div> 
		)
	}
}