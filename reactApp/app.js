import React from "react";
import ReactDOM from "react-dom";

import Login from "./views/Login.js";
import Register from "./views/Register.js";
import { HashRouter, Route, IndexRoute } from "react-router-dom"; 
import './assets/stylesheets/main.less';

const app = document.getElementById('root');

const router = (
  	<HashRouter history={history}>
  		<div>
			<Route path="/" exact component={Login}></Route> 
			<Route path="/register" exact component={Register}></Route> 
		</div>
	</HashRouter> 
);

ReactDOM.render(router, app);
