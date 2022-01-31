var express = require('express');
var app = express();
require('dotenv').config()

const publicRoute=__dirname + '/public'

// app.use(express.static(publicRoute));
app.use("/public", express.static(publicRoute));

console.log('Hello World')

app.get('/', (req, res)=> {
  res.sendFile(__dirname + '/views/index.html');
})

app.get('/json', (req, res) => {
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    res.json({ "message": "HELLO JSON" });
    next()
  }
  res.json({ "message": "Hello json" });
})






























 module.exports = app;
