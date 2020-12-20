let data0;
let xhr = new XMLHttpRequest();
xhr.open('get', 'http://www.xiongmaoyouxuan.com/api/tab/1?start=0', true);
xhr.send();
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            let data1 = JSON.parse(xhr.responseText);
            data0 = data1;
            let data2 = data1.data.items.list;
            data2.forEach(function(item, index) {
                let id = item.id;
                let type = item.type;
                let description = item.title;
                let img = item.image;
                let price = item.price;
                pAjax({
                    url: '../server/updata.php',
                    data: {
                        id: id,
                        type: type,
                        description: description,
                        img: img,
                        price: price,
                    }
                }).then(res => {
                    // console.log(res);
                })
            })
            getdata(data0);
        } else {
            console.log('失败' + statusText);
        }
    }
}

function getdata(data) {
    var num = 0;
    // console.log(Math.ceil(data.data.items.total / data.data.items.perpage));
    for (let i = 0; i < Math.ceil(data.data.items.total / data.data.items.perpage); i++) {
        num = num + 20;
        let xhr = new XMLHttpRequest();
        xhr.open('get', `http://www.xiongmaoyouxuan.com/api/tab/1/feeds?start=${num}&sort=0`, true);
        xhr.send();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var data1 = JSON.parse(xhr.responseText);
                    let data3 = data1.data.list;
                    getdata2(data3);
                } else {
                    console.log('失败' + statusText);
                }
            }
        }
    }
}

function getdata2(data) {
    data.forEach(function(item, index) {
        let id = item.id;
        let type = item.type;
        let description = item.title;
        let img = item.image;
        let price = item.price;
        // console.log(id, type, description, img, price);
        pAjax({
            // async: false,
            url: '../server/updata.php',
            data: {
                id: id,
                type: type,
                description: description,
                img: img,
                price: price,
            }
        }).then(res => {
            // console.log(res);
        })
    })
}