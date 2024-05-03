const express=require('express'); 
const person = require('./../models/person');
const router=express.Router(); 
const {jwtAuthMiddleware,generateToken}=require('./../jwt'); 

// create
router.post('/signup',async(req,res)=>{
    try{
        const data=req.body; 
        const newPerson=new person(data); 

        const response=await newPerson.save(); 
        console.log('Data Saved Successfully'); 

        const payLoad={
            id:response.id,
            username:response.username,
        }

        console.log(JSON.stringify(payLoad)); 
        const token=generateToken(payLoad); 
        res.status(200).json({response:response, token:token}); 

    }
    catch(err){
        console.log(err); 
        res.status(500).json({error: 'Internal server error'}); 
    }
});


router.post('/login',async(req,res)=>{
    try{
        const {username,password}=req.body; 
        const user=await person.findOne({username:username}); 

        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error:'Invalid Username or Password'}); 
        }
        const payLoad={
            id:user.id,
            username:user.username
        }
        const token=generateToken(payLoad); 
        res.json(token); 
    }
    catch(err){
        console.log(err); 
        return res.status(500).json({error:'Internal server error'}); 
    }
}); 


router.get('/profile',jwtAuthMiddleware,async(req,res)=>{
    try{
        const userData=req.user; 
        console.log("userData",userData); 

        const userId=userData.id; 
        const user =await person.findById(userId); 
        res.status(500).json({user}); 

    }
     catch(err){
        console.log(err); 
        res.status(401).json({error:'Internal Server Error!'}); 
     }
})

//read
router.get('/',async(req,res)=>{
    try{
        const data=await person.find(); 
        console.log('Data Fetched Successfully');
        res.status(200).json(data); 
    }
    catch(err){
        console.log(err); 
        res.status(500).json({error: 'Invalid server error'}); 
    }
}); 

//paramaterised read
router.get('/:workType',async(req,res)=>{
    try{
        const workType=req.params.workType; 
        if(workType=='Chef' || workType=='Manager' || workType=='Waiter'){
            const response=await person.find({work: workType}); 
            res.status(200).json(response); 
        }
        else{
            res.status(404).json({error:'Invalid workType'}); 
        }

    }
    catch(err){
        console.log(err); 
        res.status(500).json({error:'Internal server error'}); 
    }
}); 

//update
router.put('/:id',async(req,res)=>{
    try{
        const personId=req.params.id; 
        const updatedPersonData=req.body;
        const updatedPerson=await person.findByIdAndUpdate(personId,updatedPersonData,{
            new:true,
            runValidators:true,
        }); 
        if(!updatedPerson){
            return res.status(404),json({error:'Person not found'}); 
        }
        res.json(updatedPerson); 
    }
    catch(err){
        console.log(err); 
        res.status(500).json({error:'Internal server error'}); 
    }
}); 

//delete
router.delete('/:id',async(req,res)=>{
    try{
        const personId=req.params.id; 
        const response=await person.findByIdAndDelete(personId); 
        if(!response){
            res.status(404).json({error:'Person not found'}); 
        }
        console.log('Person Deleted Successfully'); 
        res.status(200).json(response); 

    }
    catch(err){
        console.log(err); 
        res.status(500).json({error:"Invalid Id"}); 
    }
}); 

//export router to access from outside.
module.exports=router; 