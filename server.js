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
  .then(console.log('successDB'))
  .catch(e => console.log(e.message))

let urlSchema = new Schema({
  origina: { type: String, required: true },
  short: Number
})

let urlModel = mongoose.model('URL', urlSchema)

let responseObject = {}
app.post('/api/shorturl', bodyParser.urlencoded({ extended: false }), (req, res, next) => {
  let inputUrl = req.body['url']

  let urlRegex = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi)

  if (!inputUrl.match(urlRegex)) {
    res.json({ error: 'Invalid URL' })
    return
  }

  responseObject['original_url'] = inputUrl

  let newShort = 1

  urlModel.findOne({})
    .sort({ short: "desc" })
    .exec((error, result) => {
      if (!error && result !== null) {
        console.log(result);
        newShort = result.short + 1
      }
      if (!error) {
        urlModel.findOneAndUpdate(
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



app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
