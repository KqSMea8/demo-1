var fomat = function (msg) {
    var ret = '';
    if (!msg) {
        return ret;
    }

    var date = moment();
    var time = date.format('YYYY-MM-DD HH:mm:ss.SSS');
    if (msg instanceof Error) {
        var err = {
            name: msg.name,
            data: msg.data
        };

        err.stack = msg.stack;
        ret = util.format('%s %s: %s\nHost: %s\nData: %j\n%s\n\n',
            time,
            err.name,
            err.stack,
            os.hostname(),
            err.data,
            time
        );
        console.log(ret);
    }
    else {
        ret = time + ' ' + util.format.apply(util, arguments) + '\n';
    }

    return ret;
};

