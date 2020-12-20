let pc_view = document.querySelector(".pc-view");
let ul = document.querySelector(".tab .normal ul");
let li = ul.querySelectorAll("li");
let appPC = document.querySelector("#appPC");
// console.log(appPC);
let start = 0;
var indexData;
let row;
// console.log(ul);
// console.log(li);
ul.onclick = function() {
    let e = window.event;
    for (var i = 0; i < li.length; i++) {
        li[i].classList.remove("active");
    }
    e.target.classList.add("active");
    let index = e.target.getAttribute("index");
    if (index == 1) {
        shouye();
    }
    if (index == 2) {
        pc_view.innerHTML = "9.9包邮";
        pc_view.style.height = "500px";
    }
    if (index == 3) {
        pc_view.innerHTML = "超值大额券";
        pc_view.style.height = "500px";
    }
    if (index == 4) {
        pc_view.innerHTML = "冬季女装上新";
        pc_view.style.height = "500px";
    }
}
shouye();


function shouye() {
    pAjax({
        url: "../server/gatdata.php",
        data: {
            start: start,
            len: 20,
        }
    }).then(res => {
        res = JSON.parse(res);
        // console.log(res);
        indexData = res;
        rowrender1();
        // console.log(indexData);
    })
    pc_view.innerHTML = `  <div class="home">
<div class="indexBanner clear_fix">
    <section class="sidebar">
        <div class="classification">
            <ul>
                <li class="">
                    <div class="classificationItem">
                        <img src="../img/1.png" alt="icon">
                        <p>女装</p>
                        <p>
                            <span> /</span>女鞋
                        </p>
                    </div>
                </li>
                <li class="">
                    <div class="classificationItem"><img src="../img/2.png" alt="icon">
                        <p>
                            男装
                        </p>
                        <p>
                            <span> /</span> 男鞋
                        </p>
                    </div>
                </li>
                <li class="">
                    <div data-v-4eceb4d8="" data-v-1994baad="" class="classificationItem"><img data-v-4eceb4d8="" src="../img/3.png" alt="icon">
                        <p data-v-4eceb4d8="">
                            美妆
                        </p>
                        <p data-v-4eceb4d8="">
                            <span data-v-4eceb4d8=""> /</span>个护</p>
                    </div>

                </li>
                <li class="">
                    <div data-v-4eceb4d8="" data-v-1994baad="" class="classificationItem"><img data-v-4eceb4d8="" src="../img/4.png" alt="icon">
                        <p data-v-4eceb4d8="">
                            配饰
                        </p>
                        <p data-v-4eceb4d8="">
                            <span data-v-4eceb4d8=""> /</span>箱包</p>
                    </div>
                </li>
                <li class="">
                    <div data-v-4eceb4d8="" data-v-1994baad="" class="classificationItem"><img data-v-4eceb4d8="" src="../img/5.png" alt="icon">
                        <p data-v-4eceb4d8="">
                            零食王国
                        </p>
                    </div>
                </li>
                <li class="">
                    <div data-v-4eceb4d8="" data-v-1994baad="" class="classificationItem"><img data-v-4eceb4d8="" src="../img/6.png" alt="icon">
                        <p data-v-4eceb4d8="">
                            母婴用品</p>
                    </div>
                </li>
                <li class="">
                    <div data-v-4eceb4d8="" data-v-1994baad="" class="classificationItem"><img data-v-4eceb4d8="" src="../img/7.png" alt="icon">
                        <p data-v-4eceb4d8="">
                            手机</p>
                        <p data-v-4eceb4d8=""><span data-v-4eceb4d8=""> /</span>数码</p>
                    </div>
                </li>
                <li class="">
                    <div data-v-4eceb4d8="" data-v-1994baad="" class="classificationItem"><img data-v-4eceb4d8="" src="../img/8.png" alt="icon">
                        <p data-v-4eceb4d8="">
                            内衣袜子</p>
                    </div>
                </li>
                <li class="">
                    <div data-v-4eceb4d8="" data-v-1994baad="" class="classificationItem"><img data-v-4eceb4d8="" src="../img/9.png" alt="icon">
                        <p data-v-4eceb4d8="">
                            文娱</p>
                        <p data-v-4eceb4d8=""><span data-v-4eceb4d8=""> /</span>家居</p>
                    </div>
                </li>
            </ul>
        </div>
    </section>
    <section class="banner-container">
        <div class="banner-container-top clear_fix">
            <div class="slider">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide"><img src="../img/banner.jpeg" alt=""></div>
                        <div class="swiper-slide"><img src="../img/banner2.png" alt=""></div>
                        <div class="swiper-slide"><img src="../img/banner3.png" alt=""></div>
                    </div>
                    <!-- 如果需要分页器 -->
                    <div class="swiper-pagination "></div>

                    <!-- 如果需要导航按钮 -->
                    <div class="swiper-button-prev" id="swiper-button-left"></div>
                    <div class="swiper-button-next" id="swiper-button-right"></div>

                </div>
            </div>
            <!-- 轮播图右边 -->
            <div class="banner-container-top-right ">
                <h3>9块9包邮</h3>
                <div class="prompt ">保你不吃亏</div> <img src="http://img1.lukou.com/static/coupon/p/image_link/HNXymT0c8PiY7luPgoymC2TwT2p1NulN.gif " alt="专题图 "></div>
        </div>
        <!-- 轮播图底面 -->
        <div class="banner-container-bottom ">
            <div class="banner-container-bottom-special ">
                <h3>冬季女装上新</h3>
                <p>速来抢购~</p>
                <span class="btn ">Go</span>
                <img src="http://img1.lukou.com/static/coupon/p/image_link/uNu7gRJopziCmxhDUhz68rGfNOudDUc6.png " alt="专题图 ">
            </div>
            <div class="banner-container-bottom-special ">
                <h3>超值大额券</h3>
                <p>优惠直击底价</p>
                <span class="btn ">Go</span>
                <img src="http://img1.lukou.com/static/p/commodity/img/20181212-235507.png " alt="专题图 ">
            </div>
            <a href="#/downLoad " target="_blank " class="banner-container-bottom-QRCode ">
                <p>扫码下载APP</p>
                <p>发现更多惊喜</p>
                <img src="../img/二维码.png " alt="下载码 ">
            </a>
        </div>
    </section>
</div>
<div class="title-bar ">
    <h3>小编精选</h3>
    <p class="title-bar-prompt ">
        每天更新
    </p>
</div>
<div class="row_contain">
<div class="row">



</div>
</div>

<section class="choice ">
        
        <div class="choice-more ">
            <div class="choice-more-btn ">查看更多
            </div>
        </div>
    </section>
</div>`;
    row = document.querySelector(".row");
    // console.log(row);
    // console.log(indexData);

}
// console.log(indexData);
var mySwiper = new Swiper('.swiper-container', {
    speed: 1000,
    direction: 'horizontal', // 垂直切换选项
    loop: true, // 循环模式选项
    initialSlide: 2,
    autoplay: {
        delay: 2000,
        stopOnLastSlide: false,
        disableOnInteraction: true,
    },
    // 如果需要分页器
    pagination: {
        el: '.swiper-pagination',
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
});
// 置顶
let back_top = document.querySelector(".back-top");
window.onscroll = function() {
    if (scrollY >= 500) {
        back_top.style.display = "block";
    } else {
        back_top.style.display = "none";
    }
}
back_top.onclick = function() {
    scrollTo({
        top: 0,
        behavior: "smooth"
    })
}


let choice_more_btn = document.querySelector(".choice-more-btn");
choice_more_btn.onclick = function() {
        choice_more_btn.style.display = "none";
        window.onscroll = function() {
            if (scrollY > appPC.offsetHeight - 1200) {
                start = start + 20;
                // console.log(start);
                pAjax({
                        url: "../server/gatdata.php",
                        data: {
                            start: start,
                            len: 20,
                        }
                    }).then(res => {
                        res = JSON.parse(res);
                        // console.log(res);
                        indexData = res;
                        // console.log(res);
                        rowrender1();
                        // console.log(indexData);
                    })
                    // console.log(appPC.offsetHeight);
            }
        }
    }
    // console.log(row);

function rowrender1() {
    indexData.forEach(function(item) {
        row.innerHTML += `  <div class="col-sm-6 col-md-3">
        <div class="thumbnail">
            <img src="${item.img}" alt="...">
            <div class="caption">                 
                <p class="goods_description">${item.description}</p>
                <p class="price_per">￥${item.price}</p>
                <p>
                    <a href="../HTML/detail.html?id=${item.uid}" class="btn btn-primary"  role="button">商品详情</a>
                    <a href="../HTML/car.html" class="btn btn-default" role="button">购物车列表</a>
                </p>
            </div>
        </div>
    </div> `;
    })
}