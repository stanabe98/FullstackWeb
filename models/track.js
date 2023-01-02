const mongoose = require('mongoose')


const trackSchema= new mongoose.Schema({
 

    calories: {
        type: Number,
        required:true,
    }, 
    protein:{
        type:Number,
   
    },

    carbs:{
        type: Number,
   
    }, 
    fats:{
        type: Number,
     
    },
    createdAt:{
        type: Date,
        required: true,
        default: Date.now
    },

    food:{
        type: mongoose.Schema.Types.Mixed,
        ref: 'Food'
    }, 
    quantity:{
        type: Number,
    }, 

    notes:{
        type: String,
    }

  
   
})




module.exports = mongoose.model('Track', trackSchema)