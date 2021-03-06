const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const outputDirectory = 'dist';

module.exports = [
  {
    name: 'client',
    devtool: 'source-map',
    entry: './src/client/index.js',
    output: {
      path: path.join(__dirname, outputDirectory),
      publicPath: '/',
      filename: 'bundle.js',
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
        {
          test: /\.html$/,
          use: {
            loader: 'html-loader',
            options: {
              minimize: true,
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    devServer: {
      port: 3000,
      open: true,
      proxy: {
        '/api': 'http://localhost:9000',
      },
    },
    plugins: [
      new CleanWebpackPlugin([outputDirectory]),
      new HtmlWebPackPlugin({
        template: './src/index.html',
        filename: 'index.html',
      }),
    ],
  },
  {
    name: 'server',
    devtool: 'source-map',
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
  },
];
