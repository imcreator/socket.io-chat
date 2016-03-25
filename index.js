var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var logged_users = [];

server.listen(80);

app.use('/css', express.static(__dirname + '/css'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
  app.use(express.static(__dirname + '/public'));
});

app.get('/chatroom', function (req, res) {
  res.sendFile(__dirname + '/chatroom.html');
});


io.on('connection', function (socket) {
  socket.on('login', function(data) {
    logged_users.push(data);
  	console.log(data + " is logged in!");
    io.sockets.emit('hi', data);  
  });

  socket.on('connect', function() {
    console.log('Socket connected!');
  })

  socket.on('disconnect', function() {
    console.log('Disconnected!');
  } )

  

  socket.on('send message', function( data ) {
  	var date = new Date();
  	console.log("[" + date + "] " +data.user + " :" + data.text);
  	io.emit('display chat', data);
  });
});

