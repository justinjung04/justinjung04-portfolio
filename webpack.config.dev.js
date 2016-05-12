const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: {
        device: './src/device.js',
        desktop: [
            'eventsource-polyfill', // necessary for hot reloading with IE
            'webpack-hot-middleware/client',
            './src/app.desktop.js'
        ],
        mobile: [
            'eventsource-polyfill', // necessary for hot reloading with IE
            'webpack-hot-middleware/client',
            './src/app.mobile.js'
        ],
        nosupport: [
            'eventsource-polyfill', // necessary for hot reloading with IE
            'webpack-hot-middleware/client',
            './src/app.nosupport.js'
        ],
    },
    output: {
        path: path.join(__dirname, 'dev'), // path to where webpack will build
        filename: 'bundle.[name].js',
        publicPath: '/' // path that will be considered when importing files
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        })
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
