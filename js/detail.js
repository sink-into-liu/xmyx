let reg = /id=(\d+)/;
let img;
let data1;
var banner;
if (!reg.test(location.search)) {
    location.href = '../html/list.html'
}
let id = reg.exec(location.search)[1];
let containers = document.querySelector('.containers');

function callback() {
    pAjax({
        url: '../server/getDetail.php',
        data: {
            id
        }
    }).then(res => {
        res = JSON.parse(res);
        renderHtml(res.detail);
    })
}
callback();

function getdata() {
    let p = new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('get', `http://www.xiongmaoyouxuan.com/api/detail?id=${id}`, true);
        xhr.send();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    // console.log('成功' + xhr.responseText);
                    data1 = JSON.parse(xhr.responseText);
                    banner = data1.data.detail.photo;
                    let pic = data1.data.detail.descContentList;
                    resolve({
                        banner,
                        pic
                    })
                } else {
                    console.log('失败' + statusText);
                }
            }
        }
    })
    return p
}

function renderHtml(data) {
    containers.innerHTML = `
    <div class="media">  
    <div class="swiper-container" id="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide"> <img src="" alt=""></div>
            <div class="swiper-slide"> <img src="" alt=""></div>
            <div class="swiper-slide"> <img src="" alt=""></div>
            <div class="swiper-slide"> <img src="" alt=""></div>
            <div class="swiper-slide"> <img src="" alt=""></div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
    <div class="media-body">
    <h4 class="media-heading">${data.description}
    </h4>
        <div class="price">
            <i class="glyphicon glyphicon-yen"></i>
            <span>${data.price}</span>
        </div>
        <div class="btn-group" role="group" aria-label="...">
            <button type="button" class="btn btn-default">XL</button>
            <button type="button" class="btn btn-default">L</button>
            <button type="button" class="btn btn-default">M</button>
            <button type="button" class="btn btn-default">S</button>
            <button type="button" class="btn btn-default">XS</button>
        </div>

        <div class="shop">
            <button class="btn btn-warning btn-lg" id="goCar">立即购买</button>
            <button class="btn btn-danger btn-lg" id="addCar">加入购物车</button>
        </div>
    </div>
</div>
        <div class="goods_detail">
           
        </div>`
    img = document.querySelectorAll(".swiper-slide img");
    let goods_detail = document.querySelector(".goods_detail");
    getdata().then(res => {
        img.forEach(function(item, index) {
            item.src = res.banner[index].url;
        })
        for (var i = 0; i < res.pic.length; i++) {
            let tu = document.createElement("img")
            tu.src = res.pic[i].photo.url;
            goods_detail.appendChild(tu);
        }
    })
    var mySwiper = new Swiper('.swiper-container', {
        speed: 1000,
        direction: 'horizontal', // 垂直切换选项
        // loop: true, // 循环模式选项
        initialSlide: 0,
        autoplay: {
            delay: 1000,
            stopOnLastSlide: true,
            disableOnInteraction: true,
        },
        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
}
containers.onclick = function() {
    let e = window.event;
    if (e.target.id == 'goCar') {
        location.href = '../html/car.html'
    }
    if (e.target.id == 'addCar') {
        // 因为添加到购物车按钮 需要把用户名和商品id
        // 所以需要判断是否有登录
        // let login = getCookie('login');
        let login = localStorage.getItem("login")
            // console.log(login);
        if (!login) {
            location.href = '../html/login.html';
            // http: //8.130.29.157/project/HTML/detail.html?id=16990731
            localStorage.setItem('url', 'http://8.130.29.157/project/HTML/detail.html?id=' + id)
            return
        }
        pAjax({
            url: '../server/addCarData.php',
            data: {
                username: login,
                goods_id: id
            }
        }).then(res => {
            console.log(res);
        })
    }
}