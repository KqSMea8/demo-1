const path = require('path');
const HappyPack = require('happypack');


module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'my-first-webpack.bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: ['happypack/loader?id=babel'],
            exclude: path.resolve(__dirname, 'node_modules')
        }, {
            test: /\.css/,
            use: ['happypack/loader?id=css']
        }]
    },
    plugins: [
        new HappyPack({
            id: 'babel',
            loaders: ['babel-loader?cacheDirectory']
        }),
        new HappyPack({
            id: 'css',
            loaders: ['css-loader']
        })
    ]
};