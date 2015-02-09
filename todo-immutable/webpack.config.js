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
      extensions: ['', '.js', '.jsx'],
      modulesDirectories: ['', 'web_modules', 'node_modules']
    },
    module: {
        loaders: [
          {test: /\.[js|jsx]/, loader: 'jsx-loader?harmony'}
        ]
    },
    plugins: [
      new webpack.NewWatchingPlugin()
    ]
};
