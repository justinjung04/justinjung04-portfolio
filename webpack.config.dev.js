var path = require('path');
var webpack = require('webpack');

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
    ]
  },
  output: {
    path: path.join(__dirname, 'dev'), // path to where webpack will build
    filename: 'bundle.[name].js',
    publicPath: '/' // path that will be considered when importing files
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      { test: /\.jsx?/, loader: 'babel', include: path.join(__dirname, 'src') },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.scss/, loader: 'style!css!sass' },
      { test: /\.(png|jpg|woff|ttf)/, loader: 'url', query: { limit: '10000', name: '[name].[hash].[ext]' } },
      { test: /\.(svg|mp4|webm)/, loader: 'file', query: { limit: '10000', name: '[name].[hash].[ext]' } }
    ]
  }
};
