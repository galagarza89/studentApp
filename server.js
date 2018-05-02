const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const MongoClient = require('mongodb').MongoClient;

const app = express();

const mongoURI = 'mongodb://galagarza89:studentdata@ds263639.mlab.com:63639/studentdata';

MongoClient.connect(mongoURI, (err, client) => {
  if (err) return console.log(err)
  db = client.db('studentdata'); // whatever your database name is
  app.listen(port)
})

app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static(__dirname));



app.get('/', (req, res) =>{
  var cursor = db.collection('students').find().toArray(function(err, results) {
    data = results;
    res.render('index');
  });
});



app.get('/student', (req, res) =>{

  inputValue = req.query.search;
  paramValue = req.query.param;
  operatorValue = req.query.operator;

  if (paramValue === 'zip') {
    if(operatorValue === '=') {
      var cursor = db.collection('students').find({[paramValue]: parseInt(inputValue)}).toArray(function(err, results) {
        data = results;
        res.render('index');
      });
    } else if (operatorValue === '!=') {

      var cursor = db.collection('students').find({[paramValue]: {'$ne': parseInt(inputValue)}}).toArray(function(err, results) {
        data = results;
        res.render('index');
      });
    } else if (operatorValue === '<') {

      var cursor = db.collection('students').find({[paramValue]: {'$lt': parseInt(inputValue)}}).toArray(function(err, results) {
        data = results;
        res.render('index');
      });
    } else {

      var cursor = db.collection('students').find({[paramValue]: {'$gt': parseInt(inputValue)}}).toArray(function(err, results) {
        data = results;
        res.render('index');
      });
    }
  } else { 

    if(operatorValue === '=') {
      var cursor = db.collection('students').find({[paramValue]: inputValue}).toArray(function(err, results) {
        data = results;
        res.render('index');
      });
    } else if (operatorValue === '!=') {

      var cursor = db.collection('students').find({[paramValue]: {'$ne': inputValue}}).toArray(function(err, results) {
        data = results;
        res.render('index');
      });
    } else if (operatorValue === '<') {

      var cursor = db.collection('students').find({[paramValue]: {'$lt': inputValue}}).toArray(function(err, results) {
        data = results;
        res.render('index');
      });
    } else {

      var cursor = db.collection('students').find({[paramValue]: {'$gt': inputValue}}).toArray(function(err, results) {
        data = results;
        res.render('index');
      });
    }
  }

});








