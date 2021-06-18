const connection = require('../db')
const fs = require('file-system')

exports.createGag = (req, res, next) => {

  const gag = [
  req.body.title,
  `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  req.body.op,
  0,
  0]

  connection.query('INSERT INTO gags SET id = null, title = ?, imageUrl = ?, date = now(), op = ?, likes = ?, dislikes = ?, nb_of_comments = 0',
  gag,
  function(error, results, fields) {
    if (error){
      res.status(400).json({ error })
    }
    if (results) {
      res.status(201).json({ message : 'Gag ajouté à la base de donnée !'})
    }
    if(fields) {
      console.log("Gag added")
    }
  })
}

exports.getGags = (req, res, next) => {
  connection.query('SELECT * FROM gags', 
    function (error, results, fields) {
      if (error) {
        res.status(404).json({ error })
      }
      if (results) {
        res.status(200).json({ results })
      }

      if(fields) {
        console.log("Sending all gags...")
      }
    }
  )
}

exports.getOneGag = (req, res, next) => {
  const gagId = req.query.gagId
  connection.query('SELECT * FROM gags WHERE id= ?', 
    gagId, 
    function (error, results, fields) {
      if (error) {
        res.status(404).json({ error })
      }
      if (results) {
        res.status(200).json({ results })
      }
      if (fields) {
        console.log("Sending one gag...")
      }
    }
  )
}

exports.deleteGag = (req, res, next) => {
  const gagId = req.query.gagId
 
  connection.query('SELECT * FROM gags WHERE id=?',
  gagId,
  function (error, results, fields) {
    if (error) {
      res.status(404).json({ error })
    }
    if (results) {
      const filename = results[0].imageUrl.split('/images/')[1]
      fs.unlink(`images/${filename}`, () => {
        connection.query(`DELETE FROM gags WHERE id = "${gagId}"`, // TODO add delete cascade on table likes
        function (error, results, fields) {
          if(error) {
            console.log(error)
          }
        }) 
      })     

      res.status(200).json({ results })
    }
    if (fields) {
      console.log("Deleted this gag...")
    }
  })
}