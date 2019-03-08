const { resolve } = require('path');
const webpack = require("webpack");
const { dependencies } = require('./package.json');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

module.exports = {
  entry: {
    vendor: Object.keys(dependencies)
  },
  output: {
    path: resolve(__dirname, 'statics'),
    filename: '[name].[hash:8].js',
    library: '[name]'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([
      resolve('statics'),
      resolve('templates'),
      resolve('webpack-assets.json')
    ]),
    new webpack.DllPlugin({
      path: resolve(__dirname, 'statics', '[name].manifest.json'),
      name: '[name]'
    }),
    new UglifyJSPlugin({ cache: true, parallel: true }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new AssetsPlugin()
  ]
};
