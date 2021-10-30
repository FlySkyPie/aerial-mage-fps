const path = require('path');

module.exports = {
  entry: path.join(__dirname, '../src/index.ts'),
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, './app.js'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },
};