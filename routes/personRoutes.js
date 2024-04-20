const express=require('express'); 
const person = require('../models/person');
const router=express.Router(); 

router.post('/',async(req,res)=>{
    try{
        const data=req.body; 
        const newPerson=new person(data); 

        const response=await newPerson.save(); 
        console.log('Data Saved Successfully'); 
        res.status(200).json(response); 

    }
    catch(err){
        console.log(err); 
        res.status(500).json({error: 'Internal server error'}); 
    }
});

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

//comment added for testing

module.exports=router; 