export default {
    name: 'functional-button',
    functional: true,
    render(createElement, {data, children}) {
        return createElement('button', data, children);
    }
}

createElement('button', data, ['hello', ...children]);