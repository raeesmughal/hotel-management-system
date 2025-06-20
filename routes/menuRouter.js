const express = require('express');
const router = express.Router();


// importing menuModel
const menuModel = require('../model/menuModel')


// body parser
router.use(express.json());


// create data
router.post('/createitem',async(req,res)=>{
    try{
        const data = req.body;
        const newItem = new menuModel(data);
        await newItem.save();

        res.status(200).json({
            success:true,
            newItemCreated: newItem,
        })

    }catch(er){
        res.status(500).json({
            success:false,
            error : er.message,
        })
    }

})




// read data
router.get('/menu',async(req,res)=>{
    try{
        const allDishes = await menuModel.find();

        res.status(200).json({
            success:true,
            newPersonCreated: allDishes,
        })

    }catch(er){
        res.status(500).json({
            success:false,
            error : er.message,
        })
    }

})



// update data
router.put('/updatedish/:id',async(req,res)=>{
    try{
        const {id} = req.params; // which dish we want to update
        const data = req.body; // data to update
        const updatedDish = await menuModel.findByIdAndUpdate(id,data,{
            new:true,  // return the updated document (when we call updateddish)
            runValidators:true, // run mongoose validation
        });
        


        // if you want to run this if block, enter the wrong id (with the same lendth ie : the real but not available id , if you change lendth, the key becomes invalid and you get the error in catch block)
        if(!updatedDish){
            res.status(404).json({
                status:false,
                error : 'dish not found'
            })
        }


        res.status(200).json({
            success:true,
            "updated person": updatedDish,
        })

    }catch(er){
        res.status(500).json({
            success:false,
            error : er.message,
        })
    }

})






// delete data
router.delete('/menu/delete/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const deletedDish = await menuModel.findByIdAndDelete(id);

        res.status(200).json({
            success:true,
            deleted : deletedDish, 

        })
    }catch(er){
        res.status(500).json({
            success:false,
            error: er.message,
        })
    }
})




// exporting routes for personRouter
module.exports = router;