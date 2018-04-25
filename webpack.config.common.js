const path = require('path');


const HtmlWebpackPlugin  =  require('html-webpack-plugin');
const EXtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const lessExtract = new EXtractTextWebpackPlugin('less.css')

const Webpack = require('webpack');

module.exports = {
  entry:path.resolve(__dirname,'./src/index'),
  output:{
    path:path.join(__dirname,'dist/app'),
    filename:'[name].[hash].js',
  },
  resolve:{
    extensions: [".js",".css",".json"],
    alias: {//创建 import 或 require 的别名，来确保模块引入变得更简单
      //import img from 'Utilities/utility';
      img: path.resolve(__dirname, 'img/'),
    }
  },

  module:{
    rules:[
      {//style-loader将css插入到页面的style,css-loader是处理css文件中的url()
        test:/\.less$/,//loader执行顺序从右向左
        use:lessExtract.extract({
          use:[
            {loader:'css-loader',options:{minimize:true}},
            'postcss-loader',
            'less-loader'
          ]
        }),
        include:path.join(__dirname,'/src'),
        exclude:path.join(__dirname,'node_modules/')
      },{//处理将文件发送到输出文件夹，并返回（相对）URL，文件小于限制，可以返回 data URL
        test:/\.(jpg|png|gif|svg)$/,
        use:[{
          loader:'url-loader',
          options:{
            limit:200,
            outputPath:'images/',
            name:'[name].[hash:8].[ext]'
          }
        }],
        exclude:path.join(__dirname,'node_modules/')
      },
      {
        test: /\.js|jsx$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'stage-0', 'react'] // env转换es6 stage-0转es7 react转react
          }
        },
        exclude:path.join(__dirname,'node_modules/')
      },{
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }],
      }
    ]
  },

  plugins:[
    new HtmlWebpackPlugin({
      hash:true,
      title:'我不信',
      minify: {
        removeAttributeQuotes:true
      },
      favicon:'./img/favicon.png',
      template:path.join(__dirname,'public/template.ejs')
    }),
    lessExtract,
    
    // new Webpack.ProvidePlugin({
    //   React: 'React',
    // }),//并不存在全局变量，并且依然会被打包在dll下
  ]
//happyPack,ParallelUglifyPlugin就能让Webpack把任务分解给多个子进程去并发的执行加快build速度；
}