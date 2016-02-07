const path = require('path');
const express = require('express');
const webpack = require('webpack');

const config = require('../webpack.config.dev');
const compiler = webpack(config);

express()

  .use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }))

  .use(require('webpack-hot-middleware')(compiler))

  .get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
  })

  .listen(3001, 'localhost', function(err) {
    if (err) {
      console.log(err);
      return;
    }

    console.log('Listening at http://localhost:3001');
  });
