const mongoose=require('mongoose');

const menuSchema=new mongoose.Schema({
    item:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    taste:{
        type:String,
        enum:['spicy','sweet'],
        require:true
    },
    additional:{
        type:String,
    },
    offer:{
        type:String,

    }
}); 

const menu=mongoose.model('menu',menuSchema); 

module.exports=menu; 