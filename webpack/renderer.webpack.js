

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      ...require('./rules.webpack'),
    ],
  },
  externals: [{
    'electron-store': 'electron-store'
  }],
}