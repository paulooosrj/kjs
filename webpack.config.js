var path = require('path');
var webpack = require('webpack');

module.exports = {
     watch: true,
     entry: './vendor/app/app.js',
     output: {
         path: path.resolve(__dirname, 'vendor', 'build'),
         filename: 'khan.min.js'
     },
     module: {
		loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader", // or just "babel"
                query: {
                    presets: ["env"]
                }
            }
        ]
	 },
     stats: {
         colors: true
     },
     devtool: 'source-map'
};