#!/usr/bin/env node
var app = require('./application');

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});

