const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = (config) => ({
  entry: [
    ...config.entry,
    'babel-polyfill',
    path.resolve(process.cwd(), 'app', 'index.js'),
  ],
  output: {
    publicPath: '/',
    filename: 'bundle.js',
    path: path.resolve(process.cwd(), 'dist'),
  },
  devtool: config.devtool,
  cache: config.cache,
  performance: {
    hints: false,
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'stage-0', 'react'],
        plugins: [
          config.isDev ? 'react-hot-loader/babel' : '',
        ],
      },
    }, {
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader'],
    }, {
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader'],
    }],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: 'app/index.html',
      inject: true,
      hash: false,
    }),
    ...config.plugins,
  ],
});