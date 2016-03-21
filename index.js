var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var current_user

server.listen(80);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/chatroom', function (req, res) {
  res.sendFile(__dirname + '/chatroom.html');
});

io.on('connection', function (socket) {
  socket.on('login', function(data) {
  	console.log(data + " is logged in!");
  });

  socket.on('send message', function( data ) {
  	var date = new Date();
  	console.log("[" + date + "] " +data.user + " :" + data.text);
  	io.emit('display chat', data);
  });
});