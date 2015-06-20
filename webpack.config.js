var path = require('path');
var Webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var srcPath = path.join(__dirname, 'src');
var buildPath = path.join(__dirname, 'build');

var npmPath = path.join(__dirname, 'node_modules');
var bowerPath = path.join(__dirname, 'bower_components');

var DEV = JSON.parse(process.env.BUILD_DEV || 'true');
var DEPLOY = JSON.parse(process.env.BUILD_DEPLOY || 'false');

var config = {
  addVendor: function(name, path_) {
    this.resolve.alias[name] = path_;
    this.module.noParse.push(new RegExp(path_))
  },
  context: srcPath,
  debug: true,
  devtool: 'cheap-source-map',
  entry: {
    app: [
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:' +
      (process.env.WDS || 3051),
      './app'
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: buildPath,
    publicPath: '/build/',
    chunkFilename: '[id]-chunk.js',
    pathinfo: true
  },
  module: {
    noParse: [],
    preLoaders: [
      {test: /\.js$/, loaders: ['jscs'],
        exclude: /node_modules|bower_components|api-lb/},
      {test: /\.js$/, loaders: ['source-map']}
    ],
    loaders: [
      {test: /\.css$/, loader: 'style!css'},
      {test: /\.styl$/, loader: 'style!css?sourceMap!stylus?sourceMap'},
      {test: /\.scss$/, loader: ExtractTextPlugin.extract('style',
        'css?sourceMap!sass?sourceMap&sourceComments&includePaths[]=' +
        bowerPath)},
      {test: /\.jade$/, loader: 'jade'},
      {test: /\.(png|jpg|jpeg)$/,
          loader: 'url?limit=20000&name=assets/[name].[ext]!img?' +
            'minimize&progressive=true'},
      {test: /\.(woff|woff2)$/, loader: 'url?limit=100000&name=[name].[ext]'}
    ]
  },
  plugins: [
    new Webpack.DefinePlugin({
      __DEVELOPMENT__: DEV,
      __PRODUCTION__: DEPLOY
    }),
    new Webpack.ProvidePlugin({
      angular: 'exports?window.angular!angular/angular.min'
    }),
    new Webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js',
      minSize: 50
    }),
    new ExtractTextPlugin('[name].css')
  ],
  resolve: {
    root: [path.join(__dirname, 'app')],
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

if (DEV) {
  config.plugins.unshift(new Webpack.HotModuleReplacementPlugin());
}

if (DEPLOY) {

  config.entry.app = './app';
  config.debug = false;
  config.devtool = 'source-map';
  config.output.pathinfo = false;

  config.plugins.push(new Webpack.optimize.UglifyJsPlugin());
  config.plugins.push(new Webpack.optimize.MinChunkSizePlugin(100));

}

//config.addVendor('angularMin',
//  npmPath + '/angular/angular.min');

module.exports = config;
