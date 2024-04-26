//require express
const express=require('express');
const app=express();

const db=require('./db');

//dotenv for accessing important file
require('dotenv').config(); 

const port=process.env.PORT; 

//middleware
const logRequest=(req,res,next)=>{
    console.log(`${new Date().toLocaleString()} Request Mode to: ${req.originalUrl}`);
    next();  
};


//whole app use the logrequest middleware
app.use(logRequest); 


//parse data
const bodyParser=require('body-parser'); 
app.use(bodyParser.json()); 


//port
app.listen(port,()=>{
    console.log("Server is listening in port 2000"); 
}); 

//accessing CRUD operations with the help of router.
const personRoutes=require('./routes/personRoutes'); 
app.use('/person',personRoutes); 

const menuRoutes=require('./routes/menuRoutes'); 
app.use('/menu',menuRoutes); 


// a route
app.get('/',function(req,res){
    res.send('Welcome Sir!....How may I help you?'); 
}); 
