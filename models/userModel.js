const mongoose=require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide your name."],
        trim: true
    },
    dob:{
        type:Date,
        required:[true,"Please provide your date of birth."]
    },
    gender:{
        type:String,
        trim: true,
        lowercase:true,
        enum: {values:["male","female"],message: 'Please write male or female'},
        required:[true,"Please provide your gender."]
    },
    mobile:{
        type:String,
        index: true,
        required:[true,"Please provide a phone number."],
        lowercase: true,
        unique:[true,"Phone number already registered."],
        trim: true,
        validate: {
            validator: function (v) {
                return /^\+?[1-9][0-9]{7,14}$/.test(v);
            },
            message: '{VALUE} is not a valid 10 digit number!'
        }
    },
    email:{
        type:String,
        index: true,
        required:[true,"Please provide an email address."],
        unique:[true,"This email is already registerd."],
        lowercase: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: '{VALUE} is not a valid email address!'
        }
    },
    socket_connection_id:{
        type:String,
        default:"-"
    },
    user_access:{
        type:Boolean,
        default:true,
    },
    access_token:{
        type:String,
        default:"-"
    }
},{ timestamps: true })


userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Users",userSchema)