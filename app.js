var http = require('http');
var express = require('express');
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var ejs = require('ejs'); 
app.set('view engine', ejs); 


var db = require('./db').database();

var port = 8888;
app.use('/static', express.static('public'));

app.use(require('./router/router'));

var server = http.createServer(app);
global.io = require('socket.io').listen(server);

server.listen(port);
console.log('server is listining at'+ port);

// Handle connection
io.on('connection', function (socket) {
    console.log("Connected succesfully to the socket ...");
});
