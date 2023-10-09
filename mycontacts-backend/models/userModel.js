const mongoose=require("mongoose");

const userSchema=mongoose.Schema(
    {
        userName:{
            type:String,
            required:[true,"Please enter your name"]
        },
        mail:{
            type:String,
            required:[true,"Please enter your Email address"],
            unique: [true,"Email address already registered"]
        },
        password:{
            type:String,
            required:[true,"Please enter your password"],

        }


},{timeStamps:true});

module.exports=mongoose.model("User",userSchema);