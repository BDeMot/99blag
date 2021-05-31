const connection = require('../db')
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken')

exports.addUser = (req, res, next) => {
  const uuid = uuidv4();
  const user = [
  uuid,
  req.body.user.pseudo,
  req.body.user.email,
  req.body.user.password ]

  console.log(uuidv4())
 connection.query('INSERT INTO users SET id = ?, user = ?, email = ?, password = ?',
  user,
  function(error, results, fields) {
    if (error){
      res.status(400).json({ error })
    }
    if (results) {
      res.status(201).json({ 
        message : 'Utilisateur créé !',
        userId: uuid,
        token: jwt.sign(
          { userId: uuid },
          process.env.TOKEN_SECRET + new Date().getDate(),
          { expiresIn: '2h' }
        )})
    }
  })
}