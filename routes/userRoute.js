
const express = require("express")
const router = express.Router();

//* Controller
const {registerUser} = require("../controllers/userController.js")

//* Middleware
//const jwtVerify= require("../middlewares/validateTokenHandler.js");

router.route("/register").post(registerUser)

module.exports = router;