const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, 'src/scripts/main.js'),
    output: {
        path: path.join(__dirname, 'dest/scripts'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
          }
        ]
      },
    devtool: '#eval-source-map'
};