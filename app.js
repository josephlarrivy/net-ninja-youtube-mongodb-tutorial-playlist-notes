// need to install mongodb >>
// npm i mongodb

const express = require('express')

const app = express()

app.listen(3000, () => {
  console.log('app listening on port 3000')
})


app.get('/', (req, res) => {
  res.json({message: 'connection working'})
})

app.get('/books', (req, res) => {
  res.json({ message: 'welcome to the api' })
})