var path = require('path');
var webpack = require('webpack');
const postcssImport = require('postcss-import');
const postcssNested = require('postcss-nested');
const postcssCssnext = require('postcss-cssnext');
const postcssCalc = require('postcss-calc');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    'babel-polyfill',
    './src/index',
    './src/css/style.css'
  ],
  output: {
    path: path.join(__dirname, 'bundle'),
    filename: 'github-embed.js',
    publicPath: '/static/',
    library: 'githubEmbed',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({ React: 'react' }),
    new ExtractTextPlugin("css/github-embed.css",  {
            allChunks: true
        })
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
      loader: ExtractTextPlugin.extract("style", "css!postcss"),
      include: __dirname
    }]
  }
};
