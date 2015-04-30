var path = require('path');
var Webpack = require('webpack');

var buildPath = path.resolve(__dirname, 'public', 'build');

var npmPath = path.join(__dirname, 'node_modules');
var bowerPath = path.join(__dirname, 'bower_components');
var appPath = path.join(__dirname, 'app');

var DEV = JSON.parse(process.env.BUILD_DEV || 'true');
var DEPLOY = JSON.parse(process.env.BUILD_DEPLOY || 'false');

var config = {
  addVendor: function(name, path_) {
    this.resolve.alias[name] = path_;
    this.module.noParse.push(new RegExp(path_));
  },
  devtool: 'eval',
  entry: {
    app: [
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:8080',
      './app/app'
    ]
  },
  output: {
    filename: 'bundle.js',
    path: buildPath,
    publicPath: '/build/',
    chunkFilename: '[name]-[id]-[chunkhash].js'
  },
  module: {
    noParse: [],
    preLoaders: [
      {
        test: /src\/([a-z_-]*\/|[a-z_-]+)\.js$/,
        loader: 'jscs'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'ng-annotate!babel',
        include: /app\//,
        exlude: [/node_modules|bower_components/]
      },
      {test: /\.jade$/, loader: 'jade'},
      {test: /\.css$/, loader: 'style!css'},
      {test: /\.scss$/, loader: 'style!css!sass'},
      {test: /\.styl$/, loader: 'style!css!stylus'},
      {test: /\.(png|jpg|jpeg|woff|woff2)$/, loader: 'url', query: {limit: 100000, name: '[name].[ext]'}}
    ]
  },
  plugins: [
    new Webpack.DefinePlugin({
      __DEV__: DEV,
      __DEPLOY__: DEPLOY
    }),
    new Webpack.HotModuleReplacementPlugin()
    //new Webpack.optimize.CommonsChunkPlugin({
      //name: 'vendor',
      //filename: 'vendor.bundle.js'
    //})
  ],
  resolve: {
    alias: [],
    extensions: [
      '',
      '.js',
      '.jade',
      '.scss',
      '.styl'
    ],
    modulesDirectories: ['node_modules']
  }
};

if (DEPLOY) {
  config.entry.app = './app/app';
  config.devtool = 'source-map'
}

module.exports = config;
