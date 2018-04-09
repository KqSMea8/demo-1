/**
 * 参考文章： http://blog.csdn.net/yzl_rex/article/details/7745341#
 */
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
    value = postfixComputed(value);
    result.innerHTML = value;
}

/**
 * 分析表达式做一个计算
 *
 * @param  {string} value
 * @return {string}
 */
function analyzeExpression(value) {
    var output = '';
    var infix = [];
    var stack = []; // 初始化一空栈，用来对符号进出栈使用
    var topStack = '';
    value = value.replace(/（/g, '(').replace(/）/g, ')');
    value = value.split('');
    console.log(value);

    // 中缀变后缀
    for (var i = 0; i < value.length; i++) {
        // 如果是数字就输出
        if (!isNaN(value[i])) {
            console.log('是数字' + value[i]);
            output += value[i];
        }
        else {
            if (stack.length === 0) { // 栈为空则入栈
                stack.push(value[i]);
            }
            else {
                // 若是符号，则判断其与栈顶元素的优先级，是右括号或者优先级低于栈顶符号
                // 则栈顶元素依次出栈并输出，并将当前符号符号进栈
                var pop = '';
                // 为什么会把左括号出来，不应该，左括号只有右括号出来的时候才出来，这里遇到+号
                //
                if (stack[stack.length - 1] !== '(') {
                    var topPriority = operatorPriority(stack[stack.length - 1]);
                    var curPriority = operatorPriority(value[i]);
                    console.log(stack);
                    while (curPriority < topPriority && stack.length) {
                        pop = stack.pop();
                        console.log('priortity pop' + pop);
                        output += pop;
                        topPriority = operatorPriority(stack[stack.length - 1]);
                    }
                }

                if (')' === value[i]){
                    console.log(stack);
                    pop = stack.pop();
                    console.log('）pop' + pop);
                    while (pop !== '(' && stack.length) {
                        output += pop;
                        pop = stack.pop();
                    }
                }

                if (')' !== value[i]) {
                    stack.push(value[i]);
                }
            }
        }
    }

    output += stack.reverse().join('');

    console.log('中缀表达式变为后缀');
    console.log(stack);
    console.log('output');
    console.log(output);

    return output;
}

// 后缀表达式计算
function postfixComputed(value) {
    console.log('value'+ value)
    value = value.split('');
    var stack = [];
    var topOne;
    var topTwo;
    var output = '';

    // 从左到右遍历表达式的每个数字和符号，遇到是数字就进栈，遇到是符号就将处于栈顶的两个数字出栈
    // 进行运算，运算结果出栈，一直到最终获得结果
    for (var i = 0; i < value.length; i++) {
        if (!isNaN(value[i])) {
            stack.push(value[i]);
        }
        else {
            topOne = parseFloat(stack.pop());
            topTwo = parseFloat(stack.pop());
            // 判断符号进行计算
            switch(value[i]) {
                case '+':
                    output = topOne + topTwo;
                    break;
                case '-':
                    output = topOne - topTwo;
                    break;
                case '*':
                    output = topOne * topTwo;
                    break;
                case '/':
                    output = topOne / topTwo;
                    break;
            }
            stack.push(output);
        }
    }

    return stack.pop();
}



function operatorPriority(v) {
    switch (v) {
        case '+':
            return 1;
        case '-':
            return 1;
        case '*':
            return 2;
        case '/':
            return 2;
        default:
            return 0;
    }
}

function init() {
    calc.addEventListener('click', calculator);
}

init();
