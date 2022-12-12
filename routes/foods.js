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
        res.redirect('foods')
    }
    catch{
        res.render('foods/new', {
            food: food,
            errorMessage: 'Error creating Food log'
        })
    }
})




module.exports = router 