const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const cssnano = require('cssnano');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: [
    'babel-polyfill', // Load this first
    'react-hot-loader/patch',
    './index'
  ],
  output: {
    devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  // externals: [{
  //   trackerjs: 'http://40.125.201.98/threathunterTracker.js?v1'
  // }],
  devtool: 'cheap-module-source-map',
  devServer: {
    hotOnly: true,
    stats: 'errors-only'
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|svg)$/,
        use: 'url-loader'
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: 'url-loader'
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract([
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'sass-loader',
          'postcss-loader'
        ])
      },
      {
        test: /\.jsx?$/,
        use: [
          'babel-loader'
          // {
          //   loader: 'eslint-loader',
          //   options: {
          //     emitWarning: true,
          //   }
          // }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      'app.config': path.resolve(__dirname, 'src/configs/development.config.js')
    },
    extensions: ['.js', '.json', '.jsx', '.css', '.scss']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new ExtractTextPlugin({
      allChunks: true,
      filename: '[name].[contenthash:8].css'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
};
