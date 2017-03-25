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
const jwt = require('jsonwebtoken');
const secret_key = 'secret_key';
const moment = require('moment');

const createToken = require('./util/createToken');
const expireTime = moment().unix() + 20; //expire in 20 seconds for testing
const parse = require('./util/parse');

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

  
  //console.log('CHECK-SESSION req.body', req.body);
 //const sessionToken = req.body.sessionToken;
 console.log('REQ HEADERS:', req.headers);
 console.log('CHECK-SESSION req.headers.authorization', req.headers.authorization);
 //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaHJpcyI6MSwiaWF0IjoxNDkwNDM0MDk0fQ.7in_o64sniV5x-4zUMiXLUn3-EM_FwYZFy_rQC11hHc

 jwt.verify(req.headers.authorization.slice(7), secret_key, (err, result) => {
  if (err) {
    console.log('JWT VERIFY ERROR', err);
    return res.status(401).end();
  }

  if (result) {
    console.log('result', result);
    console.log('result.jwt_username', result.jwt_username);
    redisClient.get(result.jwt_username, (err, reply) => {
  //redisClient.get(req.authorization.username of token?, (err, reply) => {
    // NEED TO FIGURE OUT A WAY TO READ USERNAME FROM JWT IN REQ HEADERS TO QUERY FOR THAT USERNAME
    // IN REDIS DB
    console.log('REPLY from REDIS session query:', reply);
      if (err) {
        console.log('redisClient error:', err);
        res.status(401).end();
      } else {

        // if the token of the give username (key) in redis matches the 
        // session token sent in the request body, session is good.
        //if (reply === sessionToken) {
        if (reply === result.jwt_user_id) {
          console.log('sesssionn matches yo');
          res.status(200).json({});
        } else {
          console.log('sessssio does not match yo');
          res.status(401).json({});
        }
      }
    });
  } else {
    res.status(401).json({});
  }
 });

  // redisClient.get(req.body.sessionUsername, (err, reply) => {
  // //redisClient.get(req.authorization.username of token?, (err, reply) => {
  //   // NEED TO FIGURE OUT A WAY TO READ USERNAME FROM JWT IN REQ HEADERS TO QUERY FOR THAT USERNAME
  //   // IN REDIS DB
  //   console.log('REPLY from REDIS session query:', reply);
  //   if (err) {
  //     console.log('redisClient error:', err);
  //     res.status(401).end();
  //   } else {

  //     // if the token of the give username (key) in redis matches the 
  //     // session token sent in the request body, session is good.
  //     if (reply === sessionToken) {
  //       console.log('sesssionn matches yo');
  //       res.status(200).json({});
  //     } else {
  //       console.log('sessssio does not match yo');
  //       res.status(401).json({});
  //     }
  //   }
  // });
});

app.get('/query', (req, res) => {     //this is fired from React on a regular interval, returns the
  let a = req.headers['username'];    //db table matching the logged in users username 
  db.query("SELECT * FROM " + a + "s", { type: db.QueryTypes.SELECT})
      .then(function(users) {
      res.json(users);
      })
});

app.post('/setdata', function(req, res) {
  let action = req.body.Command.toUpperCase();  // grab the type of command from the incoming request
  let user = req.body.User;                     // grab the username from the incoming request
  console.log('I POSTED TOO!');
  if (!user) {
    res.send('No User ERROR')                    //if there is no user something is fucked up
  }
  let userTable;                              
  switch(action){                                 //act according to the command that was given

    case 'WRITE':
      let data = parse(req.body.body);                //parse (defined below) returns a Sequelize Model Object with the same keys and sequelize dataType values (eg {name: 'mike'} => {name: Sequelize.STRING})
      userTable = db.define(user, data)        //creates a table called the user's username using the Model created in the previous line of code
      // console.log(data);
      db.sync({ force: false }).then(function () {   
        return userTable.create(JSON.parse(req.body.body));  //places table in db and then creates a new entry in the table with user submitted data
      });

      break;

    case 'READ':          
      db.query("SELECT * FROM " + user + "s", { type: db.QueryTypes.SELECT})
      .then(function(users) {
      res.send(users);                //returns the entire table matching the user's username
      })

      break;

    default: 

    res.send('Invalid Command');    //if command not found return error message

  }

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
  const queryObj = {
    username
  }
  let userId;

  User.findOne({
    where: queryObj
  })
  .then((result) => {
    console.log('result for User.findOne:', result.dataValues);
    userId = result.dataValues.id;
    bcrypt.compare(req.body.password, result.dataValues.password, (err, result) => {
      if (err) {
        console.log('compare ERR:', err);
        res.send(err);
      }
      else {
        console.log('compare RESULT:', result);

        // Create session token, save in redis
        const token = createToken(username, userId);
        console.log('sessinnn token',token);
        redisClient.set(username, token, (err, reply) => {
          
          if (err) {
            console.log('redis set error', err);
            return res.status(500).send();
          } else if (reply) {
            console.log('there is a reply forcomparing bcrypted pw', reply);
            console.log('REDIS CLIENT GET UN', redisClient.get(username));
            redisClient.expireat(username, expireTime);
            res.json({ username, token });
          } else {
            res.status(500).send();
          }
        });
        //res.send(result);
      }
    });
  }).catch((err) => {
    console.log('username query error:', err);
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

app.listen(8080, () => {
  console.log("Listening at PORT 8080");
});