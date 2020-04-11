const mongoose = require('mongoose');

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2];
const url =
  `mongodb+srv://fullstack:${password}@fs2020-2cub8.gcp.mongodb.net/test?retryWrites=true`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});
const Person = mongoose.model('person', personSchema, 'people');

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) {
    console.log('conection error');
  }
  else {
    if (process.argv.length === 3 ) {
      Person.find({}).then(persons => {
        console.log('Phonebook:')
        persons.forEach(p => console.log(`${p.name} ${p.number}`));
        mongoose.connection.close( () => process.exit(1));
      })
    }
    else if (process.argv.length === 5 ){
      const newPerson = new Person({
        name: process.argv[3],
        number: process.argv[4]
      });
      newPerson.save((err) => {
        if(err){
          console.log(err);
        }
        else {
          console.log('person saved!')
        }
        mongoose.connection.close( () => process.exit(1));
      });
    }
    else {
      console.log('invalid number of arguments')
      process.exit(1)
    }
  }


})
