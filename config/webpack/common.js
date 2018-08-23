'use strict';

const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
	entry: [
		path.resolve(__dirname, '..', '..', 'src', 'renderer', 'main.js')
	],
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new ManifestPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.resolve(__dirname, '..', '..', 'src', 'renderer', 'index.html'),
			inject: true
		})
	],
	output: {
		filename: '[name].js',
		sourceMapFilename: '[name].map',
		path: path.resolve(__dirname, '..', '..', 'dist')
	},
	resolve: {
		extensions: ['.js', '.json'],
		alias: {
			'@': path.resolve(__dirname, '..', '..', 'src')
		}
	}
};
