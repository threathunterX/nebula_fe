const { resolve } = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HappyPack = require('happypack');
const os = require('os');

const threadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const { vendor } = require('./webpack-assets.json');

module.exports = {
  entry: {
    bundle: './src/index'
  },
  output: {
    publicPath: '../static/',
    path: resolve(__dirname, 'statics'),
    filename: '[name].[hash:8].js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract(['happypack/loader?id=scss'])
      },
      {
        test: /\.jsx?$/,
        include: [resolve('src')],
        exclude: /node_modules/,
        use: [
          'happypack/loader?id=jsx',
          // {
          //   loader: 'eslint-loader',
          //   options: {
          //     emitError: true,
          //     failOnError: true,
          //     outputReport: {
          //       filePath: 'checkstyle.xml',
          //       formatter: require('eslint/lib/formatters/checkstyle')
          //     }
          //   }
          // }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      'app.config': resolve(__dirname, 'src', 'configs', 'production.config.js')
    },
    extensions: ['.js', '.json', '.jsx', '.css', '.scss']
  },
  plugins: [
    new webpack.DefinePlugin({
    "process.env": { NODE_ENV: JSON.stringify("production") }
    }),
    new HtmlWebpackPlugin({
      inject: false,
      favicon: resolve('src', 'favicon.ico'),
      template: require('html-webpack-template'),
      scripts: [
        '../static/resources/jspdf.debug.js',
        '../static/resources/metricsConfig.js',
        `../static/${vendor.js}`//,
        //{
        //  src: 'http://40.125.201.98/ThreathunterTracker.js?v1',
        //  async: true
        //}
      ],
      filename: resolve('templates', 'index.html'),
      bodyHtmlSnippet: '<div id="root" class="wrapper" />'
    }),
    new webpack.DllReferencePlugin({
      manifest: resolve(__dirname, 'statics', 'vendor.manifest.json')
    }),
    new ExtractTextPlugin({
      allChunks: true,
      filename: '[name].[contenthash:8].css'
    }),
    new UglifyJSPlugin({ cache: true, parallel: true }),
    new HappyPack({
      id: 'scss',
      threadPool,
      loaders: [
        'cache-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2
          }
        },
        'sass-loader',
        'postcss-loader'
      ]
    }),
    new HappyPack({
      id: 'jsx',
      threadPool,
      loaders: [
        'cache-loader',
        'babel-loader'
      ]
    }),
    new OptimizeCSSAssetsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.HashedModuleIdsPlugin()
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks: ({ resource }) => (
    //     resource &&
    //     resource.indexOf('node_modules') >= 0 &&
    //     resource.match(/\.js$/)
    //   )
    // })
  ]
};
