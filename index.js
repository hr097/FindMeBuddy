const app = require("./express-app.js"); //express app
const {updateUserSocketConnectionID} = require("./code.js"); //code library
const dbConnect = require("./config/dbconnection.js");  //database


var user_app_socket_id = "";

const get_socket_id = ()=>{return user_app_socket_id;}

const socket = require("socket.io");     
const http = require('http');
const session=require("express-session"); 
var cookieParser = require('cookie-parser');     
const Filter = require("bad-words"); 
const dotenv = require("dotenv").config();           

const port = process.env.PORT || 5001;
const thirtyMinutes= 1800000;//milliseconds given
const server = http.createServer(app);
const io = socket(server);

//* SESSION


var sess = {
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    cookie:{maxAge: thirtyMinutes,sameSite:true,httpOnly:true},
    resave: false
}

if(app.get('env') === 'production') { //for development environment sessions security
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}
    
app.use(session(sess))
app.use(cookieParser());


//* SOCKET 

io.on("connection",(socket) => {

    user_app_socket_id = socket.id;

    console.log(`${socket.id} is connected !`);

    updateUserSocketConnectionID(username,socket.id);

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

    socket.on("sendMessage",(s_id,msg,callback) => {
        //const user = socket.id;
       
        //const filter = new Filter();
        
        // if(filter.isProfane(msg)){
        //     callback("Not Valid Input !");
        // }

        io.to(s_id).emit("message",`${s_id}  :  ${msg}`);
        callback();
    });

    socket.on('disconnect',(username,user_room_id) => {

        const user = socket.id;// need to remove so next time can't send message

        updateUserSocketConnectionID(username,"-");

        if(user){
            io.to(user_room_id).emit("message",`${username} is left !`);
        }
    });

});


//* SERVER STARTED
server.listen(port,(err) => {
    if(err)
    { 
         console.log(err);
         return err;
    }
    console.log(`Server is Listening on port ${port}`);
    dbConnect();
});

module.exports  = {get_socket_id}