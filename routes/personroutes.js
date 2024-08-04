
const express= require("express");
const router=express.Router();
var Person=require('./../models/person.js');
 const {jwtAuthMiddleware, generateToken} = require('../jwt');
 
 ///Create User
router.post('/signup', async(req, res)=>{ 
   
    try{
        var data = req.body;
    var person = new Person(data);
var response =   await person.save();
console.log(response);
const payload = {
    id: response.id,
    username: response .username

}
const token = generateToken(payload);
console.log("token is ="+token);



   res.status(200).json({
       message: "Person added successfully",
       data: response,
       token:token
   }); 



    }catch(err){
        console.log(err.message);
res.status(500).json("Inernal server error");
    }
});

//Login User
router.post('/login', async(req, res)=>{ 
   
    try{
        const {username,password}=req.body;
        const user =await Person.findOne({username:username});

        if(!user || user.comparePassword(password)===false){
            return res.status(401).json({
                message: "Invalid username or password",
            }); 
        }
     
        const payload = {
            id: user.id,
            username: user .username
        }
        const token = generateToken(payload);

        res.status(200).json({
            message: "Login successful",
            data: user,
            token:token
        });
 

    }catch(err){
        console.log(err.message);
        res.status(500).json(
{
                message:"Internal server error"
}
        );
    }
});  



 

router.get('/',jwtAuthMiddleware, async(req, res)=>{   

  

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


router.get('/profile',jwtAuthMiddleware, async(req, res)=>{   

  const user=req.user;

    try{    
        var response =   await Person.findById(user.id);       
        res.status(200).json({
            message: "User get successfully",
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