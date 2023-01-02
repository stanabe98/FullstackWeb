const express = require('express')
const router = express.Router()
const Track= require('../models/track')
const Food= require('../models/foodsubmission')



router.get('/', async (req,res) => {
    let food  
    let track
    
    try{
        food = await Food.find()
        track= await Track.find()
    }catch {
        food = []

    }


    res.send(food)
})


   




module.exports  = router 