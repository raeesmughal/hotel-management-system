const {Schema,model} = require('mongoose');



const personSchema = new Schema({
    name:{
        type:String,
        required:true,
        maxLength:50,
    },
    age:{
        type:Number,
        required:true,
        min:18,
        max:50,
    },
    role:{
        type:String,
        enum:['manager','waiter','chef','sweeper','owner'],
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phone:{
        type:String,
    },
    address:{
        type:String,
        required:true,
        default:'makami',
    },
    salary:{
        type:Number,
        required:true,
    }

})


const personModel = model('person',personSchema);

module.exports = personModel;