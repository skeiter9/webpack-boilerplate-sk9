var Webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('../webpack.config.js');
var path = require('path');
var port = process.env.WDS || 3051;

if (process.env.STANDALONE) {
  bundleServer();
}else {
  module.exports = bundleServer;
}

function bundleServer() {

  var bundleStart;
  var compiler = Webpack(webpackConfig);

  compiler.plugin('compile', function() {
    console.log('Bundling...');
    bundleStart = Date.now();
  });

  compiler.plugin('done', function() {
    console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
  });

  var bundler = new WebpackDevServer(compiler, {
    contentBase: 'public/',
    publicPath: '/build/',

    hot: true,

    quiet: false,
    noInfo: true,
    stats: {
      colors: true
    }
  });

  // We fire up the development server and give notice in the terminal
  // that we are starting the initial bundle
  bundler.listen(port, 'localhost', function() {
    console.log(' webpack-dev-server is running on '+ port +' port\n' +
    ' Bundling project, please wait...');
  });

};
