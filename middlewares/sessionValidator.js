const User = require("../models/userModel")

const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { json } = require("body-parser")

const sessionValidator = asyncHandler( async(req,res,next) => {

    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if(authHeader && authHeader.startsWith("Bearer"))
    {
        token = authHeader.split(" ")[1];

        if(!token)
        {
            res.status(404);
            throw new Error("Please provide a verification token!");
        }

        jwt.verify(token,process.env.ACCESS_TOKEN_SECRENT,async(err,decoded)=>{

            if(err)
            {
                req.error = {
                    "status":401,
                    "message":"Unauthorized Token! Please provide an authorized token."
                }
            }
            else
            {
            
                const userAvailable = await User.findOne({ mobile:decoded.user.mobile })

                if(userAvailable.access_token != token)
                {
                    req.error = {
                        "status":403,
                        "message":"Session expired re-login again! OR multiple user logins detected !"
                    }
                }
                else
                {    
                    if(decoded.user.mobile)
                    {
                        req.mobile = decoded.user.mobile;
                    }

                    req.user_id = userAvailable._id.toString();
                }
            }
            next();
        })
    }
    else
    {
        res.status(404);
        throw new Error("Please provide a verification token!");
    }

});

module.exports = sessionValidator;