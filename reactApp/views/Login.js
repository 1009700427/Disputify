import React from "react"; 
import ReactDOM from "react-dom"; 
import { Link } from "react-router-dom"; 
import LoginForm from "../components/LoginForm";
import '../assets/stylesheets/login.less'
export default class Login extends React.Component{ 
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
					<h2>Disputify</h2>
					<LoginForm/>
				</div> 
			</div> 
		)
	}
}