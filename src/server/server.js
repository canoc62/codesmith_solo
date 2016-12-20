const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const User = require('./../db/postgres').User;

app.use(express.static(__dirname + './../static'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('*', (req, res) => {
  console.log(req.url);
  res.status(200).sendFile(path.resolve(__dirname + './../static/index.html'));
});

app.post('/', (req, res) => {
  console.log('POST at login');
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

app.listen(8080);