const express = require('express');
const router = express.Router();


// importing personModel
const personModel = require('../model/personModel')


// body parser
router.use(express.json());


// create data
router.post('/createperson',async(req,res)=>{
    try{
        const data = req.body;
        const newPerson = new personModel(data);
        await newPerson.save();

        res.status(200).json({
            success:true,
            newPersonCreated: newPerson,
        })

    }catch(er){
        res.status(500).json({
            success:false,
            error : er.message,
        })
    }

})




// read data
router.get('/people',async(req,res)=>{
    try{
        const allPeople = await personModel.find();

        res.status(200).json({
            success:true,
            newPersonCreated: allPeople,
        })

    }catch(er){
        res.status(500).json({
            success:false,
            error : er.message,
        })
    }

})



// update data
router.put('/updateperson/:id',async(req,res)=>{
    try{
        const {id} = req.params; // which user we want to update
        const data = req.body; // data to update
        const updatedPerson = await personModel.findByIdAndUpdate(id,data,{
            new:true,  // return the updated document (when we call updatedUser)
            runValidators:true, // run mongoose validation
        });
        


        // if you want to run this if block, enter the wrong id (with the same lendth ie : the real but not available id , if you change lendth, the key becomes invalid and you get the error in catch block)
        if(!updatedPerson){
            res.status(404).json({
                status:false,
                error : 'user not found'
            })
        }


        res.status(200).json({
            success:true,
            "updated person": updatedPerson,
        })

    }catch(er){
        res.status(500).json({
            success:false,
            error : er.message,
        })
    }

})






// delete data
router.delete('/person/delete/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const deletedPerson = await personModel.findByIdAndDelete(id);

        res.status(200).json({
            success:true,
            deleted : deletedPerson, 

        })
    }catch(er){
        res.status(500).json({
            success:false,
            error: er.message,
        })
    }
})





// search by role : 

router.get('/people/:role',async(req,res)=>{
    try{
        const {role} = req.params;

        const peopleWithRole = await personModel.find({role:role});

        if(!peopleWithRole){
            res.status(404).json({
                success:false,
                error: 'person not found with this role',
            })
        }

        res.status(200).json({
            success:true,
            'people with role': peopleWithRole,
        })

    }catch(er){
        res.status(500).json({
            success:false,
            error:er.message,
        })
    }
})










// exporting routes for personRouter
module.exports = router;