// need to install mongodb >>
// npm i mongodb

const express = require('express');
const { ObjectId } = require('mongodb');

// import connection from db.js file
const { connectToDb, getDb } = require('./db')

const app = express()
app.use(express.json())

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

// this route fetches all books
app.get('/books', (req, res) => {
  let books = [];
  // db.collection() is a function
  // db.collection() method is used to reference a specific collection in the database
  db.collection('books')
    // once connection is made, methods can be used on it (see markdown file with notes on how to interact with db from the command line)
    // in the shell, the find method returned all of the documents, but acts differently here
    // when using the find method in an application, the find method returns a cursor
    // the cursor is an object that points to a set of documents outlined by our query
      // if no arguments, points to whole collection of documents
    // the cursor object that is returned has methods that can be used to fetch the data that the cursor is pointing to
      // methods on the cursor object:
        // toArray - fetches all documents that the cursor is pointing to and returns them in an array
        // forEach - allows to iterate over all documents that the cursor is pointing to and allows to process each one individually
    // documents are fetched in batches, not all at once
      // forEach acts of each document in the batch then moves to the next batch and acts of each pf those
    .find()
    // sort also returns a cursor object
    .sort({author: 1})
    // can iterate each book
    // this piece is async because we are talking to the db and fetching batches of documents
    .forEach(book => books.push(book))
    // use then because asunc
    .then(() => {
      res.status(200).json(books)
    })
    .catch(() => {
      res.status(500).json({error: 'could not fetch the documents'})
    })
})

// use '6490b40a68b214c5b6592e7a' for this example
app.get('/books/:id', (req, res) => {
  const { id } = req.params
  // ObjectId.isValid(id) checks is id is of a valid length and coding type, not whether or not it exists in the database
  // this entire route will return 'null' if the id does not match a document in the database
  if (ObjectId.isValid(id)) {
    db.collection('books')
      .findOne({ _id: new ObjectId(id) })
      .then(doc => {
        res.status(200).json(doc)
      })
      .catch(() => {
        res.status(500).json({ error: 'could not find doc with that id' })
      })
  } else {
    res.status(500).json({error: 'not a valid document id'})
  }
})

app.post('/books', (req, res) => {

  const book = req.body

  db.collection('books')
    .insertOne(book)
    .then(result => {
      res.status(201).json(result)
    })
    .catch(err => {
      res.status(500).json({error: 'could not create document'})
    })
})

app.delete('/books/:id', (req, res) => {

  const { id } = req.params

  if (ObjectId.isValid(id)) {
    db.collection('books')
      .deleteOne({ _id: new ObjectId(id) })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(() => {
        res.status(500).json({ error: 'could not delete doc with that id' })
      })
  } else {
    res.status(500).json({ error: 'not a valid document id' })
  }
})

app.patch('/books/:id', (req, res) => {

  const { id } = req.params
  const updates = req.body

  if (ObjectId.isValid(id)) {
    db.collection('books')
      // using updateOne like this will change any fields that are in the updates variable, but leave alone any field that are not specified in the variable
      .updateOne({ _id: new ObjectId(id) }, {$set : updates})
      .then(result => {
        res.status(200).json(result)
      })
      .catch(() => {
        res.status(500).json({ error: 'could not update doc with that id' })
      })
  } else {
    res.status(500).json({ error: 'not a valid document id' })
  }
})
