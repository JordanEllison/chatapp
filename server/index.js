const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const { addUser, removeUser, getUser, getUsersInRoom, users } = require('./users')

const PORT = process.env.PORT || 5000;

const router = require('./router');
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// on a new socket.io connection:
io.on('connection', (socket) => {
    console.log('a user connected!');
    socket.on('join' , ({ name, room }, callback) => {
        console.log(`welcome to ${room}, ${name}!`);
        const { error, user } = addUser({ id: socket.id, name, room });

        if(error) return callback(error); // error handling if duplicate user

        // emits message to current user welcoming them to chat
        socket.emit('message', { user: 'server', text: `${user.name}, welcome to ${user.room}`});
        // emits message to all other users announcing that someone entered the chat
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined.`});
        
        socket.join(user.room);
        console.log(users);

        callback();
    });
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        console.log(user.name);

        io.to(user.room).emit('message', { user: user.name, text: message });

        callback();
    });
    socket.on('disconnect', () => {
        console.log('a user disconnected!');
    });
});

app.use(router);
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));