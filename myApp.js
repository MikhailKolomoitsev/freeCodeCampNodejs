var express = require('express');
var app = express();
const publicRoute=__dirname + '/public'

// app.use(express.static(publicRoute));
app.use("/public", express.static(publicRoute));

console.log('Hello World')

app.get('/', (req, res)=> {
  res.sendFile(__dirname + '/views/index.html');
})






























 module.exports = app;
