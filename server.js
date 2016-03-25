var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var logged_users = [];

server.listen(80);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
  app.use(express.static(__dirname + '/public'));
});


io.on('connection', function (socket) {
  socket.on('login', function( name ) {
    var user_length;
    socket.name = name;
    logged_users.push({ name: name });
    user_length = logged_users.length;
  	console.log(name + " is logged in! Socket ID: " + socket.id );
    console.log("\n Users online: " + user_length);
    socket.emit('update', "You have connected to the server");
    io.sockets.emit("update", name + " is online.")
    io.sockets.emit("online", logged_users.length);
  });

  socket.on('send message', function( data ) {
  	io.sockets.emit('message', data);
  });

  socket.on('disconnect', function(){
    var disconnected_user;
    console.log( socket.name + ' has disconnected from the chat.' + socket.id);
    disconnected_user = findUser( socket.name);
    logged_users.pop(disconnected_user);
    console.log("\n Users online: " + logged_users.length);
    io.sockets.emit("online", logged_users.length);
  });

  socket.on('join', function( name ) {
    
    socket.name = name;
   
    console.log('Connected ' + socket.name + "!");
  })

});

function findUser( name ) {
  var i = 0;
  for( var user in logged_users ) {
    if( logged_users[user].name === name ) {
      break;
    }
    i++
  }
  return i;
}

