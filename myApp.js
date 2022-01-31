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


//routes
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

const middleware = (req, res, next) => {
  req.time = new Date().toString();
  next()
}
app.get('/now', middleware,
  (req, res, next) => {
    res.send({
      time: req.time
    })
  })

app.get('/:word/echo',
  (req, res, next) => {
    const word=req.params.word
    res.send({
      echo:word
    })
  })






























module.exports = app;
