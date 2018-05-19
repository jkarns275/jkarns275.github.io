var express = require('express');
var proxy = require('http-proxy-middleware');

var app = express();

app.use('/', proxy({target: 'http://cs.oswego.edu/~jkarns', changeOrigin: true}));
app.listen(8080);
