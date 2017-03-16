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
const moment = require('moment');

const createToken = require('./util/createToken');
const expireTime = moment().unix() + 20; //expire in 20 seconds for testing

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

app.get('/check-session', (req, res) => {

  console.log('CHECK-SESSION req.body', req.body);
  const sessionToken = req.body.sessionToken;

  redisClient.get(req.body.sessionUsername, (err, reply) => {

    console.log('REPLY from REDIS session query:', reply);
    if (err) {
      console.log('redisClient error:', err);
      res.status(401).end();
    } else {

      // if the token of the give username (key) in redis matches the 
      // session token sent in the request body, session is good.
      if (reply === sessionToken) {
        res.status(200).end();
      } else {
        res.status(401).end();
      }
    }
  });
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

app.get('*', (req, res) => {
  //console.log('REQ URL:',req.url);
  sess = req.session;
  console.log('SESS:', sess);
  res.status(200).sendFile(path.resolve(__dirname + './../../src/static/index.html'));
});

app.post('/login', (req, res) => {
  console.log('req: ', req.body);
  const username = req.body.username;

  User.findOne({
    where: {
      username
    }
  })
  .then((result) => {
    console.log('result for User.findOne:', result.dataValues);

    bcrypt.compare(req.body.password, result.dataValues.password, (err, result) => {
      if (err) {
        console.log('compare ERR:', err);
        res.send(err);
      }
      else {
        console.log('compare RESULT:', result);

        // Create session token, save in redis
        const token = createToken(username);
        redisClient.set(username, token, (err, reply) => {
          
          if (err) {
            res.status(500).send();
          }

          if (reply) {
            redisClient.expireat(username, expireTime);
            res.json({ username, token });
          } else {
            res.status(500).send();
          }
        });
        //res.send(result);
      }
    });
  }).catch(()=>{
    res.sendStatus(401);
  });
  //res.end();
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
     
      res.json(data);
    });
  });
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

app.listen(8080, () => {
  console.log("Listening at PORT 8080");
});