const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { json } = require("body-parser")

const validateToken = asyncHandler( async(req,res,next) => {
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
                    "message":"Please provide a authorised verification token!"
                }
            }
            else
            {
                if(decoded.user.mobile)
                {
                    req.mobile = decoded.user.mobile;
                }
                if(decoded.user.otp)
                {
                    req.true_otp = decoded.user.otp;
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


module.exports = validateToken;