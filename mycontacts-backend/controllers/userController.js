const asyncHandler=require("express-async-handler");
const User=require("../models/userModel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

//@desc register user
//@route POST/api/users/register
//@access public
const registerUser=asyncHandler(async(req,res)=>{
    const {userName,mail,password}=req.body;
    if(!userName||!mail||!password)
    {
        console.log(req.body);
        res.status(400);
        throw new Error("All field are mandatory!");
    }
    const userAvailable=await User.findOne({mail});
    if(userAvailable)
    {
        res.status(400);
        throw new Error("User already registered!");
    }
    //Hash password
    const hashedPassword=await bcrypt.hash(password,10);
    console.log("Hashed Password: ",hashedPassword);
    const user=await User.create({
        userName,
        mail,
        password:hashedPassword
    })
    console.log(`User created: ${user}`);
    if(user)
    {
        res.status(201).json({_id:user._id,mail:user.mail});
    }
    else{
        res.status(400);
        throw new Error("User data not valid");
    }
     res.json({message:"Register User"})
})

//@desc login user
//@route POST/api/users/login
//@access public
const loginUser=asyncHandler(async(req,res)=>{
    const {mail,password}=req.body;
    if(!mail||!password)
    {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const user=await User.findOne({mail});
    if(user && (await(bcrypt.compare(password,user.password)))){
        console.log(user);
        const accessToken=jwt.sign({
            user:{
                userName:user.userName,
                mail:user.mail,
                id:user.id
            }
        },process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15m"});
        res.status(200).json({accessToken});
    }else{
        res.status(401);
        throw new Error("Email or password is not valid");
      }
    
}
);

//@desc get current user
//@route GET/api/users/current
//@access private
const currentUser=asyncHandler(async(req,res)=>{

    res.json(req.user);
})

module.exports={registerUser,loginUser,currentUser}