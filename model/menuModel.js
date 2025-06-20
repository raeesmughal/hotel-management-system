const {Schema,model} = require('mongoose');


const menuSchema = new Schema({
    dish:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    taste:{
        type:String,
        enum:['sweet','sour','spicy'],
        required:true,
    },
    isDrink:{
        type:Boolean,
        default:false,
    },
    no_sales:{
        type:Number,
        default:0,
    },
    ingredients:{
        type:[String],
        required:true,
    }
})


const menuModel = model('dish',menuSchema);

module.exports = menuModel;



