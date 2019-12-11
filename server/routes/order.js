const express = require('express')
const controller = require('../controllers/order')

const passport = require('passport')
const router = express.Router()


router.get('/', passport.authenticate('admin-jwt', {session: false}), controller.getAll)
router.get('/:id', controller.getByUserId)
router.post('/', passport.authenticate('user-jwt', {session: false}), controller.create)


module.exports = router


