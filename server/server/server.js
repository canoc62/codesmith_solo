const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const User = require('./../db/postgres').User;
const Game = require('./../db/postgres').Game;

// sessions and redis 
const redis = require('redis');
const session = require('express-session');
const redisStore = require('connect-redis')(session);
const redisClient = redis.createClient();

const bcrypt = require('bcryptjs');

app.use(session({
  secret: 'secret',
  store: new redisStore({ host: 'localhost', port: 6379, client: redisClient, ttl: 260 }),
  saveUninitialized: false,
  resave: false
}));

app.use(express.static(__dirname + './../../src/static'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


let sess;
app.get('*', (req, res) => {
  //console.log('REQ URL:',req.url);
  sess = req.session;
  console.log('SESS:', sess);
  res.status(200).sendFile(path.resolve(__dirname + './../../src/static/index.html'));
});

app.get('/player-stats', (req, res) => {
 
  console.log('REQ TO DATABASE', req);
  Game.findAll({
      where: {
        userId: null
      }
    })
    .then((result) => {
      console.log('result for Game.findOne:', result);
      //this.setState({ statsPerGame: result });
      res.send(result); //return res.send(result);
    });

    //res.end();
});

app.post('/login', (req, res) => {
  console.log('req: ', req.body);
  User.findOne({
    where: {
      username: req.body.username,
      password: req.body.password
    }
  })
  .then((result) => {
    console.log('result for User.findOne:', result);
  });
  res.end();
});

app.post('/signup', (req, res) => {
  console.log('req body', req.body);
  User.sync({ force: true }).then(() => {
    const testData = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }

    User.create(testData).then((data) => {
      //console.dir(data.get());
      //console.log('RESPONSE in server.js:', res);
      res.json(data);
    });
});
  //console.log('res body', res);
  //console.log('POST at home');
  //res.end();
});

app.post('/create-game', (req, res) => {

  Game.sync().then(() => {
    const gameData = {
      opponent: req.body.opponent,
      targets: req.body.targets,
      completionsAllowed: req.body.completionsAllowed,
      yardsAllowed: req.body.yardsAllowed,
      tdsGivenUp: req.body.tdsGivenUp
    }

    Game.create(gameData).then((data) => {
      console.dir(data.get());
    });
  });
});

app.listen(8080);