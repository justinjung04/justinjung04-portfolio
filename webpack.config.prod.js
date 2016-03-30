var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        device: './src/device.js',
        desktop: './src/app.desktop.js',
        mobile: './src/app.mobile.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.[name].js',
        publicPath: '/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        }),
        new HtmlWebpackPlugin({ 
            filename: 'index.html',
            template: path.join(__dirname, '/src/index.html'),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, '/src/assets/'),
                to: './assets/'
            },
            {
                from: path.join(__dirname, '/src/.htaccess'),
                to: './'
            }
        ])
    ],
    module: {
        loaders: [
            { test: /\.jsx?/, loader: 'babel', include: path.join(__dirname, 'src') },
            { test: /\.scss/, loader: 'style!css!sass' }
        ]
    }
};
