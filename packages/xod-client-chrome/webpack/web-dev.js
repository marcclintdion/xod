
const path = require('path');
const webpack = require('webpack');
const validate = require('webpack-validator');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const baseConfig = require('./base.js');

const config = merge.smart(baseConfig, {
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: 'http://localhost:8080/',
  },
  module: {
    loaders: [
      {
        test: /src\/.*\.jsx?$/,
        loaders: ['react-hot'],
      },
      {
        test: /src\/node_modules\/xod-espruino\/index\.js$/,
        loader: 'null',
      },
    ],
  },
  devServer: {
    hot: true,
    host: 'localhost',
    port: 8080,
    contentBase: './dist/',
  },
});

module.exports = validate(config);