const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const userSchema = new Schema({
    fullname:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    secretkey:{
        type:String,
    }
})
let User =mongoose.model("User",userSchema)
module.exports={User}