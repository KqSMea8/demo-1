const path = require('path');
const DllPlugin = require('webpack/lib/DllPlugin');
module.exports = {
    entry: {
        vue: ['vue']
    },
    output: {
        filename: '[name].dll.js',
        path: path.resolve(__dirname, 'dist'),
        library: '_dll_[name]', //dll的全局变量名
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            // 'static': r  esolve('static')
        }
    },
    plugins: [
        new DllPlugin({
            name: '_dll_[name]', //dll的全局变量名
            path: path.join(__dirname, 'dist', '[name].manifest.json'), //描述生成的manifest文件
        })
    ]
}