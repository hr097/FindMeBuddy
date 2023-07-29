const {get_socket_id} = require("./index.js");
const express = require("express")
const router = express.Router();

//* CONTROLLER
const {defaultRouteRun} = require("../controllers/defaultController.js")
//,register_otpGeneration,login_otpGeneration,otpVerification

//* MIDDLEWARE
// const jwtVerify= require("../middlewares/validateTokenHandler.js");


//* DEFAULT ROUTE

const s_id = get_socket_id();

//* FUNCTIONS
const results = {
    message:'Socket_id acknowledged!',
    app_status:true,
    "socket_id":s_id
}; 

const sessionAcknowledged = (req,res)=>{
    res.send(JSON.stringify(results, null, 4));
}

router.route("/socketid").get(sessionAcknowledged).post(sessionAcknowledged);

router.route("/appstatus").get(defaultRouteRun).post(defaultRouteRun);

//* BASIC USER AUTHENTICATION

// router.route("/register_otpgeneration").post(register_otpGeneration);
// router.route("/login_otpgeneration").post(login_otpGeneration);
// router.route("/otpverification").post(jwtVerify,otpVerification);


module.exports = router;