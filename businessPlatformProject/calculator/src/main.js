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
    result.innerHTML = value;
}

/**
 * 分析表达式做一个计算
 *
 * @param  {string} value
 * @return {string}
 */
function analyzeExpression(value) {
    /**
     * 我消化一下，这个思路，其实就是先讲我们的启示就是用户输入的文本作为中缀表达式输入
     * 然后转为后缀表达式，虽然我知道这个东西，但是我没有明白为什么要这么做
     * 中缀表达式做的一点就是将我们的括号这个东西给剔除掉了，让我们可以没有括号的情况下
     * 知道运算的优先级，他是将运算符放到后面了，然后利用后缀表达式进行计算结果
     * 将中缀运算符转为后缀表达式的过程就是做表达式优先级的拉平过程。这样可以把我们的表达式
     * 很好的进行应用，然后后缀表达式就只是用来说进行计算就可以。
     * 这里为什么说就是在将统一运算的优先级作为顺序进行表达，
     * 下面就开始进行中缀表达式转后缀表达式的应用
     * 不要本末倒置，程序才是最重要的代码能力才是最重要的
     */
    var output = '';
    var infix = [];
    var stack = [];
    var topStack = '';
    value = value.replace(/（/g, '(').replace(/）/g, ')');
    value = value.split('');
    console.log(value);
    // 现在的问题是如何辨别谁是数字，谁是运算符,其实不用分也可以
    // 如果不是运算符就拼接起来。然后当作是一个整体
    // 就是字符串之后,如果
    for (var i = 0; i < value.length; i++) {
        // 如果是数字就输出
        if (parseInt(value[i])) {
            console.log(1);
            output += value[i];
        }
        else {
            // 若是符号，则判断其与栈顶元素的优先级，如果大于栈顶元素优先级则入栈
            // 否则出栈输出
            if (stack.length === 0) { // 栈为空则入栈
                stack.push(value[i]);
            }
            else {
                // 优先级怎么判断呢，再做一个变量，用来保存判断当前的优先级
                // 别人是用一个函数来进行判断的
                // 如果优先级比栈顶元素小于或者等于的时候就输出
                // 括号这里怎么考虑呢，左括号肯定最大，进栈，
                var topPriority = operatorPriority(stack[stack.length - 1]);
                var curPriority = operatorPriority(value[i]);
                if (curPriority <= topPriority) {
                    while (curPriority <= topPriority) {
                        var pop = stack.pop();
                        console.log(pop);
                        if ((pop !== '(') || (pop !== ')')) {
                            output += pop;
                        }
                        topPriority = operatorPriority(stack[stack.length - 1]);
                    }
                }
                else {
                    stack.push(value[i]);
                }
            }
        }
    }

    console.log('中缀表达式变为后缀');
    console.log(stack);
    console.log('output');
    console.log(output);


    return value;
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
        case '(':
            return 3;
        default:
            return 0;
    }
}

function init() {
    calc.addEventListener('click', calculator);
}

init();
