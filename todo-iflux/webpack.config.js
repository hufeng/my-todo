/**
 * webpack configuration
 */
var webpack = require('webpack');

module.exports = {
    entry: './assets/js/app.jsx',
    output: {
        path: './build',
        filename: 'bundle.js'
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
          {test: /\.[js|jsx]/, loader: 'jsx-loader?harmony'}
        ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      })
    ]
};
