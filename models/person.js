const mongoose = require('mongoose');
const express=require("events");
const bcrypt = require('bcrypt');
//person schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true

    },
    age: {
        type: Number,
        required: false
    },
    work :{
        type: String,
        required: false,
        enums : ["Chef","Waiter","Driver","Cleaner"]
    
    },
    mobile: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique:true,

    },
    address: {
        type: String,
        required: false
    },
    salary: {
        type: Number,
        required: false
    },
    username:{
        type: String,
        required: true,
        unique:true
    },

    password: {
        type: String,
        required: true
    },
});

personSchema.pre('save', async function (next) {

    const person =this;
if(!person.isModified("password")) return next();
   try{
//hashing the password  
     const salt = await bcrypt.genSalt(10);
//hashing the password
     const hashedPassword =await bcrypt.hash(person.password, salt);
     //assigning hashed password
     person.password=hashedPassword;

    next();

   }catch(e){
    console.log(e);
 
        next(e);
   }
});

personSchema.methods.comparePassword = async function (userPassword) {
    try{
    return await bcrypt.compare(userPassword, this.password);
    }catch(e){
        console.log(e);
        throw e;
    }
}


//person model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;
