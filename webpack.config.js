const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const entry = [
    './src/css/style.css',
    './src/index'
];

const plugins = [
    new ExtractTextPlugin({
        filename: 'github-embed.css',
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


    module: {
        rules: [{
            test: /\.js$/,
            use: ['babel-loader'],
            exclude: /node_modules/
        }, {
            test: /\.css?$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader',
                    options: {
                        minimize: false,
                        sourceMap: false,
                        importLoaders: true,
                    }

                }, {
                    loader: 'postcss-loader'
                }]
            })
        }]
    }
};
