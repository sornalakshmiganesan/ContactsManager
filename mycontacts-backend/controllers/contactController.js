const asyncHandler=require("express-async-handler");
const Contact= require("../models/contactModel");

//@desc get all contacts
//@route GET/api/contacts
//@access private
const getContacts=asyncHandler(async(req,res)=>{
    const contacts=await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
});

//@desc get contact with particular req id
//@route GET/api/contacts
//@access private
const getContact=asyncHandler(async(req,res)=>{
     console.log('Hello',Contact.findById(req.params.id));

    const contact= await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        console.log('Hi',contact);
        throw new Error("Contact Not found");
    }
    res.status(200).json(contact);
});

//@desc create a new contact
//@route POST/api/contacts
//@access private
const createContact=asyncHandler(async(req,res)=>{
    console.log("The request body is: ",req.body);
    const {name,mail}=req.body;
    if(!name||!mail){
     res.status(400);
     throw new Error("All fields are mandatory!");
    }
    const contacts= await Contact.create({name,mail,
    user_id:req.user.id
    });
    res.status(201).json(contacts);
});

//@desc update a contact with particular req id
//@route PUT/api/contacts/:id
//@access private
const updateContact=asyncHandler(async(req,res)=>{
    const contact= await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        console.log('Hi',contact);
        throw new Error("Contact Not found");
    }

    if(contact.user_id.toString() !==req.user.id)
    {
        res.status(403);
        throw new Error("User don't have permission to update this contact");
    }
    const updatedContact=await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(200).json(updatedContact);
});

//@desc delete a contact with particular req id
//@route DELETE/api/contacts/:id
//@access private
const deleteContact=asyncHandler(async(req,res)=>{
    const contact= await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        console.log('Hi',contact);
        throw new Error("Contact Not found");
    }
    if(contact.user_id.toString()!==req.user.id)
    {
        res.status(403);
        throw new Error("User don't have permission to delete this contact");
    }
    await Contact.deleteOne({_id:req.params.id});
    res.status(200).json(contact);
});

module.exports={getContacts, getContact, createContact, updateContact, deleteContact};