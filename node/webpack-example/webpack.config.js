const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './app/index.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'), 
        publicPath: '/assets/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    pareset: ['es2015', 'react']
                }
            }
        ]
    }

}