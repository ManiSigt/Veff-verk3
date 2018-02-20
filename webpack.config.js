const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/App.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            { enforce: 'pre', test: /\.js$/, exclude: /node_modules/, loader: 'eslint-loader' },
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        compress: true,
        port: 9988,
        open: true,
        historyApiFallback: true
    },
    plugins: [new HtmlWebpackPlugin({
        title: 'ChatRoomJS',
        template: './index.html',
        inject: 'body'
    })]
};