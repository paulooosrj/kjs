const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const path = require('path');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const IS_PROD = (process.env.NODE_ENV === 'production');

module.exports = {
  watch: true,
  entry: {
    'index': path.join(__dirname, 'src', 'index.js')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    modules: [ 'node_modules', 'src' ],
    extensions: [".js", ".jsx", ".scss", ".css", ".html"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['lodash'],
            presets: ['es2015', 'react'],
            comments: false,
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: {
        baseDir: ['./']
      }
    }),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(IS_PROD)
    }),
    new webpack.ProvidePlugin({
      axios: "axios"
    })
  ],
  devtool: "source-map"
};
