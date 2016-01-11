var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: __dirname + '/app/src/app.js',

	output: {
		path: __dirname + '/app/dist',
		filename: 'app.js'
	},

	resolve: {
		extensions: ['', '.js', '.jsx']
	},

	devServer: {
		stats: {
			assets: false,
			colors: true,
			version: false,
			hash: false,
			timings: true,
			chunks: true,
			chunkModules: false
		}
	},

	module: {
		loaders: [
			{ test: /\.js$/, exclude: '/node_modules/', loader: 'babel', query: {presets:['react', 'es2015'], compact: false} },
			{ test: /\.css$/, loader: 'style!css' },
			{ test: /\.scss/, loader: 'style!css!sass' },
			{ test: /\.(png|jpg|woff|ttf)/, loader: 'url?limit=10000' },
			{ test: /\.(svg|mp4|webm)/, loader: 'file?name=/img/[hash].[ext]?' }
		]
	},

	plugins: [
		new HtmlWebpackPlugin({ 
			filename: './index.html',
			template: __dirname + '/app/src/index.html',
			dev: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true
			}
		})
	]
};