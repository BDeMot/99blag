const connection = require('../db')
const jwt = require('jsonwebtoken')

exports.setLikes = (req, res, next) => {
  // request is an array where : 
  // [0] is user token, 
  // [1] is the gag id, 
  // [2] is the like or dislike ( 1 or -1)
  const decodedToken = jwt.verify(req.body[0], process.env.TOKEN_SECRET + new Date().getDate())

  const likes = [
    decodedToken.userId,
    req.body[1],
    req.body[2] 
  ]

  connection.query('INSERT INTO likes SET id = null, user = ?, gag = ?, likes = ?',
  likes,
  function(error, results, fields) {
    if (error){
      res.status(400).json({ error })
    }
    if (results) {
      res.status(201).json({ message : 'Likes mis à jour'})
    }
    if (fields) {
      console.log("Likes prit en compte")
    }
  })
}

exports.likeOrDislike = (req, res, next) => {
  const decodedToken = jwt.verify(req.query.user, process.env.TOKEN_SECRET + new Date().getDate())

  const likeOrDislike = [
    decodedToken.userId,
    req.query.gag
  ]

  connection.query('SELECT likes FROM likes WHERE user = ? AND gag = ?',
  likeOrDislike,
  function(error, results, fields) {
    if (error){
      res.status(404).json({ error })
    }
    if (results) {
      res.status(200).json({ results })
    }
  }
  )
}