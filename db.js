const mongoose=require('mongoose'); 

const mongoURL='mongodb://localhost:27017/hotels';

mongoose.connect(mongoURL); 

const db=mongoose.connection;  

db.on('connected',()=>{
    console.log("Connected to MongoDB server"); 
}); 

db.on('disconnected',()=>{
    console.log("Disconnected with MongoDB server"); 
}); 

db.on('error',(error)=>{
    console.log("Error",error);
}); 

module.exports=db; 
