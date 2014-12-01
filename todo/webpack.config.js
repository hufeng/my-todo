var path = require('path');

module.exports = {
    entry: './assets/js/app.js',
    output: {
        path: './build',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {test: /\.handlebars$/, loader: 'handlebars-loader'},
            {test: /\.css$/, loader: 'style-loader!css-loader'}
        ]
    }
};
