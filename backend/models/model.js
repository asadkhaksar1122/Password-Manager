let mongoose =require("mongoose")
let Schema = mongoose.Schema
let {user}=require("./user")

let passwordSchema=new Schema({
    websiteurl:{
        type:String,
        required:true,

    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
})
let Password =mongoose.model("Password",passwordSchema)
module.exports={Password}