const express = require('express')
const app = express();
const http = require('http');
const server = http.createServer(app); //Express app는 HTTP 서버에 제공할 수 있는 기능 핸들러로 초기화
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html'); //__dirname - node에서 제공하는 node 파일의 경로를 담고 있는 변수
})

io.on('connection', socket => {
    console.log('user connected');
    socket.on('chat message', (message) => {
        console.log(`message: ${message}`)
    })
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});


io.emit('some event', {
    someProperty: 'some value',
    otherProperty: 'other value'
});

server.listen(3000, () => {
    console.log('listening on *:3000');
})

