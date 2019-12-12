const Order = require('../models/Order')
const errorHandler = require('../utils/errorHandler')

module.exports.getByUserId = async function (req, res) {
  try {
    const orders = await Order.find({user: req.user.id}).sort({date: -1})
    res.status(200).json(orders)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.getById = async function (req, res) {
  try {
    const order = await Order.findOne({_id: req.params.id})
    res.status(200).json(order)
  } catch (e) {
    errorHandler(res, e)
  }
}


module.exports.getAll = async function (req, res) {
  try {
    // const query = {
    //   user: req.user.id
    // }
    //
    //
    // if (req.query.start) {
    //   query.date = {
    //     $gte: req.query.start
    //   }
    // }
    //
    // if (req.query.end) {
    //   if (!query.date) {
    //     query.date = {}
    //   }
    //
    //   query.date['$lte'] = req.query.end
    // }
    //
    // if (req.query.order) {
    //   query.order = +req.query.order
    // }
    //
    // const orders = await Order
    //   .find(query)
    //   .sort({date: -1})
    //   .skip(+req.query.offset)
    //   .limit(+req.query.limit)

    const orders = await Order.find({}).sort({date: -1})

    res.status(200).json(orders)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.create = async function (req, res) {
  try {
    const lastOrder = await Order.findOne().sort({date: -1})

    const maxOrder = lastOrder ? lastOrder.order : 0
    const order = await new Order({
      list: req.body.list,
      user: req.user.id,
      order: maxOrder + 1,
      adress: req.body.adress,
      phone: req.body.phone
    }).save()

    res.status(201).json(order)
  } catch (e) {
    errorHandler(res, e)
  }
}


