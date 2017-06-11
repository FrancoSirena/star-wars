require('babel-register');

var express = require('express');
var Router = require('react-router');
var ReactDOM = require('react-dom');
var React = require('react');
var mongoose = require('mongoose');
var axios = require('axios');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var config = require('./config');

app.set('port', process.env.PORT || 2999);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/views');
app.set("view options", {layout: false});
app.use(express.static(__dirname + '/views'));

var urlSwapi = 'http://swapi.co';

app.get('/api/films', function(req, res, next) {
    axios.get(urlSwapi.concat('/api/films/'))
        .then(function(data) {
            res.send(data.data.results.sort(function (a, b) {
                    return a.episode_id - b.episode_id;
            }));
        });
});


app.get('/', function(req, res) {
    res.render('index.html');
});

mongoose.Promise = require('bluebird');
mongoose.connect(config.database);
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

var server = require('http').createServer(app);

server.listen(app.get('port'), function() {
    console.log('Listening port 2999')
});