var path = require('path');
var webpack = require('webpack');
const postcssImport = require('postcss-import');
const postcssNested = require('postcss-nested');
const postcssCssnext = require('postcss-cssnext');
const postcssCalc = require('postcss-calc');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    'babel-polyfill',
    './index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
    library: 'githubEmbed',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({ React: 'react' })
  ],
  postcss(webpack) {
      return [
          postcssImport({ addDependencyTo: webpack }),
          postcssNested(),
          postcssCssnext(),
          postcssCalc()
      ]
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/,
      include: __dirname
    }, {
      test: /\.css?$/,
      loaders: ['style', 'css', 'postcss'],
      include: __dirname
    }]
  }
};
