'use strict';

const express = require('express');
const path = require('path');

const app = express();

const isProduction = app.get('env') === 'production';
const port = isProduction ? 8080 : 3000;

app

  .get(/^\/(?!(static|build)(\/|\W)).*/, function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
  })

  .use('/static', express.static(path.resolve(__dirname, '../assets')));

if (isProduction) {

  app.use('/build', express.static(path.resolve(__dirname, '../build')));

}else {

  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpack = require('webpack');

  const compiler = webpack(require('../webpack.config.js'));

  app.use(webpackDevMiddleware(compiler, {
    contentBase: 'build/',
    publicPath: '/build/',
    hot: true,
    quiet: false,
    noInfo: true,
    stats: {
      colors: true
    }
  }));

  let bundleStart;

  compiler.plugin('compile', function() {
    console.log('Bundling...');
    bundleStart = Date.now();
  });

  compiler.plugin('done', function() {
    console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
  });

}

app.listen(port, function() {
  console.log('server is running on port ' + port);
});
