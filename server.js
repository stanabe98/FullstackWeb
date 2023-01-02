if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express');
const app= express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser')
const methodOverride= require('method-override')


const indexRouter= require('./routes/index')
const foodsRouter= require('./routes/foods')
const trackRouter= require('./routes/track')
const apiRouter= require('./routes/api')
const apiRouter2= require('./routes/api2')



app.set('view engine', 'ejs')
app.set('views', __dirname + '/views') //current directory name
app.set('layout', 'layouts/layout' )

app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit:'10mb', extended:false}))



const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
useNewURLParser:true})

const db= mongoose.connection
db.on('error', error => console.error(error))
db.once('open', ()=> console.log('Connected to Mongoose'))


app.use('/', indexRouter)
app.use('/foods', foodsRouter)
app.use('/track', trackRouter)
app.use('/api', apiRouter)
app.use('/api2', apiRouter2)





app.listen(process.env.PORT || 3000) 