//数组去重
function norepeat(a) {
    var arr = [];
    for (var i = 0; i < a.length; i++) {
        if (arr.indexOf(a[i]) == -1) {
            arr.push(a[i]);
        }
    }
    return arr;
}
// 封装一个函数 把url的参数转化为 对象
function changeObj(str) {
    var arr = str.split("&");
    var obj = {}; //定义一个空对象用
    arr.forEach(function(item) {
        var newArr = item.split("=");
        obj[newArr[0]] = newArr[1];
    });
    return obj
}
//取min到max之间的随机数
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//时间格式化
function formatTime(date, fuhao) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = month >= 10 ? month : "0" + month;
    var day = date.getDate();
    day = day >= 10 ? day : "0" + day;
    var hours = date.getHours();
    hours = hours >= 10 ? hours : "0" + hours;
    var min = date.getMinutes();
    min = min >= 10 ? min : "0" + min;
    var sec = date.getSeconds();
    sec = sec >= 10 ? sec : "0" + sec;
    var week = date.getDay(); //返回值的是 数字
    var time = date.getTime(); //时间戳：获取这个时间到格林威治时间差（1970年1月1日：00:00:00）
    var strtime = date.toLocaleString(); //根据本地时间把 Date 对象转换为字符串
    var arr = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    week = arr[week];
    fuhao = fuhao ? fuhao : "/";
    // 如果不传递符号这个参数的时候  ，需要做一个处理
    return `${year}${fuhao}${month}${fuhao}${day}  ${hours}:${min}:${sec}  ${week}`
}
// 封装一个计算两个时间差的函数
function timeDifference(date1, date2) {
    // 先算两个时间对象到格林威治时间的时间差
    var time1 = date1.getTime();
    var time2 = date2.getTime();

    // 两个时间的时间差的时间戳
    var time = Math.abs(time1 - time2);

    // 计算两个时间差的天数
    var day = parseInt(time / 1000 / 60 / 60 / 24);

    // 计算小时 
    // var hours = time / 1000 / 60 / 60 / 24 - day;
    var hours = parseInt((time / 1000 / 60 / 60) % 24);

    // 计算 分钟
    var min = parseInt((time / 1000 / 60) % 60);

    // 计算秒数
    var sec = parseInt(time / 1000 % 60);

    // 昨天2020年 11月 8号 12:10:20
    // 今天2020年 11月 9号 13:10:10
    // 1天 0小时 59分50秒

    // 把计算的day hours min sec 当成函数的返回值
    var obj = {
        day: day,
        hours: hours,
        min: min,
        sec: sec
    }
    return obj;
    // console.log(`两个时间相差${day}天${hours}小时${min}分${sec}秒`);
}
// 封装一个函数 兼容的获取元素的样式
// 你要获取哪个元素的什么样式  box width
function getStyle(ele, attr) {
    // console.log(attr);
    var res;
    if (window.getComputedStyle) {
        res = window.getComputedStyle(ele)[attr];
    } else {
        res = ele.currentStyle[attr];
    }
    return res;
}

// 封装一个事件监听的函数
// 事件源ele，事件类型type, 事件处理函数callback 可变
function addEvent(ele, type, callback) {
    if (ele.addEventListener) {
        ele.addEventListener(type, callback)
    } else {
        ele.attachEvent("on" + type, callback);
    }
}
//动画函数
function animation(ele, obj, callback) {
    let timerlength = 0;
    for (let key in obj) {
        timerlength++;
        let attr = key;
        let target = obj[key];
        // 获取元素的当前值
        let style;
        let speed;
        // console.log(ele.timer);
        // 开启这次定时器之前 先清空定时器
        clearInterval(ele.attr);

        // 定义一个定时器 来执行动画的
        // 把定时器当成元素的属性存储起来
        ele.attr = setInterval(() => {
            if (attr == "opacity") {
                // 不能取整， 因为透明度没有单位 而且透明度的取整为0-1 有小数
                style = getStyle(ele, attr) * 100;
            } else {
                style = parseInt(getStyle(ele, attr));
            }
            // 没执行一次定时器的时候就需要获取元素的最新的当前值
            speed = (target - style) / 10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            style += speed;
            // console.log(1);
            if (target == style) {
                // console.log("相等");
                timerlength--;
                clearInterval(ele.attr);
            }
            // 如果属性为透明度的时候 ，样式是不需要单位的
            if (attr == "opacity") {
                // 因为上面获取的时候 *100
                ele.style[attr] = style / 100;
            } else {
                ele.style[attr] = style + 'px';
            }
            if (timerlength == 0) {
                //  当有callback的时候那么久执行callback
                // 如果没有callback 就不用 当callback没有传递参数的时候，callback = undefined
                callback && callback();
            }
        }, 30)
    }
}
//拖拽
function drag(ele) {
    let Drag = function(ele) {
        this.ele = ele;
        this.init();
    }
    Drag.prototype = {
        constructor: Drag,
        init: function() {
            this.ele.onmousedown = () => {
                this.down();
            };
            this.ele.onmouseup = this.up;
        },
        down() {
            let event = window.event;
            this.x = event.offsetX;
            this.y = event.offsetY;
            document.onmousemove = () => {
                this.move();
            }
        },
        up() {
            document.onmousemove = null;
        },
        move() {
            let e = window.event;
            let left = e.clientX - this.x;
            let top = e.clientY - this.y;
            if (left < 0) {
                left = 0;
            }
            if (left >= innerWidth - this.ele.offsetWidth) {
                left = innerWidth - this.ele.offsetWidth;
            }
            if (top < 0) {
                top = 0;
            }
            if (top >= innerHeight - this.ele.offsetHeight) {
                top = innerHeight - this.ele.offsetHeight;
            }
            this.ele.style.left = left + "px";
            this.ele.style.top = top + "px";
        },
    }
    Object.defineProperty(Drag.prototype, "constructor", {
        enumerable: false
    })
    return new Drag(ele);
}
//弹幕
function barrage(ele, text) {
    let Barrage = function(ele, text) {
        this.ele = ele;
        this.text = text;
        this.color = "rgb(" + getRandom(0, 255) + "," + getRandom(0, 255) + "," + getRandom(0, 255) + ")";
        this.fontSize = getRandom(12, 25);
        this.top = getRandom(0, ele.offsetHeight - this.fontSize);
        this.speed = getRandom(10, 30);
        this.init();
    }
    Barrage.prototype = {
        constructor: Barrage,
        init() {
            this.span = document.createElement("span");
            this.span.classList.add("message");
            this.span.style.color = this.color;
            this.span.style.fontSize = this.fontSize + "px";
            this.span.style.top = this.top + "px";
            this.span.innerHTML = this.text;
            this.ele.appendChild(this.span);
            this.move();
        },
        move: function() {
            this.timer = setInterval(() => {
                let left = parseInt(getStyle(this.span, "left")) - this.speed;
                if (left <= -this.span.offsetWidth) {
                    clearInterval(this.timer)
                    this.remove();
                }
                animation(this.span, {
                    left: left,
                })
            }, 100)
        },
        remove() {
            this.span.remove();
        }
    }
    Object.defineProperty(Barrage.prototype, "constructor", {
        enumerable: false
    });
    return new Barrage(ele, text);
}
//选项卡
class Tab {
    constructor(ele, obj) {
        this.ele = document.querySelector(ele);
        this.btn = this.ele.querySelectorAll("ul li");
        this.content = this.ele.querySelectorAll(".tab-content");
        // 如果obj存在 那么久 判断 obj的index属性中是否存在，obj的index属性存在的时候 那么this.index = obj.index ,否在就为0
        // 如果obj不存在 那么this.index = 0
        this.index = obj ? obj.index || 0 : 0;
        this.init();
    }
    init() {
        this.btn[this.index].classList.add('active');
        this.content[this.index].classList.add('current')
        this.btn.forEach((item, index) => {
            item.onclick = () => {
                this.changeActive(item, index);
            }
        })
    }
    changeActive(curBtn, idx) {
        // 排他思想
        this.btn.forEach(item => item.classList.remove('active'));
        curBtn.classList.add('active');
        this.changeContent(idx);
    }
    changeContent(idx) {
        this.content.forEach(item => item.classList.remove('current'));
        this.content[idx].classList.add('current');
    }
}
//
class Qing {
    constructor({
        ele,
        data,
        num
    }) {
        this.ele = document.querySelector(ele);
        this.index = num ? num || 0 : 0;
        this.obj = data;
        this.init();
    }
    init() {
        this.ul = document.createElement("ul");
        this.ol = document.createElement("ol");
        this.ele.appendChild(this.ul);
        this.ele.appendChild(this.ol);
        let str = "";
        this.obj.title.forEach(item => {
            str += ` <li>${item}</li>`
        });
        this.ul.innerHTML = str;
        this.btn = this.ele.querySelectorAll("ul li");
        this.btn[this.index].classList.add("active");
        let str1 = "";
        this.obj.content.forEach(() => {
            str1 += `
                <div class="tab-content"></div>`
        });
        this.ol.innerHTML = str1;
        this.content = this.ele.querySelectorAll(".tab-content");
        this.content[this.index].classList.add("current");
        this.obj.content[this.index].forEach(item => {
            this.content[this.index].innerHTML += `
                    <dl>
                        <dt>
                            <img src="${item.img}" alt="">
                        </dt>
                        <dd>
                            <h3>${item.name}</h3>
                            <p>${item.text}</p>
                            <p>
                                <span>${item.time}</span>
                                <span>${item.read}</span>
                            </p>
                        </dd>
                    </dl> `
        });
        this.btn.forEach((item, inde) => {
            item.onclick = () => {
                this.changeActive(inde);
                this.render(inde);
            }
        })
    }
    changeActive(idx) {
        for (var i = 0; i < this.btn.length; i++) {
            this.btn[i].classList.remove("active");
            this.content[i].classList.remove("current");
        }
        this.btn[idx].classList.add("active");
        this.content[idx].classList.add("current");
    }
    render(idx) {
        this.obj.content[idx].forEach(item => {
            this.content[idx].innerHTML += `
                    <dl>
                        <dt>
                            <img src="${item.img}" alt="">
                        </dt>
                        <dd>
                            <h3>${item.name}</h3>
                            <p>${item.text}</p>
                            <p>
                                <span>${item.time}</span>
                                <span>${item.read}</span>
                            </p>
                        </dd>
                    </dl> `
        });
    }
}
/* 
    设置cookie，删除，修改
    如果cookie中没有key就添加，如果有这个可以 就是修改
    删除，直接设置cookie的过期时间为负数
*/
function setCookie(key, value, expires) {
    // 当没有传递过期时间的时候，那么默认为会话时间，不设置 expires=${date}
    if (expires) {
        let date = new Date();
        let time = date.getTime() - 8 * 60 * 60 * 1000 + expires * 60 * 1000;
        date.setTime(time);

        document.cookie = `${key}=${value};expires=${date}`;
        return
    }
    document.cookie = `${key}=${value}`;
}

/* 
    获取cookie，需要传递一个参数，为key
*/
function getCookie(key) {
    let cookie = document.cookie;
    // a=1; b=2; c=3;
    // 先把字符串分割为数组，然后再把数组转化为对象
    console.log(cookie);
    let arr = cookie.split("; ");

    let obj = {};
    arr.forEach((item) => {
        let newArr = item.split("=");
        obj[newArr[0]] = newArr[1];
    });

    return obj[key]
}


// 请求
function ajax(option) {
    // 【1】判断url是否传递参数
    if (!option.url) {
        // 手动抛出一个错误，
        throw new Error('url的参数时必填的');
    }


    // 设置默认值
    let defOption = {
        type: 'get',
        async: true
    }

    // 把传递过去来的参数写入默认值当中
    for (let key in option) {
        defOption[key] = option[key]
    }

    //【1】如果传递的type不是 get 或者post的时候，抛出错误提示使用者，type的值只能为get 或者 post
    if (!(defOption.type == 'get' || defOption.type == 'post')) {
        throw new Error('type参数只能为get 或者 post');
    }

    // 【3】判断async 是否布尔值
    // console.log(Object.prototype.toString.call(defOption.async));
    if (Object.prototype.toString.call(defOption.async) != '[object Boolean]') {
        throw new Error('async 的值只能为布尔值');
    }

    if (defOption.data) {
        // 【4】判断参数 data 是否是对象 和字符串的数据类型
        let dataType = Object.prototype.toString.call(defOption.data);
        if (!(dataType == '[object String]' || dataType == '[object Object]')) {
            throw new Error('data的格式只能为key=value&key=value 或者 {key:value}');
        }

        // 判断data参数是否 是对象，如果是对象需要把参数处理为 key=value&key=value
        if (dataType == '[object Object]') {
            let str = '';
            for (let key in defOption.data) {
                str += key + '=' + defOption.data[key] + '&';
            }
            defOption.data = str.substr(0, str.length - 1);
        }
        // 当参数为字符串的时候，判断是否有=号
        if (dataType == '[object String]' && !defOption.data.includes('=')) {
            throw new Error('data格式只能为key=value')
        }
    }


    // 【5】判断callback回调函数 
    if (!defOption.success) {
        throw new Error('success是必须存在的参数')
    }

    // 判断callback 是否是函数
    if (Object.prototype.toString.call(defOption.success) != '[object Function]') {
        throw new Error('success必须是函数')
    }

    // try  catch
    // try 尝试执行 try代码，如果try中灭有错误的时候不执行catch方法中代码
    // try 有逻辑错误的时候 就会执行 catch中代码
    try {
        let xhr = new XMLHttpRequest();
        // 判断请求的是类型 来写请求携带参数
        if (defOption.type == 'get') {
            xhr.open(defOption.type, defOption.url + (defOption.data ? '?' + defOption.data : ''), defOption.async);
            xhr.send()
        } else if (defOption.type == 'post') {
            xhr.open(defOption.type, defOption.url, defOption.async);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(defOption.data);
        }

        // 判断请求异步还是同步
        if (defOption.async) {
            xhr.onload = function() {
                defOption.success(xhr.responseText);
            }
        } else {
            defOption.success(JSON.parse(xhr.responseText));
        }
    } catch (err) {
        defOption.error(err)
    }
}

function pAjax(params) {
    return new Promise(function(resolve, reject) {
        ajax({
            url: params.url,
            data: params.data,
            type: params.type || 'get',
            async: params.async || true,
            success: function(res) {
                resolve(res);
            },
            // error当执行请求数据出错的时候执行方法
            error: function(res) {
                reject(res)
            }
        })
    });
}