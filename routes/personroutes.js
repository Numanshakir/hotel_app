
const express= require("express");
const router=express.Router();
var Person=require('./../models/person.js');

router.post('/', async(req, res)=>{ 
   
    try{
        var data = req.body;
    var person = new Person(data);
var response =   await person.save();
console.log(response);
   res.status(200).json({
       message: "Person added successfully",
       data: response
   });



    }catch(err){
        console.log(err.message);
res.status(500).json("Inernal server error");
    }
});


router.get('/', async(req, res)=>{   
  

    try{    
        var response =   await Person.find({});       
        res.status(200).json({
            message: "Person get successfully",
            data: response
        });     
    }catch(err){
        console.log(err.message);
res.status(500).json("Inernal server error");
    }
});




router.get('/:workType', async(req, res)=>{   
 
    try{    
 var workType=  req.params.workType;
  
console.log(workType);
        if(workType=="Chef"||workType=="Waiter"||workType=="Driver"||workType=="Cleaner"){
        var response =   await Person.find({work: workType});       
        res.status(200).json({
            message: "Person get successfully",
            data: response
        });  
  }else{
   res.status(404).json("Work type not found"); 
  }
         
    }catch(err){
        console.log(err.message);
res.status(500).json("Inernal server error");
    }
});

router.put('/:id', async(req, res)=>{   
        console.log("update person route"); 
    var id = req.params.id;
    var data = req.body;
    try{    
        var response =   await Person.findByIdAndUpdate(id,data,{
            new:true,
            runValidators:true


        });    
        if(!response)   {
            res.status(404).json("Person not found");
        }
        res.status(200).json({
            message: "Person updated successfully",
            data: response
        });     
    }catch(err){
        console.log(err.message);
res.status(500).json("Inernal server error");
    }
});

router.delete('/:id', async(req, res)=>{  
    console.log("delete person route"); 
    var id = req.params.id;     
    try{    
        var response =   await Person.findByIdAndDelete(id);    
        if(!response)   {
            res.status(404).json("Person not found");
        }
        res.status(200).json({
            message: "Person deleted successfully",

        });     
    }catch(err){
        console.log(err.message);
res.status(500).json("Inernal server error");
    }
});


module.exports=router;