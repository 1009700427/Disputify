import React from "react";
import ReactDOM from "react-dom";

import Login from "./views/Login.js";
import { HashRouter, Route, IndexRoute } from "react-router-dom"; 

const app = document.getElementById('root');

const router = (
  	<HashRouter history={history}>
		<Route path="/" component={Login}></Route> 
	</HashRouter> 
);


ReactDOM.render(router, app);
