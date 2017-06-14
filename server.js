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
var async = require('async');

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

app.post('/api/film/', function(req, res, next) {
    var id = req.body.id;
    var films = [];
    var characters = [];
    var planets = [];
    async.waterfall([
        function(callback) {
            axios.get(urlSwapi.concat('/api/films/'+id))
                .then(function(data) {
                    callback(data.data);
                }).catch(function(err) {
                    console.log(err);
                });
        }, 
        function(result, callback) {
             callback(null, result);
            // async.every(result.characters, function(item, callback) {
            //     axios.get(item)
            //         .then(function(data) {
            //             callback(data.data);
            //         }).catch(function(err) {
            //             console.log(err);
            //         });
            // }, function(err, results) {
            //     callback(results);
            // });
        }
    ], function(e, results) {
        console.log(results);
    }
    );  
});

app.use(function(req, res) {
    res.sendFile(path.join(__dirname+'/views/index.html'));
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