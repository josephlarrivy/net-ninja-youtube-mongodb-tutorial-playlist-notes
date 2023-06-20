link to playlist: https://www.youtube.com/watch?v=ExcRbA7fy_A&list=PL4cUxeGkcC9h77dJ-QJlwGlZlTd4ecZOA

Overview:
- structure is much like JSON onject
- can store documents inside of objects

Collections and Documnets
- documents are stored in collections
- documents represent records inside of a collection
    - documents look like json (actually binary json)
    - all documents have a unique {"_id" : ObjectId("kajsdbfksd")}
    - can have nested documents and nested arrays of documents

MongoDB Compass
- can view databases, collections, and documents
- can add, delete data
- app opens with this string alrerady filled in for the URI
- mongodb://localhost:27017
- just need to click connect to start the connection
- can use this to create database with "+" icon




Example Walkthrough
- created Database Name: bookstore
- created Collecion Name: books
- click add data > insert document
- added:
{
  "title": "Name of the Wind",
  "author": "Patrick Rothfuss",
  "pages": 500,
  "genres": [
    "fantasy",
    "magical"
  ],
  "rating": 9
}
- once I added, _id : ObjectId('6490b40a68b214c5b6592e7a') was automatically added my MongoDB
- can add multiple objects at the same time, but they must be listed together in an array
  - added :
[
  {
    "title" : "The Final Empire",
    "author" : "Brandon Sanderson",
    "pages" : 450,
    "genres" : ["fantasy","dystopian"],
    "rating" : 8
  },
  {
    "title" : "The Way of Kinds",
    "author" : "Brandon Sanderson",
    "pages" : 350,
    "genres" : ["fantasy","dystopian"],
    "rating" : 9
  },
  {
    "title" : "The Call of the Weird",
    "author" : "Louis Theroux",
    "pages" : 350,
    "genres" : ["non-fiction", "strange", "comedy"],
    "rating" : 7
  }
]
- can filter:
    {rating: 9} is -> ({field:value})



MongoDB Shell in terminal:
- use command "mongosh" to open shell in terminal
- will open with 'test>'
- type "use dbname" to switch to dbname
    - can use this to open existing database
    - can also switch to a dbname even if that database does not exist yet

Shell commmands
- show dbs
    - shows all databases
- use dbname
    - switches to the database with the name dbname
- cls
    - clears screen
- show collections
    - show all of the collections in the db that currently inside
- var name = 'yoshi'
    - create a vaiable 'name' assigned to 'yoshi
- exit
    - leaves shell
- once inside of a db by using "use dbname"
    - can reference tables of the db with db.documentname
        - in bookstore example:
            use bookstore
            db.books
    - can use methods on the books collection to insert a document (the book that we want to add)
        db.books.insertOne({
            "title" : "The Color of Magic",
            "author" : "Terry Pratchett",
            "pages" : 300,
            "rating" : 7,
            "genres" : ["fantasy", "magic"]
        })
    - response with above command:
        {
            acknowledged: true,
            insertedId: ObjectId("6490ba5f86cfc002823680af")
        }
    - can add documents to a collection that does not exist
        - db.authors does not exist in example yet, but can still use .insertOne() method
        - db.authors.insertOne({"name":"Brandon Sanderson", "age":60})
        - authors will now be in the db
        - terminal response:
            {
                acknowledged: true,
                insertedId: ObjectId("6490bb6286cfc002823680b0")
            }
    - can insert many documents into a collection with .insertMany([{"title":"xxx" ...}, {"title":"zzz" ...}])

Nested Documents
- insert nested data the same as json normally works:
    - db.books.insertOne({title : "book title", reviews :
        [
            {name: "john", body: "great book"},
            {name: "mario", body: "loved it!"}
        ]
    })





Fetching Data:
- db.books.find()
    - would return the fisrt 20 books that are found
    - no criteria
    - it
        - would then interate over twenty more
- db.books.find({author: "Terry Pratchett"})
    - filters by: author: "Terry Pratchett"
- db.books.find({author: "Terry Pratchett", rating:7})
    - filters by both the author and the rating
- db.books.find({author: "Brandon Sanderson"})
    - this returns all of the fields
- db.books.find({author: "Brandon Sanderson"}, {title: 1, author: 1})
    - adding another json as a second argument limits the fields that are returned
    - in this case, only the fields title, author, and _id would be retunred
    - _id is always returned
- db.book.find({}, {title: 1, author: 1})
    - can have an empty filter as the fist agrgument and all of the books will be retunred, but the fields that are retunred can be limited
    - retunrs title and author of all books
- db.books.findOne({_id: ObjectId(aksjfakbsdvkbasdv)})
    - add arguments to filter
    - if more than one match in the database, will return the first one that it finds

Sorting and limiting data
 - db.books.find({author: "Brandon Sanderson"}).count()
    - instead of retunring the books, the .find() method allows to return an integer that is the number of books that were found
- db.books.find().limit(3)
    - limits the number that are retunred
- db.books.find().sort({title: 1})
    - this would sort by title in ascending order
- db.books.find().sort({title: -1})
    - changing to a negative number sorts by descending order
- mehtods can be changed together
    - db.books.sort({title: 1}).limit(3)
        - sorts the results and limits the number that are returned

MongoDB operators are denoted by: $

$gt, $gte, $lt, $lte operators
- db.books.find({rating: {$gt: 7}})
    - $gt is the operater that get a number greater than (but not including) a value
- db.books.find({rating: {$lt: 7}})
    - $lt is the operater that get a number less than (but not including) a value
- $gte and $lte
    - greater than / less than or equal to
- can string operators together with other operators
    - db.books.find({rating: {$gt: 7}, author: "Patrick Rothfuss"})
- the 'or' operator
    - can select item that have one value or another
    - takes an array of finters, if one of the filters matches, the item in the db is returned
    - db.books.find({$or : [{rating: 7}, {rating: 9}]})
    - db.books.find({$or : [{rating: 7}, {author: "Terry Prachett"}]})
    - db.books.find({$or : [{pages: {$lt: 300}}, {pages:{$gt: 400}}]})

$in, $nin operators (in and not in)
- db.books.find({rating: {$in: [7,8,9]}})
    - can pass an array if items, if there is a document that matches what is "in this array of [7,8,9]," return it
- db.books.find({rating: {$nin: [7,8,9]}})
    - $nin works by fetching items where their value "is not in the array of [7,8,9]"
    -  >> fetch all books that have a rating value that is anything other than 7,8,9

Querying documents that have arrays (in the values location)
- ex: {genres: [ 'fantasy', 'dystopian' ]}
- returning matches who's array includes a value:
    - finding documents that have 'fantasy' in the array 'genres'
        - db.books.find({genres: "fantasy"})
    - finding documents that have 'magic' in the array 'genres'
        - db.books.find({genres: "magic"})
    - because the value for the key genres is an array, mongo recognizes this and looks to see if any of the items in the array match, if a match is found, the document is returned
- retunring matches who's array is an exact match to a value or group of values:
    - db.books.find({genres: ["magic"]})
        - this will return any documents who's 'genres' array is exactly ["magic"]
    - db.books.find({genres: ["fantasy", "magic"]})
        - this will return any documents who's 'genres' array is exactly ["fantasy", "magic"]
- how to check an array field to check if all of a specified list of items are in the array
    - this allows to lokk for multiple items in the array, but not have it be an exact match
    - db.books.find({genres: {$all: ["fantasy", "sci-fi"]}})
- querying a nested array
    - must be set up with dot notation
    - example goes to reviews of the document and then name within reviews
    - property name must be in quotes to use dot
    - db.books.find({"reviews.name" : "luigi"})

Deleting data
- .deleteOne() will delete the first item that the db comes across that matches
    - using the _id of a document is a good way to make sure that the correct item is being deleted, but .deleteOne() can be used with ant matchers
    - db.books.deleteOne({_id: ObjectId("wvqwvqwerv")})
- .deleteMany() can be used to delete many items
    - db.books.deleteMany({author: "Terry Pratchett"})
    - this will look at all books and delete all of them that have the author "Terry Pratchett"

Updating documents
- .updateOne()
    - takes two arguments
        - first is used to find
            - if argument is not unique, will update the first one
        - second is used to update
            - uses the operator: {$set: }
        - can comma separate multiple field to update in the found document
    - updating one field:
        - db.books.updateOne({_id: ObjectId("xxxxxxxx)}, {$set: {rating: 8}})
    - updating two fields:
        - db.books.updateOne({_id: ObjectId("xxxxxxxx)}, {$set: {rating: 8, pages: 360}})