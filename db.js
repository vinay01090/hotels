const mongoose=require('mongoose'); 
// require('dotenv').config(); 

// const mongoURL='mongodb://localhost:27017/hotels';
const mongoURL='mongodb+srv://vinaykumarshk22:2020vkshk@cluster0.jgpe5p5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; 

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
