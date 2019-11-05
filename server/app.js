var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const sendMessage = () => {
  setTimeout(() => {
    io.emit(
      'time',
      `${new Date()}`
    )
    sendMessage()
  }, 1000)
}

app.get('/client', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

//send a message time
sendMessage()

io.on('connection', function (socket) {
  console.log('a user connected');

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});