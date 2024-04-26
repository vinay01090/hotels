//require express
const express=require('express');
const app=express();
const db=require('./db');
const passport=require('./auth'); 
const port=process.env.PORT; 
require('dotenv').config(); 


//parse data
const bodyParser=require('body-parser'); 
app.use(bodyParser.json()); 


//middleware
const logRequest=(req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request Made to: ${req.originalUrl}`);
    next();  
};

app.use(logRequest);

//authentication
app.use(passport.initialize()); 
const localAuthMiddleware=passport.authenticate('local',{session:false}); 


app.get('/',localAuthMiddleware,(req,res)=>{
    res.send('Welcome Sir!....How may I help you?'); 
}); 

const personRoutes=require('./routes/personRoutes'); 
const menuRoutes=require('./routes/menuRoutes'); 

app.use('/person',personRoutes); 
app.use('/menu',menuRoutes); 

//port
app.listen(port,()=>{
    console.log("Server is listening in port 2000"); 
}); 

