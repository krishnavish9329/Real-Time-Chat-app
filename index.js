const express=require('express');
const app=express();
const http=require('http').createServer(app);


http.listen(3000,()=>{
    console.log
    ("Listen on pport no."+3000);
});

app.use(express.static(__dirname+"/html"));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/html/index.html');
})

const io = require("socket.io")(http)

io.on("connection",(socket)=>{
    console.log("connected...");

    socket.on("message",(msg)=>{
        //console.log(msg);
        socket.broadcast.emit('message',msg);
    })
})

