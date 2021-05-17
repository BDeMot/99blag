const express = require('express')
const { route } = require('../app')
const router = express.Router()

const gagsCtrl = require('../controllers/gags')
const multer = require('../middleware/multer-config')

router.post('/', multer, gagsCtrl.createGag)
router.get('/', gagsCtrl.getGags)

module.exports = router