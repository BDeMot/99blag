const connection = require('../db')
const jwt = require('jsonwebtoken')

exports.setLikes = (req, res, next) => {
  const decodedToken = jwt.verify(req.body[0], process.env.TOKEN_SECRET + new Date().getDate())
  const user = decodedToken.userId
  const gag = req.body[1]
  const likeType = req.body[2]
  const sql = `INSERT INTO like_dislike (user_id_pk, gag_id_pk, likeType) 
    VALUES ('${user}', ${gag}, ${likeType}) 
    ON DUPLICATE KEY UPDATE likeType = ${likeType}`

  connection.query(sql,
    function(error, results, fields) {
      if (error){
        res.status(400).json({ error })
      }
      if (results) {
        console.log(results)
        res.status(201).json({ results })
      }
      if (fields) {
        console.log("Likes prit en compte")
      }
    }
  )
}

exports.likeOrDislike = (req, res, next) => {
  const decodedToken = jwt.verify(req.query.user, process.env.TOKEN_SECRET + new Date().getDate())

  const likeOrDislike = [
    decodedToken.userId,
    req.query.gag
  ]

  connection.query('SELECT likeType FROM like_dislike WHERE user_id_pk = ? AND gag_id_pk = ?',
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