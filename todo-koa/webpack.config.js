module.exports = {
  entry: './assets/js/app.js',
  output: {
    path: './public/dist/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'jsx-loader?harmony'}
    ]
  }
};
