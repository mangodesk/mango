
const path = require('path');
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    fallback: {
      path: false,
      fs: false,
    }
  },
  module: {
    rules: [
      ...require('./rules.webpack'),
    ],
  },
  plugins: [
    new MonacoWebpackPlugin({ languages: [ 'typescript', 'javascript']}),
    new CopyWebpackPlugin({
      patterns: [
        { from: "public", to: "." },
        { from: "node_modules/monaco-editor/min/vs/", to: path.resolve(__dirname, '../.webpack/renderer/vs') },
        !IS_PRODUCTION && { from: "node_modules/monaco-editor/min-maps/vs/", to: "min-maps/vs" }
      ].filter(Boolean)
    })
  ],
}