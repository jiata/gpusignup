var express = require('express');
var router = express.Router();

var documentClient = require('documentdb').DocumentClient;
var config = require('../config');
var client = new documentClient(config.endpoint, { "masterKey": config.primaryKey });

function getCollectionLength(path, cb) {
  client.readDocuments(path).toArray(function(err, results) {
    if (err) {
      console.log(err);
    } else {
      cb(results.length);
    }
  }); 
}

function putDocument(path, index, data, cb) {
  client.createDocument(path, { id: index, content: data }, function(err, doc) {
    if (err) { 
      console.log(err); 
    } else {
      cb(doc);
    }
  }); 
}

/* serve the route / */
router.get('/', function(req, res, next) {
  if (req.mobile == true) {
    res.render('index', { mobile: "true" });
  } else {
    res.render('index', { mobile: "false" });
  }
});

/* serve the endpoint /submit */
router.get('/submit', function(req, res) {
  var data = {
    datetime: (new Date()).toString(),
    firstname: req.query.firstname,
    lastname: req.query.lastname,
    email: req.query.email,
    organization: req.query.organization,
    vminstance: req.query.vminstance
  }
  
  var path = 'dbs/gpudb/colls/subscribers';
  getCollectionLength(path, function(length) {
    putDocument(path, length.toString(), data, function(doc) {
      console.log("successfully added document to collection!");      
      res.sendStatus(200);
    });
  });
});

module.exports = router;
