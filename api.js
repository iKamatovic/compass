var express = require('express');
var moment = require('moment');
var twitter = require('./connectors/twitter');
var router = express.Router();

router.get('/api/tweets/:latitude/:longitude', function(req, res) {
    var query = defaults({geocode: req.params.latitude + ',' + req.params.longitude + ',0.1km'});

    twitter.get(query, function(error, result){
        if (error) return res.send(500, error);

        var tweets = result.statuses.filter(function(tweet) {
            return tweet.geo && parseInt(moment(tweet.created_at).format('X'), 10) <= parseInt(moment(query.until).subtract(1, 'd').format('X'), 10);
        });

        res.send(tweets);
    });
});

router.get('/api/tweets', function(req, res) {
    var query = defaults(req.query);

    twitter.get(query, function(error, result) {
        if (error) return res.send(500, error);

        var tweets = result.statuses.filter(function(tweet) {
            return tweet.geo && parseInt(moment(tweet.created_at).format('X'), 10) <= parseInt(moment(query.until).subtract(1, 'd').format('X'), 10);
        });

        res.send(tweets);
    });
});

var defaults = function(query) {
    var def = {geocode: '52.5167,13.3833,0.1km', until: moment().format('YYYY-MM-DD HH:mm'), count: 100};

    if (typeof query !== 'undefined') {
        Object.keys(query).forEach(function(key) {
            def[key] = (!query[key].match(/^[\d]{4}-[\d]{2}-[\d]{2}/)) ? query[key] : moment(query[key]).add(1, 'd').format('YYYY-MM-DD HH:mm');
        });
    }

    return def;
};

module.exports = router;