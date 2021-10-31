const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const common = require('./webpack.common');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    hot: true,
    port: 8080,
    allowedHosts: 'all', // for localtunnel
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    /*new CopyPlugin({
      patterns: [
        { from: "public/favicon.ico", to: "favicon.ico" },
      ],
      options: {
        concurrency: 100,
      },
    }),/** */
  ],
});