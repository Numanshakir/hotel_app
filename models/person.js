const mongoose = require('mongoose');

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
//person model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;
