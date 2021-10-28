const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      ...require('./rules.webpack'),
    ],
  },
  plugins: [new MonacoWebpackPlugin({ languages: [ 'typescript', 'javascript']})],
}