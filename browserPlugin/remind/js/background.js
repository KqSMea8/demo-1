// <script src="calendar.js"></script>
/**公历年月日转农历数据 返回json**/
// calendar.solar2lunar(1987,11,01);
/**农历年月日转公历年月日**/
// calendar.lunar2solar(1987,9,10);
// 参考文章 http://blog.jjonline.cn/userInterFace/173.html
/**
 * 提醒我谁过生日
 */
var birthday = [
    {
        name: '苏富波',
        month: 1,
        day: 27
    },
    {
        name: '王芃',
        month: 1,
        day: 28
    },
    {
        name: '王绸歌',
        month: 2,
        day: 6
    },
    {
        name: '苏丹',
        month: 2,
        day: 19
    },
    {
        name: '苏继楼',
        month: 3,
        day: 13
    },
    {
        name: '李晨蓓',
        month: 3,
        day: 8
    },
    {
        name: '林瑶',
        month: 3,
        day: 12
    },
    {
        name: '郑任哲',
        month: 3,
        day: 20
    },
    {
        name: '杨瑞',
        month: 3,
        day: 26
    },
    {
        name: '王晨',
        month: 11,
        day: 24
    },
    {
        name: '葛恬',
        month: 12,
        day: 6
    }
];
var birthdayTime = 3 * 60 * 60 * 1000; // 单位ms 3个小时

function remindBirthDay() {
    var lunar = calendar.solar2lunar(); //
    var month = lunar.lMonth;
    var day = lunar.lDay;
    var currentPeople;
    console.log(lunar);
    for (var i = 0; i < birthday.length; i++) {
        currentPeople = birthday[i];
        console.log(currentPeople);
        if (month === currentPeople.month && day === currentPeople.day) {
            alert('今天是' + currentPeople.name + '的生日🎂🎂🎂🎂🎁');
        }
    }
    setTimeout(remindBirthDay, birthdayTime);
}

remindBirthDay();

/**
 * 每隔半个小时提醒我喝水
 */
var drinkTime = 30 * 60 * 1000;
function remindDrink() {
    alert('该喝水了😄');
    setTimeout(remindDrink, drinkTime);
}

remindDrink();