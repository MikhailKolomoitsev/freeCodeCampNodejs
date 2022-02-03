require('dotenv').config();
const bodyParser = require('body-parser')
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});


mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })


let urlSchema = new mongoose.Schema({
  original: { type: String, required: true },
  short: Number
})
let Url = mongoose.model('Url', urlSchema)
let responseObject = {}
app.post('/api/shorturl', bodyParser.urlencoded({ extended: false }),  (req, res, next) => {
  let inputUrl = req.body['url']
  responseObject['original_url'] = inputUrl

  let urlRegex = new RegExp(/^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?:: (\d +)) ? (?: \/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/)
  
  if (!inputUrl.match(urlRegex)) {
    res.json({ error: 'invalid url' })
    return
  }

  let newShort = 1

  Url.findOne({})
    .sort({ short: "desc" })
    .exec( (error, result) => {
      if (!error && result !==undefined) {
        newShort = result.short + 1
      }
      if (!error) {
         Url.findOneAndUpdate(
          { original: inputUrl },
          { original: inputUrl, short: newShort },
          { new: true, upsert: true },
          (err, data) => {
            if (!err) {
              responseObject['short_url'] = data.short
              res.json(responseObject)
            }
          }
        )
      }
    })
})

app.get('/api/shorturl/:number', (req, res) => {
  let input = req.params.number

  Url.findOne({ short: input }, (error, result) => {
    if (!error && result !== undefined) {
      res.redirect(result.original)
    } else {
      res.json('URL not Found')
    }
  })
})



app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
