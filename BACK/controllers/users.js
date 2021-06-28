const connection = require('../db')
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken')

exports.addUser = (req, res, next) => {
  const uuid = uuidv4();
  const user = [
    uuid,
    req.body.user.pseudo,
    req.body.user.email,
    req.body.user.password 
  ]

  connection.query('INSERT INTO users SET id = ?, user = ?, email = ?, password = ?',
  user,
  function(error, results, fields) {
    if (error){
      res.status(403).json({ message : error.sqlMessage })
    }
    if (results) {
      res.status(201).json({ 
        message : 'Utilisateur créé !',
        userPseudo: req.body.user.pseudo,
        token: jwt.sign(
          { userId: uuid },
          process.env.TOKEN_SECRET + new Date().getDate(), // TODO: remove the useless date to avoid a bug
          { expiresIn: '12h' }
        )})
    }
  })
}

exports.loginUser = (req, res, next) => {
  const email = req.body.email
  const password = req.body.password
 
  connection.query('SELECT * FROM users WHERE email= ?', 
    email, 
    function (error, results, fields) {
      if (error) {
        res.status(404).json({ error })
      }
      if (results) {
        if(results.length >= 1 && results[0].password === password) {
          res.status(200).json({ 
            message : 'Connexion établie !',
            userPseudo: results[0].user,
            privilege: results[0].privilege,
            token: jwt.sign(
              { userId: results[0].id },
              process.env.TOKEN_SECRET + new Date().getDate(),
              { expiresIn: '12h' }
            )})
        } else {
          res.status(401).json({ message : "L'email ou le mot de passe sont erronés." })
        }
      }
      if(fields) {
        console.log("User querying a connexion")
      }
    }
  )
}