const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/mesages');
const { getCurrentUser, userJoin } = require('./utils/users')

const app = express();
const server = http.createServer(app)
const io = socketio(server);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'ChatCord Bot'

// Run when client connects
io.on('connection', socket => {
    socket.on('joinRoom', ({username, room}) => {
        const user = userJoin(socket.id, username, room);
        
        socket.join(user.room)
        
        // Welcome Current User
        socket.emit('message', formatMessage(botName, 'Welcome to ChatCord'));
    
        // Broadcast when a user connects
        socket.broadcast
            .to(user.room)
            .emit('message', formatMessage(botName, `${user.username} has joined the chat`));
    })
    

    //listen for chatMessage
    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message', formatMessage(user.username, msg));
    })

    // Broadcast when a user disconnects
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(botName, 'A user has left the chat'));
    })
})

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {console.log(`Server Running on port ${PORT}`)});