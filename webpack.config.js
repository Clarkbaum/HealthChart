const HTMLWebpackPlugin = require('html-webpack-plugin');
const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: __dirname +'/client/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: __dirname + '/client/index.js',
  module:{
    loaders: [
      {
        test: /\.jsx?$/,      //both js and jsx files
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 25000
        }
      }
    ]
  },
  output: {
    filename: 'bundled.js',
    path: __dirname + '/build'
  },
  plugins: [HTMLWebpackPluginConfig]
};