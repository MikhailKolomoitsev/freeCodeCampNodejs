// server.js
// where your node app starts

// init project
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

app.get("/api/", function (req, res) {
  res.json({ 'unix': Date.now(), 'utc': Date() });
});

app.get("/api/", function (req, res) {
  res.json({ 'unix': Date.now(), 'utc': Date() });
});

app.get("/api/:date", (req, res) => {
  let dateString = req.params.date;

  if (!isNaN(Date.parse(dateString))) {
    let dateObject = new Date(dateString);
    res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });
  } else if (/\d{5,}/.test(dateString)) {
    let dateInt = parseInt(dateString);
    res.json({ unix: dateInt, utc: new Date(dateInt).toUTCString() });
  } else {
    res.json({ error: "Invalid Date" });
  }

});

// app.get("/api/:date?", function (req, res) {

//   const date = req.params.date

//   if (date ===undefined) {
//     const date = (new Date()).getTime();
//     const today = new Date();
//     let utc = (new Date(today)).toUTCString();
//     res.json({ unix: date, utc: utc });
//     return;
//   }

//   if (new Date(parseInt(date)).toString() === "Invalid Date") {
//     res.json({ error: "Invalid Date" });
//     return;
//   } else if (date.includes('-')) {
//     let unix = new Date(date).getTime();
//     let utc = new Date(date).toUTCString();
//     res.json({ unix: unix, utc: utc });
//   } else {
//     let date_string = parseInt(date);
//     let unix = new Date(date_string).getTime();
//     let utc = new Date(date_string).toUTCString();
//     if (date.length === 13) {
//       res.json({ unix: unix, utc: utc });
//     }
//   }
 
// });



// listen for requests :)
var listener = app.listen(process.env.PORT || 3001, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
