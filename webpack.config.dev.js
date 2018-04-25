const merge = require('webpack-merge');
const common = require('./webpack.config.common.js');
module.exports = merge(common, {
  // devtool: 'inline-source-map',
  devServer: {
    contentBase: './public',
    host:'localhost',
    compress:true,//压缩
    port:8089,
    inline:false,
    historyApiFallback:true
  }
});