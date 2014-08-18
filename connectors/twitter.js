var Buffer = require('buffer').Buffer;
var HTTPS = require('https');
var querystring = require('querystring');
var extend = require('util')._extend;
var crypto = require('crypto');
var moment = require('moment');
var redis = require('./redis');

var Twitter = function(options) {
    var self = this;

    this.token = null;
    this.credentials = new Buffer(options.consumerKey.concat(':', options.consumerSecret)).toString('base64');

    this.auth();
};

Twitter.prototype.auth = function() {
    var self = this;

    var request = HTTPS.request({
        hostname: 'api.twitter.com',
        path: '/oauth2/token?grant_type=client_credentials',
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + this.credentials,
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    }, function(response) {

        var token = '';
        response.setEncoding('utf8');

        response.on('data', function (chunk) {
            token += chunk;
        });

        response.on('end', function () {
            self.token = JSON.parse(token);
        });

    });

    request.end();
};

Twitter.prototype.get = function(query, cb) {
    var self = this;

    query = self.validateQuery(query);
    var hash = crypto.createHash('md5').update(JSON.stringify(query)).digest('hex');

    redis.get(hash, function(error, result){
        if (error || result) return cb(error, JSON.parse(result));

        var request = HTTPS.request({
            hostname: 'api.twitter.com',
            path: '/1.1/search/tweets.json?' + querystring.stringify(query),
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + self.token.access_token
            }
        }, function(response) {

            var data = '';
            response.setEncoding('utf8');

            response.on('data', function (chunk) {
                data += chunk;
            });

            response.on('end', function () {
                cb(null, JSON.parse(data));
                redis.setex(hash, 60, data); // set to 1 day
            });

        });

        request.on('error', function(error) {
            cb(error);
        });

        request.end();
    });
};

Twitter.prototype.validateQuery = function(query) {
    query = extend({}, query);
    query.until = moment(query.until).format('YYYY-MM-DD');
    return query;
};

module.exports = new Twitter({consumerKey: 'lXHUzZ4F9PGbMPUGtCKWtY5E1', consumerSecret: 'ew4pzE9tnHWZvBawJPzAAMGYLbqZPqAl8GPfFtGI5KIPuGy5Qo'});