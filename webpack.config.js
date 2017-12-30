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
		    }
		]
	},
  	
	stats: {
		colors: true 
	},
	devtool:"inline-sourcemap",
	target: 'electron'
};