//选择一个元素方法
var $ = function(select){
    return document.querySelector(select);
}

//选择多个元素方法
var $$ = function(select) {
    return document.querySelectorAll(select);
}

//本地存储方案
var store = {
    storage: function  () {
        if(window.localStorage){
            return window.localStorage;
        }else {
            alert('您的浏览器不支持本地存储，请升级浏览器');
            return false;
        }
    }(),

    set: function  (key, value) {
        this.storage.setItem(key, value);
    },

    get: function  (key) {
        return this.storage.getItem(key);
    },

    remove: function  (key) {
        this.storage.removeItem(key);
    },

    clearAll: function  () {
        this.storage.clear();
    }
}


//创建一个数据对象，localStorage里面的数据放进去
function storeStoage() {
    var storage = store.storage;
    var data = {};
    var key = '', value = '';

    for (var i = 0, len = storage.length; i < len; i++){
        key = storage.key(i);
        value = storage.getItem(key);
        data[key] = value;
    }

    return data;
}

//把数据存到服务器
function  storeServer() {
    var xhr = new XMLHttpRequest();
    var data = storeStoage();
    xhr.open('GET', '', true);
    xhr.onload = function(event) {
        console.log('数据保存成功'+event.target.responseText);
    }
    xhr.onerror = function(event) {
        console.log('数据保存失败'+event.target.responseText);
    }
    xhr.send(data);
}


