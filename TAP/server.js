var env = require('./config/environment.js');
var dbUtils = require('./dbUtils');


var express = require('express');
var app = express();
app.use(express.static('app'));


app.listen(env.port, function() {
  console.log('App is listening on port:' + env.port);
});

var cradle = require('cradle');
var dbConf = require('./config/couchdb.js');

cradle.setup({
  host: dbConf.host,
  port: dbConf.port,
  cache: true,
  raw: false,
  secure: dbConf.secure,
  auth: dbConf.auth,
  retries: 3,
  retryTimeout: 30 * 1000
});

var dbConnection = new cradle.Connection();
var db = dbConnection.database(dbConf.dbName);


var url = 'http://' + dbConf.auth.username + ':' + dbConf.auth.password + '@'+  dbConf.host + ':' + dbConf.port;
console.log(url);

setupDb(function (db) {
    
});

module.exports = function(app, db, next) {

};

function setupDb (done) {
  console.log('Seting up the DB');
  db.exists(function (err, exists) {
    if (err) {
      console.log('error creating db', err.message, err)
      console.log('exiting!')
      process.exit(1)
    } else if (exists) {
      console.log('db exists, updating views,')
      dbUtils.createViews(db, function () {
        done(db)
      })
    } else {
      console.log(' database does not exist yet. creating.')

      db.create()

      setTimeout(function () {
        dbUtils.createViews(db, function () {
          done(db)
        }, 1000)
      })
    }
  })
}

 var bodyParser = require('body-parser');
 var multer = require('multer'); // v1.0.5
 var upload = multer(); // for parsing multipart/form-data
 
 app.use(bodyParser.json()); // for parsing application/json
 app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/views/:designName/:viewName', function(req, res) {
  var designName = req.params.designName;
  var viewName = req.params.viewName;
  var resolvedViewName = designName + "/" + viewName;
 
  db.view(resolvedViewName, req.query, function(err, body) {
    if (!err) {
      res.send(body);
    } else {
      res.send(err);
    }
  });
});


app.post('/api/save', function(req, res) { 
  var data = req.body;
  db.save(data, function(err, body) {
    if (!err) {
      res.send(body);
    } else {
      res.send(err);
    }
  });
});

app.post('/api/delete/:id/:revision', function(req, res) { 
  db.remove(req.params.id, req.params.revision, function (err, body) {
  if (!err) {
      res.send(body);
    } else {
      res.send(err);
    }
  });

});
