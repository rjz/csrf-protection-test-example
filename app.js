var express = require('express');
var session = require('express-session');
var jsonBodyParser = require('body-parser').json;
var lusca = require('lusca');
var http = require('http');

var app = module.exports = express();

// all environments
app.set('port', process.env.PORT || 3000);

app.use(jsonBodyParser({
  extended: false
}));

app.use(session({
  secret: 'ssh, don\'t tell!'
}));

app.use(lusca({
  csrf: true
}));

app.get('/register', function (req, res, next) {
  res.status(200).send([
    '<html>',
    '<body>',
    '<input type="hidden" name="_crsf" value="' + res.locals._csrf + '" />',
    '</body>',
    '</html>'
  ].join(''));
});

app.post('/register', function (req, res, next) {
  res.sendStatus(201);
});

http.createServer(app).listen(app.get('port'), function () {
  console.log('listening');
});

