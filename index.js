const express = require('express');
const app = express();


// importing/initializing dotenv
const dotenv = require('dotenv').config();

// importing PORT from .env file

const PORT = process.env.PORT || 3000


// body parser
app.use(express.json());


//import and use personRouter file
const personRouter = require('./routes/personRouter.js');
app.use('/api',personRouter);

//import and use menuRouter file
const menuRouter = require('./routes/menuRouter.js');
app.use('/api',menuRouter);



// connect database
const connectDB = require('./db.js');
connectDB();




// home route
app.get('/',(req,res)=>{
    console.log('i am inside homepage wala route');
    res.send('hello homepage');
})





// listen an the port given in dotenv
app.listen(PORT,()=>{
    console.log(`server is running on URL : http://localhost:${PORT}`)
})
