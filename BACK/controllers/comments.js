const connection = require('../database/db')

exports.addComment = (req, res, next) => {
  const comment = [
  req.body.user,
  req.body.text,
  req.body.commentedOn ]

  connection.query('INSERT INTO comments SET id = null, user = ?, date = now(), comment = ?, on_gag = ?',
  comment,
  function(error, results, fields) {
    if (error){
      res.status(400).json({ error })
    }
    if (results) {
      commentsCounter(req.body.commentedOn)
      res.status(201).json({ message : 'Commentaire ajouté !'})
    }
  })
}

exports.getComments = (req, res, next) => {
  const gagId = JSON.parse(req.query.gagId)

  connection.query('SELECT * FROM comments WHERE on_gag = ?', gagId, function(error, results, fields) {
    if (error){
      res.status(404).json({ error })
    }
    if (results) {
      res.status(200).json({ results })
    }
  })
}

exports.deleteComment = (req, res, next) => {
  const commentId = req.query.commentId
  const gagId = req.query.gagId
  connection.query(' DELETE FROM comments WHERE id = ?',
  commentId,
  function(error, results, fields) {
    if(results) {
      commentsCounter(gagId)
      res.status(200).json({ message : "commentaire supprimé !"})
    }
  })
}

function commentsCounter (onGag) {
  connection.query('SELECT * FROM comments WHERE on_gag = ?', 
    onGag, 
    function(error, results, fields) {
      if(results){
        const getNbOfComment = [results.length, onGag]
        connection.query('UPDATE gags  SET nb_of_comments = ? WHERE id = ?', 
          getNbOfComment,
          function(error, results, fields) {
            if(error){
              console.log(error)
            }
            if(results){
              console.log("number of comments updated!")
            }
              }
            )
          }
        }
      )
}
