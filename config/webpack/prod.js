'use strict';

const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require('autoprefixer');
const merge = require('webpack-merge');
const webpack = require('webpack');

const ASSET_PATH = process.env.ASSET_PATH == null ? '/' : process.env.ASSET_PATH;

const common = require('./common');

module.exports = merge.strategy({
	'module.rules': 'replace'
})(common, {
	mode: 'production',
	devtool: 'source-map',
	output: {
		path: path.resolve(__dirname, '..', '..', 'dist'),
		//publicPath: ASSET_PATH
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
			'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[hash].css',
			chunkFilename: '[id].[hash].css'
		})
	],
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				sourceMap: true
			}),
			new OptimizeCSSAssetsPlugin({})
		]
	},
	module: {
		rules: [
			{
				test: /\.less$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
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
