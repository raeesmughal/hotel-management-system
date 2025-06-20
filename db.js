const mongoose = require('mongoose');


const dotenv = require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI;


// async function we are gonna export and will be importing in out main file (server.js in this case)
const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(MONGODB_URI);
        console.log('mongodb connected');
    }catch(er){
        console.log(er.message);
        process.exit(1);
    }
}

module.exports = connectDB;