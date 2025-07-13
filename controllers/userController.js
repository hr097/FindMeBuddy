const User = require("../models/userModel")

// const mongoose = require("mongoose");        
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");     
const { json } = require("body-parser"); 

// const ObjectId = mongoose.Types.ObjectId;

//@desc register a user
//@route POST www.domain.com/user/register
//@access public
const registerUser = asyncHandler(async (req,res) => {

    if(req.error)
    {    
        const e_msg = req.error.message;
        res.status(200).json(
        {
            "message":e_msg,
            "app_status":false 
        });
    }
    
     const{name,dob,gender,mobile,email}= req.body;
     
     if(!mobile || !name || !email || !gender || !dob)
     {   
        res.status(200).json(
        {
            "message":"All fields are required. Please ensure that all fields are filled out correctly." ,
            "app_status":false
        });
     }

    let userAvailable = await User.findOne({ mobile })
    if(userAvailable)
    {   
        res.status(200).json(
        {
            "message":"Phone number already registered. Please enter different number.",
            "app_status":false 
        });
    }

    userAvailable = await User.findOne({ email })
    if(userAvailable)
    {  
        res.status(200).json(
        {
            "message":"The email address you provided is already in use. Please try a different email address.",
            "app_status":false 
        });
    }
    // const accessToken = jwt.sign(
    //     {
    //        user:{
    //            mobile,
    //        }
    //     },
    // process.env.ACCESS_TOKEN_SECRENT,
    // { expiresIn: "7d"})

    const newUser = await User.create({
         name,
         dob:new Date(dob),
         gender,
         mobile,
         email,
         access_token:"-"
    });

    if (newUser) {
        //res.setHeader("Authorization",accessToken)
        const result = {
             name:newUser.name,
             mobile:newUser.mobile,
             message: "You are registered successfully.Please login on Find Me Buddy!",
             app_status:true   
         }
         res.status(200).json(result); 
     } else {
         res.status(200).json(
            {
                message:"Unable to register user! Please try again later.",
                app_status:false 
            });
     }
});


module.exports = {registerUser};