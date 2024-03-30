const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const cors = require('cors');

app.use(cors(
    {
        origin: '*'
    }
));

io.on('connection', socket => {
    console.log('a user connected');
    socket.on('recompile', (data) => {
        console.log(data);
        socket.broadcast.emit('recompile', data);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
})