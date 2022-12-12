const mongoose = require('mongoose')

const foodSchema= new mongoose.Schema({
    name: {
        type: String,
        required:true,

    }, 
    quantity:{
        type:Number,
        default:100,
        required:false
    },

    calories:{
        type: Number,
        required:true, 
    }, 
    protein:{
        type: Number,
        required:false, 
    },
    carbs:{
        type: Number,
        required:false, 
    },
    fats:{
        type: Number,
        required:false, 
    },
})


module.exports = mongoose.model('Food', foodSchema)