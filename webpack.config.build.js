var webpack = require('webpack');

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
			chunks: false,
			chunkModules: false
		}
	},

	module: {
		loaders: [
			{ test: /\.js$/, exclude: '/node_modules/', loader: 'babel', query: {presets:['react', 'es2015'], compact: false} },
			{ test: /\.css$/, loader: 'style!css' },
			{ test: /\.scss/, loader: 'style!css!sass' },
			{ test: /\.(png|jpg|woff|woff2|eot|ttf|otf)/, loader: 'url' },
			{ test: /\.svg/, loader: 'file?name=/img/[hash].[ext]?' }
		]
	},

	plugins: [
		new webpack.optimize.UglifyJsPlugin({ 
			compress: {
				warnings: false 
			}
		})
	]
};