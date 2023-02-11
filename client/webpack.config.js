const path = require('path');

module.exports = {
	entry: {
		path: path.join(__dirname, 'src'),
	},
	output: {
		path: path.join(__dirname, '..', 'public', 'dist'), // the bundle output path
		filename: 'bundle.js', // the name of the bundle.
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/, // .js and .jsx files
				exclude: /node_modules/, // excluding the node_modules folder
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							 '@babel/preset-env', '@babel/preset-react',
						],
					},
				},
			},
			{
				test: /\.(sa|sc|c)ss$/, // styles files
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
				loader: 'url-loader',
				options: { limit: false },
			},
		],
	},
};
