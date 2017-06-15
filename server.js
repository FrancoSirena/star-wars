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
    var returnData = {data: {}, planets: [], characters: []};
    async.waterfall([
        function(callback) {
            axios.get(urlSwapi.concat('/api/films/'+id))
                .then(function(data) {
                    returnData.data = data.data;
                    callback(null, data.data);
                }).catch(function(err) {
                    callback(err);
                });
        }, 
        function(result, callback) {
            async.parallel([function(callbackParalel) {
                                var characters = [];
                                async.each(result.characters, function(item, callError) {
                                    axios.get(item)
                                        .then(function(data) {
                                            characters.push(data.data);
                                            callError();
                                        }).catch(function(err) {
                                            callError(err);
                                        });
                                        }, function(err) {
                                            callbackParalel(err, characters);
                                        })
                            },  function(callbackParalel){
                                    var planets = [];
                                    async.each(result.planets, function(item, callErrorPl) {
                                        axios.get(item)
                                            .then(function(data) {
                                                planets.push(data.data);
                                                callErrorPl();
                                            }).catch(function(err) {
                                                callErrorPl(err);
                                            });
                                            }, function(err) {
                                                callbackParalel(err, planets);
                                            })
                            }
                            ],function(err, results) {
                                callback(err, results);
                            }
            );
        }
    ], function(e, results) {
        returnData.characters = results[0];
        returnData.planets = results[1];
        if (e)
            res.sendStatus(500).send(e);
        else
                res.send(returnData);
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