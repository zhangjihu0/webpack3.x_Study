const path = require('path');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.config.common.js');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const Webpack = require('webpack');
module.exports = merge(common, {
  plugins: [
    new Webpack.DllReferencePlugin({
      context:'.',
      /** 
          下面这个地址对应webpack.dll.config.js中生成的那个json文件的路径
          这样webpack打包时，就先直接去这个json文件中把那些预编译的资源弄进来
      **/
     manifest: require(path.join(__dirname, 'dist', 'vendor.manifest.json')),
    }),
    new AddAssetHtmlPlugin({
      includeSourcemap: false, //webpack 编译时提示 ”...dll.js.map not found“， 需要配置插件选项：includeSourcemap: false,。
      filepath: require.resolve("./dist/vendor.dll.js"),
      // hash: true
  }),
    new UglifyJSPlugin(),
  ]
});