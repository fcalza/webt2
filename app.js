
var path = require('path');
const express = require('express')
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()
var db;
/*
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))


//https://api.mlab.com/api/1/databases?apiKey=gCbrbBf-fJLdHvKzd4eN_OwagUjimc5K

app.get('/', function (req, res) {
 res.sendFile(__dirname +'/index.html');
});
app.get('/', (req, res) => {
  var cursor = db.collection('quotes').find()
})

app.get('/', (req, res) => {
  res.send('Hello World')
})
*/
/*
app.get('/', function (req, res) {
 res.sendFile(__dirname +'/index.html');
});
app.get('/comercio.js', function (req, res) {
  console.log("teste comercio.js");
 res.sendFile(__dirname +'/comercio.js');
});*/

app.use(express.static('views'));

app.listen(3000, function () {
  console.log('trabalho na porta 3000 - localhost:3000');
});
/*
MongoClient.connect('mongodb://lipe.calza:KLADERAP01@ds259250.mlab.com:59250/bdweb', (err, database) => {
  if (err) return console.log(err)
    db = client.db('dbweb') // whatever your database name is


      db.collection('quotes').find().toArray(function(err, results) {
  			console.log(results)

        res.render('index.ejs', {quotes: result})
    })
  })

app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
      if (err) return console.log(err)

      console.log('Salvo')
      res.redirect('/')
    });*/
