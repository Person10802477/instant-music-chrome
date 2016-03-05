var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    app: ['./foreground/src/app.js']
  },
  output: {
    path: path.join(__dirname, 'foreground', 'bundle'),
    publicPath: '/foreground/bundle/',
    filename: 'app.js'
  },
  plugins: [
    new ExtractTextPlugin('./app.css', {
        allChunks: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      },
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.html$/,
        loader: "raw-loader"
      },
      {
        test: /\.css$/,
        // make bundle/app.css only on production
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      }
    ]
  },
};
