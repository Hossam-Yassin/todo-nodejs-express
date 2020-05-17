const express = require('express')
const app = express()

var filters = require('./middleware')(app);
var routes = require('./routes')(app);

app.listen(81);
console.log("TODO App has been started");