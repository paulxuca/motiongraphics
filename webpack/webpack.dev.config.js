const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const config = require('./webpack.base.config')({
  cache: true,
  devtool: 'eval',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
});

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {
  hot: true,
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
    chunks: true,
  }
});

server.listen(3000, 'localhost', (err) => {
  if (err) {
    console.log(err);
    process.exit(0);
  }
  console.log('Webpack dev server listening on port 3000');
});
