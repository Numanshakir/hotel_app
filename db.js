const mongoose = require('mongoose'); 
require('dotenv').config();
// MongoDB connection string
const mongoUrl =process.env.dbLocalUrl ;

// const mongoUrl=process.env.onlineDBUrl;


mongoose.connect(mongoUrl,);
//Mongoose connection event
//When the connection is successfully established 
const db = mongoose.connection;

db.on('connected', () => {
    console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
})
db.on('error', (err) => {
    console.log(`Database connection error: ${err}`);
})
db.on('disconnected', () => {
    console.log('Database disconnected');
})

// Exporting the connection
module.exports = db;