const express = require('express')
//const mysql = require('mysql')
//const connection = require('./db')
const path = require('path')

const gagsRoute = require('./routes/gags')

const app = express()

app.use(( req, res, next ) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Origin, Content, Accept, Content-Type, Authorization')
  next()
})

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/api/gags', gagsRoute)

module.exports = app