fis.match('*', {
    deploy: fis.plugin('http-push', {
        receiver: 'http://106.12.31.197:8999/receiver',
        // 注意这个是指的是测试机器的路径，而非本地机器
        to: '/home/sufubo/code/demo/asset-server-express/public'
    } )
});
