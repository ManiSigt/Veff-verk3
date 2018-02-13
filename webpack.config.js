const path = require('path');

module.exports = {
    entry: './src/App.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            { enforce: 'pre', test: /\.js$/, exclude: /node_modules/, loader: 'eslint-loader' },
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
        ]
    }
};
