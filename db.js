const mongoose=require('mongoose'); 
require('dotenv').config(); 

const mongoURL=process.env.LOCAL_DB_URL; 
// const mongoURL=process.env.DB_URL; 
mongoose.connect(mongoURL); 

const db=mongoose.connection;  

db.on('connected',()=>{
    console.log('Connected to MongoDB server'); 
}); 

db.on('disconnected',()=>{
    console.log("Disconnected with MongoDB server"); 
}); 

db.on('error',(error)=>{
    console.log("Error",error);
}); 

module.exports=db; 
