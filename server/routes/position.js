const express = require('express')
const router = express.Router()
const passport = require('passport')
const upload = require('../middleware/upload')
const controller = require('../controllers/position')

router.get('/:categoryId', controller.getByCategoryId)
router.get('/byId/:id', controller.getByPositionId)

router.post('/', passport.authenticate('admin-jwt', {session: false}), upload.single('image'), controller.create)

router.patch('/:id', passport.authenticate('admin-jwt', {session: false}), upload.single('image'), controller.update)
router.delete('/:id', passport.authenticate('admin-jwt', {session: false}), controller.remove)


module.exports = router
