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
          {test: /\.jsx$/, loader: 'jsx-loader'}
        ]
    },
    plugins: [
      new webpack.NewWatchingPlugin()
    ]
};
