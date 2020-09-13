const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();

const messages=[];
let users = [];

const server = app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
const io = socket(server);  

app.use(express.static(path.join(__dirname, '/client')));

app.get('/', (req, res) => {
  res.render('/client/index.html');
});

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);

  socket.on('join', (user) => {console.log('New person join with the id: ' + socket.id)
    users.push(user);
    socket.broadcast.emit('newUser', user);
  })
  socket.on('message', (message) => { console.log('Oh, I\'ve got something from ' + socket.id)
    messages.push(message);
    socket.broadcast.emit('message', message);
  });
  
  socket.on('disconnect', () => { console.log('Oh, socket ' + socket.id + ' has left') 
    users = users.filter(user => user.id === socket.id);
    const removeUser = users.find(user => user.id === socket.id);
    console.log('removeUser:', users);
    socket.broadcast.emit('removeUser', removeUser);
  });


});





