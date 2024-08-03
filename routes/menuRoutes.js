
const express= require("express");
const router=express.Router();
var Menu=require('./../models/menuItem.js');

router.post("/",async (req,res)=>{
   try{
     var data=req.body;
    var menuItem = new Menu(data);
    var response =   await menuItem.save();
    console.log(response);
    res.status(200).json({
        message: "Menu Item added successfully",
        data: response
    });

   }
catch(e){
    console.log(e.message);
res.status(500).json("Inernal server error");
}


});

router.get('/', async(req, res)=>{   


    try{    
        var response =   await Menu.find();       
        res.status(200).json({
            message: "Menu get successfully",
            data: response
        });     
    }catch(err){
        console.log(err.message);
res.status(500).json("Inernal server error");
    }
});

router.get('/:taste', async(req, res)=>{   

var taste=req.params.taste;
    try{    
        var response =   await Menu.find({taste:taste});       
        res.status(200).json({
            message: "Menu get successfully",
            data: response
        });     
    }catch(err){
        console.log(err.message);
res.status(500).json("Inernal server error");
    }
});
router.put('/:id', async(req, res)=>{   

var id=req.params.id;
var data=req.body;
    try{    
        var response =   await Menu.findOneAndUpdate(id,data,{new:true,runValidators:true});       
        res.status(200).json({
            message: "Menu Updated successfully",
            data: response
        });     
    }catch(err){
        console.log(err.message);
res.status(500).json("Inernal server error");
    }
});

router.delete('/:id', async(req, res)=>{   

var id=req.params.id;

    try{    
        var response =   await Menu.findByIdAndDelete(id);      
        res.status(200).json({
            message: "Menu Deleted successfully",
            data: response
        });     
    }catch(err){
        console.log(err.message);
res.status(500).json("Inernal server error");
    }
});

module.exports = router;