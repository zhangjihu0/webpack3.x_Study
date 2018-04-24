const path =  require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
  context: __dirname,
  entry:{
    vendor:[
    'react',
    'react-dom'
  ]},
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].dll.js', //输出动态连接库的文件名称
    library: '_dll_[name]_[hash]' //全局变量名称
  },
  plugins:[
    new CleanWebpackPlugin([path.join(__dirname, 'dist')]),
    new webpack.DllPlugin({
      name: '_dll_[name]_[hash]', //和output.library中一致，值就是输出的manifest.json中的 name值
      path: path.join(__dirname, 'dist', '[name].manifest.json')
    })
  ]

};