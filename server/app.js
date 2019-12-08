const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const passport = require('passport')
const keys = require('./config/keys')
const app = express()

const authRoutes = require('./routes/auth')
const categoryRoutes = require('./routes/category')
const positionRoutes = require('./routes/position')

mongoose.connect(keys.MongoDD)
  .then(() => console.log('MongoDB connected'))
  .catch(error => console.log(error))


app.use(passport.initialize())
app.use('/server/uploads', express.static('server/uploads'))
require('./middleware/adminpassport')(passport)

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api/auth', authRoutes) 
app.use('/api/category', categoryRoutes)
app.use('/api/position', positionRoutes)

module.exports = app
