var expression = document.getElementById('expression');
var result = document.getElementById('result');
var calc = document.getElementById('calc');

/**
 * 分析需求怎么跑到那里去了
 * 这个计算器要求可以自定义输入，那么就需要自己解析表达式，
 * 就是要做出来和谷歌计算器一样的东西
 * 文本形式输入解析表达式，解析出错就报error
 */

/**
 * 这个函数是做一个事件处理
 *
 * @return {[type]} [description]
 */
function calculator() {
    var value = expression.value;
    value = analyzeExpression(value);
    result.innerHTML = value;
}

/**
 * 分析表达式做一个计算
 *
 * @param  {string} value
 * @return {string}
 */
function analyzeExpression(value) {
    // 要考虑运算符的优先级，
    // 括号的匹配
    //
    return value;
}

function init() {
    calc.addEventListener('click', calculator);
}

init();
