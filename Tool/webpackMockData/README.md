# webpack进行mock数据

- 使用webpack－dev－server模块
- webpack－config文件中配置proxy选项

例如：
```
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

```
## tip
 - publicPath为生产环境目录，等到上线时候会将模块中的相对路径进行替换。


## 待续
因为这里今天只查到使用proxy代理实现，但是具体的路由和数据交互需要我去写一个后端模块，专门用来配置路由和数据发送。

## 思考

 - 先分析自己需求，然后猜想哪一块可以实现这个需求
 - 去看纯正的官方文档
 - 然后去测试去优化
