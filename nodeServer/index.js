const cors = require('cors');
const httpServer = require('http').createServer();

const io = require("socket.io")(8000,{
     cors: { origin: '*' } 
});

/*
httpServer.listen(8000,()=>{
    console.log("Listening to port ");
});
*/
const users= {};


io.on('connection', (socket)=>{
    console.log(socket.id);
    //socket.emit('new-user-joined',"Gopi");

    socket.on('new-user-joined',(name)=>{
        console.log("name :", name);
        users[socket.id] = name;

        socket.broadcast.emit('user-joined',name);
        
    });

    socket.on('send',(message)=>{
        console.log(message);
        socket.broadcast.emit('receive', {message: message, name:users[socket.id] } );
    });

    socket.on('disconnect',(message)=>{
        console.log(message);
        socket.broadcast.emit('left',(users[socket.id]));
        delete users[socket.id];
    });

});




