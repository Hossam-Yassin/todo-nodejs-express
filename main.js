const express = require('express')
const app = express()

var routes = require('./routes')(app);

console.log("TODO App has been initiated");
app.listen(81);