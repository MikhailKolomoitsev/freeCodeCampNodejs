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

app.get("/api/", (req, res) => {
  const date = (new Date()).getTime();
  const today = new Date();
  let utc = (new Date(today)).toUTCString();
  res.json({ unix: date, utc: utc });
});

app.get("/api/:date?", (req, res) => {

  const query = req.params.date

  if (new Date(parseInt(query)).toString() === "Invalid Date") {
    console.log("In date invalid");
    res.json({ error: "Invalid Date" });
    return;
  }
  /**
   * API retur convert 
   */
  if (query.includes('-')) {
    //console.log("OK");
    console.log("DATE-to-UNIX");
    let unix = new Date(query).getTime();
    let utc = new Date(query).toUTCString();
    res.json({ unix: unix, utc: utc });
  }
  /**
   * API return conver 
   */
  else {
    console.log("UNIX-to-DATE");
    //query = query.valueOf();
    let parse = parseInt(query);
    //console.log(parse);
    let unixTodate = new Date(parse).getTime();
    let utcToutc = new Date(parse).toUTCString();
    res.json({ unix: unixTodate, utc: utcToutc });
  }    
 
});



// listen for requests :)
var listener = app.listen(process.env.PORT || 3001, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
