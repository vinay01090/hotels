const express=require('express');
const app=express();

const db=require('./db');
require('dotenv').config(); 

const port=process.env.PORT; 

const bodyParser=require('body-parser'); 
app.use(bodyParser.json()); 

app.listen(port,()=>{
    console.log("Server is listening in port 2000"); 
}); 

const personRoutes=require('./routes/personRoutes'); 
app.use('/person',personRoutes); 

const menuRoutes=require('./routes/menuRoutes'); 
app.use('/menu',menuRoutes); 

app.get('/',function(req,res){
    res.send('Welcome Sir!....How may I help you?'); 
}); 
