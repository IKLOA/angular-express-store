const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ordersSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  order: {
    type: Number,
    required: true
  },
  adress: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  list: [
    {
      name: {
        type: String
      },
      quantity: {
        type: Number
      },
      cost: {
        type: Number
      }
    }
  ],
  user: {
    ref: 'users',
    type: Schema.Types.ObjectId
  }
})

module.exports = mongoose.model('orders', ordersSchema)
