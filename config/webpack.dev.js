const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    hot: true,
    port: 8080,
},
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
  ],
});