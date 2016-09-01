//取文本框内容函数
function getText(obj) {
    return obj.innerText;
}

//设置文本框内容函数
function setText (key, obj) {
    var text = store.get(key);
    obj.innerText = text;
}

//保存内容
function save (key, obj) {
    var text = getText(obj);
    store.set(key, text);
}

