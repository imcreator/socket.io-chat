  var socket = io();
  
  function logIn(e) {
    e.preventDefault();
    var login = $('#inputLogin').val();
    socket.emit('login', login);
    sessionStorage.setItem('login', login);
    $('#login-box').fadeOut('fast');
    $('#spinner-wrapper').fadeIn(1500);
    setTimeout(function () {
       showChat();
     }, 2000);
  }

  function showChat() {
    $('#spinner-wrapper').fadeOut('fast');
    $('#logged-phase').fadeIn('slow');
  }

  function sendMessage(e) {
    e.preventDefault();
    var messageTime = getMessageDate(),
      user = sessionStorage.getItem('login');

    var content = $('#msg').val();
      output = '<span class="time blue">[' + messageTime +  ']</span><span class="user green"> ' +  user + ': </span><span class="message"> ' + content + ' </span>';
    socket.emit('send message', output);

    $('#messages').append('<li></li>');
  }

  function getMessageDate() {
    var date = new Date(),
      hour = date.getHours(),
      minutes = date.getMinutes(),
      seconds = date.getSeconds();

      if( hour < 10 ) 
        hour = "0" + hour;
      if( minutes < 10 ) 
        minutes = "0" + minutes;
      if( seconds < 10 ) {
        seconds = "0" + seconds;
      }

    return hour + ":" + minutes + ":" + seconds;
  }

$(document).ready(function() {
  $('#form').submit(logIn);
  $('#chatForm').submit(sendMessage);

  socket.on('update', function(info) {
    var information_container = $("#information");
    information_container.append("<li>" + info + "</li>");
  });

  socket.on('message', function(msg) {
    var messages = $("#messages");
    messages.append("<li>" + msg + "</li>");
  });

  socket.on('online', function( users ) {
    var online = $('#users_online');
    online.html('');
    online.append("<li>" + users + "</li>");
  });
});