
const express= require("express");
const router=express.Router();
var Menu=require('./../models/menuItem.js');
/**
 * @swagger
 * tags:
 *   name: Menu
 *   description: API for managing menu items
 */

/**
 * @swagger
 * /:
 *   post:
 *     tags: [Menu]
 *     summary: Add a new menu item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               taste:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: float
 *     responses:
 *       '200':
 *         description: Menu item added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/MenuItem'
 *       '500':
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /:
 *   get:
 *     tags: [Menu]
 *     summary: Get all menu items
 *     responses:
 *       '200':
 *         description: Menu items retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/MenuItem'
 *       '500':
 *         description: Internal server error
 */

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

/**
 * @swagger
 * /{taste}:
 *   get:
 *     tags: [Menu]
 *     summary: Get menu items by taste
 *     parameters:
 *       - name: taste
 *         in: path
 *         required: true
 *         description: The taste of the menu items to filter by
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Menu items retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/MenuItem'
 *       '500':
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /{id}:
 *   put:
 *     tags: [Menu]
 *     summary: Update a menu item by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the menu item to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               taste:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: float
 *     responses:
 *       '200':
 *         description: Menu item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/MenuItem'
 *       '500':
 *         description: Internal server error
 */

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
/**
 * @swagger
 * /{id}:
 *   delete:
 *     tags: [Menu]
 *     summary: Delete a menu item by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the menu item to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Menu item deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/MenuItem'
 *       '500':
 *         description: Internal server error
 */

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