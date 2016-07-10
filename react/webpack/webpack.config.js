var webpack = require('webpack');

module.exports = {
	entry: {
		index: ['./src/index.js', './src/style.css'],
		a: './src/a.js'
	},
	output: {
		path: './dist/',
		filename: '[name].js',
		publicPath: '/dist'
	},
	module: {
		loaders: [{

			//通过扩展名称和正则表达式来匹配资源文件
			test: /\.js$/,
			exclude: /node_modules/,

			//匹配到的资源会应用loader
			loader: 'babel',
			query: {
				presets: ['es2015', 'stage-0', 'react']
			}
		},{
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		}]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js", Infinity),

		new webpack.HotModuleReplacementPlugin()
	],
	devServer: {
		hot: true,
		inline: true
	}
}

