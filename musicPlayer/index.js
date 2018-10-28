// fixm,e: for test
var lines = [];
for (var i = 0; i < 100; ++i) {
lines.push('你好' + i);
}

data = {
    playing: false,
    curtime: 0,
    totaltime: 0,
    text: +new Date,
    position: '0%',
    lrcTime: 0,
    curLrcIndex: 0,
    LrcTextArr: [],
    activeLine: 0,
    lines: lines
},

created = function () {
    var self = this;
    self.togglePlay = self.togglePlay.bind(self);

    self.audio = Swan.createAudio();
    self.audio.addEventListener('mediastatus', function (e) {
        var data = e.data;

        self.data.position = (data.curtime / data.totaltime * 100) + '%';


        if (!self.data.totaltime) {
            self.data.totaltime = data.totaltime;
        }

        self.data.curtime = data.curtime;

        self.lrcRoll(data);
        self.update();
    });

    var data = {
        curtime: 60
    };

    // Swan.setInterval(function () {
    //     self.lrcRoll(data);
    // }, 3000)
}

lrcRoll = function (data) {
    var self = this;

    //你还要我怎样
    var str = 'ClswMDowMC4wMF3kvaDov5jopoHmiJHmgI7moLcKWzAwOjA2LjAwXeivje+8muiWm+S5i+iwpiDmm7LvvJrolpvkuYvosKYKWzAwOjA5LjAwXea8lOWUse+8muiWm+S5i+iwpgpbMDA6MjIuMDBdClswMDoyNi4yNV3kvaDlgZzlnKjkuobov5nmnaHmiJHku6znhp/mgonnmoTooZcKWzAwOjM2LjE4XeaKiuS9oOWHhuWkh+WlveeahOWPsOivjeWFqOW/teS4gOmBjQpbMDA6NDQuMDJd5oiR6L+Y5Zyo6YCe5by6IOivtOedgOiwjgpbMDA6NDguMzdd5Lmf5rKh6IO95Yqb6YGu5oyhIOS9oOWOu+eahOaWueWQkQpbMDA6NTMuODNd6Iez5bCR5YiG5byA55qE5pe25YCZ5oiR6JC96JC95aSn5pa5ClswMTowMS43M10KWzAxOjA1LjcyXeaIkeWQjuadpemDveS8mumAieaLqee7lei/h+mCo+adoeihlwpbMDE6MTQuOTJd5Y+I5aSa5biM5pyb5Zyo5Y+m5LiA5p2h6KGX6IO96YGH6KeBClswMToyMy41MF3mgJ3lv7XlnKjpgJ7lvLog5LiN6IKv5b+YClswMToyOC4xOV3mgKrmiJHmsqHog73lipvot5/pmo8g5L2g5Y6755qE5pa55ZCRClswMTozNC4wMF3oi6XotorniLHotorooqvliqgg6LaK6KaB6JC96JC95aSn5pa5ClswMTo0MS42NV0KWzAxOjQzLjY1XeS9oOi/mOimgeaIkeaAjuagtyDopoHmgI7moLcKWzAxOjQ4LjMwXeS9oOeqgeeEtuadpeeahOefreS/oeWwseWkn+aIkeaCsuS8pApbMDE6NTMuMzBd5oiR5rKh6IO95Yqb6YGX5b+YIOS9oOS4jeeUqOaPkOmGkuaIkQpbMDE6NTguNjVd5ZOq5oCV57uT5bGA5bCx6L+Z5qC3ClswMjowMy4yNF3miJHov5jog73mgI7moLcg6IO95oCO5qC3ClswMjowOC4yMF3mnIDlkI7ov5jkuI3mmK/okL3lvpfmg4XkurrnmoTnq4vlnLoKWzAyOjEzLjE1XeS9oOS7juadpeS4jeS8muaDsyDmiJHkvZXlv4Xov5nmoLcKWzAyOjIxLjYwXQpbMDI6NDUuNjRd5oiR5oWi5oWi55qE5Zue5Yiw6Ieq5bex55qE55Sf5rS75ZyIClswMjo1My44OV3kuZ/lvIDlp4vlj6/ku6XmjqXop6bmlrDnmoTkurrpgIkKWzAzOjAzLjM1XeeIseS9oOWIsOacgOWQjiDkuI3nl5vkuI3nl5IKWzAzOjA4LjcwXeeVmeiogOWcqOiuoei+gyDosIHniLHov4fkuIDlnLoKWzAzOjEzLjM1XeaIkeWJqeS4i+S4gOW8oCDmsqHlkI7mgpTnmoTmqKHmoLcKWzAzOjIxLjM1XQpbMDM6MjIuOTVd5L2g6L+Y6KaB5oiR5oCO5qC3IOimgeaAjuagtwpbMDM6MjguMjBd5L2g5Y2D5LiH5LiN6KaB5Zyo5oiR5ama56S855qE546w5Zy6ClswMzozMy4yMF3miJHlkKzlrozkvaDniLHnmoTmrYwg5bCx5LiK5LqG6L2mClswMzozOS4xMF3niLHov4fkvaDlvojlgLzlvpcKWzAzOjQzLjMwXeaIkeS4jeimgeS9oOaAjuagtyDmsqHmgI7moLcKWzAzOjQ4LjIwXeaIkemZquS9oOi1sOeahOi3r+S9oOS4jeiDveW/mApbMDM6NTMuNTBd5Zug5Li66YKj5piv5oiRIOacgOW/q+S5kOeahOaXtuWFiQpbMDQ6MDMuNzVdClswNDowNS44MF3lkI7mnaXmiJHnmoTnlJ/mtLvov5jnrpfnkIbmg7MKWzA0OjE2LjA1XeayoeS4uuS9oOiQveWIsOWtpOWNleeahOS4i+WcugpbMDQ6MjQuMTNd5pyJ5LiA5aSp5pma5LiKIOaipuS4gOWcugpbMDQ6MjguNTZd5L2g55m95Y+R6IuN6IuNIOivtOW4puaIkea1gea1qgpbMDQ6MzQuNDFd5oiR6L+Y5piv5rKh54q56LGrIOWwsemaj+S9oOWOu+WkqeWgggpbMDQ6NDQuMTBd5LiN566h6IO95oCO5qC3IOaIkeiDvemZquS9oOWIsOWkqeS6rgpbMDQ6NTcuMTddCg==';

    // 斑马，斑马
    // var str = 'W3RpOuaWkemprCzmlpHpqaxdClthcjrlrovlhqzph45dClthbDpdCltieTrlv4PngbXkuYvnqpflv5fljY5dCgpbMDA6MDAuMTRd5q2M6K+N5Y2D5a+7IHd3dy5scmNnYy5jb20KWzAwOjAyLjE0XeaWkemprOaWkemprApbMDA6MDUuMTFd5ryU5ZSx77ya5a6L5Yas6YeOClswMDoxMy41NV0KWzAwOjE1LjU1XeaWkemprOaWkemprCDkvaDkuI3opoHnnaHnnYDllaYKWzAwOjIyLjU1XeWGjee7meaIkeeci+eci+S9oOWPl+S8pOeahOWwvuW3tApbMDA6MjkuOTVd5oiR5LiN5oOz5Y676Kem56Kw5L2g5Lyk5Y+j55qE55akClswMDozNy4xMF3miJHlj6rmg7PmjoDotbfkvaDnmoTlpLTlj5EKWzAwOjQ0Ljc1XeaWkemprOaWkemprCDkvaDlm57liLDkuobkvaDnmoTlrrYKWzAwOjUxLjQxXeWPr+aIkea1qui0ueedgOaIkeWvkuWGt+eahOW5tOWNjgpbMDA6NTguODZd5L2g55qE5Z+O5biC5rKh5pyJ5LiA5omH6Zeo5Li65oiR5omT5byA5ZWKClswMTowNi4yMV3miJHnu4jnqbbov5jopoHlm57liLDot6/kuIoKWzAxOjQyLjc1XeaWkemprOaWkemprO+8jOS9oOadpeiHquWNl+aWueeahOe6ouiJsuWVigpbMDE6NDkuNjVd5piv5ZCm5Lmf5piv5Liq5Yqo5Lq655qE5pWF5LqL5ZWKClswMTo1Ny4xMF3kvaDpmpTlo4HnmoTmiI/lrZDlpoLmnpzkuI3og73nlZnkuIsKWzAyOjA0LjUwXeiwgeS8muWSjOS9oOedoeWIsOWkqeS6rgpbMDI6MTIuMTBd5paR6ams5paR6amsIOS9oOi/mOiusOW+l+aIkeWQlwpbMDI6MTguNzBd5oiR5piv5Y+q5Lya5q2M5ZSx55qE5YK755OcClswMjoyNi40MF3mlpHpqazmlpHpqawg5L2g552h5ZCn552h5ZCnClswMjozMy4yN13miJHkvJrog4zkuIrlkInku5bnprvlvIDljJfmlrkKWzAyOjQxLjMyXeaWkemprOaWkemprCDkvaDkvJrorrDlvpfmiJHlkJcKWzAyOjQ3LjcyXeaIkeaYr+W8uuivtOedgOW/p+aEgeeahOWtqeWtkOWVigpbMDI6NTUuNTNd5paR6ams5paR6amsIOS9oOedoeWQp+edoeWQpwpbMDM6MDIuMjNd5oiR5oqK5L2g55qE6Z2S6I2J5bim5Zue5pWF5LmhClswMzoxMC4xM13mlpHpqazmlpHpqawg5L2g5LiN6KaB552h552A5ZWmClswMzoxNi40M13miJHlj6rmmK/kuKrljIblv5nnmoTml4XkurrllYoKWzAzOjI0LjYzXeaWkemprOaWkemprCDkvaDnnaHlkKfnnaHlkKcKWzAzOjMxLjU4XeaIkeimgeWNluaOieaIkeeahOaIv+WtkApbMDM6MzcuNDhd5rWq6L+55aSp5ravClswMzo0MS4xOF0KWzAzOjQzLjEzXS0tLS3mrYzor43nvJbovpHvvJrlpKnoi6XmnInmg4UtLS0tClswMzo0NS45OF1RUTo5IDcgMCA1IDEgOSA3IDEKWzAzOjQ4LjE0XQ==';

    var str = base64.decode(str).trim();

    // 设置当前歌词下标
    self.setLrcIndex(str, data);

    // 生成歌词
    self.data.LrcTextArr = self.createdLrcTextArr(str);

    self.update();

    var scrollRect;
    var lineRect;
    function check() {
        if (!scrollRect || !lineRect) {
            return;
        }

        var middleScrollTop = parseInt(lineRect.top + (lineRect.height / 2) - (scrollRect.height / 2));
        self.scrollview.vScrollTo(middleScrollTop, 500);
        self.update();
    }

    self.scrollview.getBoundingRect(function (v) {
        scrollRect = v;
        check();
    });
    self['line' + self.data.curLrcIndex].getBoundingRect(function (v) {
        lineRect = v;
        check();
    });
}

// 生成歌词数据
createdLrcTextArr = function (str) {
    var arr = str.split('\n');
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i]) {
            var temp = arr[i].split(']');
            newArr.push(temp[1]);
        }

    }
    return newArr;
}

// 寻找时间对应的歌词
setLrcIndex = function (str, data) {
    var self = this;

    // 将时间提取出来
    var timeArr = self.lrcTimeArr(str);

    var targeTime = data.curtime / 1000;

    self.data.curLrcIndex = self.binarySearch(targeTime, timeArr);

    return self.binarySearch(targeTime, timeArr);
}

// 根据客户端传来的时间进行查找对应键值
binarySearch = function (targeTime, timeArr) {
    var start = 0;
    var end = timeArr.length - 1;
    var center = parseInt((end/2), 10);

    for (var i = 0; i < timeArr.length; i++) {

        if (targeTime < timeArr[i]) {
            return i-1;
        }
    }
    return i;
}

// 获取歌词时间数组，范围为秒
lrcTimeArr = function (str) {
    var reg = /\[(.+?)\]/;
    var timeArr = [];
    var arr = str.split('\n');

    for (var i = 0; i < arr.length; i++) {
        var match = reg.exec(arr[i]);
        if (match) {
            timeArr.push(match[1]);
        } else {
            console.warn('not matched', arr[i]);
        }
    }

    // 把匹配到的时间转为秒
    for (var i = 0; i < timeArr.length; i++) {
        var time = timeArr[i].split(':');
        var min = +time[0];
        var sec = +time[1];
        timeArr[i] = parseFloat(min * 60 + parseFloat(sec, 10), 10);
    }

    return timeArr;
}

togglePlay = function () {
    if (!this.data.playing) {
        this.audio.play("/sdcard/banma.mp3");
        this.data.playing = true;
    } else {
        this.audio.pause();
        this.data.playing = false;
    }
    this.update();
}

handleTime =  function (time) {
    var self = this;
    var secs = Math.round(time / 1000);
    var min = parseInt((secs / 60), 10);
    var sec = secs - min * 60;

    min = min + '';
    sec = sec + '';
    if (min.length < 2) {
        min = '0' + min;
    }

    if (sec.length < 2) {
        sec = '0' + sec;
    }

    console.log(min + ':' + sec);

    return min + ':' + sec;
}