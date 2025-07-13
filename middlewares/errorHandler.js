const {constants} = require("../config/errorcodes_constant.js")
const { json } = require("body-parser"); 

const errorHandler = (err,req,res,next) =>{
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title: "Validation Failed",
                message: err.message, 
                stackTrace: err.stack
            });
            break;
        case constants.UNAUTHORIZED:
            res.json({
                title: "Unauthorized Error",
                message: err.message, 
                stackTrace: err.stack
            });
            break;
        case constants.FORBIDDEN:
            res.json({
                title: "Forbidden Error",
                message: err.message, 
                stackTrace: err.stack
            });
            break;
        case constants.NOT_FOUND:
            res.json({
                title: "Not Found",
                message: err.message, 
                stackTrace: err.stack
            });
            break;
        case constants.SERVER_ERROR:
            res.json({
                title: "Server Error",
                message: err.message, 
                stackTrace: err.stack
            });
            break;
        case constants.NOT_ACCEPTABLE:
            res.json({
                title: "Duplicate Record Entry",
                message: err.message, 
                stackTrace: err.stack
            });
            break;
        case constants.SERVICE_UNAVAILABLE:
            res.json({
                title: "Something went wrong! Please try again later.",
                message: err.message, 
                stackTrace: err.stack
            });
            break;
        default:
            res.json({
                title: "Unknown Buit-in error",
                message: err.message, 
                stackTrace: err.stack
            });
            break;
    }

}

module.exports = errorHandler;