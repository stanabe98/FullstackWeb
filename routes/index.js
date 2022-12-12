const express = require('express')
const router = express.Router()
const Track= require('../models/track')



router.get('/', async (req,res) => {
    let track  
    try{
        track = await Track.find().sort({ createdAt: 'desc'}).limit(10).exec()
    }catch {
        track = []
    }


    res.render('index' , {track : track})
})


   




module.exports  = router 