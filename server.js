const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const { Schema } = mongoose
const bodyPareser = require('body-parser')
require('dotenv').config()


app.use(cors())
app.use(bodyPareser.urlencoded({ extended: true }))
app.use(bodyPareser.json())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});
mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })

const ExerciseSchema = new Schema({
  userId: { type: String, required: true },
  description: String,
  duration: Number,
  date: Date
})
const UserSchema = new Schema({
  username: String
})

const User = mongoose.model('User', UserSchema)
const Exercise = mongoose.model('Exercise', ExerciseSchema)

app.post('/api/users', (req, res) => {
  console.log(req.body);
  const newUser = new User({
    username: req.body.username
  })
  newUser.save((err, data) => {
    if (err || !data) {
      res.send("Error saving the new user")
    } else {
      res.json(data)
    }
  })
})

app.post('/api/users/:id/exercises', (req, res) => {
  const id = req.params.id
  const { description, duration, date } = req.body
  User.findById(id, (err, data) => {
    if (err) {
      res.send('User not found')
    } else {
      const newExercise = new Exercise({
        userId: id,
        description,
        duration,
        date: new Date(date)||new Date.now(),
      })
      newExercise.save((err, data) => {
        if (err) {
          console.log(err.message);
          res.send('Error of saving exercise')
        } else {
          const { description, duration, date, _id } = data
          res.json({
            username: data.username,
            description,
            duration,
            date: date.toDateString(),
            _id:data.id
          })
        }
      })
    }
  })
})

app.get('/api/users/:id/logs', (req, res) => {
  const { from, to, limit } = req.query
  const { id } = req.params
  User.findById(id, (err, userData) => {
    if (err || !userData) {
      res.send('User not found')
    } else { 
      let dateObj = {}
      if (from) {
        dateObj['$gte']=new Date(from)
      }
      if (to) {
        dateObj['$lte'] = new Date(to)
      }
      let filter = {
        userId:id
      }
      if (from || to) {
        filter.date=dateObj
      }
      let nonNullLimit=limit??1
      Exercise.find(filter).limit(+nonNullLimit).exec((err, data) => {
        if (err || !data) {
          res.json({message:'No data'})
        } else {
          const count = data.length
          const rawLog = data
          const { username, _id } = userData
          const log = rawLog.map(l => ({
            description: l.description,
            duration: l.duration,
            date: l.date.toDateString()
          }))
          res.json({username, count, _id, log})
        }
      })
    }
  })
})

app.get('/api/users', (req, res) => {
  User.find({username, _id}).exec((err, data) => {
    if (err || !data) {
      res.send('No users found')
    } else {
      res.json(data)
    }
  })
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
