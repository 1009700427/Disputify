import React from "react";
import ReactDOM from "react-dom";

import AccountType from "./views/AccountType.js";
import StudentLogin from "./views/StudentLogin.js";
import FacultyLogin from "./views/FacultyLogin.js";
import FacultyRegister from "./views/FacultyRegister.js";
import StudentRegister from "./views/StudentRegister.js";
import { HashRouter, Route, IndexRoute } from "react-router-dom"; 
import './assets/stylesheets/main.less';

const app = document.getElementById('root');

const router = (
  	<HashRouter history={history}>
  		<div>
  			<Route path="/" exact component={AccountType}></Route> 
			<Route path="/studentLogin" exact component={StudentLogin}></Route> 
			<Route path="/studentRegister" exact component={StudentRegister}></Route> 
			<Route path="/facultyLogin" exact component={FacultyLogin}></Route> 
			<Route path="/facultyRegister" exact component={FacultyRegister}></Route> 
		</div>
	</HashRouter> 
);

ReactDOM.render(router, app);