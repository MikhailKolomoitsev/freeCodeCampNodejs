require('dotenv').config();
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log('succes'))
  .catch(e => console.log(e.message))


const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
  createdAt: String
});

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  let mikhail = new Person({
    name: 'Mikhail',
    age: 26,
    favoriteFoods: ['fresh', 'watermelon', 'batat'],
    createdAt: Date.now()
  })
  mikhail.save((error, data) => {
    if (error) {
      console.log(error);
    } else {
      done(null, data)
    }
  })
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data)  {
    if (err) {
      console.log(err)
      return
    }
    done(null, data)
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName}, (err, data) => {
    if (err) {
      console.log(err.message);
      return
    }
    done(null, data);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) {
      console.log(err.message);
      return
    }
    done(null, data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, (err, data) => {
    if (err) {
      console.log(err.message);
      return
    }
    done(null, data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById({ _id: personId }, (err, person) => {
    if (err) {
      console.log(err.message);
      return
    }
    person.favoriteFoods.push(foodToAdd)
    person.save((err, updatedPerson) => {
      if (err) {
        console.log(err.message);
        return
      }
      done(null, updatedPerson);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, data) => {
    if (err) {
      console.log(err.message);
      return
    }
    done(null, data);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId , (err, data) => {
    if (err) {
      console.log(err.message);
      return
    }
    done(null, data);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
