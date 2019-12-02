const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const passport = require('passport')
const keys = require('./config/keys')
const app = express()

const authRoutes = require('./routes/auth')

mongoose.connect(keys.MongoDD)
  .then(() => console.log('MongoDB connected'))
  .catch(error => console.log(error))


app.use(passport.initialize())
require('./middleware/pasport')(passport)

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api/auth', authRoutes)

module.exports = app
