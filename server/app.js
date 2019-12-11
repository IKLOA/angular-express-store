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
const orderRoutes = require('./routes/order')

mongoose.connect(keys.MongoDD)
  .then(() => console.log('MongoDB connected'))
  .catch(error => console.log(error))


app.use(passport.initialize())
require('./middleware/passport')(passport)
app.use('/server/uploads', express.static('server/uploads'))


app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api/auth', authRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/position', positionRoutes)
app.use('/api/order', orderRoutes)

module.exports = app
