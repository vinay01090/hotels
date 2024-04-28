const mongoose=require('mongoose'); 
const bcrypt=require('bcrypt'); 

const personSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:['Chef','Waiter','Manager'],
        require:true
    },
    mobile:{
        type:Number,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        require:true
    },
    username:{
        require:true,
        type:String
    },
    password:{
        require:true,
        type:String
    }
}); 

personSchema.pre('save',async function(next){
    const person=this;
    
    //check password is hashed or not.
    if(!person.isModified('password')){
        return next(); 
    }
    try{
        //salting
        const salt=await bcrypt.genSalt(10); 

        //hashing
        const hashedPassword=await bcrypt.hash(person.password,salt); 

        //saving
        person.password=hashedPassword; 
        next(); 
    }
    catch(err){
        return next(err); 
    }
}); 

//compare function
personSchema.methods.comparePassword=async function(candidatePassword){
try{
    const isMatch=bcrypt.compare(candidatePassword,this.password); 
    return isMatch; 
}
catch(err){
    throw(err); 
}
}

const person=mongoose.model('person',personSchema); 

module.exports=person;  