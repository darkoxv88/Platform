const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
  },
  output: {
    filename: 'platform.min.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    minimize: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'platform',
    })
  ]
};
