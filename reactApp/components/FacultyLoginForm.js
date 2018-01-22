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
			fireRedirect: false,
			name: ''
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
		if(dbDriver.checkUser(loginData, (result, arr) => {
				if(result){
					that.setState({
						name: arr[0].name,
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
			    <Button class="button" type="submit" bsStyle="success">
			      Login
			    </Button>
			    <br/>
			    <Link to='/facultyRegister'>
			    	<Button class="button" bsStyle="primary">
			    		Register
			    	</Button> 
			    </Link>
			    <br/>
			    <Link to='/'>
			    	<Button class="button" bsStyle="primary">
			    		Cancel
			    	</Button> 
			    </Link>
			    <div id="err-message">
			    </div>
                {
                    this.state.fireRedirect && (<Redirect to={{
                    	pathname: '/facultyCourseList',
						state: {
                    		username: this.state.username,
							name: this.state.name
						}
					}}/>)
                }
			</form> 
		);
	}
}