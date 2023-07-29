const express = require("express");
const path = require("path"); 

const app = express();
app.use(express.json());
const staticPath = path.join(__dirname,"./app"); // paths
app.use(express.static(staticPath));// middlewares


//* ROUTES
app.use("/",require("./routes/defaultRoute.js"));
app.use("/user",require("./routes/userRoute.js"));


//* MIDDLEWARE
app.use(require("./middlewares/errorHandler.js")); //default application


module.exports = app;