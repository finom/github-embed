var path = require('path');
var webpack = require('webpack');
const postcssImport = require('postcss-import');
const postcssNested = require('postcss-nested');
const postcssCssnext = require('postcss-cssnext');
const postcssCalc = require('postcss-calc');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devtool: 'source-map',
  entry: './src/css/style.css',
  output: {
    path: path.join(__dirname, 'npm'),
    filename: 'whatever.js'
  },
  plugins: [
    new ExtractTextPlugin("css/style.css",  {
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
      test: /\.css?$/,
      loader: ExtractTextPlugin.extract("style", "css!postcss"),
      include: __dirname
    }]
  }
};
