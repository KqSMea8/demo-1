export const debounce = (fun, delay) => {
    let last;
    return function (...args) {
        let ctx = this;
        clearTimeout(last);
        last = setTimeout(function () {
            fun.apply(ctx, args);
        }, delay);
    };
};

export const throttle = (fun, delay) => {
    let last;
    let timer;
    return function (...args) {
        let ctx = this;
        let now = Date.now();
        if (last && now < last + delay) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                last = Date.now();
                fun.apply(ctx, args);
            }, delay);
        } else {
            last = Date.now();
            fun.apply(ctx, args);
        }
    };
};
