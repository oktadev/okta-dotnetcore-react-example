const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: { 
    vendor: ['react', 'react-dom', 'react-router', 'react-router-dom'],
    main: './ClientApp/boot.js' 
  },
  output: {
    path: path.join(__dirname, './wwwroot/dist'),
    filename: '[name].js',
    publicPath: 'dist/'
  },
  module: {
    rules: [
      { test: /\.js$/, include: /ClientApp/, use: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    })
  ]
}