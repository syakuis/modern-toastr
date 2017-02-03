/**
 * @date 2017-02-03 13:21:48
 * @author Seok Kyun. Choi. 최석균 (Syaku)
 * @site http://syaku.tistory.com
 */

var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './index.js',
  output: {
    path: 'dist',
    publicPath: '',
    filename: 'modern-toastr.js',
    library: 'Toastr',
    libraryTarget: 'umd'
  },

  plugins: [
    new ExtractTextPlugin({
      filename: 'modern-toastr.css'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: './demo.html',
      template: './src/demo.html'
    })
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader'
        })
      },
      {
        // test: /\.jsx$/, // 로더를 사용할 확장자를 추가합니다.
        test: [/\.js$/],
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader', // 로더를 설정합니다.
        query: {
          presets: ['es2015', 'stage-0'],
          'plugins': [
            'transform-object-assign'
          ]
        }
      }
    ]
  },

  devServer: {
    inline: true, // 자동 리로드여부를 선택합니다.
    hot: true, // html 자동 리로드여부를 선택합니다. (정확한 역활을 모르겠네요)
    port: 8088,
    host: '0.0.0.0',
    contentBase: './dist' // 서버 웹루트 경로를 설정합니다.
  }
}
