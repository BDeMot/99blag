const connection = require('../db')

exports.createGag = (req, res, next) => {
  //const gagObject = JSON.parse(req.body.gag)

  const test = ['test', 'htpp://none', 'Momo', 3, 4]

  /*connection.query('INSERT INTO gags VALUES (?)', test, function(error, results, fields) {
    console.log(error || results || fields)
  })*/
  connection.query('INSERT INTO gags SET id = null, title = ?, imageUrl = ?, date = null, op = ?, likes = ?, dislikes = ?',
   test,
    function(error, results, fields) {
    console.log(error || results || fields)
  })
}