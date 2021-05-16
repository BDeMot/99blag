const express = require('express')
const router = express.Router()

const gagsCtrl = require('../controllers/gags')
const multer = require('../middleware/multer-config')

router.post('/', multer, gagsCtrl.createGag)

module.exports = router