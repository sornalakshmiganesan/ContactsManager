const mongoose=require("mongoose");

const contactSchema=mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    
    name:{
        type:String,
        required: [true,"Please add your name"],
    },
    mail:{
        type:String,
        required: [true,"Please add your mail ID"],
    }
},{
    timeStamps:true,
})

module.exports=mongoose.model("Contact",contactSchema);