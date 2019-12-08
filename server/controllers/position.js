const Position = require('../models/Position')
const errorHandler = require('../utils/errorHandler')

module.exports.getByCategoryId = async function (req, res) {
  try {
    const positions = await Position.find({category: req.params.categoryId})
    res.status(200).json(positions)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.create = async function (req, res) {
  try {
    const position = await new Position({
      name: req.body.name,
      description: req.body.description,
      cost: req.body.cost,
      costWithDiscount: req.body.costWithDiscount,
      imageSrc: req.file.path,
      category: req.body.categoryId
    }).save()
    res.status(201).json(position)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.remove = async function (req, res) {
  try {
    await Position.remove({_id: req.params.id})
    res.status(200).json({
      message: 'Позиция была удалена'
    })
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.update = async function (req, res) {
  const updated = {
    name: req.body.name,
    description: req.body.description,
    cost: req.body.cost,
    costWithDiscount: req.body.costWithDiscount,
    category: req.body.categoryId
  }

  if (req.file) {
    updated.imageSrc = req.file.path
  }
  try {
    const position = await Position.findOneAndUpdate(
      {_id: req.params.id},
      {$set: updated},
      {new: true}
    )
    res.status(200).json(position)
  } catch (e) {
    errorHandler(res, e)
  }
}
