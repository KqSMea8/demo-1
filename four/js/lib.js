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