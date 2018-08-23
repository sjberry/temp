'use strict';

const path = require('path');

const autoprefixer = require('autoprefixer');
const merge = require('webpack-merge');
const webpack = require('webpack');

const common = require('./common');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: path.resolve(__dirname, '..', '..', 'dist'),
		hot: true,
		open: false
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development')
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],
	module: {
		rules: [
			{
				test: /\.less$/i,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							plugins: [
								autoprefixer()
							]
						}
					},
					{
						loader: 'less-loader',
						options: {
							sourceMap: true
						}
					}
				]
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'fonts'
						}
					}
				]
			},
			{
				test: /\.(jpg)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'img'
						}
					}
				]
			}
		]
	}
});
