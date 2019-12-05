const express = require('express')
const controller = require('../controllers/category')
const upload = require('../middleware/upload')
const adminPassport = require('passport')
const router = express.Router()


router.get('/', controller.getAll)
router.get('/:id', controller.getById)
router.delete('/:id', adminPassport.authenticate('jwt', {session: false}), controller.remove)
router.post('/', adminPassport.authenticate('jwt', {session: false}), upload.single('image'), controller.create)
router.patch('/:id', adminPassport.authenticate('jwt', {session: false}), upload.single('image'), controller.update)


module.exports = router


