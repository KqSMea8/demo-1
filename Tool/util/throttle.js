function throttle (fn, wait) {
    var context, args, timeout;
    var previous = 0;
    timeout = null;
    var later = function () {
        fn.apply(context, args);
        timeout = null;
        var now = Date.now();
        previous = now;
        if (!timeout) {
            context = args = null;
        }
    }

    return function () {
        var now = Date.now();
        if(!previous) {
            previous = Date.now();
        }
        remaining = wait - (now - previous);
        args = arguments;
        context = this;
        if (remaining <= 0 || remaining > wait) {
            clearTimeout(timeout);
            timeout = null;
            previous = now;
            result = fn.apply(context, args);
            if (!timeout) {
                context = args = null;
            }
        } else if (!timeout) {
            setTimeout(later, remaining);
        }

        return result;
    }
}