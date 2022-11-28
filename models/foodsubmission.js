const mongoose = require('mongoose')

const foodSchema= new mongoose.Schema({
    name: {
        type: String,
        required:true,

    }, 
    quantity:{
        type:String,
        default:100,
        required:false
    },

    calories:{
        type: String,
        required:true, 
    }, 
    protein:{
        type: String,
        required:false, 
    },
    carbs:{
        type: String,
        required:false, 
    },
    fats:{
        type: String,
        required:false, 
    },
})


module.exports = mongoose.model('Food', foodSchema)