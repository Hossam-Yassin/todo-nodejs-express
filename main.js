const express = require('express')
const app = express()

var filters = require('./middleware')(app);
var routes = require('./routes')(app);

app.get('/', function(req, res) {
    res.send("Home Page")
});

console.log("TODO App has been started");
app.listen(81);