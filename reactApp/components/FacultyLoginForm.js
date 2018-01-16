import React from "react"; 
import ReactDOM from "react-dom"; 
import { FormGroup, FormControl, ControlLabel, Button} from "react-bootstrap"; 
import { Link, Redirect } from 'react-router-dom';
import '../assets/stylesheets/login.less'
const dbDriver = require("../../backend/database/dbDriver.js");

export default class LoginForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			username: '', 
			password: '',
			fireRedirect: false
		}
	}
	onSubmit(event){ 
		console.log("on submit");
		event.preventDefault();
		if(this.state.username==null || this.state.username=="" || this.state.password=="" || this.state.password==null){
			console.log("unll?");
			return false; 
		}
		// checks for user provided data 
		const loginData = ["faculty", this.state.username, this.state.password];
		var that = this;
		if(dbDriver.checkUser((result) => {
				if(result){
					that.setState({
						fireRedirect: true
					});
					console.log(that.props);
				}
				else {
                    alert("Incorrect Username or Password");
				}
			}))





		if(dbDriver.checkUser(loginData)){
			return true; 
		}
		else{
			alert("Incorrect Username or Password");
			return false; 
		}
	}
	render(){
		return (
			<form onSubmit={(event) => this.onSubmit(event)}>
				<FormGroup controlId="formBasicText">
				</FormGroup> 
				<ControlLabel>Username <FormControl
		            type="text"
		            placeholder="Enter Username"
		            onChange={(e) => this.setState({username: e.target.value})}
		          />
          		</ControlLabel><br/>
          		<ControlLabel>
          			Password <FormControl 
          			type="password"
          			placeholder="Enter Password"
          			onChange={(e) => this.setState({password: e.target.value})}
          			/>
          		</ControlLabel>
          		<br/>
			    <Button type="submit" bsStyle="success">
			      Login
			    </Button>
			    <br/>
			    <Link to='/facultyRegister'>
			    	<Button bsStyle="primary">
			    		Register
			    	</Button> 
			    </Link>
			    <br/>
			    <Link to='/'>
			    	<Button bsStyle="primary">
			    		Cancel
			    	</Button> 
			    </Link>
			    <div id="err-message">
			    </div>
                {
                    this.state.fireRedirect && (<Redirect to={{
                    	pathname: '/facultyCourseList',
						state: {username: this.state.username}
					}}/>)
					//this.state.fireRedirect && this.props.history.push('/facultyCourseList/'+this.state.username)
                }
			</form> 
		);
	}
}