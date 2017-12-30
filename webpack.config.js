const webpack = require('webpack');

module.exports = {
	entry: './reactApp/app.js',
	output: {
		path: __dirname + '/build', 
		filename: 'app.bundle.js'
	},
	module: {
		rules: [
			{
				test: /reactApp\/(.)*\.js$/, 
				exclude: /node_modules/,
				loader: 'babel-loader', 
				options: {
		            presets: ['react', 'es2015']
		        }
			},
			{
		        test: /\.(s?css|less)$/,
		        use: [{
		            loader: "style-loader" // creates style nodes from JS strings
		        }, {
		            loader: "css-loader" // translates CSS into CommonJS
		        }, {
		            loader: "less-loader" // compiles Less to CSS
		        }]
		    },
		    { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },  //添加
    		{ test: /\.(woff|woff2)$/, loader:"url-loader?prefix=font/&limit=5000" }, //添加
    		{ test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
		]
	},
  	
	stats: {
		colors: true 
	},
	devtool:"inline-sourcemap",
	target: 'electron'
};