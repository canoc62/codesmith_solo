const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const User = require('./../db/postgres').User;
const Game = require('./../db/postgres').Game;

app.use(express.static(__dirname + './../../src/static'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('*', (req, res) => {
  console.log('REQ URL:',req.url);
  res.status(200).sendFile(path.resolve(__dirname + './../../src/static/index.html'));
});

app.post('/', (req, res) => {
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
  User.sync().then(() => {
    const testData = {
      username: req.body.username,
      password: req.body.password
    }

    User.create(testData).then((data) => {
      console.dir(data.get());
    });
});
  //console.log('res body', res);
  //console.log('POST at home');
  res.end();
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