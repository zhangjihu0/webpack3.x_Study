var webpack = require('webpack');
module.exports = {
  entry: {
    vendor: ['react-dom','react'],
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: 'dist',
  },
  plugins: [new webpack.DllPlugin({
    name: '[name]_lib',
    path: './[name]-manifest.json',
  })]
};