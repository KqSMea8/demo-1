var Deferred = function () {
    this.promise = new promise();
}

Deferred.prototype.resolve = function (obj) {
    var promise = this.promise;
    var handler;

    while((handler = promise.queue.shift())) {
        if (hanlder && hanlder.fulfilled) {
            var ret = handler.fulfilled(obj);
            if (ret && ret.isPromise) {
                ret.queue = promise.queue;
                return ;
            }
        }
    }
}

Deferred.prototype.reject = function (err) {
    var promise = this.promise;
    var handler;
    while((handler = promise.queue.shift())) {
        if (handler && handler.error) {
            var ret = handler.error(err);
            if (ret && ret.isPromise) {
                ret.queue = promise.queue;
                this.primise = ret;
                return ;
            }
        }
    }
}

Deferred.prototype.callback = function () {
    var that = this;
    return function (err, file) {
        if (err) {
            return that.reject(err);
        }
        that.resolve(file);
    }
}

var Promise = function () {
    this.queue = [];
    this.isPromise = true;
}

Promise.prototype.then = function (fulfilledHandler, errorHandler, progressHandler) {
    var handler = {};
    if (typeof fulfilledHandler === 'function') {
        handler.fulfilled = fulfilledHandler;
    }
    if (typeof errorHandler === 'function') {
        handler.error = errorHandler;
    }

    this.queue.push(handler);
    return this;
}





