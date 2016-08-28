import * as types from '../constants/ActionTypes'

var data = [{'id': '0', 'content': '反向代理服务器让应用更快更安全'},
            {'id': '1', 'content': '增加负载均衡服务器'},
            {'id': '2', 'content': '缓存静态及动态内容'},
            {'id': '3', 'content': '压缩数据'},
            {'id': '4', 'content': '优化 SSL/TLS'},
            {'id': '5', 'content': '使用 HTTP/2 或 SPDY'}];



//action
function display(index) {
    return {
        type: types.ISDISPLAY,
        index: index,
    }
}

function confirmDeleteTask(data, index) {
    data.splice(index, 1);
    return {
        type: types.CONFIRM,
        data: data
    }
}

function cancel() {
    return {
        type: types.CANCEL
    }
}

export {data, display, confirmDeleteTask, cancel}