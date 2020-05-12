const express = require('express')
const app = express()

app.get('/', function(req, res) {
    res.send("Home Page")
});

console.log("TODO App has been initiated");
app.listen(81);