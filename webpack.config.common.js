const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin  =  require('html-webpack-plugin');
const EXtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Webpack = require('webpack');

const lessExtract = new EXtractTextWebpackPlugin('less.css')//导出资源文件css.css,一定要在plugin中引入
module.exports = {
  entry:path.resolve(__dirname,'./src/index'),
  output:{
    path:path.join(__dirname,'dist'),
    filename:'[name].[hash].js',
  },
  resolve:{
    extensions: ["",".js",".css",".json"],
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
        include:path.join(__dirname,'./src'),
        exclude:/node_modules/
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
        exclude:/node_modules/
      },
      {
        test: /\.js|jsx$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'stage-0', 'react'] // env转换es6 stage-0转es7 react转react
          }
        },
        exclude:/node_modules/
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
    // new CleanWebpackPlugin([path.join(__dirname, 'dist')]),
    new HtmlWebpackPlugin({
      hash:true,
      title:'我不信',
      minify: {
        removeAttributeQuotes:true
      },
      favicon:'./img/favicon.png',
      template:path.join(__dirname,'public/template.html')
    }),
    lessExtract,
    new CopyWebpackPlugin([{
      ignore:'template.html',
      from: path.join(__dirname,'public'),//静态资源目录源地址
      // to:'./public' //目标地址，相对于output的path目录
    }]),
    new PurifyCSSPlugin({//消除未使用的CSS
        //purifycss根据这个路径配置遍历你的HTML文件，查找你使用的CSS
      paths:glob.sync(path.join(__dirname,'src/*.html'))
    }),
    new Webpack.ProvidePlugin({
      React: 'React.Compontent',
    }),
  ]

}