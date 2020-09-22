const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient


const connectionString = "mongodb+srv://rodrigo:123@cluster.xjvb8.mongodb.net/crud-nodejs?retryWrites=true&w=majority"

app.use(bodyParser.urlencoded({ extended: true }))

/*MongoClient.connect(uri, (err, client) => {
  if (err) return console.error(err)
  console.log('Connected to Database')
  db = client.db('crud-nodejs')

  
  
})*/

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')

    const db = client.db('crud-nodejs')
    const quotesCollection = db.collection('quotes')

  app.set('view engine', 'ejs')

  app.get('/', (req, res) => {
    db.collection('quotes').find().toArray()
      .then(results => {
        res.render('index.ejs', { quotes: results })
        //console.log(results)
      })
      .catch(error => console.error(error))
      
  })

  app.listen(3000, function() {
    console.log('listening on 3000')
  })

  /*app.post('/show', (req, res) => {
    console.log('req.body')
  })*/

  
app.post('/quotes', (req, res) => {
  quotesCollection.insertOne(req.body)
    .then(result => {
      res.redirect('/')
    })
    .catch(error => console.error(error))
})
  
})
