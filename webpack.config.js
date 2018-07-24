const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: 'production',
    entry: path.join(__dirname, 'src/scripts/main.js'),
    output: {
        path: path.join(__dirname, 'dest/scripts'),
        filename: '[name].bundle.js'
    },
    plugins: [
      // new webpack.optimize.CommonsChunkPlugin({
      //     name: 'common'
      // }),
      
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        "window.jQuery": "jquery"
    })
    ],
    module: {
        rules: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
          },
          {
            test: /\.js$/,
            enforce: 'pre',
            loader: 'eslint-loader',
            options: {
                fix: true
            }
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          },
          {
            test: /\.(png|jpg|gif)$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: "../images/[name].[ext]"
                }
              }
            ]
          }
        ],
      },
    // devtool: '#eval-source-map'
};