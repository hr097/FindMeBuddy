const express = require("express");
const path = require("path");
const mongoose = require("mongoose");  
const asyncHandler = require("express-async-handler");

const app = express();
app.use(express.json());


//* CONTROLLER
//@desc backend and db working check
//@route GET /
//@access public
const checkAppStatus = async (req,res) => {
    try {
        const connect = await mongoose.connect(process.env.CONN_MONGODB_URI);   
        
        results = 
        {
            title:'Find Me Buddy!',
            message:'Backend Services are working normally',
            db_status:true,
            db_message:"Database connected!",
            app_status:true
        };

    }catch(err){
        results = 
        {
            title:'Find Me Buddy!',
            message:'Backend Services are working normally',
            db_status:false,
            db_message:"Database not connected! \nError message =>"+err,
            app_status:false,
        };
        
    }
    res.setHeader("Content-Type",'application/json');
    res.end(JSON.stringify(results, null, 4));
};

const defaultRoute = express.static(path.join(__dirname,"./app"));


//* MIDDLEWARE
app.use(require("./middlewares/errorHandler.js")); //default application

//* ROUTES
app.use("/",defaultRoute);
app.use("/appstatus",checkAppStatus);
app.use("/user",require("./routes/userRoute.js"));

module.exports = app;