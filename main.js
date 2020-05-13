const express = require('express')
const app = express()

var filters = require('./middleware')(app);
var routes = require('./routes')(app);

console.log("TODO App has been started");
app.listen(81);