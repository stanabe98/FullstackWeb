const express = require('express')
const router = express.Router()
const Food= require('../models/foodsubmission')

// All authors route
router.get('/', async (req,res) => {
    let searchOption= {}
    if (req.query.name !=null && req.query.name !==''){
        searchOption.name= new RegExp(req.query.name, 'i')
    }
    try{
        const foodSaved= await Food.find(searchOption)
        res.render('foods/index', {
        foodSaved: foodSaved, 
        searchOption: req.query})
    }catch{
        res.redirect('/')
    }
    
})

router.get('/new', async(req,res) => {
    res.render('foods/new', {food: new Food()})
})

// create author route
router.post('/', async (req,res) => {
    const food= new Food({
        name:req.body.name,
        calories:req.body.calories,
        protein: req.body.protein,
        carbs: req.body.carbs,
        fats: req.body.fats,
        quantity: req.body.quantity
    })
    try{
        const newFood= await food.save()
        res.redirect(`/foods/${newFood.id}`)
    }
    catch{
        res.render('foods/new', {
            food: food,
            errorMessage: 'Error creating Food log'
        })
    }
})


router.get('/:id', (req,res) => {
    res.send('Show food ' + req.params.id)
})


router.get('/:id/edit', async(req,res) => {
    try{
        const food= await Food.findById(req.params.id)
        res.render('foods/edit', {food: food})

    }
    catch{
        res.redirect('/foods')

    }

})


router.put('/:id', async (req,res) => {
    let food 
    // defined outside the try catch so it can be accessed in catch
    try{
        food= await Food.findById(req.params.id)
        food.name = req.body.name
        food.calories= req.body.calories
        food.protein= req.body.protein
        food.fats= req.body.fats
        food.carbs= req.body.carbs
        food.quantity= req.body.quantity



        await food.save()
       
        res.redirect(`/foods`)

    }
    catch{
        if (food == null) {
            res.redirect('/')
        }
        else{
        res.render('foods/edit', {
            food: food,
            errorMessage: 'Error Updating Food '
        })
        }
    }
})


router.delete('/:id', async(req, res) => {
    let food 
    // defined outside the try catch so it can be accessed in catch
    try{
        food= await Food.findById(req.params.id)
      
        await food.remove()
        res.redirect(`/foods`)
    }
    catch{
        if (food == null) {
            res.redirect('/')
        }
        else{
        res.redirect(`/foods/${food.id}`)
        }
    }
})



module.exports = router 