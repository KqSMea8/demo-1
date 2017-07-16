var path = require('path');

module.exports = {
    entry: {
        app: ['./src/main.js']
    },

    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/assets',
        filename: 'bundle.js'
    },

    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                secure: false,
                bypass: function(req, res, proxyOptions) {
                    return '/index.html'
                }

            }
        }
    }
}
