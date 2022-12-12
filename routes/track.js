const express = require('express')
const router = express.Router()
const Track= require('../models/track')
const Food= require('../models/foodsubmission')

 



// All authors route
router.get('/', async (req,res) => {
  let query = Track.find()
  if (req.query.createdBefore != null && req.query.createdBefore!= ''){
      query= query.lte('createdAt', req.query.createdBefore)
  }
  if (req.query.createdAfter != null && req.query.createdAfter!= ''){
    query= query.gte('createdAt', req.query.createdAfter)
}

  try{
    const track = await query.exec()
    res.render('track/index',{
      track: track,
      searchOption: req.query
    })

  }catch {
    res.redirect('/')
  }

  
})




router.get('/new', async(req,res) => {
  renderNewPage(res, new Track())

  
    
})







// create track route
router.post('/', async (req,res) => {
    const track= new Track({
      calories: req.body.calories,
      protein: req.body.protein,
      carbs: req.body.carbs,
      fats: req.body.fats,
      quantity: req.body.quantity,
      createdAt: new Date(req.body.createdAt)
    })

    try{
      const newTrack = await track.save()
      res.redirect('track')

    }catch{
      renderNewPage(res,track, true )

    }
    
})


async function renderNewPage(res, track, hasError= false){
  try{
    const foodSaved = await Food.find({})
    const something= 'hello'
    const params= {
      foodSaved: foodSaved,
      track: track,
      something: something
    }
    if (hasError) params.errorMessage = "error creating log"
    res.render('track/new', params)
  }catch{
    res.redirect('track')
  }

}




module.exports = router 