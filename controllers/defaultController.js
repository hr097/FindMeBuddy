//* DB MODEL
// const User = require("../models/userModel")

//* Node Libraries
const mongoose = require("mongoose");       
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");     
const { json } = require("body-parser"); 

// const request = require('request');      //for sms sending



//@desc backend and db working check
//@route GET /
//@access public
const defaultRouteRun = async (req,res) => {
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
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(results, null, 4));
};

module.exports = {defaultRouteRun};
