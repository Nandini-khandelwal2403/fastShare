// const { message } = require("statuses");

const socket = io.connect();

const roomID= "1234";
// location.pathname.substring(location.pathname.length-4);
console.log(roomID);
const username=prompt("Enter Username");
socket.emit("joinRoom",username,roomID);


socket.on("joinedRoom", () =>{
    console.log("Done");
})

// socket.on("sendToClient", (room) => {
//     console.log("Hello Buddy" + room);
// });

socket.on("message", abc => {
    console.log("Message of broadcast " + abc);
});