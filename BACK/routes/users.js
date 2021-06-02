const express = require('express')
const router = express.Router()

const usersCtrl = require('../controllers/users')

router.post('/signup', usersCtrl.addUser)
router.post('/login', usersCtrl.loginUser)
// router.delete('/:id', commentsCtrl.deleteComment)

module.exports = router