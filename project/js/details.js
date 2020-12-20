// 打开详情页的时候先查看是否有携带id参数
// 如果没有id参数的时候 跳转到列表 
// 如果有id参数的时候 根据id去获取对象的数据 渲染

// http://gz2008.com/day06_code/project/html/detail.html?id=4
let reg = /id=(\d+)/;
if(!reg.test(location.search)){
    location.href = '../html/list.html'
}
let id = reg.exec(location.search)[1];
let container = document.querySelector('.container');
// 根据id获取数据
pAjax({
    url:'../api/getDetail.php',
    data:{
        id
    }
}).then(res =>{
    console.log(res);
    renderHtml(res.detail)
})


function renderHtml(data){
    container.innerHTML = `
        <ol class="breadcrumb">
            <li><a href="#">详情</a></li>
        </ol>
        <div class="media">
            <div class="media-left">
                <a href="#">
                    <img class="media-object"
                        src="${data.goods_big_logo}"
                        alt="...">
                </a>
            </div>
            <div class="media-body">
                <h4 class="media-heading">${data.goods_name}
                </h4>
                <div class="price">
                    <i class="glyphicon glyphicon-yen"></i>
                    <span>${data.goods_price}</span>
                </div>
                <div class="btn-group" role="group" aria-label="...">
                    <button type="button" class="btn btn-default">XL</button>
                    <button type="button" class="btn btn-default">L</button>
                    <button type="button" class="btn btn-default">M</button>
                    <button type="button" class="btn btn-default">S</button>
                    <button type="button" class="btn btn-default">XS</button>
                </div>

                <div>
                    <button class="btn btn-warning btn-lg" id="goCar">立即购买</button>
                    <button class="btn btn-danger btn-lg" id="addCar">加入购物车</button>
                </div>
            </div>
        </div>

        <ul class="nav nav-tabs">
            <li role="presentation" class="active"><a href="#">Home</a></li>
            <li role="presentation"><a href="#">Profile</a></li>
            <li role="presentation"><a href="#">Messages</a></li>
        </ul>
        <div class="goods_detail">
            ${data.goods_introduce}
        </div>`
}

container.onclick = function(){
    let e = window.event;
    if(e.target.id == 'goCar'){
        location.href = '../html/car.html'
    }

    if(e.target.id == 'addCar'){
        // 因为添加到购物车按钮 需要把用户名和商品id
        // 所以需要判断是否有登录
        let login = getCookie('login');
        if(!login){
            location.href = '../html/login.html';
            localStorage.setItem('url','http://gz2008.com/day06_code/project/html/detail.html?id=' + id)
            return
        }
        pAjax({
            url:'../api/addCarData.php',
            data:{
                username:login,
                goods_id:id 
            }
        }).then(res=>{
            console.log(res);
        })
    }
}