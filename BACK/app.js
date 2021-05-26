const express = require('express')
const path = require('path')

const gagsRoute = require('./routes/gags')
const commentsRoute = require('./routes/comments')

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
app.use('/api/comments', commentsRoute )

module.exports = app