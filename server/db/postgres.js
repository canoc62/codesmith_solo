const Sequelize = require('sequelize');

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
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
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

