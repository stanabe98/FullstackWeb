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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food'
    }, 
    quantity:{
        type: Number,
    }, 
  
   
})




module.exports = mongoose.model('Track', trackSchema)