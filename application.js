var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var api = require('./api');

var app = express();

app.set('address', 'localhost');
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', api);
app.get('/', function(req, res) { res.sendfile('./views/index.html'); });

module.exports = app;