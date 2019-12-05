const express = require('express')
const router = express.Router()
const adminPassport = require('passport')
const controller = require('../controllers/position')

router.get('/:categoryId', controller.getByCategoryId)

router.post('/', adminPassport.authenticate('jwt', {session: false}), controller.create)

router.patch('/:id', adminPassport.authenticate('jwt', {session: false}), controller.update)
router.delete('/:id', adminPassport.authenticate('jwt', {session: false}), controller.remove)


module.exports = router
