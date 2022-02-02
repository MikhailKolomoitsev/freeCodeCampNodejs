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

let Url = mongoose.model('Url', urlSchema)
let responseObject = {}
app.post('/api/shorturl/', bodyParser.urlencoded({ extended: false }), (req, res, next) => {
  responseObject['original_url']=req.body['url']
  console.log(req.body);
  res.json(responseObject)
})



app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
