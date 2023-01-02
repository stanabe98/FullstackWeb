const mongoose = require('mongoose')
const Track= require('./track')


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

foodSchema.pre('remove', function(next){
    Track.find({food : this.id}, (err, tracks )=>{
        if(err){
            next(err) // passes error on to the nect function
        } else if (tracks.length > 0){
            next(new Error('This author has books still'))
        }else{
            next()  // tells to continue and remove
        }
    } )
})

module.exports = mongoose.model('Food', foodSchema)