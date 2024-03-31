const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: true,
});

io.on('connection', (socket) => {
    socket.on('join', (roomId) => {
        socket.join(roomId);
    })
    socket.on('html', (value, roomId) => {
        socket.broadcast.to(roomId).emit('html', value);
    })
    socket.on('css', (value, roomId) => {
        socket.broadcast.to(roomId).emit('css', value);
    })
    socket.on('js', (value, roomId) => {
        socket.broadcast.to(roomId).emit('js', value);
    })
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
})