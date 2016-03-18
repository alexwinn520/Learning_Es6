var webpack = require('webpack');
var path = require('path'); //used to manipulate file paths easily

module.exports = {
	devtool: 'inline-source-map', //for testing
	entry: [
		'webpack-dev-server/client?http://127.0.0.1:8080/',
		'webpack/hot/only-dev-server', //live reloading
		'bootstrap-loader',
		'./src' //looks for default index.js
	],
	output: {
		path: path.join(__dirname, 'public'),
		filename: 'bundle.js' //standard naming
	},
	resolve: { //where webpack looks for files
		modulesDirectories: ['node_modules', 'src'],
		extension: ['', '.js', '.scss']
	},
	module: {
		loaders: [
		{
				test:/\.js$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: ['es2015']
				}
		},
		{
			test: /\.html$/,
			loader: 'raw'
		},
		{
			test: /\.scss$/,
			loaders: [
				'style',
				'css',
				'autoprefixer?browsers=last 3 versions',
				'sass?outputStyle=expanded'
			]
		},
		{
			test: /\.(woff2?|ttf|eot|svg)$/, //font extensions to be recognized by bootstrap
			loader: 'url?limit=10000'
		},
		{
			test: /bootstrap-sass\/assets\/javascripts\//,
			loader: 'imports?jQuery=jquery'
		}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin() //if there is an error, webpack will not compile
	],
	devServer:{
		hot: true,
		proxy: {
			'*': 'http://localhost:3000' 
		}
	}
}