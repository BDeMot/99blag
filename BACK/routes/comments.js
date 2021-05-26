const express = require('express')
const router = express.Router()

const commentsCtrl = require('../controllers/comments')

router.post('/', commentsCtrl.addComment)
// router.get('/', commentsCtrl.getComments)

module.exports = router