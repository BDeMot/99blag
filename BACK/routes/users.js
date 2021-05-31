const express = require('express')
const router = express.Router()

const usersCtrl = require('../controllers/users')

router.post('/', usersCtrl.addUser)
// router.get('/', commentsCtrl.getComments)
// router.delete('/:id', commentsCtrl.deleteComment)

module.exports = router