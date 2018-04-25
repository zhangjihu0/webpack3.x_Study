const path = require('path');
const merge = require('webpack-merge');
const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const lessExtract = new EXtractTextWebpackPlugin('less.css')//导出资源文件css.css,一定要在plugin中引入
const Webpack = require('webpack');
const common = require('./webpack.config.common.js');
module.exports = merge(common, {
  // externals:{
  //   React: 'React',
  // },//不需要
  plugins: [
    new CleanWebpackPlugin([path.join(__dirname, 'dist/app')]),
    new PurifyCSSPlugin({//消除未使用的CSS
      //purifycss根据这个路径配置遍历你的HTML文件，查找你使用的CSS
        paths:glob.sync(path.join(__dirname,'src/*.html'))
      }),
    new Webpack.DllReferencePlugin({
      context:'.',
      /** 
          下面这个地址对应webpack.dll.config.js中生成的那个json文件的路径
          这样webpack打包时，就先直接去这个json文件中把那些预编译的资源弄进来
      **/
     manifest: require(path.join(__dirname, 'dist/dll', 'vendor.manifest.json')),
    }),
    new AddAssetHtmlPlugin({
      includeSourcemap: false, //webpack 编译时提示 ”...dll.js.map not found“， 需要配置插件选项：includeSourcemap: false,。
      filepath: require.resolve("./dist/dll/vendor.dll.js"),
      hash: true
  }),
    new UglifyJSPlugin({
      exclude: /\/excludes/
    }),
    //作用域提升只有在满足es6的语法下才起到作用
    //详解：
    //https://zhuanlan.zhihu.com/p/27980441
    new Webpack.optimize.ModuleConcatenationPlugin(),
    new CopyWebpackPlugin([{
      ignore:'template.ejs',
      from: path.join(__dirname,'public'),//静态资源目录源地址
      // to:'./public' //目标地址，相对于output的path目录
    }]),
  ]
  
});