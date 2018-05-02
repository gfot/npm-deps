const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const outputDirectory = 'dist';

module.exports = {
  name: 'server',
  devtool: 'source-map',
  mode: 'development',
  target: 'node',
  externals: [nodeExternals()],
  node: {
    __filename: false,
    __dirname: false,
  },
  entry: ['babel-polyfill', './src/server/index.js'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
