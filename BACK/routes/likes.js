const express = require('express')
const router = express.Router()

const likesCtrl = require('../controllers/likes')

router.post('/', likesCtrl.setLikes)
router.get('/', likesCtrl.likeOrDislike)

module.exports = router