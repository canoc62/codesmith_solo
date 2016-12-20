const Sequelize = require('sequelize');

const db = new Sequelize('cs_solo_test', 'canoc', 'football', {
   //change to cs_solo once test is good
  host: 'localhost',
  dialect: 'postgres'
});

db
  .authenticate()
  .then((err) => {
    console.log('Connected to \'cs_solo\' postgres database!')
  })
  .catch((err) => {
    console.log('Unable to connect to \'cs_solo\' postgres database.');
  });

const User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
});

// User.sync().then(() => {
//   const testData = {
//     username: 'another_user',
//     password: 'password'
//   }

//   User.create(testData).then((data) => {
//     console.dir(data.get());
//   });
// });

module.exports = {
  User: User
}

