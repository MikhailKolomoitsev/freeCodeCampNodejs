// server.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.enable('trust proxy')
app.get("/api/whoami", function (req, res) {
  const headers = JSON.stringify(req.headers).split(',')
  const software = headers[9].split(':')[1].slice(1) + headers[10].slice(0, headers[10].length-1)
  const ipaddress = req.headers.connection[2]
  const language = headers[0]
  console.log()
  res.json({
    ipaddress: req.ip,
    language: language,
    software: software
  });
});


// listen for requests :)
var listener = app.listen(process.env.PORT || 3001, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
