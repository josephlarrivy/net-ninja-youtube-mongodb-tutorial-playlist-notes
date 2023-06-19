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
    "genres" : ["non-fiction","strange", "comedy"],
    "rating" : 7
  }
]
 - can filter:
    {rating: 9} is -> ({field:value})



MongoDB Shell in terminal:
- use command "mongosh" to open shell in terminal
- will open with 'test>'
- type use dbname to switch to dbname
    - can use this to open existing database
    - can also switch to a dbname even if that database does not exist yet
    