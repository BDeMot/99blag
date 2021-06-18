const express = require('express')
const router = express.Router()

const gagsCtrl = require('../controllers/gags')
const multer = require('../middleware/multer-config')

router.post('/', multer, gagsCtrl.createGag)
router.get('/', gagsCtrl.getGags)
router.get('/:id', gagsCtrl.getOneGag)
router.delete('/:id', gagsCtrl.deleteGag)

module.exports = router