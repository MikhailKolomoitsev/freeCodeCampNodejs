var express = require('express');
var app = express();
require('dotenv').config()

const publicRoute = __dirname + '/public'
app.use("/public", express.static(publicRoute));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`)
  next()
})

console.log('Hello World')

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
})

app.get('/json', (req, res, next) => {
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    res.json({ "message": "HELLO JSON" });
    next()
  }
  res.json({ "message": "Hello json" });
})






























module.exports = app;
