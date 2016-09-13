const path = require('path');
const webpack = require('webpack');
const postcssImport = require('postcss-import');
const postcssNested = require('postcss-nested');
const postcssCssnext = require('postcss-cssnext');
const postcssCalc = require('postcss-calc');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const entry = [
    './src/css/style.css',
    'babel-polyfill',
    './src/index'
];

const plugins = [
    new ExtractTextPlugin('github-embed.css', {
        allChunks: true
    }),
    new webpack.EnvironmentPlugin([
        'NODE_ENV'
    ])
];

let devtool;

if (process.env.NODE_ENV === 'development') {
    devtool = 'eval';

    entry.unshift(
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch'
    );

    plugins.push(
        new webpack.HotModuleReplacementPlugin()
    );
} else {
    devtool = 'module-source-map';

    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    );
}

module.exports = {
    plugins,
    entry,
    devtool,

    output: {
        path: path.join(__dirname, 'bundle'),
        filename: 'github-embed.min.js',
        publicPath: '/',
        library: 'githubEmbed',
        libraryTarget: 'umd',
        sourceMapFilename: '[file].map'
    },

    postcss(wp) {
        return [
            postcssImport({
                addDependencyTo: wp
            }),
            postcssNested(),
            postcssCssnext(),
            postcssCalc()
        ];
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }, {
            test: /\.css?$/,
            loader: ExtractTextPlugin.extract('style', '!css?-minimize&sourceMap!postcss')
        }]
    }
};
