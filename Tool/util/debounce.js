function debounce (fn, wait) {
    var timeout = null;
    var context, args;

    return function () {
        context = this;
        args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            fn.apply(context, args);
        }, wait);
    }
}