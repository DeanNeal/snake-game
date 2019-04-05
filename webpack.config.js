const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
  
module.exports = {
  entry: {
    // snake:  './src/snake/snake.ts',
    // pong:  './src/pong/pong.ts',
    tanks: './src/tanks/game.ts'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { url: false, sourceMap: true } },
          { loader: 'less-loader', options: { sourceMap: true } }
      ],
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new HtmlWebpackPlugin({
      filename: 'tanks.html',
      template: 'tanks_tpl.html'
    })
  ],
  resolve: {
    extensions: ['.ts', '.js' ]
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, '')
  },
  devServer: {
    contentBase: path.join(__dirname, ''),
    port: 8000,
    open: true,
    publicPath: "/"
  }
};