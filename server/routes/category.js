const express = require('express')
const controller = require('../controllers/category')
const upload = require('../middleware/upload')
const passport = require('passport')
const router = express.Router()


router.get('/', controller.getAll)
router.get('/:id', controller.getById)
router.delete('/:id', passport.authenticate('admin-jwt', {session: false}), controller.remove)
router.post('/', passport.authenticate('admin-jwt', {session: false}), upload.single('image'), controller.create)
router.patch('/:id', passport.authenticate('admin-jwt', {session: false}), upload.single('image'), controller.update)


module.exports = router


