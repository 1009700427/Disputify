const express = require('express');
// adds app 
const app = express(); 
// now gets the http 
const http = require('http').Server(app);
var io = require('socket.io')(http);

// listens to port 3000 
http.listen(3000, function(){
	console.log("Express app listening on port 3000.");
});