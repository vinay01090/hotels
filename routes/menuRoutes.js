const express=require('express'); 
const router=express.Router(); 
const menu=require('./../models/menu');

router.post('/',async(req,res)=>{
    try{
        const data=req.body;
        const newMenu=new menu(data);

        const response=await newMenu.save();
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
        const response=await menu.find();
        console.log('Data Fetched Successfully');
        res.status(200).json(response);

    }
    catch(err){
        console.log(err); 
        res.status(500).json({error: 'Invalid server error'}); 
    }
});

router.get('/:tasteType',async(req,res)=>{
    try{
        const tasteType=req.params.tasteType; 
        if(tasteType=='spicy' || tasteType=='sweet'){
            const response=await menu.find({taste : tasteType}); 
            res.status(200).json(response);
        }
        else{
            res.status(404),json({error:'Invalid tasteType'}); 
        }
    }
    catch(err){
        console.log(err); 
        res.status(500).json({error:'Internal server error'}); 
    }
}); 

module.exports=router; 

