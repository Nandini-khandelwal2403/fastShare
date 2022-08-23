const { Console } = require('console');
const express = require('express');
const app = express();
const http = require('http')
const socketio = require('socket.io')
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static(__dirname+'/public'))
const PORT=process.env.PORT||3005;

let roomPeers={};
io.sockets.on('connection',socket=>{
    socket.on("joinRoom",(username,roomID)=>{
        socket.join(roomID);
        console.log("joined Room");
        const roomSize=io.sockets.adapter.rooms.get(roomID).size;
        console.log(roomSize);
        io.to(roomID).emit("Total members in room "+roomSize);
        socket.emit("joinedRoom");
        socket.broadcast.to(roomID).emit("message", roomID);
        // console.log("broadcast error");
    })
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/views/home.html'); 
})


server.listen(PORT, () => {
    console.log(`Express app listening on PORT ${PORT}`);
})