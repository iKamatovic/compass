    var redis = require('redis');
    var client = redis.createClient(6379, '127.0.0.1', {});

    client.on('ready', function () {
        console.log('Redis client is ready');
    });

    client.on('error', function (err) {
        console.log('Error ' + err);
    });

    module.exports = client;