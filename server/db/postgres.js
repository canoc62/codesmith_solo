const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

const SALT_WORK_FACTOR = 10;

const db = new Sequelize('cs_solo_test', 'canoc', 'football', {
   //change database to cs_solo instead of cs_solo_test once test is good
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
    type: Sequelize.STRING,
    unique: true
  },
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  password: {
    type: Sequelize.STRING
  },
  token: {
    type: Sequelize.STRING
  }
}
// , {
//   hooks: {
//     beforeCreate: function(user) {
//       bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
//         if (err) return err;
//         bcrypt.hash(user.password, salt, (err, hash) => {
//           user.set('password', hash);
//         }) 
//       });
//     }
//   }  
// }
);
User.beforeCreate(function(user, options, callback) {
  user.email = user.email.toLowerCase();

  return bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return err;
    bcrypt.hash(user.get('password'), salt, (err, hash) => {
      //user.set('password', hash);
      if (err) console.log('HASH ERROR');
      // console.log('HASH:', hash);
      user.password = hash;
      // console.log('USER.PASSWORD', user.password);
      // console.log('USER', user);
      return callback(null, options);
    }); 
  });
});

const Game = db.define('game', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement : true
  },
  opponent: {
    type: Sequelize.STRING
  },
  targets: {
    type: Sequelize.INTEGER
  },
  completionsAllowed: {
    type: Sequelize.INTEGER
  },
  yardsAllowed: {
    type: Sequelize.INTEGER
  },
  tdsGivenUp: {
    type: Sequelize.INTEGER
  }
});

User.hasMany(Game, {as: 'Game'});

module.exports = {
  User: User,
  Game: Game
}