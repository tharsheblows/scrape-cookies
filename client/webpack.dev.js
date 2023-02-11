const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const { createPortal } = require('react-dom');

module.exports = merge(common, {
	mode: 'development',
	entry: [ 'webpack-hot-middleware/client?reload=true' ],
	output: {
		publicPath: '/',
	},
	devtool: 'inline-source-map',
	plugins: [new webpack.HotModuleReplacementPlugin()],
});
