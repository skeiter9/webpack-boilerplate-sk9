const path = require('path');
const webpack = require('webpack');

const srcPath = __dirname;
const buildPath = path.join(srcPath, 'build');
const LiveReloadPlugin = require('webpack-livereload-plugin');

const env = process.env.NODE_ENV || 'development';

const config = {
    context: __dirname,
    entry: {
        app: "./app.js"
    },
    output: {
      path: buildPath,
      filename: "[name].bundle.js",
      publicPath: "/build/"
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          query: {
              cacheDirectory: true,
              presets: ['es2015', 'stage-2']
          },
          include: [srcPath],
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          loaders: [
            'style',
            'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]' ,
            'postcss'
          ],
          include: [srcPath],
          exclude: /node_modules/
        },
        {
          test: /\.jade$/,
          loaders: ['jade'],
          include: [srcPath],
          exclude: /node_modules/
        },
        {
          test: /\.(eot|ttf|svg|woff|woff2|png)$/,
          loaders: ['url?limit=80000&name=[name].[ext]'],
          include: [srcPath]
        }
      ]
    },
    postcss: function(webpack) {
      return [
        require('postcss-import')({
          addDependencyTo: webpack
        }),
        require('postcss-nesting')(),
        require('postcss-alias')(),
        require('postcss-custom-properties')(),
        require('postcss-extend')(),
        require('autoprefixer')()
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        __ENV__: JSON.stringify(env)
      })
    ]
};

if (env === 'development') {
  config.plugins.push(new LiveReloadPlugin({
    appendScriptTag: true
  }));
}

module.exports = config;
