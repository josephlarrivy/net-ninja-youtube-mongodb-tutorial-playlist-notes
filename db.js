// contains databasse connection code

// MongoClient allows connection to a databse
const { MongoClient } = require('mongodb')

// setting up connection to db
let dbConnection;
module.exports = {
  // establish connect to database
  // passing in argument 'cb' (callback) -> this is the function that we want to run after the connection has been established
  connectToDb: (cb) => {
    // connecting to a local database (async returns a promise)
    MongoClient.connect('mongodb://localhost:27017/bookstore')
      .then((client) => {
        dbConnection = client.db()
        return cb()
      })
      .catch(err => {
        console.log(err)
        return cb(err)
      })
  },
  // return the connection to the database
  getDb: () => dbConnection
}
