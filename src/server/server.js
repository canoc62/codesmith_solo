const express = require('express');
const app = express();
const webpack = require('webpack');
const path = require('path');

app.use(express.static(__dirname + './../static'));

app.get('*', (req, res) => {
  console.log(req.url);
  res.status(200).sendFile(path.resolve(__dirname + './../static/index.html'));
});
app.listen(8080);