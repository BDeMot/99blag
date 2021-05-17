const connection = require('../db')

exports.createGag = (req, res, next) => {

  const test = [
  req.body.title,
  `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  'Momo',
  3,
  4]
  console.log(test)

  connection.query('INSERT INTO gags SET id = null, title = ?, imageUrl = ?, date = now(), op = ?, likes = ?, dislikes = ?',
  test,
  function(error, results, fields) {
    if (error){
      res.status(400).json({ error })
    }
    if (results) {
      res.status(201).json({ message : 'Gag ajouté à la base de donnée !'})
    }
  })
}