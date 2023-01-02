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
      createdAt: new Date(req.body.createdAt),
      food: req.body.food
     
    })

    try{
      const newTrack = await track.save()
      res.redirect('track')

    }catch{
      renderNewPage(res,track, true )

    }
    
})

router.get('/:id/edit', async(req, res) => {
  try{
    const track= await Track.findById(req.params.id)
    const foodSaved = await Food.find({})

    const params2= {
      foodSaved: foodSaved,
      track: track
    }
    res.render('track/edit', params2)

  } catch {
    res.redirect('/track')
  }
})


router.put('/:id', async (req,res) => {
  let track 
  // defined outside the try catch so it can be accessed in catch
  try{
      track= await Track.findById(req.params.id)
      track.calories = req.body.calories
      track.protein= req.body.protein
      track.fats= req.body.fats
      track.carbs= req.body.carbs
      track.food= req.body.food
      track.quantity= req.body.quantity



      await track.save()
     
      res.redirect(`/track`)

  }
  catch{
      if (track == null) {
          res.redirect('/')
      }
      else{
      res.render('foods/edit', {
          track: track,
          errorMessage: 'Error Updating Log '
      })
      }
  }
})


router.delete('/:id', async(req, res) => {
  let track 
  // defined outside the try catch so it can be accessed in catch
  try{
      track= await Track.findById(req.params.id)
    
      await track.remove()
      res.redirect(`/track`)
  }
  catch{
      if (track == null) {
          res.redirect('/')
      }
      else{
      res.redirect(`/track/${track.id}`)
      }
  }
})





async function renderNewPage(res, track, hasError= false){
  try{
    const foodSaved = await Food.find({})
   
    const params= {
      foodSaved: foodSaved,
      track: track,
     
    }
    if (hasError) params.errorMessage = "error creating log"
    
    res.render('track/new', params)
  }catch{
    res.redirect('track')
  }

}




module.exports = router 