//* EXPRESS-APP
const app = require("./express-app.js");

//* DATABASE  & ENV
const dotenv = require("dotenv").config();
const dbConnect = require("./config/dbconnection.js");  //database

//* SESSION
// const session=require("express-session"); 
// var cookieParser = require('cookie-parser'); 
// const thirtyMinutes= 1800000;//milliseconds given

// var sess = {
//     secret: process.env.SESSION_SECRET,
//     saveUninitialized: true,
//     cookie:{maxAge: thirtyMinutes,sameSite:true,httpOnly:true},
//     resave: false
// }

// if(app.get('env') === 'production') { //for development environment sessions security
//     app.set('trust proxy', 1) // trust first proxy
//     sess.cookie.secure = true // serve secure cookies
// }
    
// app.use(session(sess))
// app.use(cookieParser());

//* SOCKET 
const socket = require("socket.io");     
const http = require('http');
// const Filter = require("bad-words"); 
const server = http.createServer(app);
const io = socket(server);

io.on("connection",(socket) => {

    console.log(`${socket.id} is connected !`);

    socket.on("request_to_connect",(username,s_s_i,rec_socket_id,callback) => {
        
        try
        {
        // socket.join(user_room_id);
        // socket.emit("message","Hey! Let's talk...");
        // socket.broadcast.to(user_room_id).emit("message",`${username} wants to interact !`);
        // socket.join(socket.id+rec_socket_id);
        //socket.emit("receive_message",`${username} Hey! Let's talk... !`);
        //socket.broadcast.to(user_room_id).emit("message",`${username} wants to interact !`);
        io.to(rec_socket_id).emit("request_received",s_s_i,`${username}  :  Hey! Wanna chat...`);
        }
        catch (err) {
            return callback("Unable to connect to user!");
        }
    });

    socket.on("request_decision",(username,rec_socket_id,message,callback) => {
        
        try
        {
        var room = socket.id+rec_socket_id;
        console.log(room);
        // socket.join(user_room_id);
        // socket.emit("message","Hey! Let's talk...");
        // socket.broadcast.to(user_room_id).emit("message",`${username} wants to interact !`);
        socket.join(room);
        socket.emit("receive_message",`${username} is coming!`);
        io.to(rec_socket_id).emit("request_accepted",room,`${username}  :  ${message} and please join ${room}`);
       // socket.broadcast.to(room).emit("request_accepted",`${username} wants to interact !`);
        
        }
        catch (err) {
            return callback("Unable to connect to user!");
        }
    });

    socket.on("accept_join",(username,room,callback) => {
        
        try
        {
        // var room = socket.id+rec_socket_id;
        // console.log(room);
        // socket.join(user_room_id);
        // socket.emit("message","Hey! Let's talk...");
        // socket.broadcast.to(user_room_id).emit("message",`${username} wants to interact !`);
        socket.join(room);
        socket.emit("receive_message",`${username} is coming!`);
        io.to(room).emit("receive_message",`both joined! connected`);
       // socket.broadcast.to(room).emit("request_accepted",`${username} wants to interact !`);
        
        }
        catch (err) {
            return callback("Unable to connect to user!");
        }
    });

    socket.on("send_message",(username,receiver_socket_id,msg,callback) => {
        try
        {
        //socket.join(receiver_socket_id);
        io.to(receiver_socket_id).emit("receive_message",`${username}  :  ${msg}`);
        }
        catch(err)
        {
            return callback("Unable to send message to user!");
        }
       
    });

    socket.on('disconnect',(callback) => {

        //const user = socket.id;// need to remove so next time can't send message
        console.log(`${socket.id} is disconnected ! =>`);
         //updateUserSocketConnectionID(username,"-");

        // if(user){
           //  io.to(socket.id).emit("receive_message",`${socket.id} is left !`);
        // }
    });

});


//* SERVER START
const port = process.env.PORT || 5001;
server.listen(port,(err) => {
    if(err)
    { 
         console.log(err);
         return err;
    }
    console.log(`Server is Listening on port ${port}`);
    dbConnect();
});
