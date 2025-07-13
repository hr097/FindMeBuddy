const mongoose = require("mongoose");

const dbConnect = async () =>{
    try {
        const connect = await mongoose.connect(process.env.CONN_MONGODB_URI);
        console.log("MongoDB status: Database connected!");
    }catch(err){
        console.log(err);
        console.log("MongoDB status: Database disconnected!");
        process.exit(1);
    }
}
module.exports = dbConnect;