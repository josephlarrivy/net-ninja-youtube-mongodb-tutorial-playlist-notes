// need to install mongodb >>
// npm i mongodb

const express = require('express')

// import connection from db.js file
const { connectToDb, getDb } = require('./db')

const app = express()

// connection to database
let db;
// passing in a callback funciton ('cb' in functions in db.js file) that will fire after successful connection or error
// if connection is successful, err is null. In db.js we do not pass an argument in the connection is a success
connectToDb((err) => {
  // if !err there is a good connection to db and we should start listening
  if (!err) {
    app.listen(3000, () => {
      console.log('app listening on port 3000')
    })
    // we will use db to interact with database in this file
    db = getDb()
  }
})





// routes

app.get('/', (req, res) => {
  res.json({message: 'connection working'})
})

app.get('/books', (req, res) => {
  res.json({ message: 'welcome to the api' })
})