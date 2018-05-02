const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin');
const config = {
  entry: 'mocha!./tests/utils.js',
  mode: 'development',
  output: {
    path: path.join(__dirname, 'tests'),
    filename: 'test.bundle.js',
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      {
        test: /test\.js$/,
        use: 'mocha-loader',
        exclude: /node_modules/,
        include: /tests/,
      },
    ],
  },
  plugins: [
    new WebpackShellPlugin({
      onBuildExit: 'mocha tests/test.bundle.js',
    }),
  ],
};
module.exports = config;
