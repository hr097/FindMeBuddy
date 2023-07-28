const express = require("express");
const path = require("path"); 

const socket = require("socket.io");
const mongoose = require("mongoose");       
const http = require('http');
const Filter = require("bad-words");                   
const dotenv = require("dotenv").config();           
const dbConnect = require("./config/dbconnection.js"); 

const port = process.env.PORT || 1008;

const app = express();
app.use(express.json());
const staticPath = path.join(__dirname,"./app"); // paths
app.use(express.static(staticPath));// middlewares

const server = http.createServer(app);
const io = socket(server);

app.use("/appstatus",async (req,res)=>{
    try {
        const connect = await mongoose.connect(process.env.CONN_MONGODB_URI);    
        results = 
        {
            title:'FindMeBuddy',
            message:'Backend Services are working normally',
            db_status:true,
            db_message:"Database connected!",
            app_status:true
        };

    }catch(err){
        results = 
        {
            title:'FindMeBuddy',
            message:'Backend Services are working normally',
            db_status:false,
            db_message:"Database not connected! \nError message =>"+err,
            app_status:false,
        };
        
    }
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(results, null, 4));
}); 

io.on("connection",(socket) => {
    console.log("connected !");

    socket.on("join",(username,user_room_id,callback) => {
        
        //const {error,user} = addUser({id:socket.id,username,room});

        if(error){
           return callback(error);
        }

        socket.join(user_room_id);
        socket.emit("message","Hey! Let's talk...");
        socket.broadcast.to(user_room_id).emit("message",`${username} wants to interact !`);
        
        // io.to(user.room).emit("getAlllUser",{
        //     room:user.room,
        //     users:getUserInRoom(user.room)
        // });
    });

    socket.on("sendMessage",(username,user_room_id,msg,callback) => {
        const user = getUser(socket.id);

        //const filter = new Filter();
        
        // if(filter.isProfane(msg)){
        //     callback("Not Valid Input !");
        // }

        io.to(user_room_id).emit("message",`username:${msg}`);
        callback();
    });

    socket.on('disconnect',(username,user_room_id,) => {
        const user = socket.id;// need to remove so next time can't send message
        
        if(user){
            io.to(user_room_id).emit("message",`${username} is left !`);
        }
    });

});

server.listen(port,(err) => {
    if(err)
    { 
         console.log(err);
         return err;
    }
    console.log(`Server is Listening on port ${port}`);
    dbConnect();
});
    



