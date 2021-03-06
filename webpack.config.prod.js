const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: {
        device: './src/device.js',
        desktop: './src/app.desktop.js',
        mobile: './src/app.mobile.js',
        nosupport: './src/app.nosupport.js'
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
            inject: false,
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
            { test: /\.scss/, loader: 'style!css!sass!postcss' }
        ]
    },
    postcss: function() {
        return [autoprefixer];
    }
};
